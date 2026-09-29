const grammarQuizData = require('./grammar_quiz.js');
const grammarData = require('./grammar_data.js');
const vocabData = require('./vocab_data.js');

// All vocab words pool for wrong answers
const allVocabWords = [];
vocabData.forEach(cat => {
  cat.words.forEach(w => {
    const parts = w.split(' = ');
    if (parts.length === 2) {
      allVocabWords.push({ eng: parts[0].trim(), kh: parts[1].trim() });
    }
  });
});

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateVocabQuiz(lessonContent, lessonType) {
  // Parse words from lesson content (format: "1. word = ន...")
  const lines = lessonContent.split('\n');
  const words = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s*(.+?)\s*=\s*(.+)$/);
    if (match) {
      words.push({ eng: match[1].trim(), kh: match[2].trim() });
    }
  }

  if (words.length < 4) return null;

  const questions = [];
  const shuffledWords = shuffle(words).slice(0, 10);

  for (let i = 0; i < shuffledWords.length; i++) {
    const word = shuffledWords[i];
    const direction = i % 2 === 0 ? 'en2kh' : 'kh2en';

    let question, correct, wrongPool;

    if (direction === 'en2kh') {
      question = `"${word.eng}" ប្រែជាភាសាខ្មែរថាអ្វី?`;
      correct = word.kh;
      wrongPool = allVocabWords.filter(w => w.kh !== correct);
    } else {
      question = `"${word.kh}" ប្រែជាភាសាអង់គ្លេសថាអ្វី?`;
      correct = word.eng;
      wrongPool = allVocabWords.filter(w => w.eng !== correct);
    }

    const wrongs = shuffle(wrongPool).slice(0, 3).map(w => direction === 'en2kh' ? w.kh : w.eng);
    const choices = shuffle([correct, ...wrongs]);
    const labels = ['A', 'B', 'C', 'D'];
    const correctLabel = labels[choices.indexOf(correct)];

    questions.push({
      q: question,
      c: choices.map((ch, idx) => `${labels[idx]}) ${ch}`),
      a: correctLabel
    });
  }

  return questions;
}

function generateGrammarQuiz(lessonContent) {
  // Find matching grammar topic from quiz data
  for (const gd of grammarData) {
    if (lessonContent.includes(gd.topic)) {
      const quizEntry = grammarQuizData.find(q => q.topic === gd.topic);
      if (quizEntry) return quizEntry.questions;
    }
  }
  // Fallback: pick a random grammar quiz
  const randomEntry = grammarQuizData[Math.floor(Math.random() * grammarQuizData.length)];
  return randomEntry.questions;
}

function generateConversationQuiz() {
  const convQuestions = [
    { q: "How do you say 'Good morning' in English?", c: ["A) Good night", "B) Good morning", "C) Good afternoon", "D) Goodbye"], a: "B" },
    { q: "When meeting someone new, you say?", c: ["A) Goodbye", "B) See you later", "C) Nice to meet you", "D) Good night"], a: "C" },
    { q: "To ask for directions, you say 'Excuse me, ___?'", c: ["A) where are you?", "B) where is the school?", "C) how are you?", "D) what is your name?"], a: "B" },
    { q: "'Turn left' means?", c: ["A) ទៅត្រង់", "B) បត់ស្តាំ", "C) ឈប់", "D) បត់ឆ្វេង"], a: "D" },
    { q: "At a shop, you ask for the price by saying?", c: ["A) How much is this?", "B) Where is this?", "C) What is this?", "D) Who made this?"], a: "A" },
    { q: "'I would like to order...' is used when?", c: ["A) At a bank", "B) At a restaurant", "C) At a school", "D) At home"], a: "B" },
    { q: "'My name is Tom.' - This is a ___.", c: ["A) Question", "B) Self-introduction", "C) Goodbye", "D) Request"], a: "B" },
    { q: "A polite response to 'How are you?' is?", c: ["A) I am Tom.", "B) Fine, thank you.", "C) Goodbye.", "D) Please."], a: "B" },
    { q: "'Next to' means?", c: ["A) ខ្ចោយ", "B) ឆ្ងាយ", "C) ជិត/នៅជាប់", "D) ខ្ពស់"], a: "C" },
    { q: "What do you say when leaving?", c: ["A) Hello!", "B) Good morning!", "C) Goodbye! / See you!", "D) Nice to meet you!"], a: "C" }
  ];
  return shuffle(convQuestions).slice(0, 10);
}

function generateSentenceQuiz() {
  const sentQuestions = [
    { q: "'I want to sleep.' ប្រែជាខ្មែរ?", c: ["A) ខ្ញុំស្អប់ការគេង", "B) ខ្ញុំចង់គេង", "C) ខ្ញុំកំពុងគេង", "D) ខ្ញុំបានគេង"], a: "B" },
    { q: "'I like books.' ប្រែជាខ្មែរ?", c: ["A) ខ្ញុំស្អប់សៀវភៅ", "B) ខ្ញុំអានសៀវភៅ", "C) ខ្ញុំចូលចិត្តសៀវភៅ", "D) ខ្ញុំទិញសៀវភៅ"], a: "C" },
    { q: "Complete: 'I want to ___.'", c: ["A) happy", "B) eat", "C) quickly", "D) beautiful"], a: "B" },
    { q: "'I like reading.' - 'reading' is?", c: ["A) Verb", "B) Noun", "C) Gerund (V-ing used as noun)", "D) Adjective"], a: "C" },
    { q: "Which sentence is correct?", c: ["A) I want to eating.", "B) I want eat.", "C) I want to eat.", "D) I wanting eat."], a: "C" },
    { q: "Fill in: 'I like ___ football.'", c: ["A) to play / playing", "B) played", "C) plays", "D) was play"], a: "A" },
    { q: "'What do you want to do?' - ប្រែជាខ្មែរ?", c: ["A) អ្នកចូលចិត្តអ្វី?", "B) អ្នកចង់ទៅណា?", "C) តើអ្នកចង់ធ្វើអ្វី?", "D) អ្នករៀននៅណា?"], a: "C" },
    { q: "Which means 'I enjoy singing'?", c: ["A) I want to sing.", "B) I like singing.", "C) I can sing.", "D) I must sing."], a: "B" },
    { q: "Correct sentence: ___", c: ["A) She like dance.", "B) She likes to dance.", "C) She liking dance.", "D) She liked dancing always."], a: "B" },
    { q: "'I want to be a doctor.' - ប្រែជាខ្មែរ?", c: ["A) ខ្ញុំចង់ជួបគ្រូពេទ្យ", "B) ខ្ញុំចង់ក្លាយជាគ្រូពេទ្យ", "C) ខ្ញុំជាគ្រូពេទ្យ", "D) ខ្ញុំស្គាល់គ្រូពេទ្យ"], a: "B" }
  ];
  return shuffle(sentQuestions).slice(0, 10);
}

/**
 * Main function: generate 10 quiz questions from a lesson
 * @param {object} lesson - lesson object with .title and .content
 * @returns {Array} - array of 10 {q, c, a} question objects
 */
function generateQuiz(lesson) {
  const title = lesson.title || '';
  const content = lesson.content || '';

  if (title.includes('វេយ្យាករណ៍') || title.includes('Grammar')) {
    return generateGrammarQuiz(content);
  } else if (title.includes('ពាក្យ') || title.includes('Vocabulary')) {
    return generateVocabQuiz(content, 'vocab');
  } else if (title.includes('កិរិយាសព្ទ') || title.includes('Verb')) {
    return generateVocabQuiz(content, 'verbs');
  } else if (title.includes('គុណនាម') || title.includes('Adjective')) {
    return generateVocabQuiz(content, 'adjectives');
  } else if (title.includes('សន្ទនា') || title.includes('Conversation')) {
    return generateConversationQuiz();
  } else if (title.includes('ល្បះ') || title.includes('Sentence')) {
    return generateSentenceQuiz();
  }

  // Fallback
  return generateGrammarQuiz(content);
}

module.exports = { generateQuiz };
