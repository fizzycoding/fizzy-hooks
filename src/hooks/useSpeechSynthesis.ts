import { useEffect, useRef, useState } from "react";

type SpeechSynthesisState = {
  supported: boolean;
  speaking: boolean;
  voices: SpeechSynthesisVoice[];
  speak: (text: string, voice?: SpeechSynthesisVoice) => void;
  cancel: () => void;
  pause: () => void;
  resume: () => void;
};

/**
 * useSpeechSynthesis Hook
 *
 * Provides access to the Web Speech API for text-to-speech.
 * 
 * @returns \ return {
    supported,
    speaking,
    voices,
    speak,
    cancel,
    pause,
    resume,
  }
 */
function useSpeechSynthesis(): SpeechSynthesisState {
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices when available
  useEffect(() => {
    if (!supported) return;

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();

    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [supported]);

  const speak = (text: string, voice?: SpeechSynthesisVoice) => {
    if (!supported || !text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const pause = () => {
    if (!supported) return;
    window.speechSynthesis.pause();
  };

  const resume = () => {
    if (!supported) return;
    window.speechSynthesis.resume();
  };

  return {
    supported,
    speaking,
    voices,
    speak,
    cancel,
    pause,
    resume,
  };
}

export default useSpeechSynthesis;
