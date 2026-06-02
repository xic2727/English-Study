import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface AudioPlayerButtonProps {
  text: string;
  autoplay?: boolean;
  className?: string;
  childOnly?: boolean;
  children?: React.ReactNode;
}

export default function AudioPlayerButton({
  text,
  autoplay = false,
  className = '',
  childOnly = false,
  children
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.speechSynthesis) {
      setHasSpeechSupport(false);
    }
  }, []);

  useEffect(() => {
    if (autoplay && hasSpeechSupport && text) {
      // Delay slightly for render cycles
      const timer = setTimeout(() => {
         speak();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [text, autoplay]);

  // Clean up speaking when element unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (!hasSpeechSupport) return;

    try {
      window.speechSynthesis.cancel(); // Stop anything currently playing

      const cleanText = text.replace(/[\/\(\)\-\[\]]/g, ' '); // Clean phonetics symbols
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.82; // Friendly, slower speed for kids
      utterance.pitch = 1.15; // Slightly cute, higher childish pitch

      // Try selecting a sweet female/Google voice
      const voices = window.speechSynthesis.getVoices();
      const cuteVoice = voices.find(v => 
        v.lang.startsWith('en') && 
        (
          v.name.toLowerCase().includes('google') || 
          v.name.toLowerCase().includes('zira') || 
          v.name.toLowerCase().includes('samantha') || 
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('natural')
        )
      ) || voices.find(v => v.lang.startsWith('en'));

      if (cuteVoice) {
        utterance.voice = cuteVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed', e);
      setIsPlaying(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playPop();
    speak();
  };

  if (childOnly) {
    return (
      <div 
        onClick={handleClick} 
        className={`cursor-pointer transition hover:scale-105 active:scale-95 ${className}`}
        title={text}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      id={`audio-speak-${text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center p-2 rounded-full cursor-pointer overflow-hidden transition-all duration-300 ${
        isPlaying
          ? 'bg-rose-400 text-white shadow-md scale-105 animate-pulse'
          : 'bg-rose-100 hover:bg-rose-200 text-rose-500 hover:scale-105 active:scale-95'
      } ${className}`}
      title="点击朗读 (Listen!)"
    >
      {isPlaying ? (
        <div className="flex items-center gap-1">
          <Volume2 className="h-4 w-4 animate-bounce" />
          <span className="flex gap-0.5 justify-center items-end h-3 w-3">
            <span className="w-[2px] bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-2"></span>
            <span className="w-[2px] bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-3"></span>
            <span className="w-[2px] bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-1.5"></span>
          </span>
        </div>
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </button>
  );
}
