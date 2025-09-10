import React, { useState, useRef } from "react";

export default function Recorder({ onTranscribedText }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const AZURE_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const REGION = import.meta.env.VITE_AZURE_REGION || "koreacentral";

  // 🎙️ 녹음 시작
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // ✅ 크롬이 지원하는 mimeType (webm/opus)
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  // ⏹ 녹음 중지
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = async () => {
      const webmBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      audioChunks.current = [];

      // ✅ WebM → WAV 변환 후 Azure로 전송
      const wavBlob = await convertToWav(webmBlob);
      sendAudioToAzure(wavBlob);
    };
    setRecording(false);
  };

  // 📡 Azure API 호출
  async function sendAudioToAzure(audioBlob) {
    if (!AZURE_KEY) {
      console.warn("❌ Azure Key 없음");
      return;
    }

    try {
      const arrayBuffer = await audioBlob.arrayBuffer();

      const response = await fetch(
        `https://${REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=ko-KR`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": AZURE_KEY,
            "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
          },
          body: arrayBuffer,
        }
      );

      const result = await response.json();
      console.log("🎙️ Azure 인식 결과:", result);

      const text = result.DisplayText || "";
      onTranscribedText?.(text);
    } catch (error) {
      console.error("❌ Azure STT 오류:", error);
    }
  }

  // 🔄 WebM → WAV 변환 함수
  async function convertToWav(blob) {
    const audioCtx = new AudioContext({ sampleRate: 16000 }); // 16kHz 고정
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const wavBuffer = encodeWAV(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  }

  // PCM WAV 인코더
  function encodeWAV(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0); // 모노만 사용
    const buffer = new ArrayBuffer(44 + channelData.length * 2);
    const view = new DataView(buffer);

    // WAV 헤더
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + channelData.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // 모노
    view.setUint32(24, 16000, true); // 샘플링 레이트 16kHz
    view.setUint32(28, 16000 * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true); // 16비트
    writeString(view, 36, "data");
    view.setUint32(40, channelData.length * 2, true);

    // PCM 데이터
    let offset = 44;
    for (let i = 0; i < channelData.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    return buffer;
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  return (
    <div>
      {!recording ? (
        <button
          onClick={startRecording}
          className="p-3 bg-gray-700 text-white rounded-md"
        >
          🎤
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="p-3 bg-red-600 text-white rounded-md"
        >
          ⏹
        </button>
      )}
    </div>
  );
}