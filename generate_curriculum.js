const fs = require('fs');
const vocabCategories = require('./vocab_data.js');
const grammarRules = require('./grammar_data.js');
const verbCategories = require('./verbs_data.js');
const adjectiveCategories = require('./adjectives_data.js');
const { getConversationForWeek } = require('./conversations_data.js');
const { getSentencePatternForWeek } = require('./sentences_data.js');

const categories = [
  { id: 'grammar', name: 'វេយ្យាករណ៍ (Grammar in Use)' },
  { id: 'conversation', name: 'ការសន្ទនាជាក់ស្តែង (Situational Conversation)' },
  { id: 'vocab', name: 'វាក្យសព្ទប្រចាំសប្តាហ៍ (Vocabulary & Context)' },
  { id: 'verbs', name: 'កិរិយាសព្ទ និងកាល (Verbs & Tenses)' },
  { id: 'adjectives', name: 'គុណនាម និងការប្រៀបធៀប (Adjectives & Comparison)' },
  { id: 'sentences', name: 'ទម្រង់ល្បះ និងកន្សោមពាក្យ (Sentence Patterns & Expressions)' }
];

// Helper to create contextual bilingual example for vocabulary words
function createVocabExample(categoryName, engWord, khWord) {
  const cat = categoryName.toLowerCase();
  const w = engWord.trim();
  const k = khWord.trim();

  if (cat.includes('កាលបរិច្ឆេទ') || cat.includes('day') || cat.includes('month')) {
    return {
      en: `Our English speaking live class takes place every ${w}.`,
      kh: `ថ្នាក់ផ្សាយផ្ទាល់ហ្វឹកហាត់និយាយភាសាអង់គ្លេសរបស់យើងប្រព្រឹត្តទៅរៀងរាល់ ${k}។`
    };
  }
  if (cat.includes('ពណ៌') || cat.includes('colour')) {
    return {
      en: `She wore an elegant ${w.toLowerCase()} jacket to the business meeting.`,
      kh: `នាងបានពាក់អាវធំពណ៌ ${k} ដ៏ស្រស់សង្ហាមកកាន់ការប្រជុំធុរកិច្ច។`
    };
  }
  if (cat.includes('ស្វាគមន៍') || cat.includes('greeting')) {
    return {
      en: `"${w}!" the manager said with a polite and welcoming smile.`,
      kh: `«${k}!» អ្នកគ្រប់គ្រងបាននិយាយឡើងជាមួយនឹងស្នាមញញឹមយ៉ាងរាក់ទាក់ និងគួរសម។`
    };
  }
  if (cat.includes('បន្ទប់') || cat.includes('room')) {
    return {
      en: `The modern apartment has a bright and comfortable ${w.toLowerCase()}.`,
      kh: `អាផាតមិនដ៏ទំនើបនេះមាន${k}ដ៏ភ្លឺស្រឡះ និងប្រកបដោយផាសុកភាព។`
    };
  }
  if (cat.includes('រដូវ') || cat.includes('អាកាសធាតុ') || cat.includes('weather')) {
    return {
      en: `The weather in Cambodia during ${w.toLowerCase()} is pleasant and refreshing.`,
      kh: `អាកាសធាតុនៅក្នុងប្រទេសកម្ពុជាក្នុងអំឡុងពេល${k} គឺស្រួលខ្លួន និងស្រស់ស្រាយ។`
    };
  }
  if (cat.includes('មុខរបរ') || cat.includes('job') || cat.includes('occupation')) {
    return {
      en: `My brother works as a professional ${w.toLowerCase()} at an international firm.`,
      kh: `បងប្រុសរបស់ខ្ញុំធ្វើការជា${k}អាជីពម្នាក់នៅក្រុមហ៊ុនអន្តរជាតិមួយ។`
    };
  }
  if (cat.includes('គ្រួសារ') || cat.includes('family')) {
    return {
      en: `My ${w.toLowerCase()} always encourages me to study English diligently.`,
      kh: `${k}របស់ខ្ញុំតែងតែលើកទឹកចិត្តខ្ញុំឱ្យខិតខំរៀនភាសាអង់គ្លេសយ៉ាងយកចិត្តទុកដាក់ជានិច្ច។`
    };
  }
  if (cat.includes('រាងកាយ') || cat.includes('body')) {
    return {
      en: `Regular exercise and good sleep keep your ${w.toLowerCase()} healthy and strong.`,
      kh: `ការហាត់ប្រាណជាប្រចាំ និងការគេងលក់គ្រប់គ្រាន់ ជួយឱ្យ${k}របស់អ្នកមានសុខភាពល្អ និងរឹងមាំ។`
    };
  }
  if (cat.includes('បន្លែ') || cat.includes('ផ្លែឈើ') || cat.includes('អាហារ') || cat.includes('fruit') || cat.includes('food')) {
    return {
      en: `Eating fresh ${w.toLowerCase()} every day provides essential vitamins and minerals.`,
      kh: `ការញ៉ាំ${k}ស្រស់ៗជារៀងរាល់ថ្ងៃ ផ្តល់នូវវីតាមីន និងសារធាតុរ៉ែដ៏សំខាន់សម្រាប់រាងកាយ។`
    };
  }
  if (cat.includes('ភេសជ្ជៈ') || cat.includes('drink')) {
    return {
      en: `Drinking enough fresh ${w.toLowerCase()} helps keep your body hydrated throughout the day.`,
      kh: `ការពិសា${k}ឱ្យបានគ្រប់គ្រាន់ ជួយឱ្យរាងកាយរបស់អ្នកមានជាតិទឹកពេញមួយថ្ងៃ។`
    };
  }
  if (cat.includes('សម្លៀកបំពាក់') || cat.includes('cloth')) {
    return {
      en: `He bought a high-quality ${w.toLowerCase()} for his job interview next week.`,
      kh: `គាត់បានទិញ${k}គុណភាពខ្ពស់មួយ សម្រាប់ការសម្ភាសន៍ការងាររបស់គាត់នៅសប្តាហ៍ក្រោយ។`
    };
  }
  if (cat.includes('ទីកន្លែង') || cat.includes('place')) {
    return {
      en: `We are going to visit the ${w.toLowerCase()} together this weekend.`,
      kh: `ពួកយើងនឹងទៅទស្សនា${k}ជាមួយគ្នានៅចុងសប្តាហ៍នេះ។`
    };
  }
  if (cat.includes('យានជំនិះ') || cat.includes('vehicle')) {
    return {
      en: `Traveling by ${w.toLowerCase()} is fast, convenient, and safe.`,
      kh: `ការធ្វើដំណើរតាម${k} គឺលឿន មានភាពងាយស្រួល និងមានសុវត្ថិភាព។`
    };
  }
  if (cat.includes('លុយកាក់') || cat.includes('ធនាគារ') || cat.includes('money')) {
    return {
      en: `Learning how to manage your ${w.toLowerCase()} responsibly leads to financial freedom.`,
      kh: `ការរៀនគ្រប់គ្រង${k}របស់អ្នកប្រកបដោយការទទួលខុសត្រូវ នាំទៅរកសេរីភាពហិរញ្ញវត្ថុ។`
    };
  }
  if (cat.includes('ការអប់រំ') || cat.includes('education')) {
    return {
      en: `A dedicated ${w.toLowerCase()} plays a vital role in building student confidence.`,
      kh: `${k}ដែលយកចិត្តទុកដាក់ មានតួនាទីយ៉ាងសំខាន់ក្នុងការកសាងទំនុកចិត្តរបស់សិស្ស។`
    };
  }
  if (cat.includes('កីឡា') || cat.includes('sport')) {
    return {
      en: `Playing ${w.toLowerCase()} is a wonderful way to maintain fitness and relieve stress.`,
      kh: `ការលេង${k} គឺជាវិធីដ៏អស្ចារ្យមួយដើម្បីរក្សាសុខភាពរាងកាយ និងបំបាត់ភាពតានតឹង។`
    };
  }
  if (cat.includes('អារម្មណ៍') || cat.includes('feeling')) {
    return {
      en: `She felt very ${w.toLowerCase()} after receiving the positive exam results.`,
      kh: `នាងមានអារម្មណ៍${k}យ៉ាងខ្លាំង បន្ទាប់ពីបានទទួលលទ្ធផលប្រឡងដ៏ល្អប្រសើរ។`
    };
  }

  // Default natural pattern
  return {
    en: `You should practice using the word "${w}" in your daily English conversations.`,
    kh: `អ្នកគួរតែហ្វឹកហាត់ប្រើប្រាស់ពាក្យ «${w} (${k})» នៅក្នុងការសន្ទនាភាសាអង់គ្លេសប្រចាំថ្ងៃរបស់អ្នក។`
  };
}

const curriculum = { months: [] };

for (let m = 1; m <= 12; m++) {
  const month = {
    id: `m${m}`,
    title: `ខែទី ${m}`,
    weeks: []
  };

  for (let w = 1; w <= 4; w++) {
    const weekNum = (m - 1) * 4 + w; // 1 to 48
    const week = {
      id: `w${w}`,
      title: `សប្តាហ៍ទី ${w} (Week ${weekNum})`,
      lessons: []
    };

    for (let l = 1; l <= categories.length; l++) {
      const cat = categories[l - 1];
      let content = `📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ (Online English Academy)\n`;
      content += `📌 កម្រិត៖ ខែទី ${m}, សប្តាហ៍ទី ${w}, មេរៀនទី ${l} (សរុបសប្តាហ៍ទី ${weekNum}/៤៨)\n\n`;

      if (cat.id === 'grammar') {
        const grammarIndex = (weekNum - 1) % grammarRules.length;
        const grammar = grammarRules[grammarIndex];
        content += `🎯 ប្រធានបទ៖ ${grammar.topic}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `${grammar.kh}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `💡 គន្លឹះរៀនឱ្យឆាប់ចេះពីគ្រូ AI៖\n`;
        content += `សូមអានឧទាហរណ៍ឮៗពី ២ ទៅ ៣ ដង ដើម្បីទម្លាប់សាច់ដុំមាត់ និងស្តាប់ការបញ្ចេញសំឡេង (Pronunciation) តាមរយៈប៊ូតុងចាក់សំឡេងខាងលើ! រួចសាកល្បងសរសេរប្រយោគមួយដោយប្រើទម្រង់ខាងលើ ផ្ញើមកកាន់ខ្ញុំ (គ្រូ AI) ដើម្បីឱ្យខ្ញុំជួយកែតម្រូវ!`;

        week.lessons.push({
          id: `l${l}`,
          title: `មេរៀនទី ${l}៖ ${cat.name} - ${grammar.topic}`,
          content: content
        });
      } else if (cat.id === 'conversation') {
        const convo = getConversationForWeek(weekNum);
        content += `🗣️ ប្រធានបទ៖ ${convo.title}\n`;
        content += `📍 បរិបទនៃការសន្ទនា (Situation)៖ ${convo.situation}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `🔑 វាក្យសព្ទ និងឃ្លាសំខាន់ៗ (Key Vocabulary & Expressions)៖\n`;
        convo.vocab.forEach((v, idx) => {
          content += `${idx + 1}. 🇬🇧 ${v.en} = 🇰🇭 ${v.kh}\n`;
        });
        content += `\n════════════════════════════════════════════\n`;
        content += `💬 កិច្ចសន្ទនាគំរូពេញលេញ (Full Dialogue with Khmer Translation)៖\n\n`;
        convo.script.forEach(s => {
          content += `👤 ${s.speaker}:\n`;
          content += `   🇬🇧 "${s.en}"\n`;
          content += `   🇰🇭 (${s.kh})\n\n`;
        });
        content += `════════════════════════════════════════════\n`;
        content += `🎯 គន្លឹះនៃការនិយាយ និងបញ្ចេញសំឡេង (Speaking & Pronunciation Tip)៖\n`;
        content += `${convo.speakingTip}\n\n`;
        content += `✍️ លំហាត់អនុវត្ត៖\n`;
        content += `សូមចុចប៊ូតុងចាក់សំឡេង (Audio) ខាងលើដើម្បីស្តាប់ការសន្ទនា ឬផ្ញើសារជាសំឡេងមកកាន់គ្រូ AI ក្នុងប្រអប់ឆាតខាងស្តាំដៃ ដើម្បីសាកល្បងសន្ទនាជាក់ស្តែង!`;

        week.lessons.push({
          id: `l${l}`,
          title: `មេរៀនទី ${l}៖ ${cat.name} - ${convo.title}`,
          content: content
        });
      } else if (cat.id === 'vocab') {
        const vocabIndex = (weekNum - 1) % vocabCategories.length;
        const vocab = vocabCategories[vocabIndex];
        content += `📖 ប្រធានបទ៖ ${vocab.name}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `📝 បញ្ជីវាក្យសព្ទសំខាន់ៗ & ឧទាហរណ៍ជាក់ស្តែង (Vocabulary with Examples & Translation)៖\n\n`;

        vocab.words.forEach((wordPair, index) => {
          content += `${index + 1}. ${wordPair}\n`;
          const parts = wordPair.split(' = ');
          if (parts.length === 2) {
            const ex = createVocabExample(vocab.name, parts[0], parts[1]);
            content += `   ↳ ឧទាហរណ៍៖ ${ex.en}\n`;
            content += `   ↳ បកប្រែ៖ ${ex.kh}\n\n`;
          } else {
            content += `\n`;
          }
        });

        content += `════════════════════════════════════════════\n`;
        content += `💡 វិធីសាស្ត្រចងចាំវាក្យសព្ទបានយូរ (Pro Memory Tip)៖\n`;
        content += `កុំទន្ទេញពាក្យទោលៗដាច់ដោយឡែក! ត្រូវរៀនពាក្យនីមួយៗភ្ជាប់ជាមួយប្រយោគ និងបរិបទជាក់ស្តែងជានិច្ច។\n\n`;
        content += `✍️ លំហាត់អនុវត្ត៖\n`;
        content += `ចូរជ្រើសរើសពាក្យចំនួន ២ ក្នុងចំណោមពាក្យខាងលើ យកមកបង្កើតជាប្រយោគផ្ទាល់ខ្លួនរបស់អ្នក រួចផ្ញើមកកាន់គ្រូ AI ដើម្បីពិនិត្យ!`;

        week.lessons.push({
          id: `l${l}`,
          title: `មេរៀនទី ${l}៖ ${cat.name} - ${vocab.name}`,
          content: content
        });
      } else if (cat.id === 'verbs') {
        const verbIndex = (weekNum - 1) % verbCategories.length;
        const verbGroup = verbCategories[verbIndex];
        content += `🔥 ប្រធានបទ៖ ${verbGroup.name}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `📝 បញ្ជីកិរិយាសព្ទគោល (Key Verbs List)៖\n`;
        verbGroup.words.forEach((w, index) => {
          content += `${index + 1}. ${w}\n`;
        });

        content += `\n════════════════════════════════════════════\n`;
        content += `📖 ការប្រើប្រាស់កាល និងឧទាហរណ៍ជាក់ស្តែង (Verb Forms & Practical Examples)៖\n\n`;

        if (verbGroup.details && verbGroup.details.length > 0) {
          verbGroup.details.forEach(d => {
            content += `🔹 【${d.v1}】 (V1: ${d.v1} | V2: ${d.v2} | V3: ${d.v3}) = ${d.kh}\n`;
            d.examples.forEach(ex => {
              content += `   • 🇬🇧 ${ex.en}\n`;
              content += `   • 🇰🇭 (${ex.kh})\n`;
            });
            content += `\n`;
          });
        }

        content += `════════════════════════════════════════════\n`;
        content += `✍️ លំហាត់អនុវត្ត (Practice Exercise)៖\n`;
        content += `ចូរសាកល្បងយកកិរិយាសព្ទខាងលើមកបំប្លែងជាអតីតកាល (V2) រួចបង្កើតជាប្រយោគមួយផ្ញើមកកាន់គ្រូ AI!`;

        week.lessons.push({
          id: `l${l}`,
          title: `មេរៀនទី ${l}៖ ${cat.name} - ${verbGroup.name}`,
          content: content
        });
      } else if (cat.id === 'adjectives') {
        const adjIndex = (weekNum - 1) % adjectiveCategories.length;
        const adjGroup = adjectiveCategories[adjIndex];
        content += `✨ ប្រធានបទ៖ ${adjGroup.name}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `📝 បញ្ជីគុណនាមសំខាន់ៗ (Key Adjectives List)៖\n`;
        adjGroup.words.forEach((w, index) => {
          content += `${index + 1}. ${w}\n`;
        });

        content += `\n════════════════════════════════════════════\n`;
        content += `📊 កម្រិតប្រៀបធៀប និងឧទាហរណ៍ជាក់ស្តែង (Comparison Degrees & Examples)៖\n\n`;

        if (adjGroup.details && adjGroup.details.length > 0) {
          adjGroup.details.forEach(d => {
            content += `🔹 【${d.adj}】 = ${d.kh}\n`;
            content += `   • កម្រិតប្រៀបធៀប (Comparative): ${d.comp} than\n`;
            content += `   • កម្រិតបំផុត (Superlative): the ${d.sup}\n`;
            if (d.opp) content += `   • ផ្ទុយពី (Opposite): ${d.opp}\n`;
            d.examples.forEach(ex => {
              content += `   ↳ 🇬🇧 ${ex.en}\n`;
              content += `   ↳ 🇰🇭 (${ex.kh})\n`;
            });
            content += `\n`;
          });
        }

        content += `════════════════════════════════════════════\n`;
        content += `✍️ លំហាត់អនុវត្ត (Practice Exercise)៖\n`;
        content += `ចូរជ្រើសរើសគុណនាមមួយខាងលើ មកបង្កើតជាប្រយោគប្រៀបធៀប (Comparative) ដោយប្រើ "more ... than" ឬ "-er than"!`;

        week.lessons.push({
          id: `l${l}`,
          title: `មេរៀនទី ${l}៖ ${cat.name} - ${adjGroup.name}`,
          content: content
        });
      } else if (cat.id === 'sentences') {
        const sentGroup = getSentencePatternForWeek(weekNum);
        content += `🎯 ប្រធានបទ៖ ${sentGroup.title}\n\n`;
        content += `════════════════════════════════════════════\n`;
        content += `📐 រូបមន្តទម្រង់ល្បះ និងការប្រើប្រាស់ (Sentence Formulas & Usage)៖\n\n`;

        sentGroup.patterns.forEach((p, idx) => {
          content += `🔹 រូបមន្តទី ${idx + 1}៖ 【${p.formula}】\n`;
          content += `   ↳ អត្ថន័យ៖ ${p.meaning}\n`;
          content += `   💡 ឧទាហរណ៍ជាក់ស្តែង៖\n`;
          p.examples.forEach(ex => {
            content += `   • 🇬🇧 ${ex.en}\n`;
            content += `   • 🇰🇭 (${ex.kh})\n`;
          });
          content += `\n`;
        });

        content += `════════════════════════════════════════════\n`;
        content += `✍️ លំហាត់អនុវត្ត (Practice Exercise)៖\n`;
        content += `${sentGroup.practice}\n\n`;
        content += `💡 សូមផ្ញើចម្លើយរបស់អ្នកមកកាន់គ្រូ AI ក្នុងប្រអប់សារ ដើម្បីឱ្យគ្រូជួយកែសម្រួលវេយ្យាករណ៍ និងពន្យល់បន្ថែម!`;

        week.lessons.push({
          id: `l${l}`,
          title: `មេរៀនទី ${l}៖ ${cat.name} - ${sentGroup.title}`,
          content: content
        });
      }
    }
    month.weeks.push(week);
  }
  curriculum.months.push(month);
}

fs.writeFileSync('curriculum.json', JSON.stringify(curriculum, null, 2), 'utf8');
console.log('✅ Master Curriculum successfully generated! 12 Months, 48 Weeks, 288 Professional Lessons with full Khmer translations and rich examples.');
