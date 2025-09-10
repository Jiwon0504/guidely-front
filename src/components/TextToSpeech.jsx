// src/components/TextToSpeech.jsx
import React from "react";

export default function TextToSpeech({ text }) {
  const AZURE_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const REGION = import.meta.env.VITE_AZURE_REGION || "koreacentral";

  const handleTTS = async () => {
    if (!AZURE_KEY) {
      console.warn("❌ Azure Key 없음");
      return;
    }

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
          body: `<speak version='1.0' xml:lang='ko-KR'>
                   <voice xml:lang='ko-KR' xml:gender='Female' name='ko-KR-SunHiNeural'>
                     ${text || "안녕하세요. Guidely입니다."}
                   </voice>
                 </speak>`,
        }
      );

      if (!response.ok) throw new Error("Azure TTS 요청 실패");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

    } catch (error) {
      console.error("❌ Azure TTS 오류:", error);
    }
  };

  return (
    <button
      onClick={handleTTS}
      disabled={!text?.trim()}
      className="p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
    >
      🔊
    </button>
  );
}