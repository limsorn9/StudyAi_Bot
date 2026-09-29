/**
 * Beginner Level Curriculum (ថ្នាក់ដំបូង / English for Children)
 * Structured as 1 Day = 1 Letter, 1 Word, 1 Sentence (១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ)
 * Taught by AI Instructor: អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)
 */

function buildDailyLesson(dayNum, weekNum, letterUpper, letterLower, letterKhName, phonicsSound, phonicsKh, wordEn, wordKh, spelling, sentenceEn, sentenceKh, extraNote = '') {
  const letterCode = `${letterUpper}${letterLower}`;
  return {
    id: `bl${dayNum}`,
    day: dayNum,
    letter: letterUpper,
    word: wordEn,
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
${extraNote ? `• ចំណាំបន្ថែម៖ ${extraNote}\n` : ''}
════════════════════════════════════════════
🔑 វាក្យសព្ទប្រចាំថ្ងៃ (1 Word)៖
1. 🇬🇧 ${wordEn} = 🇰🇭 ${wordKh}

════════════════════════════════════════════
💡 ល្បះគំរូប្រចាំថ្ងៃ (1 Sentence)៖
1. 🇬🇧 ${sentenceEn}
   🇰🇭 (${sentenceKh})

════════════════════════════════════════════
💬 កិច្ចសន្ទនាគំរូពេញលេញ (Full Dialogue with Audio)៖

👤 Teacher Piseth:
   🇬🇧 "Hello my dear! What letter is this?"
   🇰🇭 (សួស្តីកូន! តើនេះជាតួអក្សរអ្វីដែរ?)

👤 Student:
   🇬🇧 "This is letter ${letterUpper}. ${letterUpper} is for ${wordEn}!"
   🇰🇭 (នេះជាតួអក្សរ ${letterUpper}។ ${letterUpper} គឺសម្រាប់ពាក្យ ${wordEn}!)

👤 Teacher Piseth:
   🇬🇧 "Very good! Now say: ${sentenceEn}"
   🇰🇭 (ពូកែណាស់! ឥឡូវកូនថា៖ ${sentenceEn}។)

👤 Student:
   🇬🇧 "${sentenceEn}"
   🇰🇭 (${sentenceKh})

════════════════════════════════════════════
✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Practice Exercise)៖
ចូរហាត់អានឮៗ៖ អក្សរ ${letterUpper} ➡️ ពាក្យ ${wordEn} ➡️ ល្បះ "${sentenceEn}" រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់ជាមួយអ្នកគ្រូពិសិដ្ឋ!`
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
      title: 'សប្តាហ៍ទី 1៖ តួអក្សរ A ដល់ G (Days 1 - 7)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ (English for Children)',
      lessons: [
        buildDailyLesson(1, 1, 'A', 'a', 'A', 'æ', 'អេ/អា', 'Apple', 'ផ្លែប៉ោម', 'A - P - P - L - E', 'This is an apple.', 'នេះគឺជាផ្លែប៉ោមមួយផ្លែ។', 'អក្សរ A ជាស្រៈទីមួយក្នុងភាសាអង់គ្លេស'),
        buildDailyLesson(2, 1, 'B', 'b', 'B', 'b', 'ប៊', 'Book', 'សៀវភៅ', 'B - O - O - K', 'This is my book.', 'នេះគឺជាសៀវភៅរបស់ខ្ញុំ។', 'អក្សរ B បញ្ចេញសូរខ្យល់បបូរមាត់ប៊ុកស្រាល'),
        buildDailyLesson(3, 1, 'C', 'c', 'C', 'k', 'ខ/ឃ', 'Cat', 'សត្វឆ្មា', 'C - A - T', 'I have a cat.', 'ខ្ញុំមានសត្វឆ្មាមួយក្បាល។', 'អក្សរ C នៅមុខស្រៈ A បញ្ចេញសូរ /k/ ខ'),
        buildDailyLesson(4, 1, 'D', 'd', 'D', 'd', 'ដ', 'Dog', 'សត្វឆ្កែ', 'D - O - G', 'The dog is cute.', 'សត្វឆ្កែនេះគួរឱ្យស្រឡាញ់ណាស់។', 'អក្សរ D បញ្ចេញសូរ ដ ស្រាល'),
        buildDailyLesson(5, 1, 'E', 'e', 'E', 'e', 'អ៊ែ', 'Egg', 'ពងមាន់', 'E - G - G', 'I eat an egg.', 'ខ្ញុំញ៉ាំពងមាន់មួយគ្រាប់។', 'អក្សរ E ជាស្រៈទីពីរក្នុងភាសាអង់គ្លេស'),
        buildDailyLesson(6, 1, 'F', 'f', 'F', 'f', 'ហ្វ', 'Fish', 'សត្វត្រី', 'F - I - S - H', 'The fish can swim.', 'សត្វត្រីចេះហែលទឹក។', 'អក្សរ F បញ្ចេញខ្យល់ធ្មេញលើប៉ះបបូរមាត់ក្រោម'),
        buildDailyLesson(7, 1, 'G', 'g', 'G', 'g', 'ហ្គ', 'Girl', 'ក្មេងស្រី', 'G - I - R - L', 'She is a good girl.', 'នាងគឺជាក្មេងស្រីល្អម្នាក់។', 'អក្សរ G បញ្ចេញសូរ ហ្គ ក្នុងបំពង់ក')
      ]
    },

    // ----------------------------------------------------
    // WEEK 2: LETTERS H TO N (DAY 8 TO 14)
    // ----------------------------------------------------
    {
      id: 'bw2',
      title: 'សប្តាហ៍ទី 2៖ តួអក្សរ H ដល់ N (Days 8 - 14)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ (English for Children)',
      lessons: [
        buildDailyLesson(8, 2, 'H', 'h', 'H', 'h', 'ហ', 'Hat', 'មួក', 'H - A - T', 'I wear a hat.', 'ខ្ញុំពាក់មួកមួយ។', 'អក្សរ H បញ្ចេញខ្យល់ដង្ហើមចេញពីបំពង់ក'),
        buildDailyLesson(9, 2, 'I', 'i', 'I', 'ɪ', 'អ៊ី/អ៊ិ', 'Ice cream', 'ការ៉េម', 'I - C - E   C - R - E - A - M', 'I like ice cream.', 'ខ្ញុំចូលចិត្តញ៉ាំការ៉េម។', 'អក្សរ I ជាស្រៈទីបីក្នុងភាសាអង់គ្លេស'),
        buildDailyLesson(10, 2, 'J', 'j', 'J', 'dʒ', 'ច/ជ', 'Juice', 'ទឹកផ្លែឈើ', 'J - U - I - C - E', 'I drink orange juice.', 'ខ្ញុំផឹកទឹកក្រូចស្រស់។', 'អក្សរ J បញ្ចេញសូរ ច/ជ គួបផ្សំ'),
        buildDailyLesson(11, 2, 'K', 'k', 'K', 'k', 'ខ/ឃ', 'Kite', 'ខ្លែង', 'K - I - T - E', 'The kite flies high.', 'ខ្លែងហោះខ្ពស់លើមេឃ។', 'អក្សរ K បញ្ចេញសូរ ខ ពីគល់អណ្តាត'),
        buildDailyLesson(12, 2, 'L', 'l', 'L', 'l', 'ល', 'Lion', 'សត្វតោ', 'L - I - O - N', 'The lion is strong.', 'សត្វតោមានកម្លាំងខ្លាំងក្លា។', 'អក្សរ L ចុងអណ្តាតប៉ះគល់ធ្មេញលើ'),
        buildDailyLesson(13, 2, 'M', 'm', 'M', 'm', 'ម', 'Monkey', 'សត្វស្វា', 'M - O - N - K - E - Y', 'The monkey likes bananas.', 'សត្វស្វាចូលចិត្តផ្លែចេក។', 'អក្សរ M បបូរមាត់ទាំងពីរបិទជិតបញ្ចេញខ្យល់តាមច្រមុះ'),
        buildDailyLesson(14, 2, 'N', 'n', 'N', 'n', 'ន', 'Nose', 'ច្រមុះ', 'N - O - S - E', 'This is my nose.', 'នេះគឺជាច្រមុះរបស់ខ្ញុំ។', 'អក្សរ N ចុងអណ្តាតទប់គល់ធ្មេញលើ')
      ]
    },

    // ----------------------------------------------------
    // WEEK 3: LETTERS O TO T (DAY 15 TO 20)
    // ----------------------------------------------------
    {
      id: 'bw3',
      title: 'សប្តាហ៍ទី 3៖ តួអក្សរ O ដល់ T (Days 15 - 20)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ (English for Children)',
      lessons: [
        buildDailyLesson(15, 3, 'O', 'o', 'O', 'ɒ', 'អ/អ៊', 'Orange', 'ផ្លែក្រូច', 'O - R - A - N - G - E', 'An orange is sweet.', 'ផ្លែក្រូចមានរសជាតិផ្អែម។', 'អក្សរ O ជាស្រៈទីបួនក្នុងភាសាអង់គ្លេស'),
        buildDailyLesson(16, 3, 'P', 'p', 'P', 'p', 'ផ/ភ', 'Pen', 'ប៊ិច', 'P - E - N', 'This is a blue pen.', 'នេះគឺជាប៊ិចពណ៌ខៀវមួយដើម។', 'អក្សរ P បញ្ចេញខ្យល់បាញ់ចេញពីបបូរមាត់'),
        buildDailyLesson(17, 3, 'Q', 'q', 'Q', 'kw', 'ឃ្វ', 'Queen', 'ព្រះមហាក្សត្រិយានី', 'Q - U - E - E - N', 'She is a queen.', 'នាងគឺជាព្រះមហាក្សត្រិយានី។', 'អក្សរ Q តែងតែដើរគូជាមួយអក្សរ U (qu = kw)'),
        buildDailyLesson(18, 3, 'R', 'r', 'R', 'r', 'រ', 'Rabbit', 'សត្វទន្សាយ', 'R - A - B - B - I - T', 'The rabbit is white.', 'សត្វទន្សាយមានពណ៌ស។', 'អក្សរ R មូលបបូរមាត់ចុងអណ្តាតកោងឡើងលើ'),
        buildDailyLesson(19, 3, 'S', 's', 'S', 's', 'ស/ស៊', 'Sun', 'ព្រះអាទិត្យ', 'S - U - N', 'The sun is bright.', 'ព្រះអាទិត្យភ្លឺចិញ្ចែងចិញ្ចាច។', 'អក្សរ S បញ្ចេញខ្យល់ស៊ស៊ូតាមចន្លោះធ្មេញ'),
        buildDailyLesson(20, 3, 'T', 't', 'T', 't', 'ថ/ធ', 'Tree', 'ដើមឈើ', 'T - R - E - E', 'This is a green tree.', 'នេះគឺជាដើមឈើពណ៌បៃតងមួយដើម។', 'អក្សរ T ចុងអណ្តាតខ្ទប់ធ្មេញលើរួចបញ្ចេញខ្យល់')
      ]
    },

    // ----------------------------------------------------
    // WEEK 4: LETTERS U TO Z (DAY 21 TO 26)
    // ----------------------------------------------------
    {
      id: 'bw4',
      title: 'សប្តាហ៍ទី 4៖ តួអក្សរ U ដល់ Z (Days 21 - 26)',
      description: 'រៀន ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ ជាមួយអ្នកគ្រូពិសិដ្ឋ (English for Children)',
      lessons: [
        buildDailyLesson(21, 4, 'U', 'u', 'U', 'ʌ', 'អា/អ៊', 'Umbrella', 'ឆ័ត្រ', 'U - M - B - R - E - L - L - A', 'I have an umbrella.', 'ខ្ញុំមានឆ័ត្រមួយដើម។', 'អក្សរ U ជាស្រៈទីប្រាំក្នុងភាសាអង់គ្លេស'),
        buildDailyLesson(22, 4, 'V', 'v', 'V', 'v', 'វ', 'Van', 'ឡានវ៉ែន', 'V - A - N', 'The van is blue.', 'ឡានវ៉ែនមានពណ៌ខៀវ។', 'អក្សរ V ធ្មេញលើប៉ះបបូរមាត់ក្រោមមានរំញ័រ'),
        buildDailyLesson(23, 4, 'W', 'w', 'W', 'w', 'វ', 'Water', 'ទឹកស្អាត', 'W - A - T - E - R', 'I drink clean water.', 'ខ្ញុំផឹកទឹកស្អាតរាល់ថ្ងៃ។', 'អក្សរ W មូលបបូរមាត់ដូចផ្លុំខ្យល់'),
        buildDailyLesson(24, 4, 'X', 'x', 'X', 'ks', 'ខ្ស', 'Box', 'ប្រអប់', 'B - O - X', 'This is a big box.', 'នេះគឺជាប្រអប់ធំមួយ។', 'អក្សរ X បញ្ចេញសូរ /ks/ នៅចុងពាក្យ'),
        buildDailyLesson(25, 4, 'Y', 'y', 'Y', 'j', 'យ', 'Yellow', 'ពណ៌លឿង', 'Y - E - L - L - O - W', 'The banana is yellow.', 'ផ្លែចេកមានពណ៌លឿង។', 'អក្សរ Y បញ្ចេញសូរ យ ស្រាល'),
        buildDailyLesson(26, 4, 'Z', 'z', 'Z', 'z', 'ហ្ស', 'Zebra', 'សេះបង្កង់', 'Z - E - B - R - A', 'The zebra has stripes.', 'សេះបង្កង់មានឆ្នូតខ្មៅស។', 'អក្សរ Z បញ្ចេញសូរសង្កៀតធ្មេញមានរំញ័របំពង់ក')
      ]
    }
  ]
};

module.exports = BEGINNER_COURSE;
