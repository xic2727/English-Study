import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, Sparkles, Check, AlertCircle, RotateCcw } from 'lucide-react';
import { StoryItem } from '../types';
import { storiesData } from '../data';
import AudioPlayerButton from './AudioPlayerButton';
import { soundFX } from '../utils/sound';

interface StoryCornerProps {
  stories?: StoryItem[];
  lessonId?: 'lesson1' | 'lesson2';
}

export default function StoryCorner({ stories = storiesData, lessonId = 'lesson1' }: StoryCornerProps) {
  const [activeStoryId, setActiveStoryId] = useState<string>('');
  
  // Dialogue auto-play state
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState<number | null>(null);

  // Comprehension True/False states
  const [answers, setAnswers] = useState<{ [key: number]: boolean | null }>({});
  const [submitted, setSubmitted] = useState(false);

  // Initialize active story index
  useEffect(() => {
    if (stories && stories.length > 0) {
      setActiveStoryId(stories[0].id);
    }
  }, [stories]);

  const currentStory = stories.find(s => s.id === activeStoryId) || stories[0];

  // Cleanup speech synthesis when switching stories or lessons
  useEffect(() => {
    cancelSpeech();
    setIsPlayingAll(false);
    setCurrentLineIdx(null);
  }, [activeStoryId, lessonId]);

  const cancelSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Play dialogue sequentially
  const handlePlayAll = () => {
    if (isPlayingAll) {
      cancelSpeech();
      setIsPlayingAll(false);
      setCurrentLineIdx(null);
      return;
    }

    soundFX.playSuccess();
    setIsPlayingAll(true);
    playLine(0);
  };

  const playLine = (index: number) => {
    if (!currentStory || !currentStory.lines || index >= currentStory.lines.length) {
      setIsPlayingAll(false);
      setCurrentLineIdx(null);
      return;
    }

    setCurrentLineIdx(index);
    const line = currentStory.lines[index];

    // Read dialogue
    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;

    // Utilize speech synthesis voices if loaded
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => 
      v.lang.startsWith('en') && 
      ((line.speaker === 'Emma' || line.speaker === 'Rose')
        ? (v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('google us female') || v.name.toLowerCase().includes('female'))
        : (line.speaker === 'Mum' 
            ? (v.name.toLowerCase().includes('hazel') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('female'))
            : (v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('google us male') || v.name.toLowerCase().includes('male'))
          )
      )
    );

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      // Pause before transitioning to the next speaker
      setTimeout(() => {
        playLine(index + 1);
      }, 1200);
    };

    utterance.onerror = () => {
      setIsPlayingAll(false);
      setCurrentLineIdx(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Submit True/False questions
  const handleTFClick = (qIdx: number, val: boolean) => {
    soundFX.playChime();
    setAnswers(prev => ({ ...prev, [qIdx]: val }));
  };

  const handleCheckTFAnswers = () => {
    soundFX.playSuccess();
    setSubmitted(true);
  };

  const handleResetTF = () => {
    soundFX.playPop();
    setAnswers({});
    setSubmitted(false);
  };

  // Define dynamic story matching checks T/F mapping Lesson focuses
  const storyQuestions = lessonId === 'lesson2' ? [
    {
      id: 1,
      text: "1. Tina comes from China.",
      chinese: "Tina来自中国吗？ (其实她是Rose口中的伦敦笔友，喜欢中国文化哦！)",
      expected: false
    },
    {
      id: 2,
      text: "2. Mummy is frying eggs for lunch.",
      chinese: "妈妈正在煎鸡蛋准备我们的午饭？(是的，童谣里唱著 \"Eggs, eggs. I am frying eggs.\")",
      expected: true
    }
  ] : [
    {
      id: 1,
      text: "1. My mum likes chicken noodles.",
      chinese: "妈妈最喜欢鸡肉面吗？ (其实是我喜欢面条，妈妈喜欢蔬菜沙拉哦)",
      expected: false
    },
    {
      id: 2,
      text: "2. My favourite food is fish. My dad likes vegetable salad.",
      chinese: "我最喜欢吃鱼，爸爸喜欢蔬菜？(其实是我最爱西红柿炒鸡蛋，爸爸最爱吃米饭拼鱼肉哦)",
      expected: false
    }
  ];

  // Helper matching dialogue speaker emoji
  const getSpeakerEmojiAndLabel = (speaker: string) => {
    switch (speaker) {
      case 'Emma':
        return { emoji: '👧', label: 'Emma 艾玛' };
      case 'Rose':
        return { emoji: '👧', label: 'Rose 露丝' };
      case 'Dad':
        return { emoji: '👨', label: 'Dad 爸爸' };
      case 'Mum':
        return { emoji: '👩', label: 'Mum 妈妈' };
      default:
        return { emoji: '🐰', label: speaker };
    }
  };

  if (!currentStory) return null;

  return (
    <div className="w-full">
      {/* Story Selection Sub-tabs */}
      <div className="flex justify-center gap-3 mb-6">
        {stories.map(story => (
          <button
            id={`btn-select-${story.id}`}
            key={story.id}
            onClick={() => { soundFX.playPop(); setActiveStoryId(story.id); }}
            className={`px-5 py-3 rounded-full text-md font-bold shadow-sm transition flex items-center gap-2 cursor-pointer ${
              activeStoryId === story.id
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white scale-105 border-b-4 border-emerald-600'
                : 'bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-50'
            }`}
          >
            {story.emoji} {story.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStory.type === 'dialogue' ? (
          <motion.div
            key={currentStory.id + "-dialogue"}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="max-w-xl mx-auto"
          >
            {/* Dialogue list container */}
            <div className="bg-white rounded-3xl border-8 border-emerald-100 p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-extrabold text-emerald-500 uppercase">🎭 课本对话在线读</span>
                <button
                  id="btn-play-all-dialogue"
                  onClick={handlePlayAll}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
                    isPlayingAll 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-extrabold'
                  }`}
                >
                  <Play className="h-4 w-4 fill-current" />
                  {isPlayingAll ? "停止朗读" : "分角色自动朗读"}
                </button>
              </div>

              {/* Course Title cover block */}
              <div className="text-center bg-emerald-50/50 p-4 rounded-2xl mb-6 border border-emerald-100">
                <h3 className="text-xl md:text-2xl font-extrabold font-comic text-emerald-800">
                  {currentStory.title}
                </h3>
                <p className="text-sm font-bold text-emerald-500">
                  {currentStory.titleChinese}
                </p>
                <p className="text-xs text-gray-400 mt-1.5 font-semibold leading-relaxed">
                  {currentStory.introduction}
                </p>
              </div>

              {/* Chat lines sequence */}
              <div className="flex flex-col gap-5 py-4">
                {currentStory.lines?.map((line, lIdx) => {
                  const speakerInfo = getSpeakerEmojiAndLabel(line.speaker);
                  // Align speakers to left/right for neat theatrical dialogue flow
                  const isLeftSpeaker = line.speaker === 'Emma' || line.speaker === 'Mum';
                  const isActive = isPlayingAll && currentLineIdx === lIdx;

                  return (
                    <div
                      id={`dialogue-line-${lIdx}`}
                      key={lIdx}
                      className={`flex gap-3 items-start ${isLeftSpeaker ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Speaker Badge */}
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2.5xl shadow-md border shrink-0 ${
                        isLeftSpeaker ? 'bg-pink-100 border-pink-250 animate-[pulse_3s_infinite]' : 'bg-sky-100 border-sky-250'
                      }`}>
                        {speakerInfo.emoji}
                      </div>

                      {/* Chat text Bubble */}
                      <div
                        onClick={() => {
                          soundFX.playPop();
                          setCurrentLineIdx(lIdx);
                          cancelSpeech();
                          const speech = new SpeechSynthesisUtterance(line.text);
                          speech.lang = 'en-US';
                          speech.rate = 0.85;
                          window.speechSynthesis.speak(speech);
                        }}
                        className={`max-w-[75%] p-4 rounded-2xl cursor-pointer transition border shadow-sm relative text-left ${
                          isActive
                            ? 'bg-yellow-105 border-yellow-300 ring-4 ring-yellow-105 shadow-md scale-[1.02]'
                            : isLeftSpeaker
                            ? 'bg-rose-50/70 hover:bg-rose-100/30 text-gray-800 border-rose-100 rounded-tl-none'
                            : 'bg-sky-50/70 hover:bg-sky-100/30 text-gray-800 border-sky-100 rounded-tr-none'
                        }`}
                      >
                        {/* Name label */}
                        <span className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${
                          isLeftSpeaker ? 'text-pink-500' : 'text-sky-500'
                        }`}>
                          {speakerInfo.label}
                        </span>

                        <p className="font-comic font-extrabold text-md md:text-lg leading-snug">
                          {line.text}
                        </p>
                        
                        <p className="text-xs text-gray-500 font-bold mt-2 leading-relaxed pt-1.5 border-t border-dashed border-gray-200/50">
                          {line.chinese}
                        </p>

                        {!isPlayingAll && (
                          <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 text-gray-300 hover:text-emerald-500 border shadow-sm">
                            <Volume2 className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentStory.id + "-passage"}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="max-w-xl mx-auto"
          >
            {/* Paragraph / Song Lyrics panel */}
            <div className="bg-white rounded-3xl border-8 border-teal-100 p-6 shadow-xl relative mb-6">
              <span className="text-xs font-extrabold text-teal-600 block mb-3 uppercase tracking-wide">
                 🍲 双语美文随身听 (Listen and Play)
              </span>

              <div className="text-center bg-teal-50/50 p-4 rounded-2xl mb-6 border border-teal-100">
                <h3 className="text-xl md:text-2xl font-extrabold font-comic text-teal-800">
                  {currentStory.title}
                </h3>
                <p className="text-sm font-bold text-teal-500">
                  {currentStory.titleChinese}
                </p>
                <p className="text-xs text-gray-400 mt-1 font-semibold leading-relaxed">
                  点击以下任意乐句积木即可聆听正规英语语音，快来大声朗读吧！
                </p>
              </div>

              {/* Interactive block grids */}
              <div className="flex flex-col gap-4">
                {currentStory.paragraphs?.map((pText, pIdx) => (
                  <div
                    id={`passage-p-${pIdx}`}
                    key={pIdx}
                    onClick={() => {
                      soundFX.playPop();
                      cancelSpeech();
                      const utterance = new SpeechSynthesisUtterance(pText);
                      utterance.lang = 'en-US';
                      utterance.rate = 0.82;
                      window.speechSynthesis.speak(utterance);
                    }}
                    className="p-4 rounded-2xl bg-teal-50/25 hover:bg-teal-50/80 border border-teal-100/40 cursor-pointer shadow-sm transition flex gap-3 items-center justify-between group text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-comic font-extrabold text-md md:text-lg leading-relaxed text-gray-750">
                        {pText}
                      </p>
                      <p className="text-xs text-teal-600 font-bold mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {currentStory.paragraphsChinese?.[pIdx]}
                      </p>
                    </div>
                    <span className="bg-teal-50 group-hover:bg-teal-550 group-hover:text-white rounded-full p-2 text-teal-500 transition shadow-sm shrink-0">
                      <Volume2 className="h-4.5 w-4.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* True/False assessment and quiz */}
            <div className="bg-white rounded-3xl border-8 border-teal-100 p-6 shadow-xl text-left">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg animate-bounce">✏️</span>
                <h4 className="text-base md:text-lg font-extrabold text-teal-800 leading-none">
                 课文理解小练习: 判断正(T) 误(F)
                 </h4>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                {storyQuestions.map((q) => {
                  const selection = answers[q.id];
                  const isCorrect = selection === q.expected;
                  return (
                    <div id={`tf-item-${q.id}`} key={q.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]">
                      <p className="font-comic font-extrabold text-sm md:text-md text-gray-800 leading-tight">
                        {q.text}
                      </p>
                      <p className="text-xs font-bold text-gray-400 mt-1 mb-3.5">
                        {q.chinese}
                      </p>

                      <div className="flex gap-4 items-center">
                        <button
                          id={`tf-btn-t-${q.id}`}
                          disabled={submitted}
                          onClick={() => handleTFClick(q.id, true)}
                          className={`py-1.5 px-6 rounded-full font-extrabold font-comic text-xs border transition cursor-pointer ${
                            selection === true
                              ? 'bg-amber-400 text-white border-amber-500 scale-105'
                              : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-500'
                          }`}
                        >
                          T (正确)
                        </button>
                        <button
                          id={`tf-btn-f-${q.id}`}
                          disabled={submitted}
                          onClick={() => handleTFClick(q.id, false)}
                          className={`py-1.5 px-6 rounded-full font-extrabold font-comic text-xs border transition cursor-pointer ${
                            selection === false
                              ? 'bg-amber-400 text-white border-amber-500 scale-105'
                              : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-500'
                          }`}
                        >
                          F (错误)
                        </button>

                        {submitted && (
                          <div className="flex-1 flex justify-end">
                            {isCorrect ? (
                              <span className="flex items-center gap-1 text-green-600 font-black text-xs bg-green-50 px-3 py-1.5 rounded-full border border-green-200 animate-bounce">
                                 选对啦! 👍
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-500 font-extrabold text-xs bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                                 选错咯! 😮
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!submitted ? (
                <button
                  id="tf-submit"
                  disabled={Object.keys(answers).length < storyQuestions.length}
                  onClick={handleCheckTFAnswers}
                  className="w-full py-4 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-extrabold disabled:opacity-30 disabled:pointer-events-none hover:shadow-md transition text-sm cursor-pointer"
                >
                  提交答案并获取勋章 🎯
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    id="tf-retry"
                    onClick={handleResetTF}
                    className="flex-1 py-4.5 rounded-full bg-gray-100 hover:bg-gray-205 text-gray-650 font-extrabold text-sm border cursor-pointer"
                  >
                    重置，再答一次
                  </button>
                  <div className="bg-teal-50 border border-teal-100 flex items-center justify-center font-extrabold text-teal-800 text-xs px-5 rounded-full select-none shrink-0">
                    得分: {Object.keys(answers).filter(k => answers[Number(k)] === storyQuestions.find(q=>q.id === Number(k))?.expected).length * 50} / 100 !
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
