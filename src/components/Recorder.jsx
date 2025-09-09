import React, { useState, useRef } from "react";

export default function Recorder({ onTranscribedText }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // 🔑 Azure Speech API 정보
  // ⚠️ 보안 경고: 프로덕션에서는 API key를 클라이언트에 노출하지 마세요!
  // 실제 배포 시에는 서버 사이드에서 음성 인식을 처리하거나 토큰 기반 인증을 사용하세요
  const AZURE_KEY = import.meta.env.DEV ? import.meta.env.VITE_AZURE_SPEECH_KEY : null;
  const REGION = import.meta.env.VITE_AZURE_REGION || "koreacentral";

  // 프로덕션에서는 API key 없이 기능 비활성화
  if (!AZURE_KEY && import.meta.env.PROD) {
    console.warn('음성 인식 기능은 개발 환경에서만 사용 가능합니다.');
  }

  // 🎙️ 녹음 시작
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    audioChunks.current = []; // 초기화

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
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      audioChunks.current = [];
      sendAudioToAzure(audioBlob);
    };
    setRecording(false);
  };
  // 📡 Azure API 호출
    async function sendAudioToAzure(audioBlob) {
        // 프로덕션 환경에서는 API key가 없으므로 기능 비활성화
        if (!AZURE_KEY) {
            console.warn('음성 인식 기능을 사용할 수 없습니다. 개발 환경에서만 사용 가능합니다.');
            onTranscribedText('음성 인식은 개발 환경에서만 사용 가능합니다.');
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
        console.log("🎙️ Azure 인식 결과 원본:", result);
    
        // Azure의 JSON 구조에 따라 텍스트 꺼내기
        const text = result.DisplayText || result.Text || "";
        console.log("📌 최종 인식된 텍스트:", text);
    
        if (onTranscribedText) {
            console.log("📡 App.jsx로 전달:", text);
            onTranscribedText(text);
        }
        } catch (error) {
        console.error("❌ Azure STT 오류:", error);
        }
    }
  

  return (
    <div>
      {!recording ? (
        <button 
          onClick={startRecording}
          className="p-3 bg-black/40 backdrop-blur-sm border border-gray-500/50 text-white hover:bg-black/60 transition-all duration-200 rounded-md"
        >
          🎤
        </button>
      ) : (
        <button 
          onClick={stopRecording}
          className="p-3 bg-red-500/80 backdrop-blur-sm border border-red-400/50 text-white hover:bg-red-600/80 transition-all duration-200 rounded-md"
        >
          ⏹
        </button>
      )}
    </div>
  );
}