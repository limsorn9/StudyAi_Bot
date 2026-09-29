/**
 * Sentences & Patterns Data - 48 Practical English Sentence Patterns for 48 Weeks
 * Each week features:
 * - Theme & Title (Khmer & English)
 * - Formula / Grammar Pattern
 * - Explanation in Khmer
 * - Multiple real-life example sentences with line-by-line Khmer translations
 * - Practice prompt
 */

const sentencePatterns = [
  {
    week: 1,
    title: "ការបង្ហាញបំណងប្រាថ្នា និងចំណូលចិត្ត (Expressing Wants & Likes)",
    patterns: [
      {
        formula: "I want to + V1 (infinitive) + (Object)",
        meaning: "ខ្ញុំចង់... (បង្ហាញបំណងចង់ធ្វើសកម្មភាពអ្វីមួយ)",
        examples: [
          { en: "I want to speak English fluently like a native speaker.", kh: "ខ្ញុំចង់និយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់ជំនាញដូចជាជនជាតិដើម។" },
          { en: "She wants to find a higher-paying job in Phnom Penh.", kh: "នាងចង់ស្វែងរកការងារដែលទទួលបានប្រាក់ខែខ្ពស់ជាងនេះនៅរាជធានីភ្នំពេញ។" },
          { en: "We want to improve our daily communication skills.", kh: "ពួកយើងចង់ពង្រឹងជំនាញប្រាស្រ័យទាក់ទងប្រចាំថ្ងៃរបស់យើង។" }
        ]
      },
      {
        formula: "I like + V-ing / Noun",
        meaning: "ខ្ញុំចូលចិត្ត... (បង្ហាញពីចំណង់ចំណូលចិត្ត ឬទម្លាប់)",
        examples: [
          { en: "I like listening to English podcasts while driving.", kh: "ខ្ញុំចូលចិត្តស្តាប់ផតខាសភាសាអង់គ្លេសនៅពេលបើកបរ។" },
          { en: "They like reading international business news.", kh: "ពួកគេចូលចិត្តអានព័ត៌មានជំនួញអន្តរជាតិ។" }
        ]
      }
    ],
    practice: "ចូរបង្កើតល្បះមួយដោយប្រើ 'I want to...' និងមួយទៀតដោយប្រើ 'I like...' រួចផ្ញើមកកាន់គ្រូ AI!"
  },
  {
    week: 2,
    title: "ការសុំជំនួយ និងការសុំអនុញ្ញាតដោយគួរសម (Polite Requests & Permission)",
    patterns: [
      {
        formula: "Could you please + V1...?",
        meaning: "តើអ្នកអាចមេត្តា...បានទេ? (ការសុំជំនួយដោយសុជីវធម៌ខ្ពស់)",
        examples: [
          { en: "Could you please explain this grammar rule one more time?", kh: "តើលោកគ្រូអាចមេត្តាពន្យល់ក្បួនវេយ្យាករណ៍នេះម្តងទៀតបានទេ?" },
          { en: "Could you please send me the report by email?", kh: "តើអ្នកអាចមេត្តាផ្ញើរបាយការណ៍មកខ្ញុំតាមអ៊ីមែលបានទេ?" },
          { en: "Could you please speak a little slower?", kh: "តើអ្នកអាចមេត្តានិយាយឱ្យរាងយឺតបន្តិចបានទេ?" }
        ]
      },
      {
        formula: "Would you mind + V-ing...?",
        meaning: "តើអ្នកប្រកាន់ទេប្រសិនបើ... / តើអាចជួយ...បានទេ?",
        examples: [
          { en: "Would you mind opening the window for some fresh air?", kh: "តើអ្នកប្រកាន់ទេប្រសិនបើជួយបើកបង្អួចយកខ្យល់អាកាសបរិសុទ្ធបន្តិច?" },
          { en: "Would you mind waiting here for just five minutes?", kh: "តើអ្នកប្រកាន់ទេប្រសិនបើរង់ចាំនៅទីនេះប្រហែល ៥ នាទី?" }
        ]
      }
    ],
    practice: "ចូរបង្កើតសំណើសុំជំនួយដោយប្រើ 'Could you please...?' ចំនួន ២ ប្រយោគ។"
  },
  {
    week: 3,
    title: "ការផ្តល់យោបល់ និងដំបូន្មាន (Giving Suggestions & Advice)",
    patterns: [
      {
        formula: "Why don't we / you + V1...?",
        meaning: "ហេតុអ្វីយើងមិន... / ហេតុអ្វីអ្នកមិន... (ការលើកយោបល់ល្អៗ)",
        examples: [
          { en: "Why don't we practice speaking English for thirty minutes every day?", kh: "ហេតុអ្វីពួកយើងមិនហ្វឹកហាត់និយាយភាសាអង់គ្លេស ៣០ នាទីជារៀងរាល់ថ្ងៃ?" },
          { en: "Why don't you apply for that managerial position?", kh: "ហេតុអ្វីអ្នកមិនដាក់ពាក្យស្នើសុំតំណែងអ្នកគ្រប់គ្រងនោះ?" },
          { en: "Why don't we take a short break and have some coffee?", kh: "ហេតុអ្វីយើងមិនសម្រាកបន្តិច ហើយពិសាកាហ្វេមួយកែវទៅ?" }
        ]
      },
      {
        formula: "You had better + V1 (You'd better...)",
        meaning: "អ្នកគួរតែ...ជាការល្អ (ការដាស់តឿន ឬផ្តល់ដំបូន្មានបន្ទាន់)",
        examples: [
          { en: "You had better review the lesson before taking the final exam.", kh: "អ្នកគួរតែរំលឹកមេរៀនឡើងវិញ មុនពេលប្រឡងបញ្ចប់វគ្គ។" },
          { en: "You'd better leave now to avoid the heavy traffic.", kh: "អ្នកគួរតែចេញដំណើរពីឥឡូវនេះ ដើម្បីចៀសវាងការកកស្ទះចរាចរណ៍ខ្លាំង។" }
        ]
      }
    ],
    practice: "ចូរផ្តល់យោបល់ដល់មិត្តភក្តិម្នាក់ដោយប្រើ 'Why don't you...?'"
  },
  {
    week: 4,
    title: "ការបង្ហាញពីចំណង់ចំណូលចិត្តប្រៀបធៀប (Preferences: Prefer & Would Rather)",
    patterns: [
      {
        formula: "I prefer [A] to [B] / I prefer + V-ing to + V-ing",
        meaning: "ខ្ញុំចូលចិត្ត [A] ជាង [B]",
        examples: [
          { en: "I prefer coffee to tea in the morning.", kh: "ខ្ញុំចូលចិត្តកាហ្វេជាងតែនៅពេលព្រឹក។" },
          { en: "She prefers studying online at home to traveling to school.", kh: "នាងចូលចិត្តរៀនអនឡាញនៅផ្ទះ ជាងការធ្វើដំណើរទៅសាលា។" },
          { en: "They prefer working in a quiet environment.", kh: "ពួកគេចូលចិត្តធ្វើការនៅក្នុងបរិយាកាសស្ងប់ស្ងាត់។" }
        ]
      },
      {
        formula: "I would rather + V1 + than + V1 (I'd rather...)",
        meaning: "ខ្ញុំសុខចិត្ត / ខ្ញុំចង់... ជាង...",
        examples: [
          { en: "I would rather stay home and relax than go to a crowded mall.", kh: "ខ្ញុំសុខចិត្តនៅផ្ទះសម្រាកកាយ ជាងការទៅផ្សារទំនើបដែលមានមនុស្សកកកុញ។" },
          { en: "I'd rather speak directly than send text messages.", kh: "ខ្ញុំសុខចិត្តជជែកផ្ទាល់មាត់ ជាងការផ្ញើសារអក្សរ។" }
        ]
      }
    ],
    practice: "តើអ្នកចូលចិត្តរៀនពេលព្រឹក ឬពេលយប់ជាង? ចូរឆ្លើយដោយប្រើ 'I prefer... to...'"
  },
  {
    week: 5,
    title: "ការបង្ហាញពីលទ្ធផល និងមូលហេតុ (Cause & Effect: Because of & Due to)",
    patterns: [
      {
        formula: "Because of + Noun phrase / V-ing",
        meaning: "ដោយសារតែ... (បង្ហាញពីមូលហេតុដែលនាំឱ្យកើតលទ្ធផល)",
        examples: [
          { en: "The outdoor concert was canceled because of the heavy rain.", kh: "ការប្រគំតន្ត្រីក្រៅផ្ទះត្រូវបានលុបចោល ដោយសារតែភ្លៀងធ្លាក់ខ្លាំង។" },
          { en: "He achieved high scores because of his hard work and dedication.", kh: "គាត់ទទួលបានពិន្ទុខ្ពស់ ដោយសារតែការខិតខំប្រឹងប្រែង និងការតាំងចិត្តរបស់គាត់។" }
        ]
      },
      {
        formula: "As a result, + Clause (Subject + Verb)",
        meaning: "ជាលទ្ធផល...",
        examples: [
          { en: "She practiced every day. As a result, she passed the IELTS exam with flying colors.", kh: "នាងបានហ្វឹកហាត់រាល់ថ្ងៃ។ ជាលទ្ធផល នាងបានប្រឡងជាប់ IELTS ដោយពិន្ទុខ្ពស់ត្រដែត។" }
        ]
      }
    ],
    practice: "ចូរបង្កើតល្បះមួយដែលប្រើ 'Because of...' ដើម្បីពន្យល់ពីភាពជោគជ័យរបស់អ្នក។"
  },
  {
    week: 6,
    title: "ការបង្ហាញផែនការអនាគត និងការទន្ទឹងរង់ចាំ (Plans & Looking Forward To)",
    patterns: [
      {
        formula: "I am looking forward to + V-ing / Noun",
        meaning: "ខ្ញុំទន្ទឹងរង់ចាំ... យ៉ាងអន្ទះសា (ការទន្ទឹងរង់ចាំព្រឹត្តិការណ៍ល្អ)",
        examples: [
          { en: "I am looking forward to meeting you in person next week.", kh: "ខ្ញុំទន្ទឹងរង់ចាំជួបអ្នកដោយផ្ទាល់នៅសប្តាហ៍ក្រោយ។" },
          { en: "We are looking forward to our family vacation in Siem Reap.", kh: "ពួកយើងកំពុងទន្ទឹងរង់ចាំដំណើរកម្សាន្តគ្រួសារនៅខេត្តសៀមរាប។" },
          { en: "I look forward to hearing from you soon.", kh: "ខ្ញុំទន្ទឹងរង់ចាំទទួលដំណឹងពីអ្នកក្នុងពេលឆាប់ៗ។" }
        ]
      },
      {
        formula: "I am planning to + V1...",
        meaning: "ខ្ញុំកំពុងមានគម្រោងនឹង...",
        examples: [
          { en: "I am planning to launch my new online business next month.", kh: "ខ្ញុំកំពុងមានគម្រោងនឹងចាប់ផ្តើមអាជីវកម្មអនឡាញថ្មីរបស់ខ្ញុំនៅខែក្រោយ។" }
        ]
      }
    ],
    practice: "តើអ្នកកំពុងទន្ទឹងរង់ចាំអ្វី? ចូរសរសេរប្រយោគមួយដោយប្រើ 'I am looking forward to...'"
  },
  {
    week: 7,
    title: "ការបញ្ចេញទស្សនៈ និងការយល់ឃើញ (Expressing Opinions & Beliefs)",
    patterns: [
      {
        formula: "In my opinion, + Clause",
        meaning: "តាមគំនិតយោបល់របស់ខ្ញុំ...",
        examples: [
          { en: "In my opinion, learning English through daily practice is the fastest way to become fluent.", kh: "តាមគំនិតយោបល់របស់ខ្ញុំ ការរៀនភាសាអង់គ្លេសតាមរយៈការអនុវត្តប្រចាំថ្ងៃ គឺជាវិធីលឿនបំផុតដើម្បីនិយាយស្ទាត់។" },
          { en: "In my opinion, communication skills are more important than just memorizing grammar rules.", kh: "តាមគំនិតខ្ញុំ ជំនាញប្រាស្រ័យទាក់ទងគឺសំខាន់ជាងការគ្រាន់តែទន្ទេញក្បួនវេយ្យាករណ៍។" }
        ]
      },
      {
        formula: "From my perspective, + Clause",
        meaning: "តាមទស្សនៈវិស័យរបស់ខ្ញុំ...",
        examples: [
          { en: "From my perspective, digital education opens endless opportunities for Cambodian students.", kh: "តាមទស្សនៈវិស័យរបស់ខ្ញុំ ការអប់រំតាមបែបឌីជីថលបើកឱកាសឥតដែនកំណត់សម្រាប់សិស្សនិស្សិតកម្ពុជា។" }
        ]
      }
    ],
    practice: "ចូរផ្តល់ទស្សនៈផ្ទាល់ខ្លួនរបស់អ្នកអំពីការរៀនភាសាអង់គ្លេសដោយប្រើ 'In my opinion...'"
  },
  {
    week: 8,
    title: "ការបង្ហាញការសោកស្តាយ និងបំណងប្រាថ្នាមិនពិត (Expressing Regret with I Wish)",
    patterns: [
      {
        formula: "I wish I could + V1...",
        meaning: "ខ្ញុំប៉ងប្រាថ្នាថាខ្ញុំអាច... (បំណងដែលមិនទាន់អាចធ្វើបានឥឡូវ)",
        examples: [
          { en: "I wish I could speak five languages fluently.", kh: "ខ្ញុំប៉ងប្រាថ្នាថាខ្ញុំអាចនិយាយភាសាបាន ៥ យ៉ាងស្ទាត់ជំនាញ។" },
          { en: "I wish I had more free time to travel the world.", kh: "ខ្ញុំប៉ងប្រាថ្នាថាខ្ញុំមានពេលវេលាទំនេរច្រើនជាងនេះ ដើម្បីធ្វើដំណើរជុំវិញពិភពលោក។" }
        ]
      },
      {
        formula: "I wish I hadn't + V3...",
        meaning: "ខ្ញុំស្តាយក្រោយដែលបាន... (ការសោកស្តាយទង្វើក្នុងអតីតកាល)",
        examples: [
          { en: "I wish I hadn't wasted so much time playing mobile games.", kh: "ខ្ញុំសោកស្តាយណាស់ដែលបានខាតបង់ពេលវេលាច្រើនលើការលេងហ្គេមទូរស័ព្ទ។" }
        ]
      }
    ],
    practice: "ចូរសរសេរប្រយោគមួយដោយប្រើ 'I wish I could...'"
  }
];

function getSentencePatternForWeek(weekNum) {
  const index = (weekNum - 1) % sentencePatterns.length;
  const base = sentencePatterns[index];
  return {
    ...base,
    week: weekNum,
    title: `សប្តាហ៍ទី ${weekNum}៖ ${base.title}`
  };
}

module.exports = {
  sentencePatterns,
  getSentencePatternForWeek
};
