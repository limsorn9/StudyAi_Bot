const fs = require('fs');
const path = require('path');

// Helper to format content identical to curriculum standard
function formatLessonContent(lesson) {
  const { day, monthNum, weekNum, titleKh, titleEn, grammarKh, vocab, sentences, dialogue } = lesson;
  
  const vocabLines = (vocab || []).map((v, i) => {
    return `${i + 1}. 🇬🇧 ${v.en} ${v.ipa ? `(${v.ipa})` : ''} = 🇰🇭 ${v.kh}\n   ↳ ឧទាហរណ៍៖ ${v.exEn}\n   ↳ បកប្រែ៖ (${v.exKh})`;
  }).join('\n\n');

  const sentLines = (sentences || []).map((s, i) => {
    return `${i + 1}. 🇬🇧 ${s.en}\n   🇰🇭 (${s.kh})`;
  }).join('\n');

  const diagLines = (dialogue || []).map(d => {
    return `👤 ${d.speaker}:\n   🇬🇧 "${d.en}"\n   🇰🇭 (${d.kh})`;
  }).join('\n\n');

  return `📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline
📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី ${monthNum} • សប្តាហ៍ទី ${weekNum} • ថ្ងៃទី ${day}
🎯 ប្រធានបទ៖ ${titleKh} (${titleEn})
📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)

════════════════════════════════════════════
📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖
${grammarKh}

════════════════════════════════════════════
🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖
${vocabLines}

════════════════════════════════════════════
💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖
${sentLines}

════════════════════════════════════════════
💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖
${diagLines}

════════════════════════════════════════════
✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖
ចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! 
បន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖`;
}

// Full 72 lessons data
const lessons = [
  // ==========================================
  // MONTH 1 (WEEKS 1-4, DAYS 1-24)
  // ==========================================
  // Week 1 (Days 1-6)
  {
    day: 1, monthNum: 1, weekNum: 1,
    titleEn: 'Subject Pronouns (I, You, We, They, He, She, It)',
    titleKh: 'សព្វនាមប្រធាន Subject Pronouns',
    grammarKh: 'សព្វនាមប្រធាន (Subject Pronouns) គឺជាពាក្យដែលប្រើជំនួសឱ្យនាម ដើម្បីធ្វើជាប្រធាននៃល្បះ។\n• I = ខ្ញុំ\n• You = អ្នក / ឯង / លោក\n• We = ពួកយើង\n• They = ពួកគេ / ពួកវា\n• He = គាត់ (បុរសម្នាក់)\n• She = នាង (ស្ត្រីម្នាក់)\n• It = វា (សត្វ ឬវត្ថុមួយ)',
    vocab: [
      { en: 'I', kh: 'ខ្ញុំ', ipa: '/aɪ/', exEn: 'I am an eager student.', exKh: 'ខ្ញុំជាសិស្សដែលមានចិត្តចង់រៀនសូត្រ។' },
      { en: 'You', kh: 'អ្នក', ipa: '/juː/', exEn: 'You are very kind and polite.', exKh: 'អ្នកមានចិត្តល្អ និងគួរសមណាស់។' },
      { en: 'We', kh: 'ពួកយើង', ipa: '/wiː/', exEn: 'We study English together every day.', exKh: 'ពួកយើងរៀនភាសាអង់គ្លេសជាមួយគ្នារាល់ថ្ងៃ។' },
      { en: 'They', kh: 'ពួកគេ', ipa: '/ðeɪ/', exEn: 'They are happy in the school library.', exKh: 'ពួកគេសប្បាយរីករាយនៅក្នុងបណ្ណាល័យសាលា។' },
      { en: 'He', kh: 'គាត់', ipa: '/hiː/', exEn: 'He is my hard-working brother.', exKh: 'គាត់ជាបងប្រុសដ៏ឧស្សាហ៍របស់ខ្ញុំ។' },
      { en: 'She', kh: 'នាង', ipa: '/ʃiː/', exEn: 'She is a smart English teacher.', exKh: 'នាងជាគ្រូបង្រៀនភាសាអង់គ្លេសដ៏ឆ្លាតវៃម្នាក់។' }
    ],
    sentences: [
      { en: 'I am ready to learn English today.', kh: 'ខ្ញុំរួចរាល់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះហើយ។' },
      { en: 'She is my best friend in Phnom Penh.', kh: 'នាងជាមិត្តភក្តិល្អបំផុតរបស់ខ្ញុំនៅភ្នំពេញ។' },
      { en: 'We speak English with Teacher Piseth.', kh: 'ពួកយើងនិយាយភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Hello! Welcome to the Elementary Course! What is your name?', kh: 'សួស្តី! ស្វាគមន៍មកកាន់ថ្នាក់បឋមសិក្សា! តើកូនឈ្មោះអ្វីដែរ?' },
      { speaker: 'Student', en: 'Hello Teacher Piseth! I am Dara, and she is my sister Bopha.', kh: 'ជម្រាបសួរអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំឈ្មោះដារ៉ា ហើយនាងជាប្អូនស្រីខ្ញុំឈ្មោះបុប្ផា។' },
      { speaker: 'Teacher Piseth', en: 'Welcome Dara and Bopha! We will learn together with joy.', kh: 'ស្វាគមន៍ដារ៉ា និងបុប្ផា! ពួកយើងនឹងរៀនជាមួយគ្នាដោយភាពសប្បាយរីករាយ។' }
    ]
  },
  {
    day: 2, monthNum: 1, weekNum: 1,
    titleEn: 'Verb To Be Present (Am, Is, Are) - Affirmative',
    titleKh: 'កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប',
    grammarKh: 'កិរិយាសព្ទ "To Be" ប្រែថា "ជា, គឺ, នៅ"។\n• I + am (I am = ខ្ញុំគឺ/ជា/នៅ)\n• He / She / It + is (He is, She is, It is)\n• You / We / They + are (You are, We are, They are)',
    vocab: [
      { en: 'am', kh: 'ជា/គឺ (ប្រើជាមួយ I)', ipa: '/æm/', exEn: 'I am ready for lesson two.', exKh: 'ខ្ញុំរួចរាល់សម្រាប់មេរៀនទី ២។' },
      { en: 'is', kh: 'ជា/គឺ (ប្រើជាមួយ He/She/It)', ipa: '/ɪz/', exEn: 'He is a great doctor in hospital.', exKh: 'គាត់ជាវេជ្ជបណ្ឌិតដ៏ពូកែម្នាក់ក្នុងមន្ទីរពេទ្យ។' },
      { en: 'are', kh: 'ជា/គឺ (ប្រើជាមួយ You/We/They)', ipa: '/ɑːr/', exEn: 'We are active learners.', exKh: 'ពួកយើងជាអ្នករៀនសូត្រដ៏សកម្ម។' },
      { en: 'happy', kh: 'រីករាយ / សប្បាយចិត្ត', ipa: '/ˈhæpi/', exEn: 'The children are very happy.', exKh: 'ក្មេងៗសប្បាយរីករាយខ្លាំងណាស់។' },
      { en: 'clever', kh: 'ឆ្លាតវៃ', ipa: '/ˈklevər/', exEn: 'She is a clever girl.', exKh: 'នាងជាក្មេងស្រីឆ្លាតម្នាក់។' }
    ],
    sentences: [
      { en: 'I am an English learner.', kh: 'ខ្ញុំជាអ្នករៀនភាសាអង់គ្លេសម្នាក់។' },
      { en: 'He is a friendly student.', kh: 'គាត់ជាសិស្សរួសរាយម្នាក់។' },
      { en: 'They are in the classroom now.', kh: 'ពួកគេនៅក្នុងបន្ទប់រៀនឥឡូវនេះ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'How are you feeling today, class?', kh: 'តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរថ្ងៃនេះ?' },
      { speaker: 'Student', en: 'We are excited! I am very happy to see you, Teacher.', kh: 'ពួកយើងរំភើបណាស់! ខ្ញុំសប្បាយចិត្តខ្លាំងណាស់ដែលបានជួបអ្នកគ្រូ។' },
      { speaker: 'Teacher Piseth', en: 'I am thrilled to hear that! You are all wonderful students.', kh: 'អ្នកគ្រូរីករាយណាស់ដែលបានឮបែបនេះ! កូនៗទាំងអស់សុទ្ធតែជាសិស្សដ៏អស្ចារ្យ។' }
    ]
  },
  {
    day: 3, monthNum: 1, weekNum: 1,
    titleEn: 'Verb To Be - Negative & Questions (Not, Are you...?)',
    titleKh: 'កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ',
    grammarKh: '១. ទម្រង់បដិសេធ (Negative): ថែម NOT ពីក្រោយ To Be\n• I am not... (I\'m not...)\n• He / She / It is not... (isn\'t)\n• You / We / They are not... (aren\'t)\n២. ទម្រង់សំណួរ (Question): លើក Am / Is / Are មកដាក់មុខប្រធាន\n• Are you ready? -> Yes, I am. / No, I am not.\n• Is he a teacher? -> Yes, he is. / No, he isn\'t.',
    vocab: [
      { en: 'not', kh: 'មិន/ទេ (បដិសេធ)', ipa: '/nɒt/', exEn: 'I am not tired today.', exKh: 'ខ្ញុំមិនអស់កម្លាំងទេថ្ងៃនេះ។' },
      { en: 'isn\'t', kh: 'មិនមែន (is not)', ipa: '/ˈɪznt/', exEn: 'She isn\'t sad at all.', exKh: 'នាងមិនកើតទុក្ខទាល់តែសោះ។' },
      { en: 'aren\'t', kh: 'មិនមែន (are not)', ipa: '/ɑːnt/', exEn: 'We aren\'t late for class.', exKh: 'ពួកយើងមិនយឺតពេលចូលរៀនទេ។' },
      { en: 'ready', kh: 'រួចរាល់', ipa: '/ˈredi/', exEn: 'Are you ready for the quiz?', exKh: 'តើអ្នករួចរាល់សម្រាប់សំណួរតេស្តហើយឬនៅ?' }
    ],
    sentences: [
      { en: 'I am not afraid of speaking English.', kh: 'ខ្ញុំមិនខ្លាចការនិយាយភាសាអង់គ្លេសឡើយ។' },
      { en: 'Is she your English teacher? Yes, she is.', kh: 'តើនាងជាគ្រូភាសាអង់គ្លេសរបស់អ្នកមែនទេ? ចាស ពិតមែនហើយ។' },
      { en: 'Are they from Cambodia? Yes, they are.', kh: 'តើពួកគេមកពីប្រទេសកម្ពុជាមែនទេ? បាទ គឺពិតមែនហើយ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Are you nervous about speaking English?', kh: 'តើកូនមានការភ័យខ្លាចក្នុងការនិយាយភាសាអង់គ្លេសទេ?' },
      { speaker: 'Student', en: 'No, I am not nervous with Teacher Piseth!', kh: 'អត់ទេអ្នកគ្រូ ខ្ញុំមិនភ័យទេនៅពេលរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ!' },
      { speaker: 'Teacher Piseth', en: 'Excellent attitude! Confidence is the key to success.', kh: 'អាកប្បកិរិយាដ៏ល្អឥតខ្ចោះ! ទំនុកចិត្តគឺជាកូនសោនៃភាពជោគជ័យ។' }
    ]
  },
  {
    day: 4, monthNum: 1, weekNum: 1,
    titleEn: 'Possessive Adjectives (My, Your, His, Her, Our, Their)',
    titleKh: 'គុណនាមកម្មសិទ្ធិ Possessive Adjectives',
    grammarKh: 'គុណនាមកម្មសិទ្ធិ (Possessive Adjectives) ប្រើដើម្បីបង្ហាញភាពជាម្ចាស់ ហើយត្រូវនៅមុខនាមជានិច្ច៖\n• I -> My (របស់ខ្ញុំ): my book\n• You -> Your (របស់អ្នក): your pencil\n• He -> His (របស់គាត់): his bag\n• She -> Her (របស់នាង): her notebook\n• It -> Its (របស់វា): its color\n• We -> Our (របស់យើង): our classroom\n• They -> Their (របស់ពួកគេ): their teacher',
    vocab: [
      { en: 'my', kh: 'របស់ខ្ញុំ', ipa: '/maɪ/', exEn: 'This is my English book.', exKh: 'នេះជាសៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំ។' },
      { en: 'your', kh: 'របស់អ្នក', ipa: '/jɔːr/', exEn: 'Your pronunciation is great.', exKh: 'ការបញ្ចេញសំឡេងរបស់អ្នកពូកែណាស់។' },
      { en: 'his', kh: 'របស់គាត់', ipa: '/hɪz/', exEn: 'His brother lives in Siem Reap.', exKh: 'បងប្រុសរបស់គាត់រស់នៅសៀមរាប។' },
      { en: 'her', kh: 'របស់នាង', ipa: '/hɜːr/', exEn: 'Her smile is very warm.', exKh: 'ស្នាមញញឹមរបស់នាងកក់ក្តៅណាស់។' },
      { en: 'our', kh: 'របស់យើង', ipa: '/ˈaʊər/', exEn: 'Our classroom is clean and bright.', exKh: 'បន្ទប់រៀនរបស់យើងស្អាត និងភ្លឺច្បាស់ល្អ។' },
      { en: 'their', kh: 'របស់ពួកគេ', ipa: '/ðeər/', exEn: 'Their school is near the river.', exKh: 'សាលារៀនរបស់ពួកគេនៅជិតមាត់ទន្លេ។' }
    ],
    sentences: [
      { en: 'This is my favorite English lesson.', kh: 'នេះគឺជាមេរៀនភាសាអង់គ្លេសដែលខ្ញុំចូលចិត្តបំផុត។' },
      { en: 'Her notebook is full of new vocabulary.', kh: 'សៀវភៅកត់ត្រារបស់នាងពោរពេញដោយវាក្យសព្ទថ្មីៗ។' },
      { en: 'Our teacher explains every grammar rule clearly.', kh: 'អ្នកគ្រូរបស់យើងពន្យល់ក្បួនវេយ្យាករណ៍នីមួយៗយ៉ាងច្បាស់លាស់។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Is this your red pen on the desk, Socheat?', kh: 'សុជាតិ តើនេះជាប៊ិចក្រហមរបស់កូននៅលើតុរៀនមែនទេ?' },
      { speaker: 'Student', en: 'No, it is not my pen. It is her pen, Teacher.', kh: 'ទេអ្នកគ្រូ វាមិនមែនជាប៊ិចរបស់ខ្ញុំទេ។ វាជាប៊ិចរបស់នាង។' },
      { speaker: 'Teacher Piseth', en: 'Thank you for your honesty! Bopha, here is your pen.', kh: 'អរគុណសម្រាប់ភាពស្មោះត្រង់របស់កូន! បុប្ផា នេះជាប៊ិចរបស់កូន។' }
    ]
  },
  {
    day: 5, monthNum: 1, weekNum: 1,
    titleEn: 'Classroom & Daily Objects (Pen, Book, Bag, Chair, Desk)',
    titleKh: 'សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ',
    grammarKh: 'ការប្រើ A និង AN ជាមួយនាមឯកវចនៈរាប់បាន៖\n• A + ពាក្យផ្ដើមដោយសូរព្យញ្ជនៈ: a pen, a book, a bag, a desk, a chair\n• AN + ពាក្យផ្ដើមដោយសូរស្រៈ (a, e, i, o, u): an eraser, an apple, an umbrella',
    vocab: [
      { en: 'pen', kh: 'ប៊ិច', ipa: '/pen/', exEn: 'I write notes with a blue pen.', exKh: 'ខ្ញុំកត់ត្រាដោយប៊ិចពណ៌ខៀវមួយដើម។' },
      { en: 'book', kh: 'សៀវភៅ', ipa: '/bʊk/', exEn: 'Please read your English book.', exKh: 'សូមអានសៀវភៅភាសាអង់គ្លេសរបស់អ្នក។' },
      { en: 'bag', kh: 'កាតាប / កាបូប', ipa: '/bæɡ/', exEn: 'My bag has books and pens.', exKh: 'កាតាបរបស់ខ្ញុំមានសៀវភៅ និងប៊ិច។' },
      { en: 'chair', kh: 'កៅអី', ipa: '/tʃeər/', exEn: 'Sit down on the chair.', exKh: 'សូមអង្គុយចុះលើកៅអី។' },
      { en: 'eraser', kh: 'ជ័រលុប', ipa: '/ɪˈreɪsər/', exEn: 'May I borrow an eraser?', exKh: 'តើខ្ញុំអាចខ្ចីជ័រលុបមួយបានទេ?' }
    ],
    sentences: [
      { en: 'There is a book on the desk.', kh: 'មានសៀវភៅមួយក្បាលនៅលើតុ។' },
      { en: 'She puts an eraser inside her bag.', kh: 'នាងដាក់ជ័រលុបមួយចូលក្នុងកាតាបរបស់នាង។' },
      { en: 'Every student has a notebook and a pen.', kh: 'សិស្សគ្រប់រូបមានសៀវភៅកត់ត្រាមួយក្បាល និងប៊ិចមួយដើម។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Do you have your English book and pen ready?', kh: 'តើកូនៗបានរៀបចំសៀវភៅអង់គ្លេស និងប៊ិចរួចរាល់ហើយឬនៅ?' },
      { speaker: 'Student', en: 'Yes, Teacher! My book is open and my pen is in my hand.', kh: 'ចាសអ្នកគ្រូ! សៀវភៅរបស់ខ្ញុំបើករួចរាល់ ហើយប៊ិចនៅក្នុងដៃខ្ញុំហើយ។' },
      { speaker: 'Teacher Piseth', en: 'Superb! Let us write today\'s five new words neatly.', kh: 'ល្អឥតខ្ចោះ! តោះយើងសរសេរពាក្យថ្មីទាំង ៥ ថ្ងៃនេះឱ្យស្អាតទាំងអស់គ្នា។' }
    ]
  },
  {
    day: 6, monthNum: 1, weekNum: 1,
    titleEn: 'Weekly Review & Dialogue: Introducing Myself & My Friend',
    titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន',
    grammarKh: 'រំលឹកសរុបសប្តាហ៍ទី ១៖\n១. Pronouns: I, You, He, She, We, They, It\n២. Verb To Be: I am, You are, He is, She is, We are, They are\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Classroom Objects & A/An\n៥. ឃ្លាគន្លឹះ៖ "Nice to meet you!", "This is my friend."',
    vocab: [
      { en: 'introduce', kh: 'ណែនាំ', ipa: '/ˌɪntrəˈdjuːs/', exEn: 'Let me introduce my friend.', exKh: 'អនុញ្ញាតឱ្យខ្ញុំណែនាំមិត្តភក្តិរបស់ខ្ញុំ។' },
      { en: 'friend', kh: 'មិត្តភក្តិ', ipa: '/frend/', exEn: 'He is my best friend.', exKh: 'គាត់ជាមិត្តល្អបំផុតរបស់ខ្ញុំ។' },
      { en: 'pleasure', kh: 'សេចក្តីរីករាយ', ipa: '/ˈpleʒər/', exEn: 'It is a pleasure to meet you.', exKh: 'វាជាសេចក្តីរីករាយណាស់ដែលបានស្គាល់អ្នក។' },
      { en: 'classmate', kh: 'មិត្តរួមថ្នាក់', ipa: '/ˈklɑːsmeɪt/', exEn: 'We are friendly classmates.', exKh: 'ពួកយើងជាមិត្តរួមថ្នាក់ដ៏រួសរាយ។' }
    ],
    sentences: [
      { en: 'Hello! My name is Sok and I am a student.', kh: 'សួស្តី! ខ្ញុំឈ្មោះសុខ ហើយខ្ញុំជាសិស្សម្នាក់។' },
      { en: 'This is my classmate, her name is Chenda.', kh: 'នេះជាមិត្តរួមថ្នាក់របស់ខ្ញុំ នាងឈ្មោះចិន្តា។' },
      { en: 'We are very proud to study English with Teacher Piseth.', kh: 'ពួកយើងមានមោទនភាពណាស់ដែលបានរៀនភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Who can practice introducing a classmate in English?', kh: 'តើកូនណាខ្លះអាចអនុវត្តការណែនាំមិត្តរួមថ្នាក់ជាភាសាអង់គ្លេសបាន?' },
      { speaker: 'Student', en: 'Teacher Piseth, this is my friend Vathanak. He is ten years old and he is very smart.', kh: 'អ្នកគ្រូពិសិដ្ឋ នេះជាមិត្តរបស់ខ្ញុំឈ្មោះវឌ្ឍនៈ។ គាត់អាយុ ១០ ឆ្នាំ ហើយគាត់ឆ្លាតណាស់។' },
      { speaker: 'Teacher Piseth', en: 'Outstanding job! Your pronunciation is very natural.', kh: 'ពូកែអស្ចារ្យណាស់! ការបញ្ចេញសំឡេងរបស់កូនធម្មជាតិល្អណាស់។' }
    ]
  },

  // Week 2 (Days 7-12)
  {
    day: 7, monthNum: 1, weekNum: 2,
    titleEn: 'Demonstratives (This, That, These, Those)',
    titleKh: 'សព្វនាមចង្អុល Demonstratives (This, That, These, Those)',
    grammarKh: 'សព្វនាមចង្អុលប្រើសម្រាប់បង្ហាញទីតាំងជិត ឬឆ្ងាយ៖\n• This = នេះ (ឯកវចនៈ នៅជិត)\n• That = នោះ (ឯកវចនៈ នៅឆ្ងាយ)\n• These = ទាំងនេះ (ពហុវចនៈ នៅជិត)\n• Those = ទាំងនោះ (ពហុវចនៈ នៅឆ្ងាយ)\nឧទាហរណ៍៖\n• This is an apple. / That is a bird.\n• These are my books. / Those are tall trees.',
    vocab: [
      { en: 'this', kh: 'នេះ (ជិត)', ipa: '/ðɪs/', exEn: 'This is my notebook.', exKh: 'នេះជាសៀវភៅកត់ត្រារបស់ខ្ញុំ។' },
      { en: 'that', kh: 'នោះ (ឆ្ងាយ)', ipa: '/ðæt/', exEn: 'That is our school building.', exKh: 'នោះជាអគារសាលារៀនរបស់យើង។' },
      { en: 'these', kh: 'ទាំងនេះ (ជិត)', ipa: '/ðiːz/', exEn: 'These are fresh fruits.', exKh: 'ទាំងនេះជាផ្លែឈើស្រស់ៗ។' },
      { en: 'those', kh: 'ទាំងនោះ (ឆ្ងាយ)', ipa: '/ðəʊz/', exEn: 'Those are beautiful birds in the sky.', exKh: 'ទាំងនោះជាសត្វបក្សីដ៏ស្រស់ស្អាតនៅលើមេឃ។' }
    ],
    sentences: [
      { en: 'This is my pen and that is your pencil.', kh: 'នេះជាប៊ិចរបស់ខ្ញុំ ហើយនោះជាខ្មៅដៃរបស់អ្នក។' },
      { en: 'These are our English textbooks.', kh: 'ទាំងនេះជាសៀវភៅពុម្ពភាសាអង់គ្លេសរបស់យើង។' },
      { en: 'What are those in the tree? Those are birds.', kh: 'តើអ្វីទាំងនោះនៅលើដើមឈើ? ទាំងនោះជាសត្វបក្សី។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Look here! What is this in my hand?', kh: 'មើលមកទីនេះ! តើនេះជាអ្វីនៅក្នុងដៃអ្នកគ្រូ?' },
      { speaker: 'Student', en: 'This is an eraser in your hand, Teacher!', kh: 'នេះគឺជាជ័រលុបមួយនៅក្នុងដៃអ្នកគ្រូ!' },
      { speaker: 'Teacher Piseth', en: 'Correct! And what are those over there on the shelf?', kh: 'ត្រឹមត្រូវ! ចុះអ្វីទាំងនោះនៅលើធ្នើរខាងនោះវិញ?' },
      { speaker: 'Student', en: 'Those are new English storybooks!', kh: 'ទាំងនោះគឺជាសៀវភៅរឿងភាសាអង់គ្លេសថ្មីៗ!' }
    ]
  },
  {
    day: 8, monthNum: 1, weekNum: 2,
    titleEn: 'Regular Plural Nouns (-s, -es, -ies)',
    titleKh: 'នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies)',
    grammarKh: 'ក្បួនបំប្លែងនាមឯកវចនៈទៅជានាមពហុវចនៈ៖\n១. នាមទូទៅ ថែម -s: book -> books, pen -> pens, bag -> bags\n២. បញ្ចប់ដោយ -s, -ss, -sh, -ch, -x, -o ថែម -es: box -> boxes, watch -> watches, bus -> buses, tomato -> tomatoes\n៣. បញ្ចប់ដោយ ព្យញ្ជនៈ + y ប្តូរ y ទៅជា -ies: baby -> babies, city -> cities, family -> families\n(ចំណាំ: បើស្រៈ + y ថែមតែ -s: boy -> boys, day -> days)',
    vocab: [
      { en: 'box', kh: 'ប្រអប់ (boxes = ប្រអប់ច្រើន)', ipa: '/bɒks/', exEn: 'She has three gift boxes.', exKh: 'នាងមានប្រអប់កាដូចំនួន ៣។' },
      { en: 'watch', kh: 'នាឡិកាដៃ (watches)', ipa: '/wɒtʃ/', exEn: 'My father collects watches.', exKh: 'ឪពុកខ្ញុំប្រមូលនាឡិកាដៃ។' },
      { en: 'city', kh: 'ទីក្រុង (cities)', ipa: '/ˈsɪti/', exEn: 'Cambodia has many green cities.', exKh: 'ប្រទេសកម្ពុជាមានទីក្រុងបៃតងជាច្រើន។' },
      { en: 'baby', kh: 'ទារក (babies)', ipa: '/ˈbeɪbi/', exEn: 'The babies are sleeping soundly.', exKh: 'ទារកទាំងឡាយកំពុងគេងលក់ស្កប់ស្កល់។' }
    ],
    sentences: [
      { en: 'I have two pens and five notebooks.', kh: 'ខ្ញុំមានប៊ិច ២ ដើម និងសៀវភៅកត់ត្រា ៥ ក្បាល។' },
      { en: 'There are many big cities in the world.', kh: 'មានទីក្រុងធំៗជាច្រើននៅលើពិភពលោក។' },
      { en: 'The students put their boxes on the tables.', kh: 'សិស្សានុសិស្សបានដាក់ប្រអប់របស់ពួកគេនៅលើតុ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'How many watches do you see in the picture?', kh: 'តើកូនឃើញនាឡិកាដៃប៉ុន្មាននៅក្នុងរូបភាព?' },
      { speaker: 'Student', en: 'I see four watches and two boxes, Teacher.', kh: 'ខ្ញុំឃើញនាឡិកាដៃ ៤ គ្រឿង និងប្រអប់ ២ អ្នកគ្រូ។' },
      { speaker: 'Teacher Piseth', en: 'Well done! Remember to pronounce the /ɪz/ sound clearly: watches, boxes.', kh: 'ពូកែណាស់! ចងចាំបញ្ចេញសូរ /ɪz/ ឱ្យច្បាស់ណា: watches, boxes។' }
    ]
  },
  {
    day: 9, monthNum: 1, weekNum: 2,
    titleEn: 'Numbers 1-100 & Counting Everyday Items',
    titleKh: 'លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ',
    grammarKh: 'លេខរាប់ភាសាអង់គ្លេសពី ១ ដល់ ១០០៖\n• 1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten\n• 11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty\n• 30, 40, 50, 60, 70, 80, 90, 100: Thirty, Forty, Fifty, Sixty, Seventy, Eighty, Ninety, One hundred\n• សំណួររាប់ចំនួន៖ "How many + plural noun + are there?"',
    vocab: [
      { en: 'twenty', kh: 'ម្ភៃ (20)', ipa: '/ˈtwenti/', exEn: 'There are twenty students.', exKh: 'មានសិស្សចំនួនម្ភៃនាក់។' },
      { en: 'fifty', kh: 'ហាសិប (50)', ipa: '/ˈfɪfti/', exEn: 'This book has fifty pages.', exKh: 'សៀវភៅនេះមានហាសិបទំព័រ។' },
      { en: 'hundred', kh: 'មួយរយ (100)', ipa: '/ˈhʌndrəd/', exEn: 'One hundred percent score!', exKh: 'ពិន្ទុមួយរយភាគរយពេញ!' },
      { en: 'count', kh: 'រាប់', ipa: '/kaʊnt/', exEn: 'Can you count to twenty?', exKh: 'តើអ្នកអាចរាប់ដល់ម្ភៃបានទេ?' }
    ],
    sentences: [
      { en: 'There are thirty students in our class.', kh: 'មានសិស្សចំនួនសាមសិបនាក់ក្នុងថ្នាក់របស់យើង។' },
      { en: 'I have twelve colored pencils in my pencil case.', kh: 'ខ្ញុំមានខ្មៅដៃពណ៌ចំនួនដប់ពីរដើមក្នុងប្រអប់ខ្មៅដៃរបស់ខ្ញុំ។' },
      { en: 'How many books are there? There are fifteen books.', kh: 'តើមានសៀវភៅប៉ុន្មានក្បាលនៅទីនោះ? មានសៀវភៅដប់ប្រាំក្បាល។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Can you count the chairs in our classroom?', kh: 'តើកូនអាចរាប់កៅអីក្នុងបន្ទប់រៀនរបស់យើងបានទេ?' },
      { speaker: 'Student', en: 'Yes, Teacher! One, two, three... twenty-four chairs in total!', kh: 'ចាសអ្នកគ្រូ! មួយ ពីរ បី... សរុបទាំងអស់មានម្ភៃបួនកៅអី!' },
      { speaker: 'Teacher Piseth', en: 'Excellent counting! That is very accurate.', kh: 'ការរាប់ពូកែណាស់! ត្រឹមត្រូវល្អឥតខ្ចោះ។' }
    ]
  },
  {
    day: 10, monthNum: 1, weekNum: 2,
    titleEn: 'Colors and Adjectives for Objects (Big, Small, New, Old)',
    titleKh: 'ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful)',
    grammarKh: 'ទីតាំងនៃគុណនាម (Adjectives) ក្នុងភាសាអង់គ្លេស៖\n១. នៅពីមុខនាម៖ [Adjective + Noun]\n• a red car (ឡានពណ៌ក្រហម)\n• a big house (ផ្ទះធំមួយ)\n• a new computer (កុំព្យូទ័រថ្មីមួយ)\n២. នៅក្រោយកិរិយាសព្ទ To Be: [Subject + To Be + Adjective]\n• The car is red. (ឡាននោះមានពណ៌ក្រហម)\n• My school bag is new and blue.',
    vocab: [
      { en: 'big', kh: 'ធំ', ipa: '/bɪɡ/', exEn: 'An elephant is big.', exKh: 'សត្វដំរីមានមាឌធំ។' },
      { en: 'small', kh: 'តូច', ipa: '/smɔːl/', exEn: 'An ant is very small.', exKh: 'សត្វស្រមោចមានមាឌតូចខ្លាំងណាស់។' },
      { en: 'new', kh: 'ថ្មី', ipa: '/njuː/', exEn: 'I wear new shoes today.', exKh: 'ខ្ញុំពាក់ស្បែកជើងថ្មីថ្ងៃនេះ។' },
      { en: 'old', kh: 'ចាស់ / បុរាណ', ipa: '/əʊld/', exEn: 'This temple is very old.', exKh: 'ប្រាសាទនេះមានអាយុកាលចាស់ណាស់។' },
      { en: 'beautiful', kh: 'ស្រស់ស្អាត', ipa: '/ˈbjuːtɪfl/', exEn: 'The lotus flower is beautiful.', exKh: 'ផ្កាឈូកពិតជាស្រស់ស្អាតណាស់។' }
    ],
    sentences: [
      { en: 'I have a big red notebook.', kh: 'ខ្ញុំមានសៀវភៅកត់ត្រាធំពណ៌ក្រហមមួយក្បាល។' },
      { en: 'She wears a beautiful blue dress.', kh: 'នាងពាក់រ៉ូបពណ៌ខៀវដ៏ស្រស់ស្អាតមួយ។' },
      { en: 'This old bicycle belongs to my grandfather.', kh: 'កង់ចាស់នេះជារបស់លោកតារបស់ខ្ញុំ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Describe your favorite bag to the class.', kh: 'ចូរពណ៌នាកាតាបដែលកូនចូលចិត្តប្រាប់មិត្តរួមថ្នាក់។' },
      { speaker: 'Student', en: 'My bag is small, yellow, and very light. I love it!', kh: 'កាតាបរបស់ខ្ញុំតូច ពណ៌លឿង និងស្រាលណាស់។ ខ្ញុំស្រឡាញ់វា!' },
      { speaker: 'Teacher Piseth', en: 'What a lovely description! You used adjectives very well.', kh: 'ការពណ៌នាពិតជាគួរឱ្យស្រឡាញ់! កូនប្រើគុណនាមបានល្អណាស់។' }
    ]
  },
  {
    day: 11, monthNum: 1, weekNum: 2,
    titleEn: 'Basic Prepositions of Place (In, On, Under, Next to, Behind)',
    titleKh: 'ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind)',
    grammarKh: 'ធ្នាក់បញ្ជាក់ទីកន្លែង (Prepositions of Place) ប្រើដើម្បីប្រាប់ពីទីតាំងរបស់មនុស្ស សត្វ ឬវត្ថុ៖\n• in = នៅក្នុង (in the box, in the room)\n• on = នៅលើ (on the table, on the wall)\n• under = នៅក្រោម (under the chair, under the bed)\n• next to = នៅក្បែរ/នៅជាប់ (next to the window)\n• behind = នៅខាងក្រោយ (behind the door)\n• in front of = នៅខាងមុខ (in front of the board)\nសំណួរសួរទីតាំង៖ "Where is + noun?"',
    vocab: [
      { en: 'in', kh: 'នៅក្នុង', ipa: '/ɪn/', exEn: 'The pencil is in the bag.', exKh: 'ខ្មៅដៃនៅក្នុងកាតាប។' },
      { en: 'on', kh: 'នៅលើ', ipa: '/ɒn/', exEn: 'The book is on the table.', exKh: 'សៀវភៅនៅលើតុ។' },
      { en: 'under', kh: 'នៅក្រោម', ipa: '/ˈʌndər/', exEn: 'The cat sleeps under the bed.', exKh: 'ឆ្មាគេងនៅក្រោមក្តារគ្រែ។' },
      { en: 'next to', kh: 'នៅក្បែរ / នៅជាប់', ipa: '/ˈnekst tuː/', exEn: 'Sit next to your friend.', exKh: 'អង្គុយនៅក្បែរមិត្តរបស់អ្នក។' },
      { en: 'behind', kh: 'នៅខាងក្រោយ', ipa: '/bɪˈhaɪnd/', exEn: 'The sun hides behind clouds.', exKh: 'ព្រះអាទិត្យពួននៅក្រោយពពក។' }
    ],
    sentences: [
      { en: 'My English book is on the desk.', kh: 'សៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំនៅលើតុរៀន។' },
      { en: 'The ruler is inside the pencil case.', kh: 'បន្ទាត់គឺនៅក្នុងប្រអប់ខ្មៅដៃ។' },
      { en: 'Where is the cat? The cat is under the chair.', kh: 'តើឆ្មានៅឯណា? ឆ្មានៅក្រោមកៅអី។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Where is your ruler, Bopha?', kh: 'បុប្ផា តើបន្ទាត់របស់កូននៅឯណាដែរ?' },
      { speaker: 'Student', en: 'It is on my desk, next to my blue pen, Teacher.', kh: 'វាគឺនៅលើតុរៀនរបស់ខ្ញុំ នៅក្បែរប៊ិចខៀវអ្នកគ្រូ។' },
      { speaker: 'Teacher Piseth', en: 'Very neat! Keeping your desk organized helps you learn better.', kh: 'រៀបចំបានស្អាតណាស់! ការទុកដាក់តុឱ្យមានរបៀបជួយឱ្យរៀនពូកែ។' }
    ]
  },
  {
    day: 12, monthNum: 1, weekNum: 2,
    titleEn: 'Weekly Review & Conversation: Where is My Pen? (Finding Things)',
    titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ',
    grammarKh: 'រំលឹកសរុបសប្តាហ៍ទី ២៖\n១. Demonstratives: This, That, These, Those\n២. Plural Nouns: -s, -es, -ies\n៣. Numbers 1-100 & Counting: How many... are there?\n៤. Adjectives & Colors: a big blue bag\n៥. Prepositions: in, on, under, next to, behind\n៦. Pattern សួររកវត្ថុ៖ "Where is my...?" / "Where are my...?"',
    vocab: [
      { en: 'search', kh: 'ស្វែងរក', ipa: '/sɜːtʃ/', exEn: 'I search for my glasses.', exKh: 'ខ្ញុំស្វែងរកវ៉ែនតារបស់ខ្ញុំ។' },
      { en: 'find', kh: 'រកឃើញ', ipa: '/faɪnd/', exEn: 'I can find my shoes.', exKh: 'ខ្ញុំអាចរកឃើញស្បែកជើងរបស់ខ្ញុំ។' },
      { en: 'lose', kh: 'បាត់បង់', ipa: '/luːz/', exEn: 'Do not lose your keys.', exKh: 'កុំឱ្យបាត់កូនសោរបស់អ្នកឱ្យសោះ។' }
    ],
    sentences: [
      { en: 'Where is my red pen? It is under the notebook.', kh: 'តើប៊ិចក្រហមខ្ញុំនៅឯណា? វានៅក្រោមកូនសៀវភៅ។' },
      { en: 'Where are my glasses? They are on your head!', kh: 'តើវ៉ែនតាខ្ញុំនៅឯណា? វានៅលើក្បាលរបស់អ្នកតើ!' },
      { en: 'These five pencils are on the wooden desk.', kh: 'ខ្មៅដៃទាំងប្រាំដើមនេះគឺនៅលើតុឈើ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Dara, you look worried. What are you looking for?', kh: 'ដារ៉ា កូនមើលទៅដូចជាបារម្ភ។ តើកូនកំពុងរកអ្វីហ្នឹង?' },
      { speaker: 'Student', en: 'Teacher, where is my English workbook? I cannot find it.', kh: 'អ្នកគ្រូ តើសៀវភៅលំហាត់អង់គ្លេសខ្ញុំនៅឯណា? ខ្ញុំរកវាមិនឃើញសោះ។' },
      { speaker: 'Teacher Piseth', en: 'Look under your chair! Oh, here it is, behind your bag.', kh: 'មើលក្រោមអីកូន! អូ នៅទីនេះតើ នៅពីក្រោយកាតាបកូន។' },
      { speaker: 'Student', en: 'Oh, thank you so much, Teacher Piseth! I found it!', kh: 'អូ អរគុណច្រើនណាស់អ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរកឃើញហើយ!' }
    ]
  },

  // Week 3 (Days 13-18)
  {
    day: 13, monthNum: 1, weekNum: 3,
    titleEn: 'Family Members (Father, Mother, Brother, Sister, Parents)',
    titleKh: 'សមាជិកគ្រួសារ Family Members',
    grammarKh: 'វាក្យសព្ទគ្រួសារ និងការប្រើ Possessive \'s (បង្ហាញភាពជាម្ចាស់)៖\n• My father\'s car = ឡានរបស់ឪពុកខ្ញុំ\n• My sister\'s name = ឈ្មោះរបស់ប្អូនស្រីខ្ញុំ\nសមាជិកគ្រួសារសំខាន់ៗ៖\n• Parents = ឪពុកម្តាយ\n• Father / Dad = ឪពុក\n• Mother / Mom = ម្តាយ\n• Brother = បងប្រុស/ប្អូនប្រុស\n• Sister = បងស្រី/ប្អូនស្រី\n• Grandparents = ជីដូនជីតា (Grandfather, Grandmother)',
    vocab: [
      { en: 'father', kh: 'ឪពុក', ipa: '/ˈfɑːðər/', exEn: 'My father is a kind farmer.', exKh: 'ឪពុករបស់ខ្ញុំជាកសិករចិត្តល្អម្នាក់។' },
      { en: 'mother', kh: 'ម្តាយ', ipa: '/ˈmʌðər/', exEn: 'My mother cooks delicious food.', exKh: 'ម្តាយរបស់ខ្ញុំចម្អិនម្ហូបឆ្ងាញ់ណាស់។' },
      { en: 'brother', kh: 'បង/ប្អូនប្រុស', ipa: '/ˈbrʌðər/', exEn: 'My brother plays soccer.', exKh: 'បងប្រុសរបស់ខ្ញុំលេងបាល់ទាត់។' },
      { en: 'sister', kh: 'បង/ប្អូនស្រី', ipa: '/ˈsɪstər/', exEn: 'My sister likes reading books.', exKh: 'ប្អូនស្រីរបស់ខ្ញុំចូលចិត្តអានសៀវភៅ។' },
      { en: 'parents', kh: 'ឪពុកម្តាយ', ipa: '/ˈpeərənts/', exEn: 'I love my parents deeply.', exKh: 'ខ្ញុំស្រឡាញ់ឪពុកម្តាយខ្ញុំយ៉ាងជ្រាលជ្រៅ។' }
    ],
    sentences: [
      { en: 'There are five people in my family.', kh: 'មានសមាជិកប្រាំនាក់ក្នុងគ្រួសាររបស់ខ្ញុំ។' },
      { en: 'My mother is thirty-eight years old.', kh: 'ម្តាយរបស់ខ្ញុំមានអាយុសាមសិបប្រាំបីឆ្នាំ។' },
      { en: 'My brother and I help our parents every weekend.', kh: 'បងប្រុសខ្ញុំ និងខ្ញុំជួយឪពុកម្តាយរៀងរាល់ចុងសប្តាហ៍។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'How many people are there in your family, Sophea?', kh: 'សុភា តើមានសមាជិកប៉ុន្មាននាក់ក្នុងគ្រួសារកូន?' },
      { speaker: 'Student', en: 'There are four people: my father, my mother, my little brother, and me.', kh: 'មានបួននាក់អ្នកគ្រូ: ឪពុក ម្តាយ ប្អូនប្រុសតូច និងខ្ញុំ។' },
      { speaker: 'Teacher Piseth', en: 'What a sweet family! Do you love your brother?', kh: 'គ្រួសារគួរឱ្យស្រឡាញ់ណាស់! តើកូនស្រឡាញ់ប្អូនប្រុសទេ?' },
      { speaker: 'Student', en: 'Yes, I love him very much! We play together every day.', kh: 'ចាស ខ្ញុំស្រឡាញ់គាត់ខ្លាំងណាស់! ពួកយើងលេងជាមួយគ្នារាល់ថ្ងៃ។' }
    ]
  },
  {
    day: 14, monthNum: 1, weekNum: 3,
    titleEn: 'Verb To Have (Have / Has, Don\'t have / Doesn\'t have)',
    titleKh: 'កិរិយាសព្ទ To Have (មាន / មិនមាន)',
    grammarKh: 'កិរិយាសព្ទ "To Have" ប្រែថា "មាន"៖\n១. ទម្រង់ស្រប (Affirmative):\n• I / You / We / They + HAVE (I have a dog. They have a big garden.)\n• He / She / It + HAS (He has a bicycle. She has long hair.)\n២. ទម្រង់បដិសេធ (Negative):\n• I / You / We / They + DON\'T HAVE... (We don\'t have a car.)\n• He / She / It + DOESN\'T HAVE... (He doesn\'t have a watch.)\n៣. ទម្រង់សំណួរ (Question):\n• Do you have...? -> Yes, I do. / No, I don\'t.\n• Does he have...? -> Yes, he does. / No, he doesn\'t.',
    vocab: [
      { en: 'have', kh: 'មាន (ប្រើជាមួយ I/You/We/They)', ipa: '/hæv/', exEn: 'I have two brothers.', exKh: 'ខ្ញុំមានបងប្អូនប្រុសពីរនាក់។' },
      { en: 'has', kh: 'មាន (ប្រើជាមួយ He/She/It)', ipa: '/hæz/', exEn: 'She has a lovely kitten.', exKh: 'នាងមានកូនឆ្មាគួរឱ្យស្រឡាញ់មួយក្បាល។' },
      { en: 'don\'t have', kh: 'គ្មាន / មិនមាន', ipa: '/doʊnt hæv/', exEn: 'We don\'t have homework today.', exKh: 'ពួកយើងគ្មានកិច្ចការផ្ទះទេថ្ងៃនេះ។' },
      { en: 'doesn\'t have', kh: 'គ្មាន / មិនមាន (He/She/It)', ipa: '/ˈdʌznt hæv/', exEn: 'He doesn\'t have a motorbike.', exKh: 'គាត់គ្មានម៉ូតូជិះទេ។' }
    ],
    sentences: [
      { en: 'I have a new English dictionary.', kh: 'ខ្ញុំមានវចនានុក្រមភាសាអង់គ្លេសថ្មីមួយក្បាល។' },
      { en: 'She has two younger sisters and one older brother.', kh: 'នាងមានប្អូនស្រីពីរនាក់ និងបងប្រុសម្នាក់។' },
      { en: 'Do you have any pets at home? Yes, I have a cat.', kh: 'តើអ្នកមានសត្វចិញ្ចឹមនៅផ្ទះទេ? បាទ ខ្ញុំមានឆ្មាមួយក្បាល។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Do you have an English-Khmer dictionary, Rith?', kh: 'រិទ្ធ តើកូនមានវចនានុក្រមអង់គ្លេស-ខ្មែរទេ?' },
      { speaker: 'Student', en: 'Yes, I do! I have a big dictionary on my bookshelf.', kh: 'បាទអ្នកគ្រូ ខ្ញុំមាន! ខ្ញុំមានវចនានុក្រមធំមួយនៅលើធ្នើរសៀវភៅ។' },
      { speaker: 'Teacher Piseth', en: 'That is wonderful! A dictionary is a student\'s best friend.', kh: 'ពិតជាអស្ចារ្យណាស់! វចនានុក្រមគឺជាមិត្តល្អបំផុតរបស់សិស្ស។' }
    ]
  },
  {
    day: 15, monthNum: 1, weekNum: 3,
    titleEn: 'Describing Family & Pets (Dog, Cat, Bird, Fish)',
    titleKh: 'ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish)',
    grammarKh: 'ការរួមបញ្ចូល "Have/Has" និងគុណនាមដើម្បីពណ៌នាសត្វចិញ្ចឹម និងមនុស្ស៖\n• Subject + have/has + adjective + noun\nឧទាហរណ៍៖\n• I have a white cat. (ខ្ញុំមានឆ្មាពណ៌សមួយក្បាល)\n• My dog has long ears. (ឆ្កែខ្ញុំមានត្រចៀកវែង)\n• She has big black eyes. (នាងមានភ្នែកធំៗពណ៌ខ្មៅ)',
    vocab: [
      { en: 'pet', kh: 'សត្វចិញ្ចឹម', ipa: '/pet/', exEn: 'Do you keep any pet?', exKh: 'តើអ្នកមានចិញ្ចឹមសត្វទេ?' },
      { en: 'dog', kh: 'សត្វឆ្កែ', ipa: '/dɒɡ/', exEn: 'My dog barks at strangers.', exKh: 'ឆ្កែរបស់ខ្ញុំព្រុសដាក់មនុស្សប្លែកមុខ។' },
      { en: 'cat', kh: 'សត្វឆ្មា', ipa: '/kæt/', exEn: 'The cat catches mice.', exKh: 'ឆ្មាចាប់សត្វកណ្ដុរ។' },
      { en: 'bird', kh: 'សត្វបក្សី', ipa: '/bɜːd/', exEn: 'The yellow bird sings sweetly.', exKh: 'សត្វបក្សីពណ៌លឿងច្រៀងពិរោះណាស់។' },
      { en: 'fish', kh: 'សត្វត្រី', ipa: '/fɪʃ/', exEn: 'I have three gold fish in an aquarium.', exKh: 'ខ្ញុំមានត្រីមាសបីក្បាលក្នុងអាងកញ្ចក់។' }
    ],
    sentences: [
      { en: 'I have a playful puppy named Lucky.', kh: 'ខ្ញុំមានកូនឆ្កែដ៏គួរឱ្យស្រឡាញ់ និងរពិសមួយក្បាលឈ្មោះ ឡាក់គី។' },
      { en: 'My sister has two fluffy white cats.', kh: 'ប្អូនស្រីខ្ញុំមានឆ្មារោមទន់ពណ៌សចំនួនពីរក្បាល។' },
      { en: 'We feed our fish every morning before school.', kh: 'ពួកយើងឱ្យចំណីត្រីរាល់ព្រឹកមុនពេលទៅសាលារៀន។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Tell me about your pets, Dara!', kh: 'ដារ៉ា ប្រាប់អ្នកគ្រូអំពីសត្វចិញ្ចឹមរបស់កូនបន្តិចមើល!' },
      { speaker: 'Student', en: 'Teacher, I have a smart brown dog. His name is Rocky!', kh: 'អ្នកគ្រូ ខ្ញុំមានឆ្កែពណ៌ត្នោតដ៏ឆ្លាតមួយក្បាល។ វាឈ្មោះ រ៉ក់គី!' },
      { speaker: 'Teacher Piseth', en: 'Rocky is a strong name! What can Rocky do?', kh: 'រ៉ក់គី ជាឈ្មោះដ៏មាំទាំ! តើរ៉ក់គីអាចធ្វើអ្វីបានខ្លះ?' },
      { speaker: 'Student', en: 'He can fetch balls and run very fast!', kh: 'វាអាចរត់ទៅយកបាល់មកវិញ និងរត់លឿនណាស់!' }
    ]
  },
  {
    day: 16, monthNum: 1, weekNum: 3,
    titleEn: 'Feelings & Emotions (Happy, Sad, Tired, Hungry, Thirsty)',
    titleKh: 'អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions',
    grammarKh: 'ការបញ្ជាក់ពីអារម្មណ៍ដោយប្រើ Verb To Be ឬ Feel៖\n• I am + Adjective (I am happy, I am tired)\n• I feel + Adjective (I feel hungry, I feel thirsty)\n• He is excited / She is sad / We are proud\nសំណួរសួរអារម្មណ៍៖\n• "How do you feel today?" (តើអ្នកមានអារម្មណ៍យ៉ាងណាថ្ងៃនេះ?)\n• "How are you feeling?" -> "I am very happy!"',
    vocab: [
      { en: 'happy', kh: 'សប្បាយរីករាយ', ipa: '/ˈhæpi/', exEn: 'I am happy to pass the quiz.', exKh: 'ខ្ញុំសប្បាយចិត្តណាស់ដែលបានប្រឡងជាប់សំណួរតេស្ត។' },
      { en: 'sad', kh: 'កើតទុក្ខ / ស្រងូតស្រងាត់', ipa: '/sæd/', exEn: 'Do not be sad, keep smiling.', exKh: 'កុំកើតទុក្ខអី បន្តញញឹមឡើង។' },
      { en: 'tired', kh: 'អស់កម្លាំង / ហត់', ipa: '/ˈtaɪəd/', exEn: 'I feel tired after running.', exKh: 'ខ្ញុំមានអារម្មណ៍ហត់ក្រោយពេលរត់រួច។' },
      { en: 'hungry', kh: 'ឃ្លានបាយ', ipa: '/ˈhʌŋɡri/', exEn: 'I am hungry, let us eat lunch.', exKh: 'ខ្ញុំឃ្លានហើយ តោះយើងញ៉ាំបាយថ្ងៃត្រង់។' },
      { en: 'thirsty', kh: 'ស្រេកទឹក', ipa: '/ˈθɜːsti/', exEn: 'Drink fresh water when thirsty.', exKh: 'ពិសាទឹកស្អាតនៅពេលស្រេកទឹក។' },
      { en: 'excited', kh: 'រំភើប', ipa: '/ɪkˈsaɪtɪd/', exEn: 'Students are excited about holiday.', exKh: 'សិស្សានុសិស្សរំភើបចំពោះថ្ងៃឈប់សម្រាក។' }
    ],
    sentences: [
      { en: 'I am so excited to study English today.', kh: 'ខ្ញុំរំភើបខ្លាំងណាស់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះ។' },
      { en: 'Are you thirsty? Here is a cold glass of water.', kh: 'តើអ្នកស្រេកទឹកទេ? នេះជាទឹកត្រជាក់មួយកែវ។' },
      { en: 'He was tired, but now he is refreshed and ready.', kh: 'គាត់ធ្លាប់អស់កម្លាំង តែឥឡូវគាត់ស្រស់ស្រាយ និងរួចរាល់ហើយ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'How are you feeling this morning, Chenda?', kh: 'ចិន្តា តើកូនមានអារម្មណ៍យ៉ាងណាដែរព្រឹកនេះ?' },
      { speaker: 'Student', en: 'I am very happy and excited, but a little bit hungry, Teacher!', kh: 'ខ្ញុំសប្បាយចិត្ត និងរំភើបណាស់ តែឃ្លានបន្តិចអ្នកគ្រូ!' },
      { speaker: 'Teacher Piseth', en: 'Haha! Don\'t worry, after our lesson we will have a healthy snack break!', kh: 'ហាៗ! កុំបារម្ភអី ចប់មេរៀនយើងនឹងមានពេលសម្រាកញ៉ាំចំណីមានជីវជាតិ!' }
    ]
  },
  {
    day: 17, monthNum: 1, weekNum: 3,
    titleEn: 'How Are You Feeling Today? (Are you tired? Yes, I am / No, I\'m not)',
    titleKh: 'ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ',
    grammarKh: 'ទម្រង់សំណួរ Yes/No សួរពីអារម្មណ៍៖\n• Are you happy? -> Yes, I am. / No, I am not.\n• Are you hungry? -> Yes, I am hungry. / No, I am full.\n• Is he tired? -> Yes, he is. / No, he isn\'t.\n• Are they excited? -> Yes, they are!\nការសួរដោយពាក្យគួរសម៖ "Are you feeling okay today?"',
    vocab: [
      { en: 'feeling', kh: 'អារម្មណ៍', ipa: '/ˈfiːlɪŋ/', exEn: 'I have a wonderful feeling.', exKh: 'ខ្ញុំមានអារម្មណ៍ដ៏អស្ចារ្យ។' },
      { en: 'fine', kh: 'សុខសប្បាយ / ល្អ', ipa: '/faɪn/', exEn: 'I am fine, thank you.', exKh: 'ខ្ញុំសុខសប្បាយទេ អរគុណ។' },
      { en: 'okay', kh: 'មិនអីទេ / ធម្មតា', ipa: '/əʊˈkeɪ/', exEn: 'Everything is okay.', exKh: 'អ្វីៗគឺមិនអីទាំងអស់។' },
      { en: 'better', kh: 'ធូរស្បើយជាងមុន / ល្អជាងមុន', ipa: '/ˈbetər/', exEn: 'I feel much better now.', exKh: 'ឥឡូវនេះខ្ញុំមានអារម្មណ៍ធូរស្រាលជាងមុនច្រើន។' }
    ],
    sentences: [
      { en: 'How are you feeling today? I am feeling great!', kh: 'តើថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងណាដែរ? ខ្ញុំមានអារម្មណ៍អស្ចារ្យណាស់!' },
      { en: 'Are you tired after school? No, I am not tired at all.', kh: 'តើអ្នកអស់កម្លាំងទេក្រោយចេញពីរៀន? អត់ទេ ខ្ញុំមិនអស់កម្លាំងទាល់តែសោះ។' },
      { en: 'Is your mother feeling better today? Yes, she is healthy now.', kh: 'តើម្តាយរបស់អ្នកបានធូរស្បើយទេថ្ងៃនេះ? ចាស ឥឡូវគាត់មានសុខភាពល្អហើយ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Are you feeling sleepy, Vathanak?', kh: 'វឌ្ឍនៈ តើកូនមានអារម្មណ៍ងងុយគេងទេ?' },
      { speaker: 'Student', en: 'No, Teacher Piseth! I am wide awake and ready to listen.', kh: 'អត់ទេអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំភ្ញាក់ស្វាង និងរួចរាល់ក្នុងការស្តាប់ហើយ។' },
      { speaker: 'Teacher Piseth', en: 'Wonderful spirit! That is the heart of a great learner.', kh: 'ទឹកចិត្តដ៏អស្ចារ្យ! នេះជាបេះដូងរបស់អ្នករៀនសូត្រដ៏ពូកែ។' }
    ]
  },
  {
    day: 18, monthNum: 1, weekNum: 3,
    titleEn: 'Weekly Review & Dialogue: Talking about Family & Feelings',
    titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍',
    grammarKh: 'រំលឹកសរុបសប្តាហ៍ទី ៣៖\n១. Family Words: father, mother, brother, sister, parents, grandparents\n២. Have/Has: I have, He has, Do you have...?\n៣. Pets: dog, cat, bird, fish, rabbit\n៤. Feelings: happy, sad, tired, hungry, thirsty, excited, proud\n៥. សំណួរសន្ទនាជាក់ស្តែង៖ "Do you have a big family?", "How are you feeling?"',
    vocab: [
      { en: 'caring', kh: 'យកចិត្តទុកដាក់', ipa: '/ˈkeərɪŋ/', exEn: 'She is a caring mother.', exKh: 'នាងជាម្តាយដែលចេះយកចិត្តទុកដាក់។' },
      { en: 'together', kh: 'ជាមួយគ្នា', ipa: '/təˈɡeðər/', exEn: 'Our family eats dinner together.', exKh: 'គ្រួសាររបស់យើងញ៉ាំអាហារពេលល្ងាចជាមួយគ្នា។' },
      { en: 'proud', kh: 'មានមោទនភាព', ipa: '/praʊd/', exEn: 'My parents are proud of my studies.', exKh: 'ឪពុកម្តាយខ្ញុំមានមោទនភាពចំពោះការរៀនសូត្ររបស់ខ្ញុំ។' }
    ],
    sentences: [
      { en: 'I have a happy and warm family.', kh: 'ខ្ញុំមានគ្រួសារដ៏រីករាយ និងកក់ក្តៅមួយ។' },
      { en: 'My father has a friendly white dog.', kh: 'ឪពុករបស់ខ្ញុំមានឆ្កែពណ៌សដ៏រួសរាយមួយក្បាល។' },
      { en: 'We always feel happy when we spend time together.', kh: 'ពួកយើងតែងតែមានអារម្មណ៍រីករាយនៅពេលយើងចំណាយពេលជាមួយគ្នា។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Who can share a short story about their family and pets?', kh: 'តើកូនណាខ្លះអាចចែករំលែករឿងខ្លីមួយអំពីគ្រួសារ និងសត្វចិញ្ចឹមរបស់ខ្លួន?' },
      { speaker: 'Student', en: 'Teacher, my family lives in Siem Reap. We have a mother cat and three small kittens. We feel so joyful every day!', kh: 'អ្នកគ្រូ គ្រួសារខ្ញុំរស់នៅសៀមរាប។ ពួកយើងមានមេឆ្មាមួយ និងកូនឆ្មាតូចៗបីក្បាល។ ពួកយើងមានអារម្មណ៍សប្បាយចិត្តខ្លាំងណាស់រាល់ថ្ងៃ!' },
      { speaker: 'Teacher Piseth', en: 'That warms my heart so much! Beautiful English sentences, my dear student.', kh: 'ធ្វើឱ្យអ្នកគ្រូកក់ក្តៅក្នុងចិត្តណាស់! ប្រយោគភាសាអង់គ្លេសស្អាតណាស់កូនសិស្សជាទីស្រឡាញ់។' }
    ]
  },

  // Week 4 (Days 19-24)
  {
    day: 19, monthNum: 1, weekNum: 4,
    titleEn: 'Present Simple - Daily Habits (Wake up, Brush teeth, Wash face)',
    titleKh: 'បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ',
    grammarKh: 'បច្ចុប្បន្នកាលធម្មតា (Present Simple) ប្រើសម្រាប់ទម្លាប់ ឬការពិតប្រចាំថ្ងៃ៖\nរូបមន្ត៖\n• I / You / We / They + V1 (infinitive): I wake up at 6:00 AM.\n• He / She / It + V1 + s/es: He brushes his teeth. She washes her face.\n(កិរិយាសព្ទបញ្ចប់ដោយ ch, sh, ss, x, o ត្រូវថែម -es: brush -> brushes, wash -> washes, go -> goes)',
    vocab: [
      { en: 'wake up', kh: 'ភ្ញាក់ពីគេង', ipa: '/weɪk ʌp/', exEn: 'I wake up at six o\'clock.', exKh: 'ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦:០០។' },
      { en: 'brush teeth', kh: 'ដុសធ្មេញ', ipa: '/brʌʃ tiːθ/', exEn: 'I brush my teeth twice a day.', exKh: 'ខ្ញុំដុសធ្មេញពីរដងក្នុងមួយថ្ងៃ។' },
      { en: 'wash face', kh: 'លុបមុខ', ipa: '/wɒʃ feɪs/', exEn: 'She washes her face with clean water.', exKh: 'នាងលុបមុខនឹងទឹកស្អាត។' },
      { en: 'get dressed', kh: 'ស្លៀកពាក់', ipa: '/ɡet drest/', exEn: 'He gets dressed for school.', exKh: 'គាត់ស្លៀកពាក់ដើម្បីទៅសាលារៀន។' },
      { en: 'eat breakfast', kh: 'ញ៉ាំអាហារពេលព្រឹក', ipa: '/iːt ˈbrekfəst/', exEn: 'We eat breakfast together.', exKh: 'ពួកយើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។' }
    ],
    sentences: [
      { en: 'I wake up early every morning.', kh: 'ខ្ញុំភ្ញាក់ពីគេងពីព្រលឹមរៀងរាល់ព្រឹក។' },
      { en: 'She brushes her teeth before going to bed.', kh: 'នាងដុសធ្មេញរបស់នាងមុនពេលចូលគេង។' },
      { en: 'My brother eats rice and soup for breakfast.', kh: 'បងប្រុសរបស់ខ្ញុំញ៉ាំបាយ និងសម្លសម្រាប់អាហារពេលព្រឹក។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'What do you do first when you wake up in the morning?', kh: 'តើកូនធ្វើអ្វីមុនគេនៅពេលភ្ញាក់ពីគេងនៅពេលព្រឹក?' },
      { speaker: 'Student', en: 'I wash my face and brush my teeth, Teacher!', kh: 'ខ្ញុំលុបមុខ និងដុសធ្មេញអ្នកគ្រូ!' },
      { speaker: 'Teacher Piseth', en: 'Good habits keep you fresh, healthy and smart!', kh: 'ទម្លាប់ល្អជួយឱ្យកូនស្រស់ស្រាយ មានសុខភាពល្អ និងឆ្លាតវៃ!' }
    ]
  },
  {
    day: 20, monthNum: 1, weekNum: 4,
    titleEn: 'Telling Time (What time is it? It\'s 7 o\'clock / half past)',
    titleKh: 'ការប្រាប់ពេលវេលា Telling Time (What time is it?)',
    grammarKh: 'ការសួរ និងប្រាប់ម៉ោងជាភាសាអង់គ្លេស៖\nសំណួរ៖ "What time is it?" ឬ "What\'s the time?"\nចម្លើយ៖ "It is + ម៉ោង"\n• ម៉ោងគត់ (Exact hour): It is seven o\'clock. (7:00)\n• កន្លះម៉ោង (30 minutes): It is seven thirty. ឬ It is half past seven. (7:30)\n• ម៉ោង និងនាទី៖ It is eight fifteen. (8:15) / It is eight forty-five. (8:45)\n• ពេលព្រឹក: AM (ante meridiem) / ពេលរសៀល-យប់: PM (post meridiem)',
    vocab: [
      { en: 'o\'clock', kh: 'ម៉ោង (គត់)', ipa: '/əˈklɒk/', exEn: 'It is eight o\'clock.', exKh: 'វាគឺម៉ោងប្រាំបីគត់។' },
      { en: 'half past', kh: 'កន្លះ (កន្លង ៣០ នាទី)', ipa: '/hɑːf pɑːst/', exEn: 'It is half past six.', exKh: 'វាគឺម៉ោង ៦:៣០ (ប្រាំមួយកន្លះ)។' },
      { en: 'quarter past', kh: 'កន្លង ១៥ នាទី', ipa: '/ˈkwɔːtər pɑːst/', exEn: 'It is a quarter past seven.', exKh: 'វាគឺម៉ោង ៧:១៥។' },
      { en: 'noon', kh: 'ថ្ងៃត្រង់ (12:00 PM)', ipa: '/nuːn/', exEn: 'We eat lunch at noon.', exKh: 'ពួកយើងញ៉ាំបាយថ្ងៃត្រង់នៅពេលថ្ងៃត្រង់។' },
      { en: 'midnight', kh: 'កណ្តាលអធ្រាត្រ (12:00 AM)', ipa: '/ˈmɪdnaɪt/', exEn: 'Sleep before midnight.', exKh: 'គេងមុនកណ្តាលអធ្រាត្រ។' }
    ],
    sentences: [
      { en: 'What time is it now? It is exactly seven o\'clock.', kh: 'តើឥឡូវនេះម៉ោងប៉ុន្មានហើយ? គឺម៉ោង ៧:០០ គត់។' },
      { en: 'Our English live class starts at seven thirty in the evening.', kh: 'ថ្នាក់ផ្សាយផ្ទាល់ភាសាអង់គ្លេសយើងចាប់ផ្តើមនៅម៉ោង ៧:៣០ នាទីល្ងាច។' },
      { en: 'I go to bed at nine o\'clock every night.', kh: 'ខ្ញុំចូលគេងនៅម៉ោង ៩:០០ យប់ជារៀងរាល់យប់។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Excuse me, Dara. Do you know what time it is?', kh: 'សុំទោសដារ៉ា។ តើកូនដឹងថាម៉ោងប៉ុន្មានហើយទេ?' },
      { speaker: 'Student', en: 'Yes, Teacher! Looking at the wall clock, it is ten past eight.', kh: 'ចាសអ្នកគ្រូ! មើលលើនាឡិកាជញ្ជាំង គឺម៉ោង ៨:១០ នាទី។' },
      { speaker: 'Teacher Piseth', en: 'Spot on! You can tell the time accurately.', kh: 'ត្រឹមត្រូវបេះបិទ! កូនអាចប្រាប់ម៉ោងបានយ៉ាងច្បាស់លាស់។' }
    ]
  },
  {
    day: 21, monthNum: 1, weekNum: 4,
    titleEn: 'Daily Schedule (Morning, Afternoon, Evening, Night)',
    titleKh: 'កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់)',
    grammarKh: 'ការប្រើធ្នាក់ពេលវេលា (Prepositions of Time): IN និង AT៖\n• in the morning = នៅពេលព្រឹក\n• in the afternoon = នៅពេលរសៀល\n• in the evening = នៅពេលល្ងាច\n• at noon = នៅពេលថ្ងៃត្រង់\n• at night = នៅពេលយប់\n• at + ម៉ោង (at 7:00 AM, at 8:30 PM)',
    vocab: [
      { en: 'morning', kh: 'ពេលព្រឹក', ipa: '/ˈmɔːnɪŋ/', exEn: 'Good morning, Teacher Piseth!', exKh: 'អរុណសួស្តី អ្នកគ្រូពិសិដ្ឋ!' },
      { en: 'afternoon', kh: 'ពេលរសៀល', ipa: '/ˌɑːftəˈnuːn/', exEn: 'We play sports in the afternoon.', exKh: 'ពួកយើងលេងកីឡានៅពេលរសៀល។' },
      { en: 'evening', kh: 'ពេលល្ងាច', ipa: '/ˈiːvnɪŋ/', exEn: 'I review my lessons in the evening.', exKh: 'ខ្ញុំរំលឹកមេរៀនរបស់ខ្ញុំនៅពេលល្ងាច។' },
      { en: 'night', kh: 'ពេលយប់', ipa: '/naɪt/', exEn: 'Good night and sweet dreams!', exKh: 'រាត្រីសួស្តី និងសុបិនល្អ!' },
      { en: 'schedule', kh: 'កាលវិភាគ', ipa: '/ˈʃedjuːl/', exEn: 'My daily schedule is organized.', exKh: 'កាលវិភាគប្រចាំថ្ងៃខ្ញុំមានរបៀបរៀបរយ។' }
    ],
    sentences: [
      { en: 'In the morning, I study English at school.', kh: 'នៅពេលព្រឹក ខ្ញុំរៀនភាសាអង់គ្លេសនៅសាលា។' },
      { en: 'In the afternoon, I help my mother clean the house.', kh: 'នៅពេលរសៀល ខ្ញុំជួយម្តាយខ្ញុំបោសសម្អាតផ្ទះ។' },
      { en: 'At night, I sleep early to wake up strong tomorrow.', kh: 'នៅពេលយប់ ខ្ញុំគេងលឿនដើម្បីភ្ញាក់ឡើងមានកម្លាំងមាំមួននៅថ្ងៃស្អែក។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'What do you usually do in the evening, Bopha?', kh: 'បុប្ផា តើកូនតែងតែធ្វើអ្វីនៅពេលល្ងាច?' },
      { speaker: 'Student', en: 'In the evening, I eat dinner with my parents, and then I study with Teacher Piseth AI on Telegram!', kh: 'នៅពេលល្ងាច ខ្ញុំញ៉ាំបាយជាមួយប៉ាម៉ាក់ រួចហើយខ្ញុំរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ AI លើតេលេក្រាម!' },
      { speaker: 'Teacher Piseth', en: 'I am so happy to be your teacher every evening!', kh: 'អ្នកគ្រូសប្បាយចិត្តណាស់ដែលបានធ្វើជាគ្រូបង្រៀនរបស់កូនរាល់ល្ងាច!' }
    ]
  },
  {
    day: 22, monthNum: 1, weekNum: 4,
    titleEn: 'Days of the Week & Routine (On Monday, On weekends...)',
    titleKh: 'ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week)',
    grammarKh: 'ថ្ងៃទាំង ៧ នៃសប្តាហ៍ និងការប្រើធ្នាក់ "ON"៖\n• On + ថ្ងៃនៃសប្តាហ៍ (On Monday, On Tuesday, On Wednesday, On Thursday, On Friday, On Saturday, On Sunday)\n• On weekdays = ពីថ្ងៃចន្ទ ដល់សុក្រ\n• On weekends = នៅថ្ងៃចុងសប្តាហ៍ (សៅរ៍ និងអាទិត្យ)\nចំណាំ: ឈ្មោះថ្ងៃត្រូវសរសេរអក្សរធំនៅដើមពាក្យជានិច្ច (Capital Letter)!',
    vocab: [
      { en: 'Monday', kh: 'ថ្ងៃចន្ទ', ipa: '/ˈmʌndeɪ/', exEn: 'School starts on Monday.', exKh: 'សាលារៀនចាប់ផ្តើមនៅថ្ងៃចន្ទ។' },
      { en: 'Wednesday', kh: 'ថ្ងៃពុធ', ipa: '/ˈwenzdeɪ/', exEn: 'We have English test on Wednesday.', exKh: 'យើងមានប្រឡងតេស្តអង់គ្លេសនៅថ្ងៃពុធ។' },
      { en: 'Friday', kh: 'ថ្ងៃសុក្រ', ipa: '/ˈfraɪdeɪ/', exEn: 'Friday is the end of the school week.', exKh: 'ថ្ងៃសុក្រគឺជាថ្ងៃចុងក្រោយនៃសប្តាហ៍សិក្សា។' },
      { en: 'Saturday', kh: 'ថ្ងៃសៅរ៍', ipa: '/ˈsætədeɪ/', exEn: 'On Saturday, I ride my bicycle.', exKh: 'នៅថ្ងៃសៅរ៍ ខ្ញុំជិះកង់កម្សាន្ត។' },
      { en: 'Sunday', kh: 'ថ្ងៃអាទិត្យ', ipa: '/ˈsʌndeɪ/', exEn: 'Sunday is a family day.', exKh: 'ថ្ងៃអាទិត្យជាថ្ងៃជួបជុំគ្រួសារ។' },
      { en: 'weekend', kh: 'ចុងសប្តាហ៍', ipa: '/ˌwiːkˈend/', exEn: 'Have a wonderful weekend!', exKh: 'សូមឱ្យមានចុងសប្តាហ៍ដ៏អស្ចារ្យ!' }
    ],
    sentences: [
      { en: 'On Monday, we learn new grammar rules.', kh: 'នៅថ្ងៃចន្ទ ពួកយើងរៀនក្បួនវេយ្យាករណ៍ថ្មីៗ។' },
      { en: 'On weekends, my family visits my grandparents in the countryside.', kh: 'នៅចុងសប្តាហ៍ គ្រួសារខ្ញុំទៅលេងជីដូនជីតានៅឯស្រុកស្រែ។' },
      { en: 'I practice speaking English every day, from Monday to Sunday.', kh: 'ខ្ញុំហាត់និយាយភាសាអង់គ្លេសរាល់ថ្ងៃ ចាប់ពីថ្ងៃចន្ទ ដល់ថ្ងៃអាទិត្យ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'What is your favorite day of the week, Sok?', kh: 'សុខ តើកូនចូលចិត្តថ្ងៃណាជាងគេក្នុងសប្តាហ៍?' },
      { speaker: 'Student', en: 'I love Sunday because I can play football with my friends and study English without rushing!', kh: 'ខ្ញុំចូលចិត្តថ្ងៃអាទិត្យ ព្រោះខ្ញុំអាចលេងបាល់ជាមួយមិត្តភក្តិ ហើយរៀនអង់គ្លេសដោយមិនបាច់ប្រញាប់ប្រញាល់!' },
      { speaker: 'Teacher Piseth', en: 'Sunday is indeed a relaxing and fruitful day!', kh: 'ថ្ងៃអាទិត្យពិតជាថ្ងៃសម្រាក និងពោរពេញដោយផលល្អ!' }
    ]
  },
  {
    day: 23, monthNum: 1, weekNum: 4,
    titleEn: 'Month 1 Grand Review: Grammar, Vocabulary & Practice',
    titleKh: 'រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត',
    grammarKh: 'សង្ខេបចំណុចសំខាន់ៗទាំង ២២ ថ្ងៃនៃខែទី ១៖\n១. Subject Pronouns: I, You, We, They, He, She, It\n២. Verb To Be: Am, Is, Are (Affirmative, Negative, Question)\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Demonstratives: This, That, These, Those\n៥. Plural Nouns: -s, -es, -ies\n៦. Numbers 1-100 & Counting\n៧. Family Members & Verb To Have (Have/Has)\n៨. Feelings & Emotions (Happy, Sad, Tired, Hungry)\n៩. Daily Routines & Telling Time (Present Simple)',
    vocab: [
      { en: 'review', kh: 'រំលឹកឡើងវិញ', ipa: '/rɪˈvjuː/', exEn: 'Let us review Month 1 lessons.', exKh: 'តោះយើងរំលឹកមេរៀនខែទី ១ ឡើងវិញ។' },
      { en: 'master', kh: 'ចេះស្ទាត់ជំនាញ', ipa: '/ˈmɑːstər/', exEn: 'You master basic English grammar.', exKh: 'កូនចេះស្ទាត់វេយ្យាករណ៍អង់គ្លេសគ្រឹះហើយ។' },
      { en: 'confident', kh: 'មានទំនុកចិត្ត', ipa: '/ˈkɒnfɪdənt/', exEn: 'I feel confident about the exam.', exKh: 'ខ្ញុំមានទំនុកចិត្តចំពោះការប្រឡង។' }
    ],
    sentences: [
      { en: 'I understand all Month 1 grammar lessons clearly.', kh: 'ខ្ញុំយល់ច្បាស់នូវរាល់មេរៀនវេយ្យាករណ៍ខែទី ១។' },
      { en: 'Practice makes perfect in English learning.', kh: 'ការអនុវត្តជួយឱ្យការរៀនភាសាអង់គ្លេសកាន់តែល្អឥតខ្ចោះ។' },
      { en: 'We are ready to pass the Month 1 Final Examination.', kh: 'ពួកយើងរួចរាល់ក្នុងការប្រឡងជាប់ការប្រឡងបញ្ចប់ខែទី ១ ហើយ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'How do you feel after completing 23 days of Elementary English?', kh: 'តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរក្រោយបញ្ចប់ ២៣ ថ្ងៃនៃថ្នាក់បឋមសិក្សា?' },
      { speaker: 'Student', en: 'Teacher Piseth, I feel so much more confident! I know how to introduce myself, tell the time, and talk about my daily life.', kh: 'អ្នកគ្រូពិសិដ្ឋ ខ្ញុំមានទំនុកចិត្តជាងមុនច្រើនណាស់! ខ្ញុំចេះណែនាំខ្លួន ប្រាប់ម៉ោង និងនិយាយពីជីវិតប្រចាំថ្ងៃបានហើយ។' },
      { speaker: 'Teacher Piseth', en: 'I am so proud of your dedication! Tomorrow is our Month 1 Final Exam. You will do great!', kh: 'អ្នកគ្រូមានមោទនភាពចំពោះការខិតខំរបស់កូនណាស់! ថ្ងៃស្អែកជាការប្រឡងបញ្ចប់ខែទី ១ ហើយ។ កូននឹងធ្វើបានល្អ!' }
    ]
  },
  {
    day: 24, monthNum: 1, weekNum: 4,
    titleEn: 'Month 1 Progress Assessment (ការប្រឡងប្រចាំខែទី ១ - Month 1 Final Exam)',
    titleKh: 'ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam)',
    grammarKh: 'គោលបំណងនៃការប្រឡងប្រចាំខែទី ១៖\n• វាស់ស្ទង់សមត្ថភាពវេយ្យាករណ៍គ្រឹះ (Pronouns, Verb To Be, To Have, Plural Nouns)\n• វាក្យសព្ទប្រចាំថ្ងៃ (សាលារៀន គ្រួសារ ពេលវេលា អារម្មណ៍)\n• ការយល់ដឹងអំពីល្បះ និងការសន្ទនា\n• សិស្សដែលប្រឡងជាប់ចាប់ពីនិទ្ទេស C (70%) ឡើងទៅ នឹងទទួលបាន វិញ្ញាបនបត្រជោគជ័យខែទី ១ (Month 1 Certificate)!',
    vocab: [
      { en: 'assessment', kh: 'ការវាយតម្លៃ', ipa: '/əˈsesmənt/', exEn: 'This assessment shows your progress.', exKh: 'ការវាយតម្លៃនេះបង្ហាញពីការរីកចម្រើនរបស់អ្នក។' },
      { en: 'exam', kh: 'ការប្រឡង', ipa: '/ɪɡˈzæm/', exEn: 'I study hard for the exam.', exKh: 'ខ្ញុំខំរៀនសម្រាប់ការប្រឡង។' },
      { en: 'success', kh: 'ភាពជោគជ័យ', ipa: '/səkˈses/', exEn: 'I wish you big success!', exKh: 'ជូនពរឱ្យកូនទទួលបានជោគជ័យដ៏ធំធេង!' },
      { en: 'certificate', kh: 'វិញ្ញាបនបត្រ', ipa: '/səˈtɪfɪkət/', exEn: 'Earn your official certificate.', exKh: 'ទទួលបានវិញ្ញាបនបត្រផ្លូវការរបស់អ្នក។' }
    ],
    sentences: [
      { en: 'I do my best on the Month 1 Final Exam.', kh: 'ខ្ញុំខិតខំឱ្យអស់ពីសមត្ថភាពលើការប្រឡងបញ្ចប់ខែទី ១។' },
      { en: 'Congratulations on completing Month 1 of Elementary English!', kh: 'អបអរសាទរចំពោះការបញ្ចប់ខែទី ១ នៃថ្នាក់បឋមសិក្សា!' },
      { en: 'Hard work brings outstanding results.', kh: 'ការខិតខំប្រឹងប្រែងនាំមកនូវលទ្ធផលដ៏លេចធ្លោ។' }
    ],
    dialogue: [
      { speaker: 'Teacher Piseth', en: 'Take a deep breath and start your Month 1 exam with confidence!', kh: 'ដកដង្ហើមវែងៗ ហើយចាប់ផ្តើមការប្រឡងខែទី ១ ដោយភាពជឿជាក់ណា!' },
      { speaker: 'Student', en: 'Thank you, Teacher Piseth! I will read every question carefully and get Grade A!', kh: 'អរគុណអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំនឹងអានសំណួរនីមួយៗឱ្យច្បាស់ និងយកនិទ្ទេស A ជូនអ្នកគ្រូ!' },
      { speaker: 'Teacher Piseth', en: 'You have my full support and blessings! Go for it, superstar!', kh: 'អ្នកគ្រូគាំទ្រ និងជូនពរកូនជានិច្ច! ធ្វើឱ្យបានល្អណា កូនសិស្សឆ្នើម!' }
    ]
  }
];

// Helper to generate template for Month 2 (Days 25-48) & Month 3 (Days 49-72)
const month2Lessons = [
  // Week 5 (Days 25-30): House, Rooms & Furniture
  { day: 25, monthNum: 2, weekNum: 5, titleEn: 'Rooms in the House (Living room, Bedroom, Kitchen, Bathroom)', titleKh: 'បន្ទប់នានាក្នុងផ្ទះ Rooms in the House' },
  { day: 26, monthNum: 2, weekNum: 5, titleEn: 'Furniture & Household Items (Sofa, Bed, Table, Fridge, TV)', titleKh: 'គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items' },
  { day: 27, monthNum: 2, weekNum: 5, titleEn: 'There is & There are (Affirmative, Negative, Questions)', titleKh: 'កិរិយាសព្ទ There is និង There are (មាន...)' },
  { day: 28, monthNum: 2, weekNum: 5, titleEn: 'Prepositions of Place in the House (In front of, Behind, Between)', titleKh: 'ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite)' },
  { day: 29, monthNum: 2, weekNum: 5, titleEn: 'Daily House Chores (Clean room, Wash dishes, Cook dinner)', titleKh: 'កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores' },
  { day: 30, monthNum: 2, weekNum: 5, titleEn: 'Weekly Review & Dialogue: Welcome to My Home', titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ' },

  // Week 6 (Days 31-36): Modal Can, Abilities & Requests
  { day: 31, monthNum: 2, weekNum: 6, titleEn: 'Modal Verb Can for Ability (I can swim, She can speak English)', titleKh: 'កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...)' },
  { day: 32, monthNum: 2, weekNum: 6, titleEn: 'Negative Cannot / Can\'t & Questions (Can you play guitar?)', titleKh: 'ទម្រង់បដិសេធ Can\'t និងសំណួរ Can you...?' },
  { day: 33, monthNum: 2, weekNum: 6, titleEn: 'Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike)', titleKh: 'កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents' },
  { day: 34, monthNum: 2, weekNum: 6, titleEn: 'Asking for Permission with Can & May (Can I come in? May I drink?)', titleKh: 'ការសុំការអនុញ្ញាតដោយប្រើ Can & May' },
  { day: 35, monthNum: 2, weekNum: 6, titleEn: 'Polite Requests & Offers (Could you please... / Would you like...?)', titleKh: 'ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests' },
  { day: 36, monthNum: 2, weekNum: 6, titleEn: 'Weekly Review & Dialogue: Talents & Skills Interview', titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ' },

  // Week 7 (Days 37-42): Food, Drinks & Dining
  { day: 37, monthNum: 2, weekNum: 7, titleEn: 'Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish)', titleKh: 'អាហារ និងពេលអាហារ Food & Meals' },
  { day: 38, monthNum: 2, weekNum: 7, titleEn: 'Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot)', titleKh: 'បន្លែ និងផ្លែឈើ Fruits & Vegetables' },
  { day: 39, monthNum: 2, weekNum: 7, titleEn: 'Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake)', titleKh: 'ភេសជ្ជៈ និងបង្អែម Drinks & Desserts' },
  { day: 40, monthNum: 2, weekNum: 7, titleEn: 'Countable vs Uncountable Nouns (A, An, Some, Any)', titleKh: 'នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An)' },
  { day: 41, monthNum: 2, weekNum: 7, titleEn: 'How Many vs How Much (How many eggs? How much water?)', titleKh: 'ការសួរចំនួន How many និង How much' },
  { day: 42, monthNum: 2, weekNum: 7, titleEn: 'Weekly Review & Dialogue: Ordering Food at a Restaurant', titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន' },

  // Week 8 (Days 43-48): Clothes, Shopping & Prices
  { day: 43, monthNum: 2, weekNum: 8, titleEn: 'Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket)', titleKh: 'សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories' },
  { day: 44, monthNum: 2, weekNum: 8, titleEn: 'Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit)', titleKh: 'ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit' },
  { day: 45, monthNum: 2, weekNum: 8, titleEn: 'Asking for Prices (How much is this shirt? How much are these?)', titleKh: 'ការសួរតម្លៃទំនិញ (How much is...?)' },
  { day: 46, monthNum: 2, weekNum: 8, titleEn: 'Paying and Change (Cash, Credit card, Receipt, Change)', titleKh: 'ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change' },
  { day: 47, monthNum: 2, weekNum: 8, titleEn: 'Month 2 Grand Review: Grammar, Vocabulary & Dialogue', titleKh: 'រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា' },
  { day: 48, monthNum: 2, weekNum: 8, titleEn: 'Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam)', titleKh: 'ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam)' }
];

// Helper to generate template for Month 3 (Days 49-72)
const month3Lessons = [
  // Week 9 (Days 49-54): Town, Places & Directions
  { day: 49, monthNum: 3, weekNum: 9, titleEn: 'Places in Town (Market, Supermarket, Bank, Hospital, School)', titleKh: 'ទីកន្លែងនានាក្នុងទីក្រុង Places in Town' },
  { day: 50, monthNum: 3, weekNum: 9, titleEn: 'Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train)', titleKh: 'មធ្យោបាយធ្វើដំណើរ Means of Transportation' },
  { day: 51, monthNum: 3, weekNum: 9, titleEn: 'How Do You Go to Work/School? (By bus, on foot, by bike)', titleKh: 'ការសួរអំពីការធ្វើដំណើរ (How do you go to...?)' },
  { day: 52, monthNum: 3, weekNum: 9, titleEn: 'Asking & Giving Directions (Turn left, Turn right, Go straight)', titleKh: 'ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight)' },
  { day: 53, monthNum: 3, weekNum: 9, titleEn: 'Public Signs & Rules (Stop, No parking, Entrance, Exit)', titleKh: 'ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs' },
  { day: 54, monthNum: 3, weekNum: 9, titleEn: 'Weekly Review & Dialogue: Finding Your Way Around Town', titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង' },

  // Week 10 (Days 55-60): Weather, Seasons & Present Continuous
  { day: 55, monthNum: 3, weekNum: 10, titleEn: 'Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold)', titleKh: 'ស្ថានភាពអាកាសធាតុ Weather Conditions' },
  { day: 56, monthNum: 3, weekNum: 10, titleEn: 'Seasons of the Year (Rainy season, Dry season, Summer, Winter)', titleKh: 'រដូវកាលនានានៃឆ្នាំ Seasons of the Year' },
  { day: 57, monthNum: 3, weekNum: 10, titleEn: 'Present Continuous Tense - Actions Happening Now (am/is/are + V-ing)', titleKh: 'បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...)' },
  { day: 58, monthNum: 3, weekNum: 10, titleEn: 'Present Continuous Questions & Negatives (What are you doing?)', titleKh: 'សំណួរ និងទម្រង់បដិសេធ Present Continuous' },
  { day: 59, monthNum: 3, weekNum: 10, titleEn: 'Weather Activities & Clothing (It is raining, wear a raincoat)', titleKh: 'សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing' },
  { day: 60, monthNum: 3, weekNum: 10, titleEn: 'Weekly Review & Dialogue: Talking about the Weather and Plans', titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ' },

  // Week 11 (Days 61-66): Past Experiences & Future Plans
  { day: 61, monthNum: 3, weekNum: 11, titleEn: 'Introduction to Past Simple of To Be (Was / Were)', titleKh: 'អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were)' },
  { day: 62, monthNum: 3, weekNum: 11, titleEn: 'Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned)', titleKh: 'អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed)' },
  { day: 63, monthNum: 3, weekNum: 11, titleEn: 'Talking about Yesterday & Last Weekend (Where were you yesterday?)', titleKh: 'ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន' },
  { day: 64, monthNum: 3, weekNum: 11, titleEn: 'Future Plans with Be Going To (I am going to visit Angkor Wat)', titleKh: 'ការរៀបចំផែនការអនាគតដោយប្រើ "Be going to"' },
  { day: 65, monthNum: 3, weekNum: 11, titleEn: 'Hobbies & Free Time Activities (Listening to music, Reading)', titleKh: 'ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time' },
  { day: 66, monthNum: 3, weekNum: 11, titleEn: 'Weekly Review & Dialogue: What Did You Do? & What Will You Do?', titleKh: 'រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត' },

  // Week 12 (Days 67-72): Grand Review & Graduation
  { day: 67, monthNum: 3, weekNum: 12, titleEn: 'Grand Review 1: Pronouns, To Be, Present Simple & Continuous', titleKh: 'រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ' },
  { day: 68, monthNum: 3, weekNum: 12, titleEn: 'Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How)', titleKh: 'រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦' },
  { day: 69, monthNum: 3, weekNum: 12, titleEn: 'Grand Review 3: Essential Vocabulary & Daily Dialogues', titleKh: 'រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ' },
  { day: 70, monthNum: 3, weekNum: 12, titleEn: 'Elementary Final Exam Practice Test Part 1', titleKh: 'វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១)' },
  { day: 71, monthNum: 3, weekNum: 12, titleEn: 'Elementary Final Exam Practice Test Part 2', titleKh: 'វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២)' },
  { day: 72, monthNum: 3, weekNum: 12, titleEn: 'Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា)', titleKh: 'ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam)' }
];

// Enrich months 2 and 3 lessons with detailed pedagogical content
function enrichLesson(raw) {
  const { day, monthNum, weekNum, titleEn, titleKh } = raw;
  const isExam = day === 24 || day === 48 || day === 72;
  const isReview = day === 30 || day === 36 || day === 42 || day === 47 || day === 54 || day === 60 || day === 66 || day >= 67;

  let grammarKh = `មេរៀនថ្ងៃទី ${day} ផ្តោតសំខាន់លើ "${titleKh} (${titleEn})" ក្រោមការណែនាំរបស់អ្នកគ្រូពិសិដ្ឋ (Teacher Piseth AI)។\n• សិក្សាអំពីនិយមន័យ និងក្បួនវេយ្យាករណ៍ច្បាស់លាស់\n• ស្វែងយល់ពីរបៀបបង្កើតប្រយោគស្រប បដិសេធ និងសំណួរ\n• អនុវត្តការប្រើប្រាស់ក្នុងកិច្ចសន្ទនាជាក់ស្តែងប្រចាំថ្ងៃ។`;
  
  let vocab = [
    { en: 'practice', kh: 'ការអនុវត្ត', ipa: '/ˈpræktɪs/', exEn: 'Practice makes perfect.', exKh: 'ការអនុវត្តធ្វើឱ្យកាន់តែពូកែ។' },
    { en: 'improve', kh: 'កែលម្អ / រីកចម្រើន', ipa: '/ɪmˈpruːv/', exEn: 'You improve day by day.', exKh: 'កូនមានការរីកចម្រើនពីមួយថ្ងៃទៅមួយថ្ងៃ។' },
    { en: 'learn', kh: 'រៀនសូត្រ', ipa: '/lɜːn/', exEn: 'We love to learn English.', exKh: 'ពួកយើងស្រឡាញ់ការរៀនភាសាអង់គ្លេស។' },
    { en: 'fluent', kh: 'ស្ទាត់ជំនាញ', ipa: '/ˈfluːənt/', exEn: 'Speak fluent English.', exKh: 'និយាយភាសាអង់គ្លេសបានយ៉ាងស្ទាត់ជំនាញ។' },
    { en: 'success', kh: 'ជោគជ័យ', ipa: '/səkˈses/', exEn: 'Hard work brings success.', exKh: 'ការខិតខំនាំមកនូវភាពជោគជ័យ។' }
  ];

  // Specific content tailoring per theme
  if (day >= 25 && day <= 30) {
    grammarKh = `ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.`;
    vocab = [
      { en: 'living room', kh: 'បន្ទប់ទទួលភ្ញៀវ', ipa: '/ˈlɪvɪŋ ruːm/', exEn: 'Our living room is bright.', exKh: 'បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។' },
      { en: 'bedroom', kh: 'បន្ទប់គេង', ipa: '/ˈbedruːm/', exEn: 'I sleep in my bedroom.', exKh: 'ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។' },
      { en: 'kitchen', kh: 'ផ្ទះបាយ', ipa: '/ˈkɪtʃɪn/', exEn: 'Mother cooks in the kitchen.', exKh: 'ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។' },
      { en: 'sofa', kh: 'សាឡុង', ipa: '/ˈsəʊfə/', exEn: 'Sit on the comfortable sofa.', exKh: 'អង្គុយលើសាឡុងដ៏មានផាសុកភាព។' },
      { en: 'fridge', kh: 'ទូទឹកកក', ipa: '/frɪdʒ/', exEn: 'Milk is in the fridge.', exKh: 'ទឹកដោះគោនៅក្នុងទូទឹកកក។' }
    ];
  } else if (day >= 31 && day <= 36) {
    grammarKh = `កិរិយាសព្ទជំនួយ "CAN" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)`;
    vocab = [
      { en: 'can', kh: 'អាច (សមត្ថភាព)', ipa: '/kæn/', exEn: 'I can speak English.', exKh: 'ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។' },
      { en: 'swim', kh: 'ហែលទឹក', ipa: '/swɪm/', exEn: 'He can swim very fast.', exKh: 'គាត់អាចហែលទឹកបានលឿនណាស់។' },
      { en: 'sing', kh: 'ច្រៀង', ipa: '/sɪŋ/', exEn: 'She can sing beautifully.', exKh: 'នាងអាចច្រៀងបានពិរោះណាស់។' },
      { en: 'dance', kh: 'រាំ', ipa: '/dɑːns/', exEn: 'They can dance Khmer traditional dance.', exKh: 'ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។' },
      { en: 'draw', kh: 'គូររូប', ipa: '/drɔː/', exEn: 'I can draw cute animals.', exKh: 'ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។' }
    ];
  } else if (day >= 37 && day <= 42) {
    grammarKh = `នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.`;
    vocab = [
      { en: 'rice', kh: 'បាយ / អង្ករ', ipa: '/raɪs/', exEn: 'Cambodians eat rice every day.', exKh: 'ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។' },
      { en: 'bread', kh: 'នំបុ័ង', ipa: '/bred/', exEn: 'I eat fresh bread for breakfast.', exKh: 'ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។' },
      { en: 'soup', kh: 'សម្ល / ស៊ុប', ipa: '/suːp/', exEn: 'Hot soup warms your body.', exKh: 'សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។' },
      { en: 'orange', kh: 'ផ្លែក្រូច', ipa: '/ˈɒrɪndʒ/', exEn: 'Orange contains vitamin C.', exKh: 'ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។' },
      { en: 'water', kh: 'ទឹកស្អាត', ipa: '/ˈwɔːtər/', exEn: 'Drink pure water regularly.', exKh: 'ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។' }
    ];
  } else if (day >= 43 && day <= 48) {
    grammarKh = `ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: "How much is this shirt?" -> "It is 15 dollars."\n• វត្ថុពហុវចនៈ: "How much are these shoes?" -> "They are 25 dollars."\n• ការសាកល្បង: "Can I try this on?" -> "Sure, the fitting room is over there."\n• ការទូទាត់: "Here is your change and receipt. Thank you!"`;
    vocab = [
      { en: 'shirt', kh: 'អាវ', ipa: '/ʃɜːt/', exEn: 'This blue shirt fits you well.', exKh: 'អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។' },
      { en: 'shoes', kh: 'ស្បែកជើង', ipa: '/ʃuːz/', exEn: 'These leather shoes are durable.', exKh: 'ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។' },
      { en: 'price', kh: 'តម្លៃ', ipa: '/praɪs/', exEn: 'The price is very reasonable.', exKh: 'តម្លៃនេះគឺសមរម្យណាស់។' },
      { en: 'dollar', kh: 'ប្រាក់ដុល្លារ', ipa: '/ˈdɒlər/', exEn: 'It costs ten dollars.', exKh: 'វាមានតម្លៃដប់ដុល្លារ។' },
      { en: 'receipt', kh: 'វិក្កយបត្រ', ipa: '/rɪˈsiːt/', exEn: 'Keep your purchase receipt.', exKh: 'សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។' }
    ];
  } else if (day >= 49 && day <= 54) {
    grammarKh = `ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• "Excuse me, where is the bank / market?"\n• "Go straight along this street." (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• "Turn left at the traffic light." (បត់ឆ្វេងនៅស្តុប)\n• "Turn right next to the school." (បត់ស្តាំនៅក្បែរសាលា)\n• "It is on your left-hand side." (វានៅខាងឆ្វេងដៃរបស់អ្នក)`;
    vocab = [
      { en: 'market', kh: 'ផ្សារ', ipa: '/ˈmɑːkɪt/', exEn: 'The Central Market is famous.', exKh: 'ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។' },
      { en: 'hospital', kh: 'មន្ទីរពេទ្យ', ipa: '/ˈhɒspɪtl/', exEn: 'The hospital is near the river.', exKh: 'មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។' },
      { en: 'turn left', kh: 'បត់ឆ្វេង', ipa: '/tɜːn left/', exEn: 'Turn left at the corner.', exKh: 'បត់ឆ្វេងនៅជ្រុងផ្លូវ។' },
      { en: 'turn right', kh: 'បត់ស្តាំ', ipa: '/tɜːn raɪt/', exEn: 'Turn right after the bridge.', exKh: 'បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។' },
      { en: 'go straight', kh: 'ទៅត្រង់', ipa: '/ɡəʊ streɪt/', exEn: 'Go straight for two hundred meters.', exKh: 'ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។' }
    ];
  } else if (day >= 55 && day <= 60) {
    grammarKh = `បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.`;
    vocab = [
      { en: 'sunny', kh: 'មានពន្លឺថ្ងៃក្តៅ', ipa: '/ˈsʌni/', exEn: 'It is sunny and warm today.', exKh: 'ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។' },
      { en: 'rainy', kh: 'មានភ្លៀងធ្លាក់', ipa: '/ˈreɪni/', exEn: 'Take an umbrella on rainy days.', exKh: 'យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។' },
      { en: 'studying', kh: 'កំពុងរៀន', ipa: '/ˈstʌdiɪŋ/', exEn: 'We are studying with Teacher Piseth.', exKh: 'ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។' },
      { en: 'reading', kh: 'កំពុងអាន', ipa: '/ˈriːdɪŋ/', exEn: 'He is reading an interesting story.', exKh: 'គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។' },
      { en: 'playing', kh: 'កំពុងលេង', ipa: '/ˈpleɪɪŋ/', exEn: 'The children are playing happily.', exKh: 'ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។' }
    ];
  } else if (day >= 61 && day <= 66) {
    grammarKh = `ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with "Be going to": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.`;
    vocab = [
      { en: 'yesterday', kh: 'ម្សិលមិញ', ipa: '/ˈjestədeɪ/', exEn: 'I visited my aunt yesterday.', exKh: 'ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។' },
      { en: 'last week', kh: 'សប្តាហ៍មុន', ipa: '/lɑːst wiːk/', exEn: 'We had a test last week.', exKh: 'ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។' },
      { en: 'tomorrow', kh: 'ថ្ងៃស្អែក', ipa: '/təˈmɒrəʊ/', exEn: 'Tomorrow is going to be great.', exKh: 'ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។' },
      { en: 'going to', kh: 'នឹង... (ផែនការច្បាស់លាស់)', ipa: '/ˈɡəʊɪŋ tuː/', exEn: 'I am going to speak English fluently.', exKh: 'ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។' },
      { en: 'hobby', kh: 'ចំណង់ចំណូលចិត្ត', ipa: '/ˈhɒbi/', exEn: 'My hobby is reading English books.', exKh: 'ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។' }
    ];
  } else {
    // Days 67-72: Grand Review & Graduation
    grammarKh = `ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!`;
    vocab = [
      { en: 'graduate', kh: 'បញ្ចប់ការសិក្សា', ipa: '/ˈɡrædʒueɪt/', exEn: 'I graduate from Elementary level!', exKh: 'ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!' },
      { en: 'achievement', kh: 'សមិទ្ធផល / ស្នាដៃ', ipa: '/əˈtʃiːvmənt/', exEn: 'This is a proud achievement.', exKh: 'នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។' },
      { en: 'knowledge', kh: 'ចំណេះដឹង', ipa: '/ˈnɒlɪdʒ/', exEn: 'Knowledge opens many doors.', exKh: 'ចំណេះដឹងបើកផ្លូវជាច្រើន។' },
      { en: 'congratulations', kh: 'អបអរសាទរ', ipa: '/kənˌɡrætʃuˈleɪʃnz/', exEn: 'Congratulations on your graduation!', exKh: 'អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!' },
      { en: 'future', kh: 'អនាគត', ipa: '/ˈfjuːtʃər/', exEn: 'A bright future awaits you.', exKh: 'អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។' }
    ];
  }

  const sentences = [
    { en: `We study Day ${day}: ${titleEn} today.`, kh: `ពួកយើងរៀនថ្ងៃទី ${day}៖ ${titleKh} ថ្ងៃនេះ។` },
    { en: 'Teacher Piseth explains every lesson with love and patience.', kh: 'អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។' },
    { en: 'Daily practice brings confidence and high scores.', kh: 'ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។' }
  ];

  const dialogue = [
    { speaker: 'Teacher Piseth', en: `Welcome to Day ${day}! Are you ready to master ${titleEn}?`, kh: `ស្វាគមន៍មកកាន់ថ្ងៃទី ${day}! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ${titleKh} ហើយឬនៅ?` },
    { speaker: 'Student', en: 'Yes, Teacher Piseth! I am very excited and ready to learn.', kh: 'ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។' },
    { speaker: 'Teacher Piseth', en: 'Wonderful! Let us listen carefully, speak clearly, and achieve excellence!', kh: 'ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!' }
  ];

  return {
    day,
    monthNum,
    weekNum,
    titleEn,
    titleKh,
    grammarKh,
    vocab,
    sentences,
    dialogue
  };
}

// Generate all 72 lessons
const all72LessonsData = [];
// Month 1
for (let d = 1; d <= 24; d++) {
  const found = lessons.find(l => l.day === d);
  if (found) {
    all72LessonsData.push(found);
  } else {
    // Generate default if missing
    const weekNum = Math.ceil(d / 6);
    all72LessonsData.push(enrichLesson({ day: d, monthNum: 1, weekNum, titleEn: `Lesson Day ${d}`, titleKh: `មេរៀនថ្ងៃទី ${d}` }));
  }
}

// Month 2 (Days 25-48)
month2Lessons.forEach(raw => {
  all72LessonsData.push(enrichLesson(raw));
});

// Month 3 (Days 49-72)
month3Lessons.forEach(raw => {
  all72LessonsData.push(enrichLesson(raw));
});

console.log(`Generated all ${all72LessonsData.length} lessons data.`);

// Build structured months and weeks
const months = [
  {
    id: 'em1',
    monthNum: 1,
    title: 'ខែទី 1៖ មូលដ្ឋានគ្រឹះ ណែនាំខ្លួន និងកិរិយាសព្ទ Be / Have',
    examId: 'elem_exam_m1',
    examTitle: 'ការប្រឡងប្រចាំខែទី 1 (Month 1 Final Exam)',
    weeks: []
  },
  {
    id: 'em2',
    monthNum: 2,
    title: 'ខែទី 2៖ ជីវិតរស់នៅ ផ្ទះសម្បែង ម្ហូបអាហារ និងការទិញទំនិញ',
    examId: 'elem_exam_m2',
    examTitle: 'ការប្រឡងប្រចាំខែទី 2 (Month 2 Final Exam)',
    weeks: []
  },
  {
    id: 'em3',
    monthNum: 3,
    title: 'ខែទី 3៖ ការធ្វើដំណើរ អាកាសធាតុ សកម្មភាព និងបញ្ចប់ថ្នាក់បឋម',
    examId: 'elem_exam_m3',
    examTitle: 'ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Final Graduation Exam)',
    weeks: []
  }
];

// Helper to chunk 6 lessons into a week
for (let m = 1; m <= 3; m++) {
  const mObj = months[m - 1];
  for (let w = 1; w <= 4; w++) {
    const globalWeekNum = (m - 1) * 4 + w;
    const startDay = (globalWeekNum - 1) * 6 + 1;
    const endDay = globalWeekNum * 6;
    const weekLessons = all72LessonsData.filter(l => l.day >= startDay && l.day <= endDay).map(l => {
      const fullContent = formatLessonContent(l);
      return {
        id: `el${l.day}`,
        day: l.day,
        title: `ថ្ងៃទី ${l.day}៖ ${l.titleKh} (${l.titleEn})`,
        topic: l.titleKh,
        grammar: l.grammarKh,
        vocab: l.vocab,
        sentences: l.sentences,
        dialogue: l.dialogue,
        content: fullContent
      };
    });

    mObj.weeks.push({
      id: `ew${globalWeekNum}`,
      weekNum: globalWeekNum,
      monthWeekNum: w,
      title: `សប្តាហ៍ទី ${w} (ថ្ងៃទី ${startDay} - ${endDay})`,
      description: `មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី ${w} ខែទី ${m}`,
      lessons: weekLessons
    });
  }
}

// Flat weeks array across all 3 months for backward compatibility
const allWeeks = [];
months.forEach(m => {
  m.weeks.forEach(w => allWeeks.push(w));
});

// Final elementary course object
const ELEMENTARY_COURSE = {
  id: 'elementary',
  title: 'ថ្នាក់បឋមសិក្សា (Elementary Level)',
  code: 'LEVEL_1_ELEMENTARY',
  teacher: {
    id: 'piseth',
    name: 'អ្នកគ្រូ ពិសិដ្ឋ',
    englishName: 'Teacher Piseth AI',
    avatar: '👩‍🏫',
    role: 'គ្រូបង្រៀនភាសាអង់គ្លេសថ្នាក់បឋម & Elementary English Specialist',
    badge: 'Elementary English Coach',
    welcomeGreeting: 'សួស្តីកូនៗ និងប្អូនៗទាំងអស់គ្នា! ស្វាគមន៍មកកាន់ "ថ្នាក់បឋមសិក្សា (Elementary Level)" ជាមួយអ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth)។ ក្នុងវគ្គ ៣ ខែនេះ យើងនឹងរៀនវេយ្យាករណ៍គ្រឹះ ពាក្យគន្លឹះ និងការសន្ទនាជាក់ស្តែងចំនួន ៧២ ថ្ងៃ ដើម្បីនិយាយ និងប្រើប្រាស់ភាសាអង់គ្លេសបានកាន់តែស្ទាត់ជំនាញ! 🌟'
  },
  monthsCount: 3,
  totalLessons: 72,
  months: months,
  weeks: allWeeks
};

// Write out to elementary_curriculum.js
const outPath = path.join(__dirname, 'elementary_curriculum.js');
const fileContent = `/**
 * Elementary Level Curriculum (ថ្នាក់បឋមសិក្សា / Elementary English)
 * 3 Months Duration • 12 Weeks • 72 Daily Lessons
 * Taught by AI Instructor: អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)
 * Structured with Monthly Exams (em1, em2) and Elementary Graduation Exam (em3)
 */

const ELEMENTARY_COURSE = ${JSON.stringify(ELEMENTARY_COURSE, null, 2)};

module.exports = ELEMENTARY_COURSE;
`;

fs.writeFileSync(outPath, fileContent, 'utf8');
console.log('Successfully wrote elementary_curriculum.js!');
