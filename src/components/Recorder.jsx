import React, { useState, useRef } from "react";

export default function Recorder({ onTranscribedText }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // 🔑 Azure Speech API 정보 (환경변수에서 가져옴)
  const AZURE_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const REGION = import.meta.env.VITE_AZURE_REGION;

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