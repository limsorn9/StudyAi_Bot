const fs = require('fs');

const vocabCategories = [
  { name: 'សមាជិកគ្រួសារ (Family Members)', words: ['ឪពុក = Father', 'ម្តាយ = Mother', 'បងប្រុស = Older Brother', 'ប្អូនស្រី = Younger Sister', 'ជីតា = Grandfather', 'ជីដូន = Grandmother', 'ពូ = Uncle', 'មីង = Aunt', 'កូនប្រុស = Son', 'កូនស្រី = Daughter'] },
  { name: 'រាងកាយ (Body Parts)', words: ['ក្បាល = Head', 'ភ្នែក = Eye', 'ដៃ = Hand', 'ជើង = Foot/Leg', 'មាត់ = Mouth', 'ច្រមុះ = Nose', 'ត្រចៀក = Ear', 'សក់ = Hair', 'ធ្មេញ = Tooth', 'មុខ = Face'] },
  { name: 'ពណ៌ (Colors)', words: ['ក្រហម = Red', 'ខៀវ = Blue', 'ខ្មៅ = Black', 'ស = White', 'បៃតង = Green', 'លឿង = Yellow', 'ផ្កាឈូក = Pink', 'ស្វាយ = Purple', 'ប្រផេះ = Gray', 'ត្នោត = Brown'] },
  { name: 'អាហារ (Food)', words: ['បាយ = Rice', 'សាច់ជ្រូក = Pork', 'សាច់មាន់ = Chicken', 'ត្រី = Fish', 'នំប៉័ង = Bread', 'ស៊ុត = Egg', 'ទឹកដោះគោ = Milk', 'បន្លែ = Vegetable', 'សាច់គោ = Beef', 'ស៊ុប = Soup'] },
  { name: 'ផ្លែឈើ (Fruits)', words: ['ផ្លែប៉ោម = Apple', 'ចេក = Banana', 'ក្រូច = Orange', 'ស្វាយ = Mango', 'ទំពាំងបាយជូរ = Grape', 'ម្នាស់ = Pineapple', 'ឪឡឹក = Watermelon', 'ល្ហុង = Papaya', 'ដូង = Coconut', 'ស្រ្តបឺរី = Strawberry'] },
  { name: 'សត្វ (Animals)', words: ['ឆ្កែ = Dog', 'ឆ្មា = Cat', 'សត្វគោ = Cow', 'សេះ = Horse', 'បក្សី = Bird', 'ជ្រូក = Pig', 'មាន់ = Chicken', 'ត្រី = Fish', 'ខ្លា = Tiger', 'ដំរី = Elephant'] },
  { name: 'យានយន្ត (Vehicles)', words: ['ឡាន = Car', 'ម៉ូតូ = Motorcycle', 'កង់ = Bicycle', 'យន្តហោះ = Airplane', 'រថភ្លើង = Train', 'ទូក = Boat', 'កប៉ាល់ = Ship', 'ឡានក្រុង = Bus', 'តាក់ស៊ី = Taxi', 'ឡានដឹកទំនិញ = Truck'] },
  { name: 'ផ្ទះ (House)', words: ['បន្ទប់គេង = Bedroom', 'បន្ទប់ទឹក = Bathroom', 'ផ្ទះបាយ = Kitchen', 'ទ្វារ = Door', 'បង្អួច = Window', 'តុ = Table', 'កៅអី = Chair', 'គ្រែ = Bed', 'ទូរទស្សន៍ = Television', 'សួនច្បារ = Garden'] },
  { name: 'សម្លៀកបំពាក់ (Clothes)', words: ['អាវ = Shirt', 'ខោ = Pants', 'ស្បែកជើង = Shoes', 'មួក = Hat', 'រ៉ូប = Dress', 'សំពត់ = Skirt', 'អាវរងា = Jacket/Coat', 'ស្រោមជើង = Socks', 'ខ្សែក្រវាត់ = Belt', 'វ៉ែនតា = Glasses'] },
  { name: 'មុខរបរ (Occupations)', words: ['គ្រូបង្រៀន = Teacher', 'គ្រូពេទ្យ = Doctor', 'ប៉ូលីស = Police', 'កសិករ = Farmer', 'សិស្ស = Student', 'វិស្វករ = Engineer', 'អ្នកចំរៀង = Singer', 'អ្នកបើកបរ = Driver', 'ចុងភៅ = Chef', 'គិលានុបដ្ឋាយិកា = Nurse'] }
];

const verbCategories = [
  { name: 'កិរិយាសព្ទប្រចាំថ្ងៃ (Daily Verbs)', words: ['ញ៉ាំ = Eat', 'ផឹក = Drink', 'គេង = Sleep', 'ដើរ = Walk', 'រត់ = Run', 'អាន = Read', 'សរសេរ = Write', 'ស្តាប់ = Listen', 'និយាយ = Speak', 'មើល = Look/Watch'] },
  { name: 'សកម្មភាពទូទៅ (General Actions)', words: ['ធ្វើ = Do/Make', 'ទៅ = Go', 'មក = Come', 'ទិញ = Buy', 'លក់ = Sell', 'រៀន = Learn/Study', 'ធ្វើការ = Work', 'លេង = Play', 'ជួយ = Help', 'គិត = Think'] },
  { name: 'សកម្មភាពនៅផ្ទះ (Home Actions)', words: ['ចម្អិន = Cook', 'លាង = Wash', 'សម្អាត = Clean', 'បើក = Open', 'បិទ = Close', 'ងូតទឹក = Take a bath/shower', 'ភ្ញាក់ពីគេង = Wake up', 'ជូត = Wipe', 'បោស = Sweep', 'តុបតែង = Decorate'] },
  { name: 'ការប្រាស្រ័យទាក់ទង (Communication)', words: ['សួរ = Ask', 'ឆ្លើយ = Answer', 'ហៅ = Call', 'ប្រាប់ = Tell', 'យល់ព្រម = Agree', 'បដិសេធ = Refuse/Deny', 'សើច = Laugh', 'យំ = Cry', 'ញញឹម = Smile', 'ស្រែក = Shout'] }
];

const adjectiveCategories = [
  { name: 'គុណនាមពិពណ៌នា (Descriptive Adjectives)', words: ['ល្អ = Good', 'អាក្រក់ = Bad', 'ធំ = Big', 'តូច = Small', 'វែង = Long', 'ខ្លី = Short', 'ថ្មី = New', 'ចាស់ = Old', 'ខ្ពស់ = High/Tall', 'ទាប = Low/Short'] },
  { name: 'អារម្មណ៍ (Feelings)', words: ['សប្បាយចិត្ត = Happy', 'កើតទុក្ខ = Sad', 'ខឹង = Angry', 'ឃ្លាន = Hungry', 'ស្រេកទឹក = Thirsty', 'ហត់ = Tired', 'ភ័យ = Scared', 'រំភើប = Excited', 'អផ្សុក = Bored', 'ភ្ញាក់ផ្អើល = Surprised'] },
  { name: 'រូបរាងនិងពណ៌ (Appearance)', words: ['ស្អាត = Beautiful/Pretty', 'សង្ហា = Handsome', 'ធាត់ = Fat', 'ស្គម = Thin', 'ភ្លឺ = Bright', 'ងងឹត = Dark', 'ស្អាតបាត = Clean', 'កខ្វក់ = Dirty', 'ទន់ = Soft', 'រឹង = Hard'] },
  { name: 'លក្ខណៈបុគ្គលិកលក្ខណៈ (Personality)', words: ['ឆ្លាត = Smart/Clever', 'ល្ងង់ = Stupid', 'រួសរាយ = Friendly', 'ខ្មាស់អៀន = Shy', 'ក្លាហាន = Brave', 'កំសាក = Cowardly', 'ឧស្សាហ៍ = Hardworking', 'ខ្ជិល = Lazy', 'ចិត្តល្អ = Kind', 'កាច = Mean/Fierce'] }
];

const grammarRules = require('./grammar_data.js');

const conversations = [
  { title: "ការណែនាំខ្លួន (Introductions)", script: "A: Hello, my name is John. What is your name?\n(សួស្តី ខ្ញុំឈ្មោះចន។ តើអ្នកឈ្មោះអ្វី?)\nB: Hi John, I am Anna. Nice to meet you.\n(សួស្តីចន ខ្ញុំគឺអាន់ណា។ រីករាយដែលបានស្គាល់អ្នក។)" },
  { title: "ការសួរផ្លូវ (Asking for Directions)", script: "A: Excuse me, where is the hospital?\n(សុំទោស តើមន្ទីរពេទ្យនៅឯណា?)\nB: Go straight and turn left. It's next to the bank.\n(ទៅត្រង់ ហើយបត់ឆ្វេង។ វាជិតធនាគារ។)" },
  { title: "ការទិញទំនិញ (Shopping)", script: "A: How much is this shirt?\n(តើអាវនេះតម្លៃប៉ុន្មាន?)\nB: It is 10 dollars.\n(វាមានតម្លៃ ១០ ដុល្លារ។)\nA: I will take it.\n(ខ្ញុំនឹងយកវា។)" },
  { title: "ការបញ្ជាទិញអាហារ (Ordering Food)", script: "A: I would like to order a pizza, please.\n(ខ្ញុំចង់កុម្ម៉ង់ភីហ្សាមួយ។)\nB: What size do you want?\n(តើអ្នកចង់បានទំហំប៉ុនណា?)\nA: Medium, please.\n(ទំហំកណ្តាល។)" }
];

const categories = [
  { id: 'grammar', name: 'វេយ្យាករណ៍ (Grammar in use)' },
  { id: 'conversation', name: 'សន្ទនា (Conversation)' },
  { id: 'vocab', name: 'ពាក្យទូទៅ (Vocabulary)' },
  { id: 'verbs', name: 'កិរិយាសព្ទ (Verbs)' },
  { id: 'adjectives', name: 'គុណនាម (Adjectives)' },
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

    for (let l = 1; l <= categories.length; l++) {
      const cat = categories[l - 1]; 
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
      } else if (cat.id === 'verbs') {
        const vocab = verbCategories[(m * w + l) % verbCategories.length];
        content += `ប្រធានបទ៖ ${vocab.name}\n\n`;
        vocab.words.forEach((word, index) => {
          content += `${index + 1}. ${word}\n`;
        });
        content += `\n💡 អនុវត្ត៖ សូមសាកល្បងយកកិរិយាសព្ទមួយក្នុងចំណោមពាក្យខាងលើ មកបង្កើតជាល្បះ (Sentence) រួចផ្ញើមកកាន់ខ្ញុំ!`;
      } else if (cat.id === 'adjectives') {
        const vocab = adjectiveCategories[(m * w + l) % adjectiveCategories.length];
        content += `ប្រធានបទ៖ ${vocab.name}\n\n`;
        vocab.words.forEach((word, index) => {
          content += `${index + 1}. ${word}\n`;
        });
        content += `\n💡 អនុវត្ត៖ សូមសាកល្បងយកគុណនាមមួយក្នុងចំណោមពាក្យខាងលើ មកបង្កើតជាល្បះ (Sentence) រួចផ្ញើមកកាន់ខ្ញុំ!`;
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
