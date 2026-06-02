export interface WordItem {
  id: string;
  english: string;
  chinese: string;
  phonetic: string;
  category: string;
  emoji: string;
  sentence?: string;
  sentenceChinese?: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  chinese: string;
}

export interface StoryItem {
  id: string;
  title: string;
  titleChinese: string;
  introduction: string;
  lines: DialogueLine[];
  paragraphs?: string[];
  paragraphsChinese?: string[];
  type: string;
  emoji: string;
  bgColor: string;
}

export interface ListeningQuestion {
  id: string;
  audioPrompt: string; // The phrase read by SpeechSynthesis
  chineseInstruction: string;
  options: {
    key: string;
    text: string;
    label: string;
  }[];
  correctAnswer: string;
  type: string;
  hint: string;
}

export interface MatchPair {
  id: string;
  character: {
    name: string;
    avatar: string;
    gender: 'boy' | 'girl';
    index: number;
  };
  activity: {
    description: string;
    chinese: string;
    imagePlaceholder: string;
    emoji: string;
  };
  key: string; // e.g., 'A', 'B', 'C', 'D', 'E'
}

export interface UnscrambleItem {
  id: string;
  correctWord: string;
  scrambled: string;
  chinese: string;
  emoji: string;
  category: string;
}

export interface GrammarMistakeItem {
  id: string;
  wrongSentence: string;
  wrongWord: string;
  correctedWord: string;
  fullCorrectSentence: string;
  chinese: string;
  emoji: string;
}
