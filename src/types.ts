export interface WordItem {
  id: string;
  english: string;
  chinese: string;
  phonetic: string;
  category: 'clothes' | 'toys' | 'food' | 'grammar' | 'animals' | 'general';
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
  type: 'dialogue' | 'passage';
  emoji: string;
  bgColor: string;
}

export interface ListeningQuestion {
  id: string;
  audioPrompt: string; // The phrase read by SpeechSynthesis
  chineseInstruction: string;
  options: {
    key: 'A' | 'B';
    text: string;
    label: string;
  }[];
  correctAnswer: 'A' | 'B';
  type: 'category' | 'sentence' | 'response';
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
