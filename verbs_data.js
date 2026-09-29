/**
 * Verbs Data - Rich verb categories with V1, V2, V3, and practical translated examples
 */

const verbCategories = [
  {
    name: 'កិរិយាសព្ទប្រចាំថ្ងៃ (Daily Routine Verbs)',
    words: ['Eat = ញ៉ាំ', 'Drink = ផឹក', 'Sleep = គេង', 'Walk = ដើរ', 'Run = រត់', 'Read = អាន', 'Write = សរសេរ', 'Listen = ស្តាប់', 'Speak = និយាយ', 'Watch = មើល'],
    details: [
      {
        v1: "Eat", v2: "Ate", v3: "Eaten", kh: "ញ៉ាំ / ទទួលទាន",
        examples: [
          { en: "I eat healthy breakfast at 7:00 AM every morning.", kh: "ខ្ញុំញ៉ាំអាហារពេលព្រឹកដែលមានជីវជាតិនៅម៉ោង ៧:០០ ព្រឹកជារៀងរាល់ថ្ងៃ។" },
          { en: "She ate fried rice for dinner yesterday.", kh: "នាងបានញ៉ាំបាយឆាសម្រាប់អាហារពេលល្ងាចកាលពីម្សិលមិញ។" },
          { en: "We have already eaten lunch.", kh: "ពួកយើងបានញ៉ាំអាហារថ្ងៃត្រង់រួចរាល់ហើយ។" }
        ]
      },
      {
        v1: "Drink", v2: "Drank", v3: "Drunk", kh: "ផឹក / ពិសា",
        examples: [
          { en: "You should drink at least two liters of water a day.", kh: "អ្នកគួរតែពិសាទឹកយ៉ាងហោចណាស់ពីរលីត្រក្នុងមួយថ្ងៃ។" },
          { en: "He drank hot tea because he had a sore throat.", kh: "គាត់បានផឹកទឹកតែក្តៅ ពីព្រោះគាត់ឈឺបំពង់ក។" }
        ]
      },
      {
        v1: "Sleep", v2: "Slept", v3: "Slept", kh: "គេង / សម្រាន្ត",
        examples: [
          { en: "I usually sleep eight hours every night to stay refreshed.", kh: "ខ្ញុំតែងតែគេង ៨ ម៉ោងរៀងរាល់យប់ដើម្បីឱ្យមានកម្លាំងស្រស់ស្រាយ។" },
          { en: "The baby slept soundly all night.", kh: "ទារកនោះបានគេងលក់យ៉ាងស្កប់ស្កល់ពេញមួយយប់។" }
        ]
      },
      {
        v1: "Speak", v2: "Spoke", v3: "Spoken", kh: "និយាយ",
        examples: [
          { en: "She speaks three foreign languages fluently.", kh: "នាងនិយាយភាសាបរទេសបីភាសាបានយ៉ាងស្ទាត់ជំនាញ។" },
          { en: "The manager spoke to the team about the new project.", kh: "អ្នកគ្រប់គ្រងបាននិយាយទៅកាន់ក្រុមការងារអំពីគម្រោងថ្មី។" }
        ]
      },
      {
        v1: "Read", v2: "Read", v3: "Read", kh: "អាន",
        examples: [
          { en: "I read English articles every day to build vocabulary.", kh: "ខ្ញុំអានអត្ថបទភាសាអង់គ្លេសរាល់ថ្ងៃ ដើម្បីពង្រឹងវាក្យសព្ទ។" }
        ]
      }
    ]
  },
  {
    name: 'សកម្មភាពការងារ និងជំនួញ (Work & Business Actions)',
    words: ['Work = ធ្វើការ', 'Manage = គ្រប់គ្រង', 'Negotiate = ចរចា', 'Develop = អភិវឌ្ឍ', 'Organize = រៀបចំចាត់ចែង', 'Lead = ដឹកនាំ', 'Deliver = ប្រគល់/ដឹកជញ្ជូន', 'Analyze = វិភាគ', 'Approve = អនុម័ត', 'Improve = កែលម្អ'],
    details: [
      {
        v1: "Work", v2: "Worked", v3: "Worked", kh: "ធ្វើការ",
        examples: [
          { en: "He works hard to support his family.", kh: "គាត់ខិតខំធ្វើការខ្លាំងណាស់ដើម្បីផ្គត់ផ្គង់គ្រួសាររបស់គាត់។" },
          { en: "Our team worked late yesterday to meet the project deadline.", kh: "ក្រុមការងាររបស់យើងបានធ្វើការដល់យប់កាលពីម្សិលមិញ ដើម្បីឱ្យទាន់កាលកំណត់គម្រោង។" }
        ]
      },
      {
        v1: "Manage", v2: "Managed", v3: "Managed", kh: "គ្រប់គ្រង / ចាត់ចែង",
        examples: [
          { en: "She manages a team of twenty talented software engineers.", kh: "នាងគ្រប់គ្រងក្រុមវិស្វករសូហ្វវែរដែលមានទេពកោសល្យចំនួន ២០ នាក់។" }
        ]
      },
      {
        v1: "Negotiate", v2: "Negotiated", v3: "Negotiated", kh: "ចរចា",
        examples: [
          { en: "They successfully negotiated a multi-million-dollar contract.", kh: "ពួកគេបានចរចាកិច្ចសន្យាតម្លៃរាប់លានដុល្លារដោយជោគជ័យ។" }
        ]
      },
      {
        v1: "Improve", v2: "Improved", v3: "Improved", kh: "កែលម្អ / អភិវឌ្ឍឱ្យប្រសើរឡើង",
        examples: [
          { en: "Daily practice will improve your English pronunciation quickly.", kh: "ការអនុវត្តរាល់ថ្ងៃនឹងកែលម្អការបញ្ចេញសំឡេងភាសាអង់គ្លេសរបស់អ្នកយ៉ាងឆាប់រហ័ស។" }
        ]
      }
    ]
  },
  {
    name: 'សកម្មភាពទំនាក់ទំនង និងការសន្ទនា (Communication & Social Verbs)',
    words: ['Ask = សួរ', 'Answer = ឆ្លើយ', 'Explain = ពន្យល់', 'Describe = ពិពណ៌នា', 'Discuss = ពិភាក្សា', 'Suggest = ស្នើ/ផ្តល់យោបល់', 'Remind = រំលឹក', 'Promise = សន្យា', 'Apologize = សុំទោស', 'Congratulate = អបអរសាទរ'],
    details: [
      {
        v1: "Explain", v2: "Explained", v3: "Explained", kh: "ពន្យល់",
        examples: [
          { en: "The teacher explained the lesson with clear examples.", kh: "លោកគ្រូបានពន្យល់មេរៀនដោយមានឧទាហរណ៍យ៉ាងច្បាស់លាស់។" }
        ]
      },
      {
        v1: "Discuss", v2: "Discussed", v3: "Discussed", kh: "ពិភាក្សា",
        examples: [
          { en: "We need to discuss this issue with our partners immediately.", kh: "យើងត្រូវតែពិភាក្សាបញ្ហានេះជាមួយដៃគូរបស់យើងជាបន្ទាន់។" }
        ]
      },
      {
        v1: "Apologize", v2: "Apologized", v3: "Apologized", kh: "សុំទោស",
        examples: [
          { en: "He apologized for arriving late to the formal meeting.", kh: "គាត់បានសុំទោសចំពោះការមកយឺតក្នុងការប្រជុំផ្លូវការ។" }
        ]
      }
    ]
  },
  {
    name: 'ការធ្វើដំណើរ និងចលនា (Travel & Movement Verbs)',
    words: ['Go = ទៅ', 'Come = មក', 'Travel = ធ្វើដំណើរ', 'Fly = ហោះហើរ', 'Drive = បើកបរ', 'Ride = ជិះ', 'Arrive = មកដល់', 'Depart = ចេញដំណើរ', 'Explore = រុករក/ទស្សនា', 'Return = ត្រឡប់មកវិញ'],
    details: [
      {
        v1: "Go", v2: "Went", v3: "Gone", kh: "ទៅ",
        examples: [
          { en: "I go to the gym three times a week.", kh: "ខ្ញុំទៅកន្លែងហាត់ប្រាណ ៣ ដងក្នុងមួយសប្តាហ៍។" },
          { en: "They went to Siem Reap for their summer holiday.", kh: "ពួកគេបានទៅសៀមរាបសម្រាប់វិស្សមកាលរដូវក្តៅរបស់ពួកគេ។" }
        ]
      },
      {
        v1: "Arrive", v2: "Arrived", v3: "Arrived", kh: "មកដល់",
        examples: [
          { en: "The international flight will arrive at Phnom Penh Airport at 8 PM.", kh: "ជើងហោះហើរអន្តរជាតិនឹងមកដល់ព្រលានយន្តហោះភ្នំពេញនៅម៉ោង ៨ យប់។" }
        ]
      },
      {
        v1: "Explore", v2: "Explored", v3: "Explored", kh: "រុករក / ដើរទស្សនាកម្សាន្ត",
        examples: [
          { en: "Tourists love exploring the ancient Angkor Wat temple.", kh: "ភ្ញៀវទេសចរចូលចិត្តដើរទស្សនារុករកប្រាសាទអង្គរវត្តបុរាណ។" }
        ]
      }
    ]
  }
];

module.exports = verbCategories;
