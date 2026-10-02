/**
 * TRANSLATION ENGINE - ប្រព័ន្ធបកប្រែ English ↔ ខ្មែរ
 * ស្តង់ដាជាតិ - ក្រសួងអប់រំ យុវជន និងកីឡា
 * 100% Offline — Zero AI — Zero Internet
 */
'use strict';

const { EN_KH_DICT } = require('./dict_en_kh');

// ══════════════════════════════════════════
// KH → EN DICTIONARY
// ══════════════════════════════════════════
const KH_EN_DICT = {};

const KH_EN_BASE = {
  'ខ្ញុំ': 'I', 'អ្នក': 'you', 'គាត់': 'he/she',
  'ពួកគេ': 'they', 'ពួកយើង': 'we', 'នាង': 'she', 'វា': 'it',
  'ជា': 'is/am/are', 'ទៅ': 'go', 'មក': 'come',
  'ចង់': 'want', 'អាច': 'can', 'ត្រូវ': 'must',
  'ត្រូវការ': 'need', 'ដឹង': 'know', 'យល់': 'understand',
  'ស្រឡាញ់': 'love', 'ចូលចិត្ត': 'like',
  'ពីព្រោះ': 'because', 'ប៉ុន្ដែ': 'but',
  'ហើយ': 'and/already', 'ដូច្នេះ': 'so/therefore',
  'ទោះបីជា': 'although', 'ប្រសិនបើ': 'if',
  'ស្គាល់': 'know/recognize',
  'ញ៉ាំ': 'eat', 'ផឹក': 'drink', 'គេង': 'sleep',
  'ដើរ': 'walk', 'រត់': 'run', 'អាន': 'read',
  'សរសេរ': 'write', 'និយាយ': 'speak',
  'ស្ដាប់': 'listen', 'មើល': 'look/watch',
  'ទិញ': 'buy', 'លក់': 'sell', 'ផ្ញើ': 'send',
  'ទទួល': 'receive', 'ជួយ': 'help',
  'ចាប់ផ្ដើម': 'start', 'បញ្ចប់': 'finish',
  'ព្យាយាម': 'try', 'រៀន': 'learn/study',
  'បង្រៀន': 'teach', 'ប្រើ': 'use',
  'ឱ្យ': 'give', 'យក': 'take', 'ប្រាប់': 'tell',
  'សួរ': 'ask', 'ឆ្លើយ': 'answer',
  'ធ្វើ': 'do/make', 'បង្កើត': 'create', 'ពន្យល់': 'explain',
  'ល្អ': 'good', 'ល្អប្រសើរ': 'excellent', 'ល្អបំផុត': 'best',
  'អាក្រក់': 'bad', 'ធំ': 'big', 'តូច': 'small',
  'វែង': 'long', 'ខ្លី': 'short', 'ខ្ពស់': 'tall',
  'ទាប': 'low', 'ក្ដៅ': 'hot', 'ត្រជាក់': 'cold',
  'លឿន': 'fast', 'យឺត': 'slow', 'ថ្មី': 'new', 'ចាស់': 'old',
  'ថ្លៃ': 'expensive', 'ថោក': 'cheap',
  'ងាយ': 'easy', 'ពិបាក': 'difficult',
  'ច្រើន': 'many', 'បន្តិច': 'a little',
  'ណាស់': 'very', 'ជ្រៅ': 'deep', 'ធ្ងន់': 'heavy',
  'ស្រាល': 'light', 'ស្អាត': 'clean/beautiful', 'កខ្វក់': 'dirty',
  'ប្រហែលជា': 'maybe', 'ពិតប្រាកដ': 'certainly',
  'ចាំបាច់': 'necessary', 'សំខាន់': 'important',
  'ត្រឹមត្រូវ': 'correct', 'ខុស': 'wrong', 'ពិត': 'true',
  'ក្នុង': 'in', 'លើ': 'on', 'ក្រោម': 'under', 'នៅ': 'at',
  'ពី': 'from', 'ដល់': 'to', 'ជាមួយ': 'with', 'ដោយ': 'by',
  'អំពី': 'about', 'មុន': 'before', 'ក្រោយ': 'after',
  'ឥឡូវ': 'now', 'ថ្ងៃនេះ': 'today',
  'ម្សិលមិញ': 'yesterday', 'ថ្ងៃស្អែក': 'tomorrow',
  'ព្រឹក': 'morning', 'រសៀល': 'afternoon',
  'ល្ងាច': 'evening', 'យប់': 'night',
  'ម៉ោង': 'hour', 'នាទី': 'minute',
  'ថ្ងៃ': 'day', 'សប្ដាហ៍': 'week', 'ខែ': 'month', 'ឆ្នាំ': 'year',
  'ភ្នំ': 'mountain', 'ទន្លេ': 'river',
  'ផ្ទះ': 'house', 'សាលារៀន': 'school',
  'ថ្នាក់រៀន': 'classroom', 'ប្រទេស': 'country',
  'ទីក្រុង': 'city', 'ភូមិ': 'village', 'ផ្លូវ': 'road',
  'អាហារ': 'food', 'ទឹក': 'water', 'ទូរស័ព្ទ': 'phone',
  'ប្រព័ន្ធ': 'system', 'ចំណេះដឹង': 'knowledge',
  'ការអប់រំ': 'education', 'ពណ៌': 'color',
  'ព្រះអាទិត្យ': 'sun', 'ព្រះច័ន្ទ': 'moon', 'ផ្កាយ': 'star',
  'មេឃ': 'sky', 'ភ្លៀង': 'rain', 'ខ្យល់': 'wind', 'ភ្លើង': 'fire',
  'ការប្រឡង': 'exam', 'វិញ្ញាបនបត្រ': 'certificate',
  'ពិន្ទុ': 'score', 'មេរៀន': 'lesson',
  'វាក្យសព្ទ': 'vocabulary', 'វេយ្យាករណ៍': 'grammar',
  'ភាសា': 'language', 'ភាសាអង់គ្លេស': 'English',
  'ភាសាខ្មែរ': 'Khmer', 'ការបកប្រែ': 'translation',
  'ការបញ្ចេញសំឡេង': 'pronunciation', 'កាល': 'tense',
  'នាម': 'noun', 'កិរិយាសព្ទ': 'verb', 'គុណនាម': 'adjective',
  'គុណកិរិយា': 'adverb', 'សព្វនាម': 'pronoun', 'ធ្នាក់': 'preposition',
  'ប្រយោគ': 'sentence', 'ប្រធានបទ': 'subject', 'កម្មបទ': 'object',
  'បច្ចុប្បន្នកាលធម្មតា': 'Present Simple Tense',
  'បច្ចុប្បន្នកាលកំពុងបន្ត': 'Present Continuous Tense',
  'បច្ចុប្បន្នកាលអតីត': 'Present Perfect Tense',
  'អតីតកាលធម្មតា': 'Past Simple Tense',
  'អតីតកាលកំពុង': 'Past Continuous Tense',
  'អតីតកាលអតីត': 'Past Perfect Tense',
  'អនាគតកាល': 'Future Simple Tense',
  'អកម្មប្រយោគ': 'Passive Voice',
  'កម្មប្រយោគ': 'Active Voice',
  'ល្បះ': 'sentence', 'ឃ្លា': 'clause/phrase',
  'ឧទាហរណ៍': 'example', 'ក្បួន': 'rule',
  'ស្ដង់ដា': 'standard', 'ជាតិ': 'national',
  'សិស្ស': 'student', 'គ្រូ': 'teacher',
  'ឪពុក': 'father', 'ម្ដាយ': 'mother',
  'បងប្រុស': 'brother', 'បងស្រី': 'sister',
  'កូនប្រុស': 'son', 'កូនស្រី': 'daughter',
  'ប្ដី': 'husband', 'ប្រពន្ធ': 'wife',
  'មិត្ត': 'friend', 'ក្រុង': 'city',
  'ម៉ូតូ': 'motorcycle', 'ឡាន': 'car',
  'យន្ដហោះ': 'plane', 'ទូក': 'boat',
  'ជីតា': 'grandfather', 'ជីដូន': 'grandmother',
  'ក្មេង': 'child', 'ទារក': 'baby',
  'ក្រហម': 'red', 'ខៀវ': 'blue', 'បៃតង': 'green',
  'លឿង': 'yellow', 'ខ្មៅ': 'black', 'ស': 'white',
  'ក្បាល': 'head', 'ភ្នែក': 'eye', 'ច្រមុះ': 'nose',
  'មាត់': 'mouth', 'ធ្មេញ': 'tooth', 'ត្រចៀក': 'ear',
  'ដៃ': 'hand/arm', 'ជើង': 'leg/foot', 'ក': 'neck',
  'ខ្មៅដៃ': 'pencil', 'ប៊ិច': 'pen', 'សៀវភៅ': 'book',
  'កុំព្យូទ័រ': 'computer', 'ទូរទស្សន៍': 'television',
  'ស្ករ': 'sugar', 'អំបិល': 'salt', 'ថ្នាំ': 'medicine',
  'អរគុណ': 'thank you', 'សុំទោស': 'sorry',
  'សួស្តី': 'hello', 'លាហើយ': 'goodbye',
  'មិនអីទេ': 'you are welcome', 'ស្វាគមន៍': 'welcome',
  'អបអរសាទរ': 'congratulations',
  'សំណាងល្អ': 'good luck',
  'រាល់ថ្ងៃ': 'every day', 'រាល់': 'every', 'គ្រប់': 'every',
  'ទាំងអស់': 'all', 'នីមួយៗ': 'each', 'ខ្លះ': 'some',
  'ជាច្រើន': 'many/a lot', 'ច្រើនទៀត': 'more',
  'ច្រើនបំផុត': 'most', 'ទាំងពីរ': 'both',
  'នេះ': 'this', 'នោះ': 'that', 'ទាំងនេះ': 'these', 'ទាំងនោះ': 'those',
  'ទីនេះ': 'here', 'ទីនោះ': 'there',
  'កន្លែងណា': 'where', 'ពេលណា': 'when', 'ហេតុអ្វី': 'why',
  'យ៉ាងដូចម្តេច': 'how', 'នរណា': 'who', 'អ្វី': 'what',
  'តែងតែ': 'always', 'ជាធម្មតា': 'usually', 'ញឹកញាប់': 'often',
  'ពេលខ្លះ': 'sometimes', 'មិនដែល': 'never', 'រួចរាល់': 'already',
  'នៅឡើយ': 'yet', 'នៅតែ': 'still', 'ទើបតែ': 'just',
  'ឥឡូវនេះ': 'now', 'ថ្ងៃនេះ': 'today', 'ថ្ងៃស្អែក': 'tomorrow',
  'ម្សិលមិញ': 'yesterday', 'យប់នេះ': 'tonight', 'យប់មិញ': 'last night',
  'សប្ដាហ៍ក្រោយ': 'next week', 'សប្ដាហ៍មុន': 'last week',
  'ខែក្រោយ': 'next month', 'ខែមុន': 'last month',
  'ឆ្នាំក្រោយ': 'next year', 'ឆ្នាំមុន': 'last year',
  'មុនពេល': 'before', 'ក្រោយពេល': 'after', 'កំឡុងពេល': 'during',
  'ដោយសារតែ': 'because of', 'ទោះបីជា': 'although',
  'ចេះ': 'know how to/can', 'ទេ': 'no',
  'តើអ្នកចេះនិយាយភាសាអង់គ្លេសទេ': 'Do you speak English?',
  'តើអ្នកយល់ទេ': 'Do you understand?',
  'តើអ្នកអាចជួយខ្ញុំបានទេ': 'Can you help me?',
  'តើនេះថ្លៃប៉ុន្មាន': 'How much is this?',
  'អ្នករស់នៅឯណា': 'Where do you live?',
  'អ្នកអាយុប៉ុន្មាន': 'How old are you?',
  'នេះជាអ្វី': 'What is this?',
  'នោះជាអ្វី': 'What is that?',
  'អ្នកធ្វើការអ្វី': 'What do you do?',
  'ខ្ញុំមិនយល់ទេ': "I don't understand",
  'ខ្ញុំមិនដឹងទេ': "I don't know",
  'ខ្ញុំយល់ហើយ': 'I understand',
  'ជួបគ្នាថ្ងៃស្អែក': 'See you tomorrow',
  'ជួបគ្នាឆាប់ៗ': 'See you soon',
  'សូមឱ្យមានថ្ងៃល្អ': 'Have a nice day',
  'ថែរក្សាខ្លួន': 'Take care',
  'អរគុណច្រើនណាស់': 'Thank you so much',
  'រីករាយដែលបានស្គាល់អ្នក': 'Nice to meet you',
  'ធ្វើបានល្អណាស់': 'Good job',
};

// Build reverse from EN_KH_DICT
(function buildReverse() {
  for (const [en, kh] of Object.entries(EN_KH_DICT)) {
    const khKey = kh.split('/')[0].replace(/[\s()[\]]+/g, '').trim();
    if (khKey && /[\u1780-\u17FF]/.test(khKey) && !KH_EN_DICT[khKey]) {
      KH_EN_DICT[khKey] = en;
    }
  }
  Object.assign(KH_EN_DICT, KH_EN_BASE);
})();

// ══════════════════════════════════════════
// COMMON PHRASES
// ══════════════════════════════════════════
const PHRASE_EN_KH = {
  'i am a student': 'ខ្ញុំជាសិស្ស',
  'i am a teacher': 'ខ្ញុំជាគ្រូ',
  'i study english': 'ខ្ញុំរៀនភាសាអង់គ្លេស',
  'i learn english': 'ខ្ញុំរៀនភាសាអង់គ្លេស',
  'i study english every day': 'ខ្ញុំរៀនភាសាអង់គ្លេសរាល់ថ្ងៃ',
  'i learn english every day': 'ខ្ញុំរៀនភាសាអង់គ្លេសរាល់ថ្ងៃ',
  'i like english': 'ខ្ញុំចូលចិត្តភាសាអង់គ្លេស',
  'i speak english': 'ខ្ញុំនិយាយភាសាអង់គ្លេស',
  'i live in cambodia': 'ខ្ញុំរស់នៅក្នុងប្រទេសកម្ពុជា',
  'every day': 'រាល់ថ្ងៃ',
  'every week': 'រាល់សប្ដាហ៍',
  'every month': 'រាល់ខែ',
  'every year': 'រាល់ឆ្នាំ',
  'what is this': 'នេះជាអ្វី', 'what is that': 'នោះជាអ្វី',
  'how old are you': 'អ្នកអាយុប៉ុន្មាន',
  'where do you live': 'អ្នករស់នៅឯណា',
  'what do you do': 'អ្នកធ្វើការអ្វី',
  'how much is this': 'តើនេះថ្លៃប៉ុន្មាន',
  'how much does this cost': 'តើនេះថ្លៃប៉ុន្មាន',
  'can you help me': 'តើអ្នកអាចជួយខ្ញុំបានទេ',
  'i do not understand': 'ខ្ញុំមិនយល់ទេ',
  'i don\'t understand': 'ខ្ញុំមិនយល់ទេ',
  'i do not know': 'ខ្ញុំមិនដឹងទេ',
  'i don\'t know': 'ខ្ញុំមិនដឹងទេ',
  'i understand': 'ខ្ញុំយល់ហើយ',
  'do you understand': 'តើអ្នកយល់ទេ',
  'do you speak english': 'តើអ្នកចេះនិយាយភាសាអង់គ្លេសទេ',
  'yes i do': 'បាទ/ចាស ខ្ញុំចេះ',
  'no i don\'t': 'ទេ ខ្ញុំមិនចេះទេ',
  'please say that again': 'សូមនិយាយម្ដងទៀត',
  'speak slowly please': 'សូមមេត្តានិយាយដោយយឺតៗ',
  'what does this mean': 'ពាក្យនេះមានន័យថាអ្វី',
  'practice makes perfect': 'ការហ្វឹកហ្វឺនធ្វើឱ្យបានល្អ',
  'keep up the good work': 'បន្តខិតខំ',
  'nice to meet you': 'រីករាយដែលបានស្គាល់អ្នក',
  'good job': 'ធ្វើបានល្អណាស់',
  'well done': 'ធ្វើបានល្អណាស់',
  'see you tomorrow': 'ជួបគ្នាថ្ងៃស្អែក',
  'see you soon': 'ជួបគ្នាឆាប់ៗ',
  'have a nice day': 'សូមឱ្យមានថ្ងៃល្អ',
  'have a good time': 'សូមឱ្យសប្បាយរីករាយ',
  'take care': 'ថែរក្សាខ្លួន',
  'welcome to': 'សូមស្វាគមន៍មកកាន់',
  'thank you so much': 'អរគុណច្រើនណាស់',
};

// ══════════════════════════════════════════
// GRAMMAR TERMS (MoE National Standard)
// ══════════════════════════════════════════
const GRAMMAR_TERMS = {
  'noun': 'នាម (Noun)', 'verb': 'កិរិយាសព្ទ (Verb)',
  'adjective': 'គុណនាម (Adjective)', 'adverb': 'គុណកិរិយា (Adverb)',
  'pronoun': 'សព្វនាម (Pronoun)', 'preposition': 'ធ្នាក់ (Preposition)',
  'conjunction': 'ពាក្យតំណ (Conjunction)',
  'interjection': 'ឧទានសព្ទ (Interjection)',
  'article': 'ធ្នាក់ (Article: a/an/the)',
  'subject': 'ប្រធាន (Subject)', 'predicate': 'វិធាន (Predicate)',
  'object': 'កម្ម (Object)',
  'direct object': 'កម្មផ្ទាល់ (Direct Object)',
  'indirect object': 'កម្មប្រយោល (Indirect Object)',
  'clause': 'ឃ្លា (Clause)', 'phrase': 'ឃ្លា (Phrase)',
  'singular': 'ឯកវចនៈ (Singular)', 'plural': 'ពហុវចនៈ (Plural)',
  'tense': 'កាល (Tense)', 'voice': 'ប្រយោគ (Voice)',
  'active': 'កម្មប្រយោគ (Active Voice)',
  'passive': 'អកម្មប្រយោគ (Passive Voice)',
  'affirmative': 'ប្រយោគបញ្ជាក់ (Affirmative)',
  'negative': 'ប្រយោគបដិសេធ (Negative)',
  'interrogative': 'ប្រយោគសួរ (Interrogative)',
  'imperative': 'ប្រយោគបង្គាប់ (Imperative)',
  'conditional': 'ប្រយោគលក្ខខណ្ឌ (Conditional)',
  'infinitive': 'ក្រៀមដើម (Infinitive: to+V)',
  'gerund': 'ក្រៀម (Gerund: V-ing)',
  'auxiliary verb': 'កិរិយាសព្ទជំនួយ (Auxiliary Verb)',
  'modal verb': 'កិរិយាសព្ទ Modal (Modal Verb)',
  'regular verb': 'កិរិយាសព្ទទៀងទាត់ (Regular Verb)',
  'irregular verb': 'កិរិយាសព្ទមិនទៀងទាត់ (Irregular Verb)',
  'transitive verb': 'សករកម្ម (Transitive Verb)',
  'intransitive verb': 'អករកម្ម (Intransitive Verb)',
  'comparative': 'ប្រៀបធៀប (Comparative)',
  'superlative': 'បំផុត (Superlative)',
  'present simple': 'បច្ចុប្បន្នកាលធម្មតា (Present Simple)',
  'present continuous': 'បច្ចុប្បន្នកាលកំពុង (Present Continuous)',
  'present perfect': 'បច្ចុប្បន្នកាលអតីត (Present Perfect)',
  'present perfect continuous': 'បច្ចុប្បន្នកាលអតីតកំពុង',
  'past simple': 'អតីតកាលធម្មតា (Past Simple)',
  'past continuous': 'អតីតកាលកំពុង (Past Continuous)',
  'past perfect': 'អតីតកាលអតីត (Past Perfect)',
  'past perfect continuous': 'អតីតកាលអតីតកំពុង',
  'future simple': 'អនាគតកាល (Future Simple)',
  'future continuous': 'អនាគតកាលកំពុង (Future Continuous)',
  'future perfect': 'អនាគតកាលអតីត (Future Perfect)',
  'zero conditional': 'លក្ខខណ្ឌទីសូន្យ',
  'first conditional': 'លក្ខខណ្ឌទីមួយ',
  'second conditional': 'លក្ខខណ្ឌទីពីរ',
  'third conditional': 'លក្ខខណ្ឌទីបី',
  'direct speech': 'ល្បះផ្ទាល់ (Direct Speech)',
  'indirect speech': 'ល្បះប្រយោល (Indirect Speech)',
  'reported speech': 'ការរាយការណ៍ (Reported Speech)',
  'relative clause': 'ឃ្លាទំនាក់ទំនង (Relative Clause)',
  'countable noun': 'នាមរាប់បាន (Countable)',
  'uncountable noun': 'នាមរាប់មិនបាន (Uncountable)',
  'proper noun': 'នាមអសាធារណ៍ (Proper Noun)',
  'common noun': 'នាមសាធារណ៍ (Common Noun)',
  'abstract noun': 'នាមអរូបី (Abstract Noun)',
  'compound noun': 'នាមសមាស (Compound Noun)',
  'possessive noun': 'នាមកម្មសិទ្ធិ (Possessive)',
  'reflexive pronoun': 'សព្វនាមខ្លួនឯង (Reflexive)',
  'demonstrative pronoun': 'សព្វនាមចង្អុល (Demonstrative)',
  'indefinite pronoun': 'សព្វនាមមិនកំណត់ (Indefinite)',
  'relative pronoun': 'សព្វនាមទំនាក់ (Relative)',
};

// ══════════════════════════════════════════
// LANGUAGE DETECTION
// ══════════════════════════════════════════
function detectLanguage(text) {
  if (!text) return 'unknown';
  const khChars = (text.match(/[\u1780-\u17FF\u19E0-\u19FF]/g) || []).length;
  const enChars = (text.match(/[a-zA-Z]/g) || []).length;
  if (khChars === 0 && enChars === 0) return 'unknown';
  return khChars > enChars * 0.4 ? 'kh' : 'en';
}

// ══════════════════════════════════════════
// CORE TRANSLATION: English → Khmer
// Longest-match phrase → sentence → word-by-word
// ══════════════════════════════════════════
function translateEnToKh(text) {
  if (!text || !text.trim()) return '';
  const lower = text.trim().toLowerCase();

  // 1. Direct full-text lookup
  if (PHRASE_EN_KH[lower]) return PHRASE_EN_KH[lower];
  if (EN_KH_DICT[lower]) return EN_KH_DICT[lower];

  // 2. Multi-sentence
  const sentences = text.split(/(?<=[.!?।])\s+|\n+/).filter(s => s.trim());
  if (sentences.length > 1) {
    return sentences.map(s => translateEnToKh(s)).join('\n');
  }

  // 3. Longest-match multi-word phrases (3 passes)
  let result = text.trim();

  // Pass A: phrases (sorted by length desc)
  const phraseKeys = Object.keys(PHRASE_EN_KH).sort((a, b) => b.length - a.length);
  for (const key of phraseKeys) {
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`\\b${esc}\\b`, 'gi'), PHRASE_EN_KH[key]);
  }

  // Pass B: multi-word dict entries
  const multiKeys = Object.keys(EN_KH_DICT)
    .filter(k => k.includes(' '))
    .sort((a, b) => b.length - a.length);
  for (const key of multiKeys) {
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`\\b${esc}\\b`, 'gi'), EN_KH_DICT[key]);
  }

  // Pass C: word-by-word
  result = result.replace(/\b[a-zA-Z']+\b/g, word => {
    const w = word.toLowerCase();
    return EN_KH_DICT[w] || word;
  });

  result = result
    .replace(/\?+/g, '?')
    .replace(/!+/g, '!')
    .replace(/\.+/g, '.')
    .replace(/\s+([,?.!;:។])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  return result;
}

// ══════════════════════════════════════════
// CORE TRANSLATION: Khmer → English
// Longest-match dictionary scan
// ══════════════════════════════════════════
function translateKhToEn(text) {
  if (!text || !text.trim()) return '';
  const t = text.trim();

  // Direct lookup
  if (KH_EN_DICT[t]) return KH_EN_DICT[t];

  // Longest-match segmentation
  let result = '';
  let remaining = t;
  while (remaining.length > 0) {
    let matched = false;
    const maxLen = Math.min(remaining.length, 25);
    for (let len = maxLen; len >= 1; len--) {
      const chunk = remaining.substring(0, len);
      if (KH_EN_DICT[chunk]) {
        result += KH_EN_DICT[chunk] + ' ';
        remaining = remaining.substring(len);
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += remaining[0];
      remaining = remaining.substring(1);
    }
  }
  return result
    .replace(/\s+([,?.!;:។])/g, '$1')
    .replace(/\?+/g, '?')
    .replace(/!+/g, '!')
    .replace(/\s+/g, ' ')
    .trim();
}

const BILINGUAL_ONLY_NOTICE = "⚠️ វិទ្យាស្ថាន Teacher SSOnline បង្រៀននិងឆ្លើយតបតែជាភាសាខ្មែរ និងភាសាអង់គ្លេសប៉ុណ្ណោះ។ សូមសួរជាភាសាខ្មែរ ឬអង់គ្លេស!\n(Teacher SSOnline strictly provides instruction and responses in Khmer and English only. Please ask in Khmer or English!)";

const FOREIGN_SCRIPTS_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF\u0E00-\u0E7F\u0E80-\u0EFF\u1000-\u109F\u0400-\u04FF\u0600-\u06FF\u0750-\u077F\u3040-\u30FF\u31F0-\u31FF\uAC00-\uD7AF\u1100-\u11FF\u0900-\u097F\u0370-\u03FF\u0590-\u05FFàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/gi;

function isForbiddenForeignLanguage(text) {
  if (!text || typeof text !== 'string') return false;
  const foreignMatches = text.match(FOREIGN_SCRIPTS_REGEX) || [];
  return foreignMatches.length >= 2;
}

function isThirdLanguageRequest(text) {
  if (!text || typeof text !== 'string') return false;
  const thirdLangRegex = /(how\s+(do\s+you\s+|can\s+i\s+)?say|how\s+to\s+say|translate|what\s+is|meaning\s+in|say\s+in|write\s+in|teach\s+me|speak\s+in).*?\b(french|spanish|chinese|mandarin|thai|vietnamese|japanese|korean|russian|german|arabic|lao|burmese|italian|portuguese|hindi|latin)\b|\b(in\s+(french|spanish|chinese|mandarin|thai|vietnamese|japanese|korean|russian|german|arabic|lao|burmese|italian|portuguese|hindi|latin))\b|(បកប្រែ|ប្រែ|ជា|រៀន|និយាយ|សរសេរ).*?(ចិន|ថៃ|វៀតណាម|បារាំង|ជប៉ុន|កូរ៉េ|រុស្ស៊ី|អាល្លឺម៉ង់|អេស្ប៉ាញ|អារ៉ាប់|ឡាវ|ភូមា|អ៊ីតាលី|ព័រទុយហ្កាល់|ហិណ្ឌូ)/i;
  return thirdLangRegex.test(text);
}

// ══════════════════════════════════════════
// MAIN TRANSLATE FUNCTION
// ══════════════════════════════════════════
function translate(text, direction = 'auto') {
  if (!text || !text.trim()) throw new Error('No text provided');

  // Check forbidden foreign languages or third language requests
  if (isForbiddenForeignLanguage(text) || isThirdLanguageRequest(text)) {
    return {
      translated: BILINGUAL_ONLY_NOTICE,
      fromLabel: 'ភាសាផ្សេង',
      toLabel: 'ខ្មែរ / English',
      fromLang: 'Foreign',
      toLang: 'Khmer/English'
    };
  }

  const lang = detectLanguage(text);
  let fromLang, toLang, fromLabel, toLabel;

  if (direction === 'auto') {
    if (lang === 'kh') {
      fromLang = 'Khmer'; toLang = 'English';
      fromLabel = 'ខ្មែរ'; toLabel = 'English';
    } else {
      fromLang = 'English'; toLang = 'Khmer';
      fromLabel = 'English'; toLabel = 'ខ្មែរ';
    }
  } else if (direction === 'en_to_kh') {
    fromLang = 'English'; toLang = 'Khmer';
    fromLabel = 'English'; toLabel = 'ខ្មែរ';
  } else {
    fromLang = 'Khmer'; toLang = 'English';
    fromLabel = 'ខ្មែរ'; toLabel = 'English';
  }

  const lines = text.split('\n');
  const translatedLines = lines.map(line => {
    if (!line.trim()) return '';
    try {
      return toLang === 'Khmer'
        ? translateEnToKh(line)
        : translateKhToEn(line);
    } catch (e) { return line; }
  });

  return {
    translated: translatedLines.join('\n').trim(),
    fromLabel, toLabel, fromLang, toLang
  };
}

// ══════════════════════════════════════════
// WORD LOOKUP
// ══════════════════════════════════════════
function lookupWord(word) {
  if (!word) return null;
  const w = word.trim();
  const wl = w.toLowerCase();
  const lang = detectLanguage(w);

  if (lang === 'kh') {
    const en = KH_EN_DICT[w] || null;
    return en ? { word: w, language: 'Khmer', translation: en, translationLang: 'English' } : null;
  } else {
    const kh = EN_KH_DICT[wl] || null;
    return kh ? { word: wl, language: 'English', translation: kh, translationLang: 'Khmer' } : null;
  }
}

function formatLookupResult(word) {
  const r = lookupWord(word);
  if (!r) {
    return `❌ រកមិនឃើញ «${word}» ក្នុងវចនានុក្រម\n_(ប្រហែលជាពាក្យជាក់លាក់ ឬស្ថាបត្យ)_`;
  }
  const arrow = r.language === 'English' ? '🇺🇸→🇰🇭' : '🇰🇭→🇺🇸';
  return (
    `📖 ${arrow} *ការបកប្រែ (Word Lookup)*\n\n` +
    `🔤 *${r.language}:* \`${r.word}\`\n` +
    `🔡 *${r.translationLang}:* ${r.translation}\n\n` +
    `_ស្ដង់ដាជាតិ • ក្រសួងអប់រំ យុវជន និងកីឡា_`
  );
}

function formatTranslationResult(text, direction, userId) {
  try {
    const r = translate(text, direction);
    const preview = r.translated.length > 3500
      ? r.translated.substring(0, 3500) + '\n...'
      : r.translated;
    return {
      header: (
        `🌍 *ការបកប្រែ (${r.fromLabel} → ${r.toLabel})*\n\n` +
        `*ដើម:*\n${text.substring(0, 400)}${text.length > 400 ? '...' : ''}\n\n` +
        `*ចម្លើយ (${r.toLabel}):*\n${preview}`
      ),
      translated: r.translated,
      toLang: r.toLang, fromLang: r.fromLang, ok: true
    };
  } catch (err) {
    return { header: `❌ *មិនអាចបកប្រែបានទេ* - ${err.message}`, translated: '', ok: false };
  }
}

function lookupGrammarTerm(term) {
  return GRAMMAR_TERMS[term.trim().toLowerCase()] || null;
}

function getDictionaryStats() {
  return {
    enToKh: Object.keys(EN_KH_DICT).length,
    khToEn: Object.keys(KH_EN_DICT).length,
    phrases: Object.keys(PHRASE_EN_KH).length,
    grammarTerms: Object.keys(GRAMMAR_TERMS).length,
  };
}

module.exports = {
  translate, translateEnToKh, translateKhToEn,
  lookupWord, formatLookupResult, formatTranslationResult,
  lookupGrammarTerm, detectLanguage, getDictionaryStats,
  EN_KH_DICT, KH_EN_DICT, PHRASE_EN_KH, GRAMMAR_TERMS,
};