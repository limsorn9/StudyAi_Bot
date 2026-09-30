/**
 * Beginner Level Curriculum (ថ្នាក់ដំបូង / English for Children)
 * Structured as 1 Day = 1 Letter, 1 Word, 1 Sentence
 * Taught by AI Instructor: អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)
 * REVIEWED: All 26 lessons - examples strictly match each letter's topic
 */

function buildDailyLesson(dayNum, weekNum, letterUpper, letterLower, letterKhName, phonicsSound, phonicsKh, wordEn, wordKh, spelling, sentenceEn, sentenceKh, extraNote, extraWords, extraSentences) {
  const letterCode = `${letterUpper}${letterLower}`;

  // Extra vocab section: words starting with same letter
  let extraVocabSection = '';
  if (extraWords && extraWords.length > 0) {
    extraVocabSection = '\n════════════════════════════════════════════\n' +
      `🌟 ពាក្យបន្ថែម (More ${letterUpper}-Words):\n` +
      extraWords.map((w, i) => `${i + 2}. 🇬🇧 ${w.en} = 🇰🇭 ${w.kh}`).join('\n');
  }

  // Extra sentences section: sentences using same word/theme
  let extraSentSection = '';
  if (extraSentences && extraSentences.length > 0) {
    extraSentSection = '\n════════════════════════════════════════════\n' +
      `📝 ល្បះបន្ថែម (More ${letterUpper}-Sentences):\n` +
      extraSentences.map((s, i) => `${i + 2}. 🇬🇧 ${s.en}\n   🇰🇭 (${s.kh})`).join('\n');
  }

  return {
    id: `bl${dayNum}`,
    day: dayNum,
    letter: letterUpper,
    word: wordEn,
    wordKh: wordKh,
    sentence: sentenceEn,
    title: `ថ្ងៃទី ${dayNum}៖ តួអក្សរ ${letterUpper} • ${wordEn} (Letter ${letterUpper})`,
    content: `📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline
📌 កម្រិត៖ ថ្នាក់ដំបូង (English for Children) • សប្តាហ៍ទី ${weekNum} • ថ្ងៃទី ${dayNum}
🎯 ប្រធានបទ៖ តួអក្សរ ${letterUpper} • ពាក្យ ${wordEn} • ${sentenceEn}
📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)

════════════════════════════════════════════
📐 តួអក្សរ និងសូរសព្ទ Phonics (1 Letter)៖
• តួអក្សរ៖ ${letterCode} (អក្សរ ${letterKhName})
• សូរសំឡេង Phonics៖ /${phonicsSound}/ (${phonicsKh})
• ការប្រកបពាក្យ (Spelling)៖ ${spelling}
• ចំណាំ Phonics៖ ${extraNote}

════════════════════════════════════════════
🔑 វាក្យសព្ទប្រចាំថ្ងៃ (1 Word)៖
1. 🇬🇧 ${wordEn} = 🇰🇭 ${wordKh}${extraVocabSection}

════════════════════════════════════════════
💡 ល្បះគំរូប្រចាំថ្ងៃ (1 Sentence)៖
1. 🇬🇧 ${sentenceEn}
   🇰🇭 (${sentenceKh})${extraSentSection}

════════════════════════════════════════════
💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student)៖

👤 Teacher Piseth:
   🇬🇧 "Hello! Today we learn letter ${letterUpper}. What letter is this?"
   🇰🇭 (សួស្តី! ថ្ងៃនេះយើងរៀនអក្សរ ${letterUpper}។ តើនេះជាអក្សរអ្វី?)

👤 Student:
   🇬🇧 "This is letter ${letterUpper}! ${letterUpper} is for ${wordEn}!"
   🇰🇭 (នេះជាអក្សរ ${letterUpper}! ${letterUpper} គឺសម្រាប់ពាក្យ ${wordEn}!)

👤 Teacher Piseth:
   🇬🇧 "Excellent! Now say the sentence: ${sentenceEn}"
   🇰🇭 (ពូកែណាស់! ឥឡូវថាល្បះ: ${sentenceEn})

👤 Student:
   🇬🇧 "${sentenceEn}"
   🇰🇭 (${sentenceKh})

════════════════════════════════════════════
✍️ លំហាត់អនុវត្ត (Practice Exercise)៖
ចូរហាត់អានឮៗ៖ អក្សរ ${letterUpper} ➡️ ពាក្យ ${wordEn} ➡️ ល្បះ "${sentenceEn}"
រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់ជាមួយអ្នកគ្រូពិសិដ្ឋ!`
  };
}

const BEGINNER_COURSE = {
  id: 'beginner',
  title: 'ថ្នាក់ដំបូង (Beginner Level)',
  code: 'LEVEL_0_BEGINNER',
  teacher: {
    id: 'piseth',
    name: 'អ្នកគ្រូ ពិសិដ្ឋ',
    englishName: 'Teacher Piseth AI',
    avatar: '👩‍🏫',
    role: 'គ្រូបង្រៀនភាសាអង់គ្លេសថ្នាក់ដំបូង & English for Children Specialist',
    badge: 'Beginner English Coach',
    welcomeGreeting: 'សួស្តីកូនៗ និងប្អូនៗជាទីស្រឡាញ់! អ្នកគ្រូឈ្មោះ ពិសិដ្ឋ (Teacher Piseth)។ ក្នុងថ្នាក់ដំបូងនេះ យើងរៀនតាមក្បួន English for Children គឺ "១ ថ្ងៃ៖ ១ អក្សរ ១ ពាក្យ ១ ល្បះ" យ៉ាងងាយស្រួល ច្បាស់លាស់ និងសប្បាយរីករាយបំផុត! 🌟'
  },
  weeks: [
    // ----------------------------------------------------
    // WEEK 1: LETTERS A TO G (DAY 1 TO 7)
    // ----------------------------------------------------
    {
      id: 'bw1',
      title: 'សប្តាហ៍ទី 1: តួអក្សរ A ដល់ G (Days 1 - 7)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ',
      lessons: [
        buildDailyLesson(1, 1, 'A', 'a', 'A', 'æ', 'អែ (ខ្លី)', 'Apple', 'ផ្លែប៉ោម', 'A - P - P - L - E', 'This is an apple.', 'នេះគឺជាផ្លែប៉ោមមួយ។', 'A ជាស្រៈទី ១ (vowel) — apple, ant, arm, arrow',
          [{ en: 'Ant', kh: 'សត្វស្រមោច' }, { en: 'Arm', kh: 'ដៃ' }],
          [{ en: 'An apple is red.', kh: 'ផ្លែប៉ោមមានពណ៌ក្រហម។' }, { en: 'I eat an apple every day.', kh: 'ខ្ញុំញ៉ាំផ្លែប៉ោមមួយរាល់ថ្ងៃ។' }]
        ),
        buildDailyLesson(2, 1, 'B', 'b', 'B', 'b', 'ប (ចុះ)', 'Book', 'សៀវភៅ', 'B - O - O - K', 'This is my book.', 'នេះគឺជាសៀវភៅរបស់ខ្ញុំ។', 'B /b/ ពីបបូរមាត់ — book, ball, bag, bird',
          [{ en: 'Ball', kh: 'បាល់' }, { en: 'Bag', kh: 'កាបូប' }],
          [{ en: 'The book is big.', kh: 'សៀវភៅនេះធំ។' }, { en: 'I read my book.', kh: 'ខ្ញុំអានសៀវភៅរបស់ខ្ញុំ។' }]
        ),
        buildDailyLesson(3, 1, 'C', 'c', 'C', 'k', 'ខ/ស', 'Cat', 'សត្វឆ្មា', 'C - A - T', 'I have a cat.', 'ខ្ញុំមានសត្វឆ្មា។', 'C+a/o/u = /k/ (cat, car, cup); C+e/i/y = /s/ (city)',
          [{ en: 'Car', kh: 'ឡាន' }, { en: 'Cup', kh: 'ពែង' }],
          [{ en: 'The cat is cute.', kh: 'សត្វឆ្មាគួរស្រឡាញ់ណាស់។' }, { en: 'My cat is white.', kh: 'សត្វឆ្មារបស់ខ្ញុំមានពណ៌ស។' }]
        ),
        buildDailyLesson(4, 1, 'D', 'd', 'D', 'd', 'ដ (ចុង)', 'Dog', 'សត្វឆ្កែ', 'D - O - G', 'The dog is cute.', 'សត្វឆ្កែគួរឱ្យស្រឡាញ់ណាស់។', 'D ចុងអណ្ដាតប៉ះគល់ធ្មេញ — dog, duck, door, door',
          [{ en: 'Duck', kh: 'សត្វទា' }, { en: 'Door', kh: 'ទ្វារ' }],
          [{ en: 'The dog runs fast.', kh: 'សត្វឆ្កែរត់លឿន។' }, { en: 'I love my dog.', kh: 'ខ្ញុំស្រឡាញ់សត្វឆ្កែ។' }]
        ),
        buildDailyLesson(5, 1, 'E', 'e', 'E', 'e', 'អែ (ខ្លី)', 'Egg', 'ពងមាន់', 'E - G - G', 'I eat an egg.', 'ខ្ញុំញ៉ាំពងមាន់មួយ។', 'E ជាស្រៈទី ២ — egg, ear, elephant, eye',
          [{ en: 'Elephant', kh: 'សត្វដំរី' }, { en: 'Ear', kh: 'ត្រចៀក' }],
          [{ en: 'The egg is round.', kh: 'ពងមាន់មានរូបទ្រង់មូល។' }, { en: 'An egg is good for health.', kh: 'ពងមាន់ល្អសម្រាប់សុខភាព។' }]
        ),
        buildDailyLesson(6, 1, 'F', 'f', 'F', 'f', 'ហ្វ (ធ្មេញ)', 'Fish', 'សត្វត្រី', 'F - I - S - H', 'The fish can swim.', 'សត្វត្រីចេះហែលទឹក។', 'F ធ្មេញលើ+បបូរមាត់ — fish, frog, flower, fly',
          [{ en: 'Frog', kh: 'កង្កែប' }, { en: 'Flower', kh: 'ផ្កា' }],
          [{ en: 'I like fish.', kh: 'ខ្ញុំចូលចិត្តចម្អិនត្រី។' }, { en: 'The fish is in the water.', kh: 'សត្វត្រីនៅក្នុងទឹក។' }]
        ),
        buildDailyLesson(7, 1, 'G', 'g', 'G', 'g', 'ហ្គ (ក)', 'Girl', 'ក្មេងស្រី', 'G - I - R - L', 'She is a good girl.', 'នាងជាក្មេងស្រីល្អ។', 'G hard /g/ ក្នុង girl, goat, grass; soft /dʒ/ ក្នុង gem',
          [{ en: 'Goat', kh: 'សត្វពពែ' }, { en: 'Grass', kh: 'ស្មៅ' }],
          [{ en: 'The girl likes to read.', kh: 'ក្មេងស្រីចូលចិត្តអាន។' }, { en: 'The girl has a gift.', kh: 'ក្មេងស្រីមានអំណោយ។' }]
        )
      ]
    },

    // ----------------------------------------------------
    // WEEK 2: LETTERS H TO N (DAY 8 TO 14)
    // ----------------------------------------------------
    {
      id: 'bw2',
      title: 'សប្តាហ៍ទី 2: តួអក្សរ H ដល់ N (Days 8 - 14)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ',
      lessons: [
        buildDailyLesson(8, 2, 'H', 'h', 'H', 'h', 'ហ (ខ្យល)', 'Hat', 'មួក', 'H - A - T', 'I wear a hat.', 'ខ្ញុំពាក់មួក។', 'H ខ្យល់ចេញពីបំពង់ — hat, hand, house, heart',
          [{ en: 'Hand', kh: 'ដៃ' }, { en: 'House', kh: 'ផ្ទះ' }],
          [{ en: 'The hat is red.', kh: 'មួកពណ៌ក្រហម។' }, { en: 'The hat is on my head.', kh: 'មួកនៅលើក្បាល។' }]
        ),
        buildDailyLesson(9, 2, 'I', 'i', 'I', 'ɪ', 'អ៊ិ (ខ្លី)', 'Ice cream', 'ការ៉េម', 'I - C - E   C - R - E - A - M', 'I like ice cream.', 'ខ្ញុំចូលចិត្តការ៉េម។', 'I ជាស្រៈទី ៣ — ice cream, insect, ink, iron',
          [{ en: 'Insect', kh: 'សត្វល្អិត' }, { en: 'Ink', kh: 'ខ្មៅ/មឹក' }],
          [{ en: 'Ice cream is cold.', kh: 'ការ៉េមត្រជាក់ណាស់។' }, { en: 'Ice cream is sweet.', kh: 'ការ៉េមមានរសជាតិផ្អែម។' }]
        ),
        buildDailyLesson(10, 2, 'J', 'j', 'J', 'dʒ', 'ច/ជ (ផ្សំ)', 'Juice', 'ទឹកផ្លែឈើ', 'J - U - I - C - E', 'I drink orange juice.', 'ខ្ញុំផឹកទឹកក្រូចស្រស់។', 'J ជានិច្ច /dʒ/ — juice, jam, jump, jacket',
          [{ en: 'Jam', kh: 'ចំណីផ្អែម (Jam)' }, { en: 'Jump', kh: 'លោត' }],
          [{ en: 'Juice is healthy.', kh: 'ទឹកផ្លែឈើល្អ។' }, { en: 'The juice is cold.', kh: 'ទឹកផ្លែឈើត្រជាក់ណាស់។' }]
        ),
        buildDailyLesson(11, 2, 'K', 'k', 'K', 'k', 'ខ (គល)', 'Kite', 'ខ្លែង', 'K - I - T - E', 'The kite flies high.', 'ខ្លែងហោះខ្ពស់លើមេឃ។', 'K ជានិច្ច /k/ (ខុសពី C ពីរសូរ) — kite, key, king',
          [{ en: 'Key', kh: 'សោ' }, { en: 'King', kh: 'ស្ដេច' }],
          [{ en: 'The kite is blue.', kh: 'ខ្លែងពណ៌ខៀវ។' }, { en: 'I fly my kite.', kh: 'ខ្ញុំហោះខ្លែង។' }]
        ),
        buildDailyLesson(12, 2, 'L', 'l', 'L', 'l', 'ល (ចុង)', 'Lion', 'សត្វតោ', 'L - I - O - N', 'The lion is strong.', 'សត្វតោខ្លាំងណាស់។', 'L ចុងអណ្ដាតប៉ះខាងមុខ — lion, leaf, lemon, lamp',
          [{ en: 'Leaf', kh: 'ស្លឹកឈើ' }, { en: 'Lemon', kh: 'ផ្លែក្រូចឆ្មា' }],
          [{ en: 'The lion is big.', kh: 'សត្វតោធំ។' }, { en: 'The lion roars loudly.', kh: 'សត្វតោស្រែកឮ។' }]
        ),
        buildDailyLesson(13, 2, 'M', 'm', 'M', 'm', 'ម (ច្រមុះ)', 'Monkey', 'សត្វស្វា', 'M - O - N - K - E - Y', 'The monkey likes bananas.', 'សត្វស្វាចូលចិត្តចេក។', 'M nasal ដង្ហើមមិមជ្រៅ — monkey, milk, moon, mango',
          [{ en: 'Milk', kh: 'ទឹកដោះ' }, { en: 'Moon', kh: 'ព្រះច័ន្ទ' }],
          [{ en: 'The monkey climbs the tree.', kh: 'សត្វស្វាឡើងដើមឈើ។' }, { en: 'The monkey is funny.', kh: 'សត្វស្វាគួរចង់សើច។' }]
        ),
        buildDailyLesson(14, 2, 'N', 'n', 'N', 'n', 'ន (ច្រមុះ)', 'Nose', 'ច្រមុះ', 'N - O - S - E', 'This is my nose.', 'នេះជាច្រមុះរបស់ខ្ញុំ។', 'N alveolar nasal — nose, neck, night, nest',
          [{ en: 'Neck', kh: 'ក' }, { en: 'Night', kh: 'យប់' }],
          [{ en: 'The nose can smell.', kh: 'ច្រមុះអាចផ្សំក្លិន។' }, { en: 'I have a small nose.', kh: 'ខ្ញុំមានច្រមុះតូច។' }]
        )
      ]
    },

    // ----------------------------------------------------
    // WEEK 3: LETTERS O TO T (DAY 15 TO 20)
    // ----------------------------------------------------
    {
      id: 'bw3',
      title: 'សប្តាហ៍ទី 3: តួអក្សរ O ដល់ T (Days 15 - 20)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ',
      lessons: [
        buildDailyLesson(15, 3, 'O', 'o', 'O', 'ɒ', 'អ (មូល)', 'Orange', 'ផ្លែក្រូច', 'O - R - A - N - G - E', 'An orange is sweet.', 'ផ្លែក្រូចផ្អែម។', 'O ជាស្រៈទី ៤ — orange, owl, ocean, ox',
          [{ en: 'Owl', kh: 'សត្វទីទុយ' }, { en: 'Ocean', kh: 'មហាសមុទ្រ' }],
          [{ en: 'The orange is round.', kh: 'ផ្លែក្រូចមានរូបទ្រង់មូល។' }, { en: 'I drink orange juice.', kh: 'ខ្ញុំផឹកទឹកក្រូច។' }]
        ),
        buildDailyLesson(16, 3, 'P', 'p', 'P', 'p', 'ផ (បំបែក)', 'Pen', 'ប៊ិច', 'P - E - N', 'This is a blue pen.', 'នេះជាប៊ិចពណ៌ខៀវ។', 'P ខ្យល់ /pʰ/ ពីបបូរមាត់ — pen, pig, pencil, paper',
          [{ en: 'Pig', kh: 'សត្វជ្រូក' }, { en: 'Pencil', kh: 'ខ្មៅដៃ' }],
          [{ en: 'The pen is on the table.', kh: 'ប៊ិចនៅលើតុ។' }, { en: 'I write with a pen.', kh: 'ខ្ញុំសរសេរដោយប្រើប៊ិច។' }]
        ),
        buildDailyLesson(17, 3, 'Q', 'q', 'Q', 'kw', 'ឃ្វ (ផ្សំ)', 'Queen', 'ព្រះមហាក្សត្រិយានី', 'Q - U - E - E - N', 'She is a queen.', 'នាងជាព្រះមហាក្សត្រិយានី។', 'Q + U ជានិច្ច /kw/ — queen, quick, quiet, quiz',
          [{ en: 'Quick', kh: 'លឿន' }, { en: 'Quiet', kh: 'ស្ងាត់' }],
          [{ en: 'The queen is kind.', kh: 'ព្រះមហាក្សត្រិយានីចិត្តល្អ។' }, { en: 'The queen wears a crown.', kh: 'ព្រះមហាក្សត្រិយានីពាក់ crown (ចង្កោម)។' }]
        ),
        buildDailyLesson(18, 3, 'R', 'r', 'R', 'r', 'រ (ច្រំ)', 'Rabbit', 'សត្វទន្សាយ', 'R - A - B - B - I - T', 'The rabbit is white.', 'សត្វទន្សាយពណ៌ស។', 'R ចុងអណ្ដាតកោង — rabbit, rain, rose, run',
          [{ en: 'Rain', kh: 'ភ្លៀង' }, { en: 'Rose', kh: 'ផ្កាកុលាប' }],
          [{ en: 'The rabbit eats carrots.', kh: 'ទន្សាយញ៉ាំការ៉ុត។' }, { en: 'The rabbit runs fast.', kh: 'ទន្សាយរត់លឿន។' }]
        ),
        buildDailyLesson(19, 3, 'S', 's', 'S', 's', 'ស (ស៊ូ)', 'Sun', 'ព្រះអាទិត្យ', 'S - U - N', 'The sun is bright.', 'ព្រះអាទិត្យភ្លឺ។', 'S /s/ ក្នុង sun, star, sky; /z/ ក្នុង rose',
          [{ en: 'Star', kh: 'ផ្កាយ' }, { en: 'Sky', kh: 'មេឃ' }],
          [{ en: 'The sun is hot.', kh: 'ព្រះអាទិត្យក្ដៅ។' }, { en: 'The sun rises in the east.', kh: 'ព្រះអាទិត្យរះខាងកើត។' }]
        ),
        buildDailyLesson(20, 3, 'T', 't', 'T', 't', 'ថ (ចុង)', 'Tree', 'ដើមឈើ', 'T - R - E - E', 'This is a green tree.', 'នេះជាដើមឈើពណ៌បៃតង។', 'T ចុងអណ្ដាតខ្ទប់ — tree, tiger, table, tail',
          [{ en: 'Tiger', kh: 'សត្វខ្លា' }, { en: 'Table', kh: 'តុ' }],
          [{ en: 'The tree is tall.', kh: 'ដើមឈើខ្ពស់ណាស់។' }, { en: 'I sit under the tree.', kh: 'ខ្ញុំអង្គុយក្រោមដើមឈើ។' }]
        )
      ]
    },

    // ----------------------------------------------------
    // WEEK 4: LETTERS U TO Z (DAY 21 TO 26)
    // ----------------------------------------------------
    {
      id: 'bw4',
      title: 'សប្តាហ៍ទី 4: តួអក្សរ U ដល់ Z (Days 21 - 26)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ',
      lessons: [
        buildDailyLesson(21, 4, 'U', 'u', 'U', 'ʌ', 'អ (ខ្លី)', 'Umbrella', 'ឆ័ត្រ', 'U - M - B - R - E - L - L - A', 'I have an umbrella.', 'ខ្ញុំមានឆ័ត្រ។', 'U ជាស្រៈទី ៥ — umbrella, uncle, under, up',
          [{ en: 'Uncle', kh: 'ពូ' }, { en: 'Under', kh: 'ក្រោម' }],
          [{ en: 'The umbrella is big.', kh: 'ឆ័ត្រនេះធំ។' }, { en: 'I use an umbrella in the rain.', kh: 'ខ្ញុំប្រើឆ័ត្រពេលភ្លៀង។' }]
        ),
        buildDailyLesson(22, 4, 'V', 'v', 'V', 'v', 'វ (រំញ័រ)', 'Van', 'ឡានវ៉ែន', 'V - A - N', 'The van is blue.', 'ឡានវ៉ែនពណ៌ខៀវ។', 'V voiced (មានរំញ័រ) — van, very, vegetable, visit',
          [{ en: 'Very', kh: 'ណាស់' }, { en: 'Vegetable', kh: 'បន្លែ' }],
          [{ en: 'The van is fast.', kh: 'ឡានវ៉ែនលឿន។' }, { en: 'We travel by van.', kh: 'យើងធ្វើដំណើរដោយឡានវ៉ែន។' }]
        ),
        buildDailyLesson(23, 4, 'W', 'w', 'W', 'w', 'វ (មូល)', 'Water', 'ទឹក', 'W - A - T - E - R', 'I drink clean water.', 'ខ្ញុំផឹកទឹកស្អាត។', 'W មូលបបូរ — water, wind, window, walk',
          [{ en: 'Wind', kh: 'ខ្យល់' }, { en: 'Window', kh: 'បង្អួច' }],
          [{ en: 'Water is important.', kh: 'ទឹកមានសារៈសំខាន់។' }, { en: 'The water is cold.', kh: 'ទឹកត្រជាក់ណាស់។' }]
        ),
        buildDailyLesson(24, 4, 'X', 'x', 'X', 'ks', 'ខ្ស (ចុង)', 'Box', 'ប្រអប់', 'B - O - X', 'This is a big box.', 'នេះជាប្រអប់ធំ។', 'X = /ks/ ចុងពាក្យ (box, fox, six); = /z/ ដើម (xylophone)',
          [{ en: 'Fox', kh: 'សត្វស្វែង' }, { en: 'Six', kh: 'ប្រាំមួយ' }],
          [{ en: 'The box is heavy.', kh: 'ប្រអប់ធ្ងន់ណាស់។' }, { en: 'I put toys in the box.', kh: 'ខ្ញុំដាក់របស់លេងក្នុងប្រអប់។' }]
        ),
        buildDailyLesson(25, 4, 'Y', 'y', 'Y', 'j', 'យ (ស្រាល)', 'Yellow', 'ពណ៌លឿង', 'Y - E - L - L - O - W', 'The banana is yellow.', 'ផ្លែចេកពណ៌លឿង។', 'Y ដើម = /j/ (yes, yellow); Y ចុង = /i/ (happy, sunny)',
          [{ en: 'Yes', kh: 'បាទ/ចាស' }, { en: 'Year', kh: 'ឆ្នាំ' }],
          [{ en: 'Yellow is a bright color.', kh: 'ពណ៌លឿងភ្លឺ។' }, { en: 'The sun is yellow.', kh: 'ព្រះអាទិត្យពណ៌លឿង។' }]
        ),
        buildDailyLesson(26, 4, 'Z', 'z', 'Z', 'z', 'ហ្ស (រំញ័រ)', 'Zebra', 'សេះបង្កង់', 'Z - E - B - R - A', 'The zebra has stripes.', 'សេះបង្កង់មានឆ្នូតខ្មៅស។', 'Z = /z/ (zebra, zoo, zero) — អក្សរទី ២៦ ចុងក្រោយ',
          [{ en: 'Zoo', kh: 'សួនសត្វ' }, { en: 'Zero', kh: 'សូន្យ' }],
          [{ en: 'The zebra lives in Africa.', kh: 'សេះបង្កង់រស់នៅអាហ្វ្រិក។' }, { en: 'I see a zebra at the zoo.', kh: 'ខ្ញុំឃើញសេះបង្កង់នៅសួនសត្វ។' }]
        )
      ]
    }
  ]

};

module.exports = BEGINNER_COURSE;
