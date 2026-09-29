/**
 * Adjectives Data - Rich adjective categories with comparative/superlative degrees and bilingual examples
 */

const adjectiveCategories = [
  {
    name: 'គុណនាមពណ៌នាបុគ្គលិកលក្ខណៈ (Personality & Character)',
    words: ['Smart = ឆ្លាត', 'Kind = ចិត្តល្អ', 'Hardworking = ឧស្សាហ៍', 'Brave = ក្លាហាន', 'Honest = ស្មោះត្រង់', 'Friendly = រួសរាយ', 'Polite = គួរសម', 'Patient = អត់ធ្មត់', 'Creative = ច្នៃប្រឌិត', 'Confident = មានទំនុកចិត្ត'],
    details: [
      {
        adj: "Smart", comp: "Smarter", sup: "Smartest", opp: "Stupid / Foolish", kh: "ឆ្លាត / មានប្រាជ្ញា",
        examples: [
          { en: "She is a smart student who learns very fast.", kh: "នាងគឺជាសិស្សឆ្លាតម្នាក់ដែលរៀនឆាប់ចេះណាស់។" },
          { en: "He is smarter than anyone else in our class.", kh: "គាត់ឆ្លាតជាងអ្នកណាៗទាំងអស់នៅក្នុងថ្នាក់របស់យើង។" }
        ]
      },
      {
        adj: "Kind", comp: "Kinder", sup: "Kindest", opp: "Cruel / Mean", kh: "ចិត្តល្អ / សប្បុរស",
        examples: [
          { en: "Our teacher is very kind and always helps students patiently.", kh: "លោកគ្រូរបស់យើងគឺចិត្តល្អខ្លាំងណាស់ ហើយតែងតែជួយសិស្សដោយការអត់ធ្មត់។" }
        ]
      },
      {
        adj: "Hardworking", comp: "More hardworking", sup: "Most hardworking", opp: "Lazy", kh: "ឧស្សាហ៍ព្យាយាម",
        examples: [
          { en: "Hardworking people always achieve great success in life.", kh: "មនុស្សដែលឧស្សាហ៍ព្យាយាម តែងតែសម្រេចបានជោគជ័យដ៏អស្ចារ្យក្នុងឆាកជីវិត។" }
        ]
      },
      {
        adj: "Confident", comp: "More confident", sup: "Most confident", opp: "Shy / Insecure", kh: "មានទំនុកចិត្តលើខ្លួនឯង",
        examples: [
          { en: "Speaking English every day makes you feel more confident.", kh: "ការនិយាយភាសាអង់គ្លេសរាល់ថ្ងៃ ធ្វើឱ្យអ្នកកាន់តែមានទំនុកចិត្តខ្ពស់។" }
        ]
      }
    ]
  },
  {
    name: 'គុណនាមពណ៌នារូបរាង និងលក្ខខណ្ឌ (Physical Appearance & Condition)',
    words: ['Beautiful = ស្រស់ស្អាត', 'Handsome = សង្ហា', 'Tall = ខ្ពស់', 'Short = ទាប/ខ្លី', 'Strong = ខ្លាំង', 'Healthy = មានសុខភាពល្អ', 'Clean = ស្អាតបាត', 'Modern = ទំនើប', 'Comfortable = ស្រួល/ផាសុកភាព', 'Spacious = ធំទូលាយ'],
    details: [
      {
        adj: "Beautiful", comp: "More beautiful", sup: "Most beautiful", opp: "Ugly", kh: "ស្រស់ស្អាត",
        examples: [
          { en: "Cambodia is known for its beautiful ancient temples.", kh: "ប្រទេសកម្ពុជាត្រូវបានគេស្គាល់តាមរយៈប្រាសាទបុរាណដ៏ស្រស់ស្អាត។" },
          { en: "This sunset is the most beautiful view I have ever seen.", kh: "ថ្ងៃលិចនេះគឺជាទេសភាពដ៏ស្រស់ស្អាតបំផុតដែលខ្ញុំធ្លាប់បានឃើញ។" }
        ]
      },
      {
        adj: "Healthy", comp: "Healthier", sup: "Healthiest", opp: "Sick / Unhealthy", kh: "មានសុខភាពល្អ",
        examples: [
          { en: "Eating fresh fruits and vegetables keeps your body healthy.", kh: "ការញ៉ាំបន្លែ និងផ្លែឈើស្រស់ៗ ជួយឱ្យរាងកាយរបស់អ្នកមានសុខភាពល្អ។" }
        ]
      },
      {
        adj: "Comfortable", comp: "More comfortable", sup: "Most comfortable", opp: "Uncomfortable", kh: "មានផាសុកភាព / ស្រណុកស្រួល",
        examples: [
          { en: "This hotel room has a very comfortable bed and quiet atmosphere.", kh: "បន្ទប់សណ្ឋាគារនេះមានគ្រែគេងប្រកបដោយផាសុកភាព និងបរិយាកាសស្ងប់ស្ងាត់។" }
        ]
      }
    ]
  },
  {
    name: 'គុណនាមពណ៌នាអារម្មណ៍ (Feelings & Emotions)',
    words: ['Happy = សប្បាយចិត្ត', 'Sad = កើតទុក្ខ', 'Excited = រំភើប', 'Calm = ស្ងប់អារម្មណ៍', 'Proud = មានមោទនភាព', 'Grateful = ដឹងគុណ', 'Tired = ហត់នឿយ', 'Energetic = ស្វាហាប់', 'Relaxed = ធូរស្រាល', 'Curious = ចង់ដឹងចង់ឃើញ'],
    details: [
      {
        adj: "Happy", comp: "Happier", sup: "Happiest", opp: "Sad / Unhappy", kh: "សប្បាយរីករាយ",
        examples: [
          { en: "I am extremely happy with my examination results.", kh: "ខ្ញុំសប្បាយចិត្តខ្លាំងណាស់ចំពោះលទ្ធផលប្រឡងរបស់ខ្ញុំ។" }
        ]
      },
      {
        adj: "Proud", comp: "Prouder", sup: "Proudest", opp: "Ashamed", kh: "មានមោទនភាព",
        examples: [
          { en: "My parents were very proud when I graduated with honors.", kh: "ឪពុកម្តាយរបស់ខ្ញុំមានមោទនភាពយ៉ាងខ្លាំងនៅពេលដែលខ្ញុំបានបញ្ចប់ការសិក្សាដោយកិត្តិយស។" }
        ]
      },
      {
        adj: "Grateful", comp: "More grateful", sup: "Most grateful", opp: "Ungrateful", kh: "ដឹងគុណ / អរគុណយ៉ាងជ្រាលជ្រៅ",
        examples: [
          { en: "We are deeply grateful for your generous guidance and support.", kh: "ពួកយើងសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះការណែនាំ និងការគាំទ្រដ៏សប្បុរសរបស់អ្នក។" }
        ]
      }
    ]
  },
  {
    name: 'គុណនាមសម្រាប់អាជីវកម្ម និងវិជ្ជាជីវៈ (Business & Professional)',
    words: ['Professional = មានវិជ្ជាជីវៈ', 'Reliable = គួរឱ្យទុកចិត្តបាន', 'Efficient = មានប្រសិទ្ធភាព', 'Successful = ជោគជ័យ', 'Punctual = ទៀងពេល', 'Flexible = បត់បែនបាន', 'Accurate = ត្រឹមត្រូវច្បាស់លាស់', 'Valuable = មានតម្លៃ', 'Competitive = មានការប្រកួតប្រជែង', 'Productive = ផ្តល់ទិន្នផលខ្ពស់'],
    details: [
      {
        adj: "Professional", comp: "More professional", sup: "Most professional", opp: "Unprofessional", kh: "មានវិជ្ជាជីវៈខ្ពស់",
        examples: [
          { en: "She always maintains a professional attitude in business meetings.", kh: "នាងតែងតែរក្សាឥរិយាបថប្រកបដោយវិជ្ជាជីវៈខ្ពស់ក្នុងការប្រជុំអាជីវកម្ម។" }
        ]
      },
      {
        adj: "Reliable", comp: "More reliable", sup: "Most reliable", opp: "Unreliable", kh: "គួរឱ្យទុកចិត្តបាន / ពឹងពាក់បាន",
        examples: [
          { en: "He is a reliable employee who always delivers high-quality work on time.", kh: "គាត់គឺជាបុគ្គលិកដែលគួរឱ្យទុកចិត្ត ដែលតែងតែប្រគល់ការងារប្រកបដោយគុណភាពខ្ពស់ទាន់ពេល។" }
        ]
      },
      {
        adj: "Efficient", comp: "More efficient", sup: "Most efficient", opp: "Inefficient", kh: "មានប្រសិទ្ធភាពខ្ពស់",
        examples: [
          { en: "Using AI tools makes our online study system much more efficient.", kh: "ការប្រើប្រាស់ឧបករណ៍ AI ជួយឱ្យប្រព័ន្ធសិក្សាអនឡាញរបស់យើងកាន់តែមានប្រសិទ្ធភាពខ្ពស់។" }
        ]
      }
    ]
  }
];

module.exports = adjectiveCategories;
