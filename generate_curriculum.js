const fs = require('fs');

const categories = [
  { id: 'grammar', name: 'វេយ្យាករណ៍ (Grammar in use)' },
  { id: 'conversation', name: 'សន្ទនា (Conversation)' },
  { id: 'vocab', name: 'ពាក្យ (Vocabulary - ឈ្មោះវត្ថុ ឧបករណ៍ប្រើប្រាស់)' },
  { id: 'sentences', name: 'ល្បះ (Sentences)' },
  { id: 'nouns', name: 'នាម (Nouns)' },
  { id: 'verbs', name: 'ប្រភេទកិរិយា (Verbs)' },
  { id: 'adjectives', name: 'គុណនាម (Adjectives)' }
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

    // Generate 4-5 lessons per week, cycling through categories
    for (let l = 1; l <= 5; l++) {
      const cat = categories[(w * 5 + l) % categories.length];
      
      let content = `📚 មេរៀន៖ ${cat.name} (ខែទី ${m}, សប្តាហ៍ទី ${w}, មេរៀនទី ${l})\n\n`;
      if (m === 1 && w === 1) {
        if (cat.id === 'grammar') {
          content += `ប្រធានបទ៖ ការប្រើប្រាស់ 'To Be' (am, is, are)\n\n🇰🇭 ខ្ញុំគឺសិស្ស = 🇬🇧 I am a student.\n🇰🇭 គាត់គឺគ្រូ = 🇬🇧 He is a teacher.\n\n💡 វេយ្យាករណ៍៖ Subject + am/is/are + Noun.`;
        } else if (cat.id === 'vocab') {
          content += `ប្រធានបទ៖ ឧបករណ៍ប្រើប្រាស់ក្នុងផ្ទះ (Household Items)\n\n១. តុ = Table\n២. កៅអី = Chair\n៣. ទូរស័ព្ទ = Phone\n៤. កង្ហារ = Fan\n៥. ទ្វារ = Door\n\n(ផ្ញើសារមកកាន់ខ្ញុំដើម្បីឱ្យខ្ញុំផ្ញើរូបភាព ឬឧទាហរណ៍បន្ថែម!)`;
        } else if (cat.id === 'conversation') {
          content += `ប្រធានបទ៖ ការស្វាគមន៍គ្នា (Greetings)\n\nA: Hello, how are you? (សួស្តី តើអ្នកសុខសប្បាយទេ?)\nB: I am fine, thank you. And you? (ខ្ញុំសុខសប្បាយទេ អរគុណ ចុះអ្នកវិញ?)\nA: I am great! (ខ្ញុំសុខសប្បាយធម្មតាទេ!)`;
        } else {
          content += `ទិន្នន័យសម្រាប់មេរៀននេះកំពុងស្ថិតក្នុងការរៀបចំ។ សូមឆាតសួរគ្រូ AI ផ្ទាល់តែម្ដង!`;
        }
      } else {
        content += `មេរៀនលម្អិតនឹងត្រូវបានអាប់ដេតឆាប់ៗ។ អ្នកអាចវាយសួរខ្ញុំផ្ទាល់អំពី "${cat.name}" បាន!`;
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
console.log("Curriculum generated successfully!");
