import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, SkipForward, Landmark, BookOpen, Volume2, Sparkles, Check, AlertCircle } from 'lucide-react';
import { storiesData } from '../data';
import AudioPlayerButton from './AudioPlayerButton';
import { soundFX } from '../utils/sound';

export default function StoryCorner() {
  const [activeStoryId, setActiveStoryId] = useState<string>('story1');
  
  // Dialogue auto-play state
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState<number | null>(null);

  // Comprehension True/False states
  const [answers, setAnswers] = useState<{ [key: number]: boolean | null }>({});
  const [submitted, setSubmitted] = useState(false);

  const currentStory = storiesData.find(s => s.id === activeStoryId)!;

  // Cleanup synthesizer when toggling stories
  useEffect(() => {
    cancelSpeech();
    setIsPlayingAll(false);
    setCurrentLineIdx(null);
  }, [activeStoryId]);

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
    if (index >= currentStory.lines.length) {
      setIsPlayingAll(false);
      setCurrentLineIdx(null);
      return;
    }

    setCurrentLineIdx(index);
    const line = currentStory.lines[index];

    // Read dialogue
    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.1;

    // Use proper voices based on speaker
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => 
      v.lang.startsWith('en') && 
      (line.speaker === 'Emma' 
        ? (v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('female'))
        : (v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('google us') || v.name.toLowerCase().includes('male')))
    );

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      // Small pause before moving on to Dad/Emma
      setTimeout(() => {
        playLine(index + 1);
      }, 1000);
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

  const storyQuestions = [
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

  return (
    <div className="w-full">
      {/* Story Selectors */}
      <div className="flex justify-center gap-3 mb-6">
        {storiesData.map(story => (
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
        {activeStoryId === 'story1' && (
          <motion.div
            key="story1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="max-w-xl mx-auto"
          >
            {/* Emma & Dad Dialogues */}
            <div className="bg-white rounded-3xl border-8 border-emerald-100 p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-extrabold text-emerald-500 uppercase">🎭 课本对话在线读</span>
                <button
                  id="btn-play-all-dialogue"
                  onClick={handlePlayAll}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer transition ${
                    isPlayingAll 
                    ? 'bg-red-400 text-white animate-pulse' 
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                  }`}
                >
                  <Play className="h-4.5 w-4.5 fill-current" />
                  {isPlayingAll ? "停止播放" : "分角色自动播放"}
                </button>
              </div>

              {/* Title board */}
              <div className="text-center bg-emerald-50/50 p-4 rounded-2xl mb-6 border border-emerald-100">
                <h3 className="text-2xl font-extrabold font-comic text-emerald-800">
                  {currentStory.title}
                </h3>
                <p className="text-sm font-bold text-emerald-500">
                  {currentStory.titleChinese}
                </p>
                <p className="text-xs text-gray-400 mt-1 font-semibold leading-relaxed">
                  {currentStory.introduction}
                </p>
              </div>

              {/* Chat lines container */}
              <div className="flex flex-col gap-5 py-4">
                {currentStory.lines.map((line, lIdx) => {
                  const isEmma = line.speaker === 'Emma';
                  const isActive = isPlayingAll && currentLineIdx === lIdx;

                  return (
                    <div
                      id={`dialogue-line-${lIdx}`}
                      key={lIdx}
                      className={`flex gap-3 items-start ${isEmma ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Avatar */}
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl shadow-md ${
                        isEmma ? 'bg-pink-100 border border-pink-200' : 'bg-blue-100 border border-blue-200'
                      }`}>
                        {isEmma ? '👧' : '👨'}
                      </div>

                      {/* Bubble */}
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
                        className={`max-w-[75%] p-4 rounded-2xl cursor-pointer transition border shadow-sm relative ${
                          isActive
                            ? 'bg-yellow-100 border-yellow-300 ring-4 ring-yellow-200 shadow-md scale-[1.03]'
                            : isEmma
                            ? 'bg-rose-50 hover:bg-rose-100/50 text-gray-800 border-rose-100 rounded-tl-none'
                            : 'bg-sky-50 hover:bg-sky-100/50 text-gray-800 border-sky-100 rounded-tr-none'
                        }`}
                      >
                        {/* Speaker Name Tag */}
                        <span className={`text-[10px] font-extrabold uppercase block mb-1 ${
                          isEmma ? 'text-pink-500' : 'text-blue-500'
                        }`}>
                          {line.speaker} {isEmma ? '艾玛' : '爸爸'}
                        </span>

                        <p className="font-comic font-extrabold text-md leading-normal">
                          {line.text}
                        </p>
                        
                        <p className="text-xs text-gray-500 font-bold mt-1.5 leading-relaxed pt-1.5 border-t border-dashed border-gray-200/50">
                          {line.chinese}
                        </p>

                        {!isPlayingAll && (
                          <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 text-gray-300 hover:text-rose-400 border shadow-sm">
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
        )}

        {activeStoryId === 'story2' && (
          <motion.div
            key="story2"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="max-w-xl mx-auto"
          >
            {/* Passage Panel */}
            <div className="bg-white rounded-3xl border-8 border-teal-100 p-6 shadow-xl relative mb-6">
              <span className="text-xs font-extrabold text-teal-600 block mb-3 uppercase tracking-wide">
                 🍲 双语课文随身听
              </span>

              {/* Title card */}
              <div className="text-center bg-teal-50/50 p-4 rounded-2xl mb-6 border border-teal-100">
                <h3 className="text-2xl font-extrabold font-comic text-teal-800">
                  {currentStory.title}
                </h3>
                <p className="text-sm font-bold text-teal-500">
                  {currentStory.titleChinese}
                </p>
                <p className="text-xs text-gray-400 mt-1 font-semibold">
                  点击下面的任何一句，都能播放美妙流畅的发音，并带你理解翻译哦！
                </p>
              </div>

              {/* Paragraph list */}
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
                    className="p-4 rounded-2xl bg-teal-50/20 hover:bg-teal-50/70 border border-teal-50 cursor-pointer shadow-sm transition flex gap-3 items-center justify-between group"
                  >
                    <div className="flex-1">
                      <p className="font-comic font-extrabold text-md md:text-lg leading-relaxed text-gray-700">
                        {pText}
                      </p>
                      <p className="text-xs text-teal-600 font-bold mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {currentStory.paragraphsChinese?.[pIdx]}
                      </p>
                    </div>
                    <span className="bg-teal-100 group-hover:bg-teal-500 group-hover:text-white rounded-full p-2 text-teal-500 transition shadow-sm">
                      <Volume2 className="h-4 w-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehension check True or False */}
            <div className="bg-white rounded-3xl border-8 border-teal-100 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg animate-bounce">✍️</span>
                <h4 className="text-lg font-extrabold text-teal-800">
                 同步阅读小练习: 判断正(T)误(F)
                </h4>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                {storyQuestions.map((q, idx) => {
                  const selection = answers[q.id];
                  const isCorrect = selection === q.expected;
                  return (
                    <div id={`tf-item-${q.id}`} key={q.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="font-comic font-extrabold text-sm md:text-md text-gray-800">
                        {q.text}
                      </p>
                      <p className="text-xs font-bold text-gray-400 mt-1 mb-3.5">
                        {q.chinese}
                      </p>

                      <div className="flex gap-4">
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
                              <span className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                <Check className="h-3.5 w-3.5 stroke-[3px]" /> 选对啦!
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-500 font-bold text-xs bg-red-50 px-3 py-1 rounded-full border border-red-200">
                                <AlertCircle className="h-3.5 w-3.5" /> 选错咯!
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
                  className="w-full py-3.5 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-extrabold disabled:opacity-30 disabled:pointer-events-none hover:shadow-md transition text-sm cursor-pointer"
                >
                  提交判断 🎯
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    id="tf-retry"
                    onClick={handleResetTF}
                    className="flex-1 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-extrabold text-sm cursor-pointer"
                  >
                    再玩一次
                  </button>
                  <div className="bg-teal-550 flex items-center justify-center font-extrabold text-teal-800 text-xs px-2 px-4 rounded-full">
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
