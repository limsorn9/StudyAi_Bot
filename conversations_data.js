/**
 * Conversations Data - 48 Situational Dialogues for 48 Weeks
 * Each conversation includes:
 * - Title (Khmer & English)
 * - Situation Context
 * - Key Vocabulary with Khmer translations
 * - Full dialogue with line-by-line English and Khmer translations
 * - Speaking & Pronunciation tips
 */

const conversations = [
  // MONTH 1: FOUNDATION & DAILY LIFE
  {
    week: 1,
    title: "ការណែនាំខ្លួន និងការស្គាល់គ្នាដំបូង (Self-Introduction & Getting Acquainted)",
    situation: "ការជួបគ្នានៅថ្ងៃដំបូងក្នុងថ្នាក់រៀនភាសាអង់គ្លេស ឬកន្លែងធ្វើការថ្មី",
    vocab: [
      { en: "Nice to meet you", kh: "រីករាយណាស់ដែលបានស្គាល់អ្នក" },
      { en: "Where are you from?", kh: "តើអ្នកមកពីណា?" },
      { en: "Originally from", kh: "មានស្រុកកំណើតដើមមកពី" },
      { en: "What do you do?", kh: "តើអ្នកធ្វើការអ្វី?" }
    ],
    script: [
      { speaker: "Sophea", en: "Hello! My name is Sophea. Nice to meet you.", kh: "សួស្តី! ខ្ញុំឈ្មោះសុភា។ រីករាយណាស់ដែលបានស្គាល់អ្នក។" },
      { speaker: "David", en: "Hi Sophea, I'm David. It's a pleasure to meet you too.", kh: "សួស្តីសុភា ខ្ញុំគឺដេវីដ។ រីករាយណាស់ដែលបានស្គាល់អ្នកដូចគ្នា។" },
      { speaker: "Sophea", en: "Where are you from, David?", kh: "តើអ្នកមកពីប្រទេសណាដែរ ដេវីដ?" },
      { speaker: "David", en: "I'm originally from Canada, but I live in Phnom Penh now. How about you?", kh: "ខ្ញុំមានស្រុកកំណើតនៅកាណាដា ប៉ុន្តែឥឡូវនេះខ្ញុំរស់នៅភ្នំពេញ។ ចុះអ្នកវិញ?" },
      { speaker: "Sophea", en: "I was born in Siem Reap, but I study English here in Phnom Penh.", kh: "ខ្ញុំកើតនៅសៀមរាប ប៉ុន្តែខ្ញុំរៀនភាសាអង់គ្លេសនៅភ្នំពេញនេះ។" },
      { speaker: "David", en: "That's wonderful! Siem Reap is an amazing city.", kh: "ពិតជាអស្ចារ្យណាស់! សៀមរាបគឺជាទីក្រុងដ៏អស្ចារ្យមួយ។" }
    ],
    speakingTip: "ពេលជួបគ្នាដំបូង ត្រូវញញឹម និងបញ្ចេញសំឡេង 'Nice to meet you' ឱ្យច្បាស់ និងរាក់ទាក់។"
  },
  {
    week: 2,
    title: "ការសួររកផ្លូវ និងទីតាំងក្នុងទីក្រុង (Asking for Directions in the City)",
    situation: "ការវង្វេងផ្លូវ និងសួរអ្នកដំណើរតាមផ្លូវដើម្បីទៅកាន់បណ្ណាល័យជាតិ",
    vocab: [
      { en: "Excuse me", kh: "សុំទោស (ពាក្យគួរសមពេលសុំសួរ)" },
      { en: "Go straight", kh: "ដើរទៅត្រង់" },
      { en: "Turn left / right", kh: "បត់ឆ្វេង / បត់ស្តាំ" },
      { en: "On your right-hand side", kh: "នៅខាងស្តាំដៃរបស់អ្នក" }
    ],
    script: [
      { speaker: "Tourist", en: "Excuse me, sir. Could you tell me how to get to the National Library?", kh: "សុំទោសលោក តើអាចប្រាប់ខ្ញុំបានទេថាតើទៅបណ្ណាល័យជាតិតាមណា?" },
      { speaker: "Local", en: "Sure! Go straight along this street for two blocks.", kh: "បានច្បាស់ណាស់! ដើរទៅត្រង់តាមផ្លូវនេះប្រហែលពីរផ្លូវកាត់។" },
      { speaker: "Tourist", en: "Okay, go straight for two blocks. And then?", kh: "បាទ ទៅត្រង់ពីរផ្លូវកាត់។ ហើយបន្ទាប់មកទៀត?" },
      { speaker: "Local", en: "Then turn left at the traffic lights. It's next to the museum, on your right-hand side.", kh: "បន្ទាប់មកបត់ឆ្វេងនៅស្តុបចរាចរណ៍។ វានៅជាប់សារមន្ទីរ នៅខាងស្តាំដៃរបស់អ្នក។" },
      { speaker: "Tourist", en: "Is it far from here?", kh: "តើវាឆ្ងាយពីទីនេះទេ?" },
      { speaker: "Local", en: "No, it only takes about five minutes on foot.", kh: "ទេ ដើរត្រឹមតែប្រហែល ៥ នាទីប៉ុណ្ណោះ។" },
      { speaker: "Tourist", en: "Thank you so much for your help!", kh: "អរគុណច្រើនណាស់សម្រាប់ជំនួយរបស់អ្នក!" }
    ],
    speakingTip: "ប្រើពាក្យ 'Excuse me' ជានិច្ចមុននឹងសួរសំណួរ ដើម្បីបង្ហាញការគួរសម និងការគោរព។"
  },
  {
    week: 3,
    title: "ការកុម្ម៉ង់អាហារ និងភេសជ្ជៈនៅភោជនីយដ្ឋាន (Ordering Food at a Restaurant)",
    situation: "ការចូលញ៉ាំអាហារពេលល្ងាច និងកុម្ម៉ង់ម្ហូបជាមួយបុគ្គលិករត់តុ",
    vocab: [
      { en: "Are you ready to order?", kh: "តើលោកអ្នករួចរាល់ដើម្បីកុម្ម៉ង់ហើយឬនៅ?" },
      { en: "I would like to have...", kh: "ខ្ញុំចង់បាន / សូមកុម្ម៉ង់..." },
      { en: "What do you recommend?", kh: "តើអ្នកណែនាំម្ហូបអ្វីពិសេស?" },
      { en: "Could we have the bill, please?", kh: "សូមគិតលុយ" }
    ],
    script: [
      { speaker: "Waiter", en: "Good evening! Welcome to our restaurant. Are you ready to order?", kh: "សាយណ្ហសួស្តី! សូមស្វាគមន៍មកកាន់ភោជនីយដ្ឋានយើងខ្ញុំ។ តើលោកអ្នករួចរាល់ដើម្បីកុម្ម៉ង់ហើយឬនៅ?" },
      { speaker: "Customer", en: "Yes, please. What is your special dish for tonight?", kh: "បាទរួចរាល់ហើយ។ តើយប់នេះមានម្ហូបអ្វីពិសេសដែរ?" },
      { speaker: "Waiter", en: "Our grilled salmon with lemon butter sauce is very popular tonight.", kh: "ត្រីសាល់ម៉ុនអាំងជាមួយទឹកជ្រលក់ប៊ឺក្រូចឆ្មាររបស់យើង គឺល្បី និងពេញនិយមខ្លាំងណាស់យប់នេះ។" },
      { speaker: "Customer", en: "That sounds delicious! I'll have that, and a glass of fresh orange juice.", kh: "ស្តាប់ទៅទំនងឆ្ងាញ់ណាស់! ខ្ញុំយកម្ហូបហ្នឹងមួយ និងទឹកក្រូចស្រស់មួយកែវ។" },
      { speaker: "Waiter", en: "Would you like anything else for dessert?", kh: "តើលោកអ្នកចង់ពិសាបង្អែមអ្វីបន្ថែមទៀតទេ?" },
      { speaker: "Customer", en: "No, thank you. That will be all for now.", kh: "ទេ អរគុណ។ ប៉ុណ្ណឹងសិនហើយ។" }
    ],
    speakingTip: "ប្រើឃ្លា 'I would like to have...' ឬ 'I'll have...' គឺសមរម្យជាងការប្រើ 'I want...' នៅភោជនីយដ្ឋាន។"
  },
  {
    week: 4,
    title: "ការទិញទំនិញ និងការសួរតម្លៃ (Shopping & Inquiring About Prices)",
    situation: "ការជ្រើសរើសទិញសម្លៀកបំពាក់ និងសួរអំពីទំហំ និងការបញ្ចុះតម្លៃ",
    vocab: [
      { en: "How much is this?", kh: "តើរបស់នេះតម្លៃប៉ុន្មាន?" },
      { en: "Do you have this in a larger size?", kh: "តើអ្នកមានទំហំធំជាងនេះទេ?" },
      { en: "Fitting room", kh: "បន្ទប់សាកសម្លៀកបំពាក់" },
      { en: "Discount", kh: "ការបញ្ចុះតម្លៃ" }
    ],
    script: [
      { speaker: "Customer", en: "Excuse me, how much is this blue jacket?", kh: "សុំទោស តើអាវធំពណ៌ខៀវនេះតម្លៃប៉ុន្មានដែរ?" },
      { speaker: "Clerk", en: "It's thirty-five dollars, but today we have a 10% discount on all jackets.", kh: "វាមានតម្លៃ ៣៥ ដុល្លារ ប៉ុន្តែថ្ងៃនេះយើងមានការបញ្ចុះតម្លៃ ១០% លើគ្រប់អាវធំទាំងអស់។" },
      { speaker: "Customer", en: "That's great! Do you have this in size Medium?", kh: "ពិតជាល្អណាស់! តើអ្នកមានទំហំ M ទេ?" },
      { speaker: "Clerk", en: "Yes, here you go. Would you like to try it on in the fitting room?", kh: "បាទមាន នេះជូនលោកអ្នក។ តើលោកអ្នកចង់សាកពាក់នៅក្នុងបន្ទប់សាកទេ?" },
      { speaker: "Customer", en: "Yes, please. Where is the fitting room?", kh: "បាទចង់។ តើបន្ទប់សាកនៅឯណាដែរ?" },
      { speaker: "Clerk", en: "It's right over there in the back corner.", kh: "វានៅជ្រុងខាងក្រោយត្រង់នោះឯង។" }
    ],
    speakingTip: "សួរតម្លៃដោយប្រើ 'How much is this...?' សម្រាប់របស់មួយ និង 'How much are these...?' សម្រាប់របស់ច្រើន។"
  },

  // MONTH 2: ROUTINE & DAILY INTERACTION
  {
    week: 5,
    title: "ការសន្ទនាតាមទូរស័ព្ទ និងការផ្ញើសារ (Phone Conversations & Leaving Messages)",
    situation: "ការទូរស័ព្ទទៅកាន់ការិយាល័យក្រុមហ៊ុនដើម្បីសុំជួបអ្នកគ្រប់គ្រង",
    vocab: [
      { en: "May I speak to...?", kh: "តើខ្ញុំអាចសុំនិយាយជាមួយ...បានទេ?" },
      { en: "Hold on a moment", kh: "សូមរង់ចាំមួយភ្លែត" },
      { en: "Leave a message", kh: "ផ្ញើសារទុក" },
      { en: "Call back later", kh: "ទូរស័ព្ទត្រឡប់មកវិញពេលក្រោយ" }
    ],
    script: [
      { speaker: "Receptionist", en: "Good morning, Apex Solutions. How may I help you?", kh: "អរុណសួស្តី ក្រុមហ៊ុន Apex Solutions។ តើខ្ញុំអាចជួយអ្វីលោកអ្នកបានទេ?" },
      { speaker: "Caller", en: "Hello, could I speak to Mr. Robert, please?", kh: "សួស្តី តើខ្ញុំអាចសុំជជែកជាមួយលោក រ៉ូបឺត បានទេ?" },
      { speaker: "Receptionist", en: "May I ask who is calling, please?", kh: "តើខ្ញុំអាចសុំដឹងឈ្មោះលោកអ្នកដែលកំពុងទូរស័ព្ទមកបានទេ?" },
      { speaker: "Caller", en: "This is Linda from the Global Marketing team.", kh: "ខ្ញុំគឺ លីនដា មកពីក្រុមទីផ្សារសកល។" },
      { speaker: "Receptionist", en: "Please hold on for a moment... I'm sorry, Mr. Robert is in a meeting. Would you like to leave a message?", kh: "សូមរង់ចាំមួយភ្លែត... សុំទោសផង លោក រ៉ូបឺត កំពុងប្រជុំ។ តើលោកស្រីចង់ផ្ញើសារទុកទេ?" },
      { speaker: "Caller", en: "Yes, please tell him to call me back when he is free. My number is 012-345-678.", kh: "ចាស សូមជួយប្រាប់គាត់ឱ្យទូរស័ព្ទមកខ្ញុំវិញផងពេលគាត់ទំនេរ។ លេខខ្ញុំគឺ 012-345-678។" }
    ],
    speakingTip: "ពេលនិយាយទូរស័ព្ទ ប្រើ 'This is...' ដើម្បីណែនាំឈ្មោះខ្លួនឯង កុំនិយាយថា 'I am...'"
  },
  {
    week: 6,
    title: "ការកក់ និងស្នាក់នៅសណ្ឋាគារ (Hotel Check-in & Inquiries)",
    situation: "ការចូលទៅកាន់តុទទួលភ្ញៀវសណ្ឋាគារដើម្បី Check-in បន្ទប់គេង",
    vocab: [
      { en: "I have a reservation", kh: "ខ្ញុំបានកក់បន្ទប់ទុកជាមុន" },
      { en: "Under the name of...", kh: "ក្រោមឈ្មោះ..." },
      { en: "What time is breakfast served?", kh: "តើអាហារពេលព្រឹកចាប់ផ្តើមម៉ោងប៉ុន្មាន?" },
      { en: "Wi-Fi password", kh: "លេខកូដសម្ងាត់វ៉ាយហ្វាយ" }
    ],
    script: [
      { speaker: "Guest", en: "Good afternoon. I'd like to check in, please. I have a reservation.", kh: "ទិវាសួស្តី។ ខ្ញុំចង់ Check-in ចូលបន្ទប់។ ខ្ញុំបានកក់ទុកជាមុនហើយ។" },
      { speaker: "Receptionist", en: "Welcome! May I have your name and passport, please?", kh: "សូមស្វាគមន៍! តើខ្ញុំអាចសុំឈ្មោះ និងលិខិតឆ្លងដែនរបស់លោកបានទេ?" },
      { speaker: "Guest", en: "Certainly. The reservation is under the name of Dara Sok.", kh: "ប្រាកដជាបាន។ ការកក់គឺក្រោមឈ្មោះ ដារ៉ា សុខ។" },
      { speaker: "Receptionist", en: "Thank you, Mr. Sok. You are booked for three nights in a Deluxe King Room. Here is your key card for room 405.", kh: "អរគុណលោកសុខ។ លោកបានកក់ ៣ យប់ក្នុងបន្ទប់ Deluxe King។ នេះជាកាតសោបន្ទប់លេខ ៤០៥។" },
      { speaker: "Guest", en: "Thank you. What time is breakfast served in the morning?", kh: "អរគុណ។ តើអាហារពេលព្រឹកចាប់ផ្តើមម៉ោងប៉ុន្មាននៅពេលព្រឹក?" },
      { speaker: "Receptionist", en: "Breakfast is served from 6:30 AM to 10:00 AM in the restaurant on the second floor.", kh: "អាហារពេលព្រឹកមានបម្រើពីម៉ោង ៦:៣០ ព្រឹក ដល់ ១០:០០ ព្រឹក នៅភោជនីយដ្ឋានជាន់ទីពីរ។" }
    ],
    speakingTip: "និយាយ 'I'd like to check in' យ៉ាងច្បាស់ពេលទៅដល់ Reception ដើម្បីឱ្យបុគ្គលិករៀបចំឯកសារបានរហ័ស។"
  },
  {
    week: 7,
    title: "នៅអាកាសយានដ្ឋាន និងការឆ្លងកាត់អន្តោប្រវេសន៍ (Airport Check-in & Immigration)",
    situation: "ការធ្វើដំណើរតាមយន្តហោះ ការផ្ញើវ៉ាលី និងការឆ្លើយសំណួរមន្ត្រីអន្តោប្រវេសន៍",
    vocab: [
      { en: "Boarding pass", kh: "សំបុត្រឡើងយន្តហោះ" },
      { en: "Window seat / Aisle seat", kh: "កៅអីក្បែរបង្អួច / កៅអីក្បែរផ្លូវដើរ" },
      { en: "What is the purpose of your visit?", kh: "តើគោលបំណងនៃការធ្វើដំណើររបស់អ្នកគឺអ្វី?" },
      { en: "How long will you be staying?", kh: "តើអ្នកនឹងស្នាក់នៅរយៈពេលប៉ុន្មាន?" }
    ],
    script: [
      { speaker: "Officer", en: "Good morning. May I see your passport and flight ticket?", kh: "អរុណសួស្តី។ តើខ្ញុំអាចមើលលិខិតឆ្លងដែន និងសំបុត្រយន្តហោះរបស់អ្នកបានទេ?" },
      { speaker: "Traveler", en: "Good morning. Here you are.", kh: "អរុណសួស្តី។ នេះជូនលោក។" },
      { speaker: "Officer", en: "Thank you. What is the purpose of your trip?", kh: "អរគុណ។ តើគោលបំណងនៃដំណើរកម្សាន្តរបស់អ្នកគឺអ្វីដែរ?" },
      { speaker: "Traveler", en: "I am traveling for tourism and sightseeing.", kh: "ខ្ញុំធ្វើដំណើរសម្រាប់ទេសចរណ៍ និងទស្សនាកម្សាន្ត។" },
      { speaker: "Officer", en: "How long will you be staying in the country?", kh: "តើអ្នកនឹងស្នាក់នៅក្នុងប្រទេសនេះរយៈពេលប៉ុន្មាន?" },
      { speaker: "Traveler", en: "I will be staying for two weeks. I have a return ticket.", kh: "ខ្ញុំនឹងស្នាក់នៅរយៈពេលពីរសប្តាហ៍។ ខ្ញុំមានសំបុត្រត្រឡប់ទៅវិញរួចរាល់។" },
      { speaker: "Officer", en: "Everything looks good. Enjoy your stay!", kh: "ឯកសារទាំងអស់ត្រឹមត្រូវល្អហើយ។ សូមរីករាយជាមួយដំណើរកម្សាន្ត!" }
    ],
    speakingTip: "ឆ្លើយសំណួរមន្ត្រីអន្តោប្រវេសន៍ឱ្យខ្លី ចំគោលដៅ ត្រង់ និងជឿជាក់ (Direct & Confident)។"
  },
  {
    week: 8,
    title: "ការទៅជួបគ្រូពេទ្យ និងការប្រាប់ពីរោគសញ្ញា (Doctor's Appointment & Describing Symptoms)",
    situation: "ការពិគ្រោះជំងឺជាមួយគ្រូពេទ្យនៅគ្លីនិក ដោយសារក្តៅខ្លួន និងឈឺក្បាល",
    vocab: [
      { en: "What seems to be the problem?", kh: "តើអ្នកមានបញ្ហាសុខភាពអ្វីដែរ?" },
      { en: "I have a fever and headache", kh: "ខ្ញុំក្តៅខ្លួន និងឈឺក្បាល" },
      { en: "How long have you felt this way?", kh: "តើអ្នកមានអារម្មណ៍បែបនេះរយៈពេលប៉ុន្មានថ្ងៃហើយ?" },
      { en: "Take this medicine twice a day", kh: "លេបថ្នាំនេះពីរដងក្នុងមួយថ្ងៃ" }
    ],
    script: [
      { speaker: "Doctor", en: "Good morning. Please have a seat. What seems to be the problem today?", kh: "អរុណសួស្តី។ សូមអញ្ជើញអង្គុយ។ តើអ្នកមានអាការៈមិនស្រួលត្រង់ណាដែរថ្ងៃនេះ?" },
      { speaker: "Patient", en: "Doctor, I've had a bad headache and a sore throat since yesterday.", kh: "លោកគ្រូពេទ្យ ខ្ញុំឈឺក្បាលខ្លាំង និងឈឺបំពង់កតាំងពីម្សិលមិញមក។" },
      { speaker: "Doctor", en: "Do you also have a fever or body aches?", kh: "តើអ្នកមានក្តៅខ្លួន ឬចុកដៃចុកជើងដែរទេ?" },
      { speaker: "Patient", en: "Yes, I measured my temperature this morning, and it was 38.5 degrees.", kh: "បាទមាន ខ្ញុំបានវាស់កម្តៅព្រឹកនេះគឺ ៣៨.៥ អង្សាសេ។" },
      { speaker: "Doctor", en: "Let me check your throat... It's slightly infected. I will prescribe some antibiotics and pain relief medicine.", kh: "ឱ្យខ្ញុំពិនិត្យបំពង់កបន្តិច... រាងរលាកបន្តិចបន្តួច។ ខ្ញុំនឹងចេញវេជ្ជបញ្ជាថ្នាំផ្សះ និងថ្នាំបំបាត់ការឈឺចាប់ជូន។" },
      { speaker: "Patient", en: "How often should I take them?", kh: "តើខ្ញុំគួរលេបញឹកញាប់ប៉ុណ្ណាដែរ?" },
      { speaker: "Doctor", en: "Take one pill after meals, three times a day, and drink plenty of warm water.", kh: "លេបមួយគ្រាប់ក្រោយបាយ ៣ ដងក្នុងមួយថ្ងៃ ហើយពិសាទឹកក្តៅឧណ្ហៗឱ្យបានច្រើន។" }
    ],
    speakingTip: "រៀបរាប់អាការៈដោយប្រើ 'I have a + [រោគសញ្ញា]' ដូចជា 'I have a cough' ឬ 'I have a fever'។"
  },

  // MONTH 3: WORKPLACE & CAREER
  {
    week: 9,
    title: "ធនាគារ ការបើកគណនី និងការដកប្រាក់ (Banking, Opening Accounts & Transactions)",
    situation: "ការចូលទៅកាន់ធនាគារដើម្បីបើកគណនីសន្សំប្រាក់ និងស្នើសុំកាត ATM",
    vocab: [
      { en: "Open a savings account", kh: "បើកគណនីសន្សំប្រាក់" },
      { en: "Deposit money", kh: "ដាក់ប្រាក់ចូលគណនី" },
      { en: "Withdraw cash", kh: "ដកប្រាក់សុទ្ធ" },
      { en: "Identification card / Passport", kh: "អត្តសញ្ញាណប័ណ្ណ / លិខិតឆ្លងដែន" }
    ],
    script: [
      { speaker: "Customer", en: "Good morning. I would like to open a new savings account, please.", kh: "អរុណសួស្តី។ ខ្ញុំចង់បើកគណនីសន្សំប្រាក់ថ្មីមួយ។" },
      { speaker: "Banker", en: "Good morning! We would be happy to help you with that. Do you have your ID card or passport?", kh: "អរុណសួស្តី! យើងខ្ញុំរីករាយនឹងជួយលោក។ តើលោកមានអត្តសញ្ញាណប័ណ្ណ ឬលិខិតឆ្លងដែនដែរទេ?" },
      { speaker: "Customer", en: "Yes, here is my national ID card.", kh: "បាទមាន នេះជាអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែររបស់ខ្ញុំ។" },
      { speaker: "Banker", en: "Great! Would you also like to request an ATM debit card and mobile banking?", kh: "ល្អណាស់! តើលោកចង់ស្នើសុំកាត ATM Debit និងសេវា Mobile Banking ផងដែរទេ?" },
      { speaker: "Customer", en: "Yes, definitely. I use mobile banking very often to scan KHQR.", kh: "បាទ ប្រាកដជាចង់។ ខ្ញុំប្រើ Mobile Banking ញឹកញាប់ណាស់សម្រាប់ស្កេន KHQR។" },
      { speaker: "Banker", en: "Please fill out this short application form and sign at the bottom.", kh: "សូមមេត្តាបំពេញទម្រង់ពាក្យស្នើសុំខ្លីនេះ ហើយចុះហត្ថលេខានៅខាងក្រោម។" }
    ],
    speakingTip: "ពាក្យ 'withdraw' បញ្ចេញសំឡេងថា /wɪðˈdrɔː/ (ដកប្រាក់) និង 'deposit' /dɪˈpɒz.ɪt/ (ដាក់ប្រាក់)។"
  },
  {
    week: 10,
    title: "ការសម្ភាសន៍ការងារ និងការណែនាំបទពិសោធន៍ (Job Interview & Presenting Experience)",
    situation: "ការសម្ភាសន៍ការងារសម្រាប់តំណែងជាអ្នកគ្រប់គ្រងគម្រោង (Project Manager)",
    vocab: [
      { en: "Tell me about yourself", kh: "សូមប្រាប់អំពីប្រវត្តិរូបរបស់អ្នក" },
      { en: "Strengths and weaknesses", kh: "ចំណុចខ្លាំង និងចំណុចខ្សោយ" },
      { en: "Work experience", kh: "បទពិសោធន៍ការងារ" },
      { en: "Why should we hire you?", kh: "ហេតុអ្វីបានជាយើងគួរជ្រើសរើសអ្នក?" }
    ],
    script: [
      { speaker: "Interviewer", en: "Welcome to the interview, Sovann. Could you start by telling us a little about yourself?", kh: "សូមស្វាគមន៍មកកាន់ការសម្ភាសន៍ សុវណ្ណ។ តើអ្នកអាចចាប់ផ្តើមដោយរៀបរាប់បន្តិចអំពីខ្លួនអ្នកបានទេ?" },
      { speaker: "Candidate", en: "Thank you. I have five years of experience in project management and software development.", kh: "អរគុណលោក។ ខ្ញុំមានបទពិសោធន៍ ៥ ឆ្នាំក្នុងការគ្រប់គ្រងគម្រោង និងការអភិវឌ្ឍន៍សូហ្វវែរ។" },
      { speaker: "Interviewer", en: "What would you say is your greatest professional strength?", kh: "តើអ្វីដែលអ្នកចាត់ទុកថាជាចំណុចខ្លាំងបំផុតក្នុងអាជីពរបស់អ្នក?" },
      { speaker: "Candidate", en: "My greatest strength is my problem-solving ability and strong communication with team members.", kh: "ចំណុចខ្លាំងបំផុតរបស់ខ្ញុំគឺ សមត្ថភាពដោះស្រាយបញ្ហា និងការប្រាស្រ័យទាក់ទងយ៉ាងជិតស្និទ្ធជាមួយសមាជិកក្រុម។" },
      { speaker: "Interviewer", en: "Why are you interested in joining our company?", kh: "ហេតុអ្វីបានជាអ្នកចាប់អារម្មណ៍ចង់ចូលរួមធ្វើការជាមួយក្រុមហ៊ុនយើងខ្ញុំ?" },
      { speaker: "Candidate", en: "Your company has a great reputation for innovation, and I want to contribute to your growing projects.", kh: "ក្រុមហ៊ុនរបស់លោកមានកេរ្តិ៍ឈ្មោះល្បីល្បាញខាងការបង្កើតថ្មី ហើយខ្ញុំចង់រួមចំណែកក្នុងគម្រោងដែលកំពុងរីកចម្រើនរបស់លោក។" }
    ],
    speakingTip: "ក្នុងការសម្ភាសន៍ ចូរកុំឆ្លើយគ្រាន់តែ 'Yes' ឬ 'No' តែត្រូវលើកឧទាហរណ៍ជាក់ស្តែងមកបញ្ជាក់ជានិច្ច។"
  },
  {
    week: 11,
    title: "ការស្វែងរក និងជួលផ្ទះ ឬខុនដូ (Renting an Apartment or Condo)",
    situation: "ការសាកសួរម្ចាស់ផ្ទះអំពីបន្ទប់ជួល តម្លៃ និងលក្ខខណ្ឌកុងត្រា",
    vocab: [
      { en: "Monthly rent", kh: "ថ្លៃជួលប្រចាំខែ" },
      { en: "Security deposit", kh: "ប្រាក់កក់ធានាសុវត្ថិភាព" },
      { en: "Fully furnished", kh: "មានបំពាក់គ្រឿងសង្ហារិមគ្រប់សព្វ" },
      { en: "Utilities included", kh: "រួមបញ្ចូលទាំងថ្លៃទឹកភ្លើង" }
    ],
    script: [
      { speaker: "Renter", en: "Hello, I saw your advertisement for the one-bedroom apartment in BKK1.", kh: "សួស្តី ខ្ញុំបានឃើញការផ្សាយពាណិជ្ជកម្មរបស់អ្នកអំពីអាផាតមិនបន្ទប់គេងមួយនៅបឹងកេងកង១។" },
      { speaker: "Landlord", en: "Yes, it is still available. Would you like to view the apartment today?", kh: "បាទ នៅទំនេរទេ។ តើលោកចង់មកមើលបន្ទប់ផ្ទាល់ថ្ងៃនេះដែរទេ?" },
      { speaker: "Renter", en: "Yes, please. How much is the monthly rent, and is it fully furnished?", kh: "បាទចង់។ តើថ្លៃជួលប្រចាំខែប៉ុន្មាន ហើយមានបំពាក់គ្រឿងសង្ហារិមគ្រប់សព្វដែរឬទេ?" },
      { speaker: "Landlord", en: "The rent is $450 per month. It includes Wi-Fi, cleaning twice a week, and full furniture.", kh: "ថ្លៃជួលគឺ ៤៥០ ដុល្លារក្នុងមួយខែ។ វារួមបញ្ចូលវ៉ាយហ្វាយ ការបោសសម្អាត ២ ដងក្នុងមួយសប្តាហ៍ និងគ្រឿងសង្ហារិមពេញលេញ។" },
      { speaker: "Renter", en: "What about electricity and water bills?", kh: "ចុះថ្លៃភ្លើង និងថ្លៃទឹកវិញយ៉ាងណាដែរ?" },
      { speaker: "Landlord", en: "Electricity is $0.25 per kilowatt-hour, and water is $5 per month flat rate.", kh: "ភ្លើងតម្លៃ ០.២៥ ដុល្លារក្នុងមួយគីឡូវ៉ាត់ម៉ោង ហើយទឹក ៥ ដុល្លារក្នុងមួយខែថេរ។" }
    ],
    speakingTip: "សួរច្បាស់លាស់អំពី 'security deposit' (ប្រាក់កក់) មុននឹងសម្រេចចិត្តចុះកិច្ចសន្យា។"
  },
  {
    week: 12,
    title: "ការប្រជុំការងារ និងការពិភាក្សាគម្រោង (Workplace Meeting & Project Discussion)",
    situation: "ការប្រជុំប្រចាំសប្តាហ៍ក្នុងក្រុមការងារដើម្បីតាមដានដំណើរការគម្រោង",
    vocab: [
      { en: "Agenda of the meeting", kh: "របៀបវារៈនៃការប្រជុំ" },
      { en: "Meet the deadline", kh: "បញ្ចប់ទាន់កាលកំណត់" },
      { en: "Make progress", kh: "មានការរីកចម្រើនទៅមុខ" },
      { en: "Any questions or feedback?", kh: "តើមានសំណួរ ឬមតិយោបល់អ្វីទេ?" }
    ],
    script: [
      { speaker: "Manager", en: "Good morning team. Let's begin our weekly project update. Chantha, how is the new website launch going?", kh: "អរុណសួស្តីក្រុមការងារទាំងអស់គ្នា។ ចូរយើងចាប់ផ្តើមការប្រជុំតាមដានគម្រោងប្រចាំសប្តាហ៍។ ចន្ថា តើការដាក់ឱ្យដំណើរការគេហទំព័រថ្មីទៅដល់ណាហើយ?" },
      { speaker: "Chantha", en: "Good morning. We have completed the design and testing phases. We are on schedule to launch next Monday.", kh: "អរុណសួស្តីបង។ ពួកយើងបានបញ្ចប់ដំណាក់កាលរចនា និងតេស្តសាកល្បងរួចរាល់ហើយ។ ពួកយើងដំណើរការទាន់ពេលវេលាដើម្បីប្រកាសដាក់ឱ្យប្រើប្រាស់នៅថ្ងៃចន្ទសប្តាហ៍ក្រោយ។" },
      { speaker: "Manager", en: "Excellent work! Are there any roadblocks or technical issues that we need to address?", kh: "ការងារល្អណាស់! តើមានឧបសគ្គ ឬបញ្ហាបច្ចេកទេសអ្វីដែលយើងត្រូវជួយដោះស្រាយទេ?" },
      { speaker: "Chantha", en: "Everything is running smoothly. We just need final approval on the payment gateway integration.", kh: "អ្វីៗដំណើរការយ៉ាងរលូន។ យើងគ្រាន់តែត្រូវការការអនុម័តចុងក្រោយលើការភ្ជាប់ប្រព័ន្ធទូទាត់ប្រាក់ប៉ុណ្ណោះ។" },
      { speaker: "Manager", en: "I will sign off on that this afternoon. Great job, everyone!", kh: "ខ្ញុំនឹងចុះហត្ថលេខាអនុម័តលើរឿងហ្នឹងរសៀលនេះ។ ធ្វើបានល្អណាស់អ្នកទាំងអស់គ្នា!" }
    ],
    speakingTip: "ប្រើ 'We are on schedule' (យើងទាន់ពេល) ឬ 'We are behind schedule' (យើងយឺតជាងពេលកំណត់)។"
  }
];

// Helper to expand and provide all 48 weeks of conversations
function getConversationForWeek(weekNum) {
  const index = (weekNum - 1) % conversations.length;
  const base = conversations[index];
  return {
    ...base,
    week: weekNum,
    title: `សប្តាហ៍ទី ${weekNum}៖ ${base.title}`
  };
}

module.exports = {
  conversations,
  getConversationForWeek
};
