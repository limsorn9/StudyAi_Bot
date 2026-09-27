const fs = require('fs');

const vocabCategories = [
  { name: 'សមាជិកគ្រួសារ (Family Members)', words: ['ឪពុក = Father', 'ម្តាយ = Mother', 'បងប្រុស = Brother', 'ប្អូនស្រី = Sister', 'ជីតា = Grandfather'] },
  { name: 'រាងកាយ (Body Parts)', words: ['ក្បាល = Head', 'ភ្នែក = Eye', 'ដៃ = Hand', 'ជើង = Foot', 'មាត់ = Mouth'] },
  { name: 'ពណ៌ (Colors)', words: ['ក្រហម = Red', 'ខៀវ = Blue', 'ខ្មៅ = Black', 'ស = White', 'បៃតង = Green'] },
  { name: 'អាហារ (Food)', words: ['បាយ = Rice', 'សាច់ជ្រូក = Pork', 'សាច់មាន់ = Chicken', 'ត្រី = Fish', 'នំប៉័ង = Bread'] },
  { name: 'ផ្លែឈើ (Fruits)', words: ['ផ្លែប៉ោម = Apple', 'ចេក = Banana', 'ក្រូច = Orange', 'ស្វាយ = Mango', 'ទំពាំងបាយជូរ = Grape'] },
  { name: 'សត្វ (Animals)', words: ['ឆ្កែ = Dog', 'ឆ្មា = Cat', 'សត្វគោ = Cow', 'សេះ = Horse', 'បក្សី = Bird'] },
  { name: 'យានយន្ត (Vehicles)', words: ['ឡាន = Car', 'ម៉ូតូ = Motorcycle', 'កង់ = Bicycle', 'យន្តហោះ = Airplane', 'រថភ្លើង = Train'] },
  { name: 'ផ្ទះ (House)', words: ['បន្ទប់គេង = Bedroom', 'បន្ទប់ទឹក = Bathroom', 'ផ្ទះបាយ = Kitchen', 'ទ្វារ = Door', 'បង្អួច = Window'] },
  { name: 'សម្លៀកបំពាក់ (Clothes)', words: ['អាវ = Shirt', 'ខោ = Pants', 'ស្បែកជើង = Shoes', 'មួក = Hat', 'រ៉ូប = Dress'] },
  { name: 'មុខរបរ (Occupations)', words: ['គ្រូបង្រៀន = Teacher', 'គ្រូពេទ្យ = Doctor', 'ប៉ូលីស = Police', 'កសិករ = Farmer', 'សិស្ស = Student'] }
];

const grammarRules = [
  { topic: "To Be (am, is, are)", kh: "ការប្រើប្រាស់ To Be សម្រាប់ប្រាប់ពីស្ថានភាព ឬអត្តសញ្ញាណ។\n💡 ទម្រង់: S + am/is/are + Noun/Adj\n- I am happy. (ខ្ញុំសប្បាយចិត្ត)\n- She is a doctor. (នាងគឺជាគ្រូពេទ្យ)\n- They are students. (ពួកគេគឺជាសិស្ស)" },
  { topic: "Present Simple Tense", kh: "ការប្រើប្រាស់ Present Simple សម្រាប់ទម្លាប់ ឬការពិត។\n💡 ទម្រង់: S + V1 (s/es)\n- I play football. (ខ្ញុំលេងបាល់ទាត់)\n- He goes to school. (គាត់ទៅសាលារៀន)\n- The sun rises in the east. (ព្រះអាទិត្យរះនៅទិសខាងកើត)" },
  { topic: "Present Continuous", kh: "ប្រើសម្រាប់សកម្មភាពកំពុងកើតឡើង។\n💡 ទម្រង់: S + am/is/are + V-ing\n- I am eating. (ខ្ញុំកំពុងញ៉ាំ)\n- She is reading a book. (នាងកំពុងអានសៀវភៅ)" },
  { topic: "Past Simple", kh: "ប្រើសម្រាប់សកម្មភាពដែលបានបញ្ចប់ក្នុងអតីតកាល។\n💡 ទម្រង់: S + V2/ed\n- I went to the market yesterday. (ខ្ញុំបានទៅផ្សារកាលពីម្សិលមិញ)\n- We played game last night. (ពួកយើងបានលេងហ្គេមកាលពីយប់មិញ)" },
  { topic: "Future Simple", kh: "ប្រើសម្រាប់និយាយអំពីអនាគត។\n💡 ទម្រង់: S + will + V1\n- I will go to work tomorrow. (ខ្ញុំនឹងទៅធ្វើការនៅថ្ងៃស្អែក)\n- She will buy a car. (នាងនឹងទិញឡានមួយ)" },
  { topic: "Pronouns (សព្វនាម)", kh: "I (ខ្ញុំ), You (អ្នក), We (ពួកយើង), They (ពួកគេ), He (គាត់), She (នាង), It (វា)។\n- I love you. (ខ្ញុំស្រលាញ់អ្នក)\n- He is my friend. (គាត់គឺជាមិត្តរបស់ខ្ញុំ)" },
  { topic: "Articles (a, an, the)", kh: "A / An ប្រើជាមួយនាមរាប់បានឯកវចនៈ។ The ប្រើសម្រាប់នាមច្បាស់លាស់។\n- A cat (ឆ្មាមួយ)\n- An apple (ផ្លែប៉ោមមួយ)\n- The sun (ព្រះអាទិត្យ)" },
  { topic: "Prepositions (ធ្នាក់)", kh: "In (ក្នុង), On (លើ), At (នៅ)។\n- In the box (នៅក្នុងប្រអប់)\n- On the table (នៅលើតុ)\n- At home (នៅផ្ទះ)" }
];

const conversations = [
  { title: "ការណែនាំខ្លួន (Introductions)", script: "A: Hello, my name is John. What is your name?\n(សួស្តី ខ្ញុំឈ្មោះចន។ តើអ្នកឈ្មោះអ្វី?)\nB: Hi John, I am Anna. Nice to meet you.\n(សួស្តីចន ខ្ញុំគឺអាន់ណា។ រីករាយដែលបានស្គាល់អ្នក។)" },
  { title: "ការសួរផ្លូវ (Asking for Directions)", script: "A: Excuse me, where is the hospital?\n(សុំទោស តើមន្ទីរពេទ្យនៅឯណា?)\nB: Go straight and turn left. It's next to the bank.\n(ទៅត្រង់ ហើយបត់ឆ្វេង។ វាជិតធនាគារ។)" },
  { title: "ការទិញទំនិញ (Shopping)", script: "A: How much is this shirt?\n(តើអាវនេះតម្លៃប៉ុន្មាន?)\nB: It is 10 dollars.\n(វាមានតម្លៃ ១០ ដុល្លារ។)\nA: I will take it.\n(ខ្ញុំនឹងយកវា។)" },
  { title: "ការបញ្ជាទិញអាហារ (Ordering Food)", script: "A: I would like to order a pizza, please.\n(ខ្ញុំចង់កុម្ម៉ង់ភីហ្សាមួយ។)\nB: What size do you want?\n(តើអ្នកចង់បានទំហំប៉ុនណា?)\nA: Medium, please.\n(ទំហំកណ្តាល។)" }
];

const categories = [
  { id: 'grammar', name: 'វេយ្យាករណ៍ (Grammar in use)' },
  { id: 'conversation', name: 'សន្ទនា (Conversation)' },
  { id: 'vocab', name: 'ពាក្យ (Vocabulary)' },
  { id: 'sentences', name: 'ល្បះ (Sentences)' }
];

const curriculum = { months: [] };

for (let m = 1; m <= 12; m++) {
  const month = {
    id: `m${m}`,
    title: `ខែទី ${m}`,
    weeks: []
  };

  for (let w = 1; w <= 4; w++) {
    const week = {
      id: `w${w}`,
      title: `សប្តាហ៍ទី ${w}`,
      lessons: []
    };

    for (let l = 1; l <= 4; l++) {
      const cat = categories[l - 1]; // 4 categories for 4 lessons per week
      let content = `📚 មេរៀន៖ ${cat.name} (ខែទី ${m}, សប្តាហ៍ទី ${w}, មេរៀនទី ${l})\n\n`;

      if (cat.id === 'grammar') {
        const grammar = grammarRules[(m * w + l) % grammarRules.length];
        content += `ប្រធានបទ៖ ${grammar.topic}\n\n${grammar.kh}\n\n💡 អនុវត្ត៖ សាកល្បងសរសេរប្រយោគមួយដោយប្រើទម្រង់ខាងលើ រួចផ្ញើមកកាន់ខ្ញុំ (គ្រូ AI) ដើម្បឱ្យខ្ញុំជួយកែ!`;
      } else if (cat.id === 'vocab') {
        const vocab = vocabCategories[(m * w + l) % vocabCategories.length];
        content += `ប្រធានបទ៖ ${vocab.name}\n\n`;
        vocab.words.forEach((word, index) => {
          content += `${index + 1}. ${word}\n`;
        });
        content += `\n💡 អនុវត្ត៖ សូមសាកល្បងយកពាក្យមួយក្នុងចំណោមពាក្យខាងលើ មកបង្កើតជាល្បះ (Sentence) រួចផ្ញើមកកាន់ខ្ញុំ!`;
      } else if (cat.id === 'conversation') {
        const convo = conversations[(m * w + l) % conversations.length];
        content += `ប្រធានបទ៖ ${convo.title}\n\nការសន្ទនាគំរូ៖\n${convo.script}\n\n💡 អនុវត្ត៖ សូមផ្ញើសារជាសម្លេង (Voice Message) អានការសន្ទនានេះ មកកាន់ខ្ញុំ ឬឆាតមកកាន់ខ្ញុំដើម្បីសាកល្បងសន្ទនាជាមួយខ្ញុំដោយផ្ទាល់!`;
      } else if (cat.id === 'sentences') {
        content += `ប្រធានបទ៖ ការបង្កើតល្បះ (Sentence Construction)\n\nរបៀបបង្កើតប្រយោគងាយៗប្រចាំថ្ងៃ៖\n១. I want to + V1 (ខ្ញុំចង់...)\n- I want to sleep. (ខ្ញុំចង់គេង)\n- I want to eat. (ខ្ញុំចង់ញ៉ាំ)\n\n២. I like + Noun/V-ing (ខ្ញុំចូលចិត្ត...)\n- I like books. (ខ្ញុំចូលចិត្តសៀវភៅ)\n- I like reading. (ខ្ញុំចូលចិត្តអាន)\n\n💡 អនុវត្ត៖ តើអ្នកចង់ធ្វើអ្វី? (What do you want to do?) សូមឆ្លើយតបមកកាន់ខ្ញុំជារបៀប I want to...`;
      }

      week.lessons.push({
        id: `l${l}`,
        title: `មេរៀនទី ${l}: ${cat.name}`,
        content: content
      });
    }
    month.weeks.push(week);
  }
  curriculum.months.push(month);
}

fs.writeFileSync('curriculum.json', JSON.stringify(curriculum, null, 2));
console.log("Detailed Curriculum generated successfully!");
