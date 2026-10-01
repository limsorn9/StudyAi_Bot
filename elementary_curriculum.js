/**
 * Elementary Level Curriculum (ថ្នាក់បឋមសិក្សា / Elementary English)
 * 3 Months Duration • 12 Weeks • 72 Daily Lessons
 * Taught by AI Instructor: អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)
 * Structured with Monthly Exams (em1, em2) and Elementary Graduation Exam (em3)
 */

const ELEMENTARY_COURSE = {
  "id": "elementary",
  "title": "ថ្នាក់បឋមសិក្សា (Elementary Level)",
  "code": "LEVEL_1_ELEMENTARY",
  "teacher": {
    "id": "piseth",
    "name": "អ្នកគ្រូ ពិសិដ្ឋ",
    "englishName": "Teacher Piseth AI",
    "avatar": "👩‍🏫",
    "role": "គ្រូបង្រៀនភាសាអង់គ្លេសថ្នាក់បឋម & Elementary English Specialist",
    "badge": "Elementary English Coach",
    "welcomeGreeting": "សួស្តីកូនៗ និងប្អូនៗទាំងអស់គ្នា! ស្វាគមន៍មកកាន់ \"ថ្នាក់បឋមសិក្សា (Elementary Level)\" ជាមួយអ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth)។ ក្នុងវគ្គ ៣ ខែនេះ យើងនឹងរៀនវេយ្យាករណ៍គ្រឹះ ពាក្យគន្លឹះ និងការសន្ទនាជាក់ស្តែងចំនួន ៧២ ថ្ងៃ ដើម្បីនិយាយ និងប្រើប្រាស់ភាសាអង់គ្លេសបានកាន់តែស្ទាត់ជំនាញ! 🌟"
  },
  "monthsCount": 3,
  "totalLessons": 72,
  "months": [
    {
      "id": "em1",
      "monthNum": 1,
      "title": "ខែទី 1៖ មូលដ្ឋានគ្រឹះ ណែនាំខ្លួន និងកិរិយាសព្ទ Be / Have",
      "examId": "elem_exam_m1",
      "examTitle": "ការប្រឡងប្រចាំខែទី 1 (Month 1 Final Exam)",
      "weeks": [
        {
          "id": "ew1",
          "weekNum": 1,
          "monthWeekNum": 1,
          "title": "សប្តាហ៍ទី 1 (ថ្ងៃទី 1 - 6)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 1 ខែទី 1",
          "lessons": [
            {
              "id": "el1",
              "day": 1,
              "title": "ថ្ងៃទី 1៖ សព្វនាមប្រធាន Subject Pronouns (Subject Pronouns (I, You, We, They, He, She, It))",
              "topic": "សព្វនាមប្រធាន Subject Pronouns",
              "grammar": "សព្វនាមប្រធាន (Subject Pronouns) គឺជាពាក្យដែលប្រើជំនួសឱ្យនាម ដើម្បីធ្វើជាប្រធាននៃល្បះ។\n• I = ខ្ញុំ\n• You = អ្នក / ឯង / លោក\n• We = ពួកយើង\n• They = ពួកគេ / ពួកវា\n• He = គាត់ (បុរសម្នាក់)\n• She = នាង (ស្ត្រីម្នាក់)\n• It = វា (សត្វ ឬវត្ថុមួយ)",
              "vocab": [
                {
                  "en": "I",
                  "kh": "ខ្ញុំ",
                  "ipa": "/aɪ/",
                  "exEn": "I am an eager student.",
                  "exKh": "ខ្ញុំជាសិស្សដែលមានចិត្តចង់រៀនសូត្រ។"
                },
                {
                  "en": "You",
                  "kh": "អ្នក",
                  "ipa": "/juː/",
                  "exEn": "You are very kind and polite.",
                  "exKh": "អ្នកមានចិត្តល្អ និងគួរសមណាស់។"
                },
                {
                  "en": "We",
                  "kh": "ពួកយើង",
                  "ipa": "/wiː/",
                  "exEn": "We study English together every day.",
                  "exKh": "ពួកយើងរៀនភាសាអង់គ្លេសជាមួយគ្នារាល់ថ្ងៃ។"
                },
                {
                  "en": "They",
                  "kh": "ពួកគេ",
                  "ipa": "/ðeɪ/",
                  "exEn": "They are happy in the school library.",
                  "exKh": "ពួកគេសប្បាយរីករាយនៅក្នុងបណ្ណាល័យសាលា។"
                },
                {
                  "en": "He",
                  "kh": "គាត់",
                  "ipa": "/hiː/",
                  "exEn": "He is my hard-working brother.",
                  "exKh": "គាត់ជាបងប្រុសដ៏ឧស្សាហ៍របស់ខ្ញុំ។"
                },
                {
                  "en": "She",
                  "kh": "នាង",
                  "ipa": "/ʃiː/",
                  "exEn": "She is a smart English teacher.",
                  "exKh": "នាងជាគ្រូបង្រៀនភាសាអង់គ្លេសដ៏ឆ្លាតវៃម្នាក់។"
                }
              ],
              "sentences": [
                {
                  "en": "I am ready to learn English today.",
                  "kh": "ខ្ញុំរួចរាល់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះហើយ។"
                },
                {
                  "en": "She is my best friend in Phnom Penh.",
                  "kh": "នាងជាមិត្តភក្តិល្អបំផុតរបស់ខ្ញុំនៅភ្នំពេញ។"
                },
                {
                  "en": "We speak English with Teacher Piseth.",
                  "kh": "ពួកយើងនិយាយភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Hello! Welcome to the Elementary Course! What is your name?",
                  "kh": "សួស្តី! ស្វាគមន៍មកកាន់ថ្នាក់បឋមសិក្សា! តើកូនឈ្មោះអ្វីដែរ?"
                },
                {
                  "speaker": "Student",
                  "en": "Hello Teacher Piseth! I am Dara, and she is my sister Bopha.",
                  "kh": "ជម្រាបសួរអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំឈ្មោះដារ៉ា ហើយនាងជាប្អូនស្រីខ្ញុំឈ្មោះបុប្ផា។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome Dara and Bopha! We will learn together with joy.",
                  "kh": "ស្វាគមន៍ដារ៉ា និងបុប្ផា! ពួកយើងនឹងរៀនជាមួយគ្នាដោយភាពសប្បាយរីករាយ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 1\n🎯 ប្រធានបទ៖ សព្វនាមប្រធាន Subject Pronouns (Subject Pronouns (I, You, We, They, He, She, It))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nសព្វនាមប្រធាន (Subject Pronouns) គឺជាពាក្យដែលប្រើជំនួសឱ្យនាម ដើម្បីធ្វើជាប្រធាននៃល្បះ។\n• I = ខ្ញុំ\n• You = អ្នក / ឯង / លោក\n• We = ពួកយើង\n• They = ពួកគេ / ពួកវា\n• He = គាត់ (បុរសម្នាក់)\n• She = នាង (ស្ត្រីម្នាក់)\n• It = វា (សត្វ ឬវត្ថុមួយ)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 I (/aɪ/) = 🇰🇭 ខ្ញុំ\n   ↳ ឧទាហរណ៍៖ I am an eager student.\n   ↳ បកប្រែ៖ (ខ្ញុំជាសិស្សដែលមានចិត្តចង់រៀនសូត្រ។)\n\n2. 🇬🇧 You (/juː/) = 🇰🇭 អ្នក\n   ↳ ឧទាហរណ៍៖ You are very kind and polite.\n   ↳ បកប្រែ៖ (អ្នកមានចិត្តល្អ និងគួរសមណាស់។)\n\n3. 🇬🇧 We (/wiː/) = 🇰🇭 ពួកយើង\n   ↳ ឧទាហរណ៍៖ We study English together every day.\n   ↳ បកប្រែ៖ (ពួកយើងរៀនភាសាអង់គ្លេសជាមួយគ្នារាល់ថ្ងៃ។)\n\n4. 🇬🇧 They (/ðeɪ/) = 🇰🇭 ពួកគេ\n   ↳ ឧទាហរណ៍៖ They are happy in the school library.\n   ↳ បកប្រែ៖ (ពួកគេសប្បាយរីករាយនៅក្នុងបណ្ណាល័យសាលា។)\n\n5. 🇬🇧 He (/hiː/) = 🇰🇭 គាត់\n   ↳ ឧទាហរណ៍៖ He is my hard-working brother.\n   ↳ បកប្រែ៖ (គាត់ជាបងប្រុសដ៏ឧស្សាហ៍របស់ខ្ញុំ។)\n\n6. 🇬🇧 She (/ʃiː/) = 🇰🇭 នាង\n   ↳ ឧទាហរណ៍៖ She is a smart English teacher.\n   ↳ បកប្រែ៖ (នាងជាគ្រូបង្រៀនភាសាអង់គ្លេសដ៏ឆ្លាតវៃម្នាក់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am ready to learn English today.\n   🇰🇭 (ខ្ញុំរួចរាល់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះហើយ។)\n2. 🇬🇧 She is my best friend in Phnom Penh.\n   🇰🇭 (នាងជាមិត្តភក្តិល្អបំផុតរបស់ខ្ញុំនៅភ្នំពេញ។)\n3. 🇬🇧 We speak English with Teacher Piseth.\n   🇰🇭 (ពួកយើងនិយាយភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Hello! Welcome to the Elementary Course! What is your name?\"\n   🇰🇭 (សួស្តី! ស្វាគមន៍មកកាន់ថ្នាក់បឋមសិក្សា! តើកូនឈ្មោះអ្វីដែរ?)\n\n👤 Student:\n   🇬🇧 \"Hello Teacher Piseth! I am Dara, and she is my sister Bopha.\"\n   🇰🇭 (ជម្រាបសួរអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំឈ្មោះដារ៉ា ហើយនាងជាប្អូនស្រីខ្ញុំឈ្មោះបុប្ផា។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome Dara and Bopha! We will learn together with joy.\"\n   🇰🇭 (ស្វាគមន៍ដារ៉ា និងបុប្ផា! ពួកយើងនឹងរៀនជាមួយគ្នាដោយភាពសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el2",
              "day": 2,
              "title": "ថ្ងៃទី 2៖ កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប (Verb To Be Present (Am, Is, Are) - Affirmative)",
              "topic": "កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប",
              "grammar": "កិរិយាសព្ទ \"To Be\" ប្រែថា \"ជា, គឺ, នៅ\"។\n• I + am (I am = ខ្ញុំគឺ/ជា/នៅ)\n• He / She / It + is (He is, She is, It is)\n• You / We / They + are (You are, We are, They are)",
              "vocab": [
                {
                  "en": "am",
                  "kh": "ជា/គឺ (ប្រើជាមួយ I)",
                  "ipa": "/æm/",
                  "exEn": "I am ready for lesson two.",
                  "exKh": "ខ្ញុំរួចរាល់សម្រាប់មេរៀនទី ២។"
                },
                {
                  "en": "is",
                  "kh": "ជា/គឺ (ប្រើជាមួយ He/She/It)",
                  "ipa": "/ɪz/",
                  "exEn": "He is a great doctor in hospital.",
                  "exKh": "គាត់ជាវេជ្ជបណ្ឌិតដ៏ពូកែម្នាក់ក្នុងមន្ទីរពេទ្យ។"
                },
                {
                  "en": "are",
                  "kh": "ជា/គឺ (ប្រើជាមួយ You/We/They)",
                  "ipa": "/ɑːr/",
                  "exEn": "We are active learners.",
                  "exKh": "ពួកយើងជាអ្នករៀនសូត្រដ៏សកម្ម។"
                },
                {
                  "en": "happy",
                  "kh": "រីករាយ / សប្បាយចិត្ត",
                  "ipa": "/ˈhæpi/",
                  "exEn": "The children are very happy.",
                  "exKh": "ក្មេងៗសប្បាយរីករាយខ្លាំងណាស់។"
                },
                {
                  "en": "clever",
                  "kh": "ឆ្លាតវៃ",
                  "ipa": "/ˈklevər/",
                  "exEn": "She is a clever girl.",
                  "exKh": "នាងជាក្មេងស្រីឆ្លាតម្នាក់។"
                }
              ],
              "sentences": [
                {
                  "en": "I am an English learner.",
                  "kh": "ខ្ញុំជាអ្នករៀនភាសាអង់គ្លេសម្នាក់។"
                },
                {
                  "en": "He is a friendly student.",
                  "kh": "គាត់ជាសិស្សរួសរាយម្នាក់។"
                },
                {
                  "en": "They are in the classroom now.",
                  "kh": "ពួកគេនៅក្នុងបន្ទប់រៀនឥឡូវនេះ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "How are you feeling today, class?",
                  "kh": "តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរថ្ងៃនេះ?"
                },
                {
                  "speaker": "Student",
                  "en": "We are excited! I am very happy to see you, Teacher.",
                  "kh": "ពួកយើងរំភើបណាស់! ខ្ញុំសប្បាយចិត្តខ្លាំងណាស់ដែលបានជួបអ្នកគ្រូ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "I am thrilled to hear that! You are all wonderful students.",
                  "kh": "អ្នកគ្រូរីករាយណាស់ដែលបានឮបែបនេះ! កូនៗទាំងអស់សុទ្ធតែជាសិស្សដ៏អស្ចារ្យ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 2\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប (Verb To Be Present (Am, Is, Are) - Affirmative)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទ \"To Be\" ប្រែថា \"ជា, គឺ, នៅ\"។\n• I + am (I am = ខ្ញុំគឺ/ជា/នៅ)\n• He / She / It + is (He is, She is, It is)\n• You / We / They + are (You are, We are, They are)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 am (/æm/) = 🇰🇭 ជា/គឺ (ប្រើជាមួយ I)\n   ↳ ឧទាហរណ៍៖ I am ready for lesson two.\n   ↳ បកប្រែ៖ (ខ្ញុំរួចរាល់សម្រាប់មេរៀនទី ២។)\n\n2. 🇬🇧 is (/ɪz/) = 🇰🇭 ជា/គឺ (ប្រើជាមួយ He/She/It)\n   ↳ ឧទាហរណ៍៖ He is a great doctor in hospital.\n   ↳ បកប្រែ៖ (គាត់ជាវេជ្ជបណ្ឌិតដ៏ពូកែម្នាក់ក្នុងមន្ទីរពេទ្យ។)\n\n3. 🇬🇧 are (/ɑːr/) = 🇰🇭 ជា/គឺ (ប្រើជាមួយ You/We/They)\n   ↳ ឧទាហរណ៍៖ We are active learners.\n   ↳ បកប្រែ៖ (ពួកយើងជាអ្នករៀនសូត្រដ៏សកម្ម។)\n\n4. 🇬🇧 happy (/ˈhæpi/) = 🇰🇭 រីករាយ / សប្បាយចិត្ត\n   ↳ ឧទាហរណ៍៖ The children are very happy.\n   ↳ បកប្រែ៖ (ក្មេងៗសប្បាយរីករាយខ្លាំងណាស់។)\n\n5. 🇬🇧 clever (/ˈklevər/) = 🇰🇭 ឆ្លាតវៃ\n   ↳ ឧទាហរណ៍៖ She is a clever girl.\n   ↳ បកប្រែ៖ (នាងជាក្មេងស្រីឆ្លាតម្នាក់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am an English learner.\n   🇰🇭 (ខ្ញុំជាអ្នករៀនភាសាអង់គ្លេសម្នាក់។)\n2. 🇬🇧 He is a friendly student.\n   🇰🇭 (គាត់ជាសិស្សរួសរាយម្នាក់។)\n3. 🇬🇧 They are in the classroom now.\n   🇰🇭 (ពួកគេនៅក្នុងបន្ទប់រៀនឥឡូវនេះ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How are you feeling today, class?\"\n   🇰🇭 (តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរថ្ងៃនេះ?)\n\n👤 Student:\n   🇬🇧 \"We are excited! I am very happy to see you, Teacher.\"\n   🇰🇭 (ពួកយើងរំភើបណាស់! ខ្ញុំសប្បាយចិត្តខ្លាំងណាស់ដែលបានជួបអ្នកគ្រូ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"I am thrilled to hear that! You are all wonderful students.\"\n   🇰🇭 (អ្នកគ្រូរីករាយណាស់ដែលបានឮបែបនេះ! កូនៗទាំងអស់សុទ្ធតែជាសិស្សដ៏អស្ចារ្យ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el3",
              "day": 3,
              "title": "ថ្ងៃទី 3៖ កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ (Verb To Be - Negative & Questions (Not, Are you...?))",
              "topic": "កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ",
              "grammar": "១. ទម្រង់បដិសេធ (Negative): ថែម NOT ពីក្រោយ To Be\n• I am not... (I'm not...)\n• He / She / It is not... (isn't)\n• You / We / They are not... (aren't)\n២. ទម្រង់សំណួរ (Question): លើក Am / Is / Are មកដាក់មុខប្រធាន\n• Are you ready? -> Yes, I am. / No, I am not.\n• Is he a teacher? -> Yes, he is. / No, he isn't.",
              "vocab": [
                {
                  "en": "not",
                  "kh": "មិន/ទេ (បដិសេធ)",
                  "ipa": "/nɒt/",
                  "exEn": "I am not tired today.",
                  "exKh": "ខ្ញុំមិនអស់កម្លាំងទេថ្ងៃនេះ។"
                },
                {
                  "en": "isn't",
                  "kh": "មិនមែន (is not)",
                  "ipa": "/ˈɪznt/",
                  "exEn": "She isn't sad at all.",
                  "exKh": "នាងមិនកើតទុក្ខទាល់តែសោះ។"
                },
                {
                  "en": "aren't",
                  "kh": "មិនមែន (are not)",
                  "ipa": "/ɑːnt/",
                  "exEn": "We aren't late for class.",
                  "exKh": "ពួកយើងមិនយឺតពេលចូលរៀនទេ។"
                },
                {
                  "en": "ready",
                  "kh": "រួចរាល់",
                  "ipa": "/ˈredi/",
                  "exEn": "Are you ready for the quiz?",
                  "exKh": "តើអ្នករួចរាល់សម្រាប់សំណួរតេស្តហើយឬនៅ?"
                }
              ],
              "sentences": [
                {
                  "en": "I am not afraid of speaking English.",
                  "kh": "ខ្ញុំមិនខ្លាចការនិយាយភាសាអង់គ្លេសឡើយ។"
                },
                {
                  "en": "Is she your English teacher? Yes, she is.",
                  "kh": "តើនាងជាគ្រូភាសាអង់គ្លេសរបស់អ្នកមែនទេ? ចាស ពិតមែនហើយ។"
                },
                {
                  "en": "Are they from Cambodia? Yes, they are.",
                  "kh": "តើពួកគេមកពីប្រទេសកម្ពុជាមែនទេ? បាទ គឺពិតមែនហើយ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Are you nervous about speaking English?",
                  "kh": "តើកូនមានការភ័យខ្លាចក្នុងការនិយាយភាសាអង់គ្លេសទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "No, I am not nervous with Teacher Piseth!",
                  "kh": "អត់ទេអ្នកគ្រូ ខ្ញុំមិនភ័យទេនៅពេលរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Excellent attitude! Confidence is the key to success.",
                  "kh": "អាកប្បកិរិយាដ៏ល្អឥតខ្ចោះ! ទំនុកចិត្តគឺជាកូនសោនៃភាពជោគជ័យ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 3\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ (Verb To Be - Negative & Questions (Not, Are you...?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\n១. ទម្រង់បដិសេធ (Negative): ថែម NOT ពីក្រោយ To Be\n• I am not... (I'm not...)\n• He / She / It is not... (isn't)\n• You / We / They are not... (aren't)\n២. ទម្រង់សំណួរ (Question): លើក Am / Is / Are មកដាក់មុខប្រធាន\n• Are you ready? -> Yes, I am. / No, I am not.\n• Is he a teacher? -> Yes, he is. / No, he isn't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 not (/nɒt/) = 🇰🇭 មិន/ទេ (បដិសេធ)\n   ↳ ឧទាហរណ៍៖ I am not tired today.\n   ↳ បកប្រែ៖ (ខ្ញុំមិនអស់កម្លាំងទេថ្ងៃនេះ។)\n\n2. 🇬🇧 isn't (/ˈɪznt/) = 🇰🇭 មិនមែន (is not)\n   ↳ ឧទាហរណ៍៖ She isn't sad at all.\n   ↳ បកប្រែ៖ (នាងមិនកើតទុក្ខទាល់តែសោះ។)\n\n3. 🇬🇧 aren't (/ɑːnt/) = 🇰🇭 មិនមែន (are not)\n   ↳ ឧទាហរណ៍៖ We aren't late for class.\n   ↳ បកប្រែ៖ (ពួកយើងមិនយឺតពេលចូលរៀនទេ។)\n\n4. 🇬🇧 ready (/ˈredi/) = 🇰🇭 រួចរាល់\n   ↳ ឧទាហរណ៍៖ Are you ready for the quiz?\n   ↳ បកប្រែ៖ (តើអ្នករួចរាល់សម្រាប់សំណួរតេស្តហើយឬនៅ?)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am not afraid of speaking English.\n   🇰🇭 (ខ្ញុំមិនខ្លាចការនិយាយភាសាអង់គ្លេសឡើយ។)\n2. 🇬🇧 Is she your English teacher? Yes, she is.\n   🇰🇭 (តើនាងជាគ្រូភាសាអង់គ្លេសរបស់អ្នកមែនទេ? ចាស ពិតមែនហើយ។)\n3. 🇬🇧 Are they from Cambodia? Yes, they are.\n   🇰🇭 (តើពួកគេមកពីប្រទេសកម្ពុជាមែនទេ? បាទ គឺពិតមែនហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Are you nervous about speaking English?\"\n   🇰🇭 (តើកូនមានការភ័យខ្លាចក្នុងការនិយាយភាសាអង់គ្លេសទេ?)\n\n👤 Student:\n   🇬🇧 \"No, I am not nervous with Teacher Piseth!\"\n   🇰🇭 (អត់ទេអ្នកគ្រូ ខ្ញុំមិនភ័យទេនៅពេលរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Excellent attitude! Confidence is the key to success.\"\n   🇰🇭 (អាកប្បកិរិយាដ៏ល្អឥតខ្ចោះ! ទំនុកចិត្តគឺជាកូនសោនៃភាពជោគជ័យ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el4",
              "day": 4,
              "title": "ថ្ងៃទី 4៖ គុណនាមកម្មសិទ្ធិ Possessive Adjectives (Possessive Adjectives (My, Your, His, Her, Our, Their))",
              "topic": "គុណនាមកម្មសិទ្ធិ Possessive Adjectives",
              "grammar": "គុណនាមកម្មសិទ្ធិ (Possessive Adjectives) ប្រើដើម្បីបង្ហាញភាពជាម្ចាស់ ហើយត្រូវនៅមុខនាមជានិច្ច៖\n• I -> My (របស់ខ្ញុំ): my book\n• You -> Your (របស់អ្នក): your pencil\n• He -> His (របស់គាត់): his bag\n• She -> Her (របស់នាង): her notebook\n• It -> Its (របស់វា): its color\n• We -> Our (របស់យើង): our classroom\n• They -> Their (របស់ពួកគេ): their teacher",
              "vocab": [
                {
                  "en": "my",
                  "kh": "របស់ខ្ញុំ",
                  "ipa": "/maɪ/",
                  "exEn": "This is my English book.",
                  "exKh": "នេះជាសៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំ។"
                },
                {
                  "en": "your",
                  "kh": "របស់អ្នក",
                  "ipa": "/jɔːr/",
                  "exEn": "Your pronunciation is great.",
                  "exKh": "ការបញ្ចេញសំឡេងរបស់អ្នកពូកែណាស់។"
                },
                {
                  "en": "his",
                  "kh": "របស់គាត់",
                  "ipa": "/hɪz/",
                  "exEn": "His brother lives in Siem Reap.",
                  "exKh": "បងប្រុសរបស់គាត់រស់នៅសៀមរាប។"
                },
                {
                  "en": "her",
                  "kh": "របស់នាង",
                  "ipa": "/hɜːr/",
                  "exEn": "Her smile is very warm.",
                  "exKh": "ស្នាមញញឹមរបស់នាងកក់ក្តៅណាស់។"
                },
                {
                  "en": "our",
                  "kh": "របស់យើង",
                  "ipa": "/ˈaʊər/",
                  "exEn": "Our classroom is clean and bright.",
                  "exKh": "បន្ទប់រៀនរបស់យើងស្អាត និងភ្លឺច្បាស់ល្អ។"
                },
                {
                  "en": "their",
                  "kh": "របស់ពួកគេ",
                  "ipa": "/ðeər/",
                  "exEn": "Their school is near the river.",
                  "exKh": "សាលារៀនរបស់ពួកគេនៅជិតមាត់ទន្លេ។"
                }
              ],
              "sentences": [
                {
                  "en": "This is my favorite English lesson.",
                  "kh": "នេះគឺជាមេរៀនភាសាអង់គ្លេសដែលខ្ញុំចូលចិត្តបំផុត។"
                },
                {
                  "en": "Her notebook is full of new vocabulary.",
                  "kh": "សៀវភៅកត់ត្រារបស់នាងពោរពេញដោយវាក្យសព្ទថ្មីៗ។"
                },
                {
                  "en": "Our teacher explains every grammar rule clearly.",
                  "kh": "អ្នកគ្រូរបស់យើងពន្យល់ក្បួនវេយ្យាករណ៍នីមួយៗយ៉ាងច្បាស់លាស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Is this your red pen on the desk, Socheat?",
                  "kh": "សុជាតិ តើនេះជាប៊ិចក្រហមរបស់កូននៅលើតុរៀនមែនទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "No, it is not my pen. It is her pen, Teacher.",
                  "kh": "ទេអ្នកគ្រូ វាមិនមែនជាប៊ិចរបស់ខ្ញុំទេ។ វាជាប៊ិចរបស់នាង។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Thank you for your honesty! Bopha, here is your pen.",
                  "kh": "អរគុណសម្រាប់ភាពស្មោះត្រង់របស់កូន! បុប្ផា នេះជាប៊ិចរបស់កូន។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 4\n🎯 ប្រធានបទ៖ គុណនាមកម្មសិទ្ធិ Possessive Adjectives (Possessive Adjectives (My, Your, His, Her, Our, Their))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nគុណនាមកម្មសិទ្ធិ (Possessive Adjectives) ប្រើដើម្បីបង្ហាញភាពជាម្ចាស់ ហើយត្រូវនៅមុខនាមជានិច្ច៖\n• I -> My (របស់ខ្ញុំ): my book\n• You -> Your (របស់អ្នក): your pencil\n• He -> His (របស់គាត់): his bag\n• She -> Her (របស់នាង): her notebook\n• It -> Its (របស់វា): its color\n• We -> Our (របស់យើង): our classroom\n• They -> Their (របស់ពួកគេ): their teacher\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 my (/maɪ/) = 🇰🇭 របស់ខ្ញុំ\n   ↳ ឧទាហរណ៍៖ This is my English book.\n   ↳ បកប្រែ៖ (នេះជាសៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំ។)\n\n2. 🇬🇧 your (/jɔːr/) = 🇰🇭 របស់អ្នក\n   ↳ ឧទាហរណ៍៖ Your pronunciation is great.\n   ↳ បកប្រែ៖ (ការបញ្ចេញសំឡេងរបស់អ្នកពូកែណាស់។)\n\n3. 🇬🇧 his (/hɪz/) = 🇰🇭 របស់គាត់\n   ↳ ឧទាហរណ៍៖ His brother lives in Siem Reap.\n   ↳ បកប្រែ៖ (បងប្រុសរបស់គាត់រស់នៅសៀមរាប។)\n\n4. 🇬🇧 her (/hɜːr/) = 🇰🇭 របស់នាង\n   ↳ ឧទាហរណ៍៖ Her smile is very warm.\n   ↳ បកប្រែ៖ (ស្នាមញញឹមរបស់នាងកក់ក្តៅណាស់។)\n\n5. 🇬🇧 our (/ˈaʊər/) = 🇰🇭 របស់យើង\n   ↳ ឧទាហរណ៍៖ Our classroom is clean and bright.\n   ↳ បកប្រែ៖ (បន្ទប់រៀនរបស់យើងស្អាត និងភ្លឺច្បាស់ល្អ។)\n\n6. 🇬🇧 their (/ðeər/) = 🇰🇭 របស់ពួកគេ\n   ↳ ឧទាហរណ៍៖ Their school is near the river.\n   ↳ បកប្រែ៖ (សាលារៀនរបស់ពួកគេនៅជិតមាត់ទន្លេ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 This is my favorite English lesson.\n   🇰🇭 (នេះគឺជាមេរៀនភាសាអង់គ្លេសដែលខ្ញុំចូលចិត្តបំផុត។)\n2. 🇬🇧 Her notebook is full of new vocabulary.\n   🇰🇭 (សៀវភៅកត់ត្រារបស់នាងពោរពេញដោយវាក្យសព្ទថ្មីៗ។)\n3. 🇬🇧 Our teacher explains every grammar rule clearly.\n   🇰🇭 (អ្នកគ្រូរបស់យើងពន្យល់ក្បួនវេយ្យាករណ៍នីមួយៗយ៉ាងច្បាស់លាស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Is this your red pen on the desk, Socheat?\"\n   🇰🇭 (សុជាតិ តើនេះជាប៊ិចក្រហមរបស់កូននៅលើតុរៀនមែនទេ?)\n\n👤 Student:\n   🇬🇧 \"No, it is not my pen. It is her pen, Teacher.\"\n   🇰🇭 (ទេអ្នកគ្រូ វាមិនមែនជាប៊ិចរបស់ខ្ញុំទេ។ វាជាប៊ិចរបស់នាង។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Thank you for your honesty! Bopha, here is your pen.\"\n   🇰🇭 (អរគុណសម្រាប់ភាពស្មោះត្រង់របស់កូន! បុប្ផា នេះជាប៊ិចរបស់កូន។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el5",
              "day": 5,
              "title": "ថ្ងៃទី 5៖ សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ (Classroom & Daily Objects (Pen, Book, Bag, Chair, Desk))",
              "topic": "សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ",
              "grammar": "ការប្រើ A និង AN ជាមួយនាមឯកវចនៈរាប់បាន៖\n• A + ពាក្យផ្ដើមដោយសូរព្យញ្ជនៈ: a pen, a book, a bag, a desk, a chair\n• AN + ពាក្យផ្ដើមដោយសូរស្រៈ (a, e, i, o, u): an eraser, an apple, an umbrella",
              "vocab": [
                {
                  "en": "pen",
                  "kh": "ប៊ិច",
                  "ipa": "/pen/",
                  "exEn": "I write notes with a blue pen.",
                  "exKh": "ខ្ញុំកត់ត្រាដោយប៊ិចពណ៌ខៀវមួយដើម។"
                },
                {
                  "en": "book",
                  "kh": "សៀវភៅ",
                  "ipa": "/bʊk/",
                  "exEn": "Please read your English book.",
                  "exKh": "សូមអានសៀវភៅភាសាអង់គ្លេសរបស់អ្នក។"
                },
                {
                  "en": "bag",
                  "kh": "កាតាប / កាបូប",
                  "ipa": "/bæɡ/",
                  "exEn": "My bag has books and pens.",
                  "exKh": "កាតាបរបស់ខ្ញុំមានសៀវភៅ និងប៊ិច។"
                },
                {
                  "en": "chair",
                  "kh": "កៅអី",
                  "ipa": "/tʃeər/",
                  "exEn": "Sit down on the chair.",
                  "exKh": "សូមអង្គុយចុះលើកៅអី។"
                },
                {
                  "en": "eraser",
                  "kh": "ជ័រលុប",
                  "ipa": "/ɪˈreɪsər/",
                  "exEn": "May I borrow an eraser?",
                  "exKh": "តើខ្ញុំអាចខ្ចីជ័រលុបមួយបានទេ?"
                }
              ],
              "sentences": [
                {
                  "en": "There is a book on the desk.",
                  "kh": "មានសៀវភៅមួយក្បាលនៅលើតុ។"
                },
                {
                  "en": "She puts an eraser inside her bag.",
                  "kh": "នាងដាក់ជ័រលុបមួយចូលក្នុងកាតាបរបស់នាង។"
                },
                {
                  "en": "Every student has a notebook and a pen.",
                  "kh": "សិស្សគ្រប់រូបមានសៀវភៅកត់ត្រាមួយក្បាល និងប៊ិចមួយដើម។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Do you have your English book and pen ready?",
                  "kh": "តើកូនៗបានរៀបចំសៀវភៅអង់គ្លេស និងប៊ិចរួចរាល់ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher! My book is open and my pen is in my hand.",
                  "kh": "ចាសអ្នកគ្រូ! សៀវភៅរបស់ខ្ញុំបើករួចរាល់ ហើយប៊ិចនៅក្នុងដៃខ្ញុំហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Superb! Let us write today's five new words neatly.",
                  "kh": "ល្អឥតខ្ចោះ! តោះយើងសរសេរពាក្យថ្មីទាំង ៥ ថ្ងៃនេះឱ្យស្អាតទាំងអស់គ្នា។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 5\n🎯 ប្រធានបទ៖ សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ (Classroom & Daily Objects (Pen, Book, Bag, Chair, Desk))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការប្រើ A និង AN ជាមួយនាមឯកវចនៈរាប់បាន៖\n• A + ពាក្យផ្ដើមដោយសូរព្យញ្ជនៈ: a pen, a book, a bag, a desk, a chair\n• AN + ពាក្យផ្ដើមដោយសូរស្រៈ (a, e, i, o, u): an eraser, an apple, an umbrella\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 pen (/pen/) = 🇰🇭 ប៊ិច\n   ↳ ឧទាហរណ៍៖ I write notes with a blue pen.\n   ↳ បកប្រែ៖ (ខ្ញុំកត់ត្រាដោយប៊ិចពណ៌ខៀវមួយដើម។)\n\n2. 🇬🇧 book (/bʊk/) = 🇰🇭 សៀវភៅ\n   ↳ ឧទាហរណ៍៖ Please read your English book.\n   ↳ បកប្រែ៖ (សូមអានសៀវភៅភាសាអង់គ្លេសរបស់អ្នក។)\n\n3. 🇬🇧 bag (/bæɡ/) = 🇰🇭 កាតាប / កាបូប\n   ↳ ឧទាហរណ៍៖ My bag has books and pens.\n   ↳ បកប្រែ៖ (កាតាបរបស់ខ្ញុំមានសៀវភៅ និងប៊ិច។)\n\n4. 🇬🇧 chair (/tʃeər/) = 🇰🇭 កៅអី\n   ↳ ឧទាហរណ៍៖ Sit down on the chair.\n   ↳ បកប្រែ៖ (សូមអង្គុយចុះលើកៅអី។)\n\n5. 🇬🇧 eraser (/ɪˈreɪsər/) = 🇰🇭 ជ័រលុប\n   ↳ ឧទាហរណ៍៖ May I borrow an eraser?\n   ↳ បកប្រែ៖ (តើខ្ញុំអាចខ្ចីជ័រលុបមួយបានទេ?)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 There is a book on the desk.\n   🇰🇭 (មានសៀវភៅមួយក្បាលនៅលើតុ។)\n2. 🇬🇧 She puts an eraser inside her bag.\n   🇰🇭 (នាងដាក់ជ័រលុបមួយចូលក្នុងកាតាបរបស់នាង។)\n3. 🇬🇧 Every student has a notebook and a pen.\n   🇰🇭 (សិស្សគ្រប់រូបមានសៀវភៅកត់ត្រាមួយក្បាល និងប៊ិចមួយដើម។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Do you have your English book and pen ready?\"\n   🇰🇭 (តើកូនៗបានរៀបចំសៀវភៅអង់គ្លេស និងប៊ិចរួចរាល់ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher! My book is open and my pen is in my hand.\"\n   🇰🇭 (ចាសអ្នកគ្រូ! សៀវភៅរបស់ខ្ញុំបើករួចរាល់ ហើយប៊ិចនៅក្នុងដៃខ្ញុំហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Superb! Let us write today's five new words neatly.\"\n   🇰🇭 (ល្អឥតខ្ចោះ! តោះយើងសរសេរពាក្យថ្មីទាំង ៥ ថ្ងៃនេះឱ្យស្អាតទាំងអស់គ្នា។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el6",
              "day": 6,
              "title": "ថ្ងៃទី 6៖ រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន (Weekly Review & Dialogue: Introducing Myself & My Friend)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន",
              "grammar": "រំលឹកសរុបសប្តាហ៍ទី ១៖\n១. Pronouns: I, You, He, She, We, They, It\n២. Verb To Be: I am, You are, He is, She is, We are, They are\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Classroom Objects & A/An\n៥. ឃ្លាគន្លឹះ៖ \"Nice to meet you!\", \"This is my friend.\"",
              "vocab": [
                {
                  "en": "introduce",
                  "kh": "ណែនាំ",
                  "ipa": "/ˌɪntrəˈdjuːs/",
                  "exEn": "Let me introduce my friend.",
                  "exKh": "អនុញ្ញាតឱ្យខ្ញុំណែនាំមិត្តភក្តិរបស់ខ្ញុំ។"
                },
                {
                  "en": "friend",
                  "kh": "មិត្តភក្តិ",
                  "ipa": "/frend/",
                  "exEn": "He is my best friend.",
                  "exKh": "គាត់ជាមិត្តល្អបំផុតរបស់ខ្ញុំ។"
                },
                {
                  "en": "pleasure",
                  "kh": "សេចក្តីរីករាយ",
                  "ipa": "/ˈpleʒər/",
                  "exEn": "It is a pleasure to meet you.",
                  "exKh": "វាជាសេចក្តីរីករាយណាស់ដែលបានស្គាល់អ្នក។"
                },
                {
                  "en": "classmate",
                  "kh": "មិត្តរួមថ្នាក់",
                  "ipa": "/ˈklɑːsmeɪt/",
                  "exEn": "We are friendly classmates.",
                  "exKh": "ពួកយើងជាមិត្តរួមថ្នាក់ដ៏រួសរាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "Hello! My name is Sok and I am a student.",
                  "kh": "សួស្តី! ខ្ញុំឈ្មោះសុខ ហើយខ្ញុំជាសិស្សម្នាក់។"
                },
                {
                  "en": "This is my classmate, her name is Chenda.",
                  "kh": "នេះជាមិត្តរួមថ្នាក់របស់ខ្ញុំ នាងឈ្មោះចិន្តា។"
                },
                {
                  "en": "We are very proud to study English with Teacher Piseth.",
                  "kh": "ពួកយើងមានមោទនភាពណាស់ដែលបានរៀនភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Who can practice introducing a classmate in English?",
                  "kh": "តើកូនណាខ្លះអាចអនុវត្តការណែនាំមិត្តរួមថ្នាក់ជាភាសាអង់គ្លេសបាន?"
                },
                {
                  "speaker": "Student",
                  "en": "Teacher Piseth, this is my friend Vathanak. He is ten years old and he is very smart.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋ នេះជាមិត្តរបស់ខ្ញុំឈ្មោះវឌ្ឍនៈ។ គាត់អាយុ ១០ ឆ្នាំ ហើយគាត់ឆ្លាតណាស់។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Outstanding job! Your pronunciation is very natural.",
                  "kh": "ពូកែអស្ចារ្យណាស់! ការបញ្ចេញសំឡេងរបស់កូនធម្មជាតិល្អណាស់។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 6\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន (Weekly Review & Dialogue: Introducing Myself & My Friend)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nរំលឹកសរុបសប្តាហ៍ទី ១៖\n១. Pronouns: I, You, He, She, We, They, It\n២. Verb To Be: I am, You are, He is, She is, We are, They are\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Classroom Objects & A/An\n៥. ឃ្លាគន្លឹះ៖ \"Nice to meet you!\", \"This is my friend.\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 introduce (/ˌɪntrəˈdjuːs/) = 🇰🇭 ណែនាំ\n   ↳ ឧទាហរណ៍៖ Let me introduce my friend.\n   ↳ បកប្រែ៖ (អនុញ្ញាតឱ្យខ្ញុំណែនាំមិត្តភក្តិរបស់ខ្ញុំ។)\n\n2. 🇬🇧 friend (/frend/) = 🇰🇭 មិត្តភក្តិ\n   ↳ ឧទាហរណ៍៖ He is my best friend.\n   ↳ បកប្រែ៖ (គាត់ជាមិត្តល្អបំផុតរបស់ខ្ញុំ។)\n\n3. 🇬🇧 pleasure (/ˈpleʒər/) = 🇰🇭 សេចក្តីរីករាយ\n   ↳ ឧទាហរណ៍៖ It is a pleasure to meet you.\n   ↳ បកប្រែ៖ (វាជាសេចក្តីរីករាយណាស់ដែលបានស្គាល់អ្នក។)\n\n4. 🇬🇧 classmate (/ˈklɑːsmeɪt/) = 🇰🇭 មិត្តរួមថ្នាក់\n   ↳ ឧទាហរណ៍៖ We are friendly classmates.\n   ↳ បកប្រែ៖ (ពួកយើងជាមិត្តរួមថ្នាក់ដ៏រួសរាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 Hello! My name is Sok and I am a student.\n   🇰🇭 (សួស្តី! ខ្ញុំឈ្មោះសុខ ហើយខ្ញុំជាសិស្សម្នាក់។)\n2. 🇬🇧 This is my classmate, her name is Chenda.\n   🇰🇭 (នេះជាមិត្តរួមថ្នាក់របស់ខ្ញុំ នាងឈ្មោះចិន្តា។)\n3. 🇬🇧 We are very proud to study English with Teacher Piseth.\n   🇰🇭 (ពួកយើងមានមោទនភាពណាស់ដែលបានរៀនភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Who can practice introducing a classmate in English?\"\n   🇰🇭 (តើកូនណាខ្លះអាចអនុវត្តការណែនាំមិត្តរួមថ្នាក់ជាភាសាអង់គ្លេសបាន?)\n\n👤 Student:\n   🇬🇧 \"Teacher Piseth, this is my friend Vathanak. He is ten years old and he is very smart.\"\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋ នេះជាមិត្តរបស់ខ្ញុំឈ្មោះវឌ្ឍនៈ។ គាត់អាយុ ១០ ឆ្នាំ ហើយគាត់ឆ្លាតណាស់។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Outstanding job! Your pronunciation is very natural.\"\n   🇰🇭 (ពូកែអស្ចារ្យណាស់! ការបញ្ចេញសំឡេងរបស់កូនធម្មជាតិល្អណាស់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew2",
          "weekNum": 2,
          "monthWeekNum": 2,
          "title": "សប្តាហ៍ទី 2 (ថ្ងៃទី 7 - 12)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 2 ខែទី 1",
          "lessons": [
            {
              "id": "el7",
              "day": 7,
              "title": "ថ្ងៃទី 7៖ សព្វនាមចង្អុល Demonstratives (This, That, These, Those) (Demonstratives (This, That, These, Those))",
              "topic": "សព្វនាមចង្អុល Demonstratives (This, That, These, Those)",
              "grammar": "សព្វនាមចង្អុលប្រើសម្រាប់បង្ហាញទីតាំងជិត ឬឆ្ងាយ៖\n• This = នេះ (ឯកវចនៈ នៅជិត)\n• That = នោះ (ឯកវចនៈ នៅឆ្ងាយ)\n• These = ទាំងនេះ (ពហុវចនៈ នៅជិត)\n• Those = ទាំងនោះ (ពហុវចនៈ នៅឆ្ងាយ)\nឧទាហរណ៍៖\n• This is an apple. / That is a bird.\n• These are my books. / Those are tall trees.",
              "vocab": [
                {
                  "en": "this",
                  "kh": "នេះ (ជិត)",
                  "ipa": "/ðɪs/",
                  "exEn": "This is my notebook.",
                  "exKh": "នេះជាសៀវភៅកត់ត្រារបស់ខ្ញុំ។"
                },
                {
                  "en": "that",
                  "kh": "នោះ (ឆ្ងាយ)",
                  "ipa": "/ðæt/",
                  "exEn": "That is our school building.",
                  "exKh": "នោះជាអគារសាលារៀនរបស់យើង។"
                },
                {
                  "en": "these",
                  "kh": "ទាំងនេះ (ជិត)",
                  "ipa": "/ðiːz/",
                  "exEn": "These are fresh fruits.",
                  "exKh": "ទាំងនេះជាផ្លែឈើស្រស់ៗ។"
                },
                {
                  "en": "those",
                  "kh": "ទាំងនោះ (ឆ្ងាយ)",
                  "ipa": "/ðəʊz/",
                  "exEn": "Those are beautiful birds in the sky.",
                  "exKh": "ទាំងនោះជាសត្វបក្សីដ៏ស្រស់ស្អាតនៅលើមេឃ។"
                }
              ],
              "sentences": [
                {
                  "en": "This is my pen and that is your pencil.",
                  "kh": "នេះជាប៊ិចរបស់ខ្ញុំ ហើយនោះជាខ្មៅដៃរបស់អ្នក។"
                },
                {
                  "en": "These are our English textbooks.",
                  "kh": "ទាំងនេះជាសៀវភៅពុម្ពភាសាអង់គ្លេសរបស់យើង។"
                },
                {
                  "en": "What are those in the tree? Those are birds.",
                  "kh": "តើអ្វីទាំងនោះនៅលើដើមឈើ? ទាំងនោះជាសត្វបក្សី។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Look here! What is this in my hand?",
                  "kh": "មើលមកទីនេះ! តើនេះជាអ្វីនៅក្នុងដៃអ្នកគ្រូ?"
                },
                {
                  "speaker": "Student",
                  "en": "This is an eraser in your hand, Teacher!",
                  "kh": "នេះគឺជាជ័រលុបមួយនៅក្នុងដៃអ្នកគ្រូ!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Correct! And what are those over there on the shelf?",
                  "kh": "ត្រឹមត្រូវ! ចុះអ្វីទាំងនោះនៅលើធ្នើរខាងនោះវិញ?"
                },
                {
                  "speaker": "Student",
                  "en": "Those are new English storybooks!",
                  "kh": "ទាំងនោះគឺជាសៀវភៅរឿងភាសាអង់គ្លេសថ្មីៗ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 7\n🎯 ប្រធានបទ៖ សព្វនាមចង្អុល Demonstratives (This, That, These, Those) (Demonstratives (This, That, These, Those))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nសព្វនាមចង្អុលប្រើសម្រាប់បង្ហាញទីតាំងជិត ឬឆ្ងាយ៖\n• This = នេះ (ឯកវចនៈ នៅជិត)\n• That = នោះ (ឯកវចនៈ នៅឆ្ងាយ)\n• These = ទាំងនេះ (ពហុវចនៈ នៅជិត)\n• Those = ទាំងនោះ (ពហុវចនៈ នៅឆ្ងាយ)\nឧទាហរណ៍៖\n• This is an apple. / That is a bird.\n• These are my books. / Those are tall trees.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 this (/ðɪs/) = 🇰🇭 នេះ (ជិត)\n   ↳ ឧទាហរណ៍៖ This is my notebook.\n   ↳ បកប្រែ៖ (នេះជាសៀវភៅកត់ត្រារបស់ខ្ញុំ។)\n\n2. 🇬🇧 that (/ðæt/) = 🇰🇭 នោះ (ឆ្ងាយ)\n   ↳ ឧទាហរណ៍៖ That is our school building.\n   ↳ បកប្រែ៖ (នោះជាអគារសាលារៀនរបស់យើង។)\n\n3. 🇬🇧 these (/ðiːz/) = 🇰🇭 ទាំងនេះ (ជិត)\n   ↳ ឧទាហរណ៍៖ These are fresh fruits.\n   ↳ បកប្រែ៖ (ទាំងនេះជាផ្លែឈើស្រស់ៗ។)\n\n4. 🇬🇧 those (/ðəʊz/) = 🇰🇭 ទាំងនោះ (ឆ្ងាយ)\n   ↳ ឧទាហរណ៍៖ Those are beautiful birds in the sky.\n   ↳ បកប្រែ៖ (ទាំងនោះជាសត្វបក្សីដ៏ស្រស់ស្អាតនៅលើមេឃ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 This is my pen and that is your pencil.\n   🇰🇭 (នេះជាប៊ិចរបស់ខ្ញុំ ហើយនោះជាខ្មៅដៃរបស់អ្នក។)\n2. 🇬🇧 These are our English textbooks.\n   🇰🇭 (ទាំងនេះជាសៀវភៅពុម្ពភាសាអង់គ្លេសរបស់យើង។)\n3. 🇬🇧 What are those in the tree? Those are birds.\n   🇰🇭 (តើអ្វីទាំងនោះនៅលើដើមឈើ? ទាំងនោះជាសត្វបក្សី។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Look here! What is this in my hand?\"\n   🇰🇭 (មើលមកទីនេះ! តើនេះជាអ្វីនៅក្នុងដៃអ្នកគ្រូ?)\n\n👤 Student:\n   🇬🇧 \"This is an eraser in your hand, Teacher!\"\n   🇰🇭 (នេះគឺជាជ័រលុបមួយនៅក្នុងដៃអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Correct! And what are those over there on the shelf?\"\n   🇰🇭 (ត្រឹមត្រូវ! ចុះអ្វីទាំងនោះនៅលើធ្នើរខាងនោះវិញ?)\n\n👤 Student:\n   🇬🇧 \"Those are new English storybooks!\"\n   🇰🇭 (ទាំងនោះគឺជាសៀវភៅរឿងភាសាអង់គ្លេសថ្មីៗ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el8",
              "day": 8,
              "title": "ថ្ងៃទី 8៖ នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies) (Regular Plural Nouns (-s, -es, -ies))",
              "topic": "នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies)",
              "grammar": "ក្បួនបំប្លែងនាមឯកវចនៈទៅជានាមពហុវចនៈ៖\n១. នាមទូទៅ ថែម -s: book -> books, pen -> pens, bag -> bags\n២. បញ្ចប់ដោយ -s, -ss, -sh, -ch, -x, -o ថែម -es: box -> boxes, watch -> watches, bus -> buses, tomato -> tomatoes\n៣. បញ្ចប់ដោយ ព្យញ្ជនៈ + y ប្តូរ y ទៅជា -ies: baby -> babies, city -> cities, family -> families\n(ចំណាំ: បើស្រៈ + y ថែមតែ -s: boy -> boys, day -> days)",
              "vocab": [
                {
                  "en": "box",
                  "kh": "ប្រអប់ (boxes = ប្រអប់ច្រើន)",
                  "ipa": "/bɒks/",
                  "exEn": "She has three gift boxes.",
                  "exKh": "នាងមានប្រអប់កាដូចំនួន ៣។"
                },
                {
                  "en": "watch",
                  "kh": "នាឡិកាដៃ (watches)",
                  "ipa": "/wɒtʃ/",
                  "exEn": "My father collects watches.",
                  "exKh": "ឪពុកខ្ញុំប្រមូលនាឡិកាដៃ។"
                },
                {
                  "en": "city",
                  "kh": "ទីក្រុង (cities)",
                  "ipa": "/ˈsɪti/",
                  "exEn": "Cambodia has many green cities.",
                  "exKh": "ប្រទេសកម្ពុជាមានទីក្រុងបៃតងជាច្រើន។"
                },
                {
                  "en": "baby",
                  "kh": "ទារក (babies)",
                  "ipa": "/ˈbeɪbi/",
                  "exEn": "The babies are sleeping soundly.",
                  "exKh": "ទារកទាំងឡាយកំពុងគេងលក់ស្កប់ស្កល់។"
                }
              ],
              "sentences": [
                {
                  "en": "I have two pens and five notebooks.",
                  "kh": "ខ្ញុំមានប៊ិច ២ ដើម និងសៀវភៅកត់ត្រា ៥ ក្បាល។"
                },
                {
                  "en": "There are many big cities in the world.",
                  "kh": "មានទីក្រុងធំៗជាច្រើននៅលើពិភពលោក។"
                },
                {
                  "en": "The students put their boxes on the tables.",
                  "kh": "សិស្សានុសិស្សបានដាក់ប្រអប់របស់ពួកគេនៅលើតុ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "How many watches do you see in the picture?",
                  "kh": "តើកូនឃើញនាឡិកាដៃប៉ុន្មាននៅក្នុងរូបភាព?"
                },
                {
                  "speaker": "Student",
                  "en": "I see four watches and two boxes, Teacher.",
                  "kh": "ខ្ញុំឃើញនាឡិកាដៃ ៤ គ្រឿង និងប្រអប់ ២ អ្នកគ្រូ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Well done! Remember to pronounce the /ɪz/ sound clearly: watches, boxes.",
                  "kh": "ពូកែណាស់! ចងចាំបញ្ចេញសូរ /ɪz/ ឱ្យច្បាស់ណា: watches, boxes។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 8\n🎯 ប្រធានបទ៖ នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies) (Regular Plural Nouns (-s, -es, -ies))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nក្បួនបំប្លែងនាមឯកវចនៈទៅជានាមពហុវចនៈ៖\n១. នាមទូទៅ ថែម -s: book -> books, pen -> pens, bag -> bags\n២. បញ្ចប់ដោយ -s, -ss, -sh, -ch, -x, -o ថែម -es: box -> boxes, watch -> watches, bus -> buses, tomato -> tomatoes\n៣. បញ្ចប់ដោយ ព្យញ្ជនៈ + y ប្តូរ y ទៅជា -ies: baby -> babies, city -> cities, family -> families\n(ចំណាំ: បើស្រៈ + y ថែមតែ -s: boy -> boys, day -> days)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 box (/bɒks/) = 🇰🇭 ប្រអប់ (boxes = ប្រអប់ច្រើន)\n   ↳ ឧទាហរណ៍៖ She has three gift boxes.\n   ↳ បកប្រែ៖ (នាងមានប្រអប់កាដូចំនួន ៣។)\n\n2. 🇬🇧 watch (/wɒtʃ/) = 🇰🇭 នាឡិកាដៃ (watches)\n   ↳ ឧទាហរណ៍៖ My father collects watches.\n   ↳ បកប្រែ៖ (ឪពុកខ្ញុំប្រមូលនាឡិកាដៃ។)\n\n3. 🇬🇧 city (/ˈsɪti/) = 🇰🇭 ទីក្រុង (cities)\n   ↳ ឧទាហរណ៍៖ Cambodia has many green cities.\n   ↳ បកប្រែ៖ (ប្រទេសកម្ពុជាមានទីក្រុងបៃតងជាច្រើន។)\n\n4. 🇬🇧 baby (/ˈbeɪbi/) = 🇰🇭 ទារក (babies)\n   ↳ ឧទាហរណ៍៖ The babies are sleeping soundly.\n   ↳ បកប្រែ៖ (ទារកទាំងឡាយកំពុងគេងលក់ស្កប់ស្កល់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have two pens and five notebooks.\n   🇰🇭 (ខ្ញុំមានប៊ិច ២ ដើម និងសៀវភៅកត់ត្រា ៥ ក្បាល។)\n2. 🇬🇧 There are many big cities in the world.\n   🇰🇭 (មានទីក្រុងធំៗជាច្រើននៅលើពិភពលោក។)\n3. 🇬🇧 The students put their boxes on the tables.\n   🇰🇭 (សិស្សានុសិស្សបានដាក់ប្រអប់របស់ពួកគេនៅលើតុ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How many watches do you see in the picture?\"\n   🇰🇭 (តើកូនឃើញនាឡិកាដៃប៉ុន្មាននៅក្នុងរូបភាព?)\n\n👤 Student:\n   🇬🇧 \"I see four watches and two boxes, Teacher.\"\n   🇰🇭 (ខ្ញុំឃើញនាឡិកាដៃ ៤ គ្រឿង និងប្រអប់ ២ អ្នកគ្រូ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Well done! Remember to pronounce the /ɪz/ sound clearly: watches, boxes.\"\n   🇰🇭 (ពូកែណាស់! ចងចាំបញ្ចេញសូរ /ɪz/ ឱ្យច្បាស់ណា: watches, boxes។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el9",
              "day": 9,
              "title": "ថ្ងៃទី 9៖ លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ (Numbers 1-100 & Counting Everyday Items)",
              "topic": "លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ",
              "grammar": "លេខរាប់ភាសាអង់គ្លេសពី ១ ដល់ ១០០៖\n• 1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten\n• 11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty\n• 30, 40, 50, 60, 70, 80, 90, 100: Thirty, Forty, Fifty, Sixty, Seventy, Eighty, Ninety, One hundred\n• សំណួររាប់ចំនួន៖ \"How many + plural noun + are there?\"",
              "vocab": [
                {
                  "en": "twenty",
                  "kh": "ម្ភៃ (20)",
                  "ipa": "/ˈtwenti/",
                  "exEn": "There are twenty students.",
                  "exKh": "មានសិស្សចំនួនម្ភៃនាក់។"
                },
                {
                  "en": "fifty",
                  "kh": "ហាសិប (50)",
                  "ipa": "/ˈfɪfti/",
                  "exEn": "This book has fifty pages.",
                  "exKh": "សៀវភៅនេះមានហាសិបទំព័រ។"
                },
                {
                  "en": "hundred",
                  "kh": "មួយរយ (100)",
                  "ipa": "/ˈhʌndrəd/",
                  "exEn": "One hundred percent score!",
                  "exKh": "ពិន្ទុមួយរយភាគរយពេញ!"
                },
                {
                  "en": "count",
                  "kh": "រាប់",
                  "ipa": "/kaʊnt/",
                  "exEn": "Can you count to twenty?",
                  "exKh": "តើអ្នកអាចរាប់ដល់ម្ភៃបានទេ?"
                }
              ],
              "sentences": [
                {
                  "en": "There are thirty students in our class.",
                  "kh": "មានសិស្សចំនួនសាមសិបនាក់ក្នុងថ្នាក់របស់យើង។"
                },
                {
                  "en": "I have twelve colored pencils in my pencil case.",
                  "kh": "ខ្ញុំមានខ្មៅដៃពណ៌ចំនួនដប់ពីរដើមក្នុងប្រអប់ខ្មៅដៃរបស់ខ្ញុំ។"
                },
                {
                  "en": "How many books are there? There are fifteen books.",
                  "kh": "តើមានសៀវភៅប៉ុន្មានក្បាលនៅទីនោះ? មានសៀវភៅដប់ប្រាំក្បាល។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Can you count the chairs in our classroom?",
                  "kh": "តើកូនអាចរាប់កៅអីក្នុងបន្ទប់រៀនរបស់យើងបានទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher! One, two, three... twenty-four chairs in total!",
                  "kh": "ចាសអ្នកគ្រូ! មួយ ពីរ បី... សរុបទាំងអស់មានម្ភៃបួនកៅអី!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Excellent counting! That is very accurate.",
                  "kh": "ការរាប់ពូកែណាស់! ត្រឹមត្រូវល្អឥតខ្ចោះ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 9\n🎯 ប្រធានបទ៖ លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ (Numbers 1-100 & Counting Everyday Items)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nលេខរាប់ភាសាអង់គ្លេសពី ១ ដល់ ១០០៖\n• 1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten\n• 11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty\n• 30, 40, 50, 60, 70, 80, 90, 100: Thirty, Forty, Fifty, Sixty, Seventy, Eighty, Ninety, One hundred\n• សំណួររាប់ចំនួន៖ \"How many + plural noun + are there?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 twenty (/ˈtwenti/) = 🇰🇭 ម្ភៃ (20)\n   ↳ ឧទាហរណ៍៖ There are twenty students.\n   ↳ បកប្រែ៖ (មានសិស្សចំនួនម្ភៃនាក់។)\n\n2. 🇬🇧 fifty (/ˈfɪfti/) = 🇰🇭 ហាសិប (50)\n   ↳ ឧទាហរណ៍៖ This book has fifty pages.\n   ↳ បកប្រែ៖ (សៀវភៅនេះមានហាសិបទំព័រ។)\n\n3. 🇬🇧 hundred (/ˈhʌndrəd/) = 🇰🇭 មួយរយ (100)\n   ↳ ឧទាហរណ៍៖ One hundred percent score!\n   ↳ បកប្រែ៖ (ពិន្ទុមួយរយភាគរយពេញ!)\n\n4. 🇬🇧 count (/kaʊnt/) = 🇰🇭 រាប់\n   ↳ ឧទាហរណ៍៖ Can you count to twenty?\n   ↳ បកប្រែ៖ (តើអ្នកអាចរាប់ដល់ម្ភៃបានទេ?)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 There are thirty students in our class.\n   🇰🇭 (មានសិស្សចំនួនសាមសិបនាក់ក្នុងថ្នាក់របស់យើង។)\n2. 🇬🇧 I have twelve colored pencils in my pencil case.\n   🇰🇭 (ខ្ញុំមានខ្មៅដៃពណ៌ចំនួនដប់ពីរដើមក្នុងប្រអប់ខ្មៅដៃរបស់ខ្ញុំ។)\n3. 🇬🇧 How many books are there? There are fifteen books.\n   🇰🇭 (តើមានសៀវភៅប៉ុន្មានក្បាលនៅទីនោះ? មានសៀវភៅដប់ប្រាំក្បាល។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Can you count the chairs in our classroom?\"\n   🇰🇭 (តើកូនអាចរាប់កៅអីក្នុងបន្ទប់រៀនរបស់យើងបានទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher! One, two, three... twenty-four chairs in total!\"\n   🇰🇭 (ចាសអ្នកគ្រូ! មួយ ពីរ បី... សរុបទាំងអស់មានម្ភៃបួនកៅអី!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Excellent counting! That is very accurate.\"\n   🇰🇭 (ការរាប់ពូកែណាស់! ត្រឹមត្រូវល្អឥតខ្ចោះ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el10",
              "day": 10,
              "title": "ថ្ងៃទី 10៖ ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful) (Colors and Adjectives for Objects (Big, Small, New, Old))",
              "topic": "ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful)",
              "grammar": "ទីតាំងនៃគុណនាម (Adjectives) ក្នុងភាសាអង់គ្លេស៖\n១. នៅពីមុខនាម៖ [Adjective + Noun]\n• a red car (ឡានពណ៌ក្រហម)\n• a big house (ផ្ទះធំមួយ)\n• a new computer (កុំព្យូទ័រថ្មីមួយ)\n២. នៅក្រោយកិរិយាសព្ទ To Be: [Subject + To Be + Adjective]\n• The car is red. (ឡាននោះមានពណ៌ក្រហម)\n• My school bag is new and blue.",
              "vocab": [
                {
                  "en": "big",
                  "kh": "ធំ",
                  "ipa": "/bɪɡ/",
                  "exEn": "An elephant is big.",
                  "exKh": "សត្វដំរីមានមាឌធំ។"
                },
                {
                  "en": "small",
                  "kh": "តូច",
                  "ipa": "/smɔːl/",
                  "exEn": "An ant is very small.",
                  "exKh": "សត្វស្រមោចមានមាឌតូចខ្លាំងណាស់។"
                },
                {
                  "en": "new",
                  "kh": "ថ្មី",
                  "ipa": "/njuː/",
                  "exEn": "I wear new shoes today.",
                  "exKh": "ខ្ញុំពាក់ស្បែកជើងថ្មីថ្ងៃនេះ។"
                },
                {
                  "en": "old",
                  "kh": "ចាស់ / បុរាណ",
                  "ipa": "/əʊld/",
                  "exEn": "This temple is very old.",
                  "exKh": "ប្រាសាទនេះមានអាយុកាលចាស់ណាស់។"
                },
                {
                  "en": "beautiful",
                  "kh": "ស្រស់ស្អាត",
                  "ipa": "/ˈbjuːtɪfl/",
                  "exEn": "The lotus flower is beautiful.",
                  "exKh": "ផ្កាឈូកពិតជាស្រស់ស្អាតណាស់។"
                }
              ],
              "sentences": [
                {
                  "en": "I have a big red notebook.",
                  "kh": "ខ្ញុំមានសៀវភៅកត់ត្រាធំពណ៌ក្រហមមួយក្បាល។"
                },
                {
                  "en": "She wears a beautiful blue dress.",
                  "kh": "នាងពាក់រ៉ូបពណ៌ខៀវដ៏ស្រស់ស្អាតមួយ។"
                },
                {
                  "en": "This old bicycle belongs to my grandfather.",
                  "kh": "កង់ចាស់នេះជារបស់លោកតារបស់ខ្ញុំ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Describe your favorite bag to the class.",
                  "kh": "ចូរពណ៌នាកាតាបដែលកូនចូលចិត្តប្រាប់មិត្តរួមថ្នាក់។"
                },
                {
                  "speaker": "Student",
                  "en": "My bag is small, yellow, and very light. I love it!",
                  "kh": "កាតាបរបស់ខ្ញុំតូច ពណ៌លឿង និងស្រាលណាស់។ ខ្ញុំស្រឡាញ់វា!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "What a lovely description! You used adjectives very well.",
                  "kh": "ការពណ៌នាពិតជាគួរឱ្យស្រឡាញ់! កូនប្រើគុណនាមបានល្អណាស់។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 10\n🎯 ប្រធានបទ៖ ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful) (Colors and Adjectives for Objects (Big, Small, New, Old))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nទីតាំងនៃគុណនាម (Adjectives) ក្នុងភាសាអង់គ្លេស៖\n១. នៅពីមុខនាម៖ [Adjective + Noun]\n• a red car (ឡានពណ៌ក្រហម)\n• a big house (ផ្ទះធំមួយ)\n• a new computer (កុំព្យូទ័រថ្មីមួយ)\n២. នៅក្រោយកិរិយាសព្ទ To Be: [Subject + To Be + Adjective]\n• The car is red. (ឡាននោះមានពណ៌ក្រហម)\n• My school bag is new and blue.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 big (/bɪɡ/) = 🇰🇭 ធំ\n   ↳ ឧទាហរណ៍៖ An elephant is big.\n   ↳ បកប្រែ៖ (សត្វដំរីមានមាឌធំ។)\n\n2. 🇬🇧 small (/smɔːl/) = 🇰🇭 តូច\n   ↳ ឧទាហរណ៍៖ An ant is very small.\n   ↳ បកប្រែ៖ (សត្វស្រមោចមានមាឌតូចខ្លាំងណាស់។)\n\n3. 🇬🇧 new (/njuː/) = 🇰🇭 ថ្មី\n   ↳ ឧទាហរណ៍៖ I wear new shoes today.\n   ↳ បកប្រែ៖ (ខ្ញុំពាក់ស្បែកជើងថ្មីថ្ងៃនេះ។)\n\n4. 🇬🇧 old (/əʊld/) = 🇰🇭 ចាស់ / បុរាណ\n   ↳ ឧទាហរណ៍៖ This temple is very old.\n   ↳ បកប្រែ៖ (ប្រាសាទនេះមានអាយុកាលចាស់ណាស់។)\n\n5. 🇬🇧 beautiful (/ˈbjuːtɪfl/) = 🇰🇭 ស្រស់ស្អាត\n   ↳ ឧទាហរណ៍៖ The lotus flower is beautiful.\n   ↳ បកប្រែ៖ (ផ្កាឈូកពិតជាស្រស់ស្អាតណាស់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a big red notebook.\n   🇰🇭 (ខ្ញុំមានសៀវភៅកត់ត្រាធំពណ៌ក្រហមមួយក្បាល។)\n2. 🇬🇧 She wears a beautiful blue dress.\n   🇰🇭 (នាងពាក់រ៉ូបពណ៌ខៀវដ៏ស្រស់ស្អាតមួយ។)\n3. 🇬🇧 This old bicycle belongs to my grandfather.\n   🇰🇭 (កង់ចាស់នេះជារបស់លោកតារបស់ខ្ញុំ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Describe your favorite bag to the class.\"\n   🇰🇭 (ចូរពណ៌នាកាតាបដែលកូនចូលចិត្តប្រាប់មិត្តរួមថ្នាក់។)\n\n👤 Student:\n   🇬🇧 \"My bag is small, yellow, and very light. I love it!\"\n   🇰🇭 (កាតាបរបស់ខ្ញុំតូច ពណ៌លឿង និងស្រាលណាស់។ ខ្ញុំស្រឡាញ់វា!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"What a lovely description! You used adjectives very well.\"\n   🇰🇭 (ការពណ៌នាពិតជាគួរឱ្យស្រឡាញ់! កូនប្រើគុណនាមបានល្អណាស់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el11",
              "day": 11,
              "title": "ថ្ងៃទី 11៖ ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind) (Basic Prepositions of Place (In, On, Under, Next to, Behind))",
              "topic": "ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind)",
              "grammar": "ធ្នាក់បញ្ជាក់ទីកន្លែង (Prepositions of Place) ប្រើដើម្បីប្រាប់ពីទីតាំងរបស់មនុស្ស សត្វ ឬវត្ថុ៖\n• in = នៅក្នុង (in the box, in the room)\n• on = នៅលើ (on the table, on the wall)\n• under = នៅក្រោម (under the chair, under the bed)\n• next to = នៅក្បែរ/នៅជាប់ (next to the window)\n• behind = នៅខាងក្រោយ (behind the door)\n• in front of = នៅខាងមុខ (in front of the board)\nសំណួរសួរទីតាំង៖ \"Where is + noun?\"",
              "vocab": [
                {
                  "en": "in",
                  "kh": "នៅក្នុង",
                  "ipa": "/ɪn/",
                  "exEn": "The pencil is in the bag.",
                  "exKh": "ខ្មៅដៃនៅក្នុងកាតាប។"
                },
                {
                  "en": "on",
                  "kh": "នៅលើ",
                  "ipa": "/ɒn/",
                  "exEn": "The book is on the table.",
                  "exKh": "សៀវភៅនៅលើតុ។"
                },
                {
                  "en": "under",
                  "kh": "នៅក្រោម",
                  "ipa": "/ˈʌndər/",
                  "exEn": "The cat sleeps under the bed.",
                  "exKh": "ឆ្មាគេងនៅក្រោមក្តារគ្រែ។"
                },
                {
                  "en": "next to",
                  "kh": "នៅក្បែរ / នៅជាប់",
                  "ipa": "/ˈnekst tuː/",
                  "exEn": "Sit next to your friend.",
                  "exKh": "អង្គុយនៅក្បែរមិត្តរបស់អ្នក។"
                },
                {
                  "en": "behind",
                  "kh": "នៅខាងក្រោយ",
                  "ipa": "/bɪˈhaɪnd/",
                  "exEn": "The sun hides behind clouds.",
                  "exKh": "ព្រះអាទិត្យពួននៅក្រោយពពក។"
                }
              ],
              "sentences": [
                {
                  "en": "My English book is on the desk.",
                  "kh": "សៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំនៅលើតុរៀន។"
                },
                {
                  "en": "The ruler is inside the pencil case.",
                  "kh": "បន្ទាត់គឺនៅក្នុងប្រអប់ខ្មៅដៃ។"
                },
                {
                  "en": "Where is the cat? The cat is under the chair.",
                  "kh": "តើឆ្មានៅឯណា? ឆ្មានៅក្រោមកៅអី។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Where is your ruler, Bopha?",
                  "kh": "បុប្ផា តើបន្ទាត់របស់កូននៅឯណាដែរ?"
                },
                {
                  "speaker": "Student",
                  "en": "It is on my desk, next to my blue pen, Teacher.",
                  "kh": "វាគឺនៅលើតុរៀនរបស់ខ្ញុំ នៅក្បែរប៊ិចខៀវអ្នកគ្រូ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Very neat! Keeping your desk organized helps you learn better.",
                  "kh": "រៀបចំបានស្អាតណាស់! ការទុកដាក់តុឱ្យមានរបៀបជួយឱ្យរៀនពូកែ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 11\n🎯 ប្រធានបទ៖ ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind) (Basic Prepositions of Place (In, On, Under, Next to, Behind))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nធ្នាក់បញ្ជាក់ទីកន្លែង (Prepositions of Place) ប្រើដើម្បីប្រាប់ពីទីតាំងរបស់មនុស្ស សត្វ ឬវត្ថុ៖\n• in = នៅក្នុង (in the box, in the room)\n• on = នៅលើ (on the table, on the wall)\n• under = នៅក្រោម (under the chair, under the bed)\n• next to = នៅក្បែរ/នៅជាប់ (next to the window)\n• behind = នៅខាងក្រោយ (behind the door)\n• in front of = នៅខាងមុខ (in front of the board)\nសំណួរសួរទីតាំង៖ \"Where is + noun?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 in (/ɪn/) = 🇰🇭 នៅក្នុង\n   ↳ ឧទាហរណ៍៖ The pencil is in the bag.\n   ↳ បកប្រែ៖ (ខ្មៅដៃនៅក្នុងកាតាប។)\n\n2. 🇬🇧 on (/ɒn/) = 🇰🇭 នៅលើ\n   ↳ ឧទាហរណ៍៖ The book is on the table.\n   ↳ បកប្រែ៖ (សៀវភៅនៅលើតុ។)\n\n3. 🇬🇧 under (/ˈʌndər/) = 🇰🇭 នៅក្រោម\n   ↳ ឧទាហរណ៍៖ The cat sleeps under the bed.\n   ↳ បកប្រែ៖ (ឆ្មាគេងនៅក្រោមក្តារគ្រែ។)\n\n4. 🇬🇧 next to (/ˈnekst tuː/) = 🇰🇭 នៅក្បែរ / នៅជាប់\n   ↳ ឧទាហរណ៍៖ Sit next to your friend.\n   ↳ បកប្រែ៖ (អង្គុយនៅក្បែរមិត្តរបស់អ្នក។)\n\n5. 🇬🇧 behind (/bɪˈhaɪnd/) = 🇰🇭 នៅខាងក្រោយ\n   ↳ ឧទាហរណ៍៖ The sun hides behind clouds.\n   ↳ បកប្រែ៖ (ព្រះអាទិត្យពួននៅក្រោយពពក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 My English book is on the desk.\n   🇰🇭 (សៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំនៅលើតុរៀន។)\n2. 🇬🇧 The ruler is inside the pencil case.\n   🇰🇭 (បន្ទាត់គឺនៅក្នុងប្រអប់ខ្មៅដៃ។)\n3. 🇬🇧 Where is the cat? The cat is under the chair.\n   🇰🇭 (តើឆ្មានៅឯណា? ឆ្មានៅក្រោមកៅអី។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Where is your ruler, Bopha?\"\n   🇰🇭 (បុប្ផា តើបន្ទាត់របស់កូននៅឯណាដែរ?)\n\n👤 Student:\n   🇬🇧 \"It is on my desk, next to my blue pen, Teacher.\"\n   🇰🇭 (វាគឺនៅលើតុរៀនរបស់ខ្ញុំ នៅក្បែរប៊ិចខៀវអ្នកគ្រូ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Very neat! Keeping your desk organized helps you learn better.\"\n   🇰🇭 (រៀបចំបានស្អាតណាស់! ការទុកដាក់តុឱ្យមានរបៀបជួយឱ្យរៀនពូកែ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el12",
              "day": 12,
              "title": "ថ្ងៃទី 12៖ រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ (Weekly Review & Conversation: Where is My Pen? (Finding Things))",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ",
              "grammar": "រំលឹកសរុបសប្តាហ៍ទី ២៖\n១. Demonstratives: This, That, These, Those\n២. Plural Nouns: -s, -es, -ies\n៣. Numbers 1-100 & Counting: How many... are there?\n៤. Adjectives & Colors: a big blue bag\n៥. Prepositions: in, on, under, next to, behind\n៦. Pattern សួររកវត្ថុ៖ \"Where is my...?\" / \"Where are my...?\"",
              "vocab": [
                {
                  "en": "search",
                  "kh": "ស្វែងរក",
                  "ipa": "/sɜːtʃ/",
                  "exEn": "I search for my glasses.",
                  "exKh": "ខ្ញុំស្វែងរកវ៉ែនតារបស់ខ្ញុំ។"
                },
                {
                  "en": "find",
                  "kh": "រកឃើញ",
                  "ipa": "/faɪnd/",
                  "exEn": "I can find my shoes.",
                  "exKh": "ខ្ញុំអាចរកឃើញស្បែកជើងរបស់ខ្ញុំ។"
                },
                {
                  "en": "lose",
                  "kh": "បាត់បង់",
                  "ipa": "/luːz/",
                  "exEn": "Do not lose your keys.",
                  "exKh": "កុំឱ្យបាត់កូនសោរបស់អ្នកឱ្យសោះ។"
                }
              ],
              "sentences": [
                {
                  "en": "Where is my red pen? It is under the notebook.",
                  "kh": "តើប៊ិចក្រហមខ្ញុំនៅឯណា? វានៅក្រោមកូនសៀវភៅ។"
                },
                {
                  "en": "Where are my glasses? They are on your head!",
                  "kh": "តើវ៉ែនតាខ្ញុំនៅឯណា? វានៅលើក្បាលរបស់អ្នកតើ!"
                },
                {
                  "en": "These five pencils are on the wooden desk.",
                  "kh": "ខ្មៅដៃទាំងប្រាំដើមនេះគឺនៅលើតុឈើ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Dara, you look worried. What are you looking for?",
                  "kh": "ដារ៉ា កូនមើលទៅដូចជាបារម្ភ។ តើកូនកំពុងរកអ្វីហ្នឹង?"
                },
                {
                  "speaker": "Student",
                  "en": "Teacher, where is my English workbook? I cannot find it.",
                  "kh": "អ្នកគ្រូ តើសៀវភៅលំហាត់អង់គ្លេសខ្ញុំនៅឯណា? ខ្ញុំរកវាមិនឃើញសោះ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Look under your chair! Oh, here it is, behind your bag.",
                  "kh": "មើលក្រោមអីកូន! អូ នៅទីនេះតើ នៅពីក្រោយកាតាបកូន។"
                },
                {
                  "speaker": "Student",
                  "en": "Oh, thank you so much, Teacher Piseth! I found it!",
                  "kh": "អូ អរគុណច្រើនណាស់អ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរកឃើញហើយ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 12\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ (Weekly Review & Conversation: Where is My Pen? (Finding Things))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nរំលឹកសរុបសប្តាហ៍ទី ២៖\n១. Demonstratives: This, That, These, Those\n២. Plural Nouns: -s, -es, -ies\n៣. Numbers 1-100 & Counting: How many... are there?\n៤. Adjectives & Colors: a big blue bag\n៥. Prepositions: in, on, under, next to, behind\n៦. Pattern សួររកវត្ថុ៖ \"Where is my...?\" / \"Where are my...?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 search (/sɜːtʃ/) = 🇰🇭 ស្វែងរក\n   ↳ ឧទាហរណ៍៖ I search for my glasses.\n   ↳ បកប្រែ៖ (ខ្ញុំស្វែងរកវ៉ែនតារបស់ខ្ញុំ។)\n\n2. 🇬🇧 find (/faɪnd/) = 🇰🇭 រកឃើញ\n   ↳ ឧទាហរណ៍៖ I can find my shoes.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចរកឃើញស្បែកជើងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 lose (/luːz/) = 🇰🇭 បាត់បង់\n   ↳ ឧទាហរណ៍៖ Do not lose your keys.\n   ↳ បកប្រែ៖ (កុំឱ្យបាត់កូនសោរបស់អ្នកឱ្យសោះ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 Where is my red pen? It is under the notebook.\n   🇰🇭 (តើប៊ិចក្រហមខ្ញុំនៅឯណា? វានៅក្រោមកូនសៀវភៅ។)\n2. 🇬🇧 Where are my glasses? They are on your head!\n   🇰🇭 (តើវ៉ែនតាខ្ញុំនៅឯណា? វានៅលើក្បាលរបស់អ្នកតើ!)\n3. 🇬🇧 These five pencils are on the wooden desk.\n   🇰🇭 (ខ្មៅដៃទាំងប្រាំដើមនេះគឺនៅលើតុឈើ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Dara, you look worried. What are you looking for?\"\n   🇰🇭 (ដារ៉ា កូនមើលទៅដូចជាបារម្ភ។ តើកូនកំពុងរកអ្វីហ្នឹង?)\n\n👤 Student:\n   🇬🇧 \"Teacher, where is my English workbook? I cannot find it.\"\n   🇰🇭 (អ្នកគ្រូ តើសៀវភៅលំហាត់អង់គ្លេសខ្ញុំនៅឯណា? ខ្ញុំរកវាមិនឃើញសោះ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Look under your chair! Oh, here it is, behind your bag.\"\n   🇰🇭 (មើលក្រោមអីកូន! អូ នៅទីនេះតើ នៅពីក្រោយកាតាបកូន។)\n\n👤 Student:\n   🇬🇧 \"Oh, thank you so much, Teacher Piseth! I found it!\"\n   🇰🇭 (អូ អរគុណច្រើនណាស់អ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរកឃើញហើយ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew3",
          "weekNum": 3,
          "monthWeekNum": 3,
          "title": "សប្តាហ៍ទី 3 (ថ្ងៃទី 13 - 18)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 3 ខែទី 1",
          "lessons": [
            {
              "id": "el13",
              "day": 13,
              "title": "ថ្ងៃទី 13៖ សមាជិកគ្រួសារ Family Members (Family Members (Father, Mother, Brother, Sister, Parents))",
              "topic": "សមាជិកគ្រួសារ Family Members",
              "grammar": "វាក្យសព្ទគ្រួសារ និងការប្រើ Possessive 's (បង្ហាញភាពជាម្ចាស់)៖\n• My father's car = ឡានរបស់ឪពុកខ្ញុំ\n• My sister's name = ឈ្មោះរបស់ប្អូនស្រីខ្ញុំ\nសមាជិកគ្រួសារសំខាន់ៗ៖\n• Parents = ឪពុកម្តាយ\n• Father / Dad = ឪពុក\n• Mother / Mom = ម្តាយ\n• Brother = បងប្រុស/ប្អូនប្រុស\n• Sister = បងស្រី/ប្អូនស្រី\n• Grandparents = ជីដូនជីតា (Grandfather, Grandmother)",
              "vocab": [
                {
                  "en": "father",
                  "kh": "ឪពុក",
                  "ipa": "/ˈfɑːðər/",
                  "exEn": "My father is a kind farmer.",
                  "exKh": "ឪពុករបស់ខ្ញុំជាកសិករចិត្តល្អម្នាក់។"
                },
                {
                  "en": "mother",
                  "kh": "ម្តាយ",
                  "ipa": "/ˈmʌðər/",
                  "exEn": "My mother cooks delicious food.",
                  "exKh": "ម្តាយរបស់ខ្ញុំចម្អិនម្ហូបឆ្ងាញ់ណាស់។"
                },
                {
                  "en": "brother",
                  "kh": "បង/ប្អូនប្រុស",
                  "ipa": "/ˈbrʌðər/",
                  "exEn": "My brother plays soccer.",
                  "exKh": "បងប្រុសរបស់ខ្ញុំលេងបាល់ទាត់។"
                },
                {
                  "en": "sister",
                  "kh": "បង/ប្អូនស្រី",
                  "ipa": "/ˈsɪstər/",
                  "exEn": "My sister likes reading books.",
                  "exKh": "ប្អូនស្រីរបស់ខ្ញុំចូលចិត្តអានសៀវភៅ។"
                },
                {
                  "en": "parents",
                  "kh": "ឪពុកម្តាយ",
                  "ipa": "/ˈpeərənts/",
                  "exEn": "I love my parents deeply.",
                  "exKh": "ខ្ញុំស្រឡាញ់ឪពុកម្តាយខ្ញុំយ៉ាងជ្រាលជ្រៅ។"
                }
              ],
              "sentences": [
                {
                  "en": "There are five people in my family.",
                  "kh": "មានសមាជិកប្រាំនាក់ក្នុងគ្រួសាររបស់ខ្ញុំ។"
                },
                {
                  "en": "My mother is thirty-eight years old.",
                  "kh": "ម្តាយរបស់ខ្ញុំមានអាយុសាមសិបប្រាំបីឆ្នាំ។"
                },
                {
                  "en": "My brother and I help our parents every weekend.",
                  "kh": "បងប្រុសខ្ញុំ និងខ្ញុំជួយឪពុកម្តាយរៀងរាល់ចុងសប្តាហ៍។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "How many people are there in your family, Sophea?",
                  "kh": "សុភា តើមានសមាជិកប៉ុន្មាននាក់ក្នុងគ្រួសារកូន?"
                },
                {
                  "speaker": "Student",
                  "en": "There are four people: my father, my mother, my little brother, and me.",
                  "kh": "មានបួននាក់អ្នកគ្រូ: ឪពុក ម្តាយ ប្អូនប្រុសតូច និងខ្ញុំ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "What a sweet family! Do you love your brother?",
                  "kh": "គ្រួសារគួរឱ្យស្រឡាញ់ណាស់! តើកូនស្រឡាញ់ប្អូនប្រុសទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, I love him very much! We play together every day.",
                  "kh": "ចាស ខ្ញុំស្រឡាញ់គាត់ខ្លាំងណាស់! ពួកយើងលេងជាមួយគ្នារាល់ថ្ងៃ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 13\n🎯 ប្រធានបទ៖ សមាជិកគ្រួសារ Family Members (Family Members (Father, Mother, Brother, Sister, Parents))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nវាក្យសព្ទគ្រួសារ និងការប្រើ Possessive 's (បង្ហាញភាពជាម្ចាស់)៖\n• My father's car = ឡានរបស់ឪពុកខ្ញុំ\n• My sister's name = ឈ្មោះរបស់ប្អូនស្រីខ្ញុំ\nសមាជិកគ្រួសារសំខាន់ៗ៖\n• Parents = ឪពុកម្តាយ\n• Father / Dad = ឪពុក\n• Mother / Mom = ម្តាយ\n• Brother = បងប្រុស/ប្អូនប្រុស\n• Sister = បងស្រី/ប្អូនស្រី\n• Grandparents = ជីដូនជីតា (Grandfather, Grandmother)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 father (/ˈfɑːðər/) = 🇰🇭 ឪពុក\n   ↳ ឧទាហរណ៍៖ My father is a kind farmer.\n   ↳ បកប្រែ៖ (ឪពុករបស់ខ្ញុំជាកសិករចិត្តល្អម្នាក់។)\n\n2. 🇬🇧 mother (/ˈmʌðər/) = 🇰🇭 ម្តាយ\n   ↳ ឧទាហរណ៍៖ My mother cooks delicious food.\n   ↳ បកប្រែ៖ (ម្តាយរបស់ខ្ញុំចម្អិនម្ហូបឆ្ងាញ់ណាស់។)\n\n3. 🇬🇧 brother (/ˈbrʌðər/) = 🇰🇭 បង/ប្អូនប្រុស\n   ↳ ឧទាហរណ៍៖ My brother plays soccer.\n   ↳ បកប្រែ៖ (បងប្រុសរបស់ខ្ញុំលេងបាល់ទាត់។)\n\n4. 🇬🇧 sister (/ˈsɪstər/) = 🇰🇭 បង/ប្អូនស្រី\n   ↳ ឧទាហរណ៍៖ My sister likes reading books.\n   ↳ បកប្រែ៖ (ប្អូនស្រីរបស់ខ្ញុំចូលចិត្តអានសៀវភៅ។)\n\n5. 🇬🇧 parents (/ˈpeərənts/) = 🇰🇭 ឪពុកម្តាយ\n   ↳ ឧទាហរណ៍៖ I love my parents deeply.\n   ↳ បកប្រែ៖ (ខ្ញុំស្រឡាញ់ឪពុកម្តាយខ្ញុំយ៉ាងជ្រាលជ្រៅ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 There are five people in my family.\n   🇰🇭 (មានសមាជិកប្រាំនាក់ក្នុងគ្រួសាររបស់ខ្ញុំ។)\n2. 🇬🇧 My mother is thirty-eight years old.\n   🇰🇭 (ម្តាយរបស់ខ្ញុំមានអាយុសាមសិបប្រាំបីឆ្នាំ។)\n3. 🇬🇧 My brother and I help our parents every weekend.\n   🇰🇭 (បងប្រុសខ្ញុំ និងខ្ញុំជួយឪពុកម្តាយរៀងរាល់ចុងសប្តាហ៍។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How many people are there in your family, Sophea?\"\n   🇰🇭 (សុភា តើមានសមាជិកប៉ុន្មាននាក់ក្នុងគ្រួសារកូន?)\n\n👤 Student:\n   🇬🇧 \"There are four people: my father, my mother, my little brother, and me.\"\n   🇰🇭 (មានបួននាក់អ្នកគ្រូ: ឪពុក ម្តាយ ប្អូនប្រុសតូច និងខ្ញុំ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"What a sweet family! Do you love your brother?\"\n   🇰🇭 (គ្រួសារគួរឱ្យស្រឡាញ់ណាស់! តើកូនស្រឡាញ់ប្អូនប្រុសទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, I love him very much! We play together every day.\"\n   🇰🇭 (ចាស ខ្ញុំស្រឡាញ់គាត់ខ្លាំងណាស់! ពួកយើងលេងជាមួយគ្នារាល់ថ្ងៃ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el14",
              "day": 14,
              "title": "ថ្ងៃទី 14៖ កិរិយាសព្ទ To Have (មាន / មិនមាន) (Verb To Have (Have / Has, Don't have / Doesn't have))",
              "topic": "កិរិយាសព្ទ To Have (មាន / មិនមាន)",
              "grammar": "កិរិយាសព្ទ \"To Have\" ប្រែថា \"មាន\"៖\n១. ទម្រង់ស្រប (Affirmative):\n• I / You / We / They + HAVE (I have a dog. They have a big garden.)\n• He / She / It + HAS (He has a bicycle. She has long hair.)\n២. ទម្រង់បដិសេធ (Negative):\n• I / You / We / They + DON'T HAVE... (We don't have a car.)\n• He / She / It + DOESN'T HAVE... (He doesn't have a watch.)\n៣. ទម្រង់សំណួរ (Question):\n• Do you have...? -> Yes, I do. / No, I don't.\n• Does he have...? -> Yes, he does. / No, he doesn't.",
              "vocab": [
                {
                  "en": "have",
                  "kh": "មាន (ប្រើជាមួយ I/You/We/They)",
                  "ipa": "/hæv/",
                  "exEn": "I have two brothers.",
                  "exKh": "ខ្ញុំមានបងប្អូនប្រុសពីរនាក់។"
                },
                {
                  "en": "has",
                  "kh": "មាន (ប្រើជាមួយ He/She/It)",
                  "ipa": "/hæz/",
                  "exEn": "She has a lovely kitten.",
                  "exKh": "នាងមានកូនឆ្មាគួរឱ្យស្រឡាញ់មួយក្បាល។"
                },
                {
                  "en": "don't have",
                  "kh": "គ្មាន / មិនមាន",
                  "ipa": "/doʊnt hæv/",
                  "exEn": "We don't have homework today.",
                  "exKh": "ពួកយើងគ្មានកិច្ចការផ្ទះទេថ្ងៃនេះ។"
                },
                {
                  "en": "doesn't have",
                  "kh": "គ្មាន / មិនមាន (He/She/It)",
                  "ipa": "/ˈdʌznt hæv/",
                  "exEn": "He doesn't have a motorbike.",
                  "exKh": "គាត់គ្មានម៉ូតូជិះទេ។"
                }
              ],
              "sentences": [
                {
                  "en": "I have a new English dictionary.",
                  "kh": "ខ្ញុំមានវចនានុក្រមភាសាអង់គ្លេសថ្មីមួយក្បាល។"
                },
                {
                  "en": "She has two younger sisters and one older brother.",
                  "kh": "នាងមានប្អូនស្រីពីរនាក់ និងបងប្រុសម្នាក់។"
                },
                {
                  "en": "Do you have any pets at home? Yes, I have a cat.",
                  "kh": "តើអ្នកមានសត្វចិញ្ចឹមនៅផ្ទះទេ? បាទ ខ្ញុំមានឆ្មាមួយក្បាល។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Do you have an English-Khmer dictionary, Rith?",
                  "kh": "រិទ្ធ តើកូនមានវចនានុក្រមអង់គ្លេស-ខ្មែរទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, I do! I have a big dictionary on my bookshelf.",
                  "kh": "បាទអ្នកគ្រូ ខ្ញុំមាន! ខ្ញុំមានវចនានុក្រមធំមួយនៅលើធ្នើរសៀវភៅ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "That is wonderful! A dictionary is a student's best friend.",
                  "kh": "ពិតជាអស្ចារ្យណាស់! វចនានុក្រមគឺជាមិត្តល្អបំផុតរបស់សិស្ស។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 14\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ To Have (មាន / មិនមាន) (Verb To Have (Have / Has, Don't have / Doesn't have))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទ \"To Have\" ប្រែថា \"មាន\"៖\n១. ទម្រង់ស្រប (Affirmative):\n• I / You / We / They + HAVE (I have a dog. They have a big garden.)\n• He / She / It + HAS (He has a bicycle. She has long hair.)\n២. ទម្រង់បដិសេធ (Negative):\n• I / You / We / They + DON'T HAVE... (We don't have a car.)\n• He / She / It + DOESN'T HAVE... (He doesn't have a watch.)\n៣. ទម្រង់សំណួរ (Question):\n• Do you have...? -> Yes, I do. / No, I don't.\n• Does he have...? -> Yes, he does. / No, he doesn't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 have (/hæv/) = 🇰🇭 មាន (ប្រើជាមួយ I/You/We/They)\n   ↳ ឧទាហរណ៍៖ I have two brothers.\n   ↳ បកប្រែ៖ (ខ្ញុំមានបងប្អូនប្រុសពីរនាក់។)\n\n2. 🇬🇧 has (/hæz/) = 🇰🇭 មាន (ប្រើជាមួយ He/She/It)\n   ↳ ឧទាហរណ៍៖ She has a lovely kitten.\n   ↳ បកប្រែ៖ (នាងមានកូនឆ្មាគួរឱ្យស្រឡាញ់មួយក្បាល។)\n\n3. 🇬🇧 don't have (/doʊnt hæv/) = 🇰🇭 គ្មាន / មិនមាន\n   ↳ ឧទាហរណ៍៖ We don't have homework today.\n   ↳ បកប្រែ៖ (ពួកយើងគ្មានកិច្ចការផ្ទះទេថ្ងៃនេះ។)\n\n4. 🇬🇧 doesn't have (/ˈdʌznt hæv/) = 🇰🇭 គ្មាន / មិនមាន (He/She/It)\n   ↳ ឧទាហរណ៍៖ He doesn't have a motorbike.\n   ↳ បកប្រែ៖ (គាត់គ្មានម៉ូតូជិះទេ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a new English dictionary.\n   🇰🇭 (ខ្ញុំមានវចនានុក្រមភាសាអង់គ្លេសថ្មីមួយក្បាល។)\n2. 🇬🇧 She has two younger sisters and one older brother.\n   🇰🇭 (នាងមានប្អូនស្រីពីរនាក់ និងបងប្រុសម្នាក់។)\n3. 🇬🇧 Do you have any pets at home? Yes, I have a cat.\n   🇰🇭 (តើអ្នកមានសត្វចិញ្ចឹមនៅផ្ទះទេ? បាទ ខ្ញុំមានឆ្មាមួយក្បាល។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Do you have an English-Khmer dictionary, Rith?\"\n   🇰🇭 (រិទ្ធ តើកូនមានវចនានុក្រមអង់គ្លេស-ខ្មែរទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, I do! I have a big dictionary on my bookshelf.\"\n   🇰🇭 (បាទអ្នកគ្រូ ខ្ញុំមាន! ខ្ញុំមានវចនានុក្រមធំមួយនៅលើធ្នើរសៀវភៅ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"That is wonderful! A dictionary is a student's best friend.\"\n   🇰🇭 (ពិតជាអស្ចារ្យណាស់! វចនានុក្រមគឺជាមិត្តល្អបំផុតរបស់សិស្ស។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el15",
              "day": 15,
              "title": "ថ្ងៃទី 15៖ ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish) (Describing Family & Pets (Dog, Cat, Bird, Fish))",
              "topic": "ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish)",
              "grammar": "ការរួមបញ្ចូល \"Have/Has\" និងគុណនាមដើម្បីពណ៌នាសត្វចិញ្ចឹម និងមនុស្ស៖\n• Subject + have/has + adjective + noun\nឧទាហរណ៍៖\n• I have a white cat. (ខ្ញុំមានឆ្មាពណ៌សមួយក្បាល)\n• My dog has long ears. (ឆ្កែខ្ញុំមានត្រចៀកវែង)\n• She has big black eyes. (នាងមានភ្នែកធំៗពណ៌ខ្មៅ)",
              "vocab": [
                {
                  "en": "pet",
                  "kh": "សត្វចិញ្ចឹម",
                  "ipa": "/pet/",
                  "exEn": "Do you keep any pet?",
                  "exKh": "តើអ្នកមានចិញ្ចឹមសត្វទេ?"
                },
                {
                  "en": "dog",
                  "kh": "សត្វឆ្កែ",
                  "ipa": "/dɒɡ/",
                  "exEn": "My dog barks at strangers.",
                  "exKh": "ឆ្កែរបស់ខ្ញុំព្រុសដាក់មនុស្សប្លែកមុខ។"
                },
                {
                  "en": "cat",
                  "kh": "សត្វឆ្មា",
                  "ipa": "/kæt/",
                  "exEn": "The cat catches mice.",
                  "exKh": "ឆ្មាចាប់សត្វកណ្ដុរ។"
                },
                {
                  "en": "bird",
                  "kh": "សត្វបក្សី",
                  "ipa": "/bɜːd/",
                  "exEn": "The yellow bird sings sweetly.",
                  "exKh": "សត្វបក្សីពណ៌លឿងច្រៀងពិរោះណាស់។"
                },
                {
                  "en": "fish",
                  "kh": "សត្វត្រី",
                  "ipa": "/fɪʃ/",
                  "exEn": "I have three gold fish in an aquarium.",
                  "exKh": "ខ្ញុំមានត្រីមាសបីក្បាលក្នុងអាងកញ្ចក់។"
                }
              ],
              "sentences": [
                {
                  "en": "I have a playful puppy named Lucky.",
                  "kh": "ខ្ញុំមានកូនឆ្កែដ៏គួរឱ្យស្រឡាញ់ និងរពិសមួយក្បាលឈ្មោះ ឡាក់គី។"
                },
                {
                  "en": "My sister has two fluffy white cats.",
                  "kh": "ប្អូនស្រីខ្ញុំមានឆ្មារោមទន់ពណ៌សចំនួនពីរក្បាល។"
                },
                {
                  "en": "We feed our fish every morning before school.",
                  "kh": "ពួកយើងឱ្យចំណីត្រីរាល់ព្រឹកមុនពេលទៅសាលារៀន។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Tell me about your pets, Dara!",
                  "kh": "ដារ៉ា ប្រាប់អ្នកគ្រូអំពីសត្វចិញ្ចឹមរបស់កូនបន្តិចមើល!"
                },
                {
                  "speaker": "Student",
                  "en": "Teacher, I have a smart brown dog. His name is Rocky!",
                  "kh": "អ្នកគ្រូ ខ្ញុំមានឆ្កែពណ៌ត្នោតដ៏ឆ្លាតមួយក្បាល។ វាឈ្មោះ រ៉ក់គី!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Rocky is a strong name! What can Rocky do?",
                  "kh": "រ៉ក់គី ជាឈ្មោះដ៏មាំទាំ! តើរ៉ក់គីអាចធ្វើអ្វីបានខ្លះ?"
                },
                {
                  "speaker": "Student",
                  "en": "He can fetch balls and run very fast!",
                  "kh": "វាអាចរត់ទៅយកបាល់មកវិញ និងរត់លឿនណាស់!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 15\n🎯 ប្រធានបទ៖ ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish) (Describing Family & Pets (Dog, Cat, Bird, Fish))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរួមបញ្ចូល \"Have/Has\" និងគុណនាមដើម្បីពណ៌នាសត្វចិញ្ចឹម និងមនុស្ស៖\n• Subject + have/has + adjective + noun\nឧទាហរណ៍៖\n• I have a white cat. (ខ្ញុំមានឆ្មាពណ៌សមួយក្បាល)\n• My dog has long ears. (ឆ្កែខ្ញុំមានត្រចៀកវែង)\n• She has big black eyes. (នាងមានភ្នែកធំៗពណ៌ខ្មៅ)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 pet (/pet/) = 🇰🇭 សត្វចិញ្ចឹម\n   ↳ ឧទាហរណ៍៖ Do you keep any pet?\n   ↳ បកប្រែ៖ (តើអ្នកមានចិញ្ចឹមសត្វទេ?)\n\n2. 🇬🇧 dog (/dɒɡ/) = 🇰🇭 សត្វឆ្កែ\n   ↳ ឧទាហរណ៍៖ My dog barks at strangers.\n   ↳ បកប្រែ៖ (ឆ្កែរបស់ខ្ញុំព្រុសដាក់មនុស្សប្លែកមុខ។)\n\n3. 🇬🇧 cat (/kæt/) = 🇰🇭 សត្វឆ្មា\n   ↳ ឧទាហរណ៍៖ The cat catches mice.\n   ↳ បកប្រែ៖ (ឆ្មាចាប់សត្វកណ្ដុរ។)\n\n4. 🇬🇧 bird (/bɜːd/) = 🇰🇭 សត្វបក្សី\n   ↳ ឧទាហរណ៍៖ The yellow bird sings sweetly.\n   ↳ បកប្រែ៖ (សត្វបក្សីពណ៌លឿងច្រៀងពិរោះណាស់។)\n\n5. 🇬🇧 fish (/fɪʃ/) = 🇰🇭 សត្វត្រី\n   ↳ ឧទាហរណ៍៖ I have three gold fish in an aquarium.\n   ↳ បកប្រែ៖ (ខ្ញុំមានត្រីមាសបីក្បាលក្នុងអាងកញ្ចក់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a playful puppy named Lucky.\n   🇰🇭 (ខ្ញុំមានកូនឆ្កែដ៏គួរឱ្យស្រឡាញ់ និងរពិសមួយក្បាលឈ្មោះ ឡាក់គី។)\n2. 🇬🇧 My sister has two fluffy white cats.\n   🇰🇭 (ប្អូនស្រីខ្ញុំមានឆ្មារោមទន់ពណ៌សចំនួនពីរក្បាល។)\n3. 🇬🇧 We feed our fish every morning before school.\n   🇰🇭 (ពួកយើងឱ្យចំណីត្រីរាល់ព្រឹកមុនពេលទៅសាលារៀន។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Tell me about your pets, Dara!\"\n   🇰🇭 (ដារ៉ា ប្រាប់អ្នកគ្រូអំពីសត្វចិញ្ចឹមរបស់កូនបន្តិចមើល!)\n\n👤 Student:\n   🇬🇧 \"Teacher, I have a smart brown dog. His name is Rocky!\"\n   🇰🇭 (អ្នកគ្រូ ខ្ញុំមានឆ្កែពណ៌ត្នោតដ៏ឆ្លាតមួយក្បាល។ វាឈ្មោះ រ៉ក់គី!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Rocky is a strong name! What can Rocky do?\"\n   🇰🇭 (រ៉ក់គី ជាឈ្មោះដ៏មាំទាំ! តើរ៉ក់គីអាចធ្វើអ្វីបានខ្លះ?)\n\n👤 Student:\n   🇬🇧 \"He can fetch balls and run very fast!\"\n   🇰🇭 (វាអាចរត់ទៅយកបាល់មកវិញ និងរត់លឿនណាស់!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el16",
              "day": 16,
              "title": "ថ្ងៃទី 16៖ អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions (Feelings & Emotions (Happy, Sad, Tired, Hungry, Thirsty))",
              "topic": "អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions",
              "grammar": "ការបញ្ជាក់ពីអារម្មណ៍ដោយប្រើ Verb To Be ឬ Feel៖\n• I am + Adjective (I am happy, I am tired)\n• I feel + Adjective (I feel hungry, I feel thirsty)\n• He is excited / She is sad / We are proud\nសំណួរសួរអារម្មណ៍៖\n• \"How do you feel today?\" (តើអ្នកមានអារម្មណ៍យ៉ាងណាថ្ងៃនេះ?)\n• \"How are you feeling?\" -> \"I am very happy!\"",
              "vocab": [
                {
                  "en": "happy",
                  "kh": "សប្បាយរីករាយ",
                  "ipa": "/ˈhæpi/",
                  "exEn": "I am happy to pass the quiz.",
                  "exKh": "ខ្ញុំសប្បាយចិត្តណាស់ដែលបានប្រឡងជាប់សំណួរតេស្ត។"
                },
                {
                  "en": "sad",
                  "kh": "កើតទុក្ខ / ស្រងូតស្រងាត់",
                  "ipa": "/sæd/",
                  "exEn": "Do not be sad, keep smiling.",
                  "exKh": "កុំកើតទុក្ខអី បន្តញញឹមឡើង។"
                },
                {
                  "en": "tired",
                  "kh": "អស់កម្លាំង / ហត់",
                  "ipa": "/ˈtaɪəd/",
                  "exEn": "I feel tired after running.",
                  "exKh": "ខ្ញុំមានអារម្មណ៍ហត់ក្រោយពេលរត់រួច។"
                },
                {
                  "en": "hungry",
                  "kh": "ឃ្លានបាយ",
                  "ipa": "/ˈhʌŋɡri/",
                  "exEn": "I am hungry, let us eat lunch.",
                  "exKh": "ខ្ញុំឃ្លានហើយ តោះយើងញ៉ាំបាយថ្ងៃត្រង់។"
                },
                {
                  "en": "thirsty",
                  "kh": "ស្រេកទឹក",
                  "ipa": "/ˈθɜːsti/",
                  "exEn": "Drink fresh water when thirsty.",
                  "exKh": "ពិសាទឹកស្អាតនៅពេលស្រេកទឹក។"
                },
                {
                  "en": "excited",
                  "kh": "រំភើប",
                  "ipa": "/ɪkˈsaɪtɪd/",
                  "exEn": "Students are excited about holiday.",
                  "exKh": "សិស្សានុសិស្សរំភើបចំពោះថ្ងៃឈប់សម្រាក។"
                }
              ],
              "sentences": [
                {
                  "en": "I am so excited to study English today.",
                  "kh": "ខ្ញុំរំភើបខ្លាំងណាស់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះ។"
                },
                {
                  "en": "Are you thirsty? Here is a cold glass of water.",
                  "kh": "តើអ្នកស្រេកទឹកទេ? នេះជាទឹកត្រជាក់មួយកែវ។"
                },
                {
                  "en": "He was tired, but now he is refreshed and ready.",
                  "kh": "គាត់ធ្លាប់អស់កម្លាំង តែឥឡូវគាត់ស្រស់ស្រាយ និងរួចរាល់ហើយ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "How are you feeling this morning, Chenda?",
                  "kh": "ចិន្តា តើកូនមានអារម្មណ៍យ៉ាងណាដែរព្រឹកនេះ?"
                },
                {
                  "speaker": "Student",
                  "en": "I am very happy and excited, but a little bit hungry, Teacher!",
                  "kh": "ខ្ញុំសប្បាយចិត្ត និងរំភើបណាស់ តែឃ្លានបន្តិចអ្នកគ្រូ!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Haha! Don't worry, after our lesson we will have a healthy snack break!",
                  "kh": "ហាៗ! កុំបារម្ភអី ចប់មេរៀនយើងនឹងមានពេលសម្រាកញ៉ាំចំណីមានជីវជាតិ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 16\n🎯 ប្រធានបទ៖ អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions (Feelings & Emotions (Happy, Sad, Tired, Hungry, Thirsty))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការបញ្ជាក់ពីអារម្មណ៍ដោយប្រើ Verb To Be ឬ Feel៖\n• I am + Adjective (I am happy, I am tired)\n• I feel + Adjective (I feel hungry, I feel thirsty)\n• He is excited / She is sad / We are proud\nសំណួរសួរអារម្មណ៍៖\n• \"How do you feel today?\" (តើអ្នកមានអារម្មណ៍យ៉ាងណាថ្ងៃនេះ?)\n• \"How are you feeling?\" -> \"I am very happy!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 happy (/ˈhæpi/) = 🇰🇭 សប្បាយរីករាយ\n   ↳ ឧទាហរណ៍៖ I am happy to pass the quiz.\n   ↳ បកប្រែ៖ (ខ្ញុំសប្បាយចិត្តណាស់ដែលបានប្រឡងជាប់សំណួរតេស្ត។)\n\n2. 🇬🇧 sad (/sæd/) = 🇰🇭 កើតទុក្ខ / ស្រងូតស្រងាត់\n   ↳ ឧទាហរណ៍៖ Do not be sad, keep smiling.\n   ↳ បកប្រែ៖ (កុំកើតទុក្ខអី បន្តញញឹមឡើង។)\n\n3. 🇬🇧 tired (/ˈtaɪəd/) = 🇰🇭 អស់កម្លាំង / ហត់\n   ↳ ឧទាហរណ៍៖ I feel tired after running.\n   ↳ បកប្រែ៖ (ខ្ញុំមានអារម្មណ៍ហត់ក្រោយពេលរត់រួច។)\n\n4. 🇬🇧 hungry (/ˈhʌŋɡri/) = 🇰🇭 ឃ្លានបាយ\n   ↳ ឧទាហរណ៍៖ I am hungry, let us eat lunch.\n   ↳ បកប្រែ៖ (ខ្ញុំឃ្លានហើយ តោះយើងញ៉ាំបាយថ្ងៃត្រង់។)\n\n5. 🇬🇧 thirsty (/ˈθɜːsti/) = 🇰🇭 ស្រេកទឹក\n   ↳ ឧទាហរណ៍៖ Drink fresh water when thirsty.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតនៅពេលស្រេកទឹក។)\n\n6. 🇬🇧 excited (/ɪkˈsaɪtɪd/) = 🇰🇭 រំភើប\n   ↳ ឧទាហរណ៍៖ Students are excited about holiday.\n   ↳ បកប្រែ៖ (សិស្សានុសិស្សរំភើបចំពោះថ្ងៃឈប់សម្រាក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am so excited to study English today.\n   🇰🇭 (ខ្ញុំរំភើបខ្លាំងណាស់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះ។)\n2. 🇬🇧 Are you thirsty? Here is a cold glass of water.\n   🇰🇭 (តើអ្នកស្រេកទឹកទេ? នេះជាទឹកត្រជាក់មួយកែវ។)\n3. 🇬🇧 He was tired, but now he is refreshed and ready.\n   🇰🇭 (គាត់ធ្លាប់អស់កម្លាំង តែឥឡូវគាត់ស្រស់ស្រាយ និងរួចរាល់ហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How are you feeling this morning, Chenda?\"\n   🇰🇭 (ចិន្តា តើកូនមានអារម្មណ៍យ៉ាងណាដែរព្រឹកនេះ?)\n\n👤 Student:\n   🇬🇧 \"I am very happy and excited, but a little bit hungry, Teacher!\"\n   🇰🇭 (ខ្ញុំសប្បាយចិត្ត និងរំភើបណាស់ តែឃ្លានបន្តិចអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Haha! Don't worry, after our lesson we will have a healthy snack break!\"\n   🇰🇭 (ហាៗ! កុំបារម្ភអី ចប់មេរៀនយើងនឹងមានពេលសម្រាកញ៉ាំចំណីមានជីវជាតិ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el17",
              "day": 17,
              "title": "ថ្ងៃទី 17៖ ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ (How Are You Feeling Today? (Are you tired? Yes, I am / No, I'm not))",
              "topic": "ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ",
              "grammar": "ទម្រង់សំណួរ Yes/No សួរពីអារម្មណ៍៖\n• Are you happy? -> Yes, I am. / No, I am not.\n• Are you hungry? -> Yes, I am hungry. / No, I am full.\n• Is he tired? -> Yes, he is. / No, he isn't.\n• Are they excited? -> Yes, they are!\nការសួរដោយពាក្យគួរសម៖ \"Are you feeling okay today?\"",
              "vocab": [
                {
                  "en": "feeling",
                  "kh": "អារម្មណ៍",
                  "ipa": "/ˈfiːlɪŋ/",
                  "exEn": "I have a wonderful feeling.",
                  "exKh": "ខ្ញុំមានអារម្មណ៍ដ៏អស្ចារ្យ។"
                },
                {
                  "en": "fine",
                  "kh": "សុខសប្បាយ / ល្អ",
                  "ipa": "/faɪn/",
                  "exEn": "I am fine, thank you.",
                  "exKh": "ខ្ញុំសុខសប្បាយទេ អរគុណ។"
                },
                {
                  "en": "okay",
                  "kh": "មិនអីទេ / ធម្មតា",
                  "ipa": "/əʊˈkeɪ/",
                  "exEn": "Everything is okay.",
                  "exKh": "អ្វីៗគឺមិនអីទាំងអស់។"
                },
                {
                  "en": "better",
                  "kh": "ធូរស្បើយជាងមុន / ល្អជាងមុន",
                  "ipa": "/ˈbetər/",
                  "exEn": "I feel much better now.",
                  "exKh": "ឥឡូវនេះខ្ញុំមានអារម្មណ៍ធូរស្រាលជាងមុនច្រើន។"
                }
              ],
              "sentences": [
                {
                  "en": "How are you feeling today? I am feeling great!",
                  "kh": "តើថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងណាដែរ? ខ្ញុំមានអារម្មណ៍អស្ចារ្យណាស់!"
                },
                {
                  "en": "Are you tired after school? No, I am not tired at all.",
                  "kh": "តើអ្នកអស់កម្លាំងទេក្រោយចេញពីរៀន? អត់ទេ ខ្ញុំមិនអស់កម្លាំងទាល់តែសោះ។"
                },
                {
                  "en": "Is your mother feeling better today? Yes, she is healthy now.",
                  "kh": "តើម្តាយរបស់អ្នកបានធូរស្បើយទេថ្ងៃនេះ? ចាស ឥឡូវគាត់មានសុខភាពល្អហើយ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Are you feeling sleepy, Vathanak?",
                  "kh": "វឌ្ឍនៈ តើកូនមានអារម្មណ៍ងងុយគេងទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "No, Teacher Piseth! I am wide awake and ready to listen.",
                  "kh": "អត់ទេអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំភ្ញាក់ស្វាង និងរួចរាល់ក្នុងការស្តាប់ហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful spirit! That is the heart of a great learner.",
                  "kh": "ទឹកចិត្តដ៏អស្ចារ្យ! នេះជាបេះដូងរបស់អ្នករៀនសូត្រដ៏ពូកែ។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 17\n🎯 ប្រធានបទ៖ ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ (How Are You Feeling Today? (Are you tired? Yes, I am / No, I'm not))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nទម្រង់សំណួរ Yes/No សួរពីអារម្មណ៍៖\n• Are you happy? -> Yes, I am. / No, I am not.\n• Are you hungry? -> Yes, I am hungry. / No, I am full.\n• Is he tired? -> Yes, he is. / No, he isn't.\n• Are they excited? -> Yes, they are!\nការសួរដោយពាក្យគួរសម៖ \"Are you feeling okay today?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 feeling (/ˈfiːlɪŋ/) = 🇰🇭 អារម្មណ៍\n   ↳ ឧទាហរណ៍៖ I have a wonderful feeling.\n   ↳ បកប្រែ៖ (ខ្ញុំមានអារម្មណ៍ដ៏អស្ចារ្យ។)\n\n2. 🇬🇧 fine (/faɪn/) = 🇰🇭 សុខសប្បាយ / ល្អ\n   ↳ ឧទាហរណ៍៖ I am fine, thank you.\n   ↳ បកប្រែ៖ (ខ្ញុំសុខសប្បាយទេ អរគុណ។)\n\n3. 🇬🇧 okay (/əʊˈkeɪ/) = 🇰🇭 មិនអីទេ / ធម្មតា\n   ↳ ឧទាហរណ៍៖ Everything is okay.\n   ↳ បកប្រែ៖ (អ្វីៗគឺមិនអីទាំងអស់។)\n\n4. 🇬🇧 better (/ˈbetər/) = 🇰🇭 ធូរស្បើយជាងមុន / ល្អជាងមុន\n   ↳ ឧទាហរណ៍៖ I feel much better now.\n   ↳ បកប្រែ៖ (ឥឡូវនេះខ្ញុំមានអារម្មណ៍ធូរស្រាលជាងមុនច្រើន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 How are you feeling today? I am feeling great!\n   🇰🇭 (តើថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងណាដែរ? ខ្ញុំមានអារម្មណ៍អស្ចារ្យណាស់!)\n2. 🇬🇧 Are you tired after school? No, I am not tired at all.\n   🇰🇭 (តើអ្នកអស់កម្លាំងទេក្រោយចេញពីរៀន? អត់ទេ ខ្ញុំមិនអស់កម្លាំងទាល់តែសោះ។)\n3. 🇬🇧 Is your mother feeling better today? Yes, she is healthy now.\n   🇰🇭 (តើម្តាយរបស់អ្នកបានធូរស្បើយទេថ្ងៃនេះ? ចាស ឥឡូវគាត់មានសុខភាពល្អហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Are you feeling sleepy, Vathanak?\"\n   🇰🇭 (វឌ្ឍនៈ តើកូនមានអារម្មណ៍ងងុយគេងទេ?)\n\n👤 Student:\n   🇬🇧 \"No, Teacher Piseth! I am wide awake and ready to listen.\"\n   🇰🇭 (អត់ទេអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំភ្ញាក់ស្វាង និងរួចរាល់ក្នុងការស្តាប់ហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful spirit! That is the heart of a great learner.\"\n   🇰🇭 (ទឹកចិត្តដ៏អស្ចារ្យ! នេះជាបេះដូងរបស់អ្នករៀនសូត្រដ៏ពូកែ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el18",
              "day": 18,
              "title": "ថ្ងៃទី 18៖ រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍ (Weekly Review & Dialogue: Talking about Family & Feelings)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍",
              "grammar": "រំលឹកសរុបសប្តាហ៍ទី ៣៖\n១. Family Words: father, mother, brother, sister, parents, grandparents\n២. Have/Has: I have, He has, Do you have...?\n៣. Pets: dog, cat, bird, fish, rabbit\n៤. Feelings: happy, sad, tired, hungry, thirsty, excited, proud\n៥. សំណួរសន្ទនាជាក់ស្តែង៖ \"Do you have a big family?\", \"How are you feeling?\"",
              "vocab": [
                {
                  "en": "caring",
                  "kh": "យកចិត្តទុកដាក់",
                  "ipa": "/ˈkeərɪŋ/",
                  "exEn": "She is a caring mother.",
                  "exKh": "នាងជាម្តាយដែលចេះយកចិត្តទុកដាក់។"
                },
                {
                  "en": "together",
                  "kh": "ជាមួយគ្នា",
                  "ipa": "/təˈɡeðər/",
                  "exEn": "Our family eats dinner together.",
                  "exKh": "គ្រួសាររបស់យើងញ៉ាំអាហារពេលល្ងាចជាមួយគ្នា។"
                },
                {
                  "en": "proud",
                  "kh": "មានមោទនភាព",
                  "ipa": "/praʊd/",
                  "exEn": "My parents are proud of my studies.",
                  "exKh": "ឪពុកម្តាយខ្ញុំមានមោទនភាពចំពោះការរៀនសូត្ររបស់ខ្ញុំ។"
                }
              ],
              "sentences": [
                {
                  "en": "I have a happy and warm family.",
                  "kh": "ខ្ញុំមានគ្រួសារដ៏រីករាយ និងកក់ក្តៅមួយ។"
                },
                {
                  "en": "My father has a friendly white dog.",
                  "kh": "ឪពុករបស់ខ្ញុំមានឆ្កែពណ៌សដ៏រួសរាយមួយក្បាល។"
                },
                {
                  "en": "We always feel happy when we spend time together.",
                  "kh": "ពួកយើងតែងតែមានអារម្មណ៍រីករាយនៅពេលយើងចំណាយពេលជាមួយគ្នា។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Who can share a short story about their family and pets?",
                  "kh": "តើកូនណាខ្លះអាចចែករំលែករឿងខ្លីមួយអំពីគ្រួសារ និងសត្វចិញ្ចឹមរបស់ខ្លួន?"
                },
                {
                  "speaker": "Student",
                  "en": "Teacher, my family lives in Siem Reap. We have a mother cat and three small kittens. We feel so joyful every day!",
                  "kh": "អ្នកគ្រូ គ្រួសារខ្ញុំរស់នៅសៀមរាប។ ពួកយើងមានមេឆ្មាមួយ និងកូនឆ្មាតូចៗបីក្បាល។ ពួកយើងមានអារម្មណ៍សប្បាយចិត្តខ្លាំងណាស់រាល់ថ្ងៃ!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "That warms my heart so much! Beautiful English sentences, my dear student.",
                  "kh": "ធ្វើឱ្យអ្នកគ្រូកក់ក្តៅក្នុងចិត្តណាស់! ប្រយោគភាសាអង់គ្លេសស្អាតណាស់កូនសិស្សជាទីស្រឡាញ់។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 18\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍ (Weekly Review & Dialogue: Talking about Family & Feelings)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nរំលឹកសរុបសប្តាហ៍ទី ៣៖\n១. Family Words: father, mother, brother, sister, parents, grandparents\n២. Have/Has: I have, He has, Do you have...?\n៣. Pets: dog, cat, bird, fish, rabbit\n៤. Feelings: happy, sad, tired, hungry, thirsty, excited, proud\n៥. សំណួរសន្ទនាជាក់ស្តែង៖ \"Do you have a big family?\", \"How are you feeling?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 caring (/ˈkeərɪŋ/) = 🇰🇭 យកចិត្តទុកដាក់\n   ↳ ឧទាហរណ៍៖ She is a caring mother.\n   ↳ បកប្រែ៖ (នាងជាម្តាយដែលចេះយកចិត្តទុកដាក់។)\n\n2. 🇬🇧 together (/təˈɡeðər/) = 🇰🇭 ជាមួយគ្នា\n   ↳ ឧទាហរណ៍៖ Our family eats dinner together.\n   ↳ បកប្រែ៖ (គ្រួសាររបស់យើងញ៉ាំអាហារពេលល្ងាចជាមួយគ្នា។)\n\n3. 🇬🇧 proud (/praʊd/) = 🇰🇭 មានមោទនភាព\n   ↳ ឧទាហរណ៍៖ My parents are proud of my studies.\n   ↳ បកប្រែ៖ (ឪពុកម្តាយខ្ញុំមានមោទនភាពចំពោះការរៀនសូត្ររបស់ខ្ញុំ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a happy and warm family.\n   🇰🇭 (ខ្ញុំមានគ្រួសារដ៏រីករាយ និងកក់ក្តៅមួយ។)\n2. 🇬🇧 My father has a friendly white dog.\n   🇰🇭 (ឪពុករបស់ខ្ញុំមានឆ្កែពណ៌សដ៏រួសរាយមួយក្បាល។)\n3. 🇬🇧 We always feel happy when we spend time together.\n   🇰🇭 (ពួកយើងតែងតែមានអារម្មណ៍រីករាយនៅពេលយើងចំណាយពេលជាមួយគ្នា។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Who can share a short story about their family and pets?\"\n   🇰🇭 (តើកូនណាខ្លះអាចចែករំលែករឿងខ្លីមួយអំពីគ្រួសារ និងសត្វចិញ្ចឹមរបស់ខ្លួន?)\n\n👤 Student:\n   🇬🇧 \"Teacher, my family lives in Siem Reap. We have a mother cat and three small kittens. We feel so joyful every day!\"\n   🇰🇭 (អ្នកគ្រូ គ្រួសារខ្ញុំរស់នៅសៀមរាប។ ពួកយើងមានមេឆ្មាមួយ និងកូនឆ្មាតូចៗបីក្បាល។ ពួកយើងមានអារម្មណ៍សប្បាយចិត្តខ្លាំងណាស់រាល់ថ្ងៃ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"That warms my heart so much! Beautiful English sentences, my dear student.\"\n   🇰🇭 (ធ្វើឱ្យអ្នកគ្រូកក់ក្តៅក្នុងចិត្តណាស់! ប្រយោគភាសាអង់គ្លេសស្អាតណាស់កូនសិស្សជាទីស្រឡាញ់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew4",
          "weekNum": 4,
          "monthWeekNum": 4,
          "title": "សប្តាហ៍ទី 4 (ថ្ងៃទី 19 - 24)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 4 ខែទី 1",
          "lessons": [
            {
              "id": "el19",
              "day": 19,
              "title": "ថ្ងៃទី 19៖ បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ (Present Simple - Daily Habits (Wake up, Brush teeth, Wash face))",
              "topic": "បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ",
              "grammar": "បច្ចុប្បន្នកាលធម្មតា (Present Simple) ប្រើសម្រាប់ទម្លាប់ ឬការពិតប្រចាំថ្ងៃ៖\nរូបមន្ត៖\n• I / You / We / They + V1 (infinitive): I wake up at 6:00 AM.\n• He / She / It + V1 + s/es: He brushes his teeth. She washes her face.\n(កិរិយាសព្ទបញ្ចប់ដោយ ch, sh, ss, x, o ត្រូវថែម -es: brush -> brushes, wash -> washes, go -> goes)",
              "vocab": [
                {
                  "en": "wake up",
                  "kh": "ភ្ញាក់ពីគេង",
                  "ipa": "/weɪk ʌp/",
                  "exEn": "I wake up at six o'clock.",
                  "exKh": "ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦:០០។"
                },
                {
                  "en": "brush teeth",
                  "kh": "ដុសធ្មេញ",
                  "ipa": "/brʌʃ tiːθ/",
                  "exEn": "I brush my teeth twice a day.",
                  "exKh": "ខ្ញុំដុសធ្មេញពីរដងក្នុងមួយថ្ងៃ។"
                },
                {
                  "en": "wash face",
                  "kh": "លុបមុខ",
                  "ipa": "/wɒʃ feɪs/",
                  "exEn": "She washes her face with clean water.",
                  "exKh": "នាងលុបមុខនឹងទឹកស្អាត។"
                },
                {
                  "en": "get dressed",
                  "kh": "ស្លៀកពាក់",
                  "ipa": "/ɡet drest/",
                  "exEn": "He gets dressed for school.",
                  "exKh": "គាត់ស្លៀកពាក់ដើម្បីទៅសាលារៀន។"
                },
                {
                  "en": "eat breakfast",
                  "kh": "ញ៉ាំអាហារពេលព្រឹក",
                  "ipa": "/iːt ˈbrekfəst/",
                  "exEn": "We eat breakfast together.",
                  "exKh": "ពួកយើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។"
                }
              ],
              "sentences": [
                {
                  "en": "I wake up early every morning.",
                  "kh": "ខ្ញុំភ្ញាក់ពីគេងពីព្រលឹមរៀងរាល់ព្រឹក។"
                },
                {
                  "en": "She brushes her teeth before going to bed.",
                  "kh": "នាងដុសធ្មេញរបស់នាងមុនពេលចូលគេង។"
                },
                {
                  "en": "My brother eats rice and soup for breakfast.",
                  "kh": "បងប្រុសរបស់ខ្ញុំញ៉ាំបាយ និងសម្លសម្រាប់អាហារពេលព្រឹក។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "What do you do first when you wake up in the morning?",
                  "kh": "តើកូនធ្វើអ្វីមុនគេនៅពេលភ្ញាក់ពីគេងនៅពេលព្រឹក?"
                },
                {
                  "speaker": "Student",
                  "en": "I wash my face and brush my teeth, Teacher!",
                  "kh": "ខ្ញុំលុបមុខ និងដុសធ្មេញអ្នកគ្រូ!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Good habits keep you fresh, healthy and smart!",
                  "kh": "ទម្លាប់ល្អជួយឱ្យកូនស្រស់ស្រាយ មានសុខភាពល្អ និងឆ្លាតវៃ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 19\n🎯 ប្រធានបទ៖ បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ (Present Simple - Daily Habits (Wake up, Brush teeth, Wash face))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលធម្មតា (Present Simple) ប្រើសម្រាប់ទម្លាប់ ឬការពិតប្រចាំថ្ងៃ៖\nរូបមន្ត៖\n• I / You / We / They + V1 (infinitive): I wake up at 6:00 AM.\n• He / She / It + V1 + s/es: He brushes his teeth. She washes her face.\n(កិរិយាសព្ទបញ្ចប់ដោយ ch, sh, ss, x, o ត្រូវថែម -es: brush -> brushes, wash -> washes, go -> goes)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 wake up (/weɪk ʌp/) = 🇰🇭 ភ្ញាក់ពីគេង\n   ↳ ឧទាហរណ៍៖ I wake up at six o'clock.\n   ↳ បកប្រែ៖ (ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦:០០។)\n\n2. 🇬🇧 brush teeth (/brʌʃ tiːθ/) = 🇰🇭 ដុសធ្មេញ\n   ↳ ឧទាហរណ៍៖ I brush my teeth twice a day.\n   ↳ បកប្រែ៖ (ខ្ញុំដុសធ្មេញពីរដងក្នុងមួយថ្ងៃ។)\n\n3. 🇬🇧 wash face (/wɒʃ feɪs/) = 🇰🇭 លុបមុខ\n   ↳ ឧទាហរណ៍៖ She washes her face with clean water.\n   ↳ បកប្រែ៖ (នាងលុបមុខនឹងទឹកស្អាត។)\n\n4. 🇬🇧 get dressed (/ɡet drest/) = 🇰🇭 ស្លៀកពាក់\n   ↳ ឧទាហរណ៍៖ He gets dressed for school.\n   ↳ បកប្រែ៖ (គាត់ស្លៀកពាក់ដើម្បីទៅសាលារៀន។)\n\n5. 🇬🇧 eat breakfast (/iːt ˈbrekfəst/) = 🇰🇭 ញ៉ាំអាហារពេលព្រឹក\n   ↳ ឧទាហរណ៍៖ We eat breakfast together.\n   ↳ បកប្រែ៖ (ពួកយើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I wake up early every morning.\n   🇰🇭 (ខ្ញុំភ្ញាក់ពីគេងពីព្រលឹមរៀងរាល់ព្រឹក។)\n2. 🇬🇧 She brushes her teeth before going to bed.\n   🇰🇭 (នាងដុសធ្មេញរបស់នាងមុនពេលចូលគេង។)\n3. 🇬🇧 My brother eats rice and soup for breakfast.\n   🇰🇭 (បងប្រុសរបស់ខ្ញុំញ៉ាំបាយ និងសម្លសម្រាប់អាហារពេលព្រឹក។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"What do you do first when you wake up in the morning?\"\n   🇰🇭 (តើកូនធ្វើអ្វីមុនគេនៅពេលភ្ញាក់ពីគេងនៅពេលព្រឹក?)\n\n👤 Student:\n   🇬🇧 \"I wash my face and brush my teeth, Teacher!\"\n   🇰🇭 (ខ្ញុំលុបមុខ និងដុសធ្មេញអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Good habits keep you fresh, healthy and smart!\"\n   🇰🇭 (ទម្លាប់ល្អជួយឱ្យកូនស្រស់ស្រាយ មានសុខភាពល្អ និងឆ្លាតវៃ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el20",
              "day": 20,
              "title": "ថ្ងៃទី 20៖ ការប្រាប់ពេលវេលា Telling Time (What time is it?) (Telling Time (What time is it? It's 7 o'clock / half past))",
              "topic": "ការប្រាប់ពេលវេលា Telling Time (What time is it?)",
              "grammar": "ការសួរ និងប្រាប់ម៉ោងជាភាសាអង់គ្លេស៖\nសំណួរ៖ \"What time is it?\" ឬ \"What's the time?\"\nចម្លើយ៖ \"It is + ម៉ោង\"\n• ម៉ោងគត់ (Exact hour): It is seven o'clock. (7:00)\n• កន្លះម៉ោង (30 minutes): It is seven thirty. ឬ It is half past seven. (7:30)\n• ម៉ោង និងនាទី៖ It is eight fifteen. (8:15) / It is eight forty-five. (8:45)\n• ពេលព្រឹក: AM (ante meridiem) / ពេលរសៀល-យប់: PM (post meridiem)",
              "vocab": [
                {
                  "en": "o'clock",
                  "kh": "ម៉ោង (គត់)",
                  "ipa": "/əˈklɒk/",
                  "exEn": "It is eight o'clock.",
                  "exKh": "វាគឺម៉ោងប្រាំបីគត់។"
                },
                {
                  "en": "half past",
                  "kh": "កន្លះ (កន្លង ៣០ នាទី)",
                  "ipa": "/hɑːf pɑːst/",
                  "exEn": "It is half past six.",
                  "exKh": "វាគឺម៉ោង ៦:៣០ (ប្រាំមួយកន្លះ)។"
                },
                {
                  "en": "quarter past",
                  "kh": "កន្លង ១៥ នាទី",
                  "ipa": "/ˈkwɔːtər pɑːst/",
                  "exEn": "It is a quarter past seven.",
                  "exKh": "វាគឺម៉ោង ៧:១៥។"
                },
                {
                  "en": "noon",
                  "kh": "ថ្ងៃត្រង់ (12:00 PM)",
                  "ipa": "/nuːn/",
                  "exEn": "We eat lunch at noon.",
                  "exKh": "ពួកយើងញ៉ាំបាយថ្ងៃត្រង់នៅពេលថ្ងៃត្រង់។"
                },
                {
                  "en": "midnight",
                  "kh": "កណ្តាលអធ្រាត្រ (12:00 AM)",
                  "ipa": "/ˈmɪdnaɪt/",
                  "exEn": "Sleep before midnight.",
                  "exKh": "គេងមុនកណ្តាលអធ្រាត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "What time is it now? It is exactly seven o'clock.",
                  "kh": "តើឥឡូវនេះម៉ោងប៉ុន្មានហើយ? គឺម៉ោង ៧:០០ គត់។"
                },
                {
                  "en": "Our English live class starts at seven thirty in the evening.",
                  "kh": "ថ្នាក់ផ្សាយផ្ទាល់ភាសាអង់គ្លេសយើងចាប់ផ្តើមនៅម៉ោង ៧:៣០ នាទីល្ងាច។"
                },
                {
                  "en": "I go to bed at nine o'clock every night.",
                  "kh": "ខ្ញុំចូលគេងនៅម៉ោង ៩:០០ យប់ជារៀងរាល់យប់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Excuse me, Dara. Do you know what time it is?",
                  "kh": "សុំទោសដារ៉ា។ តើកូនដឹងថាម៉ោងប៉ុន្មានហើយទេ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher! Looking at the wall clock, it is ten past eight.",
                  "kh": "ចាសអ្នកគ្រូ! មើលលើនាឡិកាជញ្ជាំង គឺម៉ោង ៨:១០ នាទី។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Spot on! You can tell the time accurately.",
                  "kh": "ត្រឹមត្រូវបេះបិទ! កូនអាចប្រាប់ម៉ោងបានយ៉ាងច្បាស់លាស់។"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 20\n🎯 ប្រធានបទ៖ ការប្រាប់ពេលវេលា Telling Time (What time is it?) (Telling Time (What time is it? It's 7 o'clock / half past))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ម៉ោងជាភាសាអង់គ្លេស៖\nសំណួរ៖ \"What time is it?\" ឬ \"What's the time?\"\nចម្លើយ៖ \"It is + ម៉ោង\"\n• ម៉ោងគត់ (Exact hour): It is seven o'clock. (7:00)\n• កន្លះម៉ោង (30 minutes): It is seven thirty. ឬ It is half past seven. (7:30)\n• ម៉ោង និងនាទី៖ It is eight fifteen. (8:15) / It is eight forty-five. (8:45)\n• ពេលព្រឹក: AM (ante meridiem) / ពេលរសៀល-យប់: PM (post meridiem)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 o'clock (/əˈklɒk/) = 🇰🇭 ម៉ោង (គត់)\n   ↳ ឧទាហរណ៍៖ It is eight o'clock.\n   ↳ បកប្រែ៖ (វាគឺម៉ោងប្រាំបីគត់។)\n\n2. 🇬🇧 half past (/hɑːf pɑːst/) = 🇰🇭 កន្លះ (កន្លង ៣០ នាទី)\n   ↳ ឧទាហរណ៍៖ It is half past six.\n   ↳ បកប្រែ៖ (វាគឺម៉ោង ៦:៣០ (ប្រាំមួយកន្លះ)។)\n\n3. 🇬🇧 quarter past (/ˈkwɔːtər pɑːst/) = 🇰🇭 កន្លង ១៥ នាទី\n   ↳ ឧទាហរណ៍៖ It is a quarter past seven.\n   ↳ បកប្រែ៖ (វាគឺម៉ោង ៧:១៥។)\n\n4. 🇬🇧 noon (/nuːn/) = 🇰🇭 ថ្ងៃត្រង់ (12:00 PM)\n   ↳ ឧទាហរណ៍៖ We eat lunch at noon.\n   ↳ បកប្រែ៖ (ពួកយើងញ៉ាំបាយថ្ងៃត្រង់នៅពេលថ្ងៃត្រង់។)\n\n5. 🇬🇧 midnight (/ˈmɪdnaɪt/) = 🇰🇭 កណ្តាលអធ្រាត្រ (12:00 AM)\n   ↳ ឧទាហរណ៍៖ Sleep before midnight.\n   ↳ បកប្រែ៖ (គេងមុនកណ្តាលអធ្រាត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 What time is it now? It is exactly seven o'clock.\n   🇰🇭 (តើឥឡូវនេះម៉ោងប៉ុន្មានហើយ? គឺម៉ោង ៧:០០ គត់។)\n2. 🇬🇧 Our English live class starts at seven thirty in the evening.\n   🇰🇭 (ថ្នាក់ផ្សាយផ្ទាល់ភាសាអង់គ្លេសយើងចាប់ផ្តើមនៅម៉ោង ៧:៣០ នាទីល្ងាច។)\n3. 🇬🇧 I go to bed at nine o'clock every night.\n   🇰🇭 (ខ្ញុំចូលគេងនៅម៉ោង ៩:០០ យប់ជារៀងរាល់យប់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Excuse me, Dara. Do you know what time it is?\"\n   🇰🇭 (សុំទោសដារ៉ា។ តើកូនដឹងថាម៉ោងប៉ុន្មានហើយទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher! Looking at the wall clock, it is ten past eight.\"\n   🇰🇭 (ចាសអ្នកគ្រូ! មើលលើនាឡិកាជញ្ជាំង គឺម៉ោង ៨:១០ នាទី។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Spot on! You can tell the time accurately.\"\n   🇰🇭 (ត្រឹមត្រូវបេះបិទ! កូនអាចប្រាប់ម៉ោងបានយ៉ាងច្បាស់លាស់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el21",
              "day": 21,
              "title": "ថ្ងៃទី 21៖ កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់) (Daily Schedule (Morning, Afternoon, Evening, Night))",
              "topic": "កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់)",
              "grammar": "ការប្រើធ្នាក់ពេលវេលា (Prepositions of Time): IN និង AT៖\n• in the morning = នៅពេលព្រឹក\n• in the afternoon = នៅពេលរសៀល\n• in the evening = នៅពេលល្ងាច\n• at noon = នៅពេលថ្ងៃត្រង់\n• at night = នៅពេលយប់\n• at + ម៉ោង (at 7:00 AM, at 8:30 PM)",
              "vocab": [
                {
                  "en": "morning",
                  "kh": "ពេលព្រឹក",
                  "ipa": "/ˈmɔːnɪŋ/",
                  "exEn": "Good morning, Teacher Piseth!",
                  "exKh": "អរុណសួស្តី អ្នកគ្រូពិសិដ្ឋ!"
                },
                {
                  "en": "afternoon",
                  "kh": "ពេលរសៀល",
                  "ipa": "/ˌɑːftəˈnuːn/",
                  "exEn": "We play sports in the afternoon.",
                  "exKh": "ពួកយើងលេងកីឡានៅពេលរសៀល។"
                },
                {
                  "en": "evening",
                  "kh": "ពេលល្ងាច",
                  "ipa": "/ˈiːvnɪŋ/",
                  "exEn": "I review my lessons in the evening.",
                  "exKh": "ខ្ញុំរំលឹកមេរៀនរបស់ខ្ញុំនៅពេលល្ងាច។"
                },
                {
                  "en": "night",
                  "kh": "ពេលយប់",
                  "ipa": "/naɪt/",
                  "exEn": "Good night and sweet dreams!",
                  "exKh": "រាត្រីសួស្តី និងសុបិនល្អ!"
                },
                {
                  "en": "schedule",
                  "kh": "កាលវិភាគ",
                  "ipa": "/ˈʃedjuːl/",
                  "exEn": "My daily schedule is organized.",
                  "exKh": "កាលវិភាគប្រចាំថ្ងៃខ្ញុំមានរបៀបរៀបរយ។"
                }
              ],
              "sentences": [
                {
                  "en": "In the morning, I study English at school.",
                  "kh": "នៅពេលព្រឹក ខ្ញុំរៀនភាសាអង់គ្លេសនៅសាលា។"
                },
                {
                  "en": "In the afternoon, I help my mother clean the house.",
                  "kh": "នៅពេលរសៀល ខ្ញុំជួយម្តាយខ្ញុំបោសសម្អាតផ្ទះ។"
                },
                {
                  "en": "At night, I sleep early to wake up strong tomorrow.",
                  "kh": "នៅពេលយប់ ខ្ញុំគេងលឿនដើម្បីភ្ញាក់ឡើងមានកម្លាំងមាំមួននៅថ្ងៃស្អែក។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "What do you usually do in the evening, Bopha?",
                  "kh": "បុប្ផា តើកូនតែងតែធ្វើអ្វីនៅពេលល្ងាច?"
                },
                {
                  "speaker": "Student",
                  "en": "In the evening, I eat dinner with my parents, and then I study with Teacher Piseth AI on Telegram!",
                  "kh": "នៅពេលល្ងាច ខ្ញុំញ៉ាំបាយជាមួយប៉ាម៉ាក់ រួចហើយខ្ញុំរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ AI លើតេលេក្រាម!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "I am so happy to be your teacher every evening!",
                  "kh": "អ្នកគ្រូសប្បាយចិត្តណាស់ដែលបានធ្វើជាគ្រូបង្រៀនរបស់កូនរាល់ល្ងាច!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 21\n🎯 ប្រធានបទ៖ កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់) (Daily Schedule (Morning, Afternoon, Evening, Night))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការប្រើធ្នាក់ពេលវេលា (Prepositions of Time): IN និង AT៖\n• in the morning = នៅពេលព្រឹក\n• in the afternoon = នៅពេលរសៀល\n• in the evening = នៅពេលល្ងាច\n• at noon = នៅពេលថ្ងៃត្រង់\n• at night = នៅពេលយប់\n• at + ម៉ោង (at 7:00 AM, at 8:30 PM)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 morning (/ˈmɔːnɪŋ/) = 🇰🇭 ពេលព្រឹក\n   ↳ ឧទាហរណ៍៖ Good morning, Teacher Piseth!\n   ↳ បកប្រែ៖ (អរុណសួស្តី អ្នកគ្រូពិសិដ្ឋ!)\n\n2. 🇬🇧 afternoon (/ˌɑːftəˈnuːn/) = 🇰🇭 ពេលរសៀល\n   ↳ ឧទាហរណ៍៖ We play sports in the afternoon.\n   ↳ បកប្រែ៖ (ពួកយើងលេងកីឡានៅពេលរសៀល។)\n\n3. 🇬🇧 evening (/ˈiːvnɪŋ/) = 🇰🇭 ពេលល្ងាច\n   ↳ ឧទាហរណ៍៖ I review my lessons in the evening.\n   ↳ បកប្រែ៖ (ខ្ញុំរំលឹកមេរៀនរបស់ខ្ញុំនៅពេលល្ងាច។)\n\n4. 🇬🇧 night (/naɪt/) = 🇰🇭 ពេលយប់\n   ↳ ឧទាហរណ៍៖ Good night and sweet dreams!\n   ↳ បកប្រែ៖ (រាត្រីសួស្តី និងសុបិនល្អ!)\n\n5. 🇬🇧 schedule (/ˈʃedjuːl/) = 🇰🇭 កាលវិភាគ\n   ↳ ឧទាហរណ៍៖ My daily schedule is organized.\n   ↳ បកប្រែ៖ (កាលវិភាគប្រចាំថ្ងៃខ្ញុំមានរបៀបរៀបរយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 In the morning, I study English at school.\n   🇰🇭 (នៅពេលព្រឹក ខ្ញុំរៀនភាសាអង់គ្លេសនៅសាលា។)\n2. 🇬🇧 In the afternoon, I help my mother clean the house.\n   🇰🇭 (នៅពេលរសៀល ខ្ញុំជួយម្តាយខ្ញុំបោសសម្អាតផ្ទះ។)\n3. 🇬🇧 At night, I sleep early to wake up strong tomorrow.\n   🇰🇭 (នៅពេលយប់ ខ្ញុំគេងលឿនដើម្បីភ្ញាក់ឡើងមានកម្លាំងមាំមួននៅថ្ងៃស្អែក។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"What do you usually do in the evening, Bopha?\"\n   🇰🇭 (បុប្ផា តើកូនតែងតែធ្វើអ្វីនៅពេលល្ងាច?)\n\n👤 Student:\n   🇬🇧 \"In the evening, I eat dinner with my parents, and then I study with Teacher Piseth AI on Telegram!\"\n   🇰🇭 (នៅពេលល្ងាច ខ្ញុំញ៉ាំបាយជាមួយប៉ាម៉ាក់ រួចហើយខ្ញុំរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ AI លើតេលេក្រាម!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"I am so happy to be your teacher every evening!\"\n   🇰🇭 (អ្នកគ្រូសប្បាយចិត្តណាស់ដែលបានធ្វើជាគ្រូបង្រៀនរបស់កូនរាល់ល្ងាច!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el22",
              "day": 22,
              "title": "ថ្ងៃទី 22៖ ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week) (Days of the Week & Routine (On Monday, On weekends...))",
              "topic": "ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week)",
              "grammar": "ថ្ងៃទាំង ៧ នៃសប្តាហ៍ និងការប្រើធ្នាក់ \"ON\"៖\n• On + ថ្ងៃនៃសប្តាហ៍ (On Monday, On Tuesday, On Wednesday, On Thursday, On Friday, On Saturday, On Sunday)\n• On weekdays = ពីថ្ងៃចន្ទ ដល់សុក្រ\n• On weekends = នៅថ្ងៃចុងសប្តាហ៍ (សៅរ៍ និងអាទិត្យ)\nចំណាំ: ឈ្មោះថ្ងៃត្រូវសរសេរអក្សរធំនៅដើមពាក្យជានិច្ច (Capital Letter)!",
              "vocab": [
                {
                  "en": "Monday",
                  "kh": "ថ្ងៃចន្ទ",
                  "ipa": "/ˈmʌndeɪ/",
                  "exEn": "School starts on Monday.",
                  "exKh": "សាលារៀនចាប់ផ្តើមនៅថ្ងៃចន្ទ។"
                },
                {
                  "en": "Wednesday",
                  "kh": "ថ្ងៃពុធ",
                  "ipa": "/ˈwenzdeɪ/",
                  "exEn": "We have English test on Wednesday.",
                  "exKh": "យើងមានប្រឡងតេស្តអង់គ្លេសនៅថ្ងៃពុធ។"
                },
                {
                  "en": "Friday",
                  "kh": "ថ្ងៃសុក្រ",
                  "ipa": "/ˈfraɪdeɪ/",
                  "exEn": "Friday is the end of the school week.",
                  "exKh": "ថ្ងៃសុក្រគឺជាថ្ងៃចុងក្រោយនៃសប្តាហ៍សិក្សា។"
                },
                {
                  "en": "Saturday",
                  "kh": "ថ្ងៃសៅរ៍",
                  "ipa": "/ˈsætədeɪ/",
                  "exEn": "On Saturday, I ride my bicycle.",
                  "exKh": "នៅថ្ងៃសៅរ៍ ខ្ញុំជិះកង់កម្សាន្ត។"
                },
                {
                  "en": "Sunday",
                  "kh": "ថ្ងៃអាទិត្យ",
                  "ipa": "/ˈsʌndeɪ/",
                  "exEn": "Sunday is a family day.",
                  "exKh": "ថ្ងៃអាទិត្យជាថ្ងៃជួបជុំគ្រួសារ។"
                },
                {
                  "en": "weekend",
                  "kh": "ចុងសប្តាហ៍",
                  "ipa": "/ˌwiːkˈend/",
                  "exEn": "Have a wonderful weekend!",
                  "exKh": "សូមឱ្យមានចុងសប្តាហ៍ដ៏អស្ចារ្យ!"
                }
              ],
              "sentences": [
                {
                  "en": "On Monday, we learn new grammar rules.",
                  "kh": "នៅថ្ងៃចន្ទ ពួកយើងរៀនក្បួនវេយ្យាករណ៍ថ្មីៗ។"
                },
                {
                  "en": "On weekends, my family visits my grandparents in the countryside.",
                  "kh": "នៅចុងសប្តាហ៍ គ្រួសារខ្ញុំទៅលេងជីដូនជីតានៅឯស្រុកស្រែ។"
                },
                {
                  "en": "I practice speaking English every day, from Monday to Sunday.",
                  "kh": "ខ្ញុំហាត់និយាយភាសាអង់គ្លេសរាល់ថ្ងៃ ចាប់ពីថ្ងៃចន្ទ ដល់ថ្ងៃអាទិត្យ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "What is your favorite day of the week, Sok?",
                  "kh": "សុខ តើកូនចូលចិត្តថ្ងៃណាជាងគេក្នុងសប្តាហ៍?"
                },
                {
                  "speaker": "Student",
                  "en": "I love Sunday because I can play football with my friends and study English without rushing!",
                  "kh": "ខ្ញុំចូលចិត្តថ្ងៃអាទិត្យ ព្រោះខ្ញុំអាចលេងបាល់ជាមួយមិត្តភក្តិ ហើយរៀនអង់គ្លេសដោយមិនបាច់ប្រញាប់ប្រញាល់!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Sunday is indeed a relaxing and fruitful day!",
                  "kh": "ថ្ងៃអាទិត្យពិតជាថ្ងៃសម្រាក និងពោរពេញដោយផលល្អ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 22\n🎯 ប្រធានបទ៖ ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week) (Days of the Week & Routine (On Monday, On weekends...))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nថ្ងៃទាំង ៧ នៃសប្តាហ៍ និងការប្រើធ្នាក់ \"ON\"៖\n• On + ថ្ងៃនៃសប្តាហ៍ (On Monday, On Tuesday, On Wednesday, On Thursday, On Friday, On Saturday, On Sunday)\n• On weekdays = ពីថ្ងៃចន្ទ ដល់សុក្រ\n• On weekends = នៅថ្ងៃចុងសប្តាហ៍ (សៅរ៍ និងអាទិត្យ)\nចំណាំ: ឈ្មោះថ្ងៃត្រូវសរសេរអក្សរធំនៅដើមពាក្យជានិច្ច (Capital Letter)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 Monday (/ˈmʌndeɪ/) = 🇰🇭 ថ្ងៃចន្ទ\n   ↳ ឧទាហរណ៍៖ School starts on Monday.\n   ↳ បកប្រែ៖ (សាលារៀនចាប់ផ្តើមនៅថ្ងៃចន្ទ។)\n\n2. 🇬🇧 Wednesday (/ˈwenzdeɪ/) = 🇰🇭 ថ្ងៃពុធ\n   ↳ ឧទាហរណ៍៖ We have English test on Wednesday.\n   ↳ បកប្រែ៖ (យើងមានប្រឡងតេស្តអង់គ្លេសនៅថ្ងៃពុធ។)\n\n3. 🇬🇧 Friday (/ˈfraɪdeɪ/) = 🇰🇭 ថ្ងៃសុក្រ\n   ↳ ឧទាហរណ៍៖ Friday is the end of the school week.\n   ↳ បកប្រែ៖ (ថ្ងៃសុក្រគឺជាថ្ងៃចុងក្រោយនៃសប្តាហ៍សិក្សា។)\n\n4. 🇬🇧 Saturday (/ˈsætədeɪ/) = 🇰🇭 ថ្ងៃសៅរ៍\n   ↳ ឧទាហរណ៍៖ On Saturday, I ride my bicycle.\n   ↳ បកប្រែ៖ (នៅថ្ងៃសៅរ៍ ខ្ញុំជិះកង់កម្សាន្ត។)\n\n5. 🇬🇧 Sunday (/ˈsʌndeɪ/) = 🇰🇭 ថ្ងៃអាទិត្យ\n   ↳ ឧទាហរណ៍៖ Sunday is a family day.\n   ↳ បកប្រែ៖ (ថ្ងៃអាទិត្យជាថ្ងៃជួបជុំគ្រួសារ។)\n\n6. 🇬🇧 weekend (/ˌwiːkˈend/) = 🇰🇭 ចុងសប្តាហ៍\n   ↳ ឧទាហរណ៍៖ Have a wonderful weekend!\n   ↳ បកប្រែ៖ (សូមឱ្យមានចុងសប្តាហ៍ដ៏អស្ចារ្យ!)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 On Monday, we learn new grammar rules.\n   🇰🇭 (នៅថ្ងៃចន្ទ ពួកយើងរៀនក្បួនវេយ្យាករណ៍ថ្មីៗ។)\n2. 🇬🇧 On weekends, my family visits my grandparents in the countryside.\n   🇰🇭 (នៅចុងសប្តាហ៍ គ្រួសារខ្ញុំទៅលេងជីដូនជីតានៅឯស្រុកស្រែ។)\n3. 🇬🇧 I practice speaking English every day, from Monday to Sunday.\n   🇰🇭 (ខ្ញុំហាត់និយាយភាសាអង់គ្លេសរាល់ថ្ងៃ ចាប់ពីថ្ងៃចន្ទ ដល់ថ្ងៃអាទិត្យ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"What is your favorite day of the week, Sok?\"\n   🇰🇭 (សុខ តើកូនចូលចិត្តថ្ងៃណាជាងគេក្នុងសប្តាហ៍?)\n\n👤 Student:\n   🇬🇧 \"I love Sunday because I can play football with my friends and study English without rushing!\"\n   🇰🇭 (ខ្ញុំចូលចិត្តថ្ងៃអាទិត្យ ព្រោះខ្ញុំអាចលេងបាល់ជាមួយមិត្តភក្តិ ហើយរៀនអង់គ្លេសដោយមិនបាច់ប្រញាប់ប្រញាល់!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Sunday is indeed a relaxing and fruitful day!\"\n   🇰🇭 (ថ្ងៃអាទិត្យពិតជាថ្ងៃសម្រាក និងពោរពេញដោយផលល្អ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el23",
              "day": 23,
              "title": "ថ្ងៃទី 23៖ រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត (Month 1 Grand Review: Grammar, Vocabulary & Practice)",
              "topic": "រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត",
              "grammar": "សង្ខេបចំណុចសំខាន់ៗទាំង ២២ ថ្ងៃនៃខែទី ១៖\n១. Subject Pronouns: I, You, We, They, He, She, It\n២. Verb To Be: Am, Is, Are (Affirmative, Negative, Question)\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Demonstratives: This, That, These, Those\n៥. Plural Nouns: -s, -es, -ies\n៦. Numbers 1-100 & Counting\n៧. Family Members & Verb To Have (Have/Has)\n៨. Feelings & Emotions (Happy, Sad, Tired, Hungry)\n៩. Daily Routines & Telling Time (Present Simple)",
              "vocab": [
                {
                  "en": "review",
                  "kh": "រំលឹកឡើងវិញ",
                  "ipa": "/rɪˈvjuː/",
                  "exEn": "Let us review Month 1 lessons.",
                  "exKh": "តោះយើងរំលឹកមេរៀនខែទី ១ ឡើងវិញ។"
                },
                {
                  "en": "master",
                  "kh": "ចេះស្ទាត់ជំនាញ",
                  "ipa": "/ˈmɑːstər/",
                  "exEn": "You master basic English grammar.",
                  "exKh": "កូនចេះស្ទាត់វេយ្យាករណ៍អង់គ្លេសគ្រឹះហើយ។"
                },
                {
                  "en": "confident",
                  "kh": "មានទំនុកចិត្ត",
                  "ipa": "/ˈkɒnfɪdənt/",
                  "exEn": "I feel confident about the exam.",
                  "exKh": "ខ្ញុំមានទំនុកចិត្តចំពោះការប្រឡង។"
                }
              ],
              "sentences": [
                {
                  "en": "I understand all Month 1 grammar lessons clearly.",
                  "kh": "ខ្ញុំយល់ច្បាស់នូវរាល់មេរៀនវេយ្យាករណ៍ខែទី ១។"
                },
                {
                  "en": "Practice makes perfect in English learning.",
                  "kh": "ការអនុវត្តជួយឱ្យការរៀនភាសាអង់គ្លេសកាន់តែល្អឥតខ្ចោះ។"
                },
                {
                  "en": "We are ready to pass the Month 1 Final Examination.",
                  "kh": "ពួកយើងរួចរាល់ក្នុងការប្រឡងជាប់ការប្រឡងបញ្ចប់ខែទី ១ ហើយ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "How do you feel after completing 23 days of Elementary English?",
                  "kh": "តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរក្រោយបញ្ចប់ ២៣ ថ្ងៃនៃថ្នាក់បឋមសិក្សា?"
                },
                {
                  "speaker": "Student",
                  "en": "Teacher Piseth, I feel so much more confident! I know how to introduce myself, tell the time, and talk about my daily life.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋ ខ្ញុំមានទំនុកចិត្តជាងមុនច្រើនណាស់! ខ្ញុំចេះណែនាំខ្លួន ប្រាប់ម៉ោង និងនិយាយពីជីវិតប្រចាំថ្ងៃបានហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "I am so proud of your dedication! Tomorrow is our Month 1 Final Exam. You will do great!",
                  "kh": "អ្នកគ្រូមានមោទនភាពចំពោះការខិតខំរបស់កូនណាស់! ថ្ងៃស្អែកជាការប្រឡងបញ្ចប់ខែទី ១ ហើយ។ កូននឹងធ្វើបានល្អ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 23\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត (Month 1 Grand Review: Grammar, Vocabulary & Practice)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nសង្ខេបចំណុចសំខាន់ៗទាំង ២២ ថ្ងៃនៃខែទី ១៖\n១. Subject Pronouns: I, You, We, They, He, She, It\n២. Verb To Be: Am, Is, Are (Affirmative, Negative, Question)\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Demonstratives: This, That, These, Those\n៥. Plural Nouns: -s, -es, -ies\n៦. Numbers 1-100 & Counting\n៧. Family Members & Verb To Have (Have/Has)\n៨. Feelings & Emotions (Happy, Sad, Tired, Hungry)\n៩. Daily Routines & Telling Time (Present Simple)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 review (/rɪˈvjuː/) = 🇰🇭 រំលឹកឡើងវិញ\n   ↳ ឧទាហរណ៍៖ Let us review Month 1 lessons.\n   ↳ បកប្រែ៖ (តោះយើងរំលឹកមេរៀនខែទី ១ ឡើងវិញ។)\n\n2. 🇬🇧 master (/ˈmɑːstər/) = 🇰🇭 ចេះស្ទាត់ជំនាញ\n   ↳ ឧទាហរណ៍៖ You master basic English grammar.\n   ↳ បកប្រែ៖ (កូនចេះស្ទាត់វេយ្យាករណ៍អង់គ្លេសគ្រឹះហើយ។)\n\n3. 🇬🇧 confident (/ˈkɒnfɪdənt/) = 🇰🇭 មានទំនុកចិត្ត\n   ↳ ឧទាហរណ៍៖ I feel confident about the exam.\n   ↳ បកប្រែ៖ (ខ្ញុំមានទំនុកចិត្តចំពោះការប្រឡង។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I understand all Month 1 grammar lessons clearly.\n   🇰🇭 (ខ្ញុំយល់ច្បាស់នូវរាល់មេរៀនវេយ្យាករណ៍ខែទី ១។)\n2. 🇬🇧 Practice makes perfect in English learning.\n   🇰🇭 (ការអនុវត្តជួយឱ្យការរៀនភាសាអង់គ្លេសកាន់តែល្អឥតខ្ចោះ។)\n3. 🇬🇧 We are ready to pass the Month 1 Final Examination.\n   🇰🇭 (ពួកយើងរួចរាល់ក្នុងការប្រឡងជាប់ការប្រឡងបញ្ចប់ខែទី ១ ហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How do you feel after completing 23 days of Elementary English?\"\n   🇰🇭 (តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរក្រោយបញ្ចប់ ២៣ ថ្ងៃនៃថ្នាក់បឋមសិក្សា?)\n\n👤 Student:\n   🇬🇧 \"Teacher Piseth, I feel so much more confident! I know how to introduce myself, tell the time, and talk about my daily life.\"\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋ ខ្ញុំមានទំនុកចិត្តជាងមុនច្រើនណាស់! ខ្ញុំចេះណែនាំខ្លួន ប្រាប់ម៉ោង និងនិយាយពីជីវិតប្រចាំថ្ងៃបានហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"I am so proud of your dedication! Tomorrow is our Month 1 Final Exam. You will do great!\"\n   🇰🇭 (អ្នកគ្រូមានមោទនភាពចំពោះការខិតខំរបស់កូនណាស់! ថ្ងៃស្អែកជាការប្រឡងបញ្ចប់ខែទី ១ ហើយ។ កូននឹងធ្វើបានល្អ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el24",
              "day": 24,
              "title": "ថ្ងៃទី 24៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam) (Month 1 Progress Assessment (ការប្រឡងប្រចាំខែទី ១ - Month 1 Final Exam))",
              "topic": "ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam)",
              "grammar": "គោលបំណងនៃការប្រឡងប្រចាំខែទី ១៖\n• វាស់ស្ទង់សមត្ថភាពវេយ្យាករណ៍គ្រឹះ (Pronouns, Verb To Be, To Have, Plural Nouns)\n• វាក្យសព្ទប្រចាំថ្ងៃ (សាលារៀន គ្រួសារ ពេលវេលា អារម្មណ៍)\n• ការយល់ដឹងអំពីល្បះ និងការសន្ទនា\n• សិស្សដែលប្រឡងជាប់ចាប់ពីនិទ្ទេស C (70%) ឡើងទៅ នឹងទទួលបាន វិញ្ញាបនបត្រជោគជ័យខែទី ១ (Month 1 Certificate)!",
              "vocab": [
                {
                  "en": "assessment",
                  "kh": "ការវាយតម្លៃ",
                  "ipa": "/əˈsesmənt/",
                  "exEn": "This assessment shows your progress.",
                  "exKh": "ការវាយតម្លៃនេះបង្ហាញពីការរីកចម្រើនរបស់អ្នក។"
                },
                {
                  "en": "exam",
                  "kh": "ការប្រឡង",
                  "ipa": "/ɪɡˈzæm/",
                  "exEn": "I study hard for the exam.",
                  "exKh": "ខ្ញុំខំរៀនសម្រាប់ការប្រឡង។"
                },
                {
                  "en": "success",
                  "kh": "ភាពជោគជ័យ",
                  "ipa": "/səkˈses/",
                  "exEn": "I wish you big success!",
                  "exKh": "ជូនពរឱ្យកូនទទួលបានជោគជ័យដ៏ធំធេង!"
                },
                {
                  "en": "certificate",
                  "kh": "វិញ្ញាបនបត្រ",
                  "ipa": "/səˈtɪfɪkət/",
                  "exEn": "Earn your official certificate.",
                  "exKh": "ទទួលបានវិញ្ញាបនបត្រផ្លូវការរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "I do my best on the Month 1 Final Exam.",
                  "kh": "ខ្ញុំខិតខំឱ្យអស់ពីសមត្ថភាពលើការប្រឡងបញ្ចប់ខែទី ១។"
                },
                {
                  "en": "Congratulations on completing Month 1 of Elementary English!",
                  "kh": "អបអរសាទរចំពោះការបញ្ចប់ខែទី ១ នៃថ្នាក់បឋមសិក្សា!"
                },
                {
                  "en": "Hard work brings outstanding results.",
                  "kh": "ការខិតខំប្រឹងប្រែងនាំមកនូវលទ្ធផលដ៏លេចធ្លោ។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Take a deep breath and start your Month 1 exam with confidence!",
                  "kh": "ដកដង្ហើមវែងៗ ហើយចាប់ផ្តើមការប្រឡងខែទី ១ ដោយភាពជឿជាក់ណា!"
                },
                {
                  "speaker": "Student",
                  "en": "Thank you, Teacher Piseth! I will read every question carefully and get Grade A!",
                  "kh": "អរគុណអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំនឹងអានសំណួរនីមួយៗឱ្យច្បាស់ និងយកនិទ្ទេស A ជូនអ្នកគ្រូ!"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "You have my full support and blessings! Go for it, superstar!",
                  "kh": "អ្នកគ្រូគាំទ្រ និងជូនពរកូនជានិច្ច! ធ្វើឱ្យបានល្អណា កូនសិស្សឆ្នើម!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 24\n🎯 ប្រធានបទ៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam) (Month 1 Progress Assessment (ការប្រឡងប្រចាំខែទី ១ - Month 1 Final Exam))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nគោលបំណងនៃការប្រឡងប្រចាំខែទី ១៖\n• វាស់ស្ទង់សមត្ថភាពវេយ្យាករណ៍គ្រឹះ (Pronouns, Verb To Be, To Have, Plural Nouns)\n• វាក្យសព្ទប្រចាំថ្ងៃ (សាលារៀន គ្រួសារ ពេលវេលា អារម្មណ៍)\n• ការយល់ដឹងអំពីល្បះ និងការសន្ទនា\n• សិស្សដែលប្រឡងជាប់ចាប់ពីនិទ្ទេស C (70%) ឡើងទៅ នឹងទទួលបាន វិញ្ញាបនបត្រជោគជ័យខែទី ១ (Month 1 Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 assessment (/əˈsesmənt/) = 🇰🇭 ការវាយតម្លៃ\n   ↳ ឧទាហរណ៍៖ This assessment shows your progress.\n   ↳ បកប្រែ៖ (ការវាយតម្លៃនេះបង្ហាញពីការរីកចម្រើនរបស់អ្នក។)\n\n2. 🇬🇧 exam (/ɪɡˈzæm/) = 🇰🇭 ការប្រឡង\n   ↳ ឧទាហរណ៍៖ I study hard for the exam.\n   ↳ បកប្រែ៖ (ខ្ញុំខំរៀនសម្រាប់ការប្រឡង។)\n\n3. 🇬🇧 success (/səkˈses/) = 🇰🇭 ភាពជោគជ័យ\n   ↳ ឧទាហរណ៍៖ I wish you big success!\n   ↳ បកប្រែ៖ (ជូនពរឱ្យកូនទទួលបានជោគជ័យដ៏ធំធេង!)\n\n4. 🇬🇧 certificate (/səˈtɪfɪkət/) = 🇰🇭 វិញ្ញាបនបត្រ\n   ↳ ឧទាហរណ៍៖ Earn your official certificate.\n   ↳ បកប្រែ៖ (ទទួលបានវិញ្ញាបនបត្រផ្លូវការរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I do my best on the Month 1 Final Exam.\n   🇰🇭 (ខ្ញុំខិតខំឱ្យអស់ពីសមត្ថភាពលើការប្រឡងបញ្ចប់ខែទី ១។)\n2. 🇬🇧 Congratulations on completing Month 1 of Elementary English!\n   🇰🇭 (អបអរសាទរចំពោះការបញ្ចប់ខែទី ១ នៃថ្នាក់បឋមសិក្សា!)\n3. 🇬🇧 Hard work brings outstanding results.\n   🇰🇭 (ការខិតខំប្រឹងប្រែងនាំមកនូវលទ្ធផលដ៏លេចធ្លោ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Take a deep breath and start your Month 1 exam with confidence!\"\n   🇰🇭 (ដកដង្ហើមវែងៗ ហើយចាប់ផ្តើមការប្រឡងខែទី ១ ដោយភាពជឿជាក់ណា!)\n\n👤 Student:\n   🇬🇧 \"Thank you, Teacher Piseth! I will read every question carefully and get Grade A!\"\n   🇰🇭 (អរគុណអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំនឹងអានសំណួរនីមួយៗឱ្យច្បាស់ និងយកនិទ្ទេស A ជូនអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"You have my full support and blessings! Go for it, superstar!\"\n   🇰🇭 (អ្នកគ្រូគាំទ្រ និងជូនពរកូនជានិច្ច! ធ្វើឱ្យបានល្អណា កូនសិស្សឆ្នើម!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        }
      ]
    },
    {
      "id": "em2",
      "monthNum": 2,
      "title": "ខែទី 2៖ ជីវិតរស់នៅ ផ្ទះសម្បែង ម្ហូបអាហារ និងការទិញទំនិញ",
      "examId": "elem_exam_m2",
      "examTitle": "ការប្រឡងប្រចាំខែទី 2 (Month 2 Final Exam)",
      "weeks": [
        {
          "id": "ew5",
          "weekNum": 5,
          "monthWeekNum": 1,
          "title": "សប្តាហ៍ទី 1 (ថ្ងៃទី 25 - 30)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 1 ខែទី 2",
          "lessons": [
            {
              "id": "el25",
              "day": 25,
              "title": "ថ្ងៃទី 25៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House (Rooms in the House (Living room, Bedroom, Kitchen, Bathroom))",
              "topic": "បន្ទប់នានាក្នុងផ្ទះ Rooms in the House",
              "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
              "vocab": [
                {
                  "en": "living room",
                  "kh": "បន្ទប់ទទួលភ្ញៀវ",
                  "ipa": "/ˈlɪvɪŋ ruːm/",
                  "exEn": "Our living room is bright.",
                  "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
                },
                {
                  "en": "bedroom",
                  "kh": "បន្ទប់គេង",
                  "ipa": "/ˈbedruːm/",
                  "exEn": "I sleep in my bedroom.",
                  "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
                },
                {
                  "en": "kitchen",
                  "kh": "ផ្ទះបាយ",
                  "ipa": "/ˈkɪtʃɪn/",
                  "exEn": "Mother cooks in the kitchen.",
                  "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
                },
                {
                  "en": "sofa",
                  "kh": "សាឡុង",
                  "ipa": "/ˈsəʊfə/",
                  "exEn": "Sit on the comfortable sofa.",
                  "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
                },
                {
                  "en": "fridge",
                  "kh": "ទូទឹកកក",
                  "ipa": "/frɪdʒ/",
                  "exEn": "Milk is in the fridge.",
                  "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 25: Rooms in the House (Living room, Bedroom, Kitchen, Bathroom) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 25៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 25! Are you ready to master Rooms in the House (Living room, Bedroom, Kitchen, Bathroom)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 25! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 25\n🎯 ប្រធានបទ៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House (Rooms in the House (Living room, Bedroom, Kitchen, Bathroom))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 25: Rooms in the House (Living room, Bedroom, Kitchen, Bathroom) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 25៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 25! Are you ready to master Rooms in the House (Living room, Bedroom, Kitchen, Bathroom)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 25! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el26",
              "day": 26,
              "title": "ថ្ងៃទី 26៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items (Furniture & Household Items (Sofa, Bed, Table, Fridge, TV))",
              "topic": "គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items",
              "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
              "vocab": [
                {
                  "en": "living room",
                  "kh": "បន្ទប់ទទួលភ្ញៀវ",
                  "ipa": "/ˈlɪvɪŋ ruːm/",
                  "exEn": "Our living room is bright.",
                  "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
                },
                {
                  "en": "bedroom",
                  "kh": "បន្ទប់គេង",
                  "ipa": "/ˈbedruːm/",
                  "exEn": "I sleep in my bedroom.",
                  "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
                },
                {
                  "en": "kitchen",
                  "kh": "ផ្ទះបាយ",
                  "ipa": "/ˈkɪtʃɪn/",
                  "exEn": "Mother cooks in the kitchen.",
                  "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
                },
                {
                  "en": "sofa",
                  "kh": "សាឡុង",
                  "ipa": "/ˈsəʊfə/",
                  "exEn": "Sit on the comfortable sofa.",
                  "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
                },
                {
                  "en": "fridge",
                  "kh": "ទូទឹកកក",
                  "ipa": "/frɪdʒ/",
                  "exEn": "Milk is in the fridge.",
                  "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 26: Furniture & Household Items (Sofa, Bed, Table, Fridge, TV) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 26៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 26! Are you ready to master Furniture & Household Items (Sofa, Bed, Table, Fridge, TV)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 26! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 26\n🎯 ប្រធានបទ៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items (Furniture & Household Items (Sofa, Bed, Table, Fridge, TV))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 26: Furniture & Household Items (Sofa, Bed, Table, Fridge, TV) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 26៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 26! Are you ready to master Furniture & Household Items (Sofa, Bed, Table, Fridge, TV)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 26! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el27",
              "day": 27,
              "title": "ថ្ងៃទី 27៖ កិរិយាសព្ទ There is និង There are (មាន...) (There is & There are (Affirmative, Negative, Questions))",
              "topic": "កិរិយាសព្ទ There is និង There are (មាន...)",
              "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
              "vocab": [
                {
                  "en": "living room",
                  "kh": "បន្ទប់ទទួលភ្ញៀវ",
                  "ipa": "/ˈlɪvɪŋ ruːm/",
                  "exEn": "Our living room is bright.",
                  "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
                },
                {
                  "en": "bedroom",
                  "kh": "បន្ទប់គេង",
                  "ipa": "/ˈbedruːm/",
                  "exEn": "I sleep in my bedroom.",
                  "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
                },
                {
                  "en": "kitchen",
                  "kh": "ផ្ទះបាយ",
                  "ipa": "/ˈkɪtʃɪn/",
                  "exEn": "Mother cooks in the kitchen.",
                  "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
                },
                {
                  "en": "sofa",
                  "kh": "សាឡុង",
                  "ipa": "/ˈsəʊfə/",
                  "exEn": "Sit on the comfortable sofa.",
                  "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
                },
                {
                  "en": "fridge",
                  "kh": "ទូទឹកកក",
                  "ipa": "/frɪdʒ/",
                  "exEn": "Milk is in the fridge.",
                  "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 27: There is & There are (Affirmative, Negative, Questions) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 27៖ កិរិយាសព្ទ There is និង There are (មាន...) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 27! Are you ready to master There is & There are (Affirmative, Negative, Questions)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 27! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទ There is និង There are (មាន...) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 27\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ There is និង There are (មាន...) (There is & There are (Affirmative, Negative, Questions))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 27: There is & There are (Affirmative, Negative, Questions) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 27៖ កិរិយាសព្ទ There is និង There are (មាន...) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 27! Are you ready to master There is & There are (Affirmative, Negative, Questions)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 27! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទ There is និង There are (មាន...) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el28",
              "day": 28,
              "title": "ថ្ងៃទី 28៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) (Prepositions of Place in the House (In front of, Behind, Between))",
              "topic": "ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite)",
              "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
              "vocab": [
                {
                  "en": "living room",
                  "kh": "បន្ទប់ទទួលភ្ញៀវ",
                  "ipa": "/ˈlɪvɪŋ ruːm/",
                  "exEn": "Our living room is bright.",
                  "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
                },
                {
                  "en": "bedroom",
                  "kh": "បន្ទប់គេង",
                  "ipa": "/ˈbedruːm/",
                  "exEn": "I sleep in my bedroom.",
                  "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
                },
                {
                  "en": "kitchen",
                  "kh": "ផ្ទះបាយ",
                  "ipa": "/ˈkɪtʃɪn/",
                  "exEn": "Mother cooks in the kitchen.",
                  "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
                },
                {
                  "en": "sofa",
                  "kh": "សាឡុង",
                  "ipa": "/ˈsəʊfə/",
                  "exEn": "Sit on the comfortable sofa.",
                  "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
                },
                {
                  "en": "fridge",
                  "kh": "ទូទឹកកក",
                  "ipa": "/frɪdʒ/",
                  "exEn": "Milk is in the fridge.",
                  "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 28: Prepositions of Place in the House (In front of, Behind, Between) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 28៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 28! Are you ready to master Prepositions of Place in the House (In front of, Behind, Between)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 28! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 28\n🎯 ប្រធានបទ៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) (Prepositions of Place in the House (In front of, Behind, Between))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 28: Prepositions of Place in the House (In front of, Behind, Between) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 28៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 28! Are you ready to master Prepositions of Place in the House (In front of, Behind, Between)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 28! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el29",
              "day": 29,
              "title": "ថ្ងៃទី 29៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores (Daily House Chores (Clean room, Wash dishes, Cook dinner))",
              "topic": "កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores",
              "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
              "vocab": [
                {
                  "en": "living room",
                  "kh": "បន្ទប់ទទួលភ្ញៀវ",
                  "ipa": "/ˈlɪvɪŋ ruːm/",
                  "exEn": "Our living room is bright.",
                  "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
                },
                {
                  "en": "bedroom",
                  "kh": "បន្ទប់គេង",
                  "ipa": "/ˈbedruːm/",
                  "exEn": "I sleep in my bedroom.",
                  "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
                },
                {
                  "en": "kitchen",
                  "kh": "ផ្ទះបាយ",
                  "ipa": "/ˈkɪtʃɪn/",
                  "exEn": "Mother cooks in the kitchen.",
                  "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
                },
                {
                  "en": "sofa",
                  "kh": "សាឡុង",
                  "ipa": "/ˈsəʊfə/",
                  "exEn": "Sit on the comfortable sofa.",
                  "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
                },
                {
                  "en": "fridge",
                  "kh": "ទូទឹកកក",
                  "ipa": "/frɪdʒ/",
                  "exEn": "Milk is in the fridge.",
                  "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 29: Daily House Chores (Clean room, Wash dishes, Cook dinner) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 29៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 29! Are you ready to master Daily House Chores (Clean room, Wash dishes, Cook dinner)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 29! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 29\n🎯 ប្រធានបទ៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores (Daily House Chores (Clean room, Wash dishes, Cook dinner))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 29: Daily House Chores (Clean room, Wash dishes, Cook dinner) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 29៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 29! Are you ready to master Daily House Chores (Clean room, Wash dishes, Cook dinner)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 29! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el30",
              "day": 30,
              "title": "ថ្ងៃទី 30៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ (Weekly Review & Dialogue: Welcome to My Home)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ",
              "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
              "vocab": [
                {
                  "en": "living room",
                  "kh": "បន្ទប់ទទួលភ្ញៀវ",
                  "ipa": "/ˈlɪvɪŋ ruːm/",
                  "exEn": "Our living room is bright.",
                  "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
                },
                {
                  "en": "bedroom",
                  "kh": "បន្ទប់គេង",
                  "ipa": "/ˈbedruːm/",
                  "exEn": "I sleep in my bedroom.",
                  "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
                },
                {
                  "en": "kitchen",
                  "kh": "ផ្ទះបាយ",
                  "ipa": "/ˈkɪtʃɪn/",
                  "exEn": "Mother cooks in the kitchen.",
                  "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
                },
                {
                  "en": "sofa",
                  "kh": "សាឡុង",
                  "ipa": "/ˈsəʊfə/",
                  "exEn": "Sit on the comfortable sofa.",
                  "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
                },
                {
                  "en": "fridge",
                  "kh": "ទូទឹកកក",
                  "ipa": "/frɪdʒ/",
                  "exEn": "Milk is in the fridge.",
                  "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 30: Weekly Review & Dialogue: Welcome to My Home today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 30៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 30! Are you ready to master Weekly Review & Dialogue: Welcome to My Home?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 30! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 30\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ (Weekly Review & Dialogue: Welcome to My Home)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 30: Weekly Review & Dialogue: Welcome to My Home today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 30៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 30! Are you ready to master Weekly Review & Dialogue: Welcome to My Home?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 30! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew6",
          "weekNum": 6,
          "monthWeekNum": 2,
          "title": "សប្តាហ៍ទី 2 (ថ្ងៃទី 31 - 36)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 2 ខែទី 2",
          "lessons": [
            {
              "id": "el31",
              "day": 31,
              "title": "ថ្ងៃទី 31៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) (Modal Verb Can for Ability (I can swim, She can speak English))",
              "topic": "កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...)",
              "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
              "vocab": [
                {
                  "en": "can",
                  "kh": "អាច (សមត្ថភាព)",
                  "ipa": "/kæn/",
                  "exEn": "I can speak English.",
                  "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
                },
                {
                  "en": "swim",
                  "kh": "ហែលទឹក",
                  "ipa": "/swɪm/",
                  "exEn": "He can swim very fast.",
                  "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
                },
                {
                  "en": "sing",
                  "kh": "ច្រៀង",
                  "ipa": "/sɪŋ/",
                  "exEn": "She can sing beautifully.",
                  "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
                },
                {
                  "en": "dance",
                  "kh": "រាំ",
                  "ipa": "/dɑːns/",
                  "exEn": "They can dance Khmer traditional dance.",
                  "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
                },
                {
                  "en": "draw",
                  "kh": "គូររូប",
                  "ipa": "/drɔː/",
                  "exEn": "I can draw cute animals.",
                  "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 31: Modal Verb Can for Ability (I can swim, She can speak English) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 31៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 31! Are you ready to master Modal Verb Can for Ability (I can swim, She can speak English)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 31! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 31\n🎯 ប្រធានបទ៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) (Modal Verb Can for Ability (I can swim, She can speak English))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 31: Modal Verb Can for Ability (I can swim, She can speak English) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 31៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 31! Are you ready to master Modal Verb Can for Ability (I can swim, She can speak English)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 31! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el32",
              "day": 32,
              "title": "ថ្ងៃទី 32៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? (Negative Cannot / Can't & Questions (Can you play guitar?))",
              "topic": "ទម្រង់បដិសេធ Can't និងសំណួរ Can you...?",
              "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
              "vocab": [
                {
                  "en": "can",
                  "kh": "អាច (សមត្ថភាព)",
                  "ipa": "/kæn/",
                  "exEn": "I can speak English.",
                  "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
                },
                {
                  "en": "swim",
                  "kh": "ហែលទឹក",
                  "ipa": "/swɪm/",
                  "exEn": "He can swim very fast.",
                  "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
                },
                {
                  "en": "sing",
                  "kh": "ច្រៀង",
                  "ipa": "/sɪŋ/",
                  "exEn": "She can sing beautifully.",
                  "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
                },
                {
                  "en": "dance",
                  "kh": "រាំ",
                  "ipa": "/dɑːns/",
                  "exEn": "They can dance Khmer traditional dance.",
                  "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
                },
                {
                  "en": "draw",
                  "kh": "គូររូប",
                  "ipa": "/drɔː/",
                  "exEn": "I can draw cute animals.",
                  "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 32: Negative Cannot / Can't & Questions (Can you play guitar?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 32៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 32! Are you ready to master Negative Cannot / Can't & Questions (Can you play guitar?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 32! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 32\n🎯 ប្រធានបទ៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? (Negative Cannot / Can't & Questions (Can you play guitar?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 32: Negative Cannot / Can't & Questions (Can you play guitar?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 32៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 32! Are you ready to master Negative Cannot / Can't & Questions (Can you play guitar?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 32! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el33",
              "day": 33,
              "title": "ថ្ងៃទី 33៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents (Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike))",
              "topic": "កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents",
              "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
              "vocab": [
                {
                  "en": "can",
                  "kh": "អាច (សមត្ថភាព)",
                  "ipa": "/kæn/",
                  "exEn": "I can speak English.",
                  "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
                },
                {
                  "en": "swim",
                  "kh": "ហែលទឹក",
                  "ipa": "/swɪm/",
                  "exEn": "He can swim very fast.",
                  "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
                },
                {
                  "en": "sing",
                  "kh": "ច្រៀង",
                  "ipa": "/sɪŋ/",
                  "exEn": "She can sing beautifully.",
                  "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
                },
                {
                  "en": "dance",
                  "kh": "រាំ",
                  "ipa": "/dɑːns/",
                  "exEn": "They can dance Khmer traditional dance.",
                  "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
                },
                {
                  "en": "draw",
                  "kh": "គូររូប",
                  "ipa": "/drɔː/",
                  "exEn": "I can draw cute animals.",
                  "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 33: Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 33៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 33! Are you ready to master Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 33! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 33\n🎯 ប្រធានបទ៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents (Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 33: Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 33៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 33! Are you ready to master Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 33! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el34",
              "day": 34,
              "title": "ថ្ងៃទី 34៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May (Asking for Permission with Can & May (Can I come in? May I drink?))",
              "topic": "ការសុំការអនុញ្ញាតដោយប្រើ Can & May",
              "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
              "vocab": [
                {
                  "en": "can",
                  "kh": "អាច (សមត្ថភាព)",
                  "ipa": "/kæn/",
                  "exEn": "I can speak English.",
                  "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
                },
                {
                  "en": "swim",
                  "kh": "ហែលទឹក",
                  "ipa": "/swɪm/",
                  "exEn": "He can swim very fast.",
                  "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
                },
                {
                  "en": "sing",
                  "kh": "ច្រៀង",
                  "ipa": "/sɪŋ/",
                  "exEn": "She can sing beautifully.",
                  "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
                },
                {
                  "en": "dance",
                  "kh": "រាំ",
                  "ipa": "/dɑːns/",
                  "exEn": "They can dance Khmer traditional dance.",
                  "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
                },
                {
                  "en": "draw",
                  "kh": "គូររូប",
                  "ipa": "/drɔː/",
                  "exEn": "I can draw cute animals.",
                  "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 34: Asking for Permission with Can & May (Can I come in? May I drink?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 34៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 34! Are you ready to master Asking for Permission with Can & May (Can I come in? May I drink?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 34! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 34\n🎯 ប្រធានបទ៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May (Asking for Permission with Can & May (Can I come in? May I drink?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 34: Asking for Permission with Can & May (Can I come in? May I drink?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 34៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 34! Are you ready to master Asking for Permission with Can & May (Can I come in? May I drink?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 34! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el35",
              "day": 35,
              "title": "ថ្ងៃទី 35៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests (Polite Requests & Offers (Could you please... / Would you like...?))",
              "topic": "ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests",
              "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
              "vocab": [
                {
                  "en": "can",
                  "kh": "អាច (សមត្ថភាព)",
                  "ipa": "/kæn/",
                  "exEn": "I can speak English.",
                  "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
                },
                {
                  "en": "swim",
                  "kh": "ហែលទឹក",
                  "ipa": "/swɪm/",
                  "exEn": "He can swim very fast.",
                  "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
                },
                {
                  "en": "sing",
                  "kh": "ច្រៀង",
                  "ipa": "/sɪŋ/",
                  "exEn": "She can sing beautifully.",
                  "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
                },
                {
                  "en": "dance",
                  "kh": "រាំ",
                  "ipa": "/dɑːns/",
                  "exEn": "They can dance Khmer traditional dance.",
                  "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
                },
                {
                  "en": "draw",
                  "kh": "គូររូប",
                  "ipa": "/drɔː/",
                  "exEn": "I can draw cute animals.",
                  "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 35: Polite Requests & Offers (Could you please... / Would you like...?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 35៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 35! Are you ready to master Polite Requests & Offers (Could you please... / Would you like...?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 35! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 35\n🎯 ប្រធានបទ៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests (Polite Requests & Offers (Could you please... / Would you like...?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 35: Polite Requests & Offers (Could you please... / Would you like...?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 35៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 35! Are you ready to master Polite Requests & Offers (Could you please... / Would you like...?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 35! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el36",
              "day": 36,
              "title": "ថ្ងៃទី 36៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ (Weekly Review & Dialogue: Talents & Skills Interview)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ",
              "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
              "vocab": [
                {
                  "en": "can",
                  "kh": "អាច (សមត្ថភាព)",
                  "ipa": "/kæn/",
                  "exEn": "I can speak English.",
                  "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
                },
                {
                  "en": "swim",
                  "kh": "ហែលទឹក",
                  "ipa": "/swɪm/",
                  "exEn": "He can swim very fast.",
                  "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
                },
                {
                  "en": "sing",
                  "kh": "ច្រៀង",
                  "ipa": "/sɪŋ/",
                  "exEn": "She can sing beautifully.",
                  "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
                },
                {
                  "en": "dance",
                  "kh": "រាំ",
                  "ipa": "/dɑːns/",
                  "exEn": "They can dance Khmer traditional dance.",
                  "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
                },
                {
                  "en": "draw",
                  "kh": "គូររូប",
                  "ipa": "/drɔː/",
                  "exEn": "I can draw cute animals.",
                  "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 36: Weekly Review & Dialogue: Talents & Skills Interview today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 36៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 36! Are you ready to master Weekly Review & Dialogue: Talents & Skills Interview?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 36! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 36\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ (Weekly Review & Dialogue: Talents & Skills Interview)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 36: Weekly Review & Dialogue: Talents & Skills Interview today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 36៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 36! Are you ready to master Weekly Review & Dialogue: Talents & Skills Interview?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 36! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew7",
          "weekNum": 7,
          "monthWeekNum": 3,
          "title": "សប្តាហ៍ទី 3 (ថ្ងៃទី 37 - 42)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 3 ខែទី 2",
          "lessons": [
            {
              "id": "el37",
              "day": 37,
              "title": "ថ្ងៃទី 37៖ អាហារ និងពេលអាហារ Food & Meals (Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish))",
              "topic": "អាហារ និងពេលអាហារ Food & Meals",
              "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
              "vocab": [
                {
                  "en": "rice",
                  "kh": "បាយ / អង្ករ",
                  "ipa": "/raɪs/",
                  "exEn": "Cambodians eat rice every day.",
                  "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
                },
                {
                  "en": "bread",
                  "kh": "នំបុ័ង",
                  "ipa": "/bred/",
                  "exEn": "I eat fresh bread for breakfast.",
                  "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
                },
                {
                  "en": "soup",
                  "kh": "សម្ល / ស៊ុប",
                  "ipa": "/suːp/",
                  "exEn": "Hot soup warms your body.",
                  "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
                },
                {
                  "en": "orange",
                  "kh": "ផ្លែក្រូច",
                  "ipa": "/ˈɒrɪndʒ/",
                  "exEn": "Orange contains vitamin C.",
                  "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
                },
                {
                  "en": "water",
                  "kh": "ទឹកស្អាត",
                  "ipa": "/ˈwɔːtər/",
                  "exEn": "Drink pure water regularly.",
                  "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 37: Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 37៖ អាហារ និងពេលអាហារ Food & Meals ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 37! Are you ready to master Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 37! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អាហារ និងពេលអាហារ Food & Meals ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 37\n🎯 ប្រធានបទ៖ អាហារ និងពេលអាហារ Food & Meals (Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 37: Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 37៖ អាហារ និងពេលអាហារ Food & Meals ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 37! Are you ready to master Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 37! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អាហារ និងពេលអាហារ Food & Meals ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el38",
              "day": 38,
              "title": "ថ្ងៃទី 38៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables (Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot))",
              "topic": "បន្លែ និងផ្លែឈើ Fruits & Vegetables",
              "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
              "vocab": [
                {
                  "en": "rice",
                  "kh": "បាយ / អង្ករ",
                  "ipa": "/raɪs/",
                  "exEn": "Cambodians eat rice every day.",
                  "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
                },
                {
                  "en": "bread",
                  "kh": "នំបុ័ង",
                  "ipa": "/bred/",
                  "exEn": "I eat fresh bread for breakfast.",
                  "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
                },
                {
                  "en": "soup",
                  "kh": "សម្ល / ស៊ុប",
                  "ipa": "/suːp/",
                  "exEn": "Hot soup warms your body.",
                  "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
                },
                {
                  "en": "orange",
                  "kh": "ផ្លែក្រូច",
                  "ipa": "/ˈɒrɪndʒ/",
                  "exEn": "Orange contains vitamin C.",
                  "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
                },
                {
                  "en": "water",
                  "kh": "ទឹកស្អាត",
                  "ipa": "/ˈwɔːtər/",
                  "exEn": "Drink pure water regularly.",
                  "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 38: Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 38៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 38! Are you ready to master Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 38! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្លែ និងផ្លែឈើ Fruits & Vegetables ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 38\n🎯 ប្រធានបទ៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables (Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 38: Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 38៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 38! Are you ready to master Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 38! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្លែ និងផ្លែឈើ Fruits & Vegetables ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el39",
              "day": 39,
              "title": "ថ្ងៃទី 39៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts (Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake))",
              "topic": "ភេសជ្ជៈ និងបង្អែម Drinks & Desserts",
              "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
              "vocab": [
                {
                  "en": "rice",
                  "kh": "បាយ / អង្ករ",
                  "ipa": "/raɪs/",
                  "exEn": "Cambodians eat rice every day.",
                  "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
                },
                {
                  "en": "bread",
                  "kh": "នំបុ័ង",
                  "ipa": "/bred/",
                  "exEn": "I eat fresh bread for breakfast.",
                  "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
                },
                {
                  "en": "soup",
                  "kh": "សម្ល / ស៊ុប",
                  "ipa": "/suːp/",
                  "exEn": "Hot soup warms your body.",
                  "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
                },
                {
                  "en": "orange",
                  "kh": "ផ្លែក្រូច",
                  "ipa": "/ˈɒrɪndʒ/",
                  "exEn": "Orange contains vitamin C.",
                  "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
                },
                {
                  "en": "water",
                  "kh": "ទឹកស្អាត",
                  "ipa": "/ˈwɔːtər/",
                  "exEn": "Drink pure water regularly.",
                  "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 39: Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 39៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 39! Are you ready to master Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 39! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 39\n🎯 ប្រធានបទ៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts (Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 39: Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 39៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 39! Are you ready to master Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 39! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el40",
              "day": 40,
              "title": "ថ្ងៃទី 40៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) (Countable vs Uncountable Nouns (A, An, Some, Any))",
              "topic": "នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An)",
              "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
              "vocab": [
                {
                  "en": "rice",
                  "kh": "បាយ / អង្ករ",
                  "ipa": "/raɪs/",
                  "exEn": "Cambodians eat rice every day.",
                  "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
                },
                {
                  "en": "bread",
                  "kh": "នំបុ័ង",
                  "ipa": "/bred/",
                  "exEn": "I eat fresh bread for breakfast.",
                  "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
                },
                {
                  "en": "soup",
                  "kh": "សម្ល / ស៊ុប",
                  "ipa": "/suːp/",
                  "exEn": "Hot soup warms your body.",
                  "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
                },
                {
                  "en": "orange",
                  "kh": "ផ្លែក្រូច",
                  "ipa": "/ˈɒrɪndʒ/",
                  "exEn": "Orange contains vitamin C.",
                  "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
                },
                {
                  "en": "water",
                  "kh": "ទឹកស្អាត",
                  "ipa": "/ˈwɔːtər/",
                  "exEn": "Drink pure water regularly.",
                  "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 40: Countable vs Uncountable Nouns (A, An, Some, Any) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 40៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 40! Are you ready to master Countable vs Uncountable Nouns (A, An, Some, Any)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 40! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 40\n🎯 ប្រធានបទ៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) (Countable vs Uncountable Nouns (A, An, Some, Any))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 40: Countable vs Uncountable Nouns (A, An, Some, Any) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 40៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 40! Are you ready to master Countable vs Uncountable Nouns (A, An, Some, Any)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 40! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el41",
              "day": 41,
              "title": "ថ្ងៃទី 41៖ ការសួរចំនួន How many និង How much (How Many vs How Much (How many eggs? How much water?))",
              "topic": "ការសួរចំនួន How many និង How much",
              "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
              "vocab": [
                {
                  "en": "rice",
                  "kh": "បាយ / អង្ករ",
                  "ipa": "/raɪs/",
                  "exEn": "Cambodians eat rice every day.",
                  "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
                },
                {
                  "en": "bread",
                  "kh": "នំបុ័ង",
                  "ipa": "/bred/",
                  "exEn": "I eat fresh bread for breakfast.",
                  "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
                },
                {
                  "en": "soup",
                  "kh": "សម្ល / ស៊ុប",
                  "ipa": "/suːp/",
                  "exEn": "Hot soup warms your body.",
                  "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
                },
                {
                  "en": "orange",
                  "kh": "ផ្លែក្រូច",
                  "ipa": "/ˈɒrɪndʒ/",
                  "exEn": "Orange contains vitamin C.",
                  "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
                },
                {
                  "en": "water",
                  "kh": "ទឹកស្អាត",
                  "ipa": "/ˈwɔːtər/",
                  "exEn": "Drink pure water regularly.",
                  "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 41: How Many vs How Much (How many eggs? How much water?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 41៖ ការសួរចំនួន How many និង How much ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 41! Are you ready to master How Many vs How Much (How many eggs? How much water?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 41! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរចំនួន How many និង How much ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 41\n🎯 ប្រធានបទ៖ ការសួរចំនួន How many និង How much (How Many vs How Much (How many eggs? How much water?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 41: How Many vs How Much (How many eggs? How much water?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 41៖ ការសួរចំនួន How many និង How much ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 41! Are you ready to master How Many vs How Much (How many eggs? How much water?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 41! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរចំនួន How many និង How much ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el42",
              "day": 42,
              "title": "ថ្ងៃទី 42៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន (Weekly Review & Dialogue: Ordering Food at a Restaurant)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន",
              "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
              "vocab": [
                {
                  "en": "rice",
                  "kh": "បាយ / អង្ករ",
                  "ipa": "/raɪs/",
                  "exEn": "Cambodians eat rice every day.",
                  "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
                },
                {
                  "en": "bread",
                  "kh": "នំបុ័ង",
                  "ipa": "/bred/",
                  "exEn": "I eat fresh bread for breakfast.",
                  "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
                },
                {
                  "en": "soup",
                  "kh": "សម្ល / ស៊ុប",
                  "ipa": "/suːp/",
                  "exEn": "Hot soup warms your body.",
                  "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
                },
                {
                  "en": "orange",
                  "kh": "ផ្លែក្រូច",
                  "ipa": "/ˈɒrɪndʒ/",
                  "exEn": "Orange contains vitamin C.",
                  "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
                },
                {
                  "en": "water",
                  "kh": "ទឹកស្អាត",
                  "ipa": "/ˈwɔːtər/",
                  "exEn": "Drink pure water regularly.",
                  "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 42: Weekly Review & Dialogue: Ordering Food at a Restaurant today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 42៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 42! Are you ready to master Weekly Review & Dialogue: Ordering Food at a Restaurant?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 42! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 42\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន (Weekly Review & Dialogue: Ordering Food at a Restaurant)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 42: Weekly Review & Dialogue: Ordering Food at a Restaurant today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 42៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 42! Are you ready to master Weekly Review & Dialogue: Ordering Food at a Restaurant?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 42! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew8",
          "weekNum": 8,
          "monthWeekNum": 4,
          "title": "សប្តាហ៍ទី 4 (ថ្ងៃទី 43 - 48)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 4 ខែទី 2",
          "lessons": [
            {
              "id": "el43",
              "day": 43,
              "title": "ថ្ងៃទី 43៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories (Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket))",
              "topic": "សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories",
              "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
              "vocab": [
                {
                  "en": "shirt",
                  "kh": "អាវ",
                  "ipa": "/ʃɜːt/",
                  "exEn": "This blue shirt fits you well.",
                  "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
                },
                {
                  "en": "shoes",
                  "kh": "ស្បែកជើង",
                  "ipa": "/ʃuːz/",
                  "exEn": "These leather shoes are durable.",
                  "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
                },
                {
                  "en": "price",
                  "kh": "តម្លៃ",
                  "ipa": "/praɪs/",
                  "exEn": "The price is very reasonable.",
                  "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
                },
                {
                  "en": "dollar",
                  "kh": "ប្រាក់ដុល្លារ",
                  "ipa": "/ˈdɒlər/",
                  "exEn": "It costs ten dollars.",
                  "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
                },
                {
                  "en": "receipt",
                  "kh": "វិក្កយបត្រ",
                  "ipa": "/rɪˈsiːt/",
                  "exEn": "Keep your purchase receipt.",
                  "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 43: Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 43៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 43! Are you ready to master Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 43! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 43\n🎯 ប្រធានបទ៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories (Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 43: Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 43៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 43! Are you ready to master Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 43! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el44",
              "day": 44,
              "title": "ថ្ងៃទី 44៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit (Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit))",
              "topic": "ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit",
              "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
              "vocab": [
                {
                  "en": "shirt",
                  "kh": "អាវ",
                  "ipa": "/ʃɜːt/",
                  "exEn": "This blue shirt fits you well.",
                  "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
                },
                {
                  "en": "shoes",
                  "kh": "ស្បែកជើង",
                  "ipa": "/ʃuːz/",
                  "exEn": "These leather shoes are durable.",
                  "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
                },
                {
                  "en": "price",
                  "kh": "តម្លៃ",
                  "ipa": "/praɪs/",
                  "exEn": "The price is very reasonable.",
                  "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
                },
                {
                  "en": "dollar",
                  "kh": "ប្រាក់ដុល្លារ",
                  "ipa": "/ˈdɒlər/",
                  "exEn": "It costs ten dollars.",
                  "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
                },
                {
                  "en": "receipt",
                  "kh": "វិក្កយបត្រ",
                  "ipa": "/rɪˈsiːt/",
                  "exEn": "Keep your purchase receipt.",
                  "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 44: Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 44៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 44! Are you ready to master Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 44! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 44\n🎯 ប្រធានបទ៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit (Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 44: Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 44៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 44! Are you ready to master Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 44! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el45",
              "day": 45,
              "title": "ថ្ងៃទី 45៖ ការសួរតម្លៃទំនិញ (How much is...?) (Asking for Prices (How much is this shirt? How much are these?))",
              "topic": "ការសួរតម្លៃទំនិញ (How much is...?)",
              "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
              "vocab": [
                {
                  "en": "shirt",
                  "kh": "អាវ",
                  "ipa": "/ʃɜːt/",
                  "exEn": "This blue shirt fits you well.",
                  "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
                },
                {
                  "en": "shoes",
                  "kh": "ស្បែកជើង",
                  "ipa": "/ʃuːz/",
                  "exEn": "These leather shoes are durable.",
                  "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
                },
                {
                  "en": "price",
                  "kh": "តម្លៃ",
                  "ipa": "/praɪs/",
                  "exEn": "The price is very reasonable.",
                  "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
                },
                {
                  "en": "dollar",
                  "kh": "ប្រាក់ដុល្លារ",
                  "ipa": "/ˈdɒlər/",
                  "exEn": "It costs ten dollars.",
                  "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
                },
                {
                  "en": "receipt",
                  "kh": "វិក្កយបត្រ",
                  "ipa": "/rɪˈsiːt/",
                  "exEn": "Keep your purchase receipt.",
                  "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 45: Asking for Prices (How much is this shirt? How much are these?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 45៖ ការសួរតម្លៃទំនិញ (How much is...?) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 45! Are you ready to master Asking for Prices (How much is this shirt? How much are these?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 45! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរតម្លៃទំនិញ (How much is...?) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 45\n🎯 ប្រធានបទ៖ ការសួរតម្លៃទំនិញ (How much is...?) (Asking for Prices (How much is this shirt? How much are these?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 45: Asking for Prices (How much is this shirt? How much are these?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 45៖ ការសួរតម្លៃទំនិញ (How much is...?) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 45! Are you ready to master Asking for Prices (How much is this shirt? How much are these?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 45! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរតម្លៃទំនិញ (How much is...?) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el46",
              "day": 46,
              "title": "ថ្ងៃទី 46៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change (Paying and Change (Cash, Credit card, Receipt, Change))",
              "topic": "ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change",
              "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
              "vocab": [
                {
                  "en": "shirt",
                  "kh": "អាវ",
                  "ipa": "/ʃɜːt/",
                  "exEn": "This blue shirt fits you well.",
                  "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
                },
                {
                  "en": "shoes",
                  "kh": "ស្បែកជើង",
                  "ipa": "/ʃuːz/",
                  "exEn": "These leather shoes are durable.",
                  "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
                },
                {
                  "en": "price",
                  "kh": "តម្លៃ",
                  "ipa": "/praɪs/",
                  "exEn": "The price is very reasonable.",
                  "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
                },
                {
                  "en": "dollar",
                  "kh": "ប្រាក់ដុល្លារ",
                  "ipa": "/ˈdɒlər/",
                  "exEn": "It costs ten dollars.",
                  "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
                },
                {
                  "en": "receipt",
                  "kh": "វិក្កយបត្រ",
                  "ipa": "/rɪˈsiːt/",
                  "exEn": "Keep your purchase receipt.",
                  "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 46: Paying and Change (Cash, Credit card, Receipt, Change) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 46៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 46! Are you ready to master Paying and Change (Cash, Credit card, Receipt, Change)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 46! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 46\n🎯 ប្រធានបទ៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change (Paying and Change (Cash, Credit card, Receipt, Change))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 46: Paying and Change (Cash, Credit card, Receipt, Change) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 46៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 46! Are you ready to master Paying and Change (Cash, Credit card, Receipt, Change)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 46! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el47",
              "day": 47,
              "title": "ថ្ងៃទី 47៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា (Month 2 Grand Review: Grammar, Vocabulary & Dialogue)",
              "topic": "រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា",
              "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
              "vocab": [
                {
                  "en": "shirt",
                  "kh": "អាវ",
                  "ipa": "/ʃɜːt/",
                  "exEn": "This blue shirt fits you well.",
                  "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
                },
                {
                  "en": "shoes",
                  "kh": "ស្បែកជើង",
                  "ipa": "/ʃuːz/",
                  "exEn": "These leather shoes are durable.",
                  "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
                },
                {
                  "en": "price",
                  "kh": "តម្លៃ",
                  "ipa": "/praɪs/",
                  "exEn": "The price is very reasonable.",
                  "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
                },
                {
                  "en": "dollar",
                  "kh": "ប្រាក់ដុល្លារ",
                  "ipa": "/ˈdɒlər/",
                  "exEn": "It costs ten dollars.",
                  "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
                },
                {
                  "en": "receipt",
                  "kh": "វិក្កយបត្រ",
                  "ipa": "/rɪˈsiːt/",
                  "exEn": "Keep your purchase receipt.",
                  "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 47: Month 2 Grand Review: Grammar, Vocabulary & Dialogue today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 47៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 47! Are you ready to master Month 2 Grand Review: Grammar, Vocabulary & Dialogue?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 47! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 47\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា (Month 2 Grand Review: Grammar, Vocabulary & Dialogue)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 47: Month 2 Grand Review: Grammar, Vocabulary & Dialogue today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 47៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 47! Are you ready to master Month 2 Grand Review: Grammar, Vocabulary & Dialogue?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 47! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el48",
              "day": 48,
              "title": "ថ្ងៃទី 48៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) (Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam))",
              "topic": "ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam)",
              "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
              "vocab": [
                {
                  "en": "shirt",
                  "kh": "អាវ",
                  "ipa": "/ʃɜːt/",
                  "exEn": "This blue shirt fits you well.",
                  "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
                },
                {
                  "en": "shoes",
                  "kh": "ស្បែកជើង",
                  "ipa": "/ʃuːz/",
                  "exEn": "These leather shoes are durable.",
                  "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
                },
                {
                  "en": "price",
                  "kh": "តម្លៃ",
                  "ipa": "/praɪs/",
                  "exEn": "The price is very reasonable.",
                  "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
                },
                {
                  "en": "dollar",
                  "kh": "ប្រាក់ដុល្លារ",
                  "ipa": "/ˈdɒlər/",
                  "exEn": "It costs ten dollars.",
                  "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
                },
                {
                  "en": "receipt",
                  "kh": "វិក្កយបត្រ",
                  "ipa": "/rɪˈsiːt/",
                  "exEn": "Keep your purchase receipt.",
                  "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 48: Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 48៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 48! Are you ready to master Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 48! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 48\n🎯 ប្រធានបទ៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) (Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 48: Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 48៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 48! Are you ready to master Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 48! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        }
      ]
    },
    {
      "id": "em3",
      "monthNum": 3,
      "title": "ខែទី 3៖ ការធ្វើដំណើរ អាកាសធាតុ សកម្មភាព និងបញ្ចប់ថ្នាក់បឋម",
      "examId": "elem_exam_m3",
      "examTitle": "ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Final Graduation Exam)",
      "weeks": [
        {
          "id": "ew9",
          "weekNum": 9,
          "monthWeekNum": 1,
          "title": "សប្តាហ៍ទី 1 (ថ្ងៃទី 49 - 54)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 1 ខែទី 3",
          "lessons": [
            {
              "id": "el49",
              "day": 49,
              "title": "ថ្ងៃទី 49៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town (Places in Town (Market, Supermarket, Bank, Hospital, School))",
              "topic": "ទីកន្លែងនានាក្នុងទីក្រុង Places in Town",
              "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
              "vocab": [
                {
                  "en": "market",
                  "kh": "ផ្សារ",
                  "ipa": "/ˈmɑːkɪt/",
                  "exEn": "The Central Market is famous.",
                  "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
                },
                {
                  "en": "hospital",
                  "kh": "មន្ទីរពេទ្យ",
                  "ipa": "/ˈhɒspɪtl/",
                  "exEn": "The hospital is near the river.",
                  "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
                },
                {
                  "en": "turn left",
                  "kh": "បត់ឆ្វេង",
                  "ipa": "/tɜːn left/",
                  "exEn": "Turn left at the corner.",
                  "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
                },
                {
                  "en": "turn right",
                  "kh": "បត់ស្តាំ",
                  "ipa": "/tɜːn raɪt/",
                  "exEn": "Turn right after the bridge.",
                  "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
                },
                {
                  "en": "go straight",
                  "kh": "ទៅត្រង់",
                  "ipa": "/ɡəʊ streɪt/",
                  "exEn": "Go straight for two hundred meters.",
                  "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 49: Places in Town (Market, Supermarket, Bank, Hospital, School) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 49៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 49! Are you ready to master Places in Town (Market, Supermarket, Bank, Hospital, School)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 49! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 49\n🎯 ប្រធានបទ៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town (Places in Town (Market, Supermarket, Bank, Hospital, School))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 49: Places in Town (Market, Supermarket, Bank, Hospital, School) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 49៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 49! Are you ready to master Places in Town (Market, Supermarket, Bank, Hospital, School)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 49! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el50",
              "day": 50,
              "title": "ថ្ងៃទី 50៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation (Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train))",
              "topic": "មធ្យោបាយធ្វើដំណើរ Means of Transportation",
              "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
              "vocab": [
                {
                  "en": "market",
                  "kh": "ផ្សារ",
                  "ipa": "/ˈmɑːkɪt/",
                  "exEn": "The Central Market is famous.",
                  "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
                },
                {
                  "en": "hospital",
                  "kh": "មន្ទីរពេទ្យ",
                  "ipa": "/ˈhɒspɪtl/",
                  "exEn": "The hospital is near the river.",
                  "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
                },
                {
                  "en": "turn left",
                  "kh": "បត់ឆ្វេង",
                  "ipa": "/tɜːn left/",
                  "exEn": "Turn left at the corner.",
                  "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
                },
                {
                  "en": "turn right",
                  "kh": "បត់ស្តាំ",
                  "ipa": "/tɜːn raɪt/",
                  "exEn": "Turn right after the bridge.",
                  "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
                },
                {
                  "en": "go straight",
                  "kh": "ទៅត្រង់",
                  "ipa": "/ɡəʊ streɪt/",
                  "exEn": "Go straight for two hundred meters.",
                  "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 50: Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 50៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 50! Are you ready to master Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 50! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ មធ្យោបាយធ្វើដំណើរ Means of Transportation ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 50\n🎯 ប្រធានបទ៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation (Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 50: Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 50៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 50! Are you ready to master Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 50! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ មធ្យោបាយធ្វើដំណើរ Means of Transportation ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el51",
              "day": 51,
              "title": "ថ្ងៃទី 51៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) (How Do You Go to Work/School? (By bus, on foot, by bike))",
              "topic": "ការសួរអំពីការធ្វើដំណើរ (How do you go to...?)",
              "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
              "vocab": [
                {
                  "en": "market",
                  "kh": "ផ្សារ",
                  "ipa": "/ˈmɑːkɪt/",
                  "exEn": "The Central Market is famous.",
                  "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
                },
                {
                  "en": "hospital",
                  "kh": "មន្ទីរពេទ្យ",
                  "ipa": "/ˈhɒspɪtl/",
                  "exEn": "The hospital is near the river.",
                  "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
                },
                {
                  "en": "turn left",
                  "kh": "បត់ឆ្វេង",
                  "ipa": "/tɜːn left/",
                  "exEn": "Turn left at the corner.",
                  "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
                },
                {
                  "en": "turn right",
                  "kh": "បត់ស្តាំ",
                  "ipa": "/tɜːn raɪt/",
                  "exEn": "Turn right after the bridge.",
                  "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
                },
                {
                  "en": "go straight",
                  "kh": "ទៅត្រង់",
                  "ipa": "/ɡəʊ streɪt/",
                  "exEn": "Go straight for two hundred meters.",
                  "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 51: How Do You Go to Work/School? (By bus, on foot, by bike) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 51៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 51! Are you ready to master How Do You Go to Work/School? (By bus, on foot, by bike)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 51! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 51\n🎯 ប្រធានបទ៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) (How Do You Go to Work/School? (By bus, on foot, by bike))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 51: How Do You Go to Work/School? (By bus, on foot, by bike) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 51៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 51! Are you ready to master How Do You Go to Work/School? (By bus, on foot, by bike)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 51! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el52",
              "day": 52,
              "title": "ថ្ងៃទី 52៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) (Asking & Giving Directions (Turn left, Turn right, Go straight))",
              "topic": "ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight)",
              "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
              "vocab": [
                {
                  "en": "market",
                  "kh": "ផ្សារ",
                  "ipa": "/ˈmɑːkɪt/",
                  "exEn": "The Central Market is famous.",
                  "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
                },
                {
                  "en": "hospital",
                  "kh": "មន្ទីរពេទ្យ",
                  "ipa": "/ˈhɒspɪtl/",
                  "exEn": "The hospital is near the river.",
                  "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
                },
                {
                  "en": "turn left",
                  "kh": "បត់ឆ្វេង",
                  "ipa": "/tɜːn left/",
                  "exEn": "Turn left at the corner.",
                  "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
                },
                {
                  "en": "turn right",
                  "kh": "បត់ស្តាំ",
                  "ipa": "/tɜːn raɪt/",
                  "exEn": "Turn right after the bridge.",
                  "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
                },
                {
                  "en": "go straight",
                  "kh": "ទៅត្រង់",
                  "ipa": "/ɡəʊ streɪt/",
                  "exEn": "Go straight for two hundred meters.",
                  "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 52: Asking & Giving Directions (Turn left, Turn right, Go straight) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 52៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 52! Are you ready to master Asking & Giving Directions (Turn left, Turn right, Go straight)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 52! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 52\n🎯 ប្រធានបទ៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) (Asking & Giving Directions (Turn left, Turn right, Go straight))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 52: Asking & Giving Directions (Turn left, Turn right, Go straight) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 52៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 52! Are you ready to master Asking & Giving Directions (Turn left, Turn right, Go straight)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 52! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el53",
              "day": 53,
              "title": "ថ្ងៃទី 53៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs (Public Signs & Rules (Stop, No parking, Entrance, Exit))",
              "topic": "ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs",
              "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
              "vocab": [
                {
                  "en": "market",
                  "kh": "ផ្សារ",
                  "ipa": "/ˈmɑːkɪt/",
                  "exEn": "The Central Market is famous.",
                  "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
                },
                {
                  "en": "hospital",
                  "kh": "មន្ទីរពេទ្យ",
                  "ipa": "/ˈhɒspɪtl/",
                  "exEn": "The hospital is near the river.",
                  "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
                },
                {
                  "en": "turn left",
                  "kh": "បត់ឆ្វេង",
                  "ipa": "/tɜːn left/",
                  "exEn": "Turn left at the corner.",
                  "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
                },
                {
                  "en": "turn right",
                  "kh": "បត់ស្តាំ",
                  "ipa": "/tɜːn raɪt/",
                  "exEn": "Turn right after the bridge.",
                  "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
                },
                {
                  "en": "go straight",
                  "kh": "ទៅត្រង់",
                  "ipa": "/ɡəʊ streɪt/",
                  "exEn": "Go straight for two hundred meters.",
                  "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 53: Public Signs & Rules (Stop, No parking, Entrance, Exit) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 53៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 53! Are you ready to master Public Signs & Rules (Stop, No parking, Entrance, Exit)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 53! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 53\n🎯 ប្រធានបទ៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs (Public Signs & Rules (Stop, No parking, Entrance, Exit))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 53: Public Signs & Rules (Stop, No parking, Entrance, Exit) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 53៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 53! Are you ready to master Public Signs & Rules (Stop, No parking, Entrance, Exit)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 53! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el54",
              "day": 54,
              "title": "ថ្ងៃទី 54៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង (Weekly Review & Dialogue: Finding Your Way Around Town)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង",
              "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
              "vocab": [
                {
                  "en": "market",
                  "kh": "ផ្សារ",
                  "ipa": "/ˈmɑːkɪt/",
                  "exEn": "The Central Market is famous.",
                  "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
                },
                {
                  "en": "hospital",
                  "kh": "មន្ទីរពេទ្យ",
                  "ipa": "/ˈhɒspɪtl/",
                  "exEn": "The hospital is near the river.",
                  "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
                },
                {
                  "en": "turn left",
                  "kh": "បត់ឆ្វេង",
                  "ipa": "/tɜːn left/",
                  "exEn": "Turn left at the corner.",
                  "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
                },
                {
                  "en": "turn right",
                  "kh": "បត់ស្តាំ",
                  "ipa": "/tɜːn raɪt/",
                  "exEn": "Turn right after the bridge.",
                  "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
                },
                {
                  "en": "go straight",
                  "kh": "ទៅត្រង់",
                  "ipa": "/ɡəʊ streɪt/",
                  "exEn": "Go straight for two hundred meters.",
                  "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 54: Weekly Review & Dialogue: Finding Your Way Around Town today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 54៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 54! Are you ready to master Weekly Review & Dialogue: Finding Your Way Around Town?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 54! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 54\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង (Weekly Review & Dialogue: Finding Your Way Around Town)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 54: Weekly Review & Dialogue: Finding Your Way Around Town today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 54៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 54! Are you ready to master Weekly Review & Dialogue: Finding Your Way Around Town?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 54! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew10",
          "weekNum": 10,
          "monthWeekNum": 2,
          "title": "សប្តាហ៍ទី 2 (ថ្ងៃទី 55 - 60)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 2 ខែទី 3",
          "lessons": [
            {
              "id": "el55",
              "day": 55,
              "title": "ថ្ងៃទី 55៖ ស្ថានភាពអាកាសធាតុ Weather Conditions (Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold))",
              "topic": "ស្ថានភាពអាកាសធាតុ Weather Conditions",
              "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
              "vocab": [
                {
                  "en": "sunny",
                  "kh": "មានពន្លឺថ្ងៃក្តៅ",
                  "ipa": "/ˈsʌni/",
                  "exEn": "It is sunny and warm today.",
                  "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
                },
                {
                  "en": "rainy",
                  "kh": "មានភ្លៀងធ្លាក់",
                  "ipa": "/ˈreɪni/",
                  "exEn": "Take an umbrella on rainy days.",
                  "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
                },
                {
                  "en": "studying",
                  "kh": "កំពុងរៀន",
                  "ipa": "/ˈstʌdiɪŋ/",
                  "exEn": "We are studying with Teacher Piseth.",
                  "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                },
                {
                  "en": "reading",
                  "kh": "កំពុងអាន",
                  "ipa": "/ˈriːdɪŋ/",
                  "exEn": "He is reading an interesting story.",
                  "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
                },
                {
                  "en": "playing",
                  "kh": "កំពុងលេង",
                  "ipa": "/ˈpleɪɪŋ/",
                  "exEn": "The children are playing happily.",
                  "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 55: Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 55៖ ស្ថានភាពអាកាសធាតុ Weather Conditions ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 55! Are you ready to master Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 55! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ស្ថានភាពអាកាសធាតុ Weather Conditions ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 55\n🎯 ប្រធានបទ៖ ស្ថានភាពអាកាសធាតុ Weather Conditions (Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 55: Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 55៖ ស្ថានភាពអាកាសធាតុ Weather Conditions ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 55! Are you ready to master Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 55! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ស្ថានភាពអាកាសធាតុ Weather Conditions ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el56",
              "day": 56,
              "title": "ថ្ងៃទី 56៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year (Seasons of the Year (Rainy season, Dry season, Summer, Winter))",
              "topic": "រដូវកាលនានានៃឆ្នាំ Seasons of the Year",
              "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
              "vocab": [
                {
                  "en": "sunny",
                  "kh": "មានពន្លឺថ្ងៃក្តៅ",
                  "ipa": "/ˈsʌni/",
                  "exEn": "It is sunny and warm today.",
                  "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
                },
                {
                  "en": "rainy",
                  "kh": "មានភ្លៀងធ្លាក់",
                  "ipa": "/ˈreɪni/",
                  "exEn": "Take an umbrella on rainy days.",
                  "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
                },
                {
                  "en": "studying",
                  "kh": "កំពុងរៀន",
                  "ipa": "/ˈstʌdiɪŋ/",
                  "exEn": "We are studying with Teacher Piseth.",
                  "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                },
                {
                  "en": "reading",
                  "kh": "កំពុងអាន",
                  "ipa": "/ˈriːdɪŋ/",
                  "exEn": "He is reading an interesting story.",
                  "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
                },
                {
                  "en": "playing",
                  "kh": "កំពុងលេង",
                  "ipa": "/ˈpleɪɪŋ/",
                  "exEn": "The children are playing happily.",
                  "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 56: Seasons of the Year (Rainy season, Dry season, Summer, Winter) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 56៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 56! Are you ready to master Seasons of the Year (Rainy season, Dry season, Summer, Winter)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 56! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 56\n🎯 ប្រធានបទ៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year (Seasons of the Year (Rainy season, Dry season, Summer, Winter))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 56: Seasons of the Year (Rainy season, Dry season, Summer, Winter) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 56៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 56! Are you ready to master Seasons of the Year (Rainy season, Dry season, Summer, Winter)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 56! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el57",
              "day": 57,
              "title": "ថ្ងៃទី 57៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) (Present Continuous Tense - Actions Happening Now (am/is/are + V-ing))",
              "topic": "បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...)",
              "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
              "vocab": [
                {
                  "en": "sunny",
                  "kh": "មានពន្លឺថ្ងៃក្តៅ",
                  "ipa": "/ˈsʌni/",
                  "exEn": "It is sunny and warm today.",
                  "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
                },
                {
                  "en": "rainy",
                  "kh": "មានភ្លៀងធ្លាក់",
                  "ipa": "/ˈreɪni/",
                  "exEn": "Take an umbrella on rainy days.",
                  "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
                },
                {
                  "en": "studying",
                  "kh": "កំពុងរៀន",
                  "ipa": "/ˈstʌdiɪŋ/",
                  "exEn": "We are studying with Teacher Piseth.",
                  "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                },
                {
                  "en": "reading",
                  "kh": "កំពុងអាន",
                  "ipa": "/ˈriːdɪŋ/",
                  "exEn": "He is reading an interesting story.",
                  "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
                },
                {
                  "en": "playing",
                  "kh": "កំពុងលេង",
                  "ipa": "/ˈpleɪɪŋ/",
                  "exEn": "The children are playing happily.",
                  "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 57: Present Continuous Tense - Actions Happening Now (am/is/are + V-ing) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 57៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 57! Are you ready to master Present Continuous Tense - Actions Happening Now (am/is/are + V-ing)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 57! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 57\n🎯 ប្រធានបទ៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) (Present Continuous Tense - Actions Happening Now (am/is/are + V-ing))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 57: Present Continuous Tense - Actions Happening Now (am/is/are + V-ing) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 57៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 57! Are you ready to master Present Continuous Tense - Actions Happening Now (am/is/are + V-ing)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 57! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el58",
              "day": 58,
              "title": "ថ្ងៃទី 58៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous (Present Continuous Questions & Negatives (What are you doing?))",
              "topic": "សំណួរ និងទម្រង់បដិសេធ Present Continuous",
              "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
              "vocab": [
                {
                  "en": "sunny",
                  "kh": "មានពន្លឺថ្ងៃក្តៅ",
                  "ipa": "/ˈsʌni/",
                  "exEn": "It is sunny and warm today.",
                  "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
                },
                {
                  "en": "rainy",
                  "kh": "មានភ្លៀងធ្លាក់",
                  "ipa": "/ˈreɪni/",
                  "exEn": "Take an umbrella on rainy days.",
                  "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
                },
                {
                  "en": "studying",
                  "kh": "កំពុងរៀន",
                  "ipa": "/ˈstʌdiɪŋ/",
                  "exEn": "We are studying with Teacher Piseth.",
                  "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                },
                {
                  "en": "reading",
                  "kh": "កំពុងអាន",
                  "ipa": "/ˈriːdɪŋ/",
                  "exEn": "He is reading an interesting story.",
                  "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
                },
                {
                  "en": "playing",
                  "kh": "កំពុងលេង",
                  "ipa": "/ˈpleɪɪŋ/",
                  "exEn": "The children are playing happily.",
                  "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 58: Present Continuous Questions & Negatives (What are you doing?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 58៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 58! Are you ready to master Present Continuous Questions & Negatives (What are you doing?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 58! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សំណួរ និងទម្រង់បដិសេធ Present Continuous ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 58\n🎯 ប្រធានបទ៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous (Present Continuous Questions & Negatives (What are you doing?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 58: Present Continuous Questions & Negatives (What are you doing?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 58៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 58! Are you ready to master Present Continuous Questions & Negatives (What are you doing?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 58! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សំណួរ និងទម្រង់បដិសេធ Present Continuous ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el59",
              "day": 59,
              "title": "ថ្ងៃទី 59៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing (Weather Activities & Clothing (It is raining, wear a raincoat))",
              "topic": "សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing",
              "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
              "vocab": [
                {
                  "en": "sunny",
                  "kh": "មានពន្លឺថ្ងៃក្តៅ",
                  "ipa": "/ˈsʌni/",
                  "exEn": "It is sunny and warm today.",
                  "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
                },
                {
                  "en": "rainy",
                  "kh": "មានភ្លៀងធ្លាក់",
                  "ipa": "/ˈreɪni/",
                  "exEn": "Take an umbrella on rainy days.",
                  "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
                },
                {
                  "en": "studying",
                  "kh": "កំពុងរៀន",
                  "ipa": "/ˈstʌdiɪŋ/",
                  "exEn": "We are studying with Teacher Piseth.",
                  "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                },
                {
                  "en": "reading",
                  "kh": "កំពុងអាន",
                  "ipa": "/ˈriːdɪŋ/",
                  "exEn": "He is reading an interesting story.",
                  "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
                },
                {
                  "en": "playing",
                  "kh": "កំពុងលេង",
                  "ipa": "/ˈpleɪɪŋ/",
                  "exEn": "The children are playing happily.",
                  "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 59: Weather Activities & Clothing (It is raining, wear a raincoat) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 59៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 59! Are you ready to master Weather Activities & Clothing (It is raining, wear a raincoat)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 59! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 59\n🎯 ប្រធានបទ៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing (Weather Activities & Clothing (It is raining, wear a raincoat))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 59: Weather Activities & Clothing (It is raining, wear a raincoat) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 59៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 59! Are you ready to master Weather Activities & Clothing (It is raining, wear a raincoat)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 59! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el60",
              "day": 60,
              "title": "ថ្ងៃទី 60៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ (Weekly Review & Dialogue: Talking about the Weather and Plans)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ",
              "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
              "vocab": [
                {
                  "en": "sunny",
                  "kh": "មានពន្លឺថ្ងៃក្តៅ",
                  "ipa": "/ˈsʌni/",
                  "exEn": "It is sunny and warm today.",
                  "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
                },
                {
                  "en": "rainy",
                  "kh": "មានភ្លៀងធ្លាក់",
                  "ipa": "/ˈreɪni/",
                  "exEn": "Take an umbrella on rainy days.",
                  "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
                },
                {
                  "en": "studying",
                  "kh": "កំពុងរៀន",
                  "ipa": "/ˈstʌdiɪŋ/",
                  "exEn": "We are studying with Teacher Piseth.",
                  "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
                },
                {
                  "en": "reading",
                  "kh": "កំពុងអាន",
                  "ipa": "/ˈriːdɪŋ/",
                  "exEn": "He is reading an interesting story.",
                  "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
                },
                {
                  "en": "playing",
                  "kh": "កំពុងលេង",
                  "ipa": "/ˈpleɪɪŋ/",
                  "exEn": "The children are playing happily.",
                  "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 60: Weekly Review & Dialogue: Talking about the Weather and Plans today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 60៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 60! Are you ready to master Weekly Review & Dialogue: Talking about the Weather and Plans?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 60! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 60\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ (Weekly Review & Dialogue: Talking about the Weather and Plans)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 60: Weekly Review & Dialogue: Talking about the Weather and Plans today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 60៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 60! Are you ready to master Weekly Review & Dialogue: Talking about the Weather and Plans?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 60! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew11",
          "weekNum": 11,
          "monthWeekNum": 3,
          "title": "សប្តាហ៍ទី 3 (ថ្ងៃទី 61 - 66)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 3 ខែទី 3",
          "lessons": [
            {
              "id": "el61",
              "day": 61,
              "title": "ថ្ងៃទី 61៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) (Introduction to Past Simple of To Be (Was / Were))",
              "topic": "អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were)",
              "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
              "vocab": [
                {
                  "en": "yesterday",
                  "kh": "ម្សិលមិញ",
                  "ipa": "/ˈjestədeɪ/",
                  "exEn": "I visited my aunt yesterday.",
                  "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
                },
                {
                  "en": "last week",
                  "kh": "សប្តាហ៍មុន",
                  "ipa": "/lɑːst wiːk/",
                  "exEn": "We had a test last week.",
                  "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
                },
                {
                  "en": "tomorrow",
                  "kh": "ថ្ងៃស្អែក",
                  "ipa": "/təˈmɒrəʊ/",
                  "exEn": "Tomorrow is going to be great.",
                  "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
                },
                {
                  "en": "going to",
                  "kh": "នឹង... (ផែនការច្បាស់លាស់)",
                  "ipa": "/ˈɡəʊɪŋ tuː/",
                  "exEn": "I am going to speak English fluently.",
                  "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
                },
                {
                  "en": "hobby",
                  "kh": "ចំណង់ចំណូលចិត្ត",
                  "ipa": "/ˈhɒbi/",
                  "exEn": "My hobby is reading English books.",
                  "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 61: Introduction to Past Simple of To Be (Was / Were) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 61៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 61! Are you ready to master Introduction to Past Simple of To Be (Was / Were)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 61! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 61\n🎯 ប្រធានបទ៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) (Introduction to Past Simple of To Be (Was / Were))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 61: Introduction to Past Simple of To Be (Was / Were) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 61៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 61! Are you ready to master Introduction to Past Simple of To Be (Was / Were)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 61! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el62",
              "day": 62,
              "title": "ថ្ងៃទី 62៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) (Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned))",
              "topic": "អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed)",
              "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
              "vocab": [
                {
                  "en": "yesterday",
                  "kh": "ម្សិលមិញ",
                  "ipa": "/ˈjestədeɪ/",
                  "exEn": "I visited my aunt yesterday.",
                  "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
                },
                {
                  "en": "last week",
                  "kh": "សប្តាហ៍មុន",
                  "ipa": "/lɑːst wiːk/",
                  "exEn": "We had a test last week.",
                  "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
                },
                {
                  "en": "tomorrow",
                  "kh": "ថ្ងៃស្អែក",
                  "ipa": "/təˈmɒrəʊ/",
                  "exEn": "Tomorrow is going to be great.",
                  "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
                },
                {
                  "en": "going to",
                  "kh": "នឹង... (ផែនការច្បាស់លាស់)",
                  "ipa": "/ˈɡəʊɪŋ tuː/",
                  "exEn": "I am going to speak English fluently.",
                  "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
                },
                {
                  "en": "hobby",
                  "kh": "ចំណង់ចំណូលចិត្ត",
                  "ipa": "/ˈhɒbi/",
                  "exEn": "My hobby is reading English books.",
                  "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 62: Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 62៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 62! Are you ready to master Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 62! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 62\n🎯 ប្រធានបទ៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) (Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 62: Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 62៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 62! Are you ready to master Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 62! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el63",
              "day": 63,
              "title": "ថ្ងៃទី 63៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន (Talking about Yesterday & Last Weekend (Where were you yesterday?))",
              "topic": "ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន",
              "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
              "vocab": [
                {
                  "en": "yesterday",
                  "kh": "ម្សិលមិញ",
                  "ipa": "/ˈjestədeɪ/",
                  "exEn": "I visited my aunt yesterday.",
                  "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
                },
                {
                  "en": "last week",
                  "kh": "សប្តាហ៍មុន",
                  "ipa": "/lɑːst wiːk/",
                  "exEn": "We had a test last week.",
                  "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
                },
                {
                  "en": "tomorrow",
                  "kh": "ថ្ងៃស្អែក",
                  "ipa": "/təˈmɒrəʊ/",
                  "exEn": "Tomorrow is going to be great.",
                  "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
                },
                {
                  "en": "going to",
                  "kh": "នឹង... (ផែនការច្បាស់លាស់)",
                  "ipa": "/ˈɡəʊɪŋ tuː/",
                  "exEn": "I am going to speak English fluently.",
                  "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
                },
                {
                  "en": "hobby",
                  "kh": "ចំណង់ចំណូលចិត្ត",
                  "ipa": "/ˈhɒbi/",
                  "exEn": "My hobby is reading English books.",
                  "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 63: Talking about Yesterday & Last Weekend (Where were you yesterday?) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 63៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 63! Are you ready to master Talking about Yesterday & Last Weekend (Where were you yesterday?)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 63! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 63\n🎯 ប្រធានបទ៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន (Talking about Yesterday & Last Weekend (Where were you yesterday?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 63: Talking about Yesterday & Last Weekend (Where were you yesterday?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 63៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 63! Are you ready to master Talking about Yesterday & Last Weekend (Where were you yesterday?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 63! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el64",
              "day": 64,
              "title": "ថ្ងៃទី 64៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" (Future Plans with Be Going To (I am going to visit Angkor Wat))",
              "topic": "ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\"",
              "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
              "vocab": [
                {
                  "en": "yesterday",
                  "kh": "ម្សិលមិញ",
                  "ipa": "/ˈjestədeɪ/",
                  "exEn": "I visited my aunt yesterday.",
                  "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
                },
                {
                  "en": "last week",
                  "kh": "សប្តាហ៍មុន",
                  "ipa": "/lɑːst wiːk/",
                  "exEn": "We had a test last week.",
                  "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
                },
                {
                  "en": "tomorrow",
                  "kh": "ថ្ងៃស្អែក",
                  "ipa": "/təˈmɒrəʊ/",
                  "exEn": "Tomorrow is going to be great.",
                  "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
                },
                {
                  "en": "going to",
                  "kh": "នឹង... (ផែនការច្បាស់លាស់)",
                  "ipa": "/ˈɡəʊɪŋ tuː/",
                  "exEn": "I am going to speak English fluently.",
                  "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
                },
                {
                  "en": "hobby",
                  "kh": "ចំណង់ចំណូលចិត្ត",
                  "ipa": "/ˈhɒbi/",
                  "exEn": "My hobby is reading English books.",
                  "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 64: Future Plans with Be Going To (I am going to visit Angkor Wat) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 64៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 64! Are you ready to master Future Plans with Be Going To (I am going to visit Angkor Wat)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 64! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 64\n🎯 ប្រធានបទ៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" (Future Plans with Be Going To (I am going to visit Angkor Wat))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 64: Future Plans with Be Going To (I am going to visit Angkor Wat) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 64៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 64! Are you ready to master Future Plans with Be Going To (I am going to visit Angkor Wat)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 64! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el65",
              "day": 65,
              "title": "ថ្ងៃទី 65៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time (Hobbies & Free Time Activities (Listening to music, Reading))",
              "topic": "ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time",
              "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
              "vocab": [
                {
                  "en": "yesterday",
                  "kh": "ម្សិលមិញ",
                  "ipa": "/ˈjestədeɪ/",
                  "exEn": "I visited my aunt yesterday.",
                  "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
                },
                {
                  "en": "last week",
                  "kh": "សប្តាហ៍មុន",
                  "ipa": "/lɑːst wiːk/",
                  "exEn": "We had a test last week.",
                  "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
                },
                {
                  "en": "tomorrow",
                  "kh": "ថ្ងៃស្អែក",
                  "ipa": "/təˈmɒrəʊ/",
                  "exEn": "Tomorrow is going to be great.",
                  "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
                },
                {
                  "en": "going to",
                  "kh": "នឹង... (ផែនការច្បាស់លាស់)",
                  "ipa": "/ˈɡəʊɪŋ tuː/",
                  "exEn": "I am going to speak English fluently.",
                  "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
                },
                {
                  "en": "hobby",
                  "kh": "ចំណង់ចំណូលចិត្ត",
                  "ipa": "/ˈhɒbi/",
                  "exEn": "My hobby is reading English books.",
                  "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 65: Hobbies & Free Time Activities (Listening to music, Reading) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 65៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 65! Are you ready to master Hobbies & Free Time Activities (Listening to music, Reading)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 65! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 65\n🎯 ប្រធានបទ៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time (Hobbies & Free Time Activities (Listening to music, Reading))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 65: Hobbies & Free Time Activities (Listening to music, Reading) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 65៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 65! Are you ready to master Hobbies & Free Time Activities (Listening to music, Reading)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 65! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el66",
              "day": 66,
              "title": "ថ្ងៃទី 66៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត (Weekly Review & Dialogue: What Did You Do? & What Will You Do?)",
              "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត",
              "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
              "vocab": [
                {
                  "en": "yesterday",
                  "kh": "ម្សិលមិញ",
                  "ipa": "/ˈjestədeɪ/",
                  "exEn": "I visited my aunt yesterday.",
                  "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
                },
                {
                  "en": "last week",
                  "kh": "សប្តាហ៍មុន",
                  "ipa": "/lɑːst wiːk/",
                  "exEn": "We had a test last week.",
                  "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
                },
                {
                  "en": "tomorrow",
                  "kh": "ថ្ងៃស្អែក",
                  "ipa": "/təˈmɒrəʊ/",
                  "exEn": "Tomorrow is going to be great.",
                  "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
                },
                {
                  "en": "going to",
                  "kh": "នឹង... (ផែនការច្បាស់លាស់)",
                  "ipa": "/ˈɡəʊɪŋ tuː/",
                  "exEn": "I am going to speak English fluently.",
                  "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
                },
                {
                  "en": "hobby",
                  "kh": "ចំណង់ចំណូលចិត្ត",
                  "ipa": "/ˈhɒbi/",
                  "exEn": "My hobby is reading English books.",
                  "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 66: Weekly Review & Dialogue: What Did You Do? & What Will You Do? today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 66៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 66! Are you ready to master Weekly Review & Dialogue: What Did You Do? & What Will You Do??",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 66! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 66\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត (Weekly Review & Dialogue: What Did You Do? & What Will You Do?)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 66: Weekly Review & Dialogue: What Did You Do? & What Will You Do? today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 66៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 66! Are you ready to master Weekly Review & Dialogue: What Did You Do? & What Will You Do??\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 66! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        },
        {
          "id": "ew12",
          "weekNum": 12,
          "monthWeekNum": 4,
          "title": "សប្តាហ៍ទី 4 (ថ្ងៃទី 67 - 72)",
          "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 4 ខែទី 3",
          "lessons": [
            {
              "id": "el67",
              "day": 67,
              "title": "ថ្ងៃទី 67៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ (Grand Review 1: Pronouns, To Be, Present Simple & Continuous)",
              "topic": "រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ",
              "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
              "vocab": [
                {
                  "en": "graduate",
                  "kh": "បញ្ចប់ការសិក្សា",
                  "ipa": "/ˈɡrædʒueɪt/",
                  "exEn": "I graduate from Elementary level!",
                  "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
                },
                {
                  "en": "achievement",
                  "kh": "សមិទ្ធផល / ស្នាដៃ",
                  "ipa": "/əˈtʃiːvmənt/",
                  "exEn": "This is a proud achievement.",
                  "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
                },
                {
                  "en": "knowledge",
                  "kh": "ចំណេះដឹង",
                  "ipa": "/ˈnɒlɪdʒ/",
                  "exEn": "Knowledge opens many doors.",
                  "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
                },
                {
                  "en": "congratulations",
                  "kh": "អបអរសាទរ",
                  "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
                  "exEn": "Congratulations on your graduation!",
                  "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
                },
                {
                  "en": "future",
                  "kh": "អនាគត",
                  "ipa": "/ˈfjuːtʃər/",
                  "exEn": "A bright future awaits you.",
                  "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 67: Grand Review 1: Pronouns, To Be, Present Simple & Continuous today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 67៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 67! Are you ready to master Grand Review 1: Pronouns, To Be, Present Simple & Continuous?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 67! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 67\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ (Grand Review 1: Pronouns, To Be, Present Simple & Continuous)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 67: Grand Review 1: Pronouns, To Be, Present Simple & Continuous today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 67៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 67! Are you ready to master Grand Review 1: Pronouns, To Be, Present Simple & Continuous?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 67! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el68",
              "day": 68,
              "title": "ថ្ងៃទី 68៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ (Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How))",
              "topic": "រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦",
              "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
              "vocab": [
                {
                  "en": "graduate",
                  "kh": "បញ្ចប់ការសិក្សា",
                  "ipa": "/ˈɡrædʒueɪt/",
                  "exEn": "I graduate from Elementary level!",
                  "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
                },
                {
                  "en": "achievement",
                  "kh": "សមិទ្ធផល / ស្នាដៃ",
                  "ipa": "/əˈtʃiːvmənt/",
                  "exEn": "This is a proud achievement.",
                  "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
                },
                {
                  "en": "knowledge",
                  "kh": "ចំណេះដឹង",
                  "ipa": "/ˈnɒlɪdʒ/",
                  "exEn": "Knowledge opens many doors.",
                  "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
                },
                {
                  "en": "congratulations",
                  "kh": "អបអរសាទរ",
                  "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
                  "exEn": "Congratulations on your graduation!",
                  "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
                },
                {
                  "en": "future",
                  "kh": "អនាគត",
                  "ipa": "/ˈfjuːtʃər/",
                  "exEn": "A bright future awaits you.",
                  "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 68: Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 68៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 68! Are you ready to master Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 68! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 68\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ (Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 68: Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 68៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 68! Are you ready to master Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 68! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el69",
              "day": 69,
              "title": "ថ្ងៃទី 69៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ (Grand Review 3: Essential Vocabulary & Daily Dialogues)",
              "topic": "រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ",
              "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
              "vocab": [
                {
                  "en": "graduate",
                  "kh": "បញ្ចប់ការសិក្សា",
                  "ipa": "/ˈɡrædʒueɪt/",
                  "exEn": "I graduate from Elementary level!",
                  "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
                },
                {
                  "en": "achievement",
                  "kh": "សមិទ្ធផល / ស្នាដៃ",
                  "ipa": "/əˈtʃiːvmənt/",
                  "exEn": "This is a proud achievement.",
                  "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
                },
                {
                  "en": "knowledge",
                  "kh": "ចំណេះដឹង",
                  "ipa": "/ˈnɒlɪdʒ/",
                  "exEn": "Knowledge opens many doors.",
                  "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
                },
                {
                  "en": "congratulations",
                  "kh": "អបអរសាទរ",
                  "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
                  "exEn": "Congratulations on your graduation!",
                  "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
                },
                {
                  "en": "future",
                  "kh": "អនាគត",
                  "ipa": "/ˈfjuːtʃər/",
                  "exEn": "A bright future awaits you.",
                  "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 69: Grand Review 3: Essential Vocabulary & Daily Dialogues today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 69៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 69! Are you ready to master Grand Review 3: Essential Vocabulary & Daily Dialogues?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 69! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 69\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ (Grand Review 3: Essential Vocabulary & Daily Dialogues)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 69: Grand Review 3: Essential Vocabulary & Daily Dialogues today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 69៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 69! Are you ready to master Grand Review 3: Essential Vocabulary & Daily Dialogues?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 69! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el70",
              "day": 70,
              "title": "ថ្ងៃទី 70៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) (Elementary Final Exam Practice Test Part 1)",
              "topic": "វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១)",
              "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
              "vocab": [
                {
                  "en": "graduate",
                  "kh": "បញ្ចប់ការសិក្សា",
                  "ipa": "/ˈɡrædʒueɪt/",
                  "exEn": "I graduate from Elementary level!",
                  "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
                },
                {
                  "en": "achievement",
                  "kh": "សមិទ្ធផល / ស្នាដៃ",
                  "ipa": "/əˈtʃiːvmənt/",
                  "exEn": "This is a proud achievement.",
                  "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
                },
                {
                  "en": "knowledge",
                  "kh": "ចំណេះដឹង",
                  "ipa": "/ˈnɒlɪdʒ/",
                  "exEn": "Knowledge opens many doors.",
                  "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
                },
                {
                  "en": "congratulations",
                  "kh": "អបអរសាទរ",
                  "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
                  "exEn": "Congratulations on your graduation!",
                  "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
                },
                {
                  "en": "future",
                  "kh": "អនាគត",
                  "ipa": "/ˈfjuːtʃər/",
                  "exEn": "A bright future awaits you.",
                  "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 70: Elementary Final Exam Practice Test Part 1 today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 70៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 70! Are you ready to master Elementary Final Exam Practice Test Part 1?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 70! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 70\n🎯 ប្រធានបទ៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) (Elementary Final Exam Practice Test Part 1)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 70: Elementary Final Exam Practice Test Part 1 today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 70៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 70! Are you ready to master Elementary Final Exam Practice Test Part 1?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 70! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el71",
              "day": 71,
              "title": "ថ្ងៃទី 71៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) (Elementary Final Exam Practice Test Part 2)",
              "topic": "វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២)",
              "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
              "vocab": [
                {
                  "en": "graduate",
                  "kh": "បញ្ចប់ការសិក្សា",
                  "ipa": "/ˈɡrædʒueɪt/",
                  "exEn": "I graduate from Elementary level!",
                  "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
                },
                {
                  "en": "achievement",
                  "kh": "សមិទ្ធផល / ស្នាដៃ",
                  "ipa": "/əˈtʃiːvmənt/",
                  "exEn": "This is a proud achievement.",
                  "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
                },
                {
                  "en": "knowledge",
                  "kh": "ចំណេះដឹង",
                  "ipa": "/ˈnɒlɪdʒ/",
                  "exEn": "Knowledge opens many doors.",
                  "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
                },
                {
                  "en": "congratulations",
                  "kh": "អបអរសាទរ",
                  "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
                  "exEn": "Congratulations on your graduation!",
                  "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
                },
                {
                  "en": "future",
                  "kh": "អនាគត",
                  "ipa": "/ˈfjuːtʃər/",
                  "exEn": "A bright future awaits you.",
                  "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 71: Elementary Final Exam Practice Test Part 2 today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 71៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 71! Are you ready to master Elementary Final Exam Practice Test Part 2?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 71! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 71\n🎯 ប្រធានបទ៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) (Elementary Final Exam Practice Test Part 2)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 71: Elementary Final Exam Practice Test Part 2 today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 71៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 71! Are you ready to master Elementary Final Exam Practice Test Part 2?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 71! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            },
            {
              "id": "el72",
              "day": 72,
              "title": "ថ្ងៃទី 72៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) (Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា))",
              "topic": "ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam)",
              "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
              "vocab": [
                {
                  "en": "graduate",
                  "kh": "បញ្ចប់ការសិក្សា",
                  "ipa": "/ˈɡrædʒueɪt/",
                  "exEn": "I graduate from Elementary level!",
                  "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
                },
                {
                  "en": "achievement",
                  "kh": "សមិទ្ធផល / ស្នាដៃ",
                  "ipa": "/əˈtʃiːvmənt/",
                  "exEn": "This is a proud achievement.",
                  "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
                },
                {
                  "en": "knowledge",
                  "kh": "ចំណេះដឹង",
                  "ipa": "/ˈnɒlɪdʒ/",
                  "exEn": "Knowledge opens many doors.",
                  "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
                },
                {
                  "en": "congratulations",
                  "kh": "អបអរសាទរ",
                  "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
                  "exEn": "Congratulations on your graduation!",
                  "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
                },
                {
                  "en": "future",
                  "kh": "អនាគត",
                  "ipa": "/ˈfjuːtʃər/",
                  "exEn": "A bright future awaits you.",
                  "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
                }
              ],
              "sentences": [
                {
                  "en": "We study Day 72: Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា) today.",
                  "kh": "ពួកយើងរៀនថ្ងៃទី 72៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ថ្ងៃនេះ។"
                },
                {
                  "en": "Teacher Piseth explains every lesson with love and patience.",
                  "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
                },
                {
                  "en": "Daily practice brings confidence and high scores.",
                  "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
                }
              ],
              "dialogue": [
                {
                  "speaker": "Teacher Piseth",
                  "en": "Welcome to Day 72! Are you ready to master Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា)?",
                  "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 72! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ហើយឬនៅ?"
                },
                {
                  "speaker": "Student",
                  "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
                  "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
                },
                {
                  "speaker": "Teacher Piseth",
                  "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
                  "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
                }
              ],
              "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 72\n🎯 ប្រធានបទ៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) (Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 72: Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 72៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 72! Are you ready to master Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 72! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
            }
          ]
        }
      ]
    }
  ],
  "weeks": [
    {
      "id": "ew1",
      "weekNum": 1,
      "monthWeekNum": 1,
      "title": "សប្តាហ៍ទី 1 (ថ្ងៃទី 1 - 6)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 1 ខែទី 1",
      "lessons": [
        {
          "id": "el1",
          "day": 1,
          "title": "ថ្ងៃទី 1៖ សព្វនាមប្រធាន Subject Pronouns (Subject Pronouns (I, You, We, They, He, She, It))",
          "topic": "សព្វនាមប្រធាន Subject Pronouns",
          "grammar": "សព្វនាមប្រធាន (Subject Pronouns) គឺជាពាក្យដែលប្រើជំនួសឱ្យនាម ដើម្បីធ្វើជាប្រធាននៃល្បះ។\n• I = ខ្ញុំ\n• You = អ្នក / ឯង / លោក\n• We = ពួកយើង\n• They = ពួកគេ / ពួកវា\n• He = គាត់ (បុរសម្នាក់)\n• She = នាង (ស្ត្រីម្នាក់)\n• It = វា (សត្វ ឬវត្ថុមួយ)",
          "vocab": [
            {
              "en": "I",
              "kh": "ខ្ញុំ",
              "ipa": "/aɪ/",
              "exEn": "I am an eager student.",
              "exKh": "ខ្ញុំជាសិស្សដែលមានចិត្តចង់រៀនសូត្រ។"
            },
            {
              "en": "You",
              "kh": "អ្នក",
              "ipa": "/juː/",
              "exEn": "You are very kind and polite.",
              "exKh": "អ្នកមានចិត្តល្អ និងគួរសមណាស់។"
            },
            {
              "en": "We",
              "kh": "ពួកយើង",
              "ipa": "/wiː/",
              "exEn": "We study English together every day.",
              "exKh": "ពួកយើងរៀនភាសាអង់គ្លេសជាមួយគ្នារាល់ថ្ងៃ។"
            },
            {
              "en": "They",
              "kh": "ពួកគេ",
              "ipa": "/ðeɪ/",
              "exEn": "They are happy in the school library.",
              "exKh": "ពួកគេសប្បាយរីករាយនៅក្នុងបណ្ណាល័យសាលា។"
            },
            {
              "en": "He",
              "kh": "គាត់",
              "ipa": "/hiː/",
              "exEn": "He is my hard-working brother.",
              "exKh": "គាត់ជាបងប្រុសដ៏ឧស្សាហ៍របស់ខ្ញុំ។"
            },
            {
              "en": "She",
              "kh": "នាង",
              "ipa": "/ʃiː/",
              "exEn": "She is a smart English teacher.",
              "exKh": "នាងជាគ្រូបង្រៀនភាសាអង់គ្លេសដ៏ឆ្លាតវៃម្នាក់។"
            }
          ],
          "sentences": [
            {
              "en": "I am ready to learn English today.",
              "kh": "ខ្ញុំរួចរាល់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះហើយ។"
            },
            {
              "en": "She is my best friend in Phnom Penh.",
              "kh": "នាងជាមិត្តភក្តិល្អបំផុតរបស់ខ្ញុំនៅភ្នំពេញ។"
            },
            {
              "en": "We speak English with Teacher Piseth.",
              "kh": "ពួកយើងនិយាយភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Hello! Welcome to the Elementary Course! What is your name?",
              "kh": "សួស្តី! ស្វាគមន៍មកកាន់ថ្នាក់បឋមសិក្សា! តើកូនឈ្មោះអ្វីដែរ?"
            },
            {
              "speaker": "Student",
              "en": "Hello Teacher Piseth! I am Dara, and she is my sister Bopha.",
              "kh": "ជម្រាបសួរអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំឈ្មោះដារ៉ា ហើយនាងជាប្អូនស្រីខ្ញុំឈ្មោះបុប្ផា។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome Dara and Bopha! We will learn together with joy.",
              "kh": "ស្វាគមន៍ដារ៉ា និងបុប្ផា! ពួកយើងនឹងរៀនជាមួយគ្នាដោយភាពសប្បាយរីករាយ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 1\n🎯 ប្រធានបទ៖ សព្វនាមប្រធាន Subject Pronouns (Subject Pronouns (I, You, We, They, He, She, It))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nសព្វនាមប្រធាន (Subject Pronouns) គឺជាពាក្យដែលប្រើជំនួសឱ្យនាម ដើម្បីធ្វើជាប្រធាននៃល្បះ។\n• I = ខ្ញុំ\n• You = អ្នក / ឯង / លោក\n• We = ពួកយើង\n• They = ពួកគេ / ពួកវា\n• He = គាត់ (បុរសម្នាក់)\n• She = នាង (ស្ត្រីម្នាក់)\n• It = វា (សត្វ ឬវត្ថុមួយ)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 I (/aɪ/) = 🇰🇭 ខ្ញុំ\n   ↳ ឧទាហរណ៍៖ I am an eager student.\n   ↳ បកប្រែ៖ (ខ្ញុំជាសិស្សដែលមានចិត្តចង់រៀនសូត្រ។)\n\n2. 🇬🇧 You (/juː/) = 🇰🇭 អ្នក\n   ↳ ឧទាហរណ៍៖ You are very kind and polite.\n   ↳ បកប្រែ៖ (អ្នកមានចិត្តល្អ និងគួរសមណាស់។)\n\n3. 🇬🇧 We (/wiː/) = 🇰🇭 ពួកយើង\n   ↳ ឧទាហរណ៍៖ We study English together every day.\n   ↳ បកប្រែ៖ (ពួកយើងរៀនភាសាអង់គ្លេសជាមួយគ្នារាល់ថ្ងៃ។)\n\n4. 🇬🇧 They (/ðeɪ/) = 🇰🇭 ពួកគេ\n   ↳ ឧទាហរណ៍៖ They are happy in the school library.\n   ↳ បកប្រែ៖ (ពួកគេសប្បាយរីករាយនៅក្នុងបណ្ណាល័យសាលា។)\n\n5. 🇬🇧 He (/hiː/) = 🇰🇭 គាត់\n   ↳ ឧទាហរណ៍៖ He is my hard-working brother.\n   ↳ បកប្រែ៖ (គាត់ជាបងប្រុសដ៏ឧស្សាហ៍របស់ខ្ញុំ។)\n\n6. 🇬🇧 She (/ʃiː/) = 🇰🇭 នាង\n   ↳ ឧទាហរណ៍៖ She is a smart English teacher.\n   ↳ បកប្រែ៖ (នាងជាគ្រូបង្រៀនភាសាអង់គ្លេសដ៏ឆ្លាតវៃម្នាក់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am ready to learn English today.\n   🇰🇭 (ខ្ញុំរួចរាល់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះហើយ។)\n2. 🇬🇧 She is my best friend in Phnom Penh.\n   🇰🇭 (នាងជាមិត្តភក្តិល្អបំផុតរបស់ខ្ញុំនៅភ្នំពេញ។)\n3. 🇬🇧 We speak English with Teacher Piseth.\n   🇰🇭 (ពួកយើងនិយាយភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Hello! Welcome to the Elementary Course! What is your name?\"\n   🇰🇭 (សួស្តី! ស្វាគមន៍មកកាន់ថ្នាក់បឋមសិក្សា! តើកូនឈ្មោះអ្វីដែរ?)\n\n👤 Student:\n   🇬🇧 \"Hello Teacher Piseth! I am Dara, and she is my sister Bopha.\"\n   🇰🇭 (ជម្រាបសួរអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំឈ្មោះដារ៉ា ហើយនាងជាប្អូនស្រីខ្ញុំឈ្មោះបុប្ផា។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome Dara and Bopha! We will learn together with joy.\"\n   🇰🇭 (ស្វាគមន៍ដារ៉ា និងបុប្ផា! ពួកយើងនឹងរៀនជាមួយគ្នាដោយភាពសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el2",
          "day": 2,
          "title": "ថ្ងៃទី 2៖ កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប (Verb To Be Present (Am, Is, Are) - Affirmative)",
          "topic": "កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប",
          "grammar": "កិរិយាសព្ទ \"To Be\" ប្រែថា \"ជា, គឺ, នៅ\"។\n• I + am (I am = ខ្ញុំគឺ/ជា/នៅ)\n• He / She / It + is (He is, She is, It is)\n• You / We / They + are (You are, We are, They are)",
          "vocab": [
            {
              "en": "am",
              "kh": "ជា/គឺ (ប្រើជាមួយ I)",
              "ipa": "/æm/",
              "exEn": "I am ready for lesson two.",
              "exKh": "ខ្ញុំរួចរាល់សម្រាប់មេរៀនទី ២។"
            },
            {
              "en": "is",
              "kh": "ជា/គឺ (ប្រើជាមួយ He/She/It)",
              "ipa": "/ɪz/",
              "exEn": "He is a great doctor in hospital.",
              "exKh": "គាត់ជាវេជ្ជបណ្ឌិតដ៏ពូកែម្នាក់ក្នុងមន្ទីរពេទ្យ។"
            },
            {
              "en": "are",
              "kh": "ជា/គឺ (ប្រើជាមួយ You/We/They)",
              "ipa": "/ɑːr/",
              "exEn": "We are active learners.",
              "exKh": "ពួកយើងជាអ្នករៀនសូត្រដ៏សកម្ម។"
            },
            {
              "en": "happy",
              "kh": "រីករាយ / សប្បាយចិត្ត",
              "ipa": "/ˈhæpi/",
              "exEn": "The children are very happy.",
              "exKh": "ក្មេងៗសប្បាយរីករាយខ្លាំងណាស់។"
            },
            {
              "en": "clever",
              "kh": "ឆ្លាតវៃ",
              "ipa": "/ˈklevər/",
              "exEn": "She is a clever girl.",
              "exKh": "នាងជាក្មេងស្រីឆ្លាតម្នាក់។"
            }
          ],
          "sentences": [
            {
              "en": "I am an English learner.",
              "kh": "ខ្ញុំជាអ្នករៀនភាសាអង់គ្លេសម្នាក់។"
            },
            {
              "en": "He is a friendly student.",
              "kh": "គាត់ជាសិស្សរួសរាយម្នាក់។"
            },
            {
              "en": "They are in the classroom now.",
              "kh": "ពួកគេនៅក្នុងបន្ទប់រៀនឥឡូវនេះ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "How are you feeling today, class?",
              "kh": "តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរថ្ងៃនេះ?"
            },
            {
              "speaker": "Student",
              "en": "We are excited! I am very happy to see you, Teacher.",
              "kh": "ពួកយើងរំភើបណាស់! ខ្ញុំសប្បាយចិត្តខ្លាំងណាស់ដែលបានជួបអ្នកគ្រូ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "I am thrilled to hear that! You are all wonderful students.",
              "kh": "អ្នកគ្រូរីករាយណាស់ដែលបានឮបែបនេះ! កូនៗទាំងអស់សុទ្ធតែជាសិស្សដ៏អស្ចារ្យ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 2\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ To Be បច្ចុប្បន្ន (Am, Is, Are) - ទម្រង់ស្រប (Verb To Be Present (Am, Is, Are) - Affirmative)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទ \"To Be\" ប្រែថា \"ជា, គឺ, នៅ\"។\n• I + am (I am = ខ្ញុំគឺ/ជា/នៅ)\n• He / She / It + is (He is, She is, It is)\n• You / We / They + are (You are, We are, They are)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 am (/æm/) = 🇰🇭 ជា/គឺ (ប្រើជាមួយ I)\n   ↳ ឧទាហរណ៍៖ I am ready for lesson two.\n   ↳ បកប្រែ៖ (ខ្ញុំរួចរាល់សម្រាប់មេរៀនទី ២។)\n\n2. 🇬🇧 is (/ɪz/) = 🇰🇭 ជា/គឺ (ប្រើជាមួយ He/She/It)\n   ↳ ឧទាហរណ៍៖ He is a great doctor in hospital.\n   ↳ បកប្រែ៖ (គាត់ជាវេជ្ជបណ្ឌិតដ៏ពូកែម្នាក់ក្នុងមន្ទីរពេទ្យ។)\n\n3. 🇬🇧 are (/ɑːr/) = 🇰🇭 ជា/គឺ (ប្រើជាមួយ You/We/They)\n   ↳ ឧទាហរណ៍៖ We are active learners.\n   ↳ បកប្រែ៖ (ពួកយើងជាអ្នករៀនសូត្រដ៏សកម្ម។)\n\n4. 🇬🇧 happy (/ˈhæpi/) = 🇰🇭 រីករាយ / សប្បាយចិត្ត\n   ↳ ឧទាហរណ៍៖ The children are very happy.\n   ↳ បកប្រែ៖ (ក្មេងៗសប្បាយរីករាយខ្លាំងណាស់។)\n\n5. 🇬🇧 clever (/ˈklevər/) = 🇰🇭 ឆ្លាតវៃ\n   ↳ ឧទាហរណ៍៖ She is a clever girl.\n   ↳ បកប្រែ៖ (នាងជាក្មេងស្រីឆ្លាតម្នាក់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am an English learner.\n   🇰🇭 (ខ្ញុំជាអ្នករៀនភាសាអង់គ្លេសម្នាក់។)\n2. 🇬🇧 He is a friendly student.\n   🇰🇭 (គាត់ជាសិស្សរួសរាយម្នាក់។)\n3. 🇬🇧 They are in the classroom now.\n   🇰🇭 (ពួកគេនៅក្នុងបន្ទប់រៀនឥឡូវនេះ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How are you feeling today, class?\"\n   🇰🇭 (តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរថ្ងៃនេះ?)\n\n👤 Student:\n   🇬🇧 \"We are excited! I am very happy to see you, Teacher.\"\n   🇰🇭 (ពួកយើងរំភើបណាស់! ខ្ញុំសប្បាយចិត្តខ្លាំងណាស់ដែលបានជួបអ្នកគ្រូ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"I am thrilled to hear that! You are all wonderful students.\"\n   🇰🇭 (អ្នកគ្រូរីករាយណាស់ដែលបានឮបែបនេះ! កូនៗទាំងអស់សុទ្ធតែជាសិស្សដ៏អស្ចារ្យ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el3",
          "day": 3,
          "title": "ថ្ងៃទី 3៖ កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ (Verb To Be - Negative & Questions (Not, Are you...?))",
          "topic": "កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ",
          "grammar": "១. ទម្រង់បដិសេធ (Negative): ថែម NOT ពីក្រោយ To Be\n• I am not... (I'm not...)\n• He / She / It is not... (isn't)\n• You / We / They are not... (aren't)\n២. ទម្រង់សំណួរ (Question): លើក Am / Is / Are មកដាក់មុខប្រធាន\n• Are you ready? -> Yes, I am. / No, I am not.\n• Is he a teacher? -> Yes, he is. / No, he isn't.",
          "vocab": [
            {
              "en": "not",
              "kh": "មិន/ទេ (បដិសេធ)",
              "ipa": "/nɒt/",
              "exEn": "I am not tired today.",
              "exKh": "ខ្ញុំមិនអស់កម្លាំងទេថ្ងៃនេះ។"
            },
            {
              "en": "isn't",
              "kh": "មិនមែន (is not)",
              "ipa": "/ˈɪznt/",
              "exEn": "She isn't sad at all.",
              "exKh": "នាងមិនកើតទុក្ខទាល់តែសោះ។"
            },
            {
              "en": "aren't",
              "kh": "មិនមែន (are not)",
              "ipa": "/ɑːnt/",
              "exEn": "We aren't late for class.",
              "exKh": "ពួកយើងមិនយឺតពេលចូលរៀនទេ។"
            },
            {
              "en": "ready",
              "kh": "រួចរាល់",
              "ipa": "/ˈredi/",
              "exEn": "Are you ready for the quiz?",
              "exKh": "តើអ្នករួចរាល់សម្រាប់សំណួរតេស្តហើយឬនៅ?"
            }
          ],
          "sentences": [
            {
              "en": "I am not afraid of speaking English.",
              "kh": "ខ្ញុំមិនខ្លាចការនិយាយភាសាអង់គ្លេសឡើយ។"
            },
            {
              "en": "Is she your English teacher? Yes, she is.",
              "kh": "តើនាងជាគ្រូភាសាអង់គ្លេសរបស់អ្នកមែនទេ? ចាស ពិតមែនហើយ។"
            },
            {
              "en": "Are they from Cambodia? Yes, they are.",
              "kh": "តើពួកគេមកពីប្រទេសកម្ពុជាមែនទេ? បាទ គឺពិតមែនហើយ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Are you nervous about speaking English?",
              "kh": "តើកូនមានការភ័យខ្លាចក្នុងការនិយាយភាសាអង់គ្លេសទេ?"
            },
            {
              "speaker": "Student",
              "en": "No, I am not nervous with Teacher Piseth!",
              "kh": "អត់ទេអ្នកគ្រូ ខ្ញុំមិនភ័យទេនៅពេលរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Excellent attitude! Confidence is the key to success.",
              "kh": "អាកប្បកិរិយាដ៏ល្អឥតខ្ចោះ! ទំនុកចិត្តគឺជាកូនសោនៃភាពជោគជ័យ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 3\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ To Be - ទម្រង់បដិសេធ និងសំណួរ (Verb To Be - Negative & Questions (Not, Are you...?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\n១. ទម្រង់បដិសេធ (Negative): ថែម NOT ពីក្រោយ To Be\n• I am not... (I'm not...)\n• He / She / It is not... (isn't)\n• You / We / They are not... (aren't)\n២. ទម្រង់សំណួរ (Question): លើក Am / Is / Are មកដាក់មុខប្រធាន\n• Are you ready? -> Yes, I am. / No, I am not.\n• Is he a teacher? -> Yes, he is. / No, he isn't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 not (/nɒt/) = 🇰🇭 មិន/ទេ (បដិសេធ)\n   ↳ ឧទាហរណ៍៖ I am not tired today.\n   ↳ បកប្រែ៖ (ខ្ញុំមិនអស់កម្លាំងទេថ្ងៃនេះ។)\n\n2. 🇬🇧 isn't (/ˈɪznt/) = 🇰🇭 មិនមែន (is not)\n   ↳ ឧទាហរណ៍៖ She isn't sad at all.\n   ↳ បកប្រែ៖ (នាងមិនកើតទុក្ខទាល់តែសោះ។)\n\n3. 🇬🇧 aren't (/ɑːnt/) = 🇰🇭 មិនមែន (are not)\n   ↳ ឧទាហរណ៍៖ We aren't late for class.\n   ↳ បកប្រែ៖ (ពួកយើងមិនយឺតពេលចូលរៀនទេ។)\n\n4. 🇬🇧 ready (/ˈredi/) = 🇰🇭 រួចរាល់\n   ↳ ឧទាហរណ៍៖ Are you ready for the quiz?\n   ↳ បកប្រែ៖ (តើអ្នករួចរាល់សម្រាប់សំណួរតេស្តហើយឬនៅ?)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am not afraid of speaking English.\n   🇰🇭 (ខ្ញុំមិនខ្លាចការនិយាយភាសាអង់គ្លេសឡើយ។)\n2. 🇬🇧 Is she your English teacher? Yes, she is.\n   🇰🇭 (តើនាងជាគ្រូភាសាអង់គ្លេសរបស់អ្នកមែនទេ? ចាស ពិតមែនហើយ។)\n3. 🇬🇧 Are they from Cambodia? Yes, they are.\n   🇰🇭 (តើពួកគេមកពីប្រទេសកម្ពុជាមែនទេ? បាទ គឺពិតមែនហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Are you nervous about speaking English?\"\n   🇰🇭 (តើកូនមានការភ័យខ្លាចក្នុងការនិយាយភាសាអង់គ្លេសទេ?)\n\n👤 Student:\n   🇬🇧 \"No, I am not nervous with Teacher Piseth!\"\n   🇰🇭 (អត់ទេអ្នកគ្រូ ខ្ញុំមិនភ័យទេនៅពេលរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Excellent attitude! Confidence is the key to success.\"\n   🇰🇭 (អាកប្បកិរិយាដ៏ល្អឥតខ្ចោះ! ទំនុកចិត្តគឺជាកូនសោនៃភាពជោគជ័យ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el4",
          "day": 4,
          "title": "ថ្ងៃទី 4៖ គុណនាមកម្មសិទ្ធិ Possessive Adjectives (Possessive Adjectives (My, Your, His, Her, Our, Their))",
          "topic": "គុណនាមកម្មសិទ្ធិ Possessive Adjectives",
          "grammar": "គុណនាមកម្មសិទ្ធិ (Possessive Adjectives) ប្រើដើម្បីបង្ហាញភាពជាម្ចាស់ ហើយត្រូវនៅមុខនាមជានិច្ច៖\n• I -> My (របស់ខ្ញុំ): my book\n• You -> Your (របស់អ្នក): your pencil\n• He -> His (របស់គាត់): his bag\n• She -> Her (របស់នាង): her notebook\n• It -> Its (របស់វា): its color\n• We -> Our (របស់យើង): our classroom\n• They -> Their (របស់ពួកគេ): their teacher",
          "vocab": [
            {
              "en": "my",
              "kh": "របស់ខ្ញុំ",
              "ipa": "/maɪ/",
              "exEn": "This is my English book.",
              "exKh": "នេះជាសៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំ។"
            },
            {
              "en": "your",
              "kh": "របស់អ្នក",
              "ipa": "/jɔːr/",
              "exEn": "Your pronunciation is great.",
              "exKh": "ការបញ្ចេញសំឡេងរបស់អ្នកពូកែណាស់។"
            },
            {
              "en": "his",
              "kh": "របស់គាត់",
              "ipa": "/hɪz/",
              "exEn": "His brother lives in Siem Reap.",
              "exKh": "បងប្រុសរបស់គាត់រស់នៅសៀមរាប។"
            },
            {
              "en": "her",
              "kh": "របស់នាង",
              "ipa": "/hɜːr/",
              "exEn": "Her smile is very warm.",
              "exKh": "ស្នាមញញឹមរបស់នាងកក់ក្តៅណាស់។"
            },
            {
              "en": "our",
              "kh": "របស់យើង",
              "ipa": "/ˈaʊər/",
              "exEn": "Our classroom is clean and bright.",
              "exKh": "បន្ទប់រៀនរបស់យើងស្អាត និងភ្លឺច្បាស់ល្អ។"
            },
            {
              "en": "their",
              "kh": "របស់ពួកគេ",
              "ipa": "/ðeər/",
              "exEn": "Their school is near the river.",
              "exKh": "សាលារៀនរបស់ពួកគេនៅជិតមាត់ទន្លេ។"
            }
          ],
          "sentences": [
            {
              "en": "This is my favorite English lesson.",
              "kh": "នេះគឺជាមេរៀនភាសាអង់គ្លេសដែលខ្ញុំចូលចិត្តបំផុត។"
            },
            {
              "en": "Her notebook is full of new vocabulary.",
              "kh": "សៀវភៅកត់ត្រារបស់នាងពោរពេញដោយវាក្យសព្ទថ្មីៗ។"
            },
            {
              "en": "Our teacher explains every grammar rule clearly.",
              "kh": "អ្នកគ្រូរបស់យើងពន្យល់ក្បួនវេយ្យាករណ៍នីមួយៗយ៉ាងច្បាស់លាស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Is this your red pen on the desk, Socheat?",
              "kh": "សុជាតិ តើនេះជាប៊ិចក្រហមរបស់កូននៅលើតុរៀនមែនទេ?"
            },
            {
              "speaker": "Student",
              "en": "No, it is not my pen. It is her pen, Teacher.",
              "kh": "ទេអ្នកគ្រូ វាមិនមែនជាប៊ិចរបស់ខ្ញុំទេ។ វាជាប៊ិចរបស់នាង។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Thank you for your honesty! Bopha, here is your pen.",
              "kh": "អរគុណសម្រាប់ភាពស្មោះត្រង់របស់កូន! បុប្ផា នេះជាប៊ិចរបស់កូន។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 4\n🎯 ប្រធានបទ៖ គុណនាមកម្មសិទ្ធិ Possessive Adjectives (Possessive Adjectives (My, Your, His, Her, Our, Their))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nគុណនាមកម្មសិទ្ធិ (Possessive Adjectives) ប្រើដើម្បីបង្ហាញភាពជាម្ចាស់ ហើយត្រូវនៅមុខនាមជានិច្ច៖\n• I -> My (របស់ខ្ញុំ): my book\n• You -> Your (របស់អ្នក): your pencil\n• He -> His (របស់គាត់): his bag\n• She -> Her (របស់នាង): her notebook\n• It -> Its (របស់វា): its color\n• We -> Our (របស់យើង): our classroom\n• They -> Their (របស់ពួកគេ): their teacher\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 my (/maɪ/) = 🇰🇭 របស់ខ្ញុំ\n   ↳ ឧទាហរណ៍៖ This is my English book.\n   ↳ បកប្រែ៖ (នេះជាសៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំ។)\n\n2. 🇬🇧 your (/jɔːr/) = 🇰🇭 របស់អ្នក\n   ↳ ឧទាហរណ៍៖ Your pronunciation is great.\n   ↳ បកប្រែ៖ (ការបញ្ចេញសំឡេងរបស់អ្នកពូកែណាស់។)\n\n3. 🇬🇧 his (/hɪz/) = 🇰🇭 របស់គាត់\n   ↳ ឧទាហរណ៍៖ His brother lives in Siem Reap.\n   ↳ បកប្រែ៖ (បងប្រុសរបស់គាត់រស់នៅសៀមរាប។)\n\n4. 🇬🇧 her (/hɜːr/) = 🇰🇭 របស់នាង\n   ↳ ឧទាហរណ៍៖ Her smile is very warm.\n   ↳ បកប្រែ៖ (ស្នាមញញឹមរបស់នាងកក់ក្តៅណាស់។)\n\n5. 🇬🇧 our (/ˈaʊər/) = 🇰🇭 របស់យើង\n   ↳ ឧទាហរណ៍៖ Our classroom is clean and bright.\n   ↳ បកប្រែ៖ (បន្ទប់រៀនរបស់យើងស្អាត និងភ្លឺច្បាស់ល្អ។)\n\n6. 🇬🇧 their (/ðeər/) = 🇰🇭 របស់ពួកគេ\n   ↳ ឧទាហរណ៍៖ Their school is near the river.\n   ↳ បកប្រែ៖ (សាលារៀនរបស់ពួកគេនៅជិតមាត់ទន្លេ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 This is my favorite English lesson.\n   🇰🇭 (នេះគឺជាមេរៀនភាសាអង់គ្លេសដែលខ្ញុំចូលចិត្តបំផុត។)\n2. 🇬🇧 Her notebook is full of new vocabulary.\n   🇰🇭 (សៀវភៅកត់ត្រារបស់នាងពោរពេញដោយវាក្យសព្ទថ្មីៗ។)\n3. 🇬🇧 Our teacher explains every grammar rule clearly.\n   🇰🇭 (អ្នកគ្រូរបស់យើងពន្យល់ក្បួនវេយ្យាករណ៍នីមួយៗយ៉ាងច្បាស់លាស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Is this your red pen on the desk, Socheat?\"\n   🇰🇭 (សុជាតិ តើនេះជាប៊ិចក្រហមរបស់កូននៅលើតុរៀនមែនទេ?)\n\n👤 Student:\n   🇬🇧 \"No, it is not my pen. It is her pen, Teacher.\"\n   🇰🇭 (ទេអ្នកគ្រូ វាមិនមែនជាប៊ិចរបស់ខ្ញុំទេ។ វាជាប៊ិចរបស់នាង។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Thank you for your honesty! Bopha, here is your pen.\"\n   🇰🇭 (អរគុណសម្រាប់ភាពស្មោះត្រង់របស់កូន! បុប្ផា នេះជាប៊ិចរបស់កូន។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el5",
          "day": 5,
          "title": "ថ្ងៃទី 5៖ សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ (Classroom & Daily Objects (Pen, Book, Bag, Chair, Desk))",
          "topic": "សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ",
          "grammar": "ការប្រើ A និង AN ជាមួយនាមឯកវចនៈរាប់បាន៖\n• A + ពាក្យផ្ដើមដោយសូរព្យញ្ជនៈ: a pen, a book, a bag, a desk, a chair\n• AN + ពាក្យផ្ដើមដោយសូរស្រៈ (a, e, i, o, u): an eraser, an apple, an umbrella",
          "vocab": [
            {
              "en": "pen",
              "kh": "ប៊ិច",
              "ipa": "/pen/",
              "exEn": "I write notes with a blue pen.",
              "exKh": "ខ្ញុំកត់ត្រាដោយប៊ិចពណ៌ខៀវមួយដើម។"
            },
            {
              "en": "book",
              "kh": "សៀវភៅ",
              "ipa": "/bʊk/",
              "exEn": "Please read your English book.",
              "exKh": "សូមអានសៀវភៅភាសាអង់គ្លេសរបស់អ្នក។"
            },
            {
              "en": "bag",
              "kh": "កាតាប / កាបូប",
              "ipa": "/bæɡ/",
              "exEn": "My bag has books and pens.",
              "exKh": "កាតាបរបស់ខ្ញុំមានសៀវភៅ និងប៊ិច។"
            },
            {
              "en": "chair",
              "kh": "កៅអី",
              "ipa": "/tʃeər/",
              "exEn": "Sit down on the chair.",
              "exKh": "សូមអង្គុយចុះលើកៅអី។"
            },
            {
              "en": "eraser",
              "kh": "ជ័រលុប",
              "ipa": "/ɪˈreɪsər/",
              "exEn": "May I borrow an eraser?",
              "exKh": "តើខ្ញុំអាចខ្ចីជ័រលុបមួយបានទេ?"
            }
          ],
          "sentences": [
            {
              "en": "There is a book on the desk.",
              "kh": "មានសៀវភៅមួយក្បាលនៅលើតុ។"
            },
            {
              "en": "She puts an eraser inside her bag.",
              "kh": "នាងដាក់ជ័រលុបមួយចូលក្នុងកាតាបរបស់នាង។"
            },
            {
              "en": "Every student has a notebook and a pen.",
              "kh": "សិស្សគ្រប់រូបមានសៀវភៅកត់ត្រាមួយក្បាល និងប៊ិចមួយដើម។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Do you have your English book and pen ready?",
              "kh": "តើកូនៗបានរៀបចំសៀវភៅអង់គ្លេស និងប៊ិចរួចរាល់ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher! My book is open and my pen is in my hand.",
              "kh": "ចាសអ្នកគ្រូ! សៀវភៅរបស់ខ្ញុំបើករួចរាល់ ហើយប៊ិចនៅក្នុងដៃខ្ញុំហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Superb! Let us write today's five new words neatly.",
              "kh": "ល្អឥតខ្ចោះ! តោះយើងសរសេរពាក្យថ្មីទាំង ៥ ថ្ងៃនេះឱ្យស្អាតទាំងអស់គ្នា។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 5\n🎯 ប្រធានបទ៖ សម្ភារៈក្នុងថ្នាក់រៀន និងប្រចាំថ្ងៃ (Classroom & Daily Objects (Pen, Book, Bag, Chair, Desk))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការប្រើ A និង AN ជាមួយនាមឯកវចនៈរាប់បាន៖\n• A + ពាក្យផ្ដើមដោយសូរព្យញ្ជនៈ: a pen, a book, a bag, a desk, a chair\n• AN + ពាក្យផ្ដើមដោយសូរស្រៈ (a, e, i, o, u): an eraser, an apple, an umbrella\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 pen (/pen/) = 🇰🇭 ប៊ិច\n   ↳ ឧទាហរណ៍៖ I write notes with a blue pen.\n   ↳ បកប្រែ៖ (ខ្ញុំកត់ត្រាដោយប៊ិចពណ៌ខៀវមួយដើម។)\n\n2. 🇬🇧 book (/bʊk/) = 🇰🇭 សៀវភៅ\n   ↳ ឧទាហរណ៍៖ Please read your English book.\n   ↳ បកប្រែ៖ (សូមអានសៀវភៅភាសាអង់គ្លេសរបស់អ្នក។)\n\n3. 🇬🇧 bag (/bæɡ/) = 🇰🇭 កាតាប / កាបូប\n   ↳ ឧទាហរណ៍៖ My bag has books and pens.\n   ↳ បកប្រែ៖ (កាតាបរបស់ខ្ញុំមានសៀវភៅ និងប៊ិច។)\n\n4. 🇬🇧 chair (/tʃeər/) = 🇰🇭 កៅអី\n   ↳ ឧទាហរណ៍៖ Sit down on the chair.\n   ↳ បកប្រែ៖ (សូមអង្គុយចុះលើកៅអី។)\n\n5. 🇬🇧 eraser (/ɪˈreɪsər/) = 🇰🇭 ជ័រលុប\n   ↳ ឧទាហរណ៍៖ May I borrow an eraser?\n   ↳ បកប្រែ៖ (តើខ្ញុំអាចខ្ចីជ័រលុបមួយបានទេ?)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 There is a book on the desk.\n   🇰🇭 (មានសៀវភៅមួយក្បាលនៅលើតុ។)\n2. 🇬🇧 She puts an eraser inside her bag.\n   🇰🇭 (នាងដាក់ជ័រលុបមួយចូលក្នុងកាតាបរបស់នាង។)\n3. 🇬🇧 Every student has a notebook and a pen.\n   🇰🇭 (សិស្សគ្រប់រូបមានសៀវភៅកត់ត្រាមួយក្បាល និងប៊ិចមួយដើម។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Do you have your English book and pen ready?\"\n   🇰🇭 (តើកូនៗបានរៀបចំសៀវភៅអង់គ្លេស និងប៊ិចរួចរាល់ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher! My book is open and my pen is in my hand.\"\n   🇰🇭 (ចាសអ្នកគ្រូ! សៀវភៅរបស់ខ្ញុំបើករួចរាល់ ហើយប៊ិចនៅក្នុងដៃខ្ញុំហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Superb! Let us write today's five new words neatly.\"\n   🇰🇭 (ល្អឥតខ្ចោះ! តោះយើងសរសេរពាក្យថ្មីទាំង ៥ ថ្ងៃនេះឱ្យស្អាតទាំងអស់គ្នា។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el6",
          "day": 6,
          "title": "ថ្ងៃទី 6៖ រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន (Weekly Review & Dialogue: Introducing Myself & My Friend)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន",
          "grammar": "រំលឹកសរុបសប្តាហ៍ទី ១៖\n១. Pronouns: I, You, He, She, We, They, It\n២. Verb To Be: I am, You are, He is, She is, We are, They are\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Classroom Objects & A/An\n៥. ឃ្លាគន្លឹះ៖ \"Nice to meet you!\", \"This is my friend.\"",
          "vocab": [
            {
              "en": "introduce",
              "kh": "ណែនាំ",
              "ipa": "/ˌɪntrəˈdjuːs/",
              "exEn": "Let me introduce my friend.",
              "exKh": "អនុញ្ញាតឱ្យខ្ញុំណែនាំមិត្តភក្តិរបស់ខ្ញុំ។"
            },
            {
              "en": "friend",
              "kh": "មិត្តភក្តិ",
              "ipa": "/frend/",
              "exEn": "He is my best friend.",
              "exKh": "គាត់ជាមិត្តល្អបំផុតរបស់ខ្ញុំ។"
            },
            {
              "en": "pleasure",
              "kh": "សេចក្តីរីករាយ",
              "ipa": "/ˈpleʒər/",
              "exEn": "It is a pleasure to meet you.",
              "exKh": "វាជាសេចក្តីរីករាយណាស់ដែលបានស្គាល់អ្នក។"
            },
            {
              "en": "classmate",
              "kh": "មិត្តរួមថ្នាក់",
              "ipa": "/ˈklɑːsmeɪt/",
              "exEn": "We are friendly classmates.",
              "exKh": "ពួកយើងជាមិត្តរួមថ្នាក់ដ៏រួសរាយ។"
            }
          ],
          "sentences": [
            {
              "en": "Hello! My name is Sok and I am a student.",
              "kh": "សួស្តី! ខ្ញុំឈ្មោះសុខ ហើយខ្ញុំជាសិស្សម្នាក់។"
            },
            {
              "en": "This is my classmate, her name is Chenda.",
              "kh": "នេះជាមិត្តរួមថ្នាក់របស់ខ្ញុំ នាងឈ្មោះចិន្តា។"
            },
            {
              "en": "We are very proud to study English with Teacher Piseth.",
              "kh": "ពួកយើងមានមោទនភាពណាស់ដែលបានរៀនភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Who can practice introducing a classmate in English?",
              "kh": "តើកូនណាខ្លះអាចអនុវត្តការណែនាំមិត្តរួមថ្នាក់ជាភាសាអង់គ្លេសបាន?"
            },
            {
              "speaker": "Student",
              "en": "Teacher Piseth, this is my friend Vathanak. He is ten years old and he is very smart.",
              "kh": "អ្នកគ្រូពិសិដ្ឋ នេះជាមិត្តរបស់ខ្ញុំឈ្មោះវឌ្ឍនៈ។ គាត់អាយុ ១០ ឆ្នាំ ហើយគាត់ឆ្លាតណាស់។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Outstanding job! Your pronunciation is very natural.",
              "kh": "ពូកែអស្ចារ្យណាស់! ការបញ្ចេញសំឡេងរបស់កូនធម្មជាតិល្អណាស់។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 1 • ថ្ងៃទី 6\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ១ និងការសន្ទនាណែនាំខ្លួន (Weekly Review & Dialogue: Introducing Myself & My Friend)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nរំលឹកសរុបសប្តាហ៍ទី ១៖\n១. Pronouns: I, You, He, She, We, They, It\n២. Verb To Be: I am, You are, He is, She is, We are, They are\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Classroom Objects & A/An\n៥. ឃ្លាគន្លឹះ៖ \"Nice to meet you!\", \"This is my friend.\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 introduce (/ˌɪntrəˈdjuːs/) = 🇰🇭 ណែនាំ\n   ↳ ឧទាហរណ៍៖ Let me introduce my friend.\n   ↳ បកប្រែ៖ (អនុញ្ញាតឱ្យខ្ញុំណែនាំមិត្តភក្តិរបស់ខ្ញុំ។)\n\n2. 🇬🇧 friend (/frend/) = 🇰🇭 មិត្តភក្តិ\n   ↳ ឧទាហរណ៍៖ He is my best friend.\n   ↳ បកប្រែ៖ (គាត់ជាមិត្តល្អបំផុតរបស់ខ្ញុំ។)\n\n3. 🇬🇧 pleasure (/ˈpleʒər/) = 🇰🇭 សេចក្តីរីករាយ\n   ↳ ឧទាហរណ៍៖ It is a pleasure to meet you.\n   ↳ បកប្រែ៖ (វាជាសេចក្តីរីករាយណាស់ដែលបានស្គាល់អ្នក។)\n\n4. 🇬🇧 classmate (/ˈklɑːsmeɪt/) = 🇰🇭 មិត្តរួមថ្នាក់\n   ↳ ឧទាហរណ៍៖ We are friendly classmates.\n   ↳ បកប្រែ៖ (ពួកយើងជាមិត្តរួមថ្នាក់ដ៏រួសរាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 Hello! My name is Sok and I am a student.\n   🇰🇭 (សួស្តី! ខ្ញុំឈ្មោះសុខ ហើយខ្ញុំជាសិស្សម្នាក់។)\n2. 🇬🇧 This is my classmate, her name is Chenda.\n   🇰🇭 (នេះជាមិត្តរួមថ្នាក់របស់ខ្ញុំ នាងឈ្មោះចិន្តា។)\n3. 🇬🇧 We are very proud to study English with Teacher Piseth.\n   🇰🇭 (ពួកយើងមានមោទនភាពណាស់ដែលបានរៀនភាសាអង់គ្លេសជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Who can practice introducing a classmate in English?\"\n   🇰🇭 (តើកូនណាខ្លះអាចអនុវត្តការណែនាំមិត្តរួមថ្នាក់ជាភាសាអង់គ្លេសបាន?)\n\n👤 Student:\n   🇬🇧 \"Teacher Piseth, this is my friend Vathanak. He is ten years old and he is very smart.\"\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋ នេះជាមិត្តរបស់ខ្ញុំឈ្មោះវឌ្ឍនៈ។ គាត់អាយុ ១០ ឆ្នាំ ហើយគាត់ឆ្លាតណាស់។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Outstanding job! Your pronunciation is very natural.\"\n   🇰🇭 (ពូកែអស្ចារ្យណាស់! ការបញ្ចេញសំឡេងរបស់កូនធម្មជាតិល្អណាស់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew2",
      "weekNum": 2,
      "monthWeekNum": 2,
      "title": "សប្តាហ៍ទី 2 (ថ្ងៃទី 7 - 12)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 2 ខែទី 1",
      "lessons": [
        {
          "id": "el7",
          "day": 7,
          "title": "ថ្ងៃទី 7៖ សព្វនាមចង្អុល Demonstratives (This, That, These, Those) (Demonstratives (This, That, These, Those))",
          "topic": "សព្វនាមចង្អុល Demonstratives (This, That, These, Those)",
          "grammar": "សព្វនាមចង្អុលប្រើសម្រាប់បង្ហាញទីតាំងជិត ឬឆ្ងាយ៖\n• This = នេះ (ឯកវចនៈ នៅជិត)\n• That = នោះ (ឯកវចនៈ នៅឆ្ងាយ)\n• These = ទាំងនេះ (ពហុវចនៈ នៅជិត)\n• Those = ទាំងនោះ (ពហុវចនៈ នៅឆ្ងាយ)\nឧទាហរណ៍៖\n• This is an apple. / That is a bird.\n• These are my books. / Those are tall trees.",
          "vocab": [
            {
              "en": "this",
              "kh": "នេះ (ជិត)",
              "ipa": "/ðɪs/",
              "exEn": "This is my notebook.",
              "exKh": "នេះជាសៀវភៅកត់ត្រារបស់ខ្ញុំ។"
            },
            {
              "en": "that",
              "kh": "នោះ (ឆ្ងាយ)",
              "ipa": "/ðæt/",
              "exEn": "That is our school building.",
              "exKh": "នោះជាអគារសាលារៀនរបស់យើង។"
            },
            {
              "en": "these",
              "kh": "ទាំងនេះ (ជិត)",
              "ipa": "/ðiːz/",
              "exEn": "These are fresh fruits.",
              "exKh": "ទាំងនេះជាផ្លែឈើស្រស់ៗ។"
            },
            {
              "en": "those",
              "kh": "ទាំងនោះ (ឆ្ងាយ)",
              "ipa": "/ðəʊz/",
              "exEn": "Those are beautiful birds in the sky.",
              "exKh": "ទាំងនោះជាសត្វបក្សីដ៏ស្រស់ស្អាតនៅលើមេឃ។"
            }
          ],
          "sentences": [
            {
              "en": "This is my pen and that is your pencil.",
              "kh": "នេះជាប៊ិចរបស់ខ្ញុំ ហើយនោះជាខ្មៅដៃរបស់អ្នក។"
            },
            {
              "en": "These are our English textbooks.",
              "kh": "ទាំងនេះជាសៀវភៅពុម្ពភាសាអង់គ្លេសរបស់យើង។"
            },
            {
              "en": "What are those in the tree? Those are birds.",
              "kh": "តើអ្វីទាំងនោះនៅលើដើមឈើ? ទាំងនោះជាសត្វបក្សី។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Look here! What is this in my hand?",
              "kh": "មើលមកទីនេះ! តើនេះជាអ្វីនៅក្នុងដៃអ្នកគ្រូ?"
            },
            {
              "speaker": "Student",
              "en": "This is an eraser in your hand, Teacher!",
              "kh": "នេះគឺជាជ័រលុបមួយនៅក្នុងដៃអ្នកគ្រូ!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Correct! And what are those over there on the shelf?",
              "kh": "ត្រឹមត្រូវ! ចុះអ្វីទាំងនោះនៅលើធ្នើរខាងនោះវិញ?"
            },
            {
              "speaker": "Student",
              "en": "Those are new English storybooks!",
              "kh": "ទាំងនោះគឺជាសៀវភៅរឿងភាសាអង់គ្លេសថ្មីៗ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 7\n🎯 ប្រធានបទ៖ សព្វនាមចង្អុល Demonstratives (This, That, These, Those) (Demonstratives (This, That, These, Those))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nសព្វនាមចង្អុលប្រើសម្រាប់បង្ហាញទីតាំងជិត ឬឆ្ងាយ៖\n• This = នេះ (ឯកវចនៈ នៅជិត)\n• That = នោះ (ឯកវចនៈ នៅឆ្ងាយ)\n• These = ទាំងនេះ (ពហុវចនៈ នៅជិត)\n• Those = ទាំងនោះ (ពហុវចនៈ នៅឆ្ងាយ)\nឧទាហរណ៍៖\n• This is an apple. / That is a bird.\n• These are my books. / Those are tall trees.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 this (/ðɪs/) = 🇰🇭 នេះ (ជិត)\n   ↳ ឧទាហរណ៍៖ This is my notebook.\n   ↳ បកប្រែ៖ (នេះជាសៀវភៅកត់ត្រារបស់ខ្ញុំ។)\n\n2. 🇬🇧 that (/ðæt/) = 🇰🇭 នោះ (ឆ្ងាយ)\n   ↳ ឧទាហរណ៍៖ That is our school building.\n   ↳ បកប្រែ៖ (នោះជាអគារសាលារៀនរបស់យើង។)\n\n3. 🇬🇧 these (/ðiːz/) = 🇰🇭 ទាំងនេះ (ជិត)\n   ↳ ឧទាហរណ៍៖ These are fresh fruits.\n   ↳ បកប្រែ៖ (ទាំងនេះជាផ្លែឈើស្រស់ៗ។)\n\n4. 🇬🇧 those (/ðəʊz/) = 🇰🇭 ទាំងនោះ (ឆ្ងាយ)\n   ↳ ឧទាហរណ៍៖ Those are beautiful birds in the sky.\n   ↳ បកប្រែ៖ (ទាំងនោះជាសត្វបក្សីដ៏ស្រស់ស្អាតនៅលើមេឃ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 This is my pen and that is your pencil.\n   🇰🇭 (នេះជាប៊ិចរបស់ខ្ញុំ ហើយនោះជាខ្មៅដៃរបស់អ្នក។)\n2. 🇬🇧 These are our English textbooks.\n   🇰🇭 (ទាំងនេះជាសៀវភៅពុម្ពភាសាអង់គ្លេសរបស់យើង។)\n3. 🇬🇧 What are those in the tree? Those are birds.\n   🇰🇭 (តើអ្វីទាំងនោះនៅលើដើមឈើ? ទាំងនោះជាសត្វបក្សី។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Look here! What is this in my hand?\"\n   🇰🇭 (មើលមកទីនេះ! តើនេះជាអ្វីនៅក្នុងដៃអ្នកគ្រូ?)\n\n👤 Student:\n   🇬🇧 \"This is an eraser in your hand, Teacher!\"\n   🇰🇭 (នេះគឺជាជ័រលុបមួយនៅក្នុងដៃអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Correct! And what are those over there on the shelf?\"\n   🇰🇭 (ត្រឹមត្រូវ! ចុះអ្វីទាំងនោះនៅលើធ្នើរខាងនោះវិញ?)\n\n👤 Student:\n   🇬🇧 \"Those are new English storybooks!\"\n   🇰🇭 (ទាំងនោះគឺជាសៀវភៅរឿងភាសាអង់គ្លេសថ្មីៗ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el8",
          "day": 8,
          "title": "ថ្ងៃទី 8៖ នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies) (Regular Plural Nouns (-s, -es, -ies))",
          "topic": "នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies)",
          "grammar": "ក្បួនបំប្លែងនាមឯកវចនៈទៅជានាមពហុវចនៈ៖\n១. នាមទូទៅ ថែម -s: book -> books, pen -> pens, bag -> bags\n២. បញ្ចប់ដោយ -s, -ss, -sh, -ch, -x, -o ថែម -es: box -> boxes, watch -> watches, bus -> buses, tomato -> tomatoes\n៣. បញ្ចប់ដោយ ព្យញ្ជនៈ + y ប្តូរ y ទៅជា -ies: baby -> babies, city -> cities, family -> families\n(ចំណាំ: បើស្រៈ + y ថែមតែ -s: boy -> boys, day -> days)",
          "vocab": [
            {
              "en": "box",
              "kh": "ប្រអប់ (boxes = ប្រអប់ច្រើន)",
              "ipa": "/bɒks/",
              "exEn": "She has three gift boxes.",
              "exKh": "នាងមានប្រអប់កាដូចំនួន ៣។"
            },
            {
              "en": "watch",
              "kh": "នាឡិកាដៃ (watches)",
              "ipa": "/wɒtʃ/",
              "exEn": "My father collects watches.",
              "exKh": "ឪពុកខ្ញុំប្រមូលនាឡិកាដៃ។"
            },
            {
              "en": "city",
              "kh": "ទីក្រុង (cities)",
              "ipa": "/ˈsɪti/",
              "exEn": "Cambodia has many green cities.",
              "exKh": "ប្រទេសកម្ពុជាមានទីក្រុងបៃតងជាច្រើន។"
            },
            {
              "en": "baby",
              "kh": "ទារក (babies)",
              "ipa": "/ˈbeɪbi/",
              "exEn": "The babies are sleeping soundly.",
              "exKh": "ទារកទាំងឡាយកំពុងគេងលក់ស្កប់ស្កល់។"
            }
          ],
          "sentences": [
            {
              "en": "I have two pens and five notebooks.",
              "kh": "ខ្ញុំមានប៊ិច ២ ដើម និងសៀវភៅកត់ត្រា ៥ ក្បាល។"
            },
            {
              "en": "There are many big cities in the world.",
              "kh": "មានទីក្រុងធំៗជាច្រើននៅលើពិភពលោក។"
            },
            {
              "en": "The students put their boxes on the tables.",
              "kh": "សិស្សានុសិស្សបានដាក់ប្រអប់របស់ពួកគេនៅលើតុ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "How many watches do you see in the picture?",
              "kh": "តើកូនឃើញនាឡិកាដៃប៉ុន្មាននៅក្នុងរូបភាព?"
            },
            {
              "speaker": "Student",
              "en": "I see four watches and two boxes, Teacher.",
              "kh": "ខ្ញុំឃើញនាឡិកាដៃ ៤ គ្រឿង និងប្រអប់ ២ អ្នកគ្រូ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Well done! Remember to pronounce the /ɪz/ sound clearly: watches, boxes.",
              "kh": "ពូកែណាស់! ចងចាំបញ្ចេញសូរ /ɪz/ ឱ្យច្បាស់ណា: watches, boxes។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 8\n🎯 ប្រធានបទ៖ នាមពហុវចនៈ Regular Plural Nouns (-s, -es, -ies) (Regular Plural Nouns (-s, -es, -ies))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nក្បួនបំប្លែងនាមឯកវចនៈទៅជានាមពហុវចនៈ៖\n១. នាមទូទៅ ថែម -s: book -> books, pen -> pens, bag -> bags\n២. បញ្ចប់ដោយ -s, -ss, -sh, -ch, -x, -o ថែម -es: box -> boxes, watch -> watches, bus -> buses, tomato -> tomatoes\n៣. បញ្ចប់ដោយ ព្យញ្ជនៈ + y ប្តូរ y ទៅជា -ies: baby -> babies, city -> cities, family -> families\n(ចំណាំ: បើស្រៈ + y ថែមតែ -s: boy -> boys, day -> days)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 box (/bɒks/) = 🇰🇭 ប្រអប់ (boxes = ប្រអប់ច្រើន)\n   ↳ ឧទាហរណ៍៖ She has three gift boxes.\n   ↳ បកប្រែ៖ (នាងមានប្រអប់កាដូចំនួន ៣។)\n\n2. 🇬🇧 watch (/wɒtʃ/) = 🇰🇭 នាឡិកាដៃ (watches)\n   ↳ ឧទាហរណ៍៖ My father collects watches.\n   ↳ បកប្រែ៖ (ឪពុកខ្ញុំប្រមូលនាឡិកាដៃ។)\n\n3. 🇬🇧 city (/ˈsɪti/) = 🇰🇭 ទីក្រុង (cities)\n   ↳ ឧទាហរណ៍៖ Cambodia has many green cities.\n   ↳ បកប្រែ៖ (ប្រទេសកម្ពុជាមានទីក្រុងបៃតងជាច្រើន។)\n\n4. 🇬🇧 baby (/ˈbeɪbi/) = 🇰🇭 ទារក (babies)\n   ↳ ឧទាហរណ៍៖ The babies are sleeping soundly.\n   ↳ បកប្រែ៖ (ទារកទាំងឡាយកំពុងគេងលក់ស្កប់ស្កល់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have two pens and five notebooks.\n   🇰🇭 (ខ្ញុំមានប៊ិច ២ ដើម និងសៀវភៅកត់ត្រា ៥ ក្បាល។)\n2. 🇬🇧 There are many big cities in the world.\n   🇰🇭 (មានទីក្រុងធំៗជាច្រើននៅលើពិភពលោក។)\n3. 🇬🇧 The students put their boxes on the tables.\n   🇰🇭 (សិស្សានុសិស្សបានដាក់ប្រអប់របស់ពួកគេនៅលើតុ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How many watches do you see in the picture?\"\n   🇰🇭 (តើកូនឃើញនាឡិកាដៃប៉ុន្មាននៅក្នុងរូបភាព?)\n\n👤 Student:\n   🇬🇧 \"I see four watches and two boxes, Teacher.\"\n   🇰🇭 (ខ្ញុំឃើញនាឡិកាដៃ ៤ គ្រឿង និងប្រអប់ ២ អ្នកគ្រូ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Well done! Remember to pronounce the /ɪz/ sound clearly: watches, boxes.\"\n   🇰🇭 (ពូកែណាស់! ចងចាំបញ្ចេញសូរ /ɪz/ ឱ្យច្បាស់ណា: watches, boxes។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el9",
          "day": 9,
          "title": "ថ្ងៃទី 9៖ លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ (Numbers 1-100 & Counting Everyday Items)",
          "topic": "លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ",
          "grammar": "លេខរាប់ភាសាអង់គ្លេសពី ១ ដល់ ១០០៖\n• 1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten\n• 11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty\n• 30, 40, 50, 60, 70, 80, 90, 100: Thirty, Forty, Fifty, Sixty, Seventy, Eighty, Ninety, One hundred\n• សំណួររាប់ចំនួន៖ \"How many + plural noun + are there?\"",
          "vocab": [
            {
              "en": "twenty",
              "kh": "ម្ភៃ (20)",
              "ipa": "/ˈtwenti/",
              "exEn": "There are twenty students.",
              "exKh": "មានសិស្សចំនួនម្ភៃនាក់។"
            },
            {
              "en": "fifty",
              "kh": "ហាសិប (50)",
              "ipa": "/ˈfɪfti/",
              "exEn": "This book has fifty pages.",
              "exKh": "សៀវភៅនេះមានហាសិបទំព័រ។"
            },
            {
              "en": "hundred",
              "kh": "មួយរយ (100)",
              "ipa": "/ˈhʌndrəd/",
              "exEn": "One hundred percent score!",
              "exKh": "ពិន្ទុមួយរយភាគរយពេញ!"
            },
            {
              "en": "count",
              "kh": "រាប់",
              "ipa": "/kaʊnt/",
              "exEn": "Can you count to twenty?",
              "exKh": "តើអ្នកអាចរាប់ដល់ម្ភៃបានទេ?"
            }
          ],
          "sentences": [
            {
              "en": "There are thirty students in our class.",
              "kh": "មានសិស្សចំនួនសាមសិបនាក់ក្នុងថ្នាក់របស់យើង។"
            },
            {
              "en": "I have twelve colored pencils in my pencil case.",
              "kh": "ខ្ញុំមានខ្មៅដៃពណ៌ចំនួនដប់ពីរដើមក្នុងប្រអប់ខ្មៅដៃរបស់ខ្ញុំ។"
            },
            {
              "en": "How many books are there? There are fifteen books.",
              "kh": "តើមានសៀវភៅប៉ុន្មានក្បាលនៅទីនោះ? មានសៀវភៅដប់ប្រាំក្បាល។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Can you count the chairs in our classroom?",
              "kh": "តើកូនអាចរាប់កៅអីក្នុងបន្ទប់រៀនរបស់យើងបានទេ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher! One, two, three... twenty-four chairs in total!",
              "kh": "ចាសអ្នកគ្រូ! មួយ ពីរ បី... សរុបទាំងអស់មានម្ភៃបួនកៅអី!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Excellent counting! That is very accurate.",
              "kh": "ការរាប់ពូកែណាស់! ត្រឹមត្រូវល្អឥតខ្ចោះ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 9\n🎯 ប្រធានបទ៖ លេខរាប់ពី ១ ដល់ ១០០ និងការរាប់វត្ថុប្រចាំថ្ងៃ (Numbers 1-100 & Counting Everyday Items)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nលេខរាប់ភាសាអង់គ្លេសពី ១ ដល់ ១០០៖\n• 1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten\n• 11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty\n• 30, 40, 50, 60, 70, 80, 90, 100: Thirty, Forty, Fifty, Sixty, Seventy, Eighty, Ninety, One hundred\n• សំណួររាប់ចំនួន៖ \"How many + plural noun + are there?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 twenty (/ˈtwenti/) = 🇰🇭 ម្ភៃ (20)\n   ↳ ឧទាហរណ៍៖ There are twenty students.\n   ↳ បកប្រែ៖ (មានសិស្សចំនួនម្ភៃនាក់។)\n\n2. 🇬🇧 fifty (/ˈfɪfti/) = 🇰🇭 ហាសិប (50)\n   ↳ ឧទាហរណ៍៖ This book has fifty pages.\n   ↳ បកប្រែ៖ (សៀវភៅនេះមានហាសិបទំព័រ។)\n\n3. 🇬🇧 hundred (/ˈhʌndrəd/) = 🇰🇭 មួយរយ (100)\n   ↳ ឧទាហរណ៍៖ One hundred percent score!\n   ↳ បកប្រែ៖ (ពិន្ទុមួយរយភាគរយពេញ!)\n\n4. 🇬🇧 count (/kaʊnt/) = 🇰🇭 រាប់\n   ↳ ឧទាហរណ៍៖ Can you count to twenty?\n   ↳ បកប្រែ៖ (តើអ្នកអាចរាប់ដល់ម្ភៃបានទេ?)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 There are thirty students in our class.\n   🇰🇭 (មានសិស្សចំនួនសាមសិបនាក់ក្នុងថ្នាក់របស់យើង។)\n2. 🇬🇧 I have twelve colored pencils in my pencil case.\n   🇰🇭 (ខ្ញុំមានខ្មៅដៃពណ៌ចំនួនដប់ពីរដើមក្នុងប្រអប់ខ្មៅដៃរបស់ខ្ញុំ។)\n3. 🇬🇧 How many books are there? There are fifteen books.\n   🇰🇭 (តើមានសៀវភៅប៉ុន្មានក្បាលនៅទីនោះ? មានសៀវភៅដប់ប្រាំក្បាល។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Can you count the chairs in our classroom?\"\n   🇰🇭 (តើកូនអាចរាប់កៅអីក្នុងបន្ទប់រៀនរបស់យើងបានទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher! One, two, three... twenty-four chairs in total!\"\n   🇰🇭 (ចាសអ្នកគ្រូ! មួយ ពីរ បី... សរុបទាំងអស់មានម្ភៃបួនកៅអី!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Excellent counting! That is very accurate.\"\n   🇰🇭 (ការរាប់ពូកែណាស់! ត្រឹមត្រូវល្អឥតខ្ចោះ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el10",
          "day": 10,
          "title": "ថ្ងៃទី 10៖ ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful) (Colors and Adjectives for Objects (Big, Small, New, Old))",
          "topic": "ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful)",
          "grammar": "ទីតាំងនៃគុណនាម (Adjectives) ក្នុងភាសាអង់គ្លេស៖\n១. នៅពីមុខនាម៖ [Adjective + Noun]\n• a red car (ឡានពណ៌ក្រហម)\n• a big house (ផ្ទះធំមួយ)\n• a new computer (កុំព្យូទ័រថ្មីមួយ)\n២. នៅក្រោយកិរិយាសព្ទ To Be: [Subject + To Be + Adjective]\n• The car is red. (ឡាននោះមានពណ៌ក្រហម)\n• My school bag is new and blue.",
          "vocab": [
            {
              "en": "big",
              "kh": "ធំ",
              "ipa": "/bɪɡ/",
              "exEn": "An elephant is big.",
              "exKh": "សត្វដំរីមានមាឌធំ។"
            },
            {
              "en": "small",
              "kh": "តូច",
              "ipa": "/smɔːl/",
              "exEn": "An ant is very small.",
              "exKh": "សត្វស្រមោចមានមាឌតូចខ្លាំងណាស់។"
            },
            {
              "en": "new",
              "kh": "ថ្មី",
              "ipa": "/njuː/",
              "exEn": "I wear new shoes today.",
              "exKh": "ខ្ញុំពាក់ស្បែកជើងថ្មីថ្ងៃនេះ។"
            },
            {
              "en": "old",
              "kh": "ចាស់ / បុរាណ",
              "ipa": "/əʊld/",
              "exEn": "This temple is very old.",
              "exKh": "ប្រាសាទនេះមានអាយុកាលចាស់ណាស់។"
            },
            {
              "en": "beautiful",
              "kh": "ស្រស់ស្អាត",
              "ipa": "/ˈbjuːtɪfl/",
              "exEn": "The lotus flower is beautiful.",
              "exKh": "ផ្កាឈូកពិតជាស្រស់ស្អាតណាស់។"
            }
          ],
          "sentences": [
            {
              "en": "I have a big red notebook.",
              "kh": "ខ្ញុំមានសៀវភៅកត់ត្រាធំពណ៌ក្រហមមួយក្បាល។"
            },
            {
              "en": "She wears a beautiful blue dress.",
              "kh": "នាងពាក់រ៉ូបពណ៌ខៀវដ៏ស្រស់ស្អាតមួយ។"
            },
            {
              "en": "This old bicycle belongs to my grandfather.",
              "kh": "កង់ចាស់នេះជារបស់លោកតារបស់ខ្ញុំ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Describe your favorite bag to the class.",
              "kh": "ចូរពណ៌នាកាតាបដែលកូនចូលចិត្តប្រាប់មិត្តរួមថ្នាក់។"
            },
            {
              "speaker": "Student",
              "en": "My bag is small, yellow, and very light. I love it!",
              "kh": "កាតាបរបស់ខ្ញុំតូច ពណ៌លឿង និងស្រាលណាស់។ ខ្ញុំស្រឡាញ់វា!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "What a lovely description! You used adjectives very well.",
              "kh": "ការពណ៌នាពិតជាគួរឱ្យស្រឡាញ់! កូនប្រើគុណនាមបានល្អណាស់។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 10\n🎯 ប្រធានបទ៖ ពណ៌ និងគុណនាមពណ៌នាវត្ថុ (Big, Small, New, Old, Beautiful) (Colors and Adjectives for Objects (Big, Small, New, Old))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nទីតាំងនៃគុណនាម (Adjectives) ក្នុងភាសាអង់គ្លេស៖\n១. នៅពីមុខនាម៖ [Adjective + Noun]\n• a red car (ឡានពណ៌ក្រហម)\n• a big house (ផ្ទះធំមួយ)\n• a new computer (កុំព្យូទ័រថ្មីមួយ)\n២. នៅក្រោយកិរិយាសព្ទ To Be: [Subject + To Be + Adjective]\n• The car is red. (ឡាននោះមានពណ៌ក្រហម)\n• My school bag is new and blue.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 big (/bɪɡ/) = 🇰🇭 ធំ\n   ↳ ឧទាហរណ៍៖ An elephant is big.\n   ↳ បកប្រែ៖ (សត្វដំរីមានមាឌធំ។)\n\n2. 🇬🇧 small (/smɔːl/) = 🇰🇭 តូច\n   ↳ ឧទាហរណ៍៖ An ant is very small.\n   ↳ បកប្រែ៖ (សត្វស្រមោចមានមាឌតូចខ្លាំងណាស់។)\n\n3. 🇬🇧 new (/njuː/) = 🇰🇭 ថ្មី\n   ↳ ឧទាហរណ៍៖ I wear new shoes today.\n   ↳ បកប្រែ៖ (ខ្ញុំពាក់ស្បែកជើងថ្មីថ្ងៃនេះ។)\n\n4. 🇬🇧 old (/əʊld/) = 🇰🇭 ចាស់ / បុរាណ\n   ↳ ឧទាហរណ៍៖ This temple is very old.\n   ↳ បកប្រែ៖ (ប្រាសាទនេះមានអាយុកាលចាស់ណាស់។)\n\n5. 🇬🇧 beautiful (/ˈbjuːtɪfl/) = 🇰🇭 ស្រស់ស្អាត\n   ↳ ឧទាហរណ៍៖ The lotus flower is beautiful.\n   ↳ បកប្រែ៖ (ផ្កាឈូកពិតជាស្រស់ស្អាតណាស់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a big red notebook.\n   🇰🇭 (ខ្ញុំមានសៀវភៅកត់ត្រាធំពណ៌ក្រហមមួយក្បាល។)\n2. 🇬🇧 She wears a beautiful blue dress.\n   🇰🇭 (នាងពាក់រ៉ូបពណ៌ខៀវដ៏ស្រស់ស្អាតមួយ។)\n3. 🇬🇧 This old bicycle belongs to my grandfather.\n   🇰🇭 (កង់ចាស់នេះជារបស់លោកតារបស់ខ្ញុំ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Describe your favorite bag to the class.\"\n   🇰🇭 (ចូរពណ៌នាកាតាបដែលកូនចូលចិត្តប្រាប់មិត្តរួមថ្នាក់។)\n\n👤 Student:\n   🇬🇧 \"My bag is small, yellow, and very light. I love it!\"\n   🇰🇭 (កាតាបរបស់ខ្ញុំតូច ពណ៌លឿង និងស្រាលណាស់។ ខ្ញុំស្រឡាញ់វា!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"What a lovely description! You used adjectives very well.\"\n   🇰🇭 (ការពណ៌នាពិតជាគួរឱ្យស្រឡាញ់! កូនប្រើគុណនាមបានល្អណាស់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el11",
          "day": 11,
          "title": "ថ្ងៃទី 11៖ ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind) (Basic Prepositions of Place (In, On, Under, Next to, Behind))",
          "topic": "ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind)",
          "grammar": "ធ្នាក់បញ្ជាក់ទីកន្លែង (Prepositions of Place) ប្រើដើម្បីប្រាប់ពីទីតាំងរបស់មនុស្ស សត្វ ឬវត្ថុ៖\n• in = នៅក្នុង (in the box, in the room)\n• on = នៅលើ (on the table, on the wall)\n• under = នៅក្រោម (under the chair, under the bed)\n• next to = នៅក្បែរ/នៅជាប់ (next to the window)\n• behind = នៅខាងក្រោយ (behind the door)\n• in front of = នៅខាងមុខ (in front of the board)\nសំណួរសួរទីតាំង៖ \"Where is + noun?\"",
          "vocab": [
            {
              "en": "in",
              "kh": "នៅក្នុង",
              "ipa": "/ɪn/",
              "exEn": "The pencil is in the bag.",
              "exKh": "ខ្មៅដៃនៅក្នុងកាតាប។"
            },
            {
              "en": "on",
              "kh": "នៅលើ",
              "ipa": "/ɒn/",
              "exEn": "The book is on the table.",
              "exKh": "សៀវភៅនៅលើតុ។"
            },
            {
              "en": "under",
              "kh": "នៅក្រោម",
              "ipa": "/ˈʌndər/",
              "exEn": "The cat sleeps under the bed.",
              "exKh": "ឆ្មាគេងនៅក្រោមក្តារគ្រែ។"
            },
            {
              "en": "next to",
              "kh": "នៅក្បែរ / នៅជាប់",
              "ipa": "/ˈnekst tuː/",
              "exEn": "Sit next to your friend.",
              "exKh": "អង្គុយនៅក្បែរមិត្តរបស់អ្នក។"
            },
            {
              "en": "behind",
              "kh": "នៅខាងក្រោយ",
              "ipa": "/bɪˈhaɪnd/",
              "exEn": "The sun hides behind clouds.",
              "exKh": "ព្រះអាទិត្យពួននៅក្រោយពពក។"
            }
          ],
          "sentences": [
            {
              "en": "My English book is on the desk.",
              "kh": "សៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំនៅលើតុរៀន។"
            },
            {
              "en": "The ruler is inside the pencil case.",
              "kh": "បន្ទាត់គឺនៅក្នុងប្រអប់ខ្មៅដៃ។"
            },
            {
              "en": "Where is the cat? The cat is under the chair.",
              "kh": "តើឆ្មានៅឯណា? ឆ្មានៅក្រោមកៅអី។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Where is your ruler, Bopha?",
              "kh": "បុប្ផា តើបន្ទាត់របស់កូននៅឯណាដែរ?"
            },
            {
              "speaker": "Student",
              "en": "It is on my desk, next to my blue pen, Teacher.",
              "kh": "វាគឺនៅលើតុរៀនរបស់ខ្ញុំ នៅក្បែរប៊ិចខៀវអ្នកគ្រូ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Very neat! Keeping your desk organized helps you learn better.",
              "kh": "រៀបចំបានស្អាតណាស់! ការទុកដាក់តុឱ្យមានរបៀបជួយឱ្យរៀនពូកែ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 11\n🎯 ប្រធានបទ៖ ធ្នាក់បញ្ជាក់ទីកន្លែង Prepositions of Place (In, On, Under, Next to, Behind) (Basic Prepositions of Place (In, On, Under, Next to, Behind))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nធ្នាក់បញ្ជាក់ទីកន្លែង (Prepositions of Place) ប្រើដើម្បីប្រាប់ពីទីតាំងរបស់មនុស្ស សត្វ ឬវត្ថុ៖\n• in = នៅក្នុង (in the box, in the room)\n• on = នៅលើ (on the table, on the wall)\n• under = នៅក្រោម (under the chair, under the bed)\n• next to = នៅក្បែរ/នៅជាប់ (next to the window)\n• behind = នៅខាងក្រោយ (behind the door)\n• in front of = នៅខាងមុខ (in front of the board)\nសំណួរសួរទីតាំង៖ \"Where is + noun?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 in (/ɪn/) = 🇰🇭 នៅក្នុង\n   ↳ ឧទាហរណ៍៖ The pencil is in the bag.\n   ↳ បកប្រែ៖ (ខ្មៅដៃនៅក្នុងកាតាប។)\n\n2. 🇬🇧 on (/ɒn/) = 🇰🇭 នៅលើ\n   ↳ ឧទាហរណ៍៖ The book is on the table.\n   ↳ បកប្រែ៖ (សៀវភៅនៅលើតុ។)\n\n3. 🇬🇧 under (/ˈʌndər/) = 🇰🇭 នៅក្រោម\n   ↳ ឧទាហរណ៍៖ The cat sleeps under the bed.\n   ↳ បកប្រែ៖ (ឆ្មាគេងនៅក្រោមក្តារគ្រែ។)\n\n4. 🇬🇧 next to (/ˈnekst tuː/) = 🇰🇭 នៅក្បែរ / នៅជាប់\n   ↳ ឧទាហរណ៍៖ Sit next to your friend.\n   ↳ បកប្រែ៖ (អង្គុយនៅក្បែរមិត្តរបស់អ្នក។)\n\n5. 🇬🇧 behind (/bɪˈhaɪnd/) = 🇰🇭 នៅខាងក្រោយ\n   ↳ ឧទាហរណ៍៖ The sun hides behind clouds.\n   ↳ បកប្រែ៖ (ព្រះអាទិត្យពួននៅក្រោយពពក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 My English book is on the desk.\n   🇰🇭 (សៀវភៅភាសាអង់គ្លេសរបស់ខ្ញុំនៅលើតុរៀន។)\n2. 🇬🇧 The ruler is inside the pencil case.\n   🇰🇭 (បន្ទាត់គឺនៅក្នុងប្រអប់ខ្មៅដៃ។)\n3. 🇬🇧 Where is the cat? The cat is under the chair.\n   🇰🇭 (តើឆ្មានៅឯណា? ឆ្មានៅក្រោមកៅអី។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Where is your ruler, Bopha?\"\n   🇰🇭 (បុប្ផា តើបន្ទាត់របស់កូននៅឯណាដែរ?)\n\n👤 Student:\n   🇬🇧 \"It is on my desk, next to my blue pen, Teacher.\"\n   🇰🇭 (វាគឺនៅលើតុរៀនរបស់ខ្ញុំ នៅក្បែរប៊ិចខៀវអ្នកគ្រូ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Very neat! Keeping your desk organized helps you learn better.\"\n   🇰🇭 (រៀបចំបានស្អាតណាស់! ការទុកដាក់តុឱ្យមានរបៀបជួយឱ្យរៀនពូកែ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el12",
          "day": 12,
          "title": "ថ្ងៃទី 12៖ រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ (Weekly Review & Conversation: Where is My Pen? (Finding Things))",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ",
          "grammar": "រំលឹកសរុបសប្តាហ៍ទី ២៖\n១. Demonstratives: This, That, These, Those\n២. Plural Nouns: -s, -es, -ies\n៣. Numbers 1-100 & Counting: How many... are there?\n៤. Adjectives & Colors: a big blue bag\n៥. Prepositions: in, on, under, next to, behind\n៦. Pattern សួររកវត្ថុ៖ \"Where is my...?\" / \"Where are my...?\"",
          "vocab": [
            {
              "en": "search",
              "kh": "ស្វែងរក",
              "ipa": "/sɜːtʃ/",
              "exEn": "I search for my glasses.",
              "exKh": "ខ្ញុំស្វែងរកវ៉ែនតារបស់ខ្ញុំ។"
            },
            {
              "en": "find",
              "kh": "រកឃើញ",
              "ipa": "/faɪnd/",
              "exEn": "I can find my shoes.",
              "exKh": "ខ្ញុំអាចរកឃើញស្បែកជើងរបស់ខ្ញុំ។"
            },
            {
              "en": "lose",
              "kh": "បាត់បង់",
              "ipa": "/luːz/",
              "exEn": "Do not lose your keys.",
              "exKh": "កុំឱ្យបាត់កូនសោរបស់អ្នកឱ្យសោះ។"
            }
          ],
          "sentences": [
            {
              "en": "Where is my red pen? It is under the notebook.",
              "kh": "តើប៊ិចក្រហមខ្ញុំនៅឯណា? វានៅក្រោមកូនសៀវភៅ។"
            },
            {
              "en": "Where are my glasses? They are on your head!",
              "kh": "តើវ៉ែនតាខ្ញុំនៅឯណា? វានៅលើក្បាលរបស់អ្នកតើ!"
            },
            {
              "en": "These five pencils are on the wooden desk.",
              "kh": "ខ្មៅដៃទាំងប្រាំដើមនេះគឺនៅលើតុឈើ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Dara, you look worried. What are you looking for?",
              "kh": "ដារ៉ា កូនមើលទៅដូចជាបារម្ភ។ តើកូនកំពុងរកអ្វីហ្នឹង?"
            },
            {
              "speaker": "Student",
              "en": "Teacher, where is my English workbook? I cannot find it.",
              "kh": "អ្នកគ្រូ តើសៀវភៅលំហាត់អង់គ្លេសខ្ញុំនៅឯណា? ខ្ញុំរកវាមិនឃើញសោះ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Look under your chair! Oh, here it is, behind your bag.",
              "kh": "មើលក្រោមអីកូន! អូ នៅទីនេះតើ នៅពីក្រោយកាតាបកូន។"
            },
            {
              "speaker": "Student",
              "en": "Oh, thank you so much, Teacher Piseth! I found it!",
              "kh": "អូ អរគុណច្រើនណាស់អ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរកឃើញហើយ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 2 • ថ្ងៃទី 12\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ២ និងការសន្ទនាសួររករបស់របរ (Weekly Review & Conversation: Where is My Pen? (Finding Things))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nរំលឹកសរុបសប្តាហ៍ទី ២៖\n១. Demonstratives: This, That, These, Those\n២. Plural Nouns: -s, -es, -ies\n៣. Numbers 1-100 & Counting: How many... are there?\n៤. Adjectives & Colors: a big blue bag\n៥. Prepositions: in, on, under, next to, behind\n៦. Pattern សួររកវត្ថុ៖ \"Where is my...?\" / \"Where are my...?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 search (/sɜːtʃ/) = 🇰🇭 ស្វែងរក\n   ↳ ឧទាហរណ៍៖ I search for my glasses.\n   ↳ បកប្រែ៖ (ខ្ញុំស្វែងរកវ៉ែនតារបស់ខ្ញុំ។)\n\n2. 🇬🇧 find (/faɪnd/) = 🇰🇭 រកឃើញ\n   ↳ ឧទាហរណ៍៖ I can find my shoes.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចរកឃើញស្បែកជើងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 lose (/luːz/) = 🇰🇭 បាត់បង់\n   ↳ ឧទាហរណ៍៖ Do not lose your keys.\n   ↳ បកប្រែ៖ (កុំឱ្យបាត់កូនសោរបស់អ្នកឱ្យសោះ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 Where is my red pen? It is under the notebook.\n   🇰🇭 (តើប៊ិចក្រហមខ្ញុំនៅឯណា? វានៅក្រោមកូនសៀវភៅ។)\n2. 🇬🇧 Where are my glasses? They are on your head!\n   🇰🇭 (តើវ៉ែនតាខ្ញុំនៅឯណា? វានៅលើក្បាលរបស់អ្នកតើ!)\n3. 🇬🇧 These five pencils are on the wooden desk.\n   🇰🇭 (ខ្មៅដៃទាំងប្រាំដើមនេះគឺនៅលើតុឈើ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Dara, you look worried. What are you looking for?\"\n   🇰🇭 (ដារ៉ា កូនមើលទៅដូចជាបារម្ភ។ តើកូនកំពុងរកអ្វីហ្នឹង?)\n\n👤 Student:\n   🇬🇧 \"Teacher, where is my English workbook? I cannot find it.\"\n   🇰🇭 (អ្នកគ្រូ តើសៀវភៅលំហាត់អង់គ្លេសខ្ញុំនៅឯណា? ខ្ញុំរកវាមិនឃើញសោះ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Look under your chair! Oh, here it is, behind your bag.\"\n   🇰🇭 (មើលក្រោមអីកូន! អូ នៅទីនេះតើ នៅពីក្រោយកាតាបកូន។)\n\n👤 Student:\n   🇬🇧 \"Oh, thank you so much, Teacher Piseth! I found it!\"\n   🇰🇭 (អូ អរគុណច្រើនណាស់អ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរកឃើញហើយ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew3",
      "weekNum": 3,
      "monthWeekNum": 3,
      "title": "សប្តាហ៍ទី 3 (ថ្ងៃទី 13 - 18)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 3 ខែទី 1",
      "lessons": [
        {
          "id": "el13",
          "day": 13,
          "title": "ថ្ងៃទី 13៖ សមាជិកគ្រួសារ Family Members (Family Members (Father, Mother, Brother, Sister, Parents))",
          "topic": "សមាជិកគ្រួសារ Family Members",
          "grammar": "វាក្យសព្ទគ្រួសារ និងការប្រើ Possessive 's (បង្ហាញភាពជាម្ចាស់)៖\n• My father's car = ឡានរបស់ឪពុកខ្ញុំ\n• My sister's name = ឈ្មោះរបស់ប្អូនស្រីខ្ញុំ\nសមាជិកគ្រួសារសំខាន់ៗ៖\n• Parents = ឪពុកម្តាយ\n• Father / Dad = ឪពុក\n• Mother / Mom = ម្តាយ\n• Brother = បងប្រុស/ប្អូនប្រុស\n• Sister = បងស្រី/ប្អូនស្រី\n• Grandparents = ជីដូនជីតា (Grandfather, Grandmother)",
          "vocab": [
            {
              "en": "father",
              "kh": "ឪពុក",
              "ipa": "/ˈfɑːðər/",
              "exEn": "My father is a kind farmer.",
              "exKh": "ឪពុករបស់ខ្ញុំជាកសិករចិត្តល្អម្នាក់។"
            },
            {
              "en": "mother",
              "kh": "ម្តាយ",
              "ipa": "/ˈmʌðər/",
              "exEn": "My mother cooks delicious food.",
              "exKh": "ម្តាយរបស់ខ្ញុំចម្អិនម្ហូបឆ្ងាញ់ណាស់។"
            },
            {
              "en": "brother",
              "kh": "បង/ប្អូនប្រុស",
              "ipa": "/ˈbrʌðər/",
              "exEn": "My brother plays soccer.",
              "exKh": "បងប្រុសរបស់ខ្ញុំលេងបាល់ទាត់។"
            },
            {
              "en": "sister",
              "kh": "បង/ប្អូនស្រី",
              "ipa": "/ˈsɪstər/",
              "exEn": "My sister likes reading books.",
              "exKh": "ប្អូនស្រីរបស់ខ្ញុំចូលចិត្តអានសៀវភៅ។"
            },
            {
              "en": "parents",
              "kh": "ឪពុកម្តាយ",
              "ipa": "/ˈpeərənts/",
              "exEn": "I love my parents deeply.",
              "exKh": "ខ្ញុំស្រឡាញ់ឪពុកម្តាយខ្ញុំយ៉ាងជ្រាលជ្រៅ។"
            }
          ],
          "sentences": [
            {
              "en": "There are five people in my family.",
              "kh": "មានសមាជិកប្រាំនាក់ក្នុងគ្រួសាររបស់ខ្ញុំ។"
            },
            {
              "en": "My mother is thirty-eight years old.",
              "kh": "ម្តាយរបស់ខ្ញុំមានអាយុសាមសិបប្រាំបីឆ្នាំ។"
            },
            {
              "en": "My brother and I help our parents every weekend.",
              "kh": "បងប្រុសខ្ញុំ និងខ្ញុំជួយឪពុកម្តាយរៀងរាល់ចុងសប្តាហ៍។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "How many people are there in your family, Sophea?",
              "kh": "សុភា តើមានសមាជិកប៉ុន្មាននាក់ក្នុងគ្រួសារកូន?"
            },
            {
              "speaker": "Student",
              "en": "There are four people: my father, my mother, my little brother, and me.",
              "kh": "មានបួននាក់អ្នកគ្រូ: ឪពុក ម្តាយ ប្អូនប្រុសតូច និងខ្ញុំ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "What a sweet family! Do you love your brother?",
              "kh": "គ្រួសារគួរឱ្យស្រឡាញ់ណាស់! តើកូនស្រឡាញ់ប្អូនប្រុសទេ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, I love him very much! We play together every day.",
              "kh": "ចាស ខ្ញុំស្រឡាញ់គាត់ខ្លាំងណាស់! ពួកយើងលេងជាមួយគ្នារាល់ថ្ងៃ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 13\n🎯 ប្រធានបទ៖ សមាជិកគ្រួសារ Family Members (Family Members (Father, Mother, Brother, Sister, Parents))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nវាក្យសព្ទគ្រួសារ និងការប្រើ Possessive 's (បង្ហាញភាពជាម្ចាស់)៖\n• My father's car = ឡានរបស់ឪពុកខ្ញុំ\n• My sister's name = ឈ្មោះរបស់ប្អូនស្រីខ្ញុំ\nសមាជិកគ្រួសារសំខាន់ៗ៖\n• Parents = ឪពុកម្តាយ\n• Father / Dad = ឪពុក\n• Mother / Mom = ម្តាយ\n• Brother = បងប្រុស/ប្អូនប្រុស\n• Sister = បងស្រី/ប្អូនស្រី\n• Grandparents = ជីដូនជីតា (Grandfather, Grandmother)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 father (/ˈfɑːðər/) = 🇰🇭 ឪពុក\n   ↳ ឧទាហរណ៍៖ My father is a kind farmer.\n   ↳ បកប្រែ៖ (ឪពុករបស់ខ្ញុំជាកសិករចិត្តល្អម្នាក់។)\n\n2. 🇬🇧 mother (/ˈmʌðər/) = 🇰🇭 ម្តាយ\n   ↳ ឧទាហរណ៍៖ My mother cooks delicious food.\n   ↳ បកប្រែ៖ (ម្តាយរបស់ខ្ញុំចម្អិនម្ហូបឆ្ងាញ់ណាស់។)\n\n3. 🇬🇧 brother (/ˈbrʌðər/) = 🇰🇭 បង/ប្អូនប្រុស\n   ↳ ឧទាហរណ៍៖ My brother plays soccer.\n   ↳ បកប្រែ៖ (បងប្រុសរបស់ខ្ញុំលេងបាល់ទាត់។)\n\n4. 🇬🇧 sister (/ˈsɪstər/) = 🇰🇭 បង/ប្អូនស្រី\n   ↳ ឧទាហរណ៍៖ My sister likes reading books.\n   ↳ បកប្រែ៖ (ប្អូនស្រីរបស់ខ្ញុំចូលចិត្តអានសៀវភៅ។)\n\n5. 🇬🇧 parents (/ˈpeərənts/) = 🇰🇭 ឪពុកម្តាយ\n   ↳ ឧទាហរណ៍៖ I love my parents deeply.\n   ↳ បកប្រែ៖ (ខ្ញុំស្រឡាញ់ឪពុកម្តាយខ្ញុំយ៉ាងជ្រាលជ្រៅ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 There are five people in my family.\n   🇰🇭 (មានសមាជិកប្រាំនាក់ក្នុងគ្រួសាររបស់ខ្ញុំ។)\n2. 🇬🇧 My mother is thirty-eight years old.\n   🇰🇭 (ម្តាយរបស់ខ្ញុំមានអាយុសាមសិបប្រាំបីឆ្នាំ។)\n3. 🇬🇧 My brother and I help our parents every weekend.\n   🇰🇭 (បងប្រុសខ្ញុំ និងខ្ញុំជួយឪពុកម្តាយរៀងរាល់ចុងសប្តាហ៍។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How many people are there in your family, Sophea?\"\n   🇰🇭 (សុភា តើមានសមាជិកប៉ុន្មាននាក់ក្នុងគ្រួសារកូន?)\n\n👤 Student:\n   🇬🇧 \"There are four people: my father, my mother, my little brother, and me.\"\n   🇰🇭 (មានបួននាក់អ្នកគ្រូ: ឪពុក ម្តាយ ប្អូនប្រុសតូច និងខ្ញុំ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"What a sweet family! Do you love your brother?\"\n   🇰🇭 (គ្រួសារគួរឱ្យស្រឡាញ់ណាស់! តើកូនស្រឡាញ់ប្អូនប្រុសទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, I love him very much! We play together every day.\"\n   🇰🇭 (ចាស ខ្ញុំស្រឡាញ់គាត់ខ្លាំងណាស់! ពួកយើងលេងជាមួយគ្នារាល់ថ្ងៃ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el14",
          "day": 14,
          "title": "ថ្ងៃទី 14៖ កិរិយាសព្ទ To Have (មាន / មិនមាន) (Verb To Have (Have / Has, Don't have / Doesn't have))",
          "topic": "កិរិយាសព្ទ To Have (មាន / មិនមាន)",
          "grammar": "កិរិយាសព្ទ \"To Have\" ប្រែថា \"មាន\"៖\n១. ទម្រង់ស្រប (Affirmative):\n• I / You / We / They + HAVE (I have a dog. They have a big garden.)\n• He / She / It + HAS (He has a bicycle. She has long hair.)\n២. ទម្រង់បដិសេធ (Negative):\n• I / You / We / They + DON'T HAVE... (We don't have a car.)\n• He / She / It + DOESN'T HAVE... (He doesn't have a watch.)\n៣. ទម្រង់សំណួរ (Question):\n• Do you have...? -> Yes, I do. / No, I don't.\n• Does he have...? -> Yes, he does. / No, he doesn't.",
          "vocab": [
            {
              "en": "have",
              "kh": "មាន (ប្រើជាមួយ I/You/We/They)",
              "ipa": "/hæv/",
              "exEn": "I have two brothers.",
              "exKh": "ខ្ញុំមានបងប្អូនប្រុសពីរនាក់។"
            },
            {
              "en": "has",
              "kh": "មាន (ប្រើជាមួយ He/She/It)",
              "ipa": "/hæz/",
              "exEn": "She has a lovely kitten.",
              "exKh": "នាងមានកូនឆ្មាគួរឱ្យស្រឡាញ់មួយក្បាល។"
            },
            {
              "en": "don't have",
              "kh": "គ្មាន / មិនមាន",
              "ipa": "/doʊnt hæv/",
              "exEn": "We don't have homework today.",
              "exKh": "ពួកយើងគ្មានកិច្ចការផ្ទះទេថ្ងៃនេះ។"
            },
            {
              "en": "doesn't have",
              "kh": "គ្មាន / មិនមាន (He/She/It)",
              "ipa": "/ˈdʌznt hæv/",
              "exEn": "He doesn't have a motorbike.",
              "exKh": "គាត់គ្មានម៉ូតូជិះទេ។"
            }
          ],
          "sentences": [
            {
              "en": "I have a new English dictionary.",
              "kh": "ខ្ញុំមានវចនានុក្រមភាសាអង់គ្លេសថ្មីមួយក្បាល។"
            },
            {
              "en": "She has two younger sisters and one older brother.",
              "kh": "នាងមានប្អូនស្រីពីរនាក់ និងបងប្រុសម្នាក់។"
            },
            {
              "en": "Do you have any pets at home? Yes, I have a cat.",
              "kh": "តើអ្នកមានសត្វចិញ្ចឹមនៅផ្ទះទេ? បាទ ខ្ញុំមានឆ្មាមួយក្បាល។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Do you have an English-Khmer dictionary, Rith?",
              "kh": "រិទ្ធ តើកូនមានវចនានុក្រមអង់គ្លេស-ខ្មែរទេ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, I do! I have a big dictionary on my bookshelf.",
              "kh": "បាទអ្នកគ្រូ ខ្ញុំមាន! ខ្ញុំមានវចនានុក្រមធំមួយនៅលើធ្នើរសៀវភៅ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "That is wonderful! A dictionary is a student's best friend.",
              "kh": "ពិតជាអស្ចារ្យណាស់! វចនានុក្រមគឺជាមិត្តល្អបំផុតរបស់សិស្ស។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 14\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ To Have (មាន / មិនមាន) (Verb To Have (Have / Has, Don't have / Doesn't have))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទ \"To Have\" ប្រែថា \"មាន\"៖\n១. ទម្រង់ស្រប (Affirmative):\n• I / You / We / They + HAVE (I have a dog. They have a big garden.)\n• He / She / It + HAS (He has a bicycle. She has long hair.)\n២. ទម្រង់បដិសេធ (Negative):\n• I / You / We / They + DON'T HAVE... (We don't have a car.)\n• He / She / It + DOESN'T HAVE... (He doesn't have a watch.)\n៣. ទម្រង់សំណួរ (Question):\n• Do you have...? -> Yes, I do. / No, I don't.\n• Does he have...? -> Yes, he does. / No, he doesn't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 have (/hæv/) = 🇰🇭 មាន (ប្រើជាមួយ I/You/We/They)\n   ↳ ឧទាហរណ៍៖ I have two brothers.\n   ↳ បកប្រែ៖ (ខ្ញុំមានបងប្អូនប្រុសពីរនាក់។)\n\n2. 🇬🇧 has (/hæz/) = 🇰🇭 មាន (ប្រើជាមួយ He/She/It)\n   ↳ ឧទាហរណ៍៖ She has a lovely kitten.\n   ↳ បកប្រែ៖ (នាងមានកូនឆ្មាគួរឱ្យស្រឡាញ់មួយក្បាល។)\n\n3. 🇬🇧 don't have (/doʊnt hæv/) = 🇰🇭 គ្មាន / មិនមាន\n   ↳ ឧទាហរណ៍៖ We don't have homework today.\n   ↳ បកប្រែ៖ (ពួកយើងគ្មានកិច្ចការផ្ទះទេថ្ងៃនេះ។)\n\n4. 🇬🇧 doesn't have (/ˈdʌznt hæv/) = 🇰🇭 គ្មាន / មិនមាន (He/She/It)\n   ↳ ឧទាហរណ៍៖ He doesn't have a motorbike.\n   ↳ បកប្រែ៖ (គាត់គ្មានម៉ូតូជិះទេ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a new English dictionary.\n   🇰🇭 (ខ្ញុំមានវចនានុក្រមភាសាអង់គ្លេសថ្មីមួយក្បាល។)\n2. 🇬🇧 She has two younger sisters and one older brother.\n   🇰🇭 (នាងមានប្អូនស្រីពីរនាក់ និងបងប្រុសម្នាក់។)\n3. 🇬🇧 Do you have any pets at home? Yes, I have a cat.\n   🇰🇭 (តើអ្នកមានសត្វចិញ្ចឹមនៅផ្ទះទេ? បាទ ខ្ញុំមានឆ្មាមួយក្បាល។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Do you have an English-Khmer dictionary, Rith?\"\n   🇰🇭 (រិទ្ធ តើកូនមានវចនានុក្រមអង់គ្លេស-ខ្មែរទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, I do! I have a big dictionary on my bookshelf.\"\n   🇰🇭 (បាទអ្នកគ្រូ ខ្ញុំមាន! ខ្ញុំមានវចនានុក្រមធំមួយនៅលើធ្នើរសៀវភៅ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"That is wonderful! A dictionary is a student's best friend.\"\n   🇰🇭 (ពិតជាអស្ចារ្យណាស់! វចនានុក្រមគឺជាមិត្តល្អបំផុតរបស់សិស្ស។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el15",
          "day": 15,
          "title": "ថ្ងៃទី 15៖ ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish) (Describing Family & Pets (Dog, Cat, Bird, Fish))",
          "topic": "ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish)",
          "grammar": "ការរួមបញ្ចូល \"Have/Has\" និងគុណនាមដើម្បីពណ៌នាសត្វចិញ្ចឹម និងមនុស្ស៖\n• Subject + have/has + adjective + noun\nឧទាហរណ៍៖\n• I have a white cat. (ខ្ញុំមានឆ្មាពណ៌សមួយក្បាល)\n• My dog has long ears. (ឆ្កែខ្ញុំមានត្រចៀកវែង)\n• She has big black eyes. (នាងមានភ្នែកធំៗពណ៌ខ្មៅ)",
          "vocab": [
            {
              "en": "pet",
              "kh": "សត្វចិញ្ចឹម",
              "ipa": "/pet/",
              "exEn": "Do you keep any pet?",
              "exKh": "តើអ្នកមានចិញ្ចឹមសត្វទេ?"
            },
            {
              "en": "dog",
              "kh": "សត្វឆ្កែ",
              "ipa": "/dɒɡ/",
              "exEn": "My dog barks at strangers.",
              "exKh": "ឆ្កែរបស់ខ្ញុំព្រុសដាក់មនុស្សប្លែកមុខ។"
            },
            {
              "en": "cat",
              "kh": "សត្វឆ្មា",
              "ipa": "/kæt/",
              "exEn": "The cat catches mice.",
              "exKh": "ឆ្មាចាប់សត្វកណ្ដុរ។"
            },
            {
              "en": "bird",
              "kh": "សត្វបក្សី",
              "ipa": "/bɜːd/",
              "exEn": "The yellow bird sings sweetly.",
              "exKh": "សត្វបក្សីពណ៌លឿងច្រៀងពិរោះណាស់។"
            },
            {
              "en": "fish",
              "kh": "សត្វត្រី",
              "ipa": "/fɪʃ/",
              "exEn": "I have three gold fish in an aquarium.",
              "exKh": "ខ្ញុំមានត្រីមាសបីក្បាលក្នុងអាងកញ្ចក់។"
            }
          ],
          "sentences": [
            {
              "en": "I have a playful puppy named Lucky.",
              "kh": "ខ្ញុំមានកូនឆ្កែដ៏គួរឱ្យស្រឡាញ់ និងរពិសមួយក្បាលឈ្មោះ ឡាក់គី។"
            },
            {
              "en": "My sister has two fluffy white cats.",
              "kh": "ប្អូនស្រីខ្ញុំមានឆ្មារោមទន់ពណ៌សចំនួនពីរក្បាល។"
            },
            {
              "en": "We feed our fish every morning before school.",
              "kh": "ពួកយើងឱ្យចំណីត្រីរាល់ព្រឹកមុនពេលទៅសាលារៀន។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Tell me about your pets, Dara!",
              "kh": "ដារ៉ា ប្រាប់អ្នកគ្រូអំពីសត្វចិញ្ចឹមរបស់កូនបន្តិចមើល!"
            },
            {
              "speaker": "Student",
              "en": "Teacher, I have a smart brown dog. His name is Rocky!",
              "kh": "អ្នកគ្រូ ខ្ញុំមានឆ្កែពណ៌ត្នោតដ៏ឆ្លាតមួយក្បាល។ វាឈ្មោះ រ៉ក់គី!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Rocky is a strong name! What can Rocky do?",
              "kh": "រ៉ក់គី ជាឈ្មោះដ៏មាំទាំ! តើរ៉ក់គីអាចធ្វើអ្វីបានខ្លះ?"
            },
            {
              "speaker": "Student",
              "en": "He can fetch balls and run very fast!",
              "kh": "វាអាចរត់ទៅយកបាល់មកវិញ និងរត់លឿនណាស់!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 15\n🎯 ប្រធានបទ៖ ការពណ៌នាគ្រួសារ និងសត្វចិញ្ចឹម (Dog, Cat, Bird, Fish) (Describing Family & Pets (Dog, Cat, Bird, Fish))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរួមបញ្ចូល \"Have/Has\" និងគុណនាមដើម្បីពណ៌នាសត្វចិញ្ចឹម និងមនុស្ស៖\n• Subject + have/has + adjective + noun\nឧទាហរណ៍៖\n• I have a white cat. (ខ្ញុំមានឆ្មាពណ៌សមួយក្បាល)\n• My dog has long ears. (ឆ្កែខ្ញុំមានត្រចៀកវែង)\n• She has big black eyes. (នាងមានភ្នែកធំៗពណ៌ខ្មៅ)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 pet (/pet/) = 🇰🇭 សត្វចិញ្ចឹម\n   ↳ ឧទាហរណ៍៖ Do you keep any pet?\n   ↳ បកប្រែ៖ (តើអ្នកមានចិញ្ចឹមសត្វទេ?)\n\n2. 🇬🇧 dog (/dɒɡ/) = 🇰🇭 សត្វឆ្កែ\n   ↳ ឧទាហរណ៍៖ My dog barks at strangers.\n   ↳ បកប្រែ៖ (ឆ្កែរបស់ខ្ញុំព្រុសដាក់មនុស្សប្លែកមុខ។)\n\n3. 🇬🇧 cat (/kæt/) = 🇰🇭 សត្វឆ្មា\n   ↳ ឧទាហរណ៍៖ The cat catches mice.\n   ↳ បកប្រែ៖ (ឆ្មាចាប់សត្វកណ្ដុរ។)\n\n4. 🇬🇧 bird (/bɜːd/) = 🇰🇭 សត្វបក្សី\n   ↳ ឧទាហរណ៍៖ The yellow bird sings sweetly.\n   ↳ បកប្រែ៖ (សត្វបក្សីពណ៌លឿងច្រៀងពិរោះណាស់។)\n\n5. 🇬🇧 fish (/fɪʃ/) = 🇰🇭 សត្វត្រី\n   ↳ ឧទាហរណ៍៖ I have three gold fish in an aquarium.\n   ↳ បកប្រែ៖ (ខ្ញុំមានត្រីមាសបីក្បាលក្នុងអាងកញ្ចក់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a playful puppy named Lucky.\n   🇰🇭 (ខ្ញុំមានកូនឆ្កែដ៏គួរឱ្យស្រឡាញ់ និងរពិសមួយក្បាលឈ្មោះ ឡាក់គី។)\n2. 🇬🇧 My sister has two fluffy white cats.\n   🇰🇭 (ប្អូនស្រីខ្ញុំមានឆ្មារោមទន់ពណ៌សចំនួនពីរក្បាល។)\n3. 🇬🇧 We feed our fish every morning before school.\n   🇰🇭 (ពួកយើងឱ្យចំណីត្រីរាល់ព្រឹកមុនពេលទៅសាលារៀន។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Tell me about your pets, Dara!\"\n   🇰🇭 (ដារ៉ា ប្រាប់អ្នកគ្រូអំពីសត្វចិញ្ចឹមរបស់កូនបន្តិចមើល!)\n\n👤 Student:\n   🇬🇧 \"Teacher, I have a smart brown dog. His name is Rocky!\"\n   🇰🇭 (អ្នកគ្រូ ខ្ញុំមានឆ្កែពណ៌ត្នោតដ៏ឆ្លាតមួយក្បាល។ វាឈ្មោះ រ៉ក់គី!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Rocky is a strong name! What can Rocky do?\"\n   🇰🇭 (រ៉ក់គី ជាឈ្មោះដ៏មាំទាំ! តើរ៉ក់គីអាចធ្វើអ្វីបានខ្លះ?)\n\n👤 Student:\n   🇬🇧 \"He can fetch balls and run very fast!\"\n   🇰🇭 (វាអាចរត់ទៅយកបាល់មកវិញ និងរត់លឿនណាស់!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el16",
          "day": 16,
          "title": "ថ្ងៃទី 16៖ អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions (Feelings & Emotions (Happy, Sad, Tired, Hungry, Thirsty))",
          "topic": "អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions",
          "grammar": "ការបញ្ជាក់ពីអារម្មណ៍ដោយប្រើ Verb To Be ឬ Feel៖\n• I am + Adjective (I am happy, I am tired)\n• I feel + Adjective (I feel hungry, I feel thirsty)\n• He is excited / She is sad / We are proud\nសំណួរសួរអារម្មណ៍៖\n• \"How do you feel today?\" (តើអ្នកមានអារម្មណ៍យ៉ាងណាថ្ងៃនេះ?)\n• \"How are you feeling?\" -> \"I am very happy!\"",
          "vocab": [
            {
              "en": "happy",
              "kh": "សប្បាយរីករាយ",
              "ipa": "/ˈhæpi/",
              "exEn": "I am happy to pass the quiz.",
              "exKh": "ខ្ញុំសប្បាយចិត្តណាស់ដែលបានប្រឡងជាប់សំណួរតេស្ត។"
            },
            {
              "en": "sad",
              "kh": "កើតទុក្ខ / ស្រងូតស្រងាត់",
              "ipa": "/sæd/",
              "exEn": "Do not be sad, keep smiling.",
              "exKh": "កុំកើតទុក្ខអី បន្តញញឹមឡើង។"
            },
            {
              "en": "tired",
              "kh": "អស់កម្លាំង / ហត់",
              "ipa": "/ˈtaɪəd/",
              "exEn": "I feel tired after running.",
              "exKh": "ខ្ញុំមានអារម្មណ៍ហត់ក្រោយពេលរត់រួច។"
            },
            {
              "en": "hungry",
              "kh": "ឃ្លានបាយ",
              "ipa": "/ˈhʌŋɡri/",
              "exEn": "I am hungry, let us eat lunch.",
              "exKh": "ខ្ញុំឃ្លានហើយ តោះយើងញ៉ាំបាយថ្ងៃត្រង់។"
            },
            {
              "en": "thirsty",
              "kh": "ស្រេកទឹក",
              "ipa": "/ˈθɜːsti/",
              "exEn": "Drink fresh water when thirsty.",
              "exKh": "ពិសាទឹកស្អាតនៅពេលស្រេកទឹក។"
            },
            {
              "en": "excited",
              "kh": "រំភើប",
              "ipa": "/ɪkˈsaɪtɪd/",
              "exEn": "Students are excited about holiday.",
              "exKh": "សិស្សានុសិស្សរំភើបចំពោះថ្ងៃឈប់សម្រាក។"
            }
          ],
          "sentences": [
            {
              "en": "I am so excited to study English today.",
              "kh": "ខ្ញុំរំភើបខ្លាំងណាស់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះ។"
            },
            {
              "en": "Are you thirsty? Here is a cold glass of water.",
              "kh": "តើអ្នកស្រេកទឹកទេ? នេះជាទឹកត្រជាក់មួយកែវ។"
            },
            {
              "en": "He was tired, but now he is refreshed and ready.",
              "kh": "គាត់ធ្លាប់អស់កម្លាំង តែឥឡូវគាត់ស្រស់ស្រាយ និងរួចរាល់ហើយ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "How are you feeling this morning, Chenda?",
              "kh": "ចិន្តា តើកូនមានអារម្មណ៍យ៉ាងណាដែរព្រឹកនេះ?"
            },
            {
              "speaker": "Student",
              "en": "I am very happy and excited, but a little bit hungry, Teacher!",
              "kh": "ខ្ញុំសប្បាយចិត្ត និងរំភើបណាស់ តែឃ្លានបន្តិចអ្នកគ្រូ!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Haha! Don't worry, after our lesson we will have a healthy snack break!",
              "kh": "ហាៗ! កុំបារម្ភអី ចប់មេរៀនយើងនឹងមានពេលសម្រាកញ៉ាំចំណីមានជីវជាតិ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 16\n🎯 ប្រធានបទ៖ អារម្មណ៍ និងអារម្មណ៍ប្រចាំថ្ងៃ Feelings & Emotions (Feelings & Emotions (Happy, Sad, Tired, Hungry, Thirsty))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការបញ្ជាក់ពីអារម្មណ៍ដោយប្រើ Verb To Be ឬ Feel៖\n• I am + Adjective (I am happy, I am tired)\n• I feel + Adjective (I feel hungry, I feel thirsty)\n• He is excited / She is sad / We are proud\nសំណួរសួរអារម្មណ៍៖\n• \"How do you feel today?\" (តើអ្នកមានអារម្មណ៍យ៉ាងណាថ្ងៃនេះ?)\n• \"How are you feeling?\" -> \"I am very happy!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 happy (/ˈhæpi/) = 🇰🇭 សប្បាយរីករាយ\n   ↳ ឧទាហរណ៍៖ I am happy to pass the quiz.\n   ↳ បកប្រែ៖ (ខ្ញុំសប្បាយចិត្តណាស់ដែលបានប្រឡងជាប់សំណួរតេស្ត។)\n\n2. 🇬🇧 sad (/sæd/) = 🇰🇭 កើតទុក្ខ / ស្រងូតស្រងាត់\n   ↳ ឧទាហរណ៍៖ Do not be sad, keep smiling.\n   ↳ បកប្រែ៖ (កុំកើតទុក្ខអី បន្តញញឹមឡើង។)\n\n3. 🇬🇧 tired (/ˈtaɪəd/) = 🇰🇭 អស់កម្លាំង / ហត់\n   ↳ ឧទាហរណ៍៖ I feel tired after running.\n   ↳ បកប្រែ៖ (ខ្ញុំមានអារម្មណ៍ហត់ក្រោយពេលរត់រួច។)\n\n4. 🇬🇧 hungry (/ˈhʌŋɡri/) = 🇰🇭 ឃ្លានបាយ\n   ↳ ឧទាហរណ៍៖ I am hungry, let us eat lunch.\n   ↳ បកប្រែ៖ (ខ្ញុំឃ្លានហើយ តោះយើងញ៉ាំបាយថ្ងៃត្រង់។)\n\n5. 🇬🇧 thirsty (/ˈθɜːsti/) = 🇰🇭 ស្រេកទឹក\n   ↳ ឧទាហរណ៍៖ Drink fresh water when thirsty.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតនៅពេលស្រេកទឹក។)\n\n6. 🇬🇧 excited (/ɪkˈsaɪtɪd/) = 🇰🇭 រំភើប\n   ↳ ឧទាហរណ៍៖ Students are excited about holiday.\n   ↳ បកប្រែ៖ (សិស្សានុសិស្សរំភើបចំពោះថ្ងៃឈប់សម្រាក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I am so excited to study English today.\n   🇰🇭 (ខ្ញុំរំភើបខ្លាំងណាស់ក្នុងការរៀនភាសាអង់គ្លេសថ្ងៃនេះ។)\n2. 🇬🇧 Are you thirsty? Here is a cold glass of water.\n   🇰🇭 (តើអ្នកស្រេកទឹកទេ? នេះជាទឹកត្រជាក់មួយកែវ។)\n3. 🇬🇧 He was tired, but now he is refreshed and ready.\n   🇰🇭 (គាត់ធ្លាប់អស់កម្លាំង តែឥឡូវគាត់ស្រស់ស្រាយ និងរួចរាល់ហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How are you feeling this morning, Chenda?\"\n   🇰🇭 (ចិន្តា តើកូនមានអារម្មណ៍យ៉ាងណាដែរព្រឹកនេះ?)\n\n👤 Student:\n   🇬🇧 \"I am very happy and excited, but a little bit hungry, Teacher!\"\n   🇰🇭 (ខ្ញុំសប្បាយចិត្ត និងរំភើបណាស់ តែឃ្លានបន្តិចអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Haha! Don't worry, after our lesson we will have a healthy snack break!\"\n   🇰🇭 (ហាៗ! កុំបារម្ភអី ចប់មេរៀនយើងនឹងមានពេលសម្រាកញ៉ាំចំណីមានជីវជាតិ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el17",
          "day": 17,
          "title": "ថ្ងៃទី 17៖ ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ (How Are You Feeling Today? (Are you tired? Yes, I am / No, I'm not))",
          "topic": "ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ",
          "grammar": "ទម្រង់សំណួរ Yes/No សួរពីអារម្មណ៍៖\n• Are you happy? -> Yes, I am. / No, I am not.\n• Are you hungry? -> Yes, I am hungry. / No, I am full.\n• Is he tired? -> Yes, he is. / No, he isn't.\n• Are they excited? -> Yes, they are!\nការសួរដោយពាក្យគួរសម៖ \"Are you feeling okay today?\"",
          "vocab": [
            {
              "en": "feeling",
              "kh": "អារម្មណ៍",
              "ipa": "/ˈfiːlɪŋ/",
              "exEn": "I have a wonderful feeling.",
              "exKh": "ខ្ញុំមានអារម្មណ៍ដ៏អស្ចារ្យ។"
            },
            {
              "en": "fine",
              "kh": "សុខសប្បាយ / ល្អ",
              "ipa": "/faɪn/",
              "exEn": "I am fine, thank you.",
              "exKh": "ខ្ញុំសុខសប្បាយទេ អរគុណ។"
            },
            {
              "en": "okay",
              "kh": "មិនអីទេ / ធម្មតា",
              "ipa": "/əʊˈkeɪ/",
              "exEn": "Everything is okay.",
              "exKh": "អ្វីៗគឺមិនអីទាំងអស់។"
            },
            {
              "en": "better",
              "kh": "ធូរស្បើយជាងមុន / ល្អជាងមុន",
              "ipa": "/ˈbetər/",
              "exEn": "I feel much better now.",
              "exKh": "ឥឡូវនេះខ្ញុំមានអារម្មណ៍ធូរស្រាលជាងមុនច្រើន។"
            }
          ],
          "sentences": [
            {
              "en": "How are you feeling today? I am feeling great!",
              "kh": "តើថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងណាដែរ? ខ្ញុំមានអារម្មណ៍អស្ចារ្យណាស់!"
            },
            {
              "en": "Are you tired after school? No, I am not tired at all.",
              "kh": "តើអ្នកអស់កម្លាំងទេក្រោយចេញពីរៀន? អត់ទេ ខ្ញុំមិនអស់កម្លាំងទាល់តែសោះ។"
            },
            {
              "en": "Is your mother feeling better today? Yes, she is healthy now.",
              "kh": "តើម្តាយរបស់អ្នកបានធូរស្បើយទេថ្ងៃនេះ? ចាស ឥឡូវគាត់មានសុខភាពល្អហើយ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Are you feeling sleepy, Vathanak?",
              "kh": "វឌ្ឍនៈ តើកូនមានអារម្មណ៍ងងុយគេងទេ?"
            },
            {
              "speaker": "Student",
              "en": "No, Teacher Piseth! I am wide awake and ready to listen.",
              "kh": "អត់ទេអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំភ្ញាក់ស្វាង និងរួចរាល់ក្នុងការស្តាប់ហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful spirit! That is the heart of a great learner.",
              "kh": "ទឹកចិត្តដ៏អស្ចារ្យ! នេះជាបេះដូងរបស់អ្នករៀនសូត្រដ៏ពូកែ។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 17\n🎯 ប្រធានបទ៖ ការសួរ និងឆ្លើយអំពីអារម្មណ៍ប្រចាំថ្ងៃ (How Are You Feeling Today? (Are you tired? Yes, I am / No, I'm not))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nទម្រង់សំណួរ Yes/No សួរពីអារម្មណ៍៖\n• Are you happy? -> Yes, I am. / No, I am not.\n• Are you hungry? -> Yes, I am hungry. / No, I am full.\n• Is he tired? -> Yes, he is. / No, he isn't.\n• Are they excited? -> Yes, they are!\nការសួរដោយពាក្យគួរសម៖ \"Are you feeling okay today?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 feeling (/ˈfiːlɪŋ/) = 🇰🇭 អារម្មណ៍\n   ↳ ឧទាហរណ៍៖ I have a wonderful feeling.\n   ↳ បកប្រែ៖ (ខ្ញុំមានអារម្មណ៍ដ៏អស្ចារ្យ។)\n\n2. 🇬🇧 fine (/faɪn/) = 🇰🇭 សុខសប្បាយ / ល្អ\n   ↳ ឧទាហរណ៍៖ I am fine, thank you.\n   ↳ បកប្រែ៖ (ខ្ញុំសុខសប្បាយទេ អរគុណ។)\n\n3. 🇬🇧 okay (/əʊˈkeɪ/) = 🇰🇭 មិនអីទេ / ធម្មតា\n   ↳ ឧទាហរណ៍៖ Everything is okay.\n   ↳ បកប្រែ៖ (អ្វីៗគឺមិនអីទាំងអស់។)\n\n4. 🇬🇧 better (/ˈbetər/) = 🇰🇭 ធូរស្បើយជាងមុន / ល្អជាងមុន\n   ↳ ឧទាហរណ៍៖ I feel much better now.\n   ↳ បកប្រែ៖ (ឥឡូវនេះខ្ញុំមានអារម្មណ៍ធូរស្រាលជាងមុនច្រើន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 How are you feeling today? I am feeling great!\n   🇰🇭 (តើថ្ងៃនេះអ្នកមានអារម្មណ៍យ៉ាងណាដែរ? ខ្ញុំមានអារម្មណ៍អស្ចារ្យណាស់!)\n2. 🇬🇧 Are you tired after school? No, I am not tired at all.\n   🇰🇭 (តើអ្នកអស់កម្លាំងទេក្រោយចេញពីរៀន? អត់ទេ ខ្ញុំមិនអស់កម្លាំងទាល់តែសោះ។)\n3. 🇬🇧 Is your mother feeling better today? Yes, she is healthy now.\n   🇰🇭 (តើម្តាយរបស់អ្នកបានធូរស្បើយទេថ្ងៃនេះ? ចាស ឥឡូវគាត់មានសុខភាពល្អហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Are you feeling sleepy, Vathanak?\"\n   🇰🇭 (វឌ្ឍនៈ តើកូនមានអារម្មណ៍ងងុយគេងទេ?)\n\n👤 Student:\n   🇬🇧 \"No, Teacher Piseth! I am wide awake and ready to listen.\"\n   🇰🇭 (អត់ទេអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំភ្ញាក់ស្វាង និងរួចរាល់ក្នុងការស្តាប់ហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful spirit! That is the heart of a great learner.\"\n   🇰🇭 (ទឹកចិត្តដ៏អស្ចារ្យ! នេះជាបេះដូងរបស់អ្នករៀនសូត្រដ៏ពូកែ។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el18",
          "day": 18,
          "title": "ថ្ងៃទី 18៖ រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍ (Weekly Review & Dialogue: Talking about Family & Feelings)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍",
          "grammar": "រំលឹកសរុបសប្តាហ៍ទី ៣៖\n១. Family Words: father, mother, brother, sister, parents, grandparents\n២. Have/Has: I have, He has, Do you have...?\n៣. Pets: dog, cat, bird, fish, rabbit\n៤. Feelings: happy, sad, tired, hungry, thirsty, excited, proud\n៥. សំណួរសន្ទនាជាក់ស្តែង៖ \"Do you have a big family?\", \"How are you feeling?\"",
          "vocab": [
            {
              "en": "caring",
              "kh": "យកចិត្តទុកដាក់",
              "ipa": "/ˈkeərɪŋ/",
              "exEn": "She is a caring mother.",
              "exKh": "នាងជាម្តាយដែលចេះយកចិត្តទុកដាក់។"
            },
            {
              "en": "together",
              "kh": "ជាមួយគ្នា",
              "ipa": "/təˈɡeðər/",
              "exEn": "Our family eats dinner together.",
              "exKh": "គ្រួសាររបស់យើងញ៉ាំអាហារពេលល្ងាចជាមួយគ្នា។"
            },
            {
              "en": "proud",
              "kh": "មានមោទនភាព",
              "ipa": "/praʊd/",
              "exEn": "My parents are proud of my studies.",
              "exKh": "ឪពុកម្តាយខ្ញុំមានមោទនភាពចំពោះការរៀនសូត្ររបស់ខ្ញុំ។"
            }
          ],
          "sentences": [
            {
              "en": "I have a happy and warm family.",
              "kh": "ខ្ញុំមានគ្រួសារដ៏រីករាយ និងកក់ក្តៅមួយ។"
            },
            {
              "en": "My father has a friendly white dog.",
              "kh": "ឪពុករបស់ខ្ញុំមានឆ្កែពណ៌សដ៏រួសរាយមួយក្បាល។"
            },
            {
              "en": "We always feel happy when we spend time together.",
              "kh": "ពួកយើងតែងតែមានអារម្មណ៍រីករាយនៅពេលយើងចំណាយពេលជាមួយគ្នា។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Who can share a short story about their family and pets?",
              "kh": "តើកូនណាខ្លះអាចចែករំលែករឿងខ្លីមួយអំពីគ្រួសារ និងសត្វចិញ្ចឹមរបស់ខ្លួន?"
            },
            {
              "speaker": "Student",
              "en": "Teacher, my family lives in Siem Reap. We have a mother cat and three small kittens. We feel so joyful every day!",
              "kh": "អ្នកគ្រូ គ្រួសារខ្ញុំរស់នៅសៀមរាប។ ពួកយើងមានមេឆ្មាមួយ និងកូនឆ្មាតូចៗបីក្បាល។ ពួកយើងមានអារម្មណ៍សប្បាយចិត្តខ្លាំងណាស់រាល់ថ្ងៃ!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "That warms my heart so much! Beautiful English sentences, my dear student.",
              "kh": "ធ្វើឱ្យអ្នកគ្រូកក់ក្តៅក្នុងចិត្តណាស់! ប្រយោគភាសាអង់គ្លេសស្អាតណាស់កូនសិស្សជាទីស្រឡាញ់។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 3 • ថ្ងៃទី 18\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៣ និងការសន្ទនាអំពីគ្រួសារ និងអារម្មណ៍ (Weekly Review & Dialogue: Talking about Family & Feelings)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nរំលឹកសរុបសប្តាហ៍ទី ៣៖\n១. Family Words: father, mother, brother, sister, parents, grandparents\n២. Have/Has: I have, He has, Do you have...?\n៣. Pets: dog, cat, bird, fish, rabbit\n៤. Feelings: happy, sad, tired, hungry, thirsty, excited, proud\n៥. សំណួរសន្ទនាជាក់ស្តែង៖ \"Do you have a big family?\", \"How are you feeling?\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 caring (/ˈkeərɪŋ/) = 🇰🇭 យកចិត្តទុកដាក់\n   ↳ ឧទាហរណ៍៖ She is a caring mother.\n   ↳ បកប្រែ៖ (នាងជាម្តាយដែលចេះយកចិត្តទុកដាក់។)\n\n2. 🇬🇧 together (/təˈɡeðər/) = 🇰🇭 ជាមួយគ្នា\n   ↳ ឧទាហរណ៍៖ Our family eats dinner together.\n   ↳ បកប្រែ៖ (គ្រួសាររបស់យើងញ៉ាំអាហារពេលល្ងាចជាមួយគ្នា។)\n\n3. 🇬🇧 proud (/praʊd/) = 🇰🇭 មានមោទនភាព\n   ↳ ឧទាហរណ៍៖ My parents are proud of my studies.\n   ↳ បកប្រែ៖ (ឪពុកម្តាយខ្ញុំមានមោទនភាពចំពោះការរៀនសូត្ររបស់ខ្ញុំ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I have a happy and warm family.\n   🇰🇭 (ខ្ញុំមានគ្រួសារដ៏រីករាយ និងកក់ក្តៅមួយ។)\n2. 🇬🇧 My father has a friendly white dog.\n   🇰🇭 (ឪពុករបស់ខ្ញុំមានឆ្កែពណ៌សដ៏រួសរាយមួយក្បាល។)\n3. 🇬🇧 We always feel happy when we spend time together.\n   🇰🇭 (ពួកយើងតែងតែមានអារម្មណ៍រីករាយនៅពេលយើងចំណាយពេលជាមួយគ្នា។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Who can share a short story about their family and pets?\"\n   🇰🇭 (តើកូនណាខ្លះអាចចែករំលែករឿងខ្លីមួយអំពីគ្រួសារ និងសត្វចិញ្ចឹមរបស់ខ្លួន?)\n\n👤 Student:\n   🇬🇧 \"Teacher, my family lives in Siem Reap. We have a mother cat and three small kittens. We feel so joyful every day!\"\n   🇰🇭 (អ្នកគ្រូ គ្រួសារខ្ញុំរស់នៅសៀមរាប។ ពួកយើងមានមេឆ្មាមួយ និងកូនឆ្មាតូចៗបីក្បាល។ ពួកយើងមានអារម្មណ៍សប្បាយចិត្តខ្លាំងណាស់រាល់ថ្ងៃ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"That warms my heart so much! Beautiful English sentences, my dear student.\"\n   🇰🇭 (ធ្វើឱ្យអ្នកគ្រូកក់ក្តៅក្នុងចិត្តណាស់! ប្រយោគភាសាអង់គ្លេសស្អាតណាស់កូនសិស្សជាទីស្រឡាញ់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew4",
      "weekNum": 4,
      "monthWeekNum": 4,
      "title": "សប្តាហ៍ទី 4 (ថ្ងៃទី 19 - 24)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 4 ខែទី 1",
      "lessons": [
        {
          "id": "el19",
          "day": 19,
          "title": "ថ្ងៃទី 19៖ បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ (Present Simple - Daily Habits (Wake up, Brush teeth, Wash face))",
          "topic": "បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ",
          "grammar": "បច្ចុប្បន្នកាលធម្មតា (Present Simple) ប្រើសម្រាប់ទម្លាប់ ឬការពិតប្រចាំថ្ងៃ៖\nរូបមន្ត៖\n• I / You / We / They + V1 (infinitive): I wake up at 6:00 AM.\n• He / She / It + V1 + s/es: He brushes his teeth. She washes her face.\n(កិរិយាសព្ទបញ្ចប់ដោយ ch, sh, ss, x, o ត្រូវថែម -es: brush -> brushes, wash -> washes, go -> goes)",
          "vocab": [
            {
              "en": "wake up",
              "kh": "ភ្ញាក់ពីគេង",
              "ipa": "/weɪk ʌp/",
              "exEn": "I wake up at six o'clock.",
              "exKh": "ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦:០០។"
            },
            {
              "en": "brush teeth",
              "kh": "ដុសធ្មេញ",
              "ipa": "/brʌʃ tiːθ/",
              "exEn": "I brush my teeth twice a day.",
              "exKh": "ខ្ញុំដុសធ្មេញពីរដងក្នុងមួយថ្ងៃ។"
            },
            {
              "en": "wash face",
              "kh": "លុបមុខ",
              "ipa": "/wɒʃ feɪs/",
              "exEn": "She washes her face with clean water.",
              "exKh": "នាងលុបមុខនឹងទឹកស្អាត។"
            },
            {
              "en": "get dressed",
              "kh": "ស្លៀកពាក់",
              "ipa": "/ɡet drest/",
              "exEn": "He gets dressed for school.",
              "exKh": "គាត់ស្លៀកពាក់ដើម្បីទៅសាលារៀន។"
            },
            {
              "en": "eat breakfast",
              "kh": "ញ៉ាំអាហារពេលព្រឹក",
              "ipa": "/iːt ˈbrekfəst/",
              "exEn": "We eat breakfast together.",
              "exKh": "ពួកយើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។"
            }
          ],
          "sentences": [
            {
              "en": "I wake up early every morning.",
              "kh": "ខ្ញុំភ្ញាក់ពីគេងពីព្រលឹមរៀងរាល់ព្រឹក។"
            },
            {
              "en": "She brushes her teeth before going to bed.",
              "kh": "នាងដុសធ្មេញរបស់នាងមុនពេលចូលគេង។"
            },
            {
              "en": "My brother eats rice and soup for breakfast.",
              "kh": "បងប្រុសរបស់ខ្ញុំញ៉ាំបាយ និងសម្លសម្រាប់អាហារពេលព្រឹក។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "What do you do first when you wake up in the morning?",
              "kh": "តើកូនធ្វើអ្វីមុនគេនៅពេលភ្ញាក់ពីគេងនៅពេលព្រឹក?"
            },
            {
              "speaker": "Student",
              "en": "I wash my face and brush my teeth, Teacher!",
              "kh": "ខ្ញុំលុបមុខ និងដុសធ្មេញអ្នកគ្រូ!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Good habits keep you fresh, healthy and smart!",
              "kh": "ទម្លាប់ល្អជួយឱ្យកូនស្រស់ស្រាយ មានសុខភាពល្អ និងឆ្លាតវៃ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 19\n🎯 ប្រធានបទ៖ បច្ចុប្បន្នកាលធម្មតា Present Simple - ទម្លាប់ប្រចាំថ្ងៃ (Present Simple - Daily Habits (Wake up, Brush teeth, Wash face))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលធម្មតា (Present Simple) ប្រើសម្រាប់ទម្លាប់ ឬការពិតប្រចាំថ្ងៃ៖\nរូបមន្ត៖\n• I / You / We / They + V1 (infinitive): I wake up at 6:00 AM.\n• He / She / It + V1 + s/es: He brushes his teeth. She washes her face.\n(កិរិយាសព្ទបញ្ចប់ដោយ ch, sh, ss, x, o ត្រូវថែម -es: brush -> brushes, wash -> washes, go -> goes)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 wake up (/weɪk ʌp/) = 🇰🇭 ភ្ញាក់ពីគេង\n   ↳ ឧទាហរណ៍៖ I wake up at six o'clock.\n   ↳ បកប្រែ៖ (ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦:០០។)\n\n2. 🇬🇧 brush teeth (/brʌʃ tiːθ/) = 🇰🇭 ដុសធ្មេញ\n   ↳ ឧទាហរណ៍៖ I brush my teeth twice a day.\n   ↳ បកប្រែ៖ (ខ្ញុំដុសធ្មេញពីរដងក្នុងមួយថ្ងៃ។)\n\n3. 🇬🇧 wash face (/wɒʃ feɪs/) = 🇰🇭 លុបមុខ\n   ↳ ឧទាហរណ៍៖ She washes her face with clean water.\n   ↳ បកប្រែ៖ (នាងលុបមុខនឹងទឹកស្អាត។)\n\n4. 🇬🇧 get dressed (/ɡet drest/) = 🇰🇭 ស្លៀកពាក់\n   ↳ ឧទាហរណ៍៖ He gets dressed for school.\n   ↳ បកប្រែ៖ (គាត់ស្លៀកពាក់ដើម្បីទៅសាលារៀន។)\n\n5. 🇬🇧 eat breakfast (/iːt ˈbrekfəst/) = 🇰🇭 ញ៉ាំអាហារពេលព្រឹក\n   ↳ ឧទាហរណ៍៖ We eat breakfast together.\n   ↳ បកប្រែ៖ (ពួកយើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I wake up early every morning.\n   🇰🇭 (ខ្ញុំភ្ញាក់ពីគេងពីព្រលឹមរៀងរាល់ព្រឹក។)\n2. 🇬🇧 She brushes her teeth before going to bed.\n   🇰🇭 (នាងដុសធ្មេញរបស់នាងមុនពេលចូលគេង។)\n3. 🇬🇧 My brother eats rice and soup for breakfast.\n   🇰🇭 (បងប្រុសរបស់ខ្ញុំញ៉ាំបាយ និងសម្លសម្រាប់អាហារពេលព្រឹក។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"What do you do first when you wake up in the morning?\"\n   🇰🇭 (តើកូនធ្វើអ្វីមុនគេនៅពេលភ្ញាក់ពីគេងនៅពេលព្រឹក?)\n\n👤 Student:\n   🇬🇧 \"I wash my face and brush my teeth, Teacher!\"\n   🇰🇭 (ខ្ញុំលុបមុខ និងដុសធ្មេញអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Good habits keep you fresh, healthy and smart!\"\n   🇰🇭 (ទម្លាប់ល្អជួយឱ្យកូនស្រស់ស្រាយ មានសុខភាពល្អ និងឆ្លាតវៃ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el20",
          "day": 20,
          "title": "ថ្ងៃទី 20៖ ការប្រាប់ពេលវេលា Telling Time (What time is it?) (Telling Time (What time is it? It's 7 o'clock / half past))",
          "topic": "ការប្រាប់ពេលវេលា Telling Time (What time is it?)",
          "grammar": "ការសួរ និងប្រាប់ម៉ោងជាភាសាអង់គ្លេស៖\nសំណួរ៖ \"What time is it?\" ឬ \"What's the time?\"\nចម្លើយ៖ \"It is + ម៉ោង\"\n• ម៉ោងគត់ (Exact hour): It is seven o'clock. (7:00)\n• កន្លះម៉ោង (30 minutes): It is seven thirty. ឬ It is half past seven. (7:30)\n• ម៉ោង និងនាទី៖ It is eight fifteen. (8:15) / It is eight forty-five. (8:45)\n• ពេលព្រឹក: AM (ante meridiem) / ពេលរសៀល-យប់: PM (post meridiem)",
          "vocab": [
            {
              "en": "o'clock",
              "kh": "ម៉ោង (គត់)",
              "ipa": "/əˈklɒk/",
              "exEn": "It is eight o'clock.",
              "exKh": "វាគឺម៉ោងប្រាំបីគត់។"
            },
            {
              "en": "half past",
              "kh": "កន្លះ (កន្លង ៣០ នាទី)",
              "ipa": "/hɑːf pɑːst/",
              "exEn": "It is half past six.",
              "exKh": "វាគឺម៉ោង ៦:៣០ (ប្រាំមួយកន្លះ)។"
            },
            {
              "en": "quarter past",
              "kh": "កន្លង ១៥ នាទី",
              "ipa": "/ˈkwɔːtər pɑːst/",
              "exEn": "It is a quarter past seven.",
              "exKh": "វាគឺម៉ោង ៧:១៥។"
            },
            {
              "en": "noon",
              "kh": "ថ្ងៃត្រង់ (12:00 PM)",
              "ipa": "/nuːn/",
              "exEn": "We eat lunch at noon.",
              "exKh": "ពួកយើងញ៉ាំបាយថ្ងៃត្រង់នៅពេលថ្ងៃត្រង់។"
            },
            {
              "en": "midnight",
              "kh": "កណ្តាលអធ្រាត្រ (12:00 AM)",
              "ipa": "/ˈmɪdnaɪt/",
              "exEn": "Sleep before midnight.",
              "exKh": "គេងមុនកណ្តាលអធ្រាត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "What time is it now? It is exactly seven o'clock.",
              "kh": "តើឥឡូវនេះម៉ោងប៉ុន្មានហើយ? គឺម៉ោង ៧:០០ គត់។"
            },
            {
              "en": "Our English live class starts at seven thirty in the evening.",
              "kh": "ថ្នាក់ផ្សាយផ្ទាល់ភាសាអង់គ្លេសយើងចាប់ផ្តើមនៅម៉ោង ៧:៣០ នាទីល្ងាច។"
            },
            {
              "en": "I go to bed at nine o'clock every night.",
              "kh": "ខ្ញុំចូលគេងនៅម៉ោង ៩:០០ យប់ជារៀងរាល់យប់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Excuse me, Dara. Do you know what time it is?",
              "kh": "សុំទោសដារ៉ា។ តើកូនដឹងថាម៉ោងប៉ុន្មានហើយទេ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher! Looking at the wall clock, it is ten past eight.",
              "kh": "ចាសអ្នកគ្រូ! មើលលើនាឡិកាជញ្ជាំង គឺម៉ោង ៨:១០ នាទី។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Spot on! You can tell the time accurately.",
              "kh": "ត្រឹមត្រូវបេះបិទ! កូនអាចប្រាប់ម៉ោងបានយ៉ាងច្បាស់លាស់។"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 20\n🎯 ប្រធានបទ៖ ការប្រាប់ពេលវេលា Telling Time (What time is it?) (Telling Time (What time is it? It's 7 o'clock / half past))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ម៉ោងជាភាសាអង់គ្លេស៖\nសំណួរ៖ \"What time is it?\" ឬ \"What's the time?\"\nចម្លើយ៖ \"It is + ម៉ោង\"\n• ម៉ោងគត់ (Exact hour): It is seven o'clock. (7:00)\n• កន្លះម៉ោង (30 minutes): It is seven thirty. ឬ It is half past seven. (7:30)\n• ម៉ោង និងនាទី៖ It is eight fifteen. (8:15) / It is eight forty-five. (8:45)\n• ពេលព្រឹក: AM (ante meridiem) / ពេលរសៀល-យប់: PM (post meridiem)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 o'clock (/əˈklɒk/) = 🇰🇭 ម៉ោង (គត់)\n   ↳ ឧទាហរណ៍៖ It is eight o'clock.\n   ↳ បកប្រែ៖ (វាគឺម៉ោងប្រាំបីគត់។)\n\n2. 🇬🇧 half past (/hɑːf pɑːst/) = 🇰🇭 កន្លះ (កន្លង ៣០ នាទី)\n   ↳ ឧទាហរណ៍៖ It is half past six.\n   ↳ បកប្រែ៖ (វាគឺម៉ោង ៦:៣០ (ប្រាំមួយកន្លះ)។)\n\n3. 🇬🇧 quarter past (/ˈkwɔːtər pɑːst/) = 🇰🇭 កន្លង ១៥ នាទី\n   ↳ ឧទាហរណ៍៖ It is a quarter past seven.\n   ↳ បកប្រែ៖ (វាគឺម៉ោង ៧:១៥។)\n\n4. 🇬🇧 noon (/nuːn/) = 🇰🇭 ថ្ងៃត្រង់ (12:00 PM)\n   ↳ ឧទាហរណ៍៖ We eat lunch at noon.\n   ↳ បកប្រែ៖ (ពួកយើងញ៉ាំបាយថ្ងៃត្រង់នៅពេលថ្ងៃត្រង់។)\n\n5. 🇬🇧 midnight (/ˈmɪdnaɪt/) = 🇰🇭 កណ្តាលអធ្រាត្រ (12:00 AM)\n   ↳ ឧទាហរណ៍៖ Sleep before midnight.\n   ↳ បកប្រែ៖ (គេងមុនកណ្តាលអធ្រាត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 What time is it now? It is exactly seven o'clock.\n   🇰🇭 (តើឥឡូវនេះម៉ោងប៉ុន្មានហើយ? គឺម៉ោង ៧:០០ គត់។)\n2. 🇬🇧 Our English live class starts at seven thirty in the evening.\n   🇰🇭 (ថ្នាក់ផ្សាយផ្ទាល់ភាសាអង់គ្លេសយើងចាប់ផ្តើមនៅម៉ោង ៧:៣០ នាទីល្ងាច។)\n3. 🇬🇧 I go to bed at nine o'clock every night.\n   🇰🇭 (ខ្ញុំចូលគេងនៅម៉ោង ៩:០០ យប់ជារៀងរាល់យប់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Excuse me, Dara. Do you know what time it is?\"\n   🇰🇭 (សុំទោសដារ៉ា។ តើកូនដឹងថាម៉ោងប៉ុន្មានហើយទេ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher! Looking at the wall clock, it is ten past eight.\"\n   🇰🇭 (ចាសអ្នកគ្រូ! មើលលើនាឡិកាជញ្ជាំង គឺម៉ោង ៨:១០ នាទី។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Spot on! You can tell the time accurately.\"\n   🇰🇭 (ត្រឹមត្រូវបេះបិទ! កូនអាចប្រាប់ម៉ោងបានយ៉ាងច្បាស់លាស់។)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el21",
          "day": 21,
          "title": "ថ្ងៃទី 21៖ កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់) (Daily Schedule (Morning, Afternoon, Evening, Night))",
          "topic": "កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់)",
          "grammar": "ការប្រើធ្នាក់ពេលវេលា (Prepositions of Time): IN និង AT៖\n• in the morning = នៅពេលព្រឹក\n• in the afternoon = នៅពេលរសៀល\n• in the evening = នៅពេលល្ងាច\n• at noon = នៅពេលថ្ងៃត្រង់\n• at night = នៅពេលយប់\n• at + ម៉ោង (at 7:00 AM, at 8:30 PM)",
          "vocab": [
            {
              "en": "morning",
              "kh": "ពេលព្រឹក",
              "ipa": "/ˈmɔːnɪŋ/",
              "exEn": "Good morning, Teacher Piseth!",
              "exKh": "អរុណសួស្តី អ្នកគ្រូពិសិដ្ឋ!"
            },
            {
              "en": "afternoon",
              "kh": "ពេលរសៀល",
              "ipa": "/ˌɑːftəˈnuːn/",
              "exEn": "We play sports in the afternoon.",
              "exKh": "ពួកយើងលេងកីឡានៅពេលរសៀល។"
            },
            {
              "en": "evening",
              "kh": "ពេលល្ងាច",
              "ipa": "/ˈiːvnɪŋ/",
              "exEn": "I review my lessons in the evening.",
              "exKh": "ខ្ញុំរំលឹកមេរៀនរបស់ខ្ញុំនៅពេលល្ងាច។"
            },
            {
              "en": "night",
              "kh": "ពេលយប់",
              "ipa": "/naɪt/",
              "exEn": "Good night and sweet dreams!",
              "exKh": "រាត្រីសួស្តី និងសុបិនល្អ!"
            },
            {
              "en": "schedule",
              "kh": "កាលវិភាគ",
              "ipa": "/ˈʃedjuːl/",
              "exEn": "My daily schedule is organized.",
              "exKh": "កាលវិភាគប្រចាំថ្ងៃខ្ញុំមានរបៀបរៀបរយ។"
            }
          ],
          "sentences": [
            {
              "en": "In the morning, I study English at school.",
              "kh": "នៅពេលព្រឹក ខ្ញុំរៀនភាសាអង់គ្លេសនៅសាលា។"
            },
            {
              "en": "In the afternoon, I help my mother clean the house.",
              "kh": "នៅពេលរសៀល ខ្ញុំជួយម្តាយខ្ញុំបោសសម្អាតផ្ទះ។"
            },
            {
              "en": "At night, I sleep early to wake up strong tomorrow.",
              "kh": "នៅពេលយប់ ខ្ញុំគេងលឿនដើម្បីភ្ញាក់ឡើងមានកម្លាំងមាំមួននៅថ្ងៃស្អែក។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "What do you usually do in the evening, Bopha?",
              "kh": "បុប្ផា តើកូនតែងតែធ្វើអ្វីនៅពេលល្ងាច?"
            },
            {
              "speaker": "Student",
              "en": "In the evening, I eat dinner with my parents, and then I study with Teacher Piseth AI on Telegram!",
              "kh": "នៅពេលល្ងាច ខ្ញុំញ៉ាំបាយជាមួយប៉ាម៉ាក់ រួចហើយខ្ញុំរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ AI លើតេលេក្រាម!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "I am so happy to be your teacher every evening!",
              "kh": "អ្នកគ្រូសប្បាយចិត្តណាស់ដែលបានធ្វើជាគ្រូបង្រៀនរបស់កូនរាល់ល្ងាច!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 21\n🎯 ប្រធានបទ៖ កាលវិភាគប្រចាំថ្ងៃ (ព្រឹក រសៀល ល្ងាច និងយប់) (Daily Schedule (Morning, Afternoon, Evening, Night))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការប្រើធ្នាក់ពេលវេលា (Prepositions of Time): IN និង AT៖\n• in the morning = នៅពេលព្រឹក\n• in the afternoon = នៅពេលរសៀល\n• in the evening = នៅពេលល្ងាច\n• at noon = នៅពេលថ្ងៃត្រង់\n• at night = នៅពេលយប់\n• at + ម៉ោង (at 7:00 AM, at 8:30 PM)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 morning (/ˈmɔːnɪŋ/) = 🇰🇭 ពេលព្រឹក\n   ↳ ឧទាហរណ៍៖ Good morning, Teacher Piseth!\n   ↳ បកប្រែ៖ (អរុណសួស្តី អ្នកគ្រូពិសិដ្ឋ!)\n\n2. 🇬🇧 afternoon (/ˌɑːftəˈnuːn/) = 🇰🇭 ពេលរសៀល\n   ↳ ឧទាហរណ៍៖ We play sports in the afternoon.\n   ↳ បកប្រែ៖ (ពួកយើងលេងកីឡានៅពេលរសៀល។)\n\n3. 🇬🇧 evening (/ˈiːvnɪŋ/) = 🇰🇭 ពេលល្ងាច\n   ↳ ឧទាហរណ៍៖ I review my lessons in the evening.\n   ↳ បកប្រែ៖ (ខ្ញុំរំលឹកមេរៀនរបស់ខ្ញុំនៅពេលល្ងាច។)\n\n4. 🇬🇧 night (/naɪt/) = 🇰🇭 ពេលយប់\n   ↳ ឧទាហរណ៍៖ Good night and sweet dreams!\n   ↳ បកប្រែ៖ (រាត្រីសួស្តី និងសុបិនល្អ!)\n\n5. 🇬🇧 schedule (/ˈʃedjuːl/) = 🇰🇭 កាលវិភាគ\n   ↳ ឧទាហរណ៍៖ My daily schedule is organized.\n   ↳ បកប្រែ៖ (កាលវិភាគប្រចាំថ្ងៃខ្ញុំមានរបៀបរៀបរយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 In the morning, I study English at school.\n   🇰🇭 (នៅពេលព្រឹក ខ្ញុំរៀនភាសាអង់គ្លេសនៅសាលា។)\n2. 🇬🇧 In the afternoon, I help my mother clean the house.\n   🇰🇭 (នៅពេលរសៀល ខ្ញុំជួយម្តាយខ្ញុំបោសសម្អាតផ្ទះ។)\n3. 🇬🇧 At night, I sleep early to wake up strong tomorrow.\n   🇰🇭 (នៅពេលយប់ ខ្ញុំគេងលឿនដើម្បីភ្ញាក់ឡើងមានកម្លាំងមាំមួននៅថ្ងៃស្អែក។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"What do you usually do in the evening, Bopha?\"\n   🇰🇭 (បុប្ផា តើកូនតែងតែធ្វើអ្វីនៅពេលល្ងាច?)\n\n👤 Student:\n   🇬🇧 \"In the evening, I eat dinner with my parents, and then I study with Teacher Piseth AI on Telegram!\"\n   🇰🇭 (នៅពេលល្ងាច ខ្ញុំញ៉ាំបាយជាមួយប៉ាម៉ាក់ រួចហើយខ្ញុំរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ AI លើតេលេក្រាម!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"I am so happy to be your teacher every evening!\"\n   🇰🇭 (អ្នកគ្រូសប្បាយចិត្តណាស់ដែលបានធ្វើជាគ្រូបង្រៀនរបស់កូនរាល់ល្ងាច!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el22",
          "day": 22,
          "title": "ថ្ងៃទី 22៖ ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week) (Days of the Week & Routine (On Monday, On weekends...))",
          "topic": "ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week)",
          "grammar": "ថ្ងៃទាំង ៧ នៃសប្តាហ៍ និងការប្រើធ្នាក់ \"ON\"៖\n• On + ថ្ងៃនៃសប្តាហ៍ (On Monday, On Tuesday, On Wednesday, On Thursday, On Friday, On Saturday, On Sunday)\n• On weekdays = ពីថ្ងៃចន្ទ ដល់សុក្រ\n• On weekends = នៅថ្ងៃចុងសប្តាហ៍ (សៅរ៍ និងអាទិត្យ)\nចំណាំ: ឈ្មោះថ្ងៃត្រូវសរសេរអក្សរធំនៅដើមពាក្យជានិច្ច (Capital Letter)!",
          "vocab": [
            {
              "en": "Monday",
              "kh": "ថ្ងៃចន្ទ",
              "ipa": "/ˈmʌndeɪ/",
              "exEn": "School starts on Monday.",
              "exKh": "សាលារៀនចាប់ផ្តើមនៅថ្ងៃចន្ទ។"
            },
            {
              "en": "Wednesday",
              "kh": "ថ្ងៃពុធ",
              "ipa": "/ˈwenzdeɪ/",
              "exEn": "We have English test on Wednesday.",
              "exKh": "យើងមានប្រឡងតេស្តអង់គ្លេសនៅថ្ងៃពុធ។"
            },
            {
              "en": "Friday",
              "kh": "ថ្ងៃសុក្រ",
              "ipa": "/ˈfraɪdeɪ/",
              "exEn": "Friday is the end of the school week.",
              "exKh": "ថ្ងៃសុក្រគឺជាថ្ងៃចុងក្រោយនៃសប្តាហ៍សិក្សា។"
            },
            {
              "en": "Saturday",
              "kh": "ថ្ងៃសៅរ៍",
              "ipa": "/ˈsætədeɪ/",
              "exEn": "On Saturday, I ride my bicycle.",
              "exKh": "នៅថ្ងៃសៅរ៍ ខ្ញុំជិះកង់កម្សាន្ត។"
            },
            {
              "en": "Sunday",
              "kh": "ថ្ងៃអាទិត្យ",
              "ipa": "/ˈsʌndeɪ/",
              "exEn": "Sunday is a family day.",
              "exKh": "ថ្ងៃអាទិត្យជាថ្ងៃជួបជុំគ្រួសារ។"
            },
            {
              "en": "weekend",
              "kh": "ចុងសប្តាហ៍",
              "ipa": "/ˌwiːkˈend/",
              "exEn": "Have a wonderful weekend!",
              "exKh": "សូមឱ្យមានចុងសប្តាហ៍ដ៏អស្ចារ្យ!"
            }
          ],
          "sentences": [
            {
              "en": "On Monday, we learn new grammar rules.",
              "kh": "នៅថ្ងៃចន្ទ ពួកយើងរៀនក្បួនវេយ្យាករណ៍ថ្មីៗ។"
            },
            {
              "en": "On weekends, my family visits my grandparents in the countryside.",
              "kh": "នៅចុងសប្តាហ៍ គ្រួសារខ្ញុំទៅលេងជីដូនជីតានៅឯស្រុកស្រែ។"
            },
            {
              "en": "I practice speaking English every day, from Monday to Sunday.",
              "kh": "ខ្ញុំហាត់និយាយភាសាអង់គ្លេសរាល់ថ្ងៃ ចាប់ពីថ្ងៃចន្ទ ដល់ថ្ងៃអាទិត្យ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "What is your favorite day of the week, Sok?",
              "kh": "សុខ តើកូនចូលចិត្តថ្ងៃណាជាងគេក្នុងសប្តាហ៍?"
            },
            {
              "speaker": "Student",
              "en": "I love Sunday because I can play football with my friends and study English without rushing!",
              "kh": "ខ្ញុំចូលចិត្តថ្ងៃអាទិត្យ ព្រោះខ្ញុំអាចលេងបាល់ជាមួយមិត្តភក្តិ ហើយរៀនអង់គ្លេសដោយមិនបាច់ប្រញាប់ប្រញាល់!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Sunday is indeed a relaxing and fruitful day!",
              "kh": "ថ្ងៃអាទិត្យពិតជាថ្ងៃសម្រាក និងពោរពេញដោយផលល្អ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 22\n🎯 ប្រធានបទ៖ ថ្ងៃនៃសប្តាហ៍ និងកិច្ចការប្រចាំសប្តាហ៍ (Days of the Week) (Days of the Week & Routine (On Monday, On weekends...))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nថ្ងៃទាំង ៧ នៃសប្តាហ៍ និងការប្រើធ្នាក់ \"ON\"៖\n• On + ថ្ងៃនៃសប្តាហ៍ (On Monday, On Tuesday, On Wednesday, On Thursday, On Friday, On Saturday, On Sunday)\n• On weekdays = ពីថ្ងៃចន្ទ ដល់សុក្រ\n• On weekends = នៅថ្ងៃចុងសប្តាហ៍ (សៅរ៍ និងអាទិត្យ)\nចំណាំ: ឈ្មោះថ្ងៃត្រូវសរសេរអក្សរធំនៅដើមពាក្យជានិច្ច (Capital Letter)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 Monday (/ˈmʌndeɪ/) = 🇰🇭 ថ្ងៃចន្ទ\n   ↳ ឧទាហរណ៍៖ School starts on Monday.\n   ↳ បកប្រែ៖ (សាលារៀនចាប់ផ្តើមនៅថ្ងៃចន្ទ។)\n\n2. 🇬🇧 Wednesday (/ˈwenzdeɪ/) = 🇰🇭 ថ្ងៃពុធ\n   ↳ ឧទាហរណ៍៖ We have English test on Wednesday.\n   ↳ បកប្រែ៖ (យើងមានប្រឡងតេស្តអង់គ្លេសនៅថ្ងៃពុធ។)\n\n3. 🇬🇧 Friday (/ˈfraɪdeɪ/) = 🇰🇭 ថ្ងៃសុក្រ\n   ↳ ឧទាហរណ៍៖ Friday is the end of the school week.\n   ↳ បកប្រែ៖ (ថ្ងៃសុក្រគឺជាថ្ងៃចុងក្រោយនៃសប្តាហ៍សិក្សា។)\n\n4. 🇬🇧 Saturday (/ˈsætədeɪ/) = 🇰🇭 ថ្ងៃសៅរ៍\n   ↳ ឧទាហរណ៍៖ On Saturday, I ride my bicycle.\n   ↳ បកប្រែ៖ (នៅថ្ងៃសៅរ៍ ខ្ញុំជិះកង់កម្សាន្ត។)\n\n5. 🇬🇧 Sunday (/ˈsʌndeɪ/) = 🇰🇭 ថ្ងៃអាទិត្យ\n   ↳ ឧទាហរណ៍៖ Sunday is a family day.\n   ↳ បកប្រែ៖ (ថ្ងៃអាទិត្យជាថ្ងៃជួបជុំគ្រួសារ។)\n\n6. 🇬🇧 weekend (/ˌwiːkˈend/) = 🇰🇭 ចុងសប្តាហ៍\n   ↳ ឧទាហរណ៍៖ Have a wonderful weekend!\n   ↳ បកប្រែ៖ (សូមឱ្យមានចុងសប្តាហ៍ដ៏អស្ចារ្យ!)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 On Monday, we learn new grammar rules.\n   🇰🇭 (នៅថ្ងៃចន្ទ ពួកយើងរៀនក្បួនវេយ្យាករណ៍ថ្មីៗ។)\n2. 🇬🇧 On weekends, my family visits my grandparents in the countryside.\n   🇰🇭 (នៅចុងសប្តាហ៍ គ្រួសារខ្ញុំទៅលេងជីដូនជីតានៅឯស្រុកស្រែ។)\n3. 🇬🇧 I practice speaking English every day, from Monday to Sunday.\n   🇰🇭 (ខ្ញុំហាត់និយាយភាសាអង់គ្លេសរាល់ថ្ងៃ ចាប់ពីថ្ងៃចន្ទ ដល់ថ្ងៃអាទិត្យ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"What is your favorite day of the week, Sok?\"\n   🇰🇭 (សុខ តើកូនចូលចិត្តថ្ងៃណាជាងគេក្នុងសប្តាហ៍?)\n\n👤 Student:\n   🇬🇧 \"I love Sunday because I can play football with my friends and study English without rushing!\"\n   🇰🇭 (ខ្ញុំចូលចិត្តថ្ងៃអាទិត្យ ព្រោះខ្ញុំអាចលេងបាល់ជាមួយមិត្តភក្តិ ហើយរៀនអង់គ្លេសដោយមិនបាច់ប្រញាប់ប្រញាល់!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Sunday is indeed a relaxing and fruitful day!\"\n   🇰🇭 (ថ្ងៃអាទិត្យពិតជាថ្ងៃសម្រាក និងពោរពេញដោយផលល្អ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el23",
          "day": 23,
          "title": "ថ្ងៃទី 23៖ រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត (Month 1 Grand Review: Grammar, Vocabulary & Practice)",
          "topic": "រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត",
          "grammar": "សង្ខេបចំណុចសំខាន់ៗទាំង ២២ ថ្ងៃនៃខែទី ១៖\n១. Subject Pronouns: I, You, We, They, He, She, It\n២. Verb To Be: Am, Is, Are (Affirmative, Negative, Question)\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Demonstratives: This, That, These, Those\n៥. Plural Nouns: -s, -es, -ies\n៦. Numbers 1-100 & Counting\n៧. Family Members & Verb To Have (Have/Has)\n៨. Feelings & Emotions (Happy, Sad, Tired, Hungry)\n៩. Daily Routines & Telling Time (Present Simple)",
          "vocab": [
            {
              "en": "review",
              "kh": "រំលឹកឡើងវិញ",
              "ipa": "/rɪˈvjuː/",
              "exEn": "Let us review Month 1 lessons.",
              "exKh": "តោះយើងរំលឹកមេរៀនខែទី ១ ឡើងវិញ។"
            },
            {
              "en": "master",
              "kh": "ចេះស្ទាត់ជំនាញ",
              "ipa": "/ˈmɑːstər/",
              "exEn": "You master basic English grammar.",
              "exKh": "កូនចេះស្ទាត់វេយ្យាករណ៍អង់គ្លេសគ្រឹះហើយ។"
            },
            {
              "en": "confident",
              "kh": "មានទំនុកចិត្ត",
              "ipa": "/ˈkɒnfɪdənt/",
              "exEn": "I feel confident about the exam.",
              "exKh": "ខ្ញុំមានទំនុកចិត្តចំពោះការប្រឡង។"
            }
          ],
          "sentences": [
            {
              "en": "I understand all Month 1 grammar lessons clearly.",
              "kh": "ខ្ញុំយល់ច្បាស់នូវរាល់មេរៀនវេយ្យាករណ៍ខែទី ១។"
            },
            {
              "en": "Practice makes perfect in English learning.",
              "kh": "ការអនុវត្តជួយឱ្យការរៀនភាសាអង់គ្លេសកាន់តែល្អឥតខ្ចោះ។"
            },
            {
              "en": "We are ready to pass the Month 1 Final Examination.",
              "kh": "ពួកយើងរួចរាល់ក្នុងការប្រឡងជាប់ការប្រឡងបញ្ចប់ខែទី ១ ហើយ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "How do you feel after completing 23 days of Elementary English?",
              "kh": "តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរក្រោយបញ្ចប់ ២៣ ថ្ងៃនៃថ្នាក់បឋមសិក្សា?"
            },
            {
              "speaker": "Student",
              "en": "Teacher Piseth, I feel so much more confident! I know how to introduce myself, tell the time, and talk about my daily life.",
              "kh": "អ្នកគ្រូពិសិដ្ឋ ខ្ញុំមានទំនុកចិត្តជាងមុនច្រើនណាស់! ខ្ញុំចេះណែនាំខ្លួន ប្រាប់ម៉ោង និងនិយាយពីជីវិតប្រចាំថ្ងៃបានហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "I am so proud of your dedication! Tomorrow is our Month 1 Final Exam. You will do great!",
              "kh": "អ្នកគ្រូមានមោទនភាពចំពោះការខិតខំរបស់កូនណាស់! ថ្ងៃស្អែកជាការប្រឡងបញ្ចប់ខែទី ១ ហើយ។ កូននឹងធ្វើបានល្អ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 23\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំខែទី ១៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការអនុវត្ត (Month 1 Grand Review: Grammar, Vocabulary & Practice)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nសង្ខេបចំណុចសំខាន់ៗទាំង ២២ ថ្ងៃនៃខែទី ១៖\n១. Subject Pronouns: I, You, We, They, He, She, It\n២. Verb To Be: Am, Is, Are (Affirmative, Negative, Question)\n៣. Possessives: My, Your, His, Her, Our, Their\n៤. Demonstratives: This, That, These, Those\n៥. Plural Nouns: -s, -es, -ies\n៦. Numbers 1-100 & Counting\n៧. Family Members & Verb To Have (Have/Has)\n៨. Feelings & Emotions (Happy, Sad, Tired, Hungry)\n៩. Daily Routines & Telling Time (Present Simple)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 review (/rɪˈvjuː/) = 🇰🇭 រំលឹកឡើងវិញ\n   ↳ ឧទាហរណ៍៖ Let us review Month 1 lessons.\n   ↳ បកប្រែ៖ (តោះយើងរំលឹកមេរៀនខែទី ១ ឡើងវិញ។)\n\n2. 🇬🇧 master (/ˈmɑːstər/) = 🇰🇭 ចេះស្ទាត់ជំនាញ\n   ↳ ឧទាហរណ៍៖ You master basic English grammar.\n   ↳ បកប្រែ៖ (កូនចេះស្ទាត់វេយ្យាករណ៍អង់គ្លេសគ្រឹះហើយ។)\n\n3. 🇬🇧 confident (/ˈkɒnfɪdənt/) = 🇰🇭 មានទំនុកចិត្ត\n   ↳ ឧទាហរណ៍៖ I feel confident about the exam.\n   ↳ បកប្រែ៖ (ខ្ញុំមានទំនុកចិត្តចំពោះការប្រឡង។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I understand all Month 1 grammar lessons clearly.\n   🇰🇭 (ខ្ញុំយល់ច្បាស់នូវរាល់មេរៀនវេយ្យាករណ៍ខែទី ១។)\n2. 🇬🇧 Practice makes perfect in English learning.\n   🇰🇭 (ការអនុវត្តជួយឱ្យការរៀនភាសាអង់គ្លេសកាន់តែល្អឥតខ្ចោះ។)\n3. 🇬🇧 We are ready to pass the Month 1 Final Examination.\n   🇰🇭 (ពួកយើងរួចរាល់ក្នុងការប្រឡងជាប់ការប្រឡងបញ្ចប់ខែទី ១ ហើយ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"How do you feel after completing 23 days of Elementary English?\"\n   🇰🇭 (តើកូនៗមានអារម្មណ៍យ៉ាងណាដែរក្រោយបញ្ចប់ ២៣ ថ្ងៃនៃថ្នាក់បឋមសិក្សា?)\n\n👤 Student:\n   🇬🇧 \"Teacher Piseth, I feel so much more confident! I know how to introduce myself, tell the time, and talk about my daily life.\"\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋ ខ្ញុំមានទំនុកចិត្តជាងមុនច្រើនណាស់! ខ្ញុំចេះណែនាំខ្លួន ប្រាប់ម៉ោង និងនិយាយពីជីវិតប្រចាំថ្ងៃបានហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"I am so proud of your dedication! Tomorrow is our Month 1 Final Exam. You will do great!\"\n   🇰🇭 (អ្នកគ្រូមានមោទនភាពចំពោះការខិតខំរបស់កូនណាស់! ថ្ងៃស្អែកជាការប្រឡងបញ្ចប់ខែទី ១ ហើយ។ កូននឹងធ្វើបានល្អ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el24",
          "day": 24,
          "title": "ថ្ងៃទី 24៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam) (Month 1 Progress Assessment (ការប្រឡងប្រចាំខែទី ១ - Month 1 Final Exam))",
          "topic": "ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam)",
          "grammar": "គោលបំណងនៃការប្រឡងប្រចាំខែទី ១៖\n• វាស់ស្ទង់សមត្ថភាពវេយ្យាករណ៍គ្រឹះ (Pronouns, Verb To Be, To Have, Plural Nouns)\n• វាក្យសព្ទប្រចាំថ្ងៃ (សាលារៀន គ្រួសារ ពេលវេលា អារម្មណ៍)\n• ការយល់ដឹងអំពីល្បះ និងការសន្ទនា\n• សិស្សដែលប្រឡងជាប់ចាប់ពីនិទ្ទេស C (70%) ឡើងទៅ នឹងទទួលបាន វិញ្ញាបនបត្រជោគជ័យខែទី ១ (Month 1 Certificate)!",
          "vocab": [
            {
              "en": "assessment",
              "kh": "ការវាយតម្លៃ",
              "ipa": "/əˈsesmənt/",
              "exEn": "This assessment shows your progress.",
              "exKh": "ការវាយតម្លៃនេះបង្ហាញពីការរីកចម្រើនរបស់អ្នក។"
            },
            {
              "en": "exam",
              "kh": "ការប្រឡង",
              "ipa": "/ɪɡˈzæm/",
              "exEn": "I study hard for the exam.",
              "exKh": "ខ្ញុំខំរៀនសម្រាប់ការប្រឡង។"
            },
            {
              "en": "success",
              "kh": "ភាពជោគជ័យ",
              "ipa": "/səkˈses/",
              "exEn": "I wish you big success!",
              "exKh": "ជូនពរឱ្យកូនទទួលបានជោគជ័យដ៏ធំធេង!"
            },
            {
              "en": "certificate",
              "kh": "វិញ្ញាបនបត្រ",
              "ipa": "/səˈtɪfɪkət/",
              "exEn": "Earn your official certificate.",
              "exKh": "ទទួលបានវិញ្ញាបនបត្រផ្លូវការរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "I do my best on the Month 1 Final Exam.",
              "kh": "ខ្ញុំខិតខំឱ្យអស់ពីសមត្ថភាពលើការប្រឡងបញ្ចប់ខែទី ១។"
            },
            {
              "en": "Congratulations on completing Month 1 of Elementary English!",
              "kh": "អបអរសាទរចំពោះការបញ្ចប់ខែទី ១ នៃថ្នាក់បឋមសិក្សា!"
            },
            {
              "en": "Hard work brings outstanding results.",
              "kh": "ការខិតខំប្រឹងប្រែងនាំមកនូវលទ្ធផលដ៏លេចធ្លោ។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Take a deep breath and start your Month 1 exam with confidence!",
              "kh": "ដកដង្ហើមវែងៗ ហើយចាប់ផ្តើមការប្រឡងខែទី ១ ដោយភាពជឿជាក់ណា!"
            },
            {
              "speaker": "Student",
              "en": "Thank you, Teacher Piseth! I will read every question carefully and get Grade A!",
              "kh": "អរគុណអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំនឹងអានសំណួរនីមួយៗឱ្យច្បាស់ និងយកនិទ្ទេស A ជូនអ្នកគ្រូ!"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "You have my full support and blessings! Go for it, superstar!",
              "kh": "អ្នកគ្រូគាំទ្រ និងជូនពរកូនជានិច្ច! ធ្វើឱ្យបានល្អណា កូនសិស្សឆ្នើម!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 1 • សប្តាហ៍ទី 4 • ថ្ងៃទី 24\n🎯 ប្រធានបទ៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ១ (Month 1 Final Exam) (Month 1 Progress Assessment (ការប្រឡងប្រចាំខែទី ១ - Month 1 Final Exam))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nគោលបំណងនៃការប្រឡងប្រចាំខែទី ១៖\n• វាស់ស្ទង់សមត្ថភាពវេយ្យាករណ៍គ្រឹះ (Pronouns, Verb To Be, To Have, Plural Nouns)\n• វាក្យសព្ទប្រចាំថ្ងៃ (សាលារៀន គ្រួសារ ពេលវេលា អារម្មណ៍)\n• ការយល់ដឹងអំពីល្បះ និងការសន្ទនា\n• សិស្សដែលប្រឡងជាប់ចាប់ពីនិទ្ទេស C (70%) ឡើងទៅ នឹងទទួលបាន វិញ្ញាបនបត្រជោគជ័យខែទី ១ (Month 1 Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 assessment (/əˈsesmənt/) = 🇰🇭 ការវាយតម្លៃ\n   ↳ ឧទាហរណ៍៖ This assessment shows your progress.\n   ↳ បកប្រែ៖ (ការវាយតម្លៃនេះបង្ហាញពីការរីកចម្រើនរបស់អ្នក។)\n\n2. 🇬🇧 exam (/ɪɡˈzæm/) = 🇰🇭 ការប្រឡង\n   ↳ ឧទាហរណ៍៖ I study hard for the exam.\n   ↳ បកប្រែ៖ (ខ្ញុំខំរៀនសម្រាប់ការប្រឡង។)\n\n3. 🇬🇧 success (/səkˈses/) = 🇰🇭 ភាពជោគជ័យ\n   ↳ ឧទាហរណ៍៖ I wish you big success!\n   ↳ បកប្រែ៖ (ជូនពរឱ្យកូនទទួលបានជោគជ័យដ៏ធំធេង!)\n\n4. 🇬🇧 certificate (/səˈtɪfɪkət/) = 🇰🇭 វិញ្ញាបនបត្រ\n   ↳ ឧទាហរណ៍៖ Earn your official certificate.\n   ↳ បកប្រែ៖ (ទទួលបានវិញ្ញាបនបត្រផ្លូវការរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 I do my best on the Month 1 Final Exam.\n   🇰🇭 (ខ្ញុំខិតខំឱ្យអស់ពីសមត្ថភាពលើការប្រឡងបញ្ចប់ខែទី ១។)\n2. 🇬🇧 Congratulations on completing Month 1 of Elementary English!\n   🇰🇭 (អបអរសាទរចំពោះការបញ្ចប់ខែទី ១ នៃថ្នាក់បឋមសិក្សា!)\n3. 🇬🇧 Hard work brings outstanding results.\n   🇰🇭 (ការខិតខំប្រឹងប្រែងនាំមកនូវលទ្ធផលដ៏លេចធ្លោ។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Take a deep breath and start your Month 1 exam with confidence!\"\n   🇰🇭 (ដកដង្ហើមវែងៗ ហើយចាប់ផ្តើមការប្រឡងខែទី ១ ដោយភាពជឿជាក់ណា!)\n\n👤 Student:\n   🇬🇧 \"Thank you, Teacher Piseth! I will read every question carefully and get Grade A!\"\n   🇰🇭 (អរគុណអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំនឹងអានសំណួរនីមួយៗឱ្យច្បាស់ និងយកនិទ្ទេស A ជូនអ្នកគ្រូ!)\n\n👤 Teacher Piseth:\n   🇬🇧 \"You have my full support and blessings! Go for it, superstar!\"\n   🇰🇭 (អ្នកគ្រូគាំទ្រ និងជូនពរកូនជានិច្ច! ធ្វើឱ្យបានល្អណា កូនសិស្សឆ្នើម!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew5",
      "weekNum": 5,
      "monthWeekNum": 1,
      "title": "សប្តាហ៍ទី 1 (ថ្ងៃទី 25 - 30)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 1 ខែទី 2",
      "lessons": [
        {
          "id": "el25",
          "day": 25,
          "title": "ថ្ងៃទី 25៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House (Rooms in the House (Living room, Bedroom, Kitchen, Bathroom))",
          "topic": "បន្ទប់នានាក្នុងផ្ទះ Rooms in the House",
          "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
          "vocab": [
            {
              "en": "living room",
              "kh": "បន្ទប់ទទួលភ្ញៀវ",
              "ipa": "/ˈlɪvɪŋ ruːm/",
              "exEn": "Our living room is bright.",
              "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
            },
            {
              "en": "bedroom",
              "kh": "បន្ទប់គេង",
              "ipa": "/ˈbedruːm/",
              "exEn": "I sleep in my bedroom.",
              "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
            },
            {
              "en": "kitchen",
              "kh": "ផ្ទះបាយ",
              "ipa": "/ˈkɪtʃɪn/",
              "exEn": "Mother cooks in the kitchen.",
              "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
            },
            {
              "en": "sofa",
              "kh": "សាឡុង",
              "ipa": "/ˈsəʊfə/",
              "exEn": "Sit on the comfortable sofa.",
              "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
            },
            {
              "en": "fridge",
              "kh": "ទូទឹកកក",
              "ipa": "/frɪdʒ/",
              "exEn": "Milk is in the fridge.",
              "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 25: Rooms in the House (Living room, Bedroom, Kitchen, Bathroom) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 25៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 25! Are you ready to master Rooms in the House (Living room, Bedroom, Kitchen, Bathroom)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 25! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 25\n🎯 ប្រធានបទ៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House (Rooms in the House (Living room, Bedroom, Kitchen, Bathroom))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 25: Rooms in the House (Living room, Bedroom, Kitchen, Bathroom) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 25៖ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 25! Are you ready to master Rooms in the House (Living room, Bedroom, Kitchen, Bathroom)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 25! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្ទប់នានាក្នុងផ្ទះ Rooms in the House ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el26",
          "day": 26,
          "title": "ថ្ងៃទី 26៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items (Furniture & Household Items (Sofa, Bed, Table, Fridge, TV))",
          "topic": "គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items",
          "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
          "vocab": [
            {
              "en": "living room",
              "kh": "បន្ទប់ទទួលភ្ញៀវ",
              "ipa": "/ˈlɪvɪŋ ruːm/",
              "exEn": "Our living room is bright.",
              "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
            },
            {
              "en": "bedroom",
              "kh": "បន្ទប់គេង",
              "ipa": "/ˈbedruːm/",
              "exEn": "I sleep in my bedroom.",
              "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
            },
            {
              "en": "kitchen",
              "kh": "ផ្ទះបាយ",
              "ipa": "/ˈkɪtʃɪn/",
              "exEn": "Mother cooks in the kitchen.",
              "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
            },
            {
              "en": "sofa",
              "kh": "សាឡុង",
              "ipa": "/ˈsəʊfə/",
              "exEn": "Sit on the comfortable sofa.",
              "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
            },
            {
              "en": "fridge",
              "kh": "ទូទឹកកក",
              "ipa": "/frɪdʒ/",
              "exEn": "Milk is in the fridge.",
              "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 26: Furniture & Household Items (Sofa, Bed, Table, Fridge, TV) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 26៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 26! Are you ready to master Furniture & Household Items (Sofa, Bed, Table, Fridge, TV)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 26! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 26\n🎯 ប្រធានបទ៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items (Furniture & Household Items (Sofa, Bed, Table, Fridge, TV))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 26: Furniture & Household Items (Sofa, Bed, Table, Fridge, TV) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 26៖ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 26! Are you ready to master Furniture & Household Items (Sofa, Bed, Table, Fridge, TV)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 26! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ គ្រឿងសង្ហារិម និងរបស់របរក្នុងផ្ទះ Furniture & Items ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el27",
          "day": 27,
          "title": "ថ្ងៃទី 27៖ កិរិយាសព្ទ There is និង There are (មាន...) (There is & There are (Affirmative, Negative, Questions))",
          "topic": "កិរិយាសព្ទ There is និង There are (មាន...)",
          "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
          "vocab": [
            {
              "en": "living room",
              "kh": "បន្ទប់ទទួលភ្ញៀវ",
              "ipa": "/ˈlɪvɪŋ ruːm/",
              "exEn": "Our living room is bright.",
              "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
            },
            {
              "en": "bedroom",
              "kh": "បន្ទប់គេង",
              "ipa": "/ˈbedruːm/",
              "exEn": "I sleep in my bedroom.",
              "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
            },
            {
              "en": "kitchen",
              "kh": "ផ្ទះបាយ",
              "ipa": "/ˈkɪtʃɪn/",
              "exEn": "Mother cooks in the kitchen.",
              "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
            },
            {
              "en": "sofa",
              "kh": "សាឡុង",
              "ipa": "/ˈsəʊfə/",
              "exEn": "Sit on the comfortable sofa.",
              "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
            },
            {
              "en": "fridge",
              "kh": "ទូទឹកកក",
              "ipa": "/frɪdʒ/",
              "exEn": "Milk is in the fridge.",
              "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 27: There is & There are (Affirmative, Negative, Questions) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 27៖ កិរិយាសព្ទ There is និង There are (មាន...) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 27! Are you ready to master There is & There are (Affirmative, Negative, Questions)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 27! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទ There is និង There are (មាន...) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 27\n🎯 ប្រធានបទ៖ កិរិយាសព្ទ There is និង There are (មាន...) (There is & There are (Affirmative, Negative, Questions))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 27: There is & There are (Affirmative, Negative, Questions) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 27៖ កិរិយាសព្ទ There is និង There are (មាន...) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 27! Are you ready to master There is & There are (Affirmative, Negative, Questions)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 27! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទ There is និង There are (មាន...) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el28",
          "day": 28,
          "title": "ថ្ងៃទី 28៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) (Prepositions of Place in the House (In front of, Behind, Between))",
          "topic": "ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite)",
          "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
          "vocab": [
            {
              "en": "living room",
              "kh": "បន្ទប់ទទួលភ្ញៀវ",
              "ipa": "/ˈlɪvɪŋ ruːm/",
              "exEn": "Our living room is bright.",
              "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
            },
            {
              "en": "bedroom",
              "kh": "បន្ទប់គេង",
              "ipa": "/ˈbedruːm/",
              "exEn": "I sleep in my bedroom.",
              "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
            },
            {
              "en": "kitchen",
              "kh": "ផ្ទះបាយ",
              "ipa": "/ˈkɪtʃɪn/",
              "exEn": "Mother cooks in the kitchen.",
              "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
            },
            {
              "en": "sofa",
              "kh": "សាឡុង",
              "ipa": "/ˈsəʊfə/",
              "exEn": "Sit on the comfortable sofa.",
              "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
            },
            {
              "en": "fridge",
              "kh": "ទូទឹកកក",
              "ipa": "/frɪdʒ/",
              "exEn": "Milk is in the fridge.",
              "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 28: Prepositions of Place in the House (In front of, Behind, Between) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 28៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 28! Are you ready to master Prepositions of Place in the House (In front of, Behind, Between)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 28! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 28\n🎯 ប្រធានបទ៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) (Prepositions of Place in the House (In front of, Behind, Between))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 28: Prepositions of Place in the House (In front of, Behind, Between) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 28៖ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 28! Are you ready to master Prepositions of Place in the House (In front of, Behind, Between)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 28! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ធ្នាក់ទីតាំងក្នុងផ្ទះ (Between, In front of, Opposite) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el29",
          "day": 29,
          "title": "ថ្ងៃទី 29៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores (Daily House Chores (Clean room, Wash dishes, Cook dinner))",
          "topic": "កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores",
          "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
          "vocab": [
            {
              "en": "living room",
              "kh": "បន្ទប់ទទួលភ្ញៀវ",
              "ipa": "/ˈlɪvɪŋ ruːm/",
              "exEn": "Our living room is bright.",
              "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
            },
            {
              "en": "bedroom",
              "kh": "បន្ទប់គេង",
              "ipa": "/ˈbedruːm/",
              "exEn": "I sleep in my bedroom.",
              "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
            },
            {
              "en": "kitchen",
              "kh": "ផ្ទះបាយ",
              "ipa": "/ˈkɪtʃɪn/",
              "exEn": "Mother cooks in the kitchen.",
              "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
            },
            {
              "en": "sofa",
              "kh": "សាឡុង",
              "ipa": "/ˈsəʊfə/",
              "exEn": "Sit on the comfortable sofa.",
              "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
            },
            {
              "en": "fridge",
              "kh": "ទូទឹកកក",
              "ipa": "/frɪdʒ/",
              "exEn": "Milk is in the fridge.",
              "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 29: Daily House Chores (Clean room, Wash dishes, Cook dinner) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 29៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 29! Are you ready to master Daily House Chores (Clean room, Wash dishes, Cook dinner)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 29! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 29\n🎯 ប្រធានបទ៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores (Daily House Chores (Clean room, Wash dishes, Cook dinner))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 29: Daily House Chores (Clean room, Wash dishes, Cook dinner) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 29៖ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 29! Are you ready to master Daily House Chores (Clean room, Wash dishes, Cook dinner)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 29! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិច្ចការផ្ទះប្រចាំថ្ងៃ Daily House Chores ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el30",
          "day": 30,
          "title": "ថ្ងៃទី 30៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ (Weekly Review & Dialogue: Welcome to My Home)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ",
          "grammar": "ការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.",
          "vocab": [
            {
              "en": "living room",
              "kh": "បន្ទប់ទទួលភ្ញៀវ",
              "ipa": "/ˈlɪvɪŋ ruːm/",
              "exEn": "Our living room is bright.",
              "exKh": "បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។"
            },
            {
              "en": "bedroom",
              "kh": "បន្ទប់គេង",
              "ipa": "/ˈbedruːm/",
              "exEn": "I sleep in my bedroom.",
              "exKh": "ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។"
            },
            {
              "en": "kitchen",
              "kh": "ផ្ទះបាយ",
              "ipa": "/ˈkɪtʃɪn/",
              "exEn": "Mother cooks in the kitchen.",
              "exKh": "ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។"
            },
            {
              "en": "sofa",
              "kh": "សាឡុង",
              "ipa": "/ˈsəʊfə/",
              "exEn": "Sit on the comfortable sofa.",
              "exKh": "អង្គុយលើសាឡុងដ៏មានផាសុកភាព។"
            },
            {
              "en": "fridge",
              "kh": "ទូទឹកកក",
              "ipa": "/frɪdʒ/",
              "exEn": "Milk is in the fridge.",
              "exKh": "ទឹកដោះគោនៅក្នុងទូទឹកកក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 30: Weekly Review & Dialogue: Welcome to My Home today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 30៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 30! Are you ready to master Weekly Review & Dialogue: Welcome to My Home?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 30! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 5 • ថ្ងៃទី 30\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ (Weekly Review & Dialogue: Welcome to My Home)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរៀបរាប់អំពីបន្ទប់ និងរបស់របរក្នុងផ្ទះដោយប្រើ There is (ឯកវចនៈ) និង There are (ពហុវចនៈ)៖\n• There is a sofa in the living room. (មានសាឡុងមួយក្នុងបន្ទប់ទទួលភ្ញៀវ)\n• There are two chairs in the kitchen. (មានកៅអីពីរក្នងផ្ទះបាយ)\n• Is there a fridge? -> Yes, there is. / No, there isn't.\n• Are there any windows? -> Yes, there are. / No, there aren't.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 living room (/ˈlɪvɪŋ ruːm/) = 🇰🇭 បន្ទប់ទទួលភ្ញៀវ\n   ↳ ឧទាហរណ៍៖ Our living room is bright.\n   ↳ បកប្រែ៖ (បន្ទប់ទទួលភ្ញៀវយើងភ្លឺស្រឡះល្អ។)\n\n2. 🇬🇧 bedroom (/ˈbedruːm/) = 🇰🇭 បន្ទប់គេង\n   ↳ ឧទាហរណ៍៖ I sleep in my bedroom.\n   ↳ បកប្រែ៖ (ខ្ញុំគេងក្នុងបន្ទប់គេងរបស់ខ្ញុំ។)\n\n3. 🇬🇧 kitchen (/ˈkɪtʃɪn/) = 🇰🇭 ផ្ទះបាយ\n   ↳ ឧទាហរណ៍៖ Mother cooks in the kitchen.\n   ↳ បកប្រែ៖ (ម្តាយចម្អិនម្ហូបក្នុងផ្ទះបាយ។)\n\n4. 🇬🇧 sofa (/ˈsəʊfə/) = 🇰🇭 សាឡុង\n   ↳ ឧទាហរណ៍៖ Sit on the comfortable sofa.\n   ↳ បកប្រែ៖ (អង្គុយលើសាឡុងដ៏មានផាសុកភាព។)\n\n5. 🇬🇧 fridge (/frɪdʒ/) = 🇰🇭 ទូទឹកកក\n   ↳ ឧទាហរណ៍៖ Milk is in the fridge.\n   ↳ បកប្រែ៖ (ទឹកដោះគោនៅក្នុងទូទឹកកក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 30: Weekly Review & Dialogue: Welcome to My Home today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 30៖ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 30! Are you ready to master Weekly Review & Dialogue: Welcome to My Home?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 30! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៥ និងការសន្ទនាស្វាគមន៍មកកាន់ផ្ទះខ្ញុំ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew6",
      "weekNum": 6,
      "monthWeekNum": 2,
      "title": "សប្តាហ៍ទី 2 (ថ្ងៃទី 31 - 36)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 2 ខែទី 2",
      "lessons": [
        {
          "id": "el31",
          "day": 31,
          "title": "ថ្ងៃទី 31៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) (Modal Verb Can for Ability (I can swim, She can speak English))",
          "topic": "កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...)",
          "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
          "vocab": [
            {
              "en": "can",
              "kh": "អាច (សមត្ថភាព)",
              "ipa": "/kæn/",
              "exEn": "I can speak English.",
              "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
            },
            {
              "en": "swim",
              "kh": "ហែលទឹក",
              "ipa": "/swɪm/",
              "exEn": "He can swim very fast.",
              "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
            },
            {
              "en": "sing",
              "kh": "ច្រៀង",
              "ipa": "/sɪŋ/",
              "exEn": "She can sing beautifully.",
              "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
            },
            {
              "en": "dance",
              "kh": "រាំ",
              "ipa": "/dɑːns/",
              "exEn": "They can dance Khmer traditional dance.",
              "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
            },
            {
              "en": "draw",
              "kh": "គូររូប",
              "ipa": "/drɔː/",
              "exEn": "I can draw cute animals.",
              "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 31: Modal Verb Can for Ability (I can swim, She can speak English) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 31៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 31! Are you ready to master Modal Verb Can for Ability (I can swim, She can speak English)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 31! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 31\n🎯 ប្រធានបទ៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) (Modal Verb Can for Ability (I can swim, She can speak English))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 31: Modal Verb Can for Ability (I can swim, She can speak English) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 31៖ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 31! Are you ready to master Modal Verb Can for Ability (I can swim, She can speak English)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 31! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទជំនួយ Can បញ្ជាក់ពីសមត្ថភាព (I can...) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el32",
          "day": 32,
          "title": "ថ្ងៃទី 32៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? (Negative Cannot / Can't & Questions (Can you play guitar?))",
          "topic": "ទម្រង់បដិសេធ Can't និងសំណួរ Can you...?",
          "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
          "vocab": [
            {
              "en": "can",
              "kh": "អាច (សមត្ថភាព)",
              "ipa": "/kæn/",
              "exEn": "I can speak English.",
              "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
            },
            {
              "en": "swim",
              "kh": "ហែលទឹក",
              "ipa": "/swɪm/",
              "exEn": "He can swim very fast.",
              "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
            },
            {
              "en": "sing",
              "kh": "ច្រៀង",
              "ipa": "/sɪŋ/",
              "exEn": "She can sing beautifully.",
              "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
            },
            {
              "en": "dance",
              "kh": "រាំ",
              "ipa": "/dɑːns/",
              "exEn": "They can dance Khmer traditional dance.",
              "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
            },
            {
              "en": "draw",
              "kh": "គូររូប",
              "ipa": "/drɔː/",
              "exEn": "I can draw cute animals.",
              "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 32: Negative Cannot / Can't & Questions (Can you play guitar?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 32៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 32! Are you ready to master Negative Cannot / Can't & Questions (Can you play guitar?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 32! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 32\n🎯 ប្រធានបទ៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? (Negative Cannot / Can't & Questions (Can you play guitar?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 32: Negative Cannot / Can't & Questions (Can you play guitar?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 32៖ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 32! Are you ready to master Negative Cannot / Can't & Questions (Can you play guitar?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 32! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទម្រង់បដិសេធ Can't និងសំណួរ Can you...? ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el33",
          "day": 33,
          "title": "ថ្ងៃទី 33៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents (Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike))",
          "topic": "កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents",
          "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
          "vocab": [
            {
              "en": "can",
              "kh": "អាច (សមត្ថភាព)",
              "ipa": "/kæn/",
              "exEn": "I can speak English.",
              "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
            },
            {
              "en": "swim",
              "kh": "ហែលទឹក",
              "ipa": "/swɪm/",
              "exEn": "He can swim very fast.",
              "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
            },
            {
              "en": "sing",
              "kh": "ច្រៀង",
              "ipa": "/sɪŋ/",
              "exEn": "She can sing beautifully.",
              "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
            },
            {
              "en": "dance",
              "kh": "រាំ",
              "ipa": "/dɑːns/",
              "exEn": "They can dance Khmer traditional dance.",
              "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
            },
            {
              "en": "draw",
              "kh": "គូររូប",
              "ipa": "/drɔː/",
              "exEn": "I can draw cute animals.",
              "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 33: Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 33៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 33! Are you ready to master Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 33! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 33\n🎯 ប្រធានបទ៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents (Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 33: Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 33៖ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 33! Are you ready to master Action Verbs & Talents (Sing, Dance, Draw, Cook, Ride bike)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 33! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ កិរិយាសព្ទសកម្មភាព និងទេពកោសល្យ Action Verbs & Talents ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el34",
          "day": 34,
          "title": "ថ្ងៃទី 34៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May (Asking for Permission with Can & May (Can I come in? May I drink?))",
          "topic": "ការសុំការអនុញ្ញាតដោយប្រើ Can & May",
          "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
          "vocab": [
            {
              "en": "can",
              "kh": "អាច (សមត្ថភាព)",
              "ipa": "/kæn/",
              "exEn": "I can speak English.",
              "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
            },
            {
              "en": "swim",
              "kh": "ហែលទឹក",
              "ipa": "/swɪm/",
              "exEn": "He can swim very fast.",
              "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
            },
            {
              "en": "sing",
              "kh": "ច្រៀង",
              "ipa": "/sɪŋ/",
              "exEn": "She can sing beautifully.",
              "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
            },
            {
              "en": "dance",
              "kh": "រាំ",
              "ipa": "/dɑːns/",
              "exEn": "They can dance Khmer traditional dance.",
              "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
            },
            {
              "en": "draw",
              "kh": "គូររូប",
              "ipa": "/drɔː/",
              "exEn": "I can draw cute animals.",
              "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 34: Asking for Permission with Can & May (Can I come in? May I drink?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 34៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 34! Are you ready to master Asking for Permission with Can & May (Can I come in? May I drink?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 34! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 34\n🎯 ប្រធានបទ៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May (Asking for Permission with Can & May (Can I come in? May I drink?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 34: Asking for Permission with Can & May (Can I come in? May I drink?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 34៖ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 34! Are you ready to master Asking for Permission with Can & May (Can I come in? May I drink?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 34! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសុំការអនុញ្ញាតដោយប្រើ Can & May ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el35",
          "day": 35,
          "title": "ថ្ងៃទី 35៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests (Polite Requests & Offers (Could you please... / Would you like...?))",
          "topic": "ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests",
          "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
          "vocab": [
            {
              "en": "can",
              "kh": "អាច (សមត្ថភាព)",
              "ipa": "/kæn/",
              "exEn": "I can speak English.",
              "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
            },
            {
              "en": "swim",
              "kh": "ហែលទឹក",
              "ipa": "/swɪm/",
              "exEn": "He can swim very fast.",
              "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
            },
            {
              "en": "sing",
              "kh": "ច្រៀង",
              "ipa": "/sɪŋ/",
              "exEn": "She can sing beautifully.",
              "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
            },
            {
              "en": "dance",
              "kh": "រាំ",
              "ipa": "/dɑːns/",
              "exEn": "They can dance Khmer traditional dance.",
              "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
            },
            {
              "en": "draw",
              "kh": "គូររូប",
              "ipa": "/drɔː/",
              "exEn": "I can draw cute animals.",
              "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 35: Polite Requests & Offers (Could you please... / Would you like...?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 35៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 35! Are you ready to master Polite Requests & Offers (Could you please... / Would you like...?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 35! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 35\n🎯 ប្រធានបទ៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests (Polite Requests & Offers (Could you please... / Would you like...?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 35: Polite Requests & Offers (Could you please... / Would you like...?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 35៖ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 35! Are you ready to master Polite Requests & Offers (Could you please... / Would you like...?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 35! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការស្នើសុំ និងការអញ្ជើញដោយគួរសម Polite Requests ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el36",
          "day": 36,
          "title": "ថ្ងៃទី 36៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ (Weekly Review & Dialogue: Talents & Skills Interview)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ",
          "grammar": "កិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)",
          "vocab": [
            {
              "en": "can",
              "kh": "អាច (សមត្ថភាព)",
              "ipa": "/kæn/",
              "exEn": "I can speak English.",
              "exKh": "ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។"
            },
            {
              "en": "swim",
              "kh": "ហែលទឹក",
              "ipa": "/swɪm/",
              "exEn": "He can swim very fast.",
              "exKh": "គាត់អាចហែលទឹកបានលឿនណាស់។"
            },
            {
              "en": "sing",
              "kh": "ច្រៀង",
              "ipa": "/sɪŋ/",
              "exEn": "She can sing beautifully.",
              "exKh": "នាងអាចច្រៀងបានពិរោះណាស់។"
            },
            {
              "en": "dance",
              "kh": "រាំ",
              "ipa": "/dɑːns/",
              "exEn": "They can dance Khmer traditional dance.",
              "exKh": "ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។"
            },
            {
              "en": "draw",
              "kh": "គូររូប",
              "ipa": "/drɔː/",
              "exEn": "I can draw cute animals.",
              "exKh": "ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 36: Weekly Review & Dialogue: Talents & Skills Interview today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 36៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 36! Are you ready to master Weekly Review & Dialogue: Talents & Skills Interview?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 36! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 6 • ថ្ងៃទី 36\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ (Weekly Review & Dialogue: Talents & Skills Interview)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nកិរិយាសព្ទជំនួយ \"CAN\" បង្ហាញពីសមត្ថភាព ឬទេពកោសល្យ៖\n• ទម្រង់ស្រប: Subject + CAN + V1 (I can swim. She can sing sweetly.)\n• ទម្រង់បដិសេធ: Subject + CANNOT / CAN'T + V1 (I can't drive a car.)\n• ទម្រង់សំណួរ: CAN + Subject + V1...? (Can you speak English? -> Yes, I can! / No, I can't.)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 can (/kæn/) = 🇰🇭 អាច (សមត្ថភាព)\n   ↳ ឧទាហរណ៍៖ I can speak English.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចនិយាយភាសាអង់គ្លេសបាន។)\n\n2. 🇬🇧 swim (/swɪm/) = 🇰🇭 ហែលទឹក\n   ↳ ឧទាហរណ៍៖ He can swim very fast.\n   ↳ បកប្រែ៖ (គាត់អាចហែលទឹកបានលឿនណាស់។)\n\n3. 🇬🇧 sing (/sɪŋ/) = 🇰🇭 ច្រៀង\n   ↳ ឧទាហរណ៍៖ She can sing beautifully.\n   ↳ បកប្រែ៖ (នាងអាចច្រៀងបានពិរោះណាស់។)\n\n4. 🇬🇧 dance (/dɑːns/) = 🇰🇭 រាំ\n   ↳ ឧទាហរណ៍៖ They can dance Khmer traditional dance.\n   ↳ បកប្រែ៖ (ពួកគេអាចរាំរបាំប្រពៃណីខ្មែរបាន។)\n\n5. 🇬🇧 draw (/drɔː/) = 🇰🇭 គូររូប\n   ↳ ឧទាហរណ៍៖ I can draw cute animals.\n   ↳ បកប្រែ៖ (ខ្ញុំអាចគូររូបសត្វគួរឱ្យស្រឡាញ់បាន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 36: Weekly Review & Dialogue: Talents & Skills Interview today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 36៖ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 36! Are you ready to master Weekly Review & Dialogue: Talents & Skills Interview?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 36! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៦ និងការសន្ទនាសម្ភាសន៍ពីទេពកោសល្យ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew7",
      "weekNum": 7,
      "monthWeekNum": 3,
      "title": "សប្តាហ៍ទី 3 (ថ្ងៃទី 37 - 42)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 3 ខែទី 2",
      "lessons": [
        {
          "id": "el37",
          "day": 37,
          "title": "ថ្ងៃទី 37៖ អាហារ និងពេលអាហារ Food & Meals (Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish))",
          "topic": "អាហារ និងពេលអាហារ Food & Meals",
          "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
          "vocab": [
            {
              "en": "rice",
              "kh": "បាយ / អង្ករ",
              "ipa": "/raɪs/",
              "exEn": "Cambodians eat rice every day.",
              "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
            },
            {
              "en": "bread",
              "kh": "នំបុ័ង",
              "ipa": "/bred/",
              "exEn": "I eat fresh bread for breakfast.",
              "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
            },
            {
              "en": "soup",
              "kh": "សម្ល / ស៊ុប",
              "ipa": "/suːp/",
              "exEn": "Hot soup warms your body.",
              "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
            },
            {
              "en": "orange",
              "kh": "ផ្លែក្រូច",
              "ipa": "/ˈɒrɪndʒ/",
              "exEn": "Orange contains vitamin C.",
              "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
            },
            {
              "en": "water",
              "kh": "ទឹកស្អាត",
              "ipa": "/ˈwɔːtər/",
              "exEn": "Drink pure water regularly.",
              "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 37: Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 37៖ អាហារ និងពេលអាហារ Food & Meals ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 37! Are you ready to master Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 37! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អាហារ និងពេលអាហារ Food & Meals ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 37\n🎯 ប្រធានបទ៖ អាហារ និងពេលអាហារ Food & Meals (Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 37: Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 37៖ អាហារ និងពេលអាហារ Food & Meals ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 37! Are you ready to master Food & Meals (Breakfast, Lunch, Dinner, Rice, Bread, Meat, Fish)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 37! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អាហារ និងពេលអាហារ Food & Meals ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el38",
          "day": 38,
          "title": "ថ្ងៃទី 38៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables (Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot))",
          "topic": "បន្លែ និងផ្លែឈើ Fruits & Vegetables",
          "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
          "vocab": [
            {
              "en": "rice",
              "kh": "បាយ / អង្ករ",
              "ipa": "/raɪs/",
              "exEn": "Cambodians eat rice every day.",
              "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
            },
            {
              "en": "bread",
              "kh": "នំបុ័ង",
              "ipa": "/bred/",
              "exEn": "I eat fresh bread for breakfast.",
              "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
            },
            {
              "en": "soup",
              "kh": "សម្ល / ស៊ុប",
              "ipa": "/suːp/",
              "exEn": "Hot soup warms your body.",
              "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
            },
            {
              "en": "orange",
              "kh": "ផ្លែក្រូច",
              "ipa": "/ˈɒrɪndʒ/",
              "exEn": "Orange contains vitamin C.",
              "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
            },
            {
              "en": "water",
              "kh": "ទឹកស្អាត",
              "ipa": "/ˈwɔːtər/",
              "exEn": "Drink pure water regularly.",
              "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 38: Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 38៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 38! Are you ready to master Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 38! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្លែ និងផ្លែឈើ Fruits & Vegetables ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 38\n🎯 ប្រធានបទ៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables (Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 38: Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 38៖ បន្លែ និងផ្លែឈើ Fruits & Vegetables ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 38! Are you ready to master Fruits & Vegetables (Apple, Banana, Orange, Mango, Carrot)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 38! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បន្លែ និងផ្លែឈើ Fruits & Vegetables ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el39",
          "day": 39,
          "title": "ថ្ងៃទី 39៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts (Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake))",
          "topic": "ភេសជ្ជៈ និងបង្អែម Drinks & Desserts",
          "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
          "vocab": [
            {
              "en": "rice",
              "kh": "បាយ / អង្ករ",
              "ipa": "/raɪs/",
              "exEn": "Cambodians eat rice every day.",
              "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
            },
            {
              "en": "bread",
              "kh": "នំបុ័ង",
              "ipa": "/bred/",
              "exEn": "I eat fresh bread for breakfast.",
              "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
            },
            {
              "en": "soup",
              "kh": "សម្ល / ស៊ុប",
              "ipa": "/suːp/",
              "exEn": "Hot soup warms your body.",
              "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
            },
            {
              "en": "orange",
              "kh": "ផ្លែក្រូច",
              "ipa": "/ˈɒrɪndʒ/",
              "exEn": "Orange contains vitamin C.",
              "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
            },
            {
              "en": "water",
              "kh": "ទឹកស្អាត",
              "ipa": "/ˈwɔːtər/",
              "exEn": "Drink pure water regularly.",
              "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 39: Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 39៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 39! Are you ready to master Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 39! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 39\n🎯 ប្រធានបទ៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts (Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 39: Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 39៖ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 39! Are you ready to master Drinks & Desserts (Water, Milk, Juice, Tea, Coffee, Cake)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 39! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ភេសជ្ជៈ និងបង្អែម Drinks & Desserts ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el40",
          "day": 40,
          "title": "ថ្ងៃទី 40៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) (Countable vs Uncountable Nouns (A, An, Some, Any))",
          "topic": "នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An)",
          "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
          "vocab": [
            {
              "en": "rice",
              "kh": "បាយ / អង្ករ",
              "ipa": "/raɪs/",
              "exEn": "Cambodians eat rice every day.",
              "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
            },
            {
              "en": "bread",
              "kh": "នំបុ័ង",
              "ipa": "/bred/",
              "exEn": "I eat fresh bread for breakfast.",
              "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
            },
            {
              "en": "soup",
              "kh": "សម្ល / ស៊ុប",
              "ipa": "/suːp/",
              "exEn": "Hot soup warms your body.",
              "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
            },
            {
              "en": "orange",
              "kh": "ផ្លែក្រូច",
              "ipa": "/ˈɒrɪndʒ/",
              "exEn": "Orange contains vitamin C.",
              "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
            },
            {
              "en": "water",
              "kh": "ទឹកស្អាត",
              "ipa": "/ˈwɔːtər/",
              "exEn": "Drink pure water regularly.",
              "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 40: Countable vs Uncountable Nouns (A, An, Some, Any) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 40៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 40! Are you ready to master Countable vs Uncountable Nouns (A, An, Some, Any)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 40! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 40\n🎯 ប្រធានបទ៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) (Countable vs Uncountable Nouns (A, An, Some, Any))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 40: Countable vs Uncountable Nouns (A, An, Some, Any) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 40៖ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 40! Are you ready to master Countable vs Uncountable Nouns (A, An, Some, Any)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 40! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ នាមរាប់បាន និងរាប់មិនបាន (Some, Any, A, An) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el41",
          "day": 41,
          "title": "ថ្ងៃទី 41៖ ការសួរចំនួន How many និង How much (How Many vs How Much (How many eggs? How much water?))",
          "topic": "ការសួរចំនួន How many និង How much",
          "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
          "vocab": [
            {
              "en": "rice",
              "kh": "បាយ / អង្ករ",
              "ipa": "/raɪs/",
              "exEn": "Cambodians eat rice every day.",
              "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
            },
            {
              "en": "bread",
              "kh": "នំបុ័ង",
              "ipa": "/bred/",
              "exEn": "I eat fresh bread for breakfast.",
              "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
            },
            {
              "en": "soup",
              "kh": "សម្ល / ស៊ុប",
              "ipa": "/suːp/",
              "exEn": "Hot soup warms your body.",
              "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
            },
            {
              "en": "orange",
              "kh": "ផ្លែក្រូច",
              "ipa": "/ˈɒrɪndʒ/",
              "exEn": "Orange contains vitamin C.",
              "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
            },
            {
              "en": "water",
              "kh": "ទឹកស្អាត",
              "ipa": "/ˈwɔːtər/",
              "exEn": "Drink pure water regularly.",
              "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 41: How Many vs How Much (How many eggs? How much water?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 41៖ ការសួរចំនួន How many និង How much ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 41! Are you ready to master How Many vs How Much (How many eggs? How much water?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 41! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរចំនួន How many និង How much ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 41\n🎯 ប្រធានបទ៖ ការសួរចំនួន How many និង How much (How Many vs How Much (How many eggs? How much water?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 41: How Many vs How Much (How many eggs? How much water?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 41៖ ការសួរចំនួន How many និង How much ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 41! Are you ready to master How Many vs How Much (How many eggs? How much water?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 41! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរចំនួន How many និង How much ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el42",
          "day": 42,
          "title": "ថ្ងៃទី 42៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន (Weekly Review & Dialogue: Ordering Food at a Restaurant)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន",
          "grammar": "នាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.",
          "vocab": [
            {
              "en": "rice",
              "kh": "បាយ / អង្ករ",
              "ipa": "/raɪs/",
              "exEn": "Cambodians eat rice every day.",
              "exKh": "ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។"
            },
            {
              "en": "bread",
              "kh": "នំបុ័ង",
              "ipa": "/bred/",
              "exEn": "I eat fresh bread for breakfast.",
              "exKh": "ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។"
            },
            {
              "en": "soup",
              "kh": "សម្ល / ស៊ុប",
              "ipa": "/suːp/",
              "exEn": "Hot soup warms your body.",
              "exKh": "សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។"
            },
            {
              "en": "orange",
              "kh": "ផ្លែក្រូច",
              "ipa": "/ˈɒrɪndʒ/",
              "exEn": "Orange contains vitamin C.",
              "exKh": "ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។"
            },
            {
              "en": "water",
              "kh": "ទឹកស្អាត",
              "ipa": "/ˈwɔːtər/",
              "exEn": "Drink pure water regularly.",
              "exKh": "ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 42: Weekly Review & Dialogue: Ordering Food at a Restaurant today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 42៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 42! Are you ready to master Weekly Review & Dialogue: Ordering Food at a Restaurant?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 42! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 7 • ថ្ងៃទី 42\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន (Weekly Review & Dialogue: Ordering Food at a Restaurant)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nនាមរាប់បាន (Countable) និងនាមរាប់មិនបាន (Uncountable)៖\n• នាមរាប់បាន: an apple, three eggs, two bananas (ប្រើ How many...)\n• នាមរាប់មិនបាន: water, milk, rice, sugar, bread (ប្រើ How much...)\n• Some (ប្រើក្នុងប្រយោគស្រប): I have some milk. I have some apples.\n• Any (ប្រើក្នុងបដិសេធ និងសំណួរ): Do you have any sugar? I don't have any bread.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 rice (/raɪs/) = 🇰🇭 បាយ / អង្ករ\n   ↳ ឧទាហរណ៍៖ Cambodians eat rice every day.\n   ↳ បកប្រែ៖ (ប្រជាជនកម្ពុជាញ៉ាំបាយរាល់ថ្ងៃ។)\n\n2. 🇬🇧 bread (/bred/) = 🇰🇭 នំបុ័ង\n   ↳ ឧទាហរណ៍៖ I eat fresh bread for breakfast.\n   ↳ បកប្រែ៖ (ខ្ញុំញ៉ាំនំបុ័ងស្រស់សម្រាប់អាហារពេលព្រឹក។)\n\n3. 🇬🇧 soup (/suːp/) = 🇰🇭 សម្ល / ស៊ុប\n   ↳ ឧទាហរណ៍៖ Hot soup warms your body.\n   ↳ បកប្រែ៖ (សម្លក្តៅៗជួយឱ្យរាងកាយកក់ក្តៅ។)\n\n4. 🇬🇧 orange (/ˈɒrɪndʒ/) = 🇰🇭 ផ្លែក្រូច\n   ↳ ឧទាហរណ៍៖ Orange contains vitamin C.\n   ↳ បកប្រែ៖ (ផ្លែក្រូចសម្បូរដោយវីតាមីនសេ។)\n\n5. 🇬🇧 water (/ˈwɔːtər/) = 🇰🇭 ទឹកស្អាត\n   ↳ ឧទាហរណ៍៖ Drink pure water regularly.\n   ↳ បកប្រែ៖ (ពិសាទឹកស្អាតឱ្យបានទៀងទាត់។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 42: Weekly Review & Dialogue: Ordering Food at a Restaurant today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 42៖ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 42! Are you ready to master Weekly Review & Dialogue: Ordering Food at a Restaurant?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 42! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៧ និងការសន្ទនាកុម្ម៉ង់ម្ហូបក្នុងភោជនីយដ្ឋាន ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew8",
      "weekNum": 8,
      "monthWeekNum": 4,
      "title": "សប្តាហ៍ទី 4 (ថ្ងៃទី 43 - 48)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 4 ខែទី 2",
      "lessons": [
        {
          "id": "el43",
          "day": 43,
          "title": "ថ្ងៃទី 43៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories (Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket))",
          "topic": "សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories",
          "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
          "vocab": [
            {
              "en": "shirt",
              "kh": "អាវ",
              "ipa": "/ʃɜːt/",
              "exEn": "This blue shirt fits you well.",
              "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
            },
            {
              "en": "shoes",
              "kh": "ស្បែកជើង",
              "ipa": "/ʃuːz/",
              "exEn": "These leather shoes are durable.",
              "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
            },
            {
              "en": "price",
              "kh": "តម្លៃ",
              "ipa": "/praɪs/",
              "exEn": "The price is very reasonable.",
              "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
            },
            {
              "en": "dollar",
              "kh": "ប្រាក់ដុល្លារ",
              "ipa": "/ˈdɒlər/",
              "exEn": "It costs ten dollars.",
              "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
            },
            {
              "en": "receipt",
              "kh": "វិក្កយបត្រ",
              "ipa": "/rɪˈsiːt/",
              "exEn": "Keep your purchase receipt.",
              "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 43: Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 43៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 43! Are you ready to master Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 43! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 43\n🎯 ប្រធានបទ៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories (Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 43: Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 43៖ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 43! Are you ready to master Clothes & Accessories (Shirt, Pants, Dress, Shoes, Hat, Jacket)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 43! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សម្លៀកបំពាក់ និងគ្រឿងតុបតែង Clothes & Accessories ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el44",
          "day": 44,
          "title": "ថ្ងៃទី 44៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit (Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit))",
          "topic": "ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit",
          "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
          "vocab": [
            {
              "en": "shirt",
              "kh": "អាវ",
              "ipa": "/ʃɜːt/",
              "exEn": "This blue shirt fits you well.",
              "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
            },
            {
              "en": "shoes",
              "kh": "ស្បែកជើង",
              "ipa": "/ʃuːz/",
              "exEn": "These leather shoes are durable.",
              "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
            },
            {
              "en": "price",
              "kh": "តម្លៃ",
              "ipa": "/praɪs/",
              "exEn": "The price is very reasonable.",
              "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
            },
            {
              "en": "dollar",
              "kh": "ប្រាក់ដុល្លារ",
              "ipa": "/ˈdɒlər/",
              "exEn": "It costs ten dollars.",
              "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
            },
            {
              "en": "receipt",
              "kh": "វិក្កយបត្រ",
              "ipa": "/rɪˈsiːt/",
              "exEn": "Keep your purchase receipt.",
              "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 44: Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 44៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 44! Are you ready to master Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 44! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 44\n🎯 ប្រធានបទ៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit (Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 44: Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 44៖ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 44! Are you ready to master Sizes, Colors & Trying on Clothes (Small, Medium, Large, Fit)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 44! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទំហំ និងការសាកល្បងសម្លៀកបំពាក់ Sizes & Fit ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el45",
          "day": 45,
          "title": "ថ្ងៃទី 45៖ ការសួរតម្លៃទំនិញ (How much is...?) (Asking for Prices (How much is this shirt? How much are these?))",
          "topic": "ការសួរតម្លៃទំនិញ (How much is...?)",
          "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
          "vocab": [
            {
              "en": "shirt",
              "kh": "អាវ",
              "ipa": "/ʃɜːt/",
              "exEn": "This blue shirt fits you well.",
              "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
            },
            {
              "en": "shoes",
              "kh": "ស្បែកជើង",
              "ipa": "/ʃuːz/",
              "exEn": "These leather shoes are durable.",
              "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
            },
            {
              "en": "price",
              "kh": "តម្លៃ",
              "ipa": "/praɪs/",
              "exEn": "The price is very reasonable.",
              "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
            },
            {
              "en": "dollar",
              "kh": "ប្រាក់ដុល្លារ",
              "ipa": "/ˈdɒlər/",
              "exEn": "It costs ten dollars.",
              "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
            },
            {
              "en": "receipt",
              "kh": "វិក្កយបត្រ",
              "ipa": "/rɪˈsiːt/",
              "exEn": "Keep your purchase receipt.",
              "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 45: Asking for Prices (How much is this shirt? How much are these?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 45៖ ការសួរតម្លៃទំនិញ (How much is...?) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 45! Are you ready to master Asking for Prices (How much is this shirt? How much are these?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 45! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរតម្លៃទំនិញ (How much is...?) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 45\n🎯 ប្រធានបទ៖ ការសួរតម្លៃទំនិញ (How much is...?) (Asking for Prices (How much is this shirt? How much are these?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 45: Asking for Prices (How much is this shirt? How much are these?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 45៖ ការសួរតម្លៃទំនិញ (How much is...?) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 45! Are you ready to master Asking for Prices (How much is this shirt? How much are these?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 45! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរតម្លៃទំនិញ (How much is...?) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el46",
          "day": 46,
          "title": "ថ្ងៃទី 46៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change (Paying and Change (Cash, Credit card, Receipt, Change))",
          "topic": "ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change",
          "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
          "vocab": [
            {
              "en": "shirt",
              "kh": "អាវ",
              "ipa": "/ʃɜːt/",
              "exEn": "This blue shirt fits you well.",
              "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
            },
            {
              "en": "shoes",
              "kh": "ស្បែកជើង",
              "ipa": "/ʃuːz/",
              "exEn": "These leather shoes are durable.",
              "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
            },
            {
              "en": "price",
              "kh": "តម្លៃ",
              "ipa": "/praɪs/",
              "exEn": "The price is very reasonable.",
              "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
            },
            {
              "en": "dollar",
              "kh": "ប្រាក់ដុល្លារ",
              "ipa": "/ˈdɒlər/",
              "exEn": "It costs ten dollars.",
              "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
            },
            {
              "en": "receipt",
              "kh": "វិក្កយបត្រ",
              "ipa": "/rɪˈsiːt/",
              "exEn": "Keep your purchase receipt.",
              "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 46: Paying and Change (Cash, Credit card, Receipt, Change) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 46៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 46! Are you ready to master Paying and Change (Cash, Credit card, Receipt, Change)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 46! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 46\n🎯 ប្រធានបទ៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change (Paying and Change (Cash, Credit card, Receipt, Change))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 46: Paying and Change (Cash, Credit card, Receipt, Change) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 46៖ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 46! Are you ready to master Paying and Change (Cash, Credit card, Receipt, Change)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 46! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការទូទាត់ប្រាក់ និងលុយអាប់ Paying & Change ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el47",
          "day": 47,
          "title": "ថ្ងៃទី 47៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា (Month 2 Grand Review: Grammar, Vocabulary & Dialogue)",
          "topic": "រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា",
          "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
          "vocab": [
            {
              "en": "shirt",
              "kh": "អាវ",
              "ipa": "/ʃɜːt/",
              "exEn": "This blue shirt fits you well.",
              "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
            },
            {
              "en": "shoes",
              "kh": "ស្បែកជើង",
              "ipa": "/ʃuːz/",
              "exEn": "These leather shoes are durable.",
              "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
            },
            {
              "en": "price",
              "kh": "តម្លៃ",
              "ipa": "/praɪs/",
              "exEn": "The price is very reasonable.",
              "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
            },
            {
              "en": "dollar",
              "kh": "ប្រាក់ដុល្លារ",
              "ipa": "/ˈdɒlər/",
              "exEn": "It costs ten dollars.",
              "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
            },
            {
              "en": "receipt",
              "kh": "វិក្កយបត្រ",
              "ipa": "/rɪˈsiːt/",
              "exEn": "Keep your purchase receipt.",
              "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 47: Month 2 Grand Review: Grammar, Vocabulary & Dialogue today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 47៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 47! Are you ready to master Month 2 Grand Review: Grammar, Vocabulary & Dialogue?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 47! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 47\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា (Month 2 Grand Review: Grammar, Vocabulary & Dialogue)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 47: Month 2 Grand Review: Grammar, Vocabulary & Dialogue today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 47៖ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 47! Are you ready to master Month 2 Grand Review: Grammar, Vocabulary & Dialogue?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 47! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំខែទី ២៖ វេយ្យាករណ៍ វាក្យសព្ទ និងការសន្ទនា ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el48",
          "day": 48,
          "title": "ថ្ងៃទី 48៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) (Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam))",
          "topic": "ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam)",
          "grammar": "ការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"",
          "vocab": [
            {
              "en": "shirt",
              "kh": "អាវ",
              "ipa": "/ʃɜːt/",
              "exEn": "This blue shirt fits you well.",
              "exKh": "អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។"
            },
            {
              "en": "shoes",
              "kh": "ស្បែកជើង",
              "ipa": "/ʃuːz/",
              "exEn": "These leather shoes are durable.",
              "exKh": "ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។"
            },
            {
              "en": "price",
              "kh": "តម្លៃ",
              "ipa": "/praɪs/",
              "exEn": "The price is very reasonable.",
              "exKh": "តម្លៃនេះគឺសមរម្យណាស់។"
            },
            {
              "en": "dollar",
              "kh": "ប្រាក់ដុល្លារ",
              "ipa": "/ˈdɒlər/",
              "exEn": "It costs ten dollars.",
              "exKh": "វាមានតម្លៃដប់ដុល្លារ។"
            },
            {
              "en": "receipt",
              "kh": "វិក្កយបត្រ",
              "ipa": "/rɪˈsiːt/",
              "exEn": "Keep your purchase receipt.",
              "exKh": "សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 48: Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 48៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 48! Are you ready to master Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 48! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 2 • សប្តាហ៍ទី 8 • ថ្ងៃទី 48\n🎯 ប្រធានបទ៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) (Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរតម្លៃទំនិញ និងការទិញសម្លៀកបំពាក់៖\n• វត្ថុឯកវចនៈ: \"How much is this shirt?\" -> \"It is 15 dollars.\"\n• វត្ថុពហុវចនៈ: \"How much are these shoes?\" -> \"They are 25 dollars.\"\n• ការសាកល្បង: \"Can I try this on?\" -> \"Sure, the fitting room is over there.\"\n• ការទូទាត់: \"Here is your change and receipt. Thank you!\"\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 shirt (/ʃɜːt/) = 🇰🇭 អាវ\n   ↳ ឧទាហរណ៍៖ This blue shirt fits you well.\n   ↳ បកប្រែ៖ (អាវពណ៌ខៀវនេះសមនឹងអ្នកណាស់។)\n\n2. 🇬🇧 shoes (/ʃuːz/) = 🇰🇭 ស្បែកជើង\n   ↳ ឧទាហរណ៍៖ These leather shoes are durable.\n   ↳ បកប្រែ៖ (ស្បែកជើងស្បែកនេះជាប់ធន់ល្អ។)\n\n3. 🇬🇧 price (/praɪs/) = 🇰🇭 តម្លៃ\n   ↳ ឧទាហរណ៍៖ The price is very reasonable.\n   ↳ បកប្រែ៖ (តម្លៃនេះគឺសមរម្យណាស់។)\n\n4. 🇬🇧 dollar (/ˈdɒlər/) = 🇰🇭 ប្រាក់ដុល្លារ\n   ↳ ឧទាហរណ៍៖ It costs ten dollars.\n   ↳ បកប្រែ៖ (វាមានតម្លៃដប់ដុល្លារ។)\n\n5. 🇬🇧 receipt (/rɪˈsiːt/) = 🇰🇭 វិក្កយបត្រ\n   ↳ ឧទាហរណ៍៖ Keep your purchase receipt.\n   ↳ បកប្រែ៖ (សូមរក្សាទុកវិក្កយបត្រទិញទំនិញរបស់អ្នក។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 48: Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 48៖ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 48! Are you ready to master Month 2 Progress Assessment (ការប្រឡងប្រចាំខែទី ២ - Month 2 Final Exam)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 48! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការវាយតម្លៃ និងប្រឡងបញ្ចប់ខែទី ២ (Month 2 Final Exam) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew9",
      "weekNum": 9,
      "monthWeekNum": 1,
      "title": "សប្តាហ៍ទី 1 (ថ្ងៃទី 49 - 54)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 1 ខែទី 3",
      "lessons": [
        {
          "id": "el49",
          "day": 49,
          "title": "ថ្ងៃទី 49៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town (Places in Town (Market, Supermarket, Bank, Hospital, School))",
          "topic": "ទីកន្លែងនានាក្នុងទីក្រុង Places in Town",
          "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
          "vocab": [
            {
              "en": "market",
              "kh": "ផ្សារ",
              "ipa": "/ˈmɑːkɪt/",
              "exEn": "The Central Market is famous.",
              "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
            },
            {
              "en": "hospital",
              "kh": "មន្ទីរពេទ្យ",
              "ipa": "/ˈhɒspɪtl/",
              "exEn": "The hospital is near the river.",
              "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
            },
            {
              "en": "turn left",
              "kh": "បត់ឆ្វេង",
              "ipa": "/tɜːn left/",
              "exEn": "Turn left at the corner.",
              "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
            },
            {
              "en": "turn right",
              "kh": "បត់ស្តាំ",
              "ipa": "/tɜːn raɪt/",
              "exEn": "Turn right after the bridge.",
              "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
            },
            {
              "en": "go straight",
              "kh": "ទៅត្រង់",
              "ipa": "/ɡəʊ streɪt/",
              "exEn": "Go straight for two hundred meters.",
              "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 49: Places in Town (Market, Supermarket, Bank, Hospital, School) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 49៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 49! Are you ready to master Places in Town (Market, Supermarket, Bank, Hospital, School)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 49! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 49\n🎯 ប្រធានបទ៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town (Places in Town (Market, Supermarket, Bank, Hospital, School))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 49: Places in Town (Market, Supermarket, Bank, Hospital, School) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 49៖ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 49! Are you ready to master Places in Town (Market, Supermarket, Bank, Hospital, School)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 49! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ទីកន្លែងនានាក្នុងទីក្រុង Places in Town ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el50",
          "day": 50,
          "title": "ថ្ងៃទី 50៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation (Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train))",
          "topic": "មធ្យោបាយធ្វើដំណើរ Means of Transportation",
          "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
          "vocab": [
            {
              "en": "market",
              "kh": "ផ្សារ",
              "ipa": "/ˈmɑːkɪt/",
              "exEn": "The Central Market is famous.",
              "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
            },
            {
              "en": "hospital",
              "kh": "មន្ទីរពេទ្យ",
              "ipa": "/ˈhɒspɪtl/",
              "exEn": "The hospital is near the river.",
              "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
            },
            {
              "en": "turn left",
              "kh": "បត់ឆ្វេង",
              "ipa": "/tɜːn left/",
              "exEn": "Turn left at the corner.",
              "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
            },
            {
              "en": "turn right",
              "kh": "បត់ស្តាំ",
              "ipa": "/tɜːn raɪt/",
              "exEn": "Turn right after the bridge.",
              "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
            },
            {
              "en": "go straight",
              "kh": "ទៅត្រង់",
              "ipa": "/ɡəʊ streɪt/",
              "exEn": "Go straight for two hundred meters.",
              "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 50: Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 50៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 50! Are you ready to master Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 50! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ មធ្យោបាយធ្វើដំណើរ Means of Transportation ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 50\n🎯 ប្រធានបទ៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation (Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 50: Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 50៖ មធ្យោបាយធ្វើដំណើរ Means of Transportation ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 50! Are you ready to master Means of Transportation (Car, Bus, Tuk-tuk, Motorbike, Train)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 50! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ មធ្យោបាយធ្វើដំណើរ Means of Transportation ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el51",
          "day": 51,
          "title": "ថ្ងៃទី 51៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) (How Do You Go to Work/School? (By bus, on foot, by bike))",
          "topic": "ការសួរអំពីការធ្វើដំណើរ (How do you go to...?)",
          "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
          "vocab": [
            {
              "en": "market",
              "kh": "ផ្សារ",
              "ipa": "/ˈmɑːkɪt/",
              "exEn": "The Central Market is famous.",
              "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
            },
            {
              "en": "hospital",
              "kh": "មន្ទីរពេទ្យ",
              "ipa": "/ˈhɒspɪtl/",
              "exEn": "The hospital is near the river.",
              "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
            },
            {
              "en": "turn left",
              "kh": "បត់ឆ្វេង",
              "ipa": "/tɜːn left/",
              "exEn": "Turn left at the corner.",
              "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
            },
            {
              "en": "turn right",
              "kh": "បត់ស្តាំ",
              "ipa": "/tɜːn raɪt/",
              "exEn": "Turn right after the bridge.",
              "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
            },
            {
              "en": "go straight",
              "kh": "ទៅត្រង់",
              "ipa": "/ɡəʊ streɪt/",
              "exEn": "Go straight for two hundred meters.",
              "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 51: How Do You Go to Work/School? (By bus, on foot, by bike) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 51៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 51! Are you ready to master How Do You Go to Work/School? (By bus, on foot, by bike)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 51! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 51\n🎯 ប្រធានបទ៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) (How Do You Go to Work/School? (By bus, on foot, by bike))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 51: How Do You Go to Work/School? (By bus, on foot, by bike) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 51៖ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 51! Are you ready to master How Do You Go to Work/School? (By bus, on foot, by bike)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 51! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរអំពីការធ្វើដំណើរ (How do you go to...?) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el52",
          "day": 52,
          "title": "ថ្ងៃទី 52៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) (Asking & Giving Directions (Turn left, Turn right, Go straight))",
          "topic": "ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight)",
          "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
          "vocab": [
            {
              "en": "market",
              "kh": "ផ្សារ",
              "ipa": "/ˈmɑːkɪt/",
              "exEn": "The Central Market is famous.",
              "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
            },
            {
              "en": "hospital",
              "kh": "មន្ទីរពេទ្យ",
              "ipa": "/ˈhɒspɪtl/",
              "exEn": "The hospital is near the river.",
              "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
            },
            {
              "en": "turn left",
              "kh": "បត់ឆ្វេង",
              "ipa": "/tɜːn left/",
              "exEn": "Turn left at the corner.",
              "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
            },
            {
              "en": "turn right",
              "kh": "បត់ស្តាំ",
              "ipa": "/tɜːn raɪt/",
              "exEn": "Turn right after the bridge.",
              "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
            },
            {
              "en": "go straight",
              "kh": "ទៅត្រង់",
              "ipa": "/ɡəʊ streɪt/",
              "exEn": "Go straight for two hundred meters.",
              "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 52: Asking & Giving Directions (Turn left, Turn right, Go straight) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 52៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 52! Are you ready to master Asking & Giving Directions (Turn left, Turn right, Go straight)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 52! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 52\n🎯 ប្រធានបទ៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) (Asking & Giving Directions (Turn left, Turn right, Go straight))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 52: Asking & Giving Directions (Turn left, Turn right, Go straight) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 52៖ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 52! Are you ready to master Asking & Giving Directions (Turn left, Turn right, Go straight)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 52! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការសួរ និងប្រាប់ផ្លូវ (Turn left, Go straight) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el53",
          "day": 53,
          "title": "ថ្ងៃទី 53៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs (Public Signs & Rules (Stop, No parking, Entrance, Exit))",
          "topic": "ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs",
          "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
          "vocab": [
            {
              "en": "market",
              "kh": "ផ្សារ",
              "ipa": "/ˈmɑːkɪt/",
              "exEn": "The Central Market is famous.",
              "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
            },
            {
              "en": "hospital",
              "kh": "មន្ទីរពេទ្យ",
              "ipa": "/ˈhɒspɪtl/",
              "exEn": "The hospital is near the river.",
              "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
            },
            {
              "en": "turn left",
              "kh": "បត់ឆ្វេង",
              "ipa": "/tɜːn left/",
              "exEn": "Turn left at the corner.",
              "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
            },
            {
              "en": "turn right",
              "kh": "បត់ស្តាំ",
              "ipa": "/tɜːn raɪt/",
              "exEn": "Turn right after the bridge.",
              "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
            },
            {
              "en": "go straight",
              "kh": "ទៅត្រង់",
              "ipa": "/ɡəʊ streɪt/",
              "exEn": "Go straight for two hundred meters.",
              "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 53: Public Signs & Rules (Stop, No parking, Entrance, Exit) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 53៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 53! Are you ready to master Public Signs & Rules (Stop, No parking, Entrance, Exit)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 53! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 53\n🎯 ប្រធានបទ៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs (Public Signs & Rules (Stop, No parking, Entrance, Exit))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 53: Public Signs & Rules (Stop, No parking, Entrance, Exit) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 53៖ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 53! Are you ready to master Public Signs & Rules (Stop, No parking, Entrance, Exit)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 53! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ផ្លាកសញ្ញាសាធារណៈ និងច្បាប់ទូទៅ Public Signs ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el54",
          "day": 54,
          "title": "ថ្ងៃទី 54៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង (Weekly Review & Dialogue: Finding Your Way Around Town)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង",
          "grammar": "ការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)",
          "vocab": [
            {
              "en": "market",
              "kh": "ផ្សារ",
              "ipa": "/ˈmɑːkɪt/",
              "exEn": "The Central Market is famous.",
              "exKh": "ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។"
            },
            {
              "en": "hospital",
              "kh": "មន្ទីរពេទ្យ",
              "ipa": "/ˈhɒspɪtl/",
              "exEn": "The hospital is near the river.",
              "exKh": "មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។"
            },
            {
              "en": "turn left",
              "kh": "បត់ឆ្វេង",
              "ipa": "/tɜːn left/",
              "exEn": "Turn left at the corner.",
              "exKh": "បត់ឆ្វេងនៅជ្រុងផ្លូវ។"
            },
            {
              "en": "turn right",
              "kh": "បត់ស្តាំ",
              "ipa": "/tɜːn raɪt/",
              "exEn": "Turn right after the bridge.",
              "exKh": "បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។"
            },
            {
              "en": "go straight",
              "kh": "ទៅត្រង់",
              "ipa": "/ɡəʊ streɪt/",
              "exEn": "Go straight for two hundred meters.",
              "exKh": "ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 54: Weekly Review & Dialogue: Finding Your Way Around Town today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 54៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 54! Are you ready to master Weekly Review & Dialogue: Finding Your Way Around Town?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 54! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 9 • ថ្ងៃទី 54\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង (Weekly Review & Dialogue: Finding Your Way Around Town)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការសួរ និងប្រាប់ផ្លូវក្នុងទីក្រុង (Asking and Giving Directions)៖\n• \"Excuse me, where is the bank / market?\"\n• \"Go straight along this street.\" (ដើរទៅត្រង់តាមផ្លូវនេះ)\n• \"Turn left at the traffic light.\" (បត់ឆ្វេងនៅស្តុប)\n• \"Turn right next to the school.\" (បត់ស្តាំនៅក្បែរសាលា)\n• \"It is on your left-hand side.\" (វានៅខាងឆ្វេងដៃរបស់អ្នក)\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 market (/ˈmɑːkɪt/) = 🇰🇭 ផ្សារ\n   ↳ ឧទាហរណ៍៖ The Central Market is famous.\n   ↳ បកប្រែ៖ (ផ្សារធំថ្មីគឺល្បីល្បាញណាស់។)\n\n2. 🇬🇧 hospital (/ˈhɒspɪtl/) = 🇰🇭 មន្ទីរពេទ្យ\n   ↳ ឧទាហរណ៍៖ The hospital is near the river.\n   ↳ បកប្រែ៖ (មន្ទីរពេទ្យនៅជិតមាត់ទន្លេ។)\n\n3. 🇬🇧 turn left (/tɜːn left/) = 🇰🇭 បត់ឆ្វេង\n   ↳ ឧទាហរណ៍៖ Turn left at the corner.\n   ↳ បកប្រែ៖ (បត់ឆ្វេងនៅជ្រុងផ្លូវ។)\n\n4. 🇬🇧 turn right (/tɜːn raɪt/) = 🇰🇭 បត់ស្តាំ\n   ↳ ឧទាហរណ៍៖ Turn right after the bridge.\n   ↳ បកប្រែ៖ (បត់ស្តាំក្រោយពេលឆ្លងស្ពាន។)\n\n5. 🇬🇧 go straight (/ɡəʊ streɪt/) = 🇰🇭 ទៅត្រង់\n   ↳ ឧទាហរណ៍៖ Go straight for two hundred meters.\n   ↳ បកប្រែ៖ (ទៅត្រង់ប្រហែលពីររយម៉ែត្រ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 54: Weekly Review & Dialogue: Finding Your Way Around Town today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 54៖ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 54! Are you ready to master Weekly Review & Dialogue: Finding Your Way Around Town?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 54! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ៩ និងការសន្ទនាសួរផ្លូវក្នុងក្រុង ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew10",
      "weekNum": 10,
      "monthWeekNum": 2,
      "title": "សប្តាហ៍ទី 2 (ថ្ងៃទី 55 - 60)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 2 ខែទី 3",
      "lessons": [
        {
          "id": "el55",
          "day": 55,
          "title": "ថ្ងៃទី 55៖ ស្ថានភាពអាកាសធាតុ Weather Conditions (Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold))",
          "topic": "ស្ថានភាពអាកាសធាតុ Weather Conditions",
          "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
          "vocab": [
            {
              "en": "sunny",
              "kh": "មានពន្លឺថ្ងៃក្តៅ",
              "ipa": "/ˈsʌni/",
              "exEn": "It is sunny and warm today.",
              "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
            },
            {
              "en": "rainy",
              "kh": "មានភ្លៀងធ្លាក់",
              "ipa": "/ˈreɪni/",
              "exEn": "Take an umbrella on rainy days.",
              "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
            },
            {
              "en": "studying",
              "kh": "កំពុងរៀន",
              "ipa": "/ˈstʌdiɪŋ/",
              "exEn": "We are studying with Teacher Piseth.",
              "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            },
            {
              "en": "reading",
              "kh": "កំពុងអាន",
              "ipa": "/ˈriːdɪŋ/",
              "exEn": "He is reading an interesting story.",
              "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
            },
            {
              "en": "playing",
              "kh": "កំពុងលេង",
              "ipa": "/ˈpleɪɪŋ/",
              "exEn": "The children are playing happily.",
              "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 55: Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 55៖ ស្ថានភាពអាកាសធាតុ Weather Conditions ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 55! Are you ready to master Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 55! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ស្ថានភាពអាកាសធាតុ Weather Conditions ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 55\n🎯 ប្រធានបទ៖ ស្ថានភាពអាកាសធាតុ Weather Conditions (Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 55: Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 55៖ ស្ថានភាពអាកាសធាតុ Weather Conditions ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 55! Are you ready to master Weather Conditions (Sunny, Rainy, Windy, Cloudy, Hot, Cold)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 55! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ស្ថានភាពអាកាសធាតុ Weather Conditions ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el56",
          "day": 56,
          "title": "ថ្ងៃទី 56៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year (Seasons of the Year (Rainy season, Dry season, Summer, Winter))",
          "topic": "រដូវកាលនានានៃឆ្នាំ Seasons of the Year",
          "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
          "vocab": [
            {
              "en": "sunny",
              "kh": "មានពន្លឺថ្ងៃក្តៅ",
              "ipa": "/ˈsʌni/",
              "exEn": "It is sunny and warm today.",
              "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
            },
            {
              "en": "rainy",
              "kh": "មានភ្លៀងធ្លាក់",
              "ipa": "/ˈreɪni/",
              "exEn": "Take an umbrella on rainy days.",
              "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
            },
            {
              "en": "studying",
              "kh": "កំពុងរៀន",
              "ipa": "/ˈstʌdiɪŋ/",
              "exEn": "We are studying with Teacher Piseth.",
              "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            },
            {
              "en": "reading",
              "kh": "កំពុងអាន",
              "ipa": "/ˈriːdɪŋ/",
              "exEn": "He is reading an interesting story.",
              "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
            },
            {
              "en": "playing",
              "kh": "កំពុងលេង",
              "ipa": "/ˈpleɪɪŋ/",
              "exEn": "The children are playing happily.",
              "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 56: Seasons of the Year (Rainy season, Dry season, Summer, Winter) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 56៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 56! Are you ready to master Seasons of the Year (Rainy season, Dry season, Summer, Winter)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 56! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 56\n🎯 ប្រធានបទ៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year (Seasons of the Year (Rainy season, Dry season, Summer, Winter))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 56: Seasons of the Year (Rainy season, Dry season, Summer, Winter) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 56៖ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 56! Are you ready to master Seasons of the Year (Rainy season, Dry season, Summer, Winter)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 56! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រដូវកាលនានានៃឆ្នាំ Seasons of the Year ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el57",
          "day": 57,
          "title": "ថ្ងៃទី 57៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) (Present Continuous Tense - Actions Happening Now (am/is/are + V-ing))",
          "topic": "បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...)",
          "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
          "vocab": [
            {
              "en": "sunny",
              "kh": "មានពន្លឺថ្ងៃក្តៅ",
              "ipa": "/ˈsʌni/",
              "exEn": "It is sunny and warm today.",
              "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
            },
            {
              "en": "rainy",
              "kh": "មានភ្លៀងធ្លាក់",
              "ipa": "/ˈreɪni/",
              "exEn": "Take an umbrella on rainy days.",
              "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
            },
            {
              "en": "studying",
              "kh": "កំពុងរៀន",
              "ipa": "/ˈstʌdiɪŋ/",
              "exEn": "We are studying with Teacher Piseth.",
              "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            },
            {
              "en": "reading",
              "kh": "កំពុងអាន",
              "ipa": "/ˈriːdɪŋ/",
              "exEn": "He is reading an interesting story.",
              "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
            },
            {
              "en": "playing",
              "kh": "កំពុងលេង",
              "ipa": "/ˈpleɪɪŋ/",
              "exEn": "The children are playing happily.",
              "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 57: Present Continuous Tense - Actions Happening Now (am/is/are + V-ing) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 57៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 57! Are you ready to master Present Continuous Tense - Actions Happening Now (am/is/are + V-ing)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 57! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 57\n🎯 ប្រធានបទ៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) (Present Continuous Tense - Actions Happening Now (am/is/are + V-ing))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 57: Present Continuous Tense - Actions Happening Now (am/is/are + V-ing) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 57៖ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 57! Are you ready to master Present Continuous Tense - Actions Happening Now (am/is/are + V-ing)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 57! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ បច្ចុប្បន្នកាលកំពុងបន្ត Present Continuous (កំពុងធ្វើ...) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el58",
          "day": 58,
          "title": "ថ្ងៃទី 58៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous (Present Continuous Questions & Negatives (What are you doing?))",
          "topic": "សំណួរ និងទម្រង់បដិសេធ Present Continuous",
          "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
          "vocab": [
            {
              "en": "sunny",
              "kh": "មានពន្លឺថ្ងៃក្តៅ",
              "ipa": "/ˈsʌni/",
              "exEn": "It is sunny and warm today.",
              "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
            },
            {
              "en": "rainy",
              "kh": "មានភ្លៀងធ្លាក់",
              "ipa": "/ˈreɪni/",
              "exEn": "Take an umbrella on rainy days.",
              "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
            },
            {
              "en": "studying",
              "kh": "កំពុងរៀន",
              "ipa": "/ˈstʌdiɪŋ/",
              "exEn": "We are studying with Teacher Piseth.",
              "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            },
            {
              "en": "reading",
              "kh": "កំពុងអាន",
              "ipa": "/ˈriːdɪŋ/",
              "exEn": "He is reading an interesting story.",
              "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
            },
            {
              "en": "playing",
              "kh": "កំពុងលេង",
              "ipa": "/ˈpleɪɪŋ/",
              "exEn": "The children are playing happily.",
              "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 58: Present Continuous Questions & Negatives (What are you doing?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 58៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 58! Are you ready to master Present Continuous Questions & Negatives (What are you doing?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 58! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សំណួរ និងទម្រង់បដិសេធ Present Continuous ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 58\n🎯 ប្រធានបទ៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous (Present Continuous Questions & Negatives (What are you doing?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 58: Present Continuous Questions & Negatives (What are you doing?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 58៖ សំណួរ និងទម្រង់បដិសេធ Present Continuous ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 58! Are you ready to master Present Continuous Questions & Negatives (What are you doing?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 58! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សំណួរ និងទម្រង់បដិសេធ Present Continuous ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el59",
          "day": 59,
          "title": "ថ្ងៃទី 59៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing (Weather Activities & Clothing (It is raining, wear a raincoat))",
          "topic": "សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing",
          "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
          "vocab": [
            {
              "en": "sunny",
              "kh": "មានពន្លឺថ្ងៃក្តៅ",
              "ipa": "/ˈsʌni/",
              "exEn": "It is sunny and warm today.",
              "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
            },
            {
              "en": "rainy",
              "kh": "មានភ្លៀងធ្លាក់",
              "ipa": "/ˈreɪni/",
              "exEn": "Take an umbrella on rainy days.",
              "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
            },
            {
              "en": "studying",
              "kh": "កំពុងរៀន",
              "ipa": "/ˈstʌdiɪŋ/",
              "exEn": "We are studying with Teacher Piseth.",
              "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            },
            {
              "en": "reading",
              "kh": "កំពុងអាន",
              "ipa": "/ˈriːdɪŋ/",
              "exEn": "He is reading an interesting story.",
              "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
            },
            {
              "en": "playing",
              "kh": "កំពុងលេង",
              "ipa": "/ˈpleɪɪŋ/",
              "exEn": "The children are playing happily.",
              "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 59: Weather Activities & Clothing (It is raining, wear a raincoat) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 59៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 59! Are you ready to master Weather Activities & Clothing (It is raining, wear a raincoat)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 59! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 59\n🎯 ប្រធានបទ៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing (Weather Activities & Clothing (It is raining, wear a raincoat))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 59: Weather Activities & Clothing (It is raining, wear a raincoat) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 59៖ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 59! Are you ready to master Weather Activities & Clothing (It is raining, wear a raincoat)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 59! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ សកម្មភាព និងសម្លៀកបំពាក់តាមអាកាសធាតុ Weather & Clothing ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el60",
          "day": 60,
          "title": "ថ្ងៃទី 60៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ (Weekly Review & Dialogue: Talking about the Weather and Plans)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ",
          "grammar": "បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.",
          "vocab": [
            {
              "en": "sunny",
              "kh": "មានពន្លឺថ្ងៃក្តៅ",
              "ipa": "/ˈsʌni/",
              "exEn": "It is sunny and warm today.",
              "exKh": "ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។"
            },
            {
              "en": "rainy",
              "kh": "មានភ្លៀងធ្លាក់",
              "ipa": "/ˈreɪni/",
              "exEn": "Take an umbrella on rainy days.",
              "exKh": "យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។"
            },
            {
              "en": "studying",
              "kh": "កំពុងរៀន",
              "ipa": "/ˈstʌdiɪŋ/",
              "exEn": "We are studying with Teacher Piseth.",
              "exKh": "ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។"
            },
            {
              "en": "reading",
              "kh": "កំពុងអាន",
              "ipa": "/ˈriːdɪŋ/",
              "exEn": "He is reading an interesting story.",
              "exKh": "គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។"
            },
            {
              "en": "playing",
              "kh": "កំពុងលេង",
              "ipa": "/ˈpleɪɪŋ/",
              "exEn": "The children are playing happily.",
              "exKh": "ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 60: Weekly Review & Dialogue: Talking about the Weather and Plans today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 60៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 60! Are you ready to master Weekly Review & Dialogue: Talking about the Weather and Plans?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 60! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 10 • ថ្ងៃទី 60\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ (Weekly Review & Dialogue: Talking about the Weather and Plans)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nបច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) សម្តែងសកម្មភាពកំពុងកើតឡើងនៅពេលនិយាយ៖\nរូបមន្ត៖ Subject + AM / IS / ARE + V-ing\n• I am studying English right now.\n• She is cooking dinner in the kitchen.\n• They are playing football in the field.\nសំណួរ: What are you doing? -> I am reading a book.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 sunny (/ˈsʌni/) = 🇰🇭 មានពន្លឺថ្ងៃក្តៅ\n   ↳ ឧទាហរណ៍៖ It is sunny and warm today.\n   ↳ បកប្រែ៖ (ថ្ងៃនេះមានពន្លឺថ្ងៃក្តៅ និងកក់ក្តៅ។)\n\n2. 🇬🇧 rainy (/ˈreɪni/) = 🇰🇭 មានភ្លៀងធ្លាក់\n   ↳ ឧទាហរណ៍៖ Take an umbrella on rainy days.\n   ↳ បកប្រែ៖ (យកឆ័ត្រតាមខ្លួននៅថ្ងៃមានភ្លៀង។)\n\n3. 🇬🇧 studying (/ˈstʌdiɪŋ/) = 🇰🇭 កំពុងរៀន\n   ↳ ឧទាហរណ៍៖ We are studying with Teacher Piseth.\n   ↳ បកប្រែ៖ (ពួកយើងកំពុងរៀនជាមួយអ្នកគ្រូពិសិដ្ឋ។)\n\n4. 🇬🇧 reading (/ˈriːdɪŋ/) = 🇰🇭 កំពុងអាន\n   ↳ ឧទាហរណ៍៖ He is reading an interesting story.\n   ↳ បកប្រែ៖ (គាត់កំពុងអានសៀវភៅរឿងដ៏ជក់ចិត្តមួយ។)\n\n5. 🇬🇧 playing (/ˈpleɪɪŋ/) = 🇰🇭 កំពុងលេង\n   ↳ ឧទាហរណ៍៖ The children are playing happily.\n   ↳ បកប្រែ៖ (ក្មេងៗកំពុងលេងយ៉ាងសប្បាយរីករាយ។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 60: Weekly Review & Dialogue: Talking about the Weather and Plans today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 60៖ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 60! Are you ready to master Weekly Review & Dialogue: Talking about the Weather and Plans?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 60! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១០ និងការសន្ទនាអំពីអាកាសធាតុ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew11",
      "weekNum": 11,
      "monthWeekNum": 3,
      "title": "សប្តាហ៍ទី 3 (ថ្ងៃទី 61 - 66)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 3 ខែទី 3",
      "lessons": [
        {
          "id": "el61",
          "day": 61,
          "title": "ថ្ងៃទី 61៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) (Introduction to Past Simple of To Be (Was / Were))",
          "topic": "អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were)",
          "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
          "vocab": [
            {
              "en": "yesterday",
              "kh": "ម្សិលមិញ",
              "ipa": "/ˈjestədeɪ/",
              "exEn": "I visited my aunt yesterday.",
              "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
            },
            {
              "en": "last week",
              "kh": "សប្តាហ៍មុន",
              "ipa": "/lɑːst wiːk/",
              "exEn": "We had a test last week.",
              "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
            },
            {
              "en": "tomorrow",
              "kh": "ថ្ងៃស្អែក",
              "ipa": "/təˈmɒrəʊ/",
              "exEn": "Tomorrow is going to be great.",
              "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
            },
            {
              "en": "going to",
              "kh": "នឹង... (ផែនការច្បាស់លាស់)",
              "ipa": "/ˈɡəʊɪŋ tuː/",
              "exEn": "I am going to speak English fluently.",
              "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
            },
            {
              "en": "hobby",
              "kh": "ចំណង់ចំណូលចិត្ត",
              "ipa": "/ˈhɒbi/",
              "exEn": "My hobby is reading English books.",
              "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 61: Introduction to Past Simple of To Be (Was / Were) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 61៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 61! Are you ready to master Introduction to Past Simple of To Be (Was / Were)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 61! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 61\n🎯 ប្រធានបទ៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) (Introduction to Past Simple of To Be (Was / Were))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 61: Introduction to Past Simple of To Be (Was / Were) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 61៖ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 61! Are you ready to master Introduction to Past Simple of To Be (Was / Were)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 61! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលនៃកិរិយាសព្ទ To Be (Was / Were) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el62",
          "day": 62,
          "title": "ថ្ងៃទី 62៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) (Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned))",
          "topic": "អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed)",
          "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
          "vocab": [
            {
              "en": "yesterday",
              "kh": "ម្សិលមិញ",
              "ipa": "/ˈjestədeɪ/",
              "exEn": "I visited my aunt yesterday.",
              "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
            },
            {
              "en": "last week",
              "kh": "សប្តាហ៍មុន",
              "ipa": "/lɑːst wiːk/",
              "exEn": "We had a test last week.",
              "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
            },
            {
              "en": "tomorrow",
              "kh": "ថ្ងៃស្អែក",
              "ipa": "/təˈmɒrəʊ/",
              "exEn": "Tomorrow is going to be great.",
              "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
            },
            {
              "en": "going to",
              "kh": "នឹង... (ផែនការច្បាស់លាស់)",
              "ipa": "/ˈɡəʊɪŋ tuː/",
              "exEn": "I am going to speak English fluently.",
              "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
            },
            {
              "en": "hobby",
              "kh": "ចំណង់ចំណូលចិត្ត",
              "ipa": "/ˈhɒbi/",
              "exEn": "My hobby is reading English books.",
              "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 62: Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 62៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 62! Are you ready to master Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 62! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 62\n🎯 ប្រធានបទ៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) (Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 62: Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 62៖ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 62! Are you ready to master Introduction to Past Simple Regular Verbs (Walked, Played, Cleaned)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 62! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ អតីតកាលកិរិយាសព្ទទៀងទាត់ Past Simple Regular Verbs (-ed) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el63",
          "day": 63,
          "title": "ថ្ងៃទី 63៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន (Talking about Yesterday & Last Weekend (Where were you yesterday?))",
          "topic": "ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន",
          "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
          "vocab": [
            {
              "en": "yesterday",
              "kh": "ម្សិលមិញ",
              "ipa": "/ˈjestədeɪ/",
              "exEn": "I visited my aunt yesterday.",
              "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
            },
            {
              "en": "last week",
              "kh": "សប្តាហ៍មុន",
              "ipa": "/lɑːst wiːk/",
              "exEn": "We had a test last week.",
              "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
            },
            {
              "en": "tomorrow",
              "kh": "ថ្ងៃស្អែក",
              "ipa": "/təˈmɒrəʊ/",
              "exEn": "Tomorrow is going to be great.",
              "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
            },
            {
              "en": "going to",
              "kh": "នឹង... (ផែនការច្បាស់លាស់)",
              "ipa": "/ˈɡəʊɪŋ tuː/",
              "exEn": "I am going to speak English fluently.",
              "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
            },
            {
              "en": "hobby",
              "kh": "ចំណង់ចំណូលចិត្ត",
              "ipa": "/ˈhɒbi/",
              "exEn": "My hobby is reading English books.",
              "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 63: Talking about Yesterday & Last Weekend (Where were you yesterday?) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 63៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 63! Are you ready to master Talking about Yesterday & Last Weekend (Where were you yesterday?)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 63! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 63\n🎯 ប្រធានបទ៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន (Talking about Yesterday & Last Weekend (Where were you yesterday?))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 63: Talking about Yesterday & Last Weekend (Where were you yesterday?) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 63៖ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 63! Are you ready to master Talking about Yesterday & Last Weekend (Where were you yesterday?)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 63! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការនិយាយអំពីកាលពីម្សិលមិញ និងចុងសប្តាហ៍មុន ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el64",
          "day": 64,
          "title": "ថ្ងៃទី 64៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" (Future Plans with Be Going To (I am going to visit Angkor Wat))",
          "topic": "ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\"",
          "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
          "vocab": [
            {
              "en": "yesterday",
              "kh": "ម្សិលមិញ",
              "ipa": "/ˈjestədeɪ/",
              "exEn": "I visited my aunt yesterday.",
              "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
            },
            {
              "en": "last week",
              "kh": "សប្តាហ៍មុន",
              "ipa": "/lɑːst wiːk/",
              "exEn": "We had a test last week.",
              "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
            },
            {
              "en": "tomorrow",
              "kh": "ថ្ងៃស្អែក",
              "ipa": "/təˈmɒrəʊ/",
              "exEn": "Tomorrow is going to be great.",
              "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
            },
            {
              "en": "going to",
              "kh": "នឹង... (ផែនការច្បាស់លាស់)",
              "ipa": "/ˈɡəʊɪŋ tuː/",
              "exEn": "I am going to speak English fluently.",
              "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
            },
            {
              "en": "hobby",
              "kh": "ចំណង់ចំណូលចិត្ត",
              "ipa": "/ˈhɒbi/",
              "exEn": "My hobby is reading English books.",
              "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 64: Future Plans with Be Going To (I am going to visit Angkor Wat) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 64៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 64! Are you ready to master Future Plans with Be Going To (I am going to visit Angkor Wat)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 64! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 64\n🎯 ប្រធានបទ៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" (Future Plans with Be Going To (I am going to visit Angkor Wat))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 64: Future Plans with Be Going To (I am going to visit Angkor Wat) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 64៖ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 64! Are you ready to master Future Plans with Be Going To (I am going to visit Angkor Wat)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 64! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការរៀបចំផែនការអនាគតដោយប្រើ \"Be going to\" ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el65",
          "day": 65,
          "title": "ថ្ងៃទី 65៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time (Hobbies & Free Time Activities (Listening to music, Reading))",
          "topic": "ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time",
          "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
          "vocab": [
            {
              "en": "yesterday",
              "kh": "ម្សិលមិញ",
              "ipa": "/ˈjestədeɪ/",
              "exEn": "I visited my aunt yesterday.",
              "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
            },
            {
              "en": "last week",
              "kh": "សប្តាហ៍មុន",
              "ipa": "/lɑːst wiːk/",
              "exEn": "We had a test last week.",
              "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
            },
            {
              "en": "tomorrow",
              "kh": "ថ្ងៃស្អែក",
              "ipa": "/təˈmɒrəʊ/",
              "exEn": "Tomorrow is going to be great.",
              "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
            },
            {
              "en": "going to",
              "kh": "នឹង... (ផែនការច្បាស់លាស់)",
              "ipa": "/ˈɡəʊɪŋ tuː/",
              "exEn": "I am going to speak English fluently.",
              "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
            },
            {
              "en": "hobby",
              "kh": "ចំណង់ចំណូលចិត្ត",
              "ipa": "/ˈhɒbi/",
              "exEn": "My hobby is reading English books.",
              "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 65: Hobbies & Free Time Activities (Listening to music, Reading) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 65៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 65! Are you ready to master Hobbies & Free Time Activities (Listening to music, Reading)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 65! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 65\n🎯 ប្រធានបទ៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time (Hobbies & Free Time Activities (Listening to music, Reading))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 65: Hobbies & Free Time Activities (Listening to music, Reading) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 65៖ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 65! Are you ready to master Hobbies & Free Time Activities (Listening to music, Reading)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 65! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ចំណង់ចំណូលចិត្ត និងពេលទំនេរ Hobbies & Free Time ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el66",
          "day": 66,
          "title": "ថ្ងៃទី 66៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត (Weekly Review & Dialogue: What Did You Do? & What Will You Do?)",
          "topic": "រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត",
          "grammar": "ការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.",
          "vocab": [
            {
              "en": "yesterday",
              "kh": "ម្សិលមិញ",
              "ipa": "/ˈjestədeɪ/",
              "exEn": "I visited my aunt yesterday.",
              "exKh": "ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។"
            },
            {
              "en": "last week",
              "kh": "សប្តាហ៍មុន",
              "ipa": "/lɑːst wiːk/",
              "exEn": "We had a test last week.",
              "exKh": "ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។"
            },
            {
              "en": "tomorrow",
              "kh": "ថ្ងៃស្អែក",
              "ipa": "/təˈmɒrəʊ/",
              "exEn": "Tomorrow is going to be great.",
              "exKh": "ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។"
            },
            {
              "en": "going to",
              "kh": "នឹង... (ផែនការច្បាស់លាស់)",
              "ipa": "/ˈɡəʊɪŋ tuː/",
              "exEn": "I am going to speak English fluently.",
              "exKh": "ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។"
            },
            {
              "en": "hobby",
              "kh": "ចំណង់ចំណូលចិត្ត",
              "ipa": "/ˈhɒbi/",
              "exEn": "My hobby is reading English books.",
              "exKh": "ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 66: Weekly Review & Dialogue: What Did You Do? & What Will You Do? today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 66៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 66! Are you ready to master Weekly Review & Dialogue: What Did You Do? & What Will You Do??",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 66! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 11 • ថ្ងៃទី 66\n🎯 ប្រធានបទ៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត (Weekly Review & Dialogue: What Did You Do? & What Will You Do?)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការណែនាំអំពីអតីតកាល (Past Simple) និងអនាគតកាល (Future with Be going to)៖\n១. Was / Were: I was happy yesterday. They were in Siem Reap last week.\n២. Regular Past Verbs (-ed): walk -> walked, play -> played, clean -> cleaned\n៣. Future with \"Be going to\": Subject + am/is/are + going to + V1\n• I am going to study abroad next year.\n• We are going to visit Angkor Wat this Sunday.\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 yesterday (/ˈjestədeɪ/) = 🇰🇭 ម្សិលមិញ\n   ↳ ឧទាហរណ៍៖ I visited my aunt yesterday.\n   ↳ បកប្រែ៖ (ខ្ញុំបានទៅលេងម្តាយមីងកាលពីម្សិលមិញ។)\n\n2. 🇬🇧 last week (/lɑːst wiːk/) = 🇰🇭 សប្តាហ៍មុន\n   ↳ ឧទាហរណ៍៖ We had a test last week.\n   ↳ បកប្រែ៖ (ពួកយើងមានការប្រឡងកាលពីសប្តាហ៍មុន។)\n\n3. 🇬🇧 tomorrow (/təˈmɒrəʊ/) = 🇰🇭 ថ្ងៃស្អែក\n   ↳ ឧទាហរណ៍៖ Tomorrow is going to be great.\n   ↳ បកប្រែ៖ (ថ្ងៃស្អែកនឹងក្លាយជាថ្ងៃដ៏អស្ចារ្យ។)\n\n4. 🇬🇧 going to (/ˈɡəʊɪŋ tuː/) = 🇰🇭 នឹង... (ផែនការច្បាស់លាស់)\n   ↳ ឧទាហរណ៍៖ I am going to speak English fluently.\n   ↳ បកប្រែ៖ (ខ្ញុំនឹងនិយាយភាសាអង់គ្លេសឱ្យបានស្ទាត់។)\n\n5. 🇬🇧 hobby (/ˈhɒbi/) = 🇰🇭 ចំណង់ចំណូលចិត្ត\n   ↳ ឧទាហរណ៍៖ My hobby is reading English books.\n   ↳ បកប្រែ៖ (ចំណូលចិត្តខ្ញុំគឺការអានសៀវភៅអង់គ្លេស។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 66: Weekly Review & Dialogue: What Did You Do? & What Will You Do? today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 66៖ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 66! Are you ready to master Weekly Review & Dialogue: What Did You Do? & What Will You Do??\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 66! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកប្រចាំសប្តាហ៍ទី ១១ និងការសន្ទនាអតីតកាល និងអនាគត ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    },
    {
      "id": "ew12",
      "weekNum": 12,
      "monthWeekNum": 4,
      "title": "សប្តាហ៍ទី 4 (ថ្ងៃទី 67 - 72)",
      "description": "មេរៀនមូលដ្ឋានគ្រឹះ ៦ ថ្ងៃ នៃសប្តាហ៍ទី 4 ខែទី 3",
      "lessons": [
        {
          "id": "el67",
          "day": 67,
          "title": "ថ្ងៃទី 67៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ (Grand Review 1: Pronouns, To Be, Present Simple & Continuous)",
          "topic": "រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ",
          "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
          "vocab": [
            {
              "en": "graduate",
              "kh": "បញ្ចប់ការសិក្សា",
              "ipa": "/ˈɡrædʒueɪt/",
              "exEn": "I graduate from Elementary level!",
              "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
            },
            {
              "en": "achievement",
              "kh": "សមិទ្ធផល / ស្នាដៃ",
              "ipa": "/əˈtʃiːvmənt/",
              "exEn": "This is a proud achievement.",
              "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
            },
            {
              "en": "knowledge",
              "kh": "ចំណេះដឹង",
              "ipa": "/ˈnɒlɪdʒ/",
              "exEn": "Knowledge opens many doors.",
              "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
            },
            {
              "en": "congratulations",
              "kh": "អបអរសាទរ",
              "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
              "exEn": "Congratulations on your graduation!",
              "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
            },
            {
              "en": "future",
              "kh": "អនាគត",
              "ipa": "/ˈfjuːtʃər/",
              "exEn": "A bright future awaits you.",
              "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 67: Grand Review 1: Pronouns, To Be, Present Simple & Continuous today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 67៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 67! Are you ready to master Grand Review 1: Pronouns, To Be, Present Simple & Continuous?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 67! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 67\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ (Grand Review 1: Pronouns, To Be, Present Simple & Continuous)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 67: Grand Review 1: Pronouns, To Be, Present Simple & Continuous today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 67៖ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 67! Are you ready to master Grand Review 1: Pronouns, To Be, Present Simple & Continuous?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 67! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ១៖ សព្វនាម កិរិយាសព្ទ Be និងកាលទាំងពីរ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el68",
          "day": 68,
          "title": "ថ្ងៃទី 68៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ (Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How))",
          "topic": "រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦",
          "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
          "vocab": [
            {
              "en": "graduate",
              "kh": "បញ្ចប់ការសិក្សា",
              "ipa": "/ˈɡrædʒueɪt/",
              "exEn": "I graduate from Elementary level!",
              "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
            },
            {
              "en": "achievement",
              "kh": "សមិទ្ធផល / ស្នាដៃ",
              "ipa": "/əˈtʃiːvmənt/",
              "exEn": "This is a proud achievement.",
              "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
            },
            {
              "en": "knowledge",
              "kh": "ចំណេះដឹង",
              "ipa": "/ˈnɒlɪdʒ/",
              "exEn": "Knowledge opens many doors.",
              "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
            },
            {
              "en": "congratulations",
              "kh": "អបអរសាទរ",
              "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
              "exEn": "Congratulations on your graduation!",
              "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
            },
            {
              "en": "future",
              "kh": "អនាគត",
              "ipa": "/ˈfjuːtʃər/",
              "exEn": "A bright future awaits you.",
              "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 68: Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 68៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 68! Are you ready to master Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 68! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 68\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ (Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 68: Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 68៖ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 68! Are you ready to master Grand Review 2: Wh-Questions (Who, What, Where, When, Why, How)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 68! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ២៖ សំណួរ Wh-Questions ទាំង ៦ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el69",
          "day": 69,
          "title": "ថ្ងៃទី 69៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ (Grand Review 3: Essential Vocabulary & Daily Dialogues)",
          "topic": "រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ",
          "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
          "vocab": [
            {
              "en": "graduate",
              "kh": "បញ្ចប់ការសិក្សា",
              "ipa": "/ˈɡrædʒueɪt/",
              "exEn": "I graduate from Elementary level!",
              "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
            },
            {
              "en": "achievement",
              "kh": "សមិទ្ធផល / ស្នាដៃ",
              "ipa": "/əˈtʃiːvmənt/",
              "exEn": "This is a proud achievement.",
              "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
            },
            {
              "en": "knowledge",
              "kh": "ចំណេះដឹង",
              "ipa": "/ˈnɒlɪdʒ/",
              "exEn": "Knowledge opens many doors.",
              "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
            },
            {
              "en": "congratulations",
              "kh": "អបអរសាទរ",
              "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
              "exEn": "Congratulations on your graduation!",
              "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
            },
            {
              "en": "future",
              "kh": "អនាគត",
              "ipa": "/ˈfjuːtʃər/",
              "exEn": "A bright future awaits you.",
              "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 69: Grand Review 3: Essential Vocabulary & Daily Dialogues today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 69៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 69! Are you ready to master Grand Review 3: Essential Vocabulary & Daily Dialogues?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 69! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 69\n🎯 ប្រធានបទ៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ (Grand Review 3: Essential Vocabulary & Daily Dialogues)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 69: Grand Review 3: Essential Vocabulary & Daily Dialogues today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 69៖ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 69! Are you ready to master Grand Review 3: Essential Vocabulary & Daily Dialogues?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 69! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ រំលឹកមេរៀនធំទី ៣៖ វាក្យសព្ទគន្លឹះ និងកិច្ចសន្ទនាប្រចាំថ្ងៃ ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el70",
          "day": 70,
          "title": "ថ្ងៃទី 70៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) (Elementary Final Exam Practice Test Part 1)",
          "topic": "វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១)",
          "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
          "vocab": [
            {
              "en": "graduate",
              "kh": "បញ្ចប់ការសិក្សា",
              "ipa": "/ˈɡrædʒueɪt/",
              "exEn": "I graduate from Elementary level!",
              "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
            },
            {
              "en": "achievement",
              "kh": "សមិទ្ធផល / ស្នាដៃ",
              "ipa": "/əˈtʃiːvmənt/",
              "exEn": "This is a proud achievement.",
              "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
            },
            {
              "en": "knowledge",
              "kh": "ចំណេះដឹង",
              "ipa": "/ˈnɒlɪdʒ/",
              "exEn": "Knowledge opens many doors.",
              "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
            },
            {
              "en": "congratulations",
              "kh": "អបអរសាទរ",
              "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
              "exEn": "Congratulations on your graduation!",
              "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
            },
            {
              "en": "future",
              "kh": "អនាគត",
              "ipa": "/ˈfjuːtʃər/",
              "exEn": "A bright future awaits you.",
              "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 70: Elementary Final Exam Practice Test Part 1 today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 70៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 70! Are you ready to master Elementary Final Exam Practice Test Part 1?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 70! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 70\n🎯 ប្រធានបទ៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) (Elementary Final Exam Practice Test Part 1)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 70: Elementary Final Exam Practice Test Part 1 today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 70៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 70! Are you ready to master Elementary Final Exam Practice Test Part 1?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 70! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ១) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el71",
          "day": 71,
          "title": "ថ្ងៃទី 71៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) (Elementary Final Exam Practice Test Part 2)",
          "topic": "វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២)",
          "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
          "vocab": [
            {
              "en": "graduate",
              "kh": "បញ្ចប់ការសិក្សា",
              "ipa": "/ˈɡrædʒueɪt/",
              "exEn": "I graduate from Elementary level!",
              "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
            },
            {
              "en": "achievement",
              "kh": "សមិទ្ធផល / ស្នាដៃ",
              "ipa": "/əˈtʃiːvmənt/",
              "exEn": "This is a proud achievement.",
              "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
            },
            {
              "en": "knowledge",
              "kh": "ចំណេះដឹង",
              "ipa": "/ˈnɒlɪdʒ/",
              "exEn": "Knowledge opens many doors.",
              "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
            },
            {
              "en": "congratulations",
              "kh": "អបអរសាទរ",
              "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
              "exEn": "Congratulations on your graduation!",
              "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
            },
            {
              "en": "future",
              "kh": "អនាគត",
              "ipa": "/ˈfjuːtʃər/",
              "exEn": "A bright future awaits you.",
              "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 71: Elementary Final Exam Practice Test Part 2 today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 71៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 71! Are you ready to master Elementary Final Exam Practice Test Part 2?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 71! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 71\n🎯 ប្រធានបទ៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) (Elementary Final Exam Practice Test Part 2)\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 71: Elementary Final Exam Practice Test Part 2 today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 71៖ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 71! Are you ready to master Elementary Final Exam Practice Test Part 2?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 71! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ វិញ្ញាសាហ្វឹកហាត់ប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (ភាគ ២) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        },
        {
          "id": "el72",
          "day": 72,
          "title": "ថ្ងៃទី 72៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) (Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា))",
          "topic": "ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam)",
          "grammar": "ការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!",
          "vocab": [
            {
              "en": "graduate",
              "kh": "បញ្ចប់ការសិក្សា",
              "ipa": "/ˈɡrædʒueɪt/",
              "exEn": "I graduate from Elementary level!",
              "exKh": "ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!"
            },
            {
              "en": "achievement",
              "kh": "សមិទ្ធផល / ស្នាដៃ",
              "ipa": "/əˈtʃiːvmənt/",
              "exEn": "This is a proud achievement.",
              "exKh": "នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។"
            },
            {
              "en": "knowledge",
              "kh": "ចំណេះដឹង",
              "ipa": "/ˈnɒlɪdʒ/",
              "exEn": "Knowledge opens many doors.",
              "exKh": "ចំណេះដឹងបើកផ្លូវជាច្រើន។"
            },
            {
              "en": "congratulations",
              "kh": "អបអរសាទរ",
              "ipa": "/kənˌɡrætʃuˈleɪʃnz/",
              "exEn": "Congratulations on your graduation!",
              "exKh": "អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!"
            },
            {
              "en": "future",
              "kh": "អនាគត",
              "ipa": "/ˈfjuːtʃər/",
              "exEn": "A bright future awaits you.",
              "exKh": "អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។"
            }
          ],
          "sentences": [
            {
              "en": "We study Day 72: Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា) today.",
              "kh": "ពួកយើងរៀនថ្ងៃទី 72៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ថ្ងៃនេះ។"
            },
            {
              "en": "Teacher Piseth explains every lesson with love and patience.",
              "kh": "អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។"
            },
            {
              "en": "Daily practice brings confidence and high scores.",
              "kh": "ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។"
            }
          ],
          "dialogue": [
            {
              "speaker": "Teacher Piseth",
              "en": "Welcome to Day 72! Are you ready to master Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា)?",
              "kh": "ស្វាគមន៍មកកាន់ថ្ងៃទី 72! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ហើយឬនៅ?"
            },
            {
              "speaker": "Student",
              "en": "Yes, Teacher Piseth! I am very excited and ready to learn.",
              "kh": "ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។"
            },
            {
              "speaker": "Teacher Piseth",
              "en": "Wonderful! Let us listen carefully, speak clearly, and achieve excellence!",
              "kh": "ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!"
            }
          ],
          "content": "📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline\n📌 កម្រិត៖ ថ្នាក់បឋមសិក្សា (Elementary Level) • ខែទី 3 • សប្តាហ៍ទី 12 • ថ្ងៃទី 72\n🎯 ប្រធានបទ៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) (Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា))\n📍 បង្រៀនដោយ៖ អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)\n\n════════════════════════════════════════════\n📖 មូលដ្ឋានវេយ្យាករណ៍ និងក្បួនប្រើប្រាស់ (Grammar Rules)៖\nការរំលឹកមេរៀនធំទូទាំង ៧២ ថ្ងៃនៃថ្នាក់បឋមសិក្សា (Elementary Level)៖\n• វេយ្យាករណ៍៖ Pronouns, To Be (Am/Is/Are), To Have, Present Simple, Present Continuous, Can, Past (Was/Were), Future (Going to)\n• វាក្យសព្ទ៖ ជាង ៣៥០ ពាក្យគន្លឹះក្នុងជីវិតរស់នៅ ការទិញទំនិញ ទីក្រុង ម្ហូបអាហារ និងអាកាសធាតុ\n• ការសន្ទនា៖ ឆ្លើយតប និងសន្ទនាជាក់ស្តែងជាមួយអ្នកគ្រូពិសិដ្ឋ AI\n• វិញ្ញាសាប្រឡងបញ្ចប់៖ គ្រប់ដណ្តប់គ្រប់ចំណុចទាំងអស់ដើម្បីត្រៀមទទួលវិញ្ញាបនបត្របញ្ចប់ការសិក្សាថ្នាក់បឋម (Elementary Graduation Certificate)!\n\n════════════════════════════════════════════\n🔑 វាក្យសព្ទសំខាន់ៗប្រចាំថ្ងៃ (Key Vocabulary)៖\n1. 🇬🇧 graduate (/ˈɡrædʒueɪt/) = 🇰🇭 បញ្ចប់ការសិក្សា\n   ↳ ឧទាហរណ៍៖ I graduate from Elementary level!\n   ↳ បកប្រែ៖ (ខ្ញុំបញ្ចប់ការសិក្សាថ្នាក់បឋមសិក្សាហើយ!)\n\n2. 🇬🇧 achievement (/əˈtʃiːvmənt/) = 🇰🇭 សមិទ្ធផល / ស្នាដៃ\n   ↳ ឧទាហរណ៍៖ This is a proud achievement.\n   ↳ បកប្រែ៖ (នេះគឺជាសមិទ្ធផលដ៏គួរឱ្យមោទនភាព។)\n\n3. 🇬🇧 knowledge (/ˈnɒlɪdʒ/) = 🇰🇭 ចំណេះដឹង\n   ↳ ឧទាហរណ៍៖ Knowledge opens many doors.\n   ↳ បកប្រែ៖ (ចំណេះដឹងបើកផ្លូវជាច្រើន។)\n\n4. 🇬🇧 congratulations (/kənˌɡrætʃuˈleɪʃnz/) = 🇰🇭 អបអរសាទរ\n   ↳ ឧទាហរណ៍៖ Congratulations on your graduation!\n   ↳ បកប្រែ៖ (អបអរសាទរចំពោះការបញ្ចប់ការសិក្សារបស់កូន!)\n\n5. 🇬🇧 future (/ˈfjuːtʃər/) = 🇰🇭 អនាគត\n   ↳ ឧទាហរណ៍៖ A bright future awaits you.\n   ↳ បកប្រែ៖ (អនាគតដ៏ភ្លឺស្វាងកំពុងរង់ចាំកូន។)\n\n════════════════════════════════════════════\n💡 ល្បះគំរូ និងការប្រើប្រាស់ជាក់ស្តែង (Sample Sentences)៖\n1. 🇬🇧 We study Day 72: Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា) today.\n   🇰🇭 (ពួកយើងរៀនថ្ងៃទី 72៖ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ថ្ងៃនេះ។)\n2. 🇬🇧 Teacher Piseth explains every lesson with love and patience.\n   🇰🇭 (អ្នកគ្រូពិសិដ្ឋពន្យល់រាល់មេរៀនដោយក្តីស្រឡាញ់ និងការអត់ធ្មត់។)\n3. 🇬🇧 Daily practice brings confidence and high scores.\n   🇰🇭 (ការអនុវត្តរាល់ថ្ងៃនាំមកនូវទំនុកចិត្ត និងពិន្ទុខ្ពស់។)\n\n════════════════════════════════════════════\n💬 កិច្ចសន្ទនាគំរូ (Teacher Piseth & Student Dialogue)៖\n👤 Teacher Piseth:\n   🇬🇧 \"Welcome to Day 72! Are you ready to master Elementary Level Graduation Exam (ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា)?\"\n   🇰🇭 (ស្វាគមន៍មកកាន់ថ្ងៃទី 72! តើកូនរួចរាល់ដើម្បីចេះស្ទាត់ ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា (Elementary Level Graduation Exam) ហើយឬនៅ?)\n\n👤 Student:\n   🇬🇧 \"Yes, Teacher Piseth! I am very excited and ready to learn.\"\n   🇰🇭 (ចាស/បាទអ្នកគ្រូពិសិដ្ឋ! ខ្ញុំរំភើបខ្លាំងណាស់ និងរួចរាល់ក្នុងការរៀនសូត្រហើយ។)\n\n👤 Teacher Piseth:\n   🇬🇧 \"Wonderful! Let us listen carefully, speak clearly, and achieve excellence!\"\n   🇰🇭 (ពូកែណាស់! តោះយើងស្តាប់ដោយយកចិត្តទុកដាក់ និយាយឱ្យច្បាស់ និងសម្រេចបានភាពល្អប្រសើរ!)\n\n════════════════════════════════════════════\n✍️ លំហាត់អនុវត្តប្រចាំថ្ងៃ (Daily Practice)៖\nចូរហាត់អានឮៗតាមអ្នកគ្រូពិសិដ្ឋ រួចចុចប៊ូតុង 🔊 ស្តាប់ការបញ្ចេញសំឡេង ដើម្បីផ្ទៀងផ្ទាត់! \nបន្ទាប់មក ចូរបង្កើតល្បះផ្ទាល់ខ្លួនរបស់អ្នកចំនួន ១ ដោយប្រើពាក្យ ឬក្បួនវេយ្យាករណ៍ខាងលើ រួចផ្ញើមកកាន់អ្នកគ្រូក្នុងប្រអប់ Chat ដើម្បីឱ្យអ្នកគ្រូជួយពិនិត្យកែតម្រូវជូន! 💖"
        }
      ]
    }
  ]
};

module.exports = ELEMENTARY_COURSE;
