const fs = require('fs');

const grammarTopics = [
  {
    topic: "Nouns (នាម)",
    def: "នាម (Noun) គឺជាពាក្យដែលប្រើសម្រាប់សម្គាល់ឈ្មោះ មនុស្ស សត្វ វត្ថុ ទីកន្លែង រុក្ខជាតិ ឬគំនិតអរូបី។",
    types: "១. Proper Nouns (នាមអសាធារណ៍ ត្រូវសរសេរអក្សរធំ): Cambodia, Phnom Penh, John\n២. Common Nouns (នាមសាធារណ៍ទូទៅ): teacher, city, book, computer\n៣. Concrete Nouns (នាមរូបិយមើលឃើញ/ប៉ះបាន): car, house, mobile phone\n៤. Abstract Nouns (នាមអរូបីមើលមិនឃើញ): success, happiness, knowledge, freedom",
    examples: [
      { en: "The dedicated teacher explains the English grammar clearly.", kh: "លោកគ្រូដែលខិតខំប្រឹងប្រែងបានពន្យល់វេយ្យាករណ៍ភាសាអង់គ្លេសយ៉ាងច្បាស់លាស់។" },
      { en: "Phnom Penh is developing very rapidly with many modern buildings.", kh: "រាជធានីភ្នំពេញកំពុងអភិវឌ្ឍយ៉ាងលឿនជាមួយនឹងអគារទំនើបៗជាច្រើន។" },
      { en: "True happiness comes from helping others and continuous learning.", kh: "សុភមង្គលពិតប្រាកដកើតចេញពីការជួយអ្នកដទៃ និងការរៀនសូត្រឥតឈប់ឈរ។" },
      { en: "She bought a new laptop and several business books yesterday.", kh: "នាងបានទិញកុំព្យូទ័រយួរដៃថ្មីមួយ និងសៀវភៅជំនួញជាច្រើនក្បាលកាលពីម្សិលមិញ។" }
    ],
    mistake: "❌ ខុស: angkor wat is in cambodia.\n✅ ត្រូវ: Angkor Wat is in Cambodia. (នាមអសាធារណ៍ត្រូវតែសរសេរអក្សរធំជានិច្ច!)",
    practice: "ចូរកំណត់ថាតើពាក្យណាខ្លះជានាមក្នុងប្រយោគនេះ៖ 'The smart student reads many interesting books in the library.'"
  },
  {
    topic: "Plural Nouns (នាមពហុវចនៈ)",
    def: "នាមពហុវចនៈ (Plural Nouns) គឺជានាមដែលបញ្ជាក់ពីចំនួនចាប់ពី ២ ឡើងទៅ។",
    types: "១. នាមទូទៅថែម 's': book -> books, student -> students\n២. បញ្ចប់ដោយ s, ss, sh, ch, x, z ថែម 'es': bus -> buses, watch -> watches, box -> boxes\n៣. ព្យញ្ជនៈ + y ប្តូរទៅ 'ies': city -> cities, baby -> babies\n៤. បញ្ចប់ដោយ f/fe ប្តូរទៅ 'ves': knife -> knives, leaf -> leaves\n៥. នាមមិនទៀងទាត់ (Irregular): man -> men, woman -> women, child -> children, tooth -> teeth, person -> people",
    examples: [
      { en: "Many international tourists visit ancient temples every year.", kh: "ភ្ញៀវទេសចរអន្តរជាតិជាច្រើនមកទស្សនាប្រាសាទបុរាណជារៀងរាល់ឆ្នាំ។" },
      { en: "The children are playing happily in the school garden.", kh: "ក្មេងៗកំពុងលេងកម្សាន្តយ៉ាងសប្បាយរីករាយនៅក្នុងសួនច្បារសាលារៀន។" },
      { en: "We need three new laptops and five computer mice for our new staff.", kh: "យើងក្រោមកុំព្យូទ័រយួរដៃថ្មីចំនួន ៣ គ្រឿង និង Mouse ចំនួន ៥ សម្រាប់បុគ្គលិកថ្មីរបស់យើង។" },
      { en: "The chef sharpened all the kitchen knives before preparing dinner.", kh: "មេចុងភៅបានសំលៀងកាំបិតផ្ទះបាយទាំងអស់ មុនពេលរៀបចំអាហារពេលល្ងាច។" }
    ],
    mistake: "❌ ខុស: There are five childs in the classroom.\n✅ ត្រូវ: There are five children in the classroom. (child -> children មិនថែម s ទេ)",
    practice: "ចូរប្តូរនាមខាងក្រោមទៅជាពហុវចនៈ៖ city, tomato, leaf, woman, box."
  },
  {
    topic: "Uncountable Nouns (នាមរាប់មិនបាន)",
    def: "នាមរាប់មិនបាន (Uncountable Nouns) គឺជានាមដែលមិនអាចរាប់ជាចំនួន ១, ២, ៣ ដោយផ្ទាល់បានទេ គ្មានទម្រង់ពហុវចនៈ និងប្រើជាមួយកិរិយាសព្ទឯកវចនៈ។",
    types: "• វត្ថុរាវ៖ water, milk, coffee, tea, oil\n• គ្រាប់ល្អិតៗ៖ rice, sugar, salt, sand, flour\n• គំនិត និងព័ត៌មាន៖ information, advice, news, knowledge, homework\n• នាមជាក្រុម៖ money, furniture, luggage, equipment\n• របៀបរាប់៖ ត្រូវប្រើពាក្យរង្វាស់ (a bottle of water, a piece of advice, a cup of tea, a bag of rice)",
    examples: [
      { en: "Can you give me some helpful advice about learning spoken English?", kh: "តើអ្នកអាចផ្តល់ដំបូន្មានល្អៗខ្លះដល់ខ្ញុំអំពីការរៀននិយាយភាសាអង់គ្លេសបានទេ?" },
      { en: "She drinks three cups of green tea every day for her health.", kh: "នាងពិសាទឹកតែបៃតង ៣ ពែងរាល់ថ្ងៃដើម្បីសុខភាពរបស់នាង។" },
      { en: "We don't have much information about the new scholarship yet.", kh: "ពួកយើងមិនទាន់មានព័ត៌មានច្រើនអំពីអាហារូបករណ៍ថ្មីនេះនៅឡើយទេ។" },
      { en: "Drinking enough clean water keeps your mind and body active.", kh: "ការទទួលទានទឹកស្អាតឱ្យបានគ្រប់គ្រាន់ ជួយឱ្យខួរក្បាល និងរាងកាយរបស់អ្នកស្វាហាប់។" }
    ],
    mistake: "❌ ខុស: I have many homeworks today.\n✅ ត្រូវ: I have a lot of homework today. (homework រាប់មិនបាន មិនអាចថែម s ឡើយ)",
    practice: "ចូរជ្រើសរើសពាក្យត្រឹមត្រូវ៖ 'He gave me (a / some) useful information.'"
  },
  {
    topic: "Possessive Nouns (នាមកម្មសិទ្ធិ)",
    def: "នាមកម្មសិទ្ធិ ប្រើសម្រាប់បញ្ជាក់ភាពជាម្ចាស់លើវត្ថុ ឬទំនាក់ទំនងរវាងមនុស្ស ដោយប្រើសញ្ញា Apostrophe ('s)។",
    types: "១. នាមឯកវចនៈ៖ Noun + 's (the teacher's book, Sokha's car)\n២. នាមពហុវចនៈមាន s៖ Noun + ' (the students' classroom, my parents' house)\n៣. នាមពហុវចនៈគ្មាន s៖ Noun + 's (the children's toys, women's rights)",
    examples: [
      { en: "The company's CEO announced a major expansion plan today.", kh: "នាយកប្រតិបត្តិ (CEO) របស់ក្រុមហ៊ុនបានប្រកាសពីផែនការពង្រីកអាជីវកម្មដ៏ធំនៅថ្ងៃនេះ។" },
      { en: "I borrowed my brother's motorcycle to go to the supermarket.", kh: "ខ្ញុំបានខ្ចីម៉ូតូរបស់បងប្រុសខ្ញុំ ដើម្បីទៅផ្សារទំនើប។" },
      { en: "The students' examination results were exceptionally outstanding.", kh: "លទ្ធផលប្រឡងរបស់សិស្សានុសិស្សទាំងឡាយគឺល្អប្រសើរគួរឱ្យកត់សម្គាល់។" },
      { en: "Sarah's English presentation won the first prize in the competition.", kh: "បទបង្ហាញភាសាអង់គ្លេសរបស់សារ៉ាបានឈ្នះរង្វាន់លេខមួយក្នុងការប្រកួត។" }
    ],
    mistake: "❌ ខុស: The phone of my sister is new.\n✅ ត្រូវ: My sister's phone is new. (ប្រើ 's គឺមានលក្ខណៈធម្មជាតិ និងត្រឹមត្រូវជាង)",
    practice: "ចូរសរសេរជាទម្រង់កម្មសិទ្ធិ៖ 'The house belonging to Mr. David'."
  },
  {
    topic: "Compound Nouns (នាមសមាស)",
    def: "នាមសមាស គឺជាការរួមផ្សំគ្នានៃពាក្យពីរ ឬច្រើន ដើម្បីបង្កើតបានជានាមថ្មីមួយដែលមានអត្ថន័យជាក់លាក់។",
    types: "• Noun + Noun: bedroom (បន្ទប់គេង), toothbrush (ច្រាសដុសធ្មេញ), textbook (សៀវភៅពុម្ព)\n• Adjective + Noun: blackboard (ក្តារខៀន), smartphone (ទូរស័ព្ទឆ្លាតវៃ), full moon (ព្រះចន្ទពេញបូណ៌មី)\n• Verb(-ing) + Noun: swimming pool (អាងហែលទឹក), washing machine (ម៉ាស៊ីនបោកខោអាវ)",
    examples: [
      { en: "Don't forget to pack your toothbrush and toothpaste for the trip.", kh: "កុំភ្លេចច្រកច្រាសដុសធ្មេញ និងថ្នាំដុសធ្មេញរបស់អ្នកសម្រាប់ដំណើរកម្សាន្ត។" },
      { en: "Our hotel features an Olympic-sized swimming pool on the rooftop.", kh: "សណ្ឋាគាររបស់យើងមានអាងហែលទឹកខ្នាតអូឡាំពិកនៅលើដំបូលអគារ។" },
      { en: "She bought a new washing machine that saves energy and water.", kh: "នាងបានទិញម៉ាស៊ីនបោកគក់ថ្មីមួយដែលសន្សំសំចៃថាមពល និងទឹក។" },
      { en: "You need a valid passport and your boarding pass at the airport gate.", kh: "អ្នកត្រូវការលិខិតឆ្លងដែនដែលមានសុពលភាព និងសំបុត្រឡើងយន្តហោះនៅច្រកទ្វារព្រលានយន្តហោះ។" }
    ],
    mistake: "❌ ខុស: swimming-pools (ពហុវចនៈត្រូវថែមលើនាមចុងក្រោយ)\n✅ ត្រូវ: swimming pools",
    practice: "ចូរស្វែងរកនាមសមាស ៣ ពាក្យដែលអ្នកប្រើប្រាស់ជារៀងរាល់ថ្ងៃ។"
  },
  {
    topic: "Adjectives (គុណនាម)",
    def: "គុណនាម (Adjectives) គឺជាពាក្យដែលប្រើសម្រាប់បញ្ជាក់ន័យ បន្ថែមលក្ខណៈ ឬពណ៌នាអំពីនាម (Noun)។",
    types: "• ទីតាំងទី១៖ នៅពីមុខនាម (Adjective + Noun): a beautiful girl, a big house\n• ទីតាំងទី២៖ នៅខាងក្រោយកិរិយាសព្ទ To Be ឬ Linking Verbs: She is smart, The soup tastes delicious",
    examples: [
      { en: "She is an intelligent and hardworking student.", kh: "នាងគឺជាសិស្សស្រីដ៏ឆ្លាតវៃ និងឧស្សាហ៍ព្យាយាមម្នាក់។" },
      { en: "The new marketing strategy was extremely successful.", kh: "យុទ្ធសាស្ត្រទីផ្សារថ្មីគឺទទួលបានជោគជ័យយ៉ាងខ្លាំង។" },
      { en: "Cambodia has many wonderful historic destinations to explore.", kh: "ប្រទេសកម្ពុជាមានគោលដៅប្រវត្តិសាស្ត្រដ៏អស្ចារ្យជាច្រើនសម្រាប់ទស្សនាកម្សាន្ត។" },
      { en: "This cup of hot coffee smells absolutely amazing.", kh: "កាហ្វេក្តៅមួយពែងនេះមានក្លិនឈ្ងុយគួរឱ្យចង់ពិសាខ្លាំងណាស់។" }
    ],
    mistake: "❌ ខុស: She has eyes blue. (ភាសាខ្មែរដាក់ក្រោយ តែអង់គ្លេសគុណនាមត្រូវនៅមុខនាម!)\n✅ ត្រូវ: She has blue eyes.",
    practice: "ចូរបញ្ចូលគុណនាម 'expensive' ទៅក្នុងប្រយោគ៖ 'He drives a car.'"
  },
  {
    topic: "Comparative Adjectives (គុណនាមប្រៀបធៀប)",
    def: "គុណនាមកម្រិតប្រៀបធៀប ប្រើសម្រាប់ប្រៀបធៀបមនុស្ស ឬវត្ថុ ២ នាក់/២ យ៉ាង។",
    types: "១. ព្យាង្គខ្លី (១ ព្យាង្គ)៖ adj + er + than (taller than, faster than, bigger than)\n២. ២ ព្យាង្គបញ្ចប់ដោយ y៖ adj(ier) + than (happier than, easier than)\n៣. ព្យាង្គវែង (២ ព្យាង្គឡើង)៖ more + adj + than (more expensive than, more beautiful than)\n៤. មិនទៀងទាត់ (Irregular)៖ good -> better than, bad -> worse than, far -> further than",
    examples: [
      { en: "Studying English online with StudyAI is much faster than self-study alone.", kh: "ការរៀនភាសាអង់គ្លេសអនឡាញជាមួយ StudyAI គឺលឿនជាងការរៀនតែឯងឆ្ងាយណាស់។" },
      { en: "This modern electric car is more economical than my old gasoline vehicle.", kh: "រថយន្តអគ្គិសនីទំនើបនេះគឺសន្សំសំចៃជាងរថយន្តសាំងចាស់របស់ខ្ញុំ។" },
      { en: "Today's weather is significantly cooler than yesterday's scorching heat.", kh: "អាកាសធាតុថ្ងៃនេះគឺត្រជាក់ជាងកម្តៅដ៏ក្តៅគគុកកាលពីម្សិលមិញយ៉ាងខ្លាំង។" },
      { en: "Sophea speaks English better than anyone else in our study group.", kh: "សុភា និយាយភាសាអង់គ្លេសបានល្អជាងអ្នកណាៗទាំងអស់នៅក្នុងក្រុមសិក្សារបស់យើង។" }
    ],
    mistake: "❌ ខុស: This phone is more cheap than that one.\n✅ ត្រូវ: This phone is cheaper than that one. (cheap ជាព្យាង្គខ្លី ប្រើ cheaper មិនមែន more cheap ទេ)",
    practice: "ចូរប្តូរគុណនាម 'difficult' ទៅជាទម្រង់ប្រៀបធៀប។"
  },
  {
    topic: "Superlative Adjectives (គុណនាមបំផុត)",
    def: "គុណនាមកម្រិតបំផុត ប្រើដើម្បីប្រៀបធៀបមនុស្ស ឬវត្ថុ ចាប់ពី ៣ ឡើងទៅ ដើម្បីបង្ហាញថាអ្នកណា ឬរបស់ណាដែលលើសគេបង្អស់។",
    types: "១. ព្យាង្គខ្លី៖ the + adj-est (the tallest, the fastest, the biggest)\n២. បញ្ចប់ដោយ y៖ the + adj-iest (the easiest, the happiest)\n៣. ព្យាង្គវែង៖ the most + adj (the most expensive, the most comfortable)\n៤. មិនទៀងទាត់៖ good -> the best, bad -> the worst, far -> the furthest",
    examples: [
      { en: "Angkor Wat is the most famous historical attraction in Cambodia.", kh: "ប្រាសាទអង្គរវត្ត គឺជាតំបន់ទាក់ទាញប្រវត្តិសាស្ត្រដ៏ល្បីល្បាញបំផុតនៅក្នុងប្រទេសកម្ពុជា។" },
      { en: "He is the most experienced software developer on our entire team.", kh: "គាត់គឺជាអ្នកអភិវឌ្ឍន៍សូហ្វវែរដែលមានបទពិសោធន៍ច្រើនជាងគេបំផុតនៅក្នុងក្រុមទាំងមូលរបស់យើង។" },
      { en: "This is the best opportunity you will ever get to learn English.", kh: "នេះគឺជាឱកាសដ៏ល្អបំផុតដែលអ្នកនឹងទទួលបានដើម្បីរៀនភាសាអង់គ្លេស។" },
      { en: "What is the highest mountain peak in Southeast Asia?", kh: "តើកំពូលភ្នំណាដែលខ្ពស់ជាងគេបំផុតនៅតំបន់អាស៊ីអាគ្នេយ៍?" }
    ],
    mistake: "❌ ខុស: He is smartest boy in the school.\n✅ ត្រូវ: He is the smartest boy in the school. (ត្រូវតែមានពាក្យ 'the' នៅពីមុខជានិច្ច!)",
    practice: "ចូរបង្កើតល្បះមួយដោយប្រើ 'the most interesting'."
  },
  {
    topic: "Personal Pronouns (សព្វនាមបុគ្គល)",
    def: "សព្វនាមបុគ្គលជាប្រធាន (Subject Pronouns) ប្រើសម្រាប់ជំនួសនាមជាប្រធាននៃល្បះ ដើម្បីកុំឱ្យនិយាយឈ្មោះដដែលៗ។",
    types: "• បុរសទី១ (អ្នកនិយាយ): I (ខ្ញុំ), We (ពួកយើង)\n• បុរសទី២ (អ្នកស្តាប់): You (អ្នក/អ្នកទាំងអស់គ្នា)\n• បុរសទី៣ (អ្នកដែលគេនិយាយដល់): He (គាត់ - បុរស), She (នាង - ស្ត្រី), It (វា - វត្ថុ/សត្វ), They (ពួកគេ)",
    examples: [
      { en: "I practice English speaking for thirty minutes every single day.", kh: "ខ្ញុំហ្វឹកហាត់និយាយភាសាអង់គ្លេសរយៈពេល ៣០ នាទីជារៀងរាល់ថ្ងៃ។" },
      { en: "She is a skilled accountant working for a leading multinational bank.", kh: "នាងគឺជាគណនេយ្យករដ៏ជំនាញម្នាក់ដែលធ្វើការឱ្យធនាគារពហុជាតិឈានមុខគេមួយ។" },
      { en: "They are organizing a major business summit in Siem Reap next week.", kh: "ពួកគេកំពុងរៀបចំកិច្ចប្រជុំកំពូលធុរកិច្ចដ៏ធំមួយនៅខេត្តសៀមរាបនៅសប្តាហ៍ក្រោយ។" },
      { en: "We are determined to achieve our fluency goals this year.", kh: "ពួកយើងប្តេជ្ញាចិត្តសម្រេចឱ្យបាននូវគោលដៅនិយាយភាសាអង់គ្លេសឱ្យស្ទាត់ក្នុងឆ្នាំនេះ។" }
    ],
    mistake: "❌ ខុស: My friend and me went to the library.\n✅ ត្រូវ: My friend and I went to the library. (ពេលធ្វើជាប្រធាន ត្រូវប្រើ I មិនមែន me ទេ)",
    practice: "ចូរជំនួសពាក្យ 'Sokha and Dara' ដោយសព្វនាមសមស្រប។"
  },
  {
    topic: "Object Pronouns (សព្វនាមកម្មបទ)",
    def: "សព្វនាមកម្មបទ (Object Pronouns) ប្រើសម្រាប់ជំនួសនាមដែលទទួលរងអំពើ ហើយស្ថិតនៅខាងក្រោយកិរិយាសព្ទ ឬធ្នាក់ (Prepositions)។",
    types: "• I -> me (ខ្ញុំ)\n• You -> you (អ្នក)\n• We -> us (ពួកយើង)\n• They -> them (ពួកគេ)\n• He -> him (គាត់)\n• She -> her (នាង)\n• It -> it (វា)",
    examples: [
      { en: "The teacher gave us detailed feedback on our writing assignments.", kh: "លោកគ្រូបានផ្តល់មតិកែលម្អយ៉ាងក្បោះក្បាយដល់ពួកយើងលើកិច្ចការតែងសេចក្តី។" },
      { en: "I saw him at the international business conference yesterday.", kh: "ខ្ញុំបានឃើញគាត់នៅក្នុងសន្និសីទធុរកិច្ចអន្តរជាតិកាលពីម្សិលមិញ។" },
      { en: "Could you please send the updated contract to them as soon as possible?", kh: "តើអ្នកអាចមេត្តាផ្ញើកិច្ចសន្យាដែលបានកែសម្រួលរួចទៅកាន់ពួកគេឱ្យបានឆាប់បំផុតបានទេ?" },
      { en: "She called me last night to discuss the weekend study schedule.", kh: "នាងបានទូរស័ព្ទមកខ្ញុំកាលពីយប់មិញដើម្បីពិភាក្សាអំពីកាលវិភាគរៀនចុងសប្តាហ៍។" }
    ],
    mistake: "❌ ខុស: He gave the book to I.\n✅ ត្រូវ: He gave the book to me. (នៅក្រោយធ្នាក់ 'to' ត្រូវប្រើកម្មបទ 'me')",
    practice: "ចូរជ្រើសរើសសព្វនាមត្រឹមត្រូវ៖ 'Please contact (he / him) immediately.'"
  },
  {
    topic: "Reflexive Pronouns (សព្វនាមខ្លួនឯង)",
    def: "សព្វនាមបញ្ជាក់ខ្លួនឯង បញ្ចប់ដោយ '-self' (ឯកវចនៈ) ឬ '-selves' (ពហុវចនៈ) ប្រើនៅពេលដែលប្រធាន និងកម្មបទជាមនុស្សតែមួយ ឬប្រើដើម្បីបញ្ជាក់ការធ្វើដោយខ្លួនឯងផ្ទាល់។",
    types: "• myself (ខ្លួនខ្ញុំផ្ទាល់), yourself (ខ្លួនអ្នក), himself (ខ្លួនគាត់), herself (ខ្លួននាង), itself (ខ្លួនវា)\n• ourselves (ខ្លួនពួកយើង), yourselves (ខ្លួនអ្នកទាំងអស់គ្នា), themselves (ខ្លួនពួកគេ)",
    examples: [
      { en: "I built this entire online learning web application myself.", kh: "ខ្ញុំបានបង្កើតវេបសាយកម្មវិធីសិក្សាអនឡាញទាំងមូលនេះដោយខ្លួនខ្ញុំផ្ទាល់។" },
      { en: "She taught herself how to code and speak English fluently.", kh: "នាងបានបង្រៀនខ្លួនឯងឱ្យចេះសរសេរកូដ និងនិយាយភាសាអង់គ្លេសបានយ៉ាងស្ទាត់។" },
      { en: "Take good care of yourselves during the rainy season.", kh: "សូមថែរក្សាខ្លួនអ្នកទាំងអស់គ្នាឱ្យបានល្អក្នុងអំឡុងរដូវវស្សានេះ។" },
      { en: "He looked at himself in the mirror and smiled with confidence.", kh: "គាត់បានសម្លឹងមើលខ្លួនគាត់នៅក្នុងកញ្ចក់ ហើយញញឹមប្រកបដោយទំនុកចិត្ត។" }
    ],
    mistake: "❌ ខុស: They did the homework by theirselves.\n✅ ត្រូវ: They did the homework by themselves. (ពាក្យត្រូវគឺ themselves មិនមែន theirselves ទេ)",
    practice: "ចូរជ្រើសរើសពាក្យត្រឹមត្រូវ៖ 'She made this delicious cake (her / herself).'"
  },
  {
    topic: "Demonstrative Pronouns (សព្វនាមចង្អុល)",
    def: "សព្វនាមចង្អុល ប្រើសម្រាប់ចង្អុលបង្ហាញវត្ថុ ឬមនុស្ស ដោយផ្អែកលើចម្ងាយ (ជិត ឬ ឆ្ងាយ) និងចំនួន (ឯកវចនៈ ឬ ពហុវចនៈ)។",
    types: "• This (នេះ): ឯកវចនៈ នៅជិត (This is my book)\n• That (នោះ): ឯកវចនៈ នៅឆ្ងាយ (That is a tall building)\n• These (ទាំងនេះ): ពហុវចនៈ នៅជិត (These are my keys)\n• Those (ទាំងនោះ): ពហុវចនៈ នៅឆ្ងាយ (Those are beautiful flowers)",
    examples: [
      { en: "This is the most helpful English grammar guide I have ever read.", kh: "នេះគឺជាសៀវភៅណែនាំវេយ្យាករណ៍ភាសាអង់គ្លេសដែលមានប្រយោជន៍បំផុតដែលខ្ញុំធ្លាប់បានអាន។" },
      { en: "That company over there has been operating in Phnom Penh since 2010.", kh: "ក្រុមហ៊ុននៅទីនោះបានដំណើរការនៅក្នុងរាជធានីភ្នំពេញតាំងពីឆ្នាំ ២០១០ មកម្ល៉េះ។" },
      { en: "These sentences are great examples of professional workplace communication.", kh: "ប្រយោគទាំងនេះគឺជាឧទាហរណ៍ដ៏អស្ចារ្យនៃការប្រាស្រ័យទាក់ទងក្នុងកន្លែងធ្វើការប្រកបដោយវិជ្ជាជីវៈ។" },
      { en: "Those mountains in the distance look magnificent during sunrise.", kh: "ជួរភ្នំទាំងនោះនៅឯនាយមើលទៅពិតជាអស្ចារ្យណាស់ក្នុងអំឡុងពេលព្រះអាទិត្យរះ។" }
    ],
    mistake: "❌ ខុស: These car is expensive.\n✅ ត្រូវ: This car is expensive. (ឬ These cars are expensive)",
    practice: "ចូរជ្រើសរើសពាក្យត្រឹមត្រូវ៖ '(This / These) documents are strictly confidential.'"
  },
  {
    topic: "Indefinite Pronouns (សព្វនាមមិនកំណត់)",
    def: "សព្វនាមមិនកំណត់ ប្រើសម្រាប់សំដៅលើមនុស្ស វត្ថុ ឬទីកន្លែង ដោយមិនបញ្ជាក់ច្បាស់លាស់។ ភាគច្រើនចាត់ទុកជាឯកវចនៈ និងប្រើជាមួយកិរិយាសព្ទឯកវចនៈ (Singular Verb)។",
    types: "• មនុស្ស៖ someone / somebody (នរណាម្នាក់), anyone / anybody (នរណាម្នាក់/អ្នកណា), everyone / everybody (អ្នករាល់គ្នា), no one / nobody (គ្មាននរណាម្នាក់)\n• វត្ថុ៖ something (អ្វីមួយ), anything (អ្វីមួយ), everything (អ្វីៗទាំងអស់), nothing (គ្មានអ្វីសោះ)\n• ទីកន្លែង៖ somewhere (កន្លែងណាមួយ), anywhere, everywhere, nowhere",
    examples: [
      { en: "Everyone in our online class is working hard to improve their speaking.", kh: "អ្នករាល់គ្នានៅក្នុងថ្នាក់អនឡាញរបស់យើងកំពុងខិតខំប្រឹងប្រែងដើម្បីកែលម្អការនិយាយរបស់ពួកគេ។" },
      { en: "Is there anyone here who can translate this document into English?", kh: "តើមាននរណាម្នាក់នៅទីនេះដែលអាចបកប្រែឯកសារនេះទៅជាភាសាអង់គ្លេសបានទេ?" },
      { en: "There is something wrong with the internet connection this afternoon.", kh: "មានអ្វីមួយមិនប្រក្រតីជាមួយការតភ្ជាប់អ៊ីនធឺណិតនៅរសៀលនេះ។" },
      { en: "Nobody knows the exact secret to success without hard work.", kh: "គ្មាននរណាម្នាក់ដឹងពីអាថ៌កំបាំងនៃភាពជោគជ័យដោយគ្មានការខិតខំប្រឹងប្រែងនោះឡើយ។" }
    ],
    mistake: "❌ ខុស: Everyone are happy today.\n✅ ត្រូវ: Everyone is happy today. (Everyone ចាត់ទុកជាឯកវចនៈ ត្រូវប្រើ 'is')",
    practice: "ចូរជ្រើសរើសកិរិយាសព្ទត្រឹមត្រូវ៖ 'Somebody (has / have) left their umbrella here.'"
  },
  {
    topic: "Present Simple Tense",
    def: "បច្ចុប្បន្នកាលធម្មតា ប្រើសម្រាប់ទម្លាប់ប្រចាំថ្ងៃ ការពិតទូទៅ ឬច្បាប់ធម្មជាតិ។",
    types: "(+) S + V1(s/es) + O\n(-) S + do/does not + V1 + O\n(?) Do/Does + S + V1 + O?\n(I/You/We/They ប្រើ V1 / do | He/She/It ប្រើ V1(s/es) / does)",
    examples: [
      { en: "He studies English vocabulary and grammar for one hour every morning.", kh: "គាត់រៀនវាក្យសព្ទ និងវេយ្យាករណ៍ភាសាអង់គ្លេសរយៈពេលមួយម៉ោងជារៀងរាល់ព្រឹក។" },
      { en: "She doesn't drink coffee after 4:00 PM because it affects her sleep.", kh: "នាងមិនពិសាកាហ្វេក្រោយម៉ោង ៤:០០ រសៀលនោះទេ ពីព្រោះវាប៉ះពាល់ដល់ការគេងរបស់នាង។" },
      { en: "Do you practice English conversation with your classmates every week?", kh: "តើអ្នកហ្វឹកហាត់ការសន្ទនាភាសាអង់គ្លេសជាមួយមិត្តរួមថ្នាក់ជារៀងរាល់សប្តាហ៍ដែរឬទេ?" },
      { en: "Water boils at 100 degrees Celsius at standard atmospheric pressure.", kh: "ទឹកពុះនៅសីតុណ្ហភាព ១០០ អង្សាសេក្នុងកម្រិតសម្ពាធបរិយាកាសស្តង់ដារ។" }
    ],
    mistake: "❌ ខុស: She go to market every Sunday.\n✅ ត្រូវ: She goes to market every Sunday. (កិរិយាសព្ទជាមួយ She ត្រូវថែម es)",
    practice: "ចូរប្តូរប្រយោគនេះជាទម្រង់បដិសេធ៖ 'He likes spicy food.'"
  },
  {
    topic: "Present Continuous Tense",
    def: "បច្ចុប្បន្នកាលកំពុងបន្ត ប្រើសម្រាប់សកម្មភាពដែលកំពុងតែកើតឡើងនៅពេលកំពុងនិយាយ ឬផែនការអនាគតជិត។",
    types: "(+) S + am/is/are + V-ing + O\n(-) S + am not/isn't/aren't + V-ing + O\n(?) Am/Is/Are + S + V-ing + O?\n(Signal words: now, right now, at the moment, currently, Look!, Listen!)",
    examples: [
      { en: "I am currently preparing for the international English proficiency test.", kh: "បច្ចុប្បន្ននេះ ខ្ញុំកំពុងតែរៀបចំខ្លួនសម្រាប់ការប្រឡងសមត្ថភាពភាសាអង់គ្លេសកម្រិតអន្តរជាតិ។" },
      { en: "Listen! The professor is explaining an important concept right now.", kh: "ស្តាប់ន៎! សាស្ត្រាចារ្យកំពុងតែពន្យល់អំពីទ្រឹស្តីដ៏សំខាន់មួយនៅពេលនេះ។" },
      { en: "They aren't working today because it is a national public holiday.", kh: "ពួកគេមិនកំពុងធ្វើការនៅថ្ងៃនេះទេ ពីព្រោះវាជាថ្ងៃឈប់សម្រាកបុណ្យជាតិ។" },
      { en: "We are meeting our marketing partners at the café at 2:00 PM today.", kh: "ពួកយើងនឹងជួបដៃគូទីផ្សារនៅហាងកាហ្វេនៅម៉ោង ២:០០ រសៀលថ្ងៃនេះ។" }
    ],
    mistake: "❌ ខុស: I am wanting to go home now.\n✅ ត្រូវ: I want to go home now. (កិរិយាសព្ទ want មិនប្រើក្នុងទម្រង់ Continuous ទេ)",
    practice: "ចូរប្តូរប្រយោគនេះទៅជា Present Continuous៖ 'She (write) an email to the client now.'"
  },
  {
    topic: "Past Simple Tense",
    def: "អតីតកាលធម្មតា ប្រើសម្រាប់សកម្មភាពដែលបានកើតឡើង និងបានបញ្ចប់ទាំងស្រុងក្នុងអតីតកាល ដោយមានពេលវេលាជាក់លាក់។",
    types: "(+) S + V2 + O\n(-) S + did not (didn't) + V1 + O\n(?) Did + S + V1 + O?\n(Signal words: yesterday, last night, last year, 2 days ago, in 2021)",
    examples: [
      { en: "We launched our online English academy platform three months ago.", kh: "ពួកយើងបានចាប់ផ្តើមដំណើរការវេទិកាសាលាភាសាអង់គ្លេសអនឡាញកាលពី ៣ ខែមុន។" },
      { en: "She didn't attend the business seminar yesterday due to heavy traffic.", kh: "នាងមិនបានចូលរួមសិក្ខាសាលាធុរកិច្ចកាលពីម្សិលមិញទេ ដោយសារការកកស្ទះចរាចរណ៍ខ្លាំង។" },
      { en: "Did you receive the official certificate after passing the final exam?", kh: "តើអ្នកបានទទួលវិញ្ញាបនបត្រផ្លូវការបន្ទាប់ពីប្រឡងជាប់ការប្រឡងបញ្ចប់វគ្គដែរឬទេ?" },
      { en: "They went to Siem Reap and visited many magnificent temples.", kh: "ពួកគេបានទៅខេត្តសៀមរាប ហើយបានទស្សនាប្រាសាទដ៏អស្ចារ្យជាច្រើន។" }
    ],
    mistake: "❌ ខុស: Did you saw the movie last night?\n✅ ត្រូវ: Did you see the movie last night? (មាន Did ត្រូវប្រើ V1 គឺ see មិនមែន saw ទេ)",
    practice: "ចូរប្តូរ 'buy' ទៅជា Past Simple (V2) ក្នុងប្រយោគ៖ 'He ___ a new car yesterday.'"
  },
  {
    topic: "Past Continuous Tense",
    def: "អតីតកាលកំពុងបន្ត ប្រើសម្រាប់សកម្មភាពកំពុងកើតឡើងនៅពេលជាក់លាក់ក្នុងអតីតកាល ឬកំពុងកើតឡើងស្រាប់តែមានសកម្មភាពមួយទៀតចូលមកកាត់ផ្តាច់ (When / While)។",
    types: "(+) S + was/were + V-ing + O\n(-) S + wasn't/weren't + V-ing + O\n(?) Was/Were + S + V-ing + O?\n(I/He/She/It ប្រើ was | You/We/They ប្រើ were)",
    examples: [
      { en: "I was practicing my English pronunciation when the power suddenly went out.", kh: "ខ្ញុំកំពុងតែហ្វឹកហាត់បញ្ចេញសំឡេងភាសាអង់គ្លេស ស្រាប់តែដាច់ចរន្តអគ្គិសនីភ្លាមៗ។" },
      { en: "At 9:00 PM yesterday, we were reviewing the monthly marketing report.", kh: "នៅម៉ោង ៩:០០ យប់មិញ ពួកយើងកំពុងត្រួតពិនិត្យរបាយការណ៍ទីផ្សារប្រចាំខែ។" },
      { en: "While Sophea was cooking dinner, her brother was doing his homework.", kh: "ខណៈពេលដែលសុភាកំពុងចម្អិនអាហារពេលល្ងាច ប្អូនប្រុសរបស់នាងកំពុងធ្វើកិច្ចការផ្ទះ។" },
      { en: "Were you sleeping when I called you last night?", kh: "តើអ្នកកំពុងគេងលក់ឬ នៅពេលដែលខ្ញុំទូរស័ព្ទទៅអ្នកកាលពីយប់មិញ?" }
    ],
    mistake: "❌ ខុស: They was watching television when I arrived.\n✅ ត្រូវ: They were watching television when I arrived. (They ប្រើ were)",
    practice: "ចូរបំពេញចន្លោះ៖ 'I (study) ___ when he knocked on the door.'"
  },
  {
    topic: "Present Perfect Tense",
    def: "បច្ចុប្បន្នកាលបរិបូរណ៍ ប្រើសម្រាប់សកម្មភាពកើតក្នុងអតីតកាលបន្តដល់បច្ចុប្បន្ន បទពិសោធន៍ជីវិត ឬសកម្មភាពទើបនឹងបញ្ចប់ថ្មីៗ។",
    types: "(+) S + have/has + V3 + O\n(-) S + haven't/hasn't + V3 + O\n(?) Have/Has + S + V3 + O?\n(Signal words: already, just, yet, ever, never, since, for)",
    examples: [
      { en: "I have studied English on this online platform for over six months.", kh: "ខ្ញុំបានរៀនភាសាអង់គ្លេសនៅលើវេទិកាអនឡាញនេះអស់រយៈពេលជាង ៦ ខែមកហើយ។" },
      { en: "She has already achieved an advanced score on her English assessment.", kh: "នាងសម្រេចបានពិន្ទុកម្រិតខ្ពស់ក្នុងការវាយតម្លៃភាសាអង់គ្លេសរបស់នាងរួចរាល់ហើយ។" },
      { en: "Have you ever traveled to an English-speaking country for study?", kh: "តើអ្នកធ្លាប់បានធ្វើដំណើរទៅកាន់ប្រទេសនិយាយភាសាអង់គ្លេសដើម្បីសិក្សាដែរឬទេ?" },
      { en: "We haven't finished designing the new user interface yet.", kh: "ពួកយើងមិនទាន់បានបញ្ចប់ការរចនាផ្ទាំងកម្មវិធីថ្មីនៅឡើយទេ។" }
    ],
    mistake: "❌ ខុស: I have seen him yesterday.\n✅ ត្រូវ: I saw him yesterday. (បើមាន yesterday ត្រូវប្រើ Past Simple មិនមែន Present Perfect ទេ)",
    practice: "ចូរជ្រើសរើសចម្លើយត្រឹមត្រូវ៖ 'She has (work / worked) here since 2020.'"
  },
  {
    topic: "Present Perfect Continuous",
    def: "បច្ចុប្បន្នកាលបរិបូរណ៍កំពុងបន្ត ប្រើដើម្បីសង្កត់ធ្ងន់លើ 'រយៈពេល' នៃសកម្មភាពដែលបានចាប់ផ្តើមតាំងពីអតីតកាល ហើយកំពុងតែបន្តធ្វើឥតឈប់ឈររហូតមកដល់បច្ចុប្បន្ន។",
    types: "(+) S + have/has + been + V-ing + O\n(-) S + haven't/hasn't + been + V-ing + O\n(?) Have/Has + S + been + V-ing + O?\n(How long, for, since, all day)",
    examples: [
      { en: "I have been learning English conversation for two hours without taking a break.", kh: "ខ្ញុំបាននិងកំពុងរៀនការសន្ទនាភាសាអង់គ្លេសអស់រយៈពេល ២ ម៉ោងហើយដោយមិនបានសម្រាកឡើយ។" },
      { en: "How long have you been working as an online English instructor?", kh: "តើអ្នកបាននិងកំពុងធ្វើការជាគ្រូបង្រៀនភាសាអង់គ្លេសអនឡាញអស់រយៈពេលប៉ុន្មានហើយ?" },
      { en: "It has been raining continuously since early this morning.", kh: "ភ្លៀងបាននិងកំពុងធ្លាក់ឥតឈប់ឈរតាំងពីព្រលឹមស្រាងៗមកម្ល៉េះ។" },
      { en: "She has been preparing for her master's degree scholarship all year.", kh: "នាងបាននិងកំពុងរៀបចំខ្លួនសម្រាប់អាហារូបករណ៍ថ្នាក់អនុបណ្ឌិតពេញមួយឆ្នាំនេះ។" }
    ],
    mistake: "❌ ខុស: I have been knowing him for five years.\n✅ ត្រូវ: I have known him for five years. (Stative verbs ដូចជា know ប្រើក្នុង Present Perfect ធម្មតា)",
    practice: "ចូរបំពេញចន្លោះ៖ 'They have been (practice) ___ speaking English all morning.'"
  },
  {
    topic: "Past Perfect Tense",
    def: "អតីតកាលបរិបូរណ៍ ប្រើសម្រាប់សកម្មភាពមួយដែលបានកើតឡើង និងបានបញ្ចប់មុនសកម្មភាពមួយទៀតក្នុងអតីតកាល (The earlier past action)។",
    types: "(+) S + had + V3 + O\n(-) S + hadn't + V3 + O\n(?) Had + S + V3 + O?\n(ក្បួន: Had + V3 កើតមុន | Past Simple V2 កើតក្រោយ | Before, After, By the time)",
    examples: [
      { en: "When I arrived at the airport, the flight had already departed.", kh: "នៅពេលដែលខ្ញុំបានទៅដល់ព្រលានយន្តហោះ ជើងហោះហើរបានចេញដំណើររួចស្រេចទៅហើយ។" },
      { en: "She had completed all her assignments before she went to bed last night.", kh: "នាងបានបញ្ចប់កិច្ចការទាំងអស់របស់នាងរួចរាល់ មុនពេលនាងចូលគេងកាលពីយប់មិញ។" },
      { en: "By the time the manager came, the team had solved the technical problem.", kh: "នៅពេលដែលអ្នកគ្រប់គ្រងមកដល់ ក្រុមការងារបានដោះស្រាយបញ្ហាបច្ចេកទេសរួចរាល់បាត់ទៅហើយ។" },
      { en: "Had you studied English before you started using this AI application?", kh: "តើអ្នកធ្លាប់បានរៀនភាសាអង់គ្លេសពីមុនមកទេ មុនពេលអ្នកចាប់ផ្តើមប្រើប្រាស់កម្មវិធី AI នេះ?" }
    ],
    mistake: "❌ ខុស: After he had ate breakfast, he went to school.\n✅ ត្រូវ: After he had eaten breakfast, he went to school. (had + V3 គឺ eaten មិនមែន ate ទេ)",
    practice: "ចូរជ្រើសរើសទម្រង់ត្រូវ៖ 'She (had finished / finished) the test before time was up.'"
  },
  {
    topic: "Future Simple Tense",
    def: "អនាគតកាលធម្មតា (Will) ប្រើសម្រាប់ការសម្រេចចិត្តភ្លាមៗ ការទស្សន៍ទាយ ឬការសន្យា។",
    types: "(+) S + will + V1 + O\n(-) S + will not (won't) + V1 + O\n(?) Will + S + V1 + O?\n(Tomorrow, next week, soon, I think, I promise)",
    examples: [
      { en: "I will help you practice your English interview questions tomorrow.", kh: "ខ្ញុំនឹងជួយអ្នកហ្វឹកហាត់សំណួរសម្ភាសន៍ការងារជាភាសាអង់គ្លេសនៅថ្ងៃស្អែក។" },
      { en: "Don't worry about the examination; you will do great!", kh: "កុំបារម្ភចំពោះការប្រឡងអី អ្នកនឹងធ្វើវាបានយ៉ាងល្អប្រសើរ!" },
      { en: "Will artificial intelligence change the way we learn foreign languages?", kh: "តើបញ្ញាសិប្បនិម្មិតនឹងផ្លាស់ប្តូររបៀបដែលយើងរៀនភាសាបរទេសដែរឬទេ?" },
      { en: "We will send you the confirmation email and study schedule right away.", kh: "ពួកយើងនឹងផ្ញើអ៊ីមែលបញ្ជាក់ និងកាលវិភាគសិក្សាជូនអ្នកភ្លាមៗ។" }
    ],
    mistake: "❌ ខុស: I will to call you tomorrow.\n✅ ត្រូវ: I will call you tomorrow. (ក្រោយ will ត្រូវប្រើ V1 គ្មាន 'to' ឡើយ)",
    practice: "ចូរប្តូរប្រយោគនេះជាទម្រង់បដិសេធ៖ 'He will join the meeting.'"
  },
  {
    topic: "Future Continuous Tense",
    def: "អនាគតកាលកំពុងបន្ត ប្រើសម្រាប់សកម្មភាពដែលនឹងកំពុងតែកើតឡើងនៅចំណុចពេលវេលាជាក់លាក់ណាមួយក្នុងអនាគត។",
    types: "(+) S + will be + V-ing + O\n(-) S + won't be + V-ing + O\n(?) Will + S + be + V-ing + O?\n(At this time tomorrow, at 8 PM tonight)",
    examples: [
      { en: "At this time tomorrow, I will be attending an international English conference.", kh: "នៅពេលនេះថ្ងៃស្អែក ខ្ញុំនឹងកំពុងចូលរួមសន្និសីទភាសាអង់គ្លេសអន្តរជាតិមួយ។" },
      { en: "Don't call him at 9:00 PM tonight; he will be teaching his online class.", kh: "កុំទូរស័ព្ទទៅគាត់នៅម៉ោង ៩:០០ យប់នេះ គាត់នឹងកំពុងបង្រៀនថ្នាក់អនឡាញរបស់គាត់។" },
      { en: "Will you be working at the office all day this coming Saturday?", kh: "តើអ្នកនឹងកំពុងធ្វើការនៅការិយាល័យពេញមួយថ្ងៃនៅថ្ងៃសៅរ៍ខាងមុខនេះឬ?" }
    ],
    mistake: "❌ ខុស: I will be sleep at midnight.\n✅ ត្រូវ: I will be sleeping at midnight. (will be + V-ing)",
    practice: "ចូរបំពេញចន្លោះ៖ 'This time next week, we will be (travel) ___ to Thailand.'"
  },
  {
    topic: "Be Going To (ផែនការ)",
    def: "ទម្រង់ Be going to ប្រើសម្រាប់ផែនការដែលបានសម្រេចចិត្ត ឬគ្រោងទុករួចរាល់ ឬការទស្សន៍ទាយដែលមានភស្តុតាងជាក់ស្តែងនៅចំពោះមុខ។",
    types: "(+) S + am/is/are + going to + V1 + O\n(-) S + am not/isn't/aren't + going to + V1 + O\n(?) Am/Is/Are + S + going to + V1 + O?",
    examples: [
      { en: "I am going to enroll in the advanced English speaking diploma course next Monday.", kh: "ខ្ញុំនឹងចុះឈ្មោះចូលរៀនវគ្គសញ្ញាបត្រសន្ទនាភាសាអង់គ្លេសកម្រិតខ្ពស់នៅថ្ងៃចន្ទសប្តាហ៍ក្រោយ។" },
      { en: "Look at the dark clouds! It is definitely going to rain very heavily.", kh: "មើលពពកខ្មៅនោះន៎! វានឹងធ្លាក់ភ្លៀងយ៉ាងខ្លាំងជាក់ជាមិនខាន។" },
      { en: "What are you going to do after you achieve your English certificate?", kh: "តើអ្នកនឹងគ្រោងធ្វើអ្វីបន្ទាប់ពីអ្នកទទួលបានវិញ្ញាបនបត្រភាសាអង់គ្លេសរបស់អ្នក?" }
    ],
    mistake: "❌ ខុស: I am going to buying a new phone.\n✅ ត្រូវ: I am going to buy a new phone. (going to + V1)",
    practice: "ចូរបង្កើតល្បះមួយដែលបង្ហាញពីផែនការរបស់អ្នកនៅចុងសប្តាហ៍នេះដោយប្រើ 'be going to'."
  },
  {
    topic: "Modal Verbs: Can & Could",
    def: "Can ប្រើសម្រាប់សមត្ថភាពបច្ចុប្បន្ន ការសុំអនុញ្ញាត ឬលទ្ធភាព។ Could ប្រើសម្រាប់សមត្ថភាពអតីតកាល ឬការស្នើសុំដោយគួរសមខ្ពស់។",
    types: "Subject + can / could + V1 (infinitive) + Object\n(ចំណាំ៖ ក្រោយ modal verbs ត្រូវប្រើ V1 សុទ្ធជានិច្ច គ្មាន to គ្មាន s)",
    examples: [
      { en: "Could you please speak a little slower so I can understand you better?", kh: "តើអ្នកអាចមេត្តានិយាយឱ្យរាងយឺតបន្តិចបានទេ ដើម្បីឱ្យខ្ញុំអាចស្តាប់អ្នកបានកាន់តែច្បាស់? (ការស្នើសុំគួរសម)" },
      { en: "She can speak English, French, and Khmer with remarkable fluency.", kh: "នាងអាចនិយាយភាសាអង់គ្លេស បារាំង និងខ្មែរបានយ៉ាងស្ទាត់ជំនាញគួរឱ្យកោតសរសើរ។ (សមត្ថភាព)" },
      { en: "When he was just seven years old, he could play the piano beautifully.", kh: "កាលពីគាត់ទើបតែអាយុ ៧ ឆ្នាំ គាត់អាចលេងព្យាណូបានយ៉ាងពីរោះរណ្តំ។ (អតីតកាល)" }
    ],
    mistake: "❌ ខុស: Could you please to help me?\n✅ ត្រូវ: Could you please help me? (គ្មាន 'to' ទេ)",
    practice: "ចូរប្រើ 'Could you please...' ដើម្បីសុំឱ្យនរណាម្នាក់បើកបង្អួច។"
  },
  {
    topic: "Modal Verbs: May & Might",
    def: "May និង Might ប្រើសម្រាប់បង្ហាញពីលទ្ធភាព (Possibility) ថាអ្វីមួយអាចនឹងកើតឡើង ឬ May ប្រើសម្រាប់ការសុំការអនុញ្ញាតផ្លូវការ។",
    types: "Subject + may / might + V1 + Object\n(May: ប្រហែលជា ៥០% | Might: លទ្ធភាពទាបជាងបន្តិច ៣០-៤០%)",
    examples: [
      { en: "May I come in and ask a few questions about the online English program?", kh: "តើខ្ញុំអាចសុំការអនុញ្ញាតចូល និងសួរសំណួរមួយចំនួនអំពីកម្មវិធីភាសាអង់គ្លេសអនឡាញបានទេ? (សុំអនុញ្ញាតផ្លូវការ)" },
      { en: "Take an umbrella with you; it might rain later this afternoon.", kh: "យកឆ័ត្រតាមខ្លួនទៅ ក្រែងលោវាអាចនឹងភ្លៀងនៅរសៀលនេះ។ (លទ្ធភាព)" },
      { en: "She may join our study group tomorrow if she finishes her work on time.", kh: "នាងប្រហែលជាអាចចូលរួមក្រុមសិក្សារបស់យើងនៅថ្ងៃស្អែក ប្រសិនបើនាងបញ្ចប់ការងារទាន់ពេល។" }
    ],
    mistake: "❌ ខុស: It might rains today.\n✅ ត្រូវ: It might rain today. (ក្រោយ might ប្រើ V1 សុទ្ធ)",
    practice: "ចូរសរសេរប្រយោគមួយដោយប្រើ 'might' ដើម្បីបង្ហាញពីលទ្ធភាពអាកាសធាតុ។"
  },
  {
    topic: "Modal Verbs: Must & Have to",
    def: "Must និង Have to ប្រើសម្រាប់បង្ហាញពីភាពចាំបាច់ កាតព្វកិច្ច ឬច្បាប់តឹងរ៉ឹង។ Must not (ហាមដាច់ខាត) ខុសពី Don't have to (មិនបាច់ក៏បាន)។",
    types: "• Must: កាតព្វកិច្ចផ្ទាល់ខ្លួន ឬច្បាប់តឹងរ៉ឹង\n• Have to: កាតព្វកិច្ចបង្ខំដោយកាលៈទេសៈខាងក្រៅ\n• Must not (Mustn't): ការហាមប្រាមដាច់ខាត (Prohibition)\n• Don't have to: គ្មានការបង្ខិតបង្ខំ (No obligation)",
    examples: [
      { en: "You must wear a helmet when riding a motorcycle in Cambodia for your safety.", kh: "អ្នកត្រូវតែពាក់មួកសុវត្ថិភាពនៅពេលជិះម៉ូតូក្នុងប្រទេសកម្ពុជាដើម្បីសុវត្ថិភាពរបស់អ្នក។" },
      { en: "I have to wake up early tomorrow because my English class starts at 7:00 AM.", kh: "ខ្ញុំត្រូវតែក្រោកពីព្រលឹមនៅថ្ងៃស្អែក ពីព្រោះថ្នាក់រៀនភាសាអង់គ្លេសចាប់ផ្តើមម៉ោង ៧:០០ ព្រឹក។" },
      { en: "You must not use your mobile phone during the final examination.", kh: "អ្នកមិនត្រូវប្រើប្រាស់ទូរស័ព្ទដៃក្នុងអំឡុងពេលប្រឡងបញ្ចប់វគ្គជាដាច់ខាត។" },
      { en: "Tomorrow is Sunday, so we don't have to go to the office.", kh: "ថ្ងៃស្អែកជាថ្ងៃអាទិត្យ ដូច្នេះពួកយើងមិនចាំបាច់ទៅការិយាល័យនោះទេ។" }
    ],
    mistake: "❌ ខុស: You mustn't to park here.\n✅ ត្រូវ: You mustn't park here.",
    practice: "ចូរជ្រើសរើសពាក្យត្រឹមត្រូវ៖ 'Students (must not / don't have to) cheat in exams.'"
  },
  {
    topic: "Modal Verbs: Should & Ought to",
    def: "Should និង Ought to ប្រើសម្រាប់ផ្តល់ដំបូន្មាន ការណែនាំល្អៗ ឬការប្រាប់ពីអ្វីដែលសមរម្យគួរធ្វើ។",
    types: "Subject + should / ought to + V1 + Object\n(Negative: shouldn't + V1)",
    examples: [
      { en: "You should practice speaking English every day if you want to become fluent.", kh: "អ្នកគួរតែហ្វឹកហាត់និយាយភាសាអង់គ្លេសជារៀងរាល់ថ្ងៃ ប្រសិនបើអ្នកចង់និយាយបានស្ទាត់ជំនាញ។" },
      { en: "You look exhausted from working late. You ought to get some proper rest.", kh: "អ្នកមើលទៅហត់នឿយខ្លាំងណាស់ពីការធ្វើការដល់យប់ជ្រៅ។ អ្នកគួរតែសម្រាកឱ្យបានគ្រប់គ្រាន់។" },
      { en: "Learners shouldn't be afraid of making mistakes when speaking English.", kh: "អ្នករៀនមិនគួរភ័យខ្លាចក្នុងការបង្កើតកំហុសនៅពេលនិយាយភាសាអង់គ្លេសនោះឡើយ។" }
    ],
    mistake: "❌ ខុស: You should to practice speaking.\n✅ ត្រូវ: You should practice speaking. (ក្រោយ should គ្មាន 'to' ទេ)",
    practice: "ចូរផ្តល់ដំបូន្មានដល់មិត្តភក្តិដែលឈឺក្បាលដោយប្រើ 'You should...'"
  },
  {
    topic: "Adverbs of Manner (របៀប)",
    def: "គុណកិរិយាប្រាប់របៀប បញ្ជាក់ថាតើសកម្មភាពនោះត្រូវបានធ្វើឡើងដោយរបៀបណា។ ភាគច្រើនបង្កើតដោយ គុណនាម + 'ly' (Adjective + ly)។",
    types: "• quick -> quickly (យ៉ាងលឿន)\n• fluent -> fluently (យ៉ាងស្ទាត់ជំនាញ)\n• careful -> carefully (យ៉ាងប្រុងប្រយ័ត្ន)\n• មិនទៀងទាត់៖ good -> well (យ៉ាងល្អ), fast -> fast (យ៉ាងលឿន), hard -> hard (យ៉ាងលំបាក/ខ្លាំង)",
    examples: [
      { en: "After six months of dedicated practice, she speaks English very fluently.", kh: "បន្ទាប់ពីការហ្វឹកហាត់យ៉ាងយកចិត្តទុកដាក់អស់រយៈពេល ៦ ខែ នាងនិយាយភាសាអង់គ្លេសបានយ៉ាងស្ទាត់ជំនាញ។" },
      { en: "Please drive carefully on the highway, especially when it is raining.", kh: "សូមមេត្តាបើកបរដោយប្រុងប្រយ័ត្ននៅលើផ្លូវល្បឿនលឿន ជាពិសេសនៅពេលមានភ្លៀងធ្លាក់។" },
      { en: "He worked very hard to earn a full international scholarship.", kh: "គាត់បានខិតខំប្រឹងប្រែងធ្វើការយ៉ាងខ្លាំងដើម្បីដណ្តើមយកអាហារូបករណ៍អន្តរជាតិពេញថ្លៃ។" }
    ],
    mistake: "❌ ខុស: She speaks English good.\n✅ ត្រូវ: She speaks English well. (ដើម្បីបញ្ជាក់ន័យឱ្យកិរិយាសព្ទ speaks ត្រូវប្រើគុណកិរិយា 'well' មិនមែន 'good' ទេ)",
    practice: "ចូរប្តូរគុណនាម 'patient' ទៅជាគុណកិរិយាប្រាប់របៀប។"
  },
  {
    topic: "Adverbs of Frequency (ភាពញឹកញាប់)",
    def: "គុណកិរិយាប្រាប់ភាពញឹកញាប់ បញ្ជាក់ថាតើសកម្មភាពនោះកើតឡើងញឹកញាប់កម្រិតណា។",
    types: "always (100% ជានិច្ច), usually (80% ជាធម្មតា), often (60% ញឹកញាប់), sometimes (50% ជួនកាល), rarely/seldom (10% កម្រ), never (0% មិនដែល)\nទីតាំង៖ នៅពីមុខកិរិយាសព្ទធម្មតា តែនៅខាងក្រោយកិរិយាសព្ទ To Be!",
    examples: [
      { en: "I always review my vocabulary notes before going to sleep.", kh: "ខ្ញុំតែងតែរំលឹកកំណត់ចំណាំវាក្យសព្ទរបស់ខ្ញុំជានិច្ច មុនពេលចូលគេង។" },
      { en: "She is always punctual and prepared for every business meeting.", kh: "នាងតែងតែទៀងទាត់ពេលវេលា និងត្រៀមខ្លួនរួចរាល់ជានិច្ចសម្រាប់ការប្រជុំអាជីវកម្មនីមួយៗ។ (នៅក្រោយ is)" },
      { en: "We sometimes study English together at the weekend café.", kh: "ពួកយើងជួនកាលរៀនភាសាអង់គ្លេសជាមួយគ្នានៅហាងកាហ្វេចុងសប្តាហ៍។" }
    ],
    mistake: "❌ ខុស: I go always to school by bus.\n✅ ត្រូវ: I always go to school by bus. (នៅមុខកិរិយាសព្ទ go)",
    practice: "ចូរដាក់ពាក្យ 'usually' ចូលក្នុងប្រយោគ៖ 'He eats breakfast at 7 AM.'"
  },
  {
    topic: "Adverbs of Time (ពេលវេលា)",
    def: "គុណកិរិយាប្រាប់ពេលវេលា បញ្ជាក់ថាតើសកម្មភាពនោះកើតឡើងនៅពេលណា (When)។",
    types: "now, today, yesterday, tomorrow, soon, recently, lately, already, yet\nទីតាំង៖ ជាធម្មតានៅចុងប្រយោគ ឬនៅដើមប្រយោគដើម្បីសង្កត់ធ្ងន់។",
    examples: [
      { en: "We will launch our new online learning mobile application soon.", kh: "ពួកយើងនឹងដាក់ឱ្យដំណើរការកម្មវិធីទូរស័ព្ទសិក្សាអនឡាញថ្មីរបស់យើងក្នុងពេលឆាប់ៗនេះ។" },
      { en: "Recently, more and more Cambodian students are mastering English through AI.", kh: "ថ្មីៗនេះ សិស្សានុសិស្សកម្ពុជាកាន់តែច្រើនឡើងកំពុងចេះភាសាអង់គ្លេសយ៉ាងស្ទាត់តាមរយៈ AI។" },
      { en: "I received the official admission letter from the university yesterday.", kh: "ខ្ញុំបានទទួលលិខិតផ្លូវការអនុញ្ញាតឱ្យចូលរៀនពីសាកលវិទ្យាល័យកាលពីម្សិលមិញ។" }
    ],
    mistake: "❌ ខុស: I yesterday went to the market.\n✅ ត្រូវ: I went to the market yesterday. (ឬ Yesterday, I went to the market.)",
    practice: "ចូរបង្កើតល្បះមួយដោយប្រើ 'recently'."
  },
  {
    topic: "Adverbs of Place (ទីកន្លែង)",
    def: "គុណកិរិយាប្រាប់ទីកន្លែង បញ្ជាក់ថាតើសកម្មភាពនោះកើតឡើងនៅឯណា (Where)។",
    types: "here (ទីនេះ), there (ទីនោះ), everywhere (គ្រប់ទីកន្លែង), nowhere (គ្មានកន្លែងណា), inside (ខាងក្នុង), outside (ខាងក្រៅ), upstairs, downstairs",
    examples: [
      { en: "Please come inside and have a seat; it is raining outside.", kh: "សូមអញ្ជើញចូលមកខាងក្នុង ហើយអង្គុយចុះ ខាងក្រៅកំពុងធ្លាក់ភ្លៀង។" },
      { en: "With an internet connection, you can study English anywhere in the world.", kh: "ដោយគ្រាន់តែមានការភ្ជាប់អ៊ីនធឺណិត អ្នកអាចរៀនភាសាអង់គ្លេសនៅគ្រប់ទីកន្លែងក្នុងពិភពលោក។" },
      { en: "I looked everywhere for my lost car keys, but I couldn't find them.", kh: "ខ្ញុំបានស្វែងរកកូនសោឡានដែលបាត់នៅគ្រប់ទីកន្លែង ប៉ុន្តែរកមិនឃើញសោះ។" }
    ],
    mistake: "❌ ខុស: Please put here the box.\n✅ ត្រូវ: Please put the box here.",
    practice: "ចូរបំពេញចន្លោះ៖ 'Sit (here / nowhere) next to me.'"
  },
  {
    topic: "Prepositions of Time (ធ្នាក់ពេលវេលា)",
    def: "ធ្នាក់ពេលវេលា At, On, In ប្រើសម្រាប់បញ្ជាក់កាលវេលាជាក់លាក់។",
    types: "• AT (ចំណុចម៉ោងជាក់លាក់, បុណ្យទាន): at 7 o'clock, at midnight, at noon, at Khmer New Year\n• ON (ថ្ងៃនៃសប្តាហ៍, កាលបរិច្ឆេទជាក់លាក់): on Monday, on July 15th, on my birthday\n• IN (ខែ, ឆ្នាំ, រដូវ, សតវត្សរ៍, ពេលនៃថ្ងៃ): in January, in 2026, in summer, in the morning/afternoon",
    examples: [
      { en: "Our online live class starts promptly at 8:00 PM every Monday and Friday.", kh: "ថ្នាក់ផ្សាយផ្ទាល់អនឡាញរបស់យើងចាប់ផ្តើមចំម៉ោង ៨:០០ យប់គត់រៀងរាល់ថ្ងៃចន្ទ និងថ្ងៃសុក្រ។" },
      { en: "He graduated from the Royal University of Phnom Penh in 2024.", kh: "គាត់បានបញ្ចប់ការសិក្សាពីសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញនៅក្នុងឆ្នាំ ២០២៤។" },
      { en: "We are organizing a special study webinar on Sunday afternoon.", kh: "ពួកយើងកំពុងរៀបចំសិក្ខាសាលាលើបណ្តាញពិសេសមួយនៅរសៀលថ្ងៃអាទិត្យ។" }
    ],
    mistake: "❌ ខុស: I was born in 15th May.\n✅ ត្រូវ: I was born on 15th May. (មានកាលបរិច្ឆេទថ្ងៃជាក់លាក់ ត្រូវប្រើ 'on')",
    practice: "ចូរបំពេញធ្នាក់ត្រឹមត្រូវ៖ 'The train departs ___ 6:30 AM.'"
  },
  {
    topic: "Prepositions of Place (ធ្នាក់ទីកន្លែង)",
    def: "ធ្នាក់ទីកន្លែង In, On, At ប្រើសម្រាប់បញ្ជាក់ទីតាំង និងទីកន្លែង។",
    types: "• IN (ក្នុងទីធ្លាបិទជិត, ទីក្រុង, ប្រទេស): in the room, in Phnom Penh, in Cambodia\n• ON (នៅលើផ្ទៃ, លើផ្លូវ, លើជាន់): on the table, on Norodom Boulevard, on the 3rd floor\n• AT (ទីតាំងជាក់លាក់, អាសយដ្ឋានមានលេខផ្ទះ): at the bus stop, at the airport, at home, at work",
    examples: [
      { en: "Our main administrative headquarters is located in Phnom Penh.", kh: "ការិយាល័យកណ្តាលរដ្ឋបាលចម្បងរបស់យើងគឺស្ថិតនៅក្នុងរាជធានីភ្នំពេញ។" },
      { en: "Please leave the signed registration documents on my desk.", kh: "សូមទុកឯកសារចុះឈ្មោះដែលបានចុះហត្ថលេខារួចនៅលើតុធ្វើការរបស់ខ្ញុំ។" },
      { en: "I will meet you at the entrance of the National Museum at 3:00 PM.", kh: "ខ្ញុំនឹងជួបអ្នកនៅមាត់ទ្វារចូលសារមន្ទីរជាតិនៅម៉ោង ៣:០០ រសៀល។" }
    ],
    mistake: "❌ ខុស: I live on Cambodia.\n✅ ត្រូវ: I live in Cambodia. (ប្រទេស ប្រើ 'in')",
    practice: "ចូរបំពេញធ្នាក់ត្រឹមត្រូវ៖ 'He is waiting ___ the bus stop.'"
  },
  {
    topic: "Articles: a, an, the",
    def: "A និង An ជានិទស្សន្តសព្ទមិនកំណត់ (Indefinite Articles) ប្រើជាមួយនាមរាប់បានឯកវចនៈទូទៅ។ The ជានិទស្សន្តសព្ទកំណត់ (Definite Article) ប្រើជាមួយនាមជាក់លាក់ ឬរបស់តែមួយគត់ក្នុងលោក។",
    types: "• A: ប្រើពីមុខពាក្យចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ (a book, a university, a doctor)\n• AN: ប្រើពីមុខពាក្យចាប់ផ្តើមដោយសំឡេងស្រៈ a, e, i, o, u (an apple, an hour, an engineer)\n• THE: ប្រើជាមួយរបស់ជាក់លាក់ ដែលអ្នកនិយាយនិងអ្នកស្តាប់ស្គាល់ដូចគ្នា ឬរបស់តែមួយគត់ (the sun, the moon, the capital of Cambodia)",
    examples: [
      { en: "She is an experienced English teacher who holds a master's degree.", kh: "នាងគឺជាគ្រូបង្រៀនភាសាអង់គ្លេសដែលមានបទពិសោធន៍ម្នាក់ ដែលមានសញ្ញាបត្រអនុបណ្ឌិត។" },
      { en: "The sun provides essential energy and light to our entire planet.", kh: "ព្រះអាទិត្យផ្តល់ថាមពល និងពន្លឺដ៏សំខាន់ដល់ភពផែនដីទាំងមូលរបស់យើង។" },
      { en: "I bought a book yesterday. The book is about international leadership.", kh: "ខ្ញុំបានទិញសៀវភៅមួយក្បាលកាលពីម្សិលមិញ។ សៀវភៅនោះគឺស្តីអំពីភាពជាអ្នកដឹកនាំអន្តរជាតិ។" }
    ],
    mistake: "❌ ខុស: It takes a hour to get there.\n✅ ត្រូវ: It takes an hour to get there. (hour បញ្ចេញសំឡេងស្រៈ /aʊər/ ត្រូវប្រើ 'an')",
    practice: "ចូរជ្រើសរើស a ឬ an៖ 'He is ___ honest businessman.'"
  },
  {
    topic: "Quantifiers: some, any",
    def: "Some និង Any ប្រើសម្រាប់បញ្ជាក់បរិមាណខ្លះៗ។ Some ជាទូទៅប្រើក្នុងប្រយោគស្រប (+) ឬការស្នើសុំ/ផ្តល់ជូនគួរសម។ Any ជាទូទៅប្រើក្នុងប្រយោគបដិសេធ (-) និងប្រយោគសំណួរ (?)។",
    types: "(+) Some: I have some questions.\n(-) Any: I don't have any money.\n(?) Any: Do you have any ideas?\n(Polite Offer / Request ប្រើ Some): Would you like some coffee?",
    examples: [
      { en: "We have some very important announcements to share with the students.", kh: "ពួកយើងមានសេចក្តីជូនដំណឹងដ៏សំខាន់មួយចំនួនដើម្បីចែករំលែកជាមួយសិស្សានុសិស្ស។" },
      { en: "Do you have any questions about today's English grammar lesson?", kh: "តើអ្នកមានសំណួរអ្វីខ្លះទេអំពីមេរៀនវេយ្យាករណ៍ភាសាអង់គ្លេសថ្ងៃនេះ?" },
      { en: "I didn't receive any notifications regarding the class schedule change.", kh: "ខ្ញុំមិនបានទទួលការជូនដំណឹងណាមួយទាក់ទងនឹងការផ្លាស់ប្តូរកាលវិភាគថ្នាក់រៀននោះទេ។" },
      { en: "Would you like some fresh orange juice while waiting?", kh: "តើលោកអ្នកចង់ពិសាទឹកក្រូចស្រស់ខ្លះទេក្នុងអំឡុងពេលរង់ចាំ? (ការផ្តល់ជូនគួរសម)" }
    ],
    mistake: "❌ ខុស: I don't have some pens.\n✅ ត្រូវ: I don't have any pens. (បដិសេធប្រើ any)",
    practice: "ចូរបំពេញ some ឬ any៖ 'Are there ___ vacant rooms in the hotel?'"
  },
  {
    topic: "Quantifiers: much, many, a lot of",
    def: "Many ប្រើជាមួយនាមរាប់បានពហុវចនៈ។ Much ប្រើជាមួយនាមរាប់មិនបាន (ភាគច្រើនក្នុងបដិសេធ និងសំណួរ)។ A lot of / lots of ប្រើបានទាំងពីរ ក្នុងប្រយោគស្រប។",
    types: "• Many + Countable Plural: many students, many cars\n• Much + Uncountable: much money, much time, much water\n• A lot of + Countable/Uncountable: a lot of books, a lot of rice",
    examples: [
      { en: "There are many talented students enrolled in our online academy.", kh: "មានសិស្សានុសិស្សដែលមានទេពកោសល្យជាច្រើនបានចុះឈ្មោះចូលរៀនក្នុងបណ្ឌិត្យសភាអនឡាញរបស់យើង។" },
      { en: "We don't have much time left before the exam begins.", kh: "ពួកយើងមិនមានពេលវេលាច្រើននៅសល់ឡើយ មុនពេលការប្រឡងចាប់ផ្តើម។" },
      { en: "She has achieved a lot of success in her business career.", kh: "នាងសម្រេចបានជោគជ័យជាច្រើននៅក្នុងអាជីពអាជីវកម្មរបស់នាង។" }
    ],
    mistake: "❌ ខុស: How much books did you buy?\n✅ ត្រូវ: How many books did you buy? (books រាប់បាន ប្រើ many)",
    practice: "ចូរបំពេញ much ឬ many៖ 'How ___ money do you need?'"
  },
  {
    topic: "Quantifiers: few, little",
    def: "A few និង A little មានន័យថា 'មានខ្លះៗល្មមប្រើ' (វិជ្ជមាន)។ Few និង Little គ្មាន 'a' មានន័យថា 'ស្ទើរតែគ្មានសោះ មិនគ្រប់គ្រាន់' (អវិជ្ជមាន)។",
    types: "• A few / Few + នាមរាប់បានពហុវចនៈ: a few friends (មានមិត្តភក្តិខ្លះ), few friends (ស្ទើរតែគ្មានមិត្ត)\n• A little / Little + នាមរាប់មិនបាន: a little water (មានទឹកខ្លះ), little water (ស្ទើរតែគ្មានទឹក)",
    examples: [
      { en: "I have a few questions about the final examination format.", kh: "ខ្ញុំមានសំណួរពីរបីទាក់ទងនឹងទម្រង់នៃការប្រឡងបញ្ចប់វគ្គ។ (រាប់បាន)" },
      { en: "He has a little free time this afternoon to help us review.", kh: "គាត់មានពេលទំនេរបន្តិចបន្តួចនៅរសៀលនេះដើម្បីជួយពួកយើងរំលឹកមេរៀន។ (រាប់មិនបាន)" },
      { en: "Unfortunately, few people attended the conference due to the storm.", kh: "ជាអកុសល មនុស្សតិចតួចបំផុត (ស្ទើរតែគ្មាន) បានចូលរួមសន្និសីទ ដោយសារតែព្យុះភ្លៀង។" }
    ],
    mistake: "❌ ខុស: I have a few money in my wallet.\n✅ ត្រូវ: I have a little money in my wallet. (money រាប់មិនបាន ប្រើ a little)",
    practice: "ចូរបំពេញ a few ឬ a little៖ 'Add ___ sugar to the coffee.'"
  },
  {
    topic: "Conjunctions: and, but, or",
    def: "ពាក្យភ្ជាប់ And (និង - បន្ថែមគំនិតស្របគ្នា), But (ប៉ុន្តែ - បង្ហាញភាពផ្ទុយគ្នា), Or (ឬ - បង្ហាញជម្រើស)។",
    types: "• And: I like apples and oranges.\n• But: He studied hard, but he failed.\n• Or: Do you prefer tea or coffee?",
    examples: [
      { en: "She works as a software engineer and teaches English on weekends.", kh: "នាងធ្វើការជាវិស្វករសូហ្វវែរផង និងបង្រៀនភាសាអង់គ្លេសនៅចុងសប្តាហ៍ផង។" },
      { en: "He studied very hard for the test, but he still found the grammar challenging.", kh: "គាត់បានខិតខំប្រឹងប្រែងរៀនសូត្រខ្លាំងណាស់សម្រាប់ការប្រឡង ប៉ុន្តែគាត់នៅតែយល់ថាវេយ្យាករណ៍មានការលំបាក។" },
      { en: "You can attend the class in person or join via the online live stream.", kh: "អ្នកអាចចូលរួមរៀនក្នុងថ្នាក់ផ្ទាល់ ឬចូលរួមតាមរយៈការផ្សាយផ្ទាល់តាមអនឡាញក៏បាន។" }
    ],
    mistake: "❌ ខុស: Although he was tired, but he continued working.\n✅ ត្រូវ: Although he was tired, he continued working. (មាន Although ហើយ មិនប្រើ but ទៀតទេ)",
    practice: "ចូរភ្ជាប់ប្រយោគទាំងពីរ៖ 'I like reading.' 'I like writing.'"
  },
  {
    topic: "Conjunctions: because, so",
    def: "Because (ពីព្រោះ) បង្ហាញពី 'មូលហេតុ' (Reason)។ So (ដូច្នេះ) បង្ហាញពី 'លទ្ធផល' (Result)។",
    types: "• Structure: Result + because + Reason (I passed because I studied hard.)\n• Structure: Reason + , so + Result (I studied hard, so I passed.)",
    examples: [
      { en: "She practices speaking every day because she wants to work for an international firm.", kh: "នាងហ្វឹកហាត់និយាយរាល់ថ្ងៃ ពីព្រោះនាងចង់ធ្វើការឱ្យក្រុមហ៊ុនអន្តរជាតិមួយ។" },
      { en: "The weather was terrible with heavy rain, so the outdoor concert was canceled.", kh: "អាកាសធាតុគឺមិនល្អដោយសារភ្លៀងធ្លាក់ខ្លាំង ដូច្នេះការប្រគំតន្ត្រីក្រៅផ្ទះត្រូវបានលុបចោល។" },
      { en: "He felt confident during the interview because he had prepared thoroughly.", kh: "គាត់មានអារម្មណ៍ជឿជាក់ក្នុងអំឡុងពេលសម្ភាសន៍ ពីព្រោះគាត់បានត្រៀមខ្លួនយ៉ាងហ្មត់ចត់។" }
    ],
    mistake: "❌ ខុស: Because he was sick, so he didn't come. (ក្នុងភាសាអង់គ្លេស មិនប្រើ Because និង So ក្នុងប្រយោគតែមួយឡើយ!)\n✅ ត្រូវ: Because he was sick, he didn't come. (ឬ He was sick, so he didn't come.)",
    practice: "ចូរជ្រើសរើស because ឬ so៖ 'I was tired, ___ I went to bed early.'"
  },
  {
    topic: "Conjunctions: although, even though",
    def: "Although និង Even though (ទោះបីជាយ៉ាងណាក៏ដោយ) ប្រើសម្រាប់បង្ហាញពីភាពផ្ទុយគ្នា និងការភ្ញាក់ផ្អើល (Concession & Contrast)។ Even though មានកម្រិតធ្ងន់ និងខ្លាំងជាង Although។",
    types: "Although / Even though + Subject + Verb, Main Clause\n(ចំណាំ៖ មិនប្រើ 'but' នៅក្នុងប្រយោគដែលមាន Although ឡើយ)",
    examples: [
      { en: "Although the final exam was very challenging, all our students passed successfully.", kh: "ទោះបីជាការប្រឡងបញ្ចប់វគ្គមានការពិបាកខ្លាំងក៏ដោយ ក៏សិស្សានុសិស្សរបស់យើងទាំងអស់បានប្រឡងជាប់ដោយជោគជ័យ។" },
      { en: "Even though she was extremely tired after work, she still completed her English lesson.", kh: "ទោះបីជានាងហត់នឿយខ្លាំងយ៉ាងណាក្តីក្រោយចេញពីធ្វើការ ក៏នាងនៅតែបំពេញមេរៀនភាសាអង់គ្លេសរបស់នាងរួចរាល់ដែរ។" },
      { en: "He speaks English with great confidence although he only started learning six months ago.", kh: "គាត់និយាយភាសាអង់គ្លេសប្រកបដោយទំនុកចិត្តខ្ពស់ ទោះបីជាគាត់ទើបតែចាប់ផ្តើមរៀនបាន ៦ ខែក៏ដោយ។" }
    ],
    mistake: "❌ ខុស: Although it rained, but we went out.\n✅ ត្រូវ: Although it rained, we went out.",
    practice: "ចូរភ្ជាប់ប្រយោគដោយប្រើ 'Although'៖ 'He is rich. He is unhappy.'"
  },
  {
    topic: "Relative Clauses: who, which, that",
    def: "ឈ្នាប់កថាខណ្ឌទំនាក់ទំនង ប្រើដើម្បីបញ្ជាក់លម្អិតអំពីនាម។ Who (សម្រាប់មនុស្ស), Which (សម្រាប់វត្ថុ ឬសត្វ), That (សម្រាប់ទាំងមនុស្ស និងវត្ថុក្នុង Defining Clauses)។",
    types: "• Who: The teacher who taught me is very kind.\n• Which: The laptop which I bought is fast.\n• That: The car that won the race is red.",
    examples: [
      { en: "The dedicated instructor who teaches our advanced speaking course has ten years of experience.", kh: "លោកគ្រូដែលបង្រៀនវគ្គសន្ទនាកម្រិតខ្ពស់របស់យើង មានបទពិសោធន៍រហូតដល់ទៅ ១០ ឆ្នាំ។" },
      { en: "This is the mobile application which has helped thousands of learners master English.", kh: "នេះគឺជាកម្មវិធីទូរស័ព្ទដែលបានជួយអ្នករៀនរាប់ពាន់នាក់ឱ្យចេះភាសាអង់គ្លេសយ៉ាងស្ទាត់ជំនាញ។" },
      { en: "The scholarship that she applied for covers full tuition fees and accommodation.", kh: "អាហារូបករណ៍ដែលនាងបានដាក់ពាក្យស្នើសុំ រ៉ាប់រងថ្លៃសិក្សាពេញលេញ និងកន្លែងស្នាក់នៅ។" }
    ],
    mistake: "❌ ខុស: The man which called you is my uncle.\n✅ ត្រូវ: The man who called you is my uncle. (មនុស្ស ត្រូវប្រើ who មិនមែន which ទេ)",
    practice: "ចូរបំពេញ who ឬ which៖ 'The book ___ I read was fascinating.'"
  },
  {
    topic: "Relative Clauses: whose, whom, where",
    def: "Whose (កម្មសិទ្ធិ - របស់នរណា), Whom (កម្មបទមនុស្សក្នុងភាសាផ្លូវការ), Where (ទីកន្លែង - នៅឯណា)។",
    types: "• Whose: The boy whose car was stolen.\n• Whom: The person whom I met yesterday.\n• Where: The city where I was born.",
    examples: [
      { en: "Siem Reap is the historic city where millions of international tourists visit every year.", kh: "ខេត្តសៀមរាប គឺជាទីក្រុងប្រវត្តិសាស្ត្រដែលភ្ញៀវទេសចរអន្តរជាតិរាប់លាននាក់មកទស្សនារៀងរាល់ឆ្នាំ។" },
      { en: "The student whose English essay won the national competition was awarded a certificate.", kh: "សិស្សដែលតែងសេចក្តីភាសាអង់គ្លេសរបស់គាត់បានឈ្នះការប្រកួតថ្នាក់ជាតិ ត្រូវបានទទួលរង្វាន់វិញ្ញាបនបត្រ។" },
      { en: "This is the study room where our online group discussions take place.", kh: "នេះគឺជាបន្ទប់សិក្សាដែលការពិភាក្សាក្រុមអនឡាញរបស់យើងប្រព្រឹត្តទៅ។" }
    ],
    mistake: "❌ ខុស: The hotel which we stayed was very clean.\n✅ ត្រូវ: The hotel where we stayed was very clean. (ទីកន្លែងដែលស្នាក់នៅ ប្រើ where)",
    practice: "ចូរបំពេញ where ឬ whose៖ 'The man ___ laptop was broken called the technician.'"
  },
  {
    topic: "Passive Voice Present (ទម្រង់អកម្ម)",
    def: "ទម្រង់អកម្មបច្ចុប្បន្ន ប្រើនៅពេលផ្តោតលើអ្នករងអំពើជាជាងអ្នកធ្វើអំពើ។",
    types: "Formula: Object + am / is / are + V3 (Past Participle) + (by Subject)",
    examples: [
      { en: "English is spoken by millions of business professionals across the globe.", kh: "ភាសាអង់គ្លេសត្រូវបាននិយាយដោយអ្នកជំនាញអាជីវកម្មរាប់លាននាក់នៅទូទាំងពិភពលោក។" },
      { en: "All student certificates are officially verified and signed before graduation.", kh: "វិញ្ញាបនបត្រសិស្សទាំងអស់ត្រូវបានផ្ទៀងផ្ទាត់ និងចុះហត្ថលេខាជាផ្លូវការមុនពេលបញ្ចប់ការសិក្សា។" },
      { en: "Fresh vegetables and fruits are delivered to the supermarket every morning.", kh: "បន្លែ និងផ្លែឈើស្រស់ៗត្រូវបានដឹកជញ្ជូនមកកាន់ផ្សារទំនើបរៀងរាល់ព្រឹក។" }
    ],
    mistake: "❌ ខុស: The classroom is clean every day.\n✅ ត្រូវ: The classroom is cleaned every day. (កិរិយាសព្ទត្រូវតែជា V3 គឺ cleaned)",
    practice: "ចូរប្តូរជា Passive Voice៖ 'They build new roads every year.'"
  },
  {
    topic: "Passive Voice Past (ទម្រង់អកម្មអតីតកាល)",
    def: "ទម្រង់អកម្មអតីតកាល ប្រើសម្រាប់សកម្មភាពដែលបានទទួលរងអំពើក្នុងអតីតកាល។",
    types: "Formula: Object + was / were + V3 (Past Participle) + (by Subject)",
    examples: [
      { en: "The ancient Angkor Wat temple was built during the 12th century.", kh: "ប្រាសាទអង្គរវត្តបុរាណត្រូវបានសាងសង់ឡើងក្នុងអំឡុងសតវត្សរ៍ទី ១២។" },
      { en: "The important business partnership was finalized and signed last week.", kh: "ភាពជាដៃគូអាជីវកម្មដ៏សំខាន់ត្រូវបានបញ្ចប់ និងចុះហត្ថលេខាកាលពីសប្តាហ៍មុន។" },
      { en: "These historical documents were discovered by archeologists in 1995.", kh: "ឯកសារប្រវត្តិសាស្ត្រទាំងនេះត្រូវបានរកឃើញដោយអ្នកបុរាណវិទ្យាក្នុងឆ្នាំ ១៩៩៥។" }
    ],
    mistake: "❌ ខុស: The bridge was destroyed in 1970 by the flood.\n✅ ត្រូវ: The bridge was destroyed in 1970 by the flood. (ត្រូវប្រើ was + V3)",
    practice: "ចូរប្តូរជា Passive Voice៖ 'Shakespeare wrote Hamlet.'"
  },
  {
    topic: "Direct and Indirect Speech",
    def: "ការនិយាយផ្ទាល់ (Direct Speech) គឺការស្រង់ពាក្យសម្តីដើមមកនិយាយទាំងស្រុងដោយដាក់ក្នុងសញ្ញាសម្រង់ (\"...\")។ ការនិយាយដោយប្រយោល (Indirect / Reported Speech) គឺការនាំពាក្យសម្តីរបស់អ្នកដទៃមកនិយាយប្រាប់គេឡើងវិញ ដោយត្រូវថយ Tense មួយកម្រិត។",
    types: "• Present Simple -> Past Simple: \"I am tired\" -> He said that he was tired.\n• Present Continuous -> Past Continuous: \"I am studying\" -> She said that she was studying.\n• Will -> Would: \"I will help\" -> He said he would help.",
    examples: [
      { en: "Direct: Sophea said, \"I want to improve my English speaking skills.\"", kh: "ផ្ទាល់៖ សុភាបាននិយាយថា៖ «ខ្ញុំចង់ពង្រឹងជំនាញនិយាយភាសាអង់គ្លេសរបស់ខ្ញុំ។»" },
      { en: "Reported: Sophea said that she wanted to improve her English speaking skills.", kh: "ប្រយោល៖ សុភាបាននិយាយថានាងចង់ពង្រឹងជំនាញនិយាយភាសាអង់គ្លេសរបស់នាង។" },
      { en: "Direct: The teacher said, \"The final examination will take place next Friday.\"", kh: "ផ្ទាល់៖ លោកគ្រូបានមានប្រសាសន៍ថា៖ «ការប្រឡងបញ្ចប់វគ្គនឹងប្រព្រឹត្តទៅនៅថ្ងៃសុក្រក្រោយ។»" },
      { en: "Reported: The teacher announced that the final examination would take place the following Friday.", kh: "ប្រយោល៖ លោកគ្រូបានប្រកាសថាការប្រឡងបញ្ចប់វគ្គនឹងប្រព្រឹត្តទៅនៅថ្ងៃសុក្របន្ទាប់។" }
    ],
    mistake: "❌ ខុស: He said that he is tired yesterday.\n✅ ត្រូវ: He said that he was tired. (កិរិយាសព្ទត្រូវថយទៅអតីតកាល was)",
    practice: "ចូរប្តូរទៅ Reported Speech៖ 'Mary said, \"I like coffee.\"'"
  },
  {
    topic: "Conditional Type 0 & 1",
    def: "លក្ខខណ្ឌ Type 0 បង្ហាញពីការពិតវិទ្យាសាស្ត្រ (If + Present, Present)។ លក្ខខណ្ឌ Type 1 បង្ហាញពីស្ថានភាពជាក់ស្តែងដែលអាចកើតឡើងក្នុងអនាគត (If + Present, will + V1)។",
    types: "• Type 0: If you freeze water, it turns into ice.\n• Type 1: If you practice every day, you will speak fluently.",
    examples: [
      { en: "If you heat ice, it melts into water instantly. (Scientific fact - Type 0)", kh: "ប្រសិនបើអ្នកកម្តៅដុំទឹកកក វានឹងរលាយទៅជាទឹកភ្លាមៗ។ (ការពិតវិទ្យាសាស្ត្រ - Type 0)" },
      { en: "If you study English consistently on StudyAI, you will pass your exam with high scores.", kh: "ប្រសិនបើអ្នករៀនភាសាអង់គ្លេសជាប្រចាំលើ StudyAI អ្នកនឹងប្រឡងជាប់ដោយទទួលបានពិន្ទុខ្ពស់។ (Type 1)" },
      { en: "If it rains tomorrow morning, we will conduct our speaking session via video call.", kh: "ប្រសិនបើមានភ្លៀងធ្លាក់នៅព្រឹកថ្ងៃស្អែក ពួកយើងនឹងរៀបចំវគ្គហ្វឹកហាត់និយាយតាមរយៈ Video Call។" }
    ],
    mistake: "❌ ខុស: If it will rain, I will stay home.\n✅ ត្រូវ: If it rains, I will stay home. (ក្នុងឃ្លា If-clause មិនប្រើ will ឡើយ)",
    practice: "ចូរបំពេញចន្លោះ៖ 'If you study hard, you (pass) ___ the test.'"
  },
  {
    topic: "Conditional Type 2",
    def: "លក្ខខណ្ឌ Type 2 ប្រើសម្រាប់និយាយអំពីស្ថានភាពសម្មតិកម្ម ស្រមើស្រមៃ ឬមិនពិតក្នុងពេលបច្ចុប្បន្ន (Unreal present situation)។",
    types: "Formula: If + Past Simple (V2), Subject + would + V1\n(ចំណាំ៖ To Be ក្នុង If-clause ប្រើ 'were' សម្រាប់គ្រប់ Subject)",
    examples: [
      { en: "If I won a million dollars, I would build modern English schools across rural Cambodia.", kh: "ប្រសិនបើខ្ញុំឈ្នះប្រាក់មួយលានដុល្លារ ខ្ញុំនឹងសាងសង់សាលារៀនភាសាអង់គ្លេសទំនើបៗនៅទូទាំងជនបទនៃប្រទេសកម្ពុជា។" },
      { en: "If I were in your position, I would take that great opportunity immediately.", kh: "ប្រសិនបើខ្ញុំស្ថិតក្នុងជំហររបស់អ្នក ខ្ញុំនឹងចាប់យកឱកាសដ៏អស្ចារ្យនោះភ្លាមៗ។ (ការផ្តល់ដំបូន្មាន)" },
      { en: "If we had more free time, we would travel around the world to practice English.", kh: "ប្រសិនបើពួកយើងមានពេលទំនេរច្រើនជាងនេះ ពួកយើងនឹងធ្វើដំណើរជុំវិញពិភពលោកដើម្បីហ្វឹកហាត់ភាសាអង់គ្លេស។" }
    ],
    mistake: "❌ ខុស: If I was you, I would study harder.\n✅ ត្រូវ: If I were you, I would study harder. (ក្នុងភាសាផ្លូវការប្រើ were)",
    practice: "ចូរបំពេញចន្លោះ៖ 'If I (have) ___ wings, I would fly.'"
  },
  {
    topic: "Conditional Type 3",
    def: "លក្ខខណ្ឌ Type 3 ប្រើសម្រាប់បង្ហាញពីការសោកស្តាយ ឬការស្រមើស្រមៃអំពីអ្វីមួយដែលបានកន្លងផុតទៅក្នុងអតីតកាល ហើយមិនអាចកែប្រែបានឡើយ (Unreal past / Regret)។",
    types: "Formula: If + Past Perfect (had + V3), Subject + would have + V3",
    examples: [
      { en: "If I had enrolled in this online English academy earlier, I would have passed the scholarship interview.", kh: "ប្រសិនបើកាលនោះខ្ញុំបានចុះឈ្មោះរៀននៅសាលាភាសាអង់គ្លេសអនឡាញនេះលឿនជាងនេះ ខ្ញុំប្រហែលជាបានជាប់សម្ភាសន៍អាហារូបករណ៍បាត់ទៅហើយ។" },
      { en: "If we had set off thirty minutes earlier, we wouldn't have missed our international flight.", kh: "ប្រសិនបើពួកយើងបានចេញដំណើរ ៣០ នាទីមុននេះ ពួកយើងច្បាស់ជាមិនខកជើងហោះហើរអន្តរជាតិនោះឡើយ។" },
      { en: "She would have achieved a band 8.0 on IELTS if she had practiced writing more frequently.", kh: "នាងច្បាស់ជាទទួលបានពិន្ទុ 8.0 លើ IELTS ប្រសិនបើនាងបានហ្វឹកហាត់សរសេរឱ្យបានញឹកញាប់ជាងនេះ។" }
    ],
    mistake: "❌ ខុស: If I had studied, I would passed.\n✅ ត្រូវ: If I had studied, I would have passed. (would have + V3)",
    practice: "ចូរបំពេញចន្លោះ៖ 'If you had called me, I (help) ___ you.'"
  }
];

const generatedCode = `module.exports = ${JSON.stringify(grammarTopics.map(t => {
  let text = `📖 និយមន័យ និងការប្រើប្រាស់ (Definition & Usage)៖\n${t.def}\n\n`;
  text += `📐 រូបមន្ត និងក្បួនវេយ្យាករណ៍ (Formulas & Rules)៖\n${t.types}\n\n`;
  text += `💡 ឧទាហរណ៍ជាក់ស្តែង & ការបកប្រែជាភាសាខ្មែរ (Practical Examples with Khmer Translation)៖\n`;
  t.examples.forEach((ex, idx) => {
    text += `${idx + 1}. 🇬🇧 ${ex.en}\n   🇰🇭 (${ex.kh})\n\n`;
  });
  text += `⚠️ កំហុសញឹកញាប់ដែលត្រូវចៀសវាង (Common Mistakes)៖\n${t.mistake}\n\n`;
  text += `✍️ លំហាត់អនុវត្ត (Practice Exercise)៖\n${t.practice}`;

  return {
    topic: t.topic,
    kh: text
  };
}), null, 2)};\n`;

fs.writeFileSync('grammar_data.js', generatedCode, 'utf8');
console.log('Successfully generated professional grammar_data.js with ' + grammarTopics.length + ' topics!');
