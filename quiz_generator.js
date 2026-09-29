const grammarQuizData = require('./grammar_quiz.js');
const grammarData = require('./grammar_data.js');
const vocabData = require('./vocab_data.js');
const irregularVerbs = require('./irregular_verbs.js');

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

// All irregular verbs pool
const allVerbs = [];
Object.values(irregularVerbs).forEach(group => {
  if (Array.isArray(group)) {
    group.forEach(v => allVerbs.push(v));
  }
});

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateVocabQuiz(lessonContent, lessonType) {
  // Parse words from lesson content (format: "1. word = ន..." or "1. 🇬🇧 word = 🇰🇭 ន...")
  const lines = lessonContent.split('\n');
  const words = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s*(?:🇬🇧\s*)?(.+?)\s*=\s*(?:🇰🇭\s*)?(.+)$/);
    if (match) {
      const eng = match[1].replace(/^[🇬🇧\s]+/, '').trim();
      const kh = match[2].replace(/^[🇰🇭\s]+/, '').trim();
      if (eng && kh) {
        words.push({ eng, kh });
      }
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
  for (const gd of grammarData) {
    if (lessonContent.includes(gd.topic)) {
      const quizEntry = grammarQuizData.find(q => q.topic === gd.topic);
      if (quizEntry) return quizEntry.questions;
    }
  }
  const randomEntry = grammarQuizData[Math.floor(Math.random() * grammarQuizData.length)];
  return randomEntry.questions;
}

const CONV_QUESTION_BANK = [
  { q: "How do you say 'Good morning' in English?", c: ["A) Good night", "B) Good morning", "C) Good afternoon", "D) Goodbye"], a: "B" },
  { q: "When meeting someone new, you say?", c: ["A) Goodbye", "B) See you later", "C) Nice to meet you", "D) Good night"], a: "C" },
  { q: "To ask for directions, you say 'Excuse me, ___?'", c: ["A) where are you?", "B) where is the school?", "C) how are you?", "D) what is your name?"], a: "B" },
  { q: "'Turn left' means?", c: ["A) ទៅត្រង់", "B) បត់ស្តាំ", "C) ឈប់", "D) បត់ឆ្វេង"], a: "D" },
  { q: "At a shop, you ask for the price by saying?", c: ["A) How much is this?", "B) Where is this?", "C) What is this?", "D) Who made this?"], a: "A" },
  { q: "'I would like to order...' is used when?", c: ["A) At a bank", "B) At a restaurant", "C) At a school", "D) At home"], a: "B" },
  { q: "'My name is Tom.' - This is a ___.", c: ["A) Question", "B) Self-introduction", "C) Goodbye", "D) Request"], a: "B" },
  { q: "A polite response to 'How are you?' is?", c: ["A) I am Tom.", "B) Fine, thank you.", "C) Goodbye.", "D) Please."], a: "B" },
  { q: "'Next to' means?", c: ["A) ក្រោយ", "B) ឆ្ងាយ", "C) ជិត/នៅជាប់", "D) ខ្ពស់"], a: "C" },
  { q: "What do you say when leaving?", c: ["A) Hello!", "B) Good morning!", "C) Goodbye! / See you!", "D) Nice to meet you!"], a: "C" },
  { q: "How do you say 'អរគុណច្រើន' in English?", c: ["A) You're welcome", "B) Thank you very much", "C) Excuse me", "D) I'm sorry"], a: "B" },
  { q: "When someone says 'Thank you', you reply?", c: ["A) Please", "B) You're welcome", "C) No problem at all", "D) Both B and C"], a: "D" },
  { q: "To apologize politely, you say?", c: ["A) I am fine", "B) I am happy", "C) I am sorry", "D) I don't care"], a: "C" },
  { q: "To ask someone's age, you say?", c: ["A) How old are you?", "B) How are you?", "C) Where are you?", "D) What are you?"], a: "A" },
  { q: "At a hotel check-in, you say?", c: ["A) I have a reservation", "B) How much is milk?", "C) Bye bye", "D) What time is it?"], a: "A" },
  { q: "'Can you help me?' means?", c: ["A) តើអ្នកអាចជួយខ្ញុំបានទេ?", "B) តើអ្នកទៅណា?", "C) ខ្ញុំចង់ជួយអ្នក", "D) អ្នកសុខសប្បាយទេ?"], a: "A" },
  { q: "To ask the time, you say?", c: ["A) What day is today?", "B) What time is it?", "C) Where is the clock?", "D) When do you sleep?"], a: "B" },
  { q: "'Have a nice day!' is said when?", c: ["A) Going to sleep", "B) Wishing someone well upon parting", "C) Waking up in middle of night", "D) Asking for money"], a: "B" },
  { q: "'Could you speak more slowly, please?' is used when?", c: ["A) You understand perfectly", "B) The speaker is too fast", "C) You are angry", "D) You are leaving"], a: "B" },
  { q: "How do you ask someone's occupation?", c: ["A) What do you do?", "B) How do you do?", "C) Where do you do?", "D) Why do you do?"], a: "A" },
  { q: "'Where are you from?' asks for?", c: ["A) Your job", "B) Your origin/country", "C) Your hobby", "D) Your school"], a: "B" },
  { q: "'Pleased to meet you' has the same meaning as?", c: ["A) Nice to meet you", "B) See you tomorrow", "C) Take care", "D) I don't know you"], a: "A" }
];

function generateConversationQuiz(count = 10) {
  return shuffle(CONV_QUESTION_BANK).slice(0, count);
}

const SENT_QUESTION_BANK = [
  { q: "'I want to sleep.' ប្រែជាខ្មែរ?", c: ["A) ខ្ញុំស្អប់ការគេង", "B) ខ្ញុំចង់គេង", "C) ខ្ញុំកំពុងគេង", "D) ខ្ញុំបានគេង"], a: "B" },
  { q: "'I like books.' ប្រែជាខ្មែរ?", c: ["A) ខ្ញុំស្អប់សៀវភៅ", "B) ខ្ញុំអានសៀវភៅ", "C) ខ្ញុំចូលចិត្តសៀវភៅ", "D) ខ្ញុំទិញសៀវភៅ"], a: "C" },
  { q: "Complete: 'I want to ___.'", c: ["A) happy", "B) eat", "C) quickly", "D) beautiful"], a: "B" },
  { q: "'I like reading.' - 'reading' is?", c: ["A) Verb", "B) Noun", "C) Gerund (V-ing used as noun)", "D) Adjective"], a: "C" },
  { q: "Which sentence is correct?", c: ["A) I want to eating.", "B) I want eat.", "C) I want to eat.", "D) I wanting eat."], a: "C" },
  { q: "Fill in: 'I like ___ football.'", c: ["A) to play / playing", "B) played", "C) plays", "D) was play"], a: "A" },
  { q: "'What do you want to do?' - ប្រែជាខ្មែរ?", c: ["A) អ្នកចូលចិត្តអ្វី?", "B) អ្នកចង់ទៅណា?", "C) តើអ្នកចង់ធ្វើអ្វី?", "D) អ្នករៀននៅណា?"], a: "C" },
  { q: "Which means 'I enjoy singing'?", c: ["A) I want to sing.", "B) I like singing.", "C) I can sing.", "D) I must sing."], a: "B" },
  { q: "Correct sentence: ___", c: ["A) She like dance.", "B) She likes to dance.", "C) She liking dance.", "D) She liked dancing always."], a: "B" },
  { q: "'I want to be a doctor.' - ប្រែជាខ្មែរ?", c: ["A) ខ្ញុំចង់ជួបគ្រូពេទ្យ", "B) ខ្ញុំចង់ក្លាយជាគ្រូពេទ្យ", "C) ខ្ញុំជាគ្រូពេទ្យ", "D) ខ្ញុំស្គាល់គ្រូពេទ្យ"], a: "B" },
  { q: "Which sentence is in Present Continuous?", c: ["A) I eat rice.", "B) I am eating rice.", "C) I ate rice.", "D) I will eat rice."], a: "B" },
  { q: "Choose correct form: 'They ___ to school every day.'", c: ["A) goes", "B) go", "C) going", "D) gone"], a: "B" },
  { q: "Choose correct negative sentence:", c: ["A) He doesn't likes tea.", "B) He don't like tea.", "C) He doesn't like tea.", "D) He not like tea."], a: "C" },
  { q: "Complete: 'She has ___ English for three years.'", c: ["A) learn", "B) learned / learnt", "C) learning", "D) learns"], a: "B" },
  { q: "'If it rains, I ___ at home.'", c: ["A) stay", "B) will stay", "C) stayed", "D) would stay"], a: "B" },
  { q: "Which question is correct?", c: ["A) Where you live?", "B) Where do you live?", "C) Where does you live?", "D) Where are you live?"], a: "B" },
  { q: "'He is taller ___ his brother.'", c: ["A) that", "B) then", "C) than", "D) as"], a: "C" },
  { q: "Correct passive sentence: 'The book was ___ by him.'", c: ["A) write", "B) wrote", "C) written", "D) writing"], a: "C" },
  { q: "'There ___ three apples on the table.'", c: ["A) is", "B) are", "C) was", "D) be"], a: "B" },
  { q: "Choose the correct order: 'She bought a ___ car.'", c: ["A) red beautiful new", "B) beautiful new red", "C) new red beautiful", "D) red new beautiful"], a: "B" }
];

function generateSentenceQuiz(count = 10) {
  return shuffle(SENT_QUESTION_BANK).slice(0, count);
}

/**
 * Generate Verb questions (testing V1, V2, V3, and Khmer translation)
 */
function generateVerbQuestions(count = 20) {
  const pool = allVerbs.length > 0 ? allVerbs : [
    { v1: "go", v2: "went", v3: "gone", kh: "ទៅ" },
    { v1: "eat", v2: "ate", v3: "eaten", kh: "ញ៉ាំ" },
    { v1: "see", v2: "saw", v3: "seen", kh: "ឃើញ" },
    { v1: "take", v2: "took", v3: "taken", kh: "យក" },
    { v1: "write", v2: "wrote", v3: "written", kh: "សរសេរ" },
    { v1: "speak", v2: "spoke", v3: "spoken", kh: "និយាយ" }
  ];

  const shuffled = shuffle(pool);
  const questions = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const verb = shuffled[i];
    const type = i % 3;

    let question, correct, wrongPool;

    if (type === 0) {
      question = `តើ Past Simple (V2) នៃកិរិយាសព្ទ "${verb.v1}" គឺជាអ្វី?`;
      correct = verb.v2;
      wrongPool = pool.filter(v => v.v2 !== correct).map(v => v.v2);
    } else if (type === 1) {
      question = `តើ Past Participle (V3) នៃកិរិយាសព្ទ "${verb.v1}" គឺជាអ្វី?`;
      correct = verb.v3;
      wrongPool = pool.filter(v => v.v3 !== correct).map(v => v.v3);
    } else {
      question = `កិរិយាសព្ទ "${verb.v1}" (${verb.kh}) មានទម្រង់ V1-V2-V3 ត្រឹមត្រូវគឺ?`;
      correct = `${verb.v1} - ${verb.v2} - ${verb.v3}`;
      wrongPool = pool.filter(v => v.v1 !== verb.v1).map(v => `${v.v1} - ${v.v2} - ${v.v3}`);
    }

    const wrongs = shuffle(wrongPool).slice(0, 3);
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

/**
 * Subject metadata for Annual Exams
 */
const SUBJECT_EXAMS = {
  grammar: {
    id: 'grammar',
    title: 'មុខវិជ្ជា៖ វេយ្យាករណ៍ភាសាអង់គ្លេស (Grammar in Use)',
    shortTitle: 'វេយ្យាករណ៍ (Grammar)',
    description: 'ការប្រឡងបញ្ចប់មុខវិជ្ជាវេយ្យាករណ៍ប្រចាំឆ្នាំ (២០ សំណួរ)',
    icon: '📘'
  },
  conversation: {
    id: 'conversation',
    title: 'មុខវិជ្ជា៖ ការសន្ទនា និងទំនាក់ទំនង (Conversation & Speaking)',
    shortTitle: 'សន្ទនា (Conversation)',
    description: 'ការប្រឡងបញ្ចប់មុខវិជ្ជាសន្ទនាប្រចាំឆ្នាំ (២០ សំណួរ)',
    icon: '🗣️'
  },
  vocabulary: {
    id: 'vocabulary',
    title: 'មុខវិជ្ជា៖ វាក្យសព្ទ និងឃ្លាទូទៅ (Vocabulary & Idioms)',
    shortTitle: 'វាក្យសព្ទ (Vocabulary)',
    description: 'ការប្រឡងបញ្ចប់មុខវិជ្ជាវាក្យសព្ទប្រចាំឆ្នាំ (២០ សំណួរ)',
    icon: '📖'
  },
  verbs: {
    id: 'verbs',
    title: 'មុខវិជ្ជា៖ កិរិយាសព្ទ និងកិរិយាសព្ទមិនប្រក្រតី (Verbs & Irregular Verbs)',
    shortTitle: 'កិរិយាសព្ទ (Verbs)',
    description: 'ការប្រឡងបញ្ចប់មុខវិជ្ជាកិរិយាសព្ទប្រចាំឆ្នាំ (២០ សំណួរ)',
    icon: '⚡'
  },
  adjectives: {
    id: 'adjectives',
    title: 'មុខវិជ្ជា៖ គុណនាម និងការពិពណ៌នា (Adjectives & Descriptions)',
    shortTitle: 'គុណនាម (Adjectives)',
    description: 'ការប្រឡងបញ្ចប់មុខវិជ្ជាគុណនាមប្រចាំឆ្នាំ (២០ សំណួរ)',
    icon: '🎨'
  },
  sentences: {
    id: 'sentences',
    title: 'មុខវិជ្ជា៖ ការបង្កើតល្បះ និងវេយ្យាករណ៍ជាក់ស្ដែង (Sentence Construction)',
    shortTitle: 'ល្បះ (Sentences)',
    description: 'ការប្រឡងបញ្ចប់មុខវិជ្ជាបង្កើតល្បះប្រចាំឆ្នាំ (២០ សំណួរ)',
    icon: '✍️'
  },
  grand: {
    id: 'grand',
    title: 'ការប្រឡងបញ្ចប់កម្មវិធីសិក្សាប្រចាំឆ្នាំទូទៅ (All Subjects Grand Final Exam)',
    shortTitle: 'ប្រឡងបញ្ចប់រួមប្រចាំឆ្នាំ (Grand Exam)',
    description: 'ការប្រឡងបញ្ចប់គ្រប់មុខវិជ្ជាប្រចាំឆ្នាំរួមគ្នា (២០ សំណួរចម្រុះ)',
    icon: '🏆'
  }
};

/**
 * Generate Annual Subject Final Exam Questions (20 Questions)
 */
function generateAnnualSubjectQuiz(curriculum, subjectKey, count = 20) {
  if (subjectKey === 'grammar') {
    // Collect all grammar questions from all 48 grammar topics
    const allGrammarQs = [];
    grammarQuizData.forEach(entry => {
      if (entry.questions) allGrammarQs.push(...entry.questions);
    });
    return shuffle(allGrammarQs).slice(0, count);
  }

  if (subjectKey === 'conversation') {
    return generateConversationQuiz(count);
  }

  if (subjectKey === 'sentences') {
    return generateSentenceQuiz(count);
  }

  if (subjectKey === 'verbs') {
    return generateVerbQuestions(count);
  }

  if (subjectKey === 'vocabulary' || subjectKey === 'adjectives') {
    // Generate from vocab words pool
    const pool = shuffle(allVocabWords).slice(0, count);
    const questions = [];
    for (let i = 0; i < pool.length; i++) {
      const word = pool[i];
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

  if (subjectKey === 'grand') {
    // Pull questions across all subjects: 4 grammar, 3 conv, 3 sentences, 3 verbs, 4 vocab, 3 adj = 20
    const gQs = [];
    grammarQuizData.forEach(entry => { if (entry.questions) gQs.push(...entry.questions); });
    const partGrammar = shuffle(gQs).slice(0, 4);
    const partConv = generateConversationQuiz(3);
    const partSent = generateSentenceQuiz(3);
    const partVerbs = generateVerbQuestions(4);
    const partVocab = [];
    const pool = shuffle(allVocabWords).slice(0, 6);
    pool.forEach(w => {
      const wrongs = shuffle(allVocabWords.filter(x => x.kh !== w.kh)).slice(0, 3).map(x => x.kh);
      const choices = shuffle([w.kh, ...wrongs]);
      const labels = ['A', 'B', 'C', 'D'];
      partVocab.push({
        q: `"${w.eng}" ប្រែជាភាសាខ្មែរថាអ្វី?`,
        c: choices.map((ch, idx) => `${labels[idx]}) ${ch}`),
        a: labels[choices.indexOf(w.kh)]
      });
    });

    const combined = [...partGrammar, ...partConv, ...partSent, ...partVerbs, ...partVocab];
    return shuffle(combined).slice(0, count);
  }

  // Fallback
  return generateSentenceQuiz(count);
}

/**
 * Main function: generate 10 quiz questions from a lesson
 * Supports:
 * - generateQuiz(lesson)
 * - generateQuiz(curriculum, monthId, weekId, lessonId)
 */
function generateQuiz(lessonOrCurriculum, monthId, weekId, lessonId) {
  let lesson = lessonOrCurriculum;

  if (lessonOrCurriculum && monthId && weekId && lessonId) {
    if (lessonOrCurriculum.months) {
      const m = lessonOrCurriculum.months.find(m => m.id === monthId);
      const w = m?.weeks.find(w => w.id === weekId);
      lesson = w?.lessons.find(l => l.id === lessonId);
    } else if (lessonOrCurriculum.id === monthId && lessonOrCurriculum.weeks) {
      const w = lessonOrCurriculum.weeks.find(w => w.id === weekId);
      lesson = w?.lessons.find(l => l.id === lessonId);
    }
  }

  if (!lesson) return generateSentenceQuiz(10);

  const title = lesson.title || '';
  const content = lesson.content || '';

  // Try extracting vocabulary first if available in lesson
  const vocabQuestions = generateVocabQuiz(content, 'vocab');
  if (vocabQuestions && vocabQuestions.length >= 4) {
    return vocabQuestions;
  }

  if (title.includes('វេយ្យាករណ៍') || title.includes('Grammar') || title.includes('Phonics') || title.includes('អក្សរ')) {
    return generateGrammarQuiz(content) || generateSentenceQuiz(10);
  } else if (title.includes('សន្ទនា') || title.includes('Conversation') || title.includes('Greetings')) {
    return generateConversationQuiz(10);
  } else if (title.includes('ល្បះ') || title.includes('Sentence')) {
    return generateSentenceQuiz(10);
  }

  return generateGrammarQuiz(content) || generateSentenceQuiz(10);
}

module.exports = {
  generateQuiz,
  generateAnnualSubjectQuiz,
  SUBJECT_EXAMS
};
