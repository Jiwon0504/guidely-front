// src/components/TextToSpeech.jsx
import React, { useEffect, useRef } from "react";

export default function TextToSpeech({ text, voiceName }) {
  const AZURE_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const REGION = import.meta.env.VITE_AZURE_REGION || "koreacentral";
  const lastPlayedText = useRef("");
  useEffect(() => {
    if (!text?.trim()) return;
    // 중복 재생 방지: 같은 텍스트는 재생하지 않음
    if (lastPlayedText.current === text) return;
    
    lastPlayedText.current = text;
    handleTTS();
  }, [text]);

  const handleTTS = async () => {
    if (!AZURE_KEY) {
      console.warn("❌ Azure Key 없음");
      return;
    }

    // 언어 감지 (한글 있으면 한국어, 아니면 영어)
    const lang = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text) ? "ko-KR" : "en-US";

    try {
      const response = await fetch(
        `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": AZURE_KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm",
          },
          body: `<speak version='1.0' xml:lang='${lang}'>
                   <voice xml:lang='${lang}' name='${voiceName}'>
                     ${text}
                   </voice>
                 </speak>`,
        }
      );

      if (!response.ok) throw new Error("Azure TTS 요청 실패");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      new Audio(audioUrl).play();

    } catch (error) {
      console.error("❌ Azure TTS 오류:", error);
    }
  };

  return null; // 자동재생만 하고 버튼은 필요 없음
}