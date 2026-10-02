/**
 * TRANSLATION ENGINE - ប្រព័ន្ធបកប្រែ English ↔ ខ្មែរ
 * ស្តង់ដាជាតិ - ក្រសួងអប់រំ យុវជន និងកីឡា កម្ពុជា
 * 100% Offline - Zero AI - Zero Internet Required
 * Version: 2.0 | StudyAI Bot
 */
'use strict';

// ══════════════════════════════════════════
// SECTION 1: ENGLISH → KHMER DICTIONARY
// 3000+ entries - National Standard MoE Cambodia
// ══════════════════════════════════════════
const EN_KH_DICT = {
  // GREETINGS & SOCIAL
  'hello': 'សួស្តី', 'hi': 'សួស្តី', 'hey': 'ហេ / សួស្តី',
  'good morning': 'អរុណសួស្តី', 'good afternoon': 'ទិវាសួស្តី',
  'good evening': 'សាយណ្ហសួស្តី', 'good night': 'រាត្រីសួស្តី',
  'goodbye': 'លាហើយ', 'bye': 'លា', 'see you': 'ជួបគ្នា',
  'see you later': 'ជួបគ្នានៅពេលក្រោយ',
  'how are you': 'អ្នកសុខសប្បាយទេ?',
  'i am fine': 'ខ្ញុំសុខសប្បាយ',
  'i am fine thank you': 'ខ្ញុំសុខសប្បាយ អរគុណ',
  'thank you': 'អរគុណ', 'thanks': 'អរគុណ',
  'thank you very much': 'អរគុណច្រើន',
  'you are welcome': 'មិនអីទេ', "you're welcome": 'មិនអីទេ',
  'please': 'សូម', 'sorry': 'សុំទោស',
  'excuse me': 'សូមអភ័យទោស',
  'congratulations': 'អបអរសាទរ',
  'happy birthday': 'រីករាយថ្ងៃខួបកំណើត',
  'good luck': 'សំណាងល្អ',
  'welcome': 'ស្វាគមន៍',
  'nice to meet you': 'រីករាយដែលបានស្គាល់អ្នក',
  'what is your name': 'តើអ្នកឈ្មោះអ្វី?',
  'my name is': 'ខ្ញុំឈ្មោះ',
  'where are you from': 'តើអ្នកមកពីណា?',
  'i am from cambodia': 'ខ្ញុំមកពីប្រទេសកម្ពុជា',
  // PRONOUNS
  'i': 'ខ្ញុំ', 'me': 'ខ្ញុំ', 'my': 'របស់ខ្ញុំ', 'mine': 'របស់ខ្ញុំ',
  'myself': 'ខ្លួនខ្ញុំ', 'you': 'អ្នក', 'your': 'របស់អ្នក',
  'yours': 'របស់អ្នក', 'yourself': 'ខ្លួនអ្នក',
  'we': 'ពួកយើង', 'us': 'ពួកយើង', 'our': 'របស់យើង',
  'ourselves': 'ខ្លួនយើង', 'they': 'ពួកគេ', 'them': 'ពួកគេ',
  'their': 'របស់ពួកគេ', 'themselves': 'ខ្លួនពួកគេ',
  'he': 'គាត់', 'him': 'គាត់', 'his': 'របស់គាត់', 'himself': 'ខ្លួនគាត់',
  'she': 'នាង', 'her': 'នាង', 'hers': 'របស់នាង', 'herself': 'ខ្លួននាង',
  'it': 'វា', 'its': 'របស់វា', 'itself': 'ខ្លួនវា',
  // TO BE
  'am': 'ជា', 'is': 'ជា', 'are': 'ជា', 'was': 'ជា (អតីត)',
  'were': 'ជា (អតីត)', 'been': 'ជា', 'being': 'ការជា',
  // COMMON VERBS
  'go': 'ទៅ', 'goes': 'ទៅ', 'went': 'បានទៅ', 'gone': 'ទៅហើយ',
  'come': 'មក', 'comes': 'មក', 'came': 'បានមក',
  'come back': 'ត្រឡប់មក',
  'have': 'មាន', 'has': 'មាន', 'had': 'មាន (អតីត)',
  'do': 'ធ្វើ', 'does': 'ធ្វើ', 'did': 'បានធ្វើ', 'done': 'ធ្វើហើយ',
  'say': 'និយាយ', 'says': 'និយាយ', 'said': 'បាននិយាយ',
  'get': 'ទទួល', 'gets': 'ទទួល', 'got': 'បានទទួល',
  'make': 'ធ្វើ', 'makes': 'ធ្វើ', 'made': 'បានធ្វើ',
  'know': 'ដឹង', 'knows': 'ដឹង', 'knew': 'បានដឹង', 'known': 'ដឹងហើយ',
  'think': 'គិត', 'thinks': 'គិត', 'thought': 'បានគិត',
  'see': 'ឃើញ', 'sees': 'ឃើញ', 'saw': 'បានឃើញ', 'seen': 'ឃើញហើយ',
  'look': 'មើល', 'looks': 'មើល', 'looked': 'បានមើល',
  'want': 'ចង់', 'wants': 'ចង់', 'wanted': 'ចង់ (អតីត)',
  'give': 'ឱ្យ', 'gives': 'ឱ្យ', 'gave': 'បានឱ្យ', 'given': 'ឱ្យហើយ',
  'use': 'ប្រើ', 'uses': 'ប្រើ', 'used': 'បានប្រើ',
  'find': 'រក', 'finds': 'រក', 'found': 'បានរក',
  'tell': 'ប្រាប់', 'tells': 'ប្រាប់', 'told': 'បានប្រាប់',
  'ask': 'សួរ', 'asks': 'សួរ', 'asked': 'បានសួរ',
  'work': 'ធ្វើការ', 'works': 'ធ្វើការ', 'worked': 'បានធ្វើការ',
  'seem': 'ហាក់ដូចជា', 'feel': 'មានអារម្មណ៍',
  'leave': 'ចាកចេញ', 'left': 'បានចាកចេញ',
  'call': 'ហៅ', 'called': 'បានហៅ',
  'keep': 'រក្សា', 'kept': 'បានរក្សា',
  'let': 'អនុញ្ញាត',
  'begin': 'ចាប់ផ្ដើម', 'began': 'បានចាប់ផ្ដើម', 'begun': 'ចាប់ផ្ដើមហើយ',
  'show': 'បង្ហាញ', 'showed': 'បានបង្ហាញ', 'shown': 'បង្ហាញហើយ',
  'hear': 'ឮ', 'heard': 'បានឮ',
  'play': 'លេង', 'run': 'រត់', 'ran': 'បានរត់',
  'move': 'ផ្លាស់ប្ដូរ', 'live': 'រស់នៅ', 'believe': 'ជឿ',
  'hold': 'កាន់', 'held': 'បានកាន់',
  'bring': 'នាំ', 'brought': 'បាននាំ',
  'happen': 'កើតឡើង',
  'write': 'សរសេរ', 'wrote': 'បានសរសេរ', 'written': 'សរសេររួច',
  'provide': 'ផ្ដល់',
  'stand': 'ឈរ', 'stood': 'បានឈរ',
  'lose': 'ចាញ់', 'lost': 'បានចាញ់',
  'pay': 'បង់', 'paid': 'បានបង់',
  'meet': 'ជួប', 'met': 'បានជួប',
  'include': 'រួមមាន', 'continue': 'បន្ត', 'set': 'កំណត់',
  'learn': 'រៀន', 'learned': 'បានរៀន', 'learnt': 'បានរៀន',
  'change': 'ផ្លាស់ប្ដូរ', 'lead': 'ដឹកនាំ', 'led': 'បានដឹកនាំ',
  'understand': 'យល់', 'understood': 'បានយល់',
  'follow': 'ដើរតាម', 'stop': 'ឈប់', 'stopped': 'បានឈប់',
  'create': 'បង្កើត',
  'speak': 'និយាយ', 'spoke': 'បាននិយាយ', 'spoken': 'និយាយហើយ',
  'read': 'អាន', 'reads': 'អាន',
  'eat': 'ញ៉ាំ', 'ate': 'បានញ៉ាំ', 'eaten': 'ញ៉ាំហើយ',
  'sleep': 'គេង', 'slept': 'បានគេង',
  'drink': 'ផឹក', 'drank': 'បានផឹក', 'drunk': 'ផឹករួច',
  'sit': 'អង្គុយ', 'sat': 'បានអង្គុយ',
  'stand up': 'ក្រោក', 'walk': 'ដើរ', 'walked': 'បានដើរ',
  'buy': 'ទិញ', 'bought': 'បានទិញ',
  'sell': 'លក់', 'sold': 'បានលក់',
  'send': 'ផ្ញើ', 'sent': 'បានផ្ញើ',
  'receive': 'ទទួល', 'received': 'បានទទួល',
  'open': 'បើក', 'close': 'បិទ', 'closed': 'បានបិទ',
  'help': 'ជួយ', 'helped': 'បានជួយ',
  'start': 'ចាប់ផ្ដើម', 'finish': 'បញ្ចប់', 'finished': 'បានបញ្ចប់',
  'try': 'ព្យាយាម', 'tried': 'បានព្យាយាម',
  'allow': 'អនុញ្ញាត',
  'study': 'រៀន', 'studied': 'បានរៀន',
  'teach': 'បង្រៀន', 'taught': 'បានបង្រៀន',
  'pass': 'ជាប់', 'passed': 'បានជាប់',
  'fail': 'ធ្លាក់', 'failed': 'បានធ្លាក់',
  'practice': 'ហ្វឹកហាត់', 'practiced': 'បានហ្វឹកហ្វឺន',
  'improve': 'កែលម្អ', 'improved': 'បានកែលម្អ',
  'remember': 'ចងចាំ', 'remembered': 'បានចងចាំ',
  'forget': 'ភ្លេច', 'forgot': 'បានភ្លេច', 'forgotten': 'ភ្លេចហើយ',
  'explain': 'ពន្យល់', 'explained': 'បានពន្យល់',
  'answer': 'ឆ្លើយ', 'answered': 'បានឆ្លើយ',
  'repeat': 'ធ្វើម្ដងទៀត',
  'take': 'យក', 'took': 'បានយក', 'taken': 'យករួច',
  'put': 'ដាក់',
  'build': 'សាង', 'built': 'បានសាង',
  'check': 'ពិនិត្យ', 'checked': 'បានពិនិត្យ',
  'compare': 'ប្រៀបធៀប', 'connect': 'ភ្ជាប់',
  'complete': 'បញ្ចប់', 'save': 'ទុក', 'share': 'ចែករំលែក',
  'describe': 'ពណ៌នា', 'record': 'ថត', 'review': 'ពិនិត្យ',
  // MODAL VERBS
  'can': 'អាច', 'could': 'អាច (អតីត)',
  "can't": 'មិនអាច', 'cannot': 'មិនអាច', "couldn't": 'មិនអាច',
  'will': 'នឹង', 'would': 'នឹង', "won't": 'នឹងមិន',
  'shall': 'នឹង (ផ្លូវការ)', 'should': 'គួរ', "shouldn't": 'មិនគួរ',
  'must': 'ត្រូវតែ', "mustn't": 'ហាម',
  'may': 'ប្រហែលជា', 'might': 'ប្រហែលជា',
  'ought to': 'គួរតែ', 'need': 'ត្រូវការ',
  // NOUNS - PEOPLE
  'person': 'មនុស្ស', 'people': 'ប្រជាជន',
  'man': 'បុរស', 'men': 'បុរសៗ',
  'woman': 'ស្ត្រី', 'women': 'ស្ត្រីៗ',
  'boy': 'ក្មេងប្រុស', 'girl': 'ក្មេងស្រី',
  'child': 'ក្មេង', 'children': 'ក្មេងៗ',
  'baby': 'ទារក', 'adult': 'មនុស្សធំ', 'teenager': 'យុវវ័យ',
  'student': 'សិស្ស', 'teacher': 'គ្រូ',
  'professor': 'សាស្ត្រាចារ្យ', 'doctor': 'គ្រូពេទ្យ',
  'nurse': 'គិលានុបដ្ឋាក', 'engineer': 'វិស្វករ',
  'farmer': 'កសិករ', 'soldier': 'ទាហាន', 'police': 'ប៉ូលិស',
  'lawyer': 'មេធាវី', 'judge': 'ចៅក្រម', 'accountant': 'គណនេយ្យករ',
  'manager': 'អ្នកគ្រប់គ្រង', 'director': 'នាយក',
  'president': 'ប្រធានាធិបតី', 'minister': 'រដ្ឋមន្ត្រី',
  'king': 'ស្ដេច', 'queen': 'ព្រះនាង',
  'friend': 'មិត្ត', 'classmate': 'មិត្តរួមថ្នាក់',
  'colleague': 'មិត្តរួមការងារ', 'partner': 'ដៃគូ',
  'grandfather': 'ជីតា', 'grandmother': 'ជីដូន',
  'father': 'ឪពុក', 'mother': 'ម្ដាយ',
  'brother': 'បងប្រុស', 'sister': 'បងស្រី',
  'son': 'កូនប្រុស', 'daughter': 'កូនស្រី',
  'husband': 'ប្ដី', 'wife': 'ប្រពន្ធ',
  'uncle': 'ពូ', 'aunt': 'មីង',
  'cousin': 'ញាតិ', 'nephew': 'ក្មួយប្រុស', 'niece': 'ក្មួយស្រី',
  // NOUNS - PLACES
  'school': 'សាលារៀន', 'university': 'សាកលវិទ្យាល័យ',
  'college': 'មហាវិទ្យាល័យ', 'classroom': 'ថ្នាក់រៀន',
  'library': 'បណ្ណាល័យ', 'hospital': 'មន្ទីរពេទ្យ',
  'clinic': 'គ្លីនិក', 'market': 'ផ្សារ', 'supermarket': 'ផ្សារទំនើប',
  'restaurant': 'ភោជនីយដ្ឋាន', 'hotel': 'សណ្ឋាគារ',
  'bank': 'ធនាគារ', 'airport': 'អាកាសយានដ្ឋាន',
  'station': 'ស្ថានីយ៍', 'office': 'ការិយាល័យ',
  'factory': 'រោងចក្រ', 'farm': 'ចំការ', 'zoo': 'សួនសត្វ',
  'park': 'សួនច្បារ', 'temple': 'ព្រះវិហារ',
  'pagoda': 'វត្ត', 'church': 'ព្រះវិហារ', 'mosque': 'សុរ៉ៅ',
  'city': 'ទីក្រុង', 'town': 'ទីប្រជុំជន', 'village': 'ភូមិ',
  'country': 'ប្រទេស', 'capital': 'រាជធានី',
  'province': 'ខេត្ត', 'district': 'ស្រុក', 'commune': 'ឃុំ',
  'house': 'ផ្ទះ', 'home': 'ផ្ទះ', 'room': 'បន្ទប់',
  'kitchen': 'ផ្ទះបាយ', 'bedroom': 'បន្ទប់គេង',
  'bathroom': 'បន្ទប់ទឹក', 'living room': 'បន្ទប់ទទួលភ្ញៀវ',
  'garden': 'សួន', 'street': 'ផ្លូវ', 'road': 'ផ្លូវ',
  'bridge': 'ស្ពាន', 'river': 'ទន្លេ', 'lake': 'បឹង',
  'sea': 'សមុទ្រ', 'ocean': 'មហាសមុទ្រ', 'mountain': 'ភ្នំ',
  'beach': 'ឆ្នេរ', 'forest': 'ព្រៃ', 'island': 'កោះ',
  'cambodia': 'ប្រទេសកម្ពុជា', 'phnom penh': 'រាជធានីភ្នំពេញ',
  'siem reap': 'ខេត្តសៀមរាប', 'angkor wat': 'ប្រាសាទអង្គរវត្ត',
  // NOUNS - THINGS
  'book': 'សៀវភៅ', 'pen': 'ប៊ិច', 'pencil': 'ខ្មៅដៃ',
  'paper': 'ក្រដាស', 'desk': 'តុ', 'chair': 'កៅអី',
  'bag': 'កាបូប', 'table': 'តុ', 'phone': 'ទូរស័ព្ទ',
  'mobile phone': 'ទូរស័ព្ទដៃ', 'smartphone': 'ទូរស័ព្ទឆ្លាតវៃ',
  'computer': 'កុំព្យូទ័រ', 'laptop': 'កុំព្យូទ័រយួរដៃ',
  'tablet': 'ថេបលែត', 'television': 'ទូរទស្សន៍', 'tv': 'ទូរទស្សន៍',
  'radio': 'វិទ្យុ', 'camera': 'កាមេរ៉ា',
  'watch': 'នាឡិកាដៃ', 'clock': 'នាឡិកា',
  'car': 'ឡាន', 'bus': 'ឡានក្រុង', 'motorcycle': 'ម៉ូតូ',
  'bicycle': 'កង់', 'plane': 'យន្ដហោះ', 'boat': 'ទូក',
  'ship': 'កប៉ាល់', 'train': 'រថភ្លើង', 'truck': 'ឡានដឹកទំនិញ',
  'money': 'លុយ', 'price': 'តម្លៃ',
  'food': 'អាហារ', 'water': 'ទឹក', 'rice': 'បាយ',
  'bread': 'នំប៉័ង', 'milk': 'ទឹកដោះគោ', 'coffee': 'កាហ្វេ',
  'tea': 'ទឹកតែ', 'fruit': 'ផ្លែឈើ', 'vegetable': 'បន្លែ',
  'meat': 'សាច់', 'fish': 'ត្រី', 'egg': 'ស៊ុត',
  'sugar': 'ស្ករ', 'salt': 'អំបិល', 'medicine': 'ថ្នាំ',
  'clothes': 'ខោអាវ', 'shirt': 'អាវ', 'pants': 'ខោ',
  'shoes': 'ស្បែកជើង', 'hat': 'មួក', 'key': 'សោ',
  'door': 'ទ្វារ', 'window': 'បង្អួច', 'floor': 'ជាន់',
  'wall': 'ជញ្ជាំង', 'roof': 'ដំបូល', 'letter': 'លិខិត',
  'word': 'ពាក្យ', 'sentence': 'ប្រយោគ', 'language': 'ភាសា',
  'english': 'ភាសាអង់គ្លេស', 'khmer': 'ភាសាខ្មែរ',
  'lesson': 'មេរៀន', 'homework': 'កិច្ចការផ្ទះ', 'exam': 'ការប្រឡង',
  'test': 'តេស្ត', 'question': 'សំណួរ',
  'exercise': 'លំហាត់', 'certificate': 'វិញ្ញាបនបត្រ',
  'prize': 'រង្វាន់', 'grade': 'ពិន្ទុ', 'score': 'ពិន្ទុ',
  // GRAMMAR TERMS
  'noun': 'នាម', 'verb': 'កិរិយាសព្ទ', 'adjective': 'គុណនាម',
  'adverb': 'គុណកិរិយា', 'pronoun': 'សព្វនាម',
  'preposition': 'ធ្នាក់', 'conjunction': 'ពាក្យតំណភ្ជាប់',
  'article': 'ធ្នាក់ (a/an/the)', 'paragraph': 'កថាខណ្ឌ',
  'subject': 'ប្រធានបទ', 'object': 'កម្មបទ', 'predicate': 'វិធាន',
  'tense': 'កាល', 'grammar': 'វេយ្យាករណ៍',
  'vocabulary': 'វាក្យសព្ទ', 'pronunciation': 'ការបញ្ចេញសំឡេង',
  'spelling': 'ការស្ទង់អក្សរ', 'meaning': 'អត្ថន័យ',
  'definition': 'និយមន័យ', 'translation': 'ការបកប្រែ',
  'reading': 'ការអាន', 'writing': 'ការសរសេរ',
  'listening': 'ការស្ដាប់', 'speaking': 'ការនិយាយ',
  // TENSES
  'present simple': 'បច្ចុប្បន្នកាលធម្មតា',
  'present simple tense': 'បច្ចុប្បន្នកាលធម្មតា',
  'present continuous': 'បច្ចុប្បន្នកាលកំពុងបន្ត',
  'present continuous tense': 'បច្ចុប្បន្នកាលកំពុងបន្ត',
  'present perfect': 'បច្ចុប្បន្នកាលអតីត',
  'present perfect tense': 'បច្ចុប្បន្នកាលអតីត',
  'present perfect continuous': 'បច្ចុប្បន្នកាលអតីតកំពុង',
  'past simple': 'អតីតកាលធម្មតា',
  'past simple tense': 'អតីតកាលធម្មតា',
  'past continuous': 'អតីតកាលកំពុង',
  'past continuous tense': 'អតីតកាលកំពុង',
  'past perfect': 'អតីតកាលអតីត',
  'past perfect tense': 'អតីតកាលអតីត',
  'future simple': 'អនាគតកាល',
  'future simple tense': 'អនាគតកាល',
  'future continuous': 'អនាគតកាលកំពុង',
  'future perfect': 'អនាគតកាលអតីត',
  // CONDITIONAL
  'conditional': 'ប្រយោគលក្ខខណ្ឌ',
  'zero conditional': 'លក្ខខណ្ឌទីសូន្យ',
  'first conditional': 'លក្ខខណ្ឌទីមួយ',
  'second conditional': 'លក្ខខណ្ឌទីពីរ',
  'third conditional': 'លក្ខខណ្ឌទីបី',
  'passive voice': 'អកម្មប្រយោគ', 'active voice': 'កម្មប្រយោគ',
  'direct speech': 'ល្បះផ្ទាល់', 'indirect speech': 'ល្បះប្រយោល',
  'reported speech': 'ការរាយការណ៍',
  'relative clause': 'ឃ្លាទំនាក់ទំនង',
  'modal verb': 'កិរិយាសព្ទជំនួយ',
  'gerund': 'ក្រៀម (V-ing ជានាម)',
  'infinitive': 'ក្រៀមដើម (to + V)',
  // ADJECTIVES
  'big': 'ធំ', 'large': 'ធំ', 'huge': 'ធំ​ណាស់',
  'small': 'តូច', 'tiny': 'តូចណាស់', 'little': 'តូច',
  'long': 'វែង', 'short': 'ខ្លី', 'tall': 'ខ្ពស់',
  'high': 'ខ្ពស់', 'low': 'ទាប', 'deep': 'ជ្រៅ',
  'wide': 'ទូលាយ', 'narrow': 'ចង្អៀត', 'thick': 'ក្រាស់', 'thin': 'ស្ដើង',
  'heavy': 'ធ្ងន់', 'light': 'ស្រាល', 'hard': 'រឹង',
  'soft': 'ទន់', 'rough': 'ខក', 'smooth': 'រលោង',
  'hot': 'ក្ដៅ', 'cold': 'ត្រជាក់', 'warm': 'កក់ក្ដៅ', 'cool': 'ត្រជាក់ខ្លះ',
  'fast': 'លឿន', 'quick': 'លឿន', 'slow': 'យឺត',
  'good': 'ល្អ', 'great': 'ល្អ', 'excellent': 'ល្អប្រសើរ',
  'bad': 'អាក្រក់', 'terrible': 'អាក្រក់ណាស់',
  'new': 'ថ្មី', 'old': 'ចាស់', 'young': 'ក្មេង',
  'beautiful': 'ស្រស់ស្អាត', 'pretty': 'ស្អាត', 'handsome': 'ស្អាត',
  'ugly': 'អាក្រក់មើល', 'clean': 'ស្អាត', 'dirty': 'កខ្វក់',
  'rich': 'មាន', 'poor': 'ក្រ', 'expensive': 'ថ្លៃ', 'cheap': 'ថោក',
  'easy': 'ងាយ', 'difficult': 'ពិបាក', 'simple': 'សាមញ្ញ',
  'complex': 'ស្មុគស្មាញ', 'important': 'សំខាន់', 'necessary': 'ចាំបាច់',
  'interesting': 'គួរឱ្យចាប់អារម្មណ៍', 'boring': 'ធុញ', 'funny': 'គួរឱ្យសើច',
  'happy': 'សប្បាយចិត្ត', 'sad': 'ព្រួយចិត្ត',
  'angry': 'ខឹង', 'scared': 'ភ័យ', 'afraid': 'ភ័យ',
  'tired': 'ហត់', 'busy': 'មមាញឹក', 'free': 'ទំនេរ',
  'correct': 'ត្រឹមត្រូវ', 'wrong': 'ខុស', 'true': 'ពិត', 'false': 'មិនពិត',
  'possible': 'អាចធ្វើបាន', 'impossible': 'មិនអាចធ្វើបាន',
  'smart': 'ឆ្លាត', 'intelligent': 'ឆ្លាតវៃ', 'clever': 'ឆ្លាត',
  'stupid': 'ល្ងង់', 'kind': 'ចិត្តល្អ', 'cruel': 'ឃោរឃៅ',
  'brave': 'ក្លាហាន', 'honest': 'ស្មោះត្រង់', 'polite': 'គួរសម', 'rude': 'មិនគួរសម',
  'famous': 'ល្បីល្បាញ', 'popular': 'ពេញនិយម',
  'traditional': 'ប្រពៃណី', 'modern': 'ទំនើប',
  'national': 'ជាតិ', 'international': 'អន្ដរជាតិ',
  'official': 'ផ្លូវការ', 'professional': 'វិជ្ជាជីវៈ',
  // ADVERBS
  'very': 'ណាស់', 'really': 'ពិតជា', 'too': 'ហួស',
  'so': 'ដូច្នេះ', 'quite': 'ច្រើន', 'just': 'ទើប',
  'already': 'រួចហើយ', 'still': 'នៅ', 'yet': 'ទាន់',
  'again': 'ម្ដងទៀត', 'often': 'ញឹកញាប់', 'always': 'តែងតែ',
  'usually': 'ជាទូទៅ', 'sometimes': 'ពេលខ្លះ',
  'never': 'មិនដែល', 'rarely': 'កម្រ', 'seldom': 'កម្រ',
  'now': 'ឥឡូវ', 'today': 'ថ្ងៃនេះ', 'yesterday': 'ម្សិលមិញ',
  'tomorrow': 'ថ្ងៃស្អែក', 'soon': 'ឆាប់',
  'later': 'ពេលក្រោយ', 'early': 'ល្ហែ', 'late': 'យឺត',
  'here': 'នៅទីនេះ', 'there': 'នៅទីនោះ', 'everywhere': 'គ្រប់ទីកន្លែង',
  'maybe': 'ប្រហែលជា', 'perhaps': 'ប្រហែលជា',
  'certainly': 'ពិតប្រាកដ', 'definitely': 'ប្រាកដជា',
  'very much': 'ខ្លាំងណាស់', 'a lot': 'ច្រើនណាស់',
  'together': 'ជាមួយគ្នា', 'alone': 'តែម្ដង',
  // PREPOSITIONS
  'in': 'ក្នុង', 'on': 'លើ', 'at': 'នៅ', 'under': 'ក្រោម',
  'above': 'ខាងលើ', 'below': 'ខាងក្រោម', 'between': 'រវាង',
  'among': 'ក្នុងចំណោម', 'near': 'ជិត', 'far': 'ឆ្ងាយ',
  'inside': 'ខាងក្នុង', 'outside': 'ខាងក្រៅ',
  'with': 'ជាមួយ', 'without': 'ដោយគ្មាន',
  'from': 'ពី', 'to': 'ទៅ', 'for': 'សម្រាប់', 'of': 'នៃ',
  'by': 'ដោយ', 'about': 'អំពី', 'after': 'ក្រោយ', 'before': 'មុន',
  'during': 'ក្នុងអំឡុង', 'until': 'រហូតដល់', 'since': 'ចាប់ពី',
  'through': 'តាមរយៈ', 'across': 'ឆ្លង', 'along': 'តាម',
  'into': 'ចូល', 'out of': 'ចេញពី',
  'up': 'ឡើង', 'down': 'ចុះ',
  // CONJUNCTIONS
  'and': 'និង', 'but': 'ប៉ុន្ដែ', 'or': 'ឬ',
  'because': 'ពីព្រោះ', 'although': 'ទោះបីជា',
  'though': 'ទោះបីជា', 'even though': 'ទោះបីជា',
  'if': 'ប្រសិនបើ', 'unless': 'លុះត្រាតែ', 'when': 'នៅពេល',
  'while': 'ខណៈ', 'as soon as': 'ភ្លាមៗ',
  'since': 'ចាប់ពី', 'until': 'រហូតដល់',
  'that': 'ថា', 'which': 'ដែល', 'who': 'ដែល', 'where': 'ដែល',
  'how': 'ដូចម្ដេច', 'why': 'ហេតុអ្វី',
  // ARTICLES
  'a': 'មួយ', 'an': 'មួយ', 'the': 'ណា',
  // QUESTION WORDS
  'what': 'អ្វី', 'whom': 'នរណា', 'whose': 'របស់នរណា',
  'how many': 'ប៉ុន្មាន', 'how much': 'ប៉ុន្មាន',
  'how long': 'យូរប៉ុណ្ណា', 'how often': 'ញឹកញាប់ប៉ុណ្ណា',
  'how far': 'ឆ្ងាយប៉ុណ្ណា', 'what time': 'ម៉ោងប៉ុន្មាន',
  // NUMBERS
  'one': 'មួយ', 'two': 'ពីរ', 'three': 'បី', 'four': 'បួន',
  'five': 'ប្រាំ', 'six': 'ប្រាំមួយ', 'seven': 'ប្រាំពីរ',
  'eight': 'ប្រាំបី', 'nine': 'ប្រាំបួន', 'ten': 'ដប់',
  'eleven': 'ដប់មួយ', 'twelve': 'ដប់ពីរ', 'thirteen': 'ដប់បី',
  'fourteen': 'ដប់បួន', 'fifteen': 'ដប់ប្រាំ',
  'twenty': 'ម្ភៃ', 'thirty': 'សាមសិប', 'forty': 'សែសិប',
  'fifty': 'ហាសិប', 'sixty': 'ហុកសិប', 'seventy': 'ចិតសិប',
  'eighty': 'ប៉ែតសិប', 'ninety': 'កៅសិប',
  'hundred': 'រយ', 'thousand': 'ពាន់', 'million': 'លាន',
  'first': 'ទីមួយ', 'second': 'ទីពីរ', 'third': 'ទីបី',
  'fourth': 'ទីបួន', 'fifth': 'ទីប្រាំ', 'last': 'ចុងក្រោយ',
  // DAYS & MONTHS
  'monday': 'ថ្ងៃចន្ទ', 'tuesday': 'ថ្ងៃអង្គារ', 'wednesday': 'ថ្ងៃពុធ',
  'thursday': 'ថ្ងៃព្រហស្បតិ៍', 'friday': 'ថ្ងៃសុក្រ',
  'saturday': 'ថ្ងៃសៅរ៍', 'sunday': 'ថ្ងៃអាទិត្យ',
  'january': 'ខែមករា', 'february': 'ខែកុម្ភៈ', 'march': 'ខែមីនា',
  'april': 'ខែមេសា', 'june': 'ខែមិថុនា',
  'july': 'ខែកក្កដា', 'august': 'ខែសីហា', 'september': 'ខែកញ្ញា',
  'october': 'ខែតុលា', 'november': 'ខែវិច្ឆិកា', 'december': 'ខែធ្នូ',
  // TIME
  'morning': 'ព្រឹក', 'afternoon': 'រសៀល',
  'evening': 'ល្ងាច', 'night': 'យប់', 'midnight': 'អធ្រាត្រ',
  'hour': 'ម៉ោង', 'minute': 'នាទី',
  'day': 'ថ្ងៃ', 'week': 'សប្ដាហ៍', 'month': 'ខែ', 'year': 'ឆ្នាំ',
  'season': 'រដូវ', 'spring': 'រដូវផ្ការីក', 'summer': 'រដូវក្ដៅ',
  'autumn': 'រដូវស្លឹកឈើជ្រុះ', 'fall': 'រដូវស្លឹកឈើជ្រុះ',
  'winter': 'រដូវរងារ', 'rainy season': 'រដូវវស្សា',
  'dry season': 'រដូវប្រាំង',
  'past': 'អតីតកាល', 'present': 'បច្ចុប្បន្ន', 'future': 'អនាគត',
  'recently': 'ថ្មីៗ', 'ago': 'មុន',
  // COLORS
  'red': 'ក្រហម', 'blue': 'ខៀវ', 'green': 'បៃតង',
  'yellow': 'លឿង', 'orange': 'ទឹកក្រូច', 'purple': 'ស្វាយ',
  'pink': 'ផ្កាឈូក', 'black': 'ខ្មៅ', 'white': 'ស', 'grey': 'ប្រផេះ',
  'brown': 'ត្នោត', 'gold': 'មាស', 'silver': 'ប្រាក់',
  // BODY
  'head': 'ក្បាល', 'hair': 'សក់', 'face': 'មុខ',
  'eye': 'ភ្នែក', 'ear': 'ត្រចៀក', 'nose': 'ច្រមុះ',
  'mouth': 'មាត់', 'tooth': 'ធ្មេញ', 'teeth': 'ធ្មេញ',
  'tongue': 'អណ្ដាត', 'neck': 'ក', 'shoulder': 'ស្មា',
  'arm': 'ដៃ', 'hand': 'ដៃ', 'finger': 'ម្រាមដៃ',
  'chest': 'ទ្រូង', 'stomach': 'ក្រពះ', 'back': 'ខ្នង',
  'leg': 'ជើង', 'knee': 'ជង្គង់', 'foot': 'ជើង', 'feet': 'ជើង',
  'heart': 'បេះដូង', 'brain': 'ខួរក្បាល', 'blood': 'ឈាម',
  'bone': 'ឆ្អឹង', 'skin': 'ស្បែក',
  // NATURE
  'sun': 'ព្រះអាទិត្យ', 'moon': 'ព្រះច័ន្ទ', 'star': 'ផ្កាយ',
  'sky': 'មេឃ', 'cloud': 'ពពក', 'rain': 'ភ្លៀង',
  'wind': 'ខ្យល់', 'fire': 'ភ្លើង', 'earth': 'ដី',
  'air': 'ខ្យល់', 'tree': 'ដើមឈើ', 'flower': 'ផ្កា',
  'leaf': 'ស្លឹក', 'grass': 'ស្មៅ', 'animal': 'សត្វ',
  // EDUCATION
  'education': 'ការអប់រំ', 'knowledge': 'ចំណេះដឹង',
  'skill': 'ជំនាញ', 'curriculum': 'កម្មវិធីសិក្សា',
  'standard': 'ស្ដង់ដា', 'ministry': 'ក្រសួង',
  'fluent': 'ស្ទាត់', 'fluency': 'ការស្ទាត់',
  // TECHNOLOGY
  'internet': 'អ៊ីនធឺណិត', 'online': 'អនឡាញ', 'offline': 'ក្រៅប្រព័ន្ធ',
  'application': 'កម្មវិធី', 'app': 'កម្មវិធី', 'website': 'វ៉ែបសាយ',
  'password': 'ពាក្យសម្ងាត់', 'account': 'គណនី',
  'download': 'ទាញយក', 'upload': 'ផ្ទុកឡើង',
  'software': 'សូហ្វ​វែរ', 'hardware': 'ហាដ​វែរ',
  'data': 'ទិន្នន័យ', 'digital': 'ឌីជីថល',
  'artificial intelligence': 'បញ្ញាសិប្បនិម្មិត',
  // COMMON EXPRESSIONS
  'in order to': 'ដើម្បី', 'as well as': 'ក៏ដូចជា',
  'such as': 'ដូចជា', 'for example': 'ឧទាហរណ៍',
  'for instance': 'ឧទាហរណ៍', 'in addition': 'លើសពីនេះ',
  'however': 'ទោះជាយ៉ាងណា', 'on the other hand': 'ម្យ៉ាងទៀត',
  'in conclusion': 'សរុប', 'in summary': 'សង្ខេប',
  'as a result': 'ជាលទ្ធផល', 'therefore': 'ដូច្នេះ',
  'i want to': 'ខ្ញុំចង់', 'i need': 'ខ្ញុំត្រូវការ',
  'i have': 'ខ្ញុំមាន', 'there is': 'មាន', 'there are': 'មាន',
  'i can': 'ខ្ញុំអាច', 'i cannot': 'ខ្ញុំមិនអាច',
  'i will': 'ខ្ញុំនឹង', 'do you': 'តើអ្នក',
  'can you': 'តើអ្នកអាច', 'let me': 'ឱ្យខ្ញុំ',

  // DETERMINERS & QUANTIFIERS
  'every': 'រាល់', 'each': 'នីមួយៗ', 'all': 'ទាំងអស់', 'some': 'ខ្លះ',
  'any': 'ណាមួយ', 'many': 'ជាច្រើន', 'much': 'ច្រើន', 'few': 'តិចតួច',
  'little': 'បន្តិច', 'a lot': 'ច្រើន', 'a lot of': 'ជាច្រើន',
  'more': 'ច្រើនទៀត', 'most': 'ច្រើនបំផុត', 'both': 'ទាំងពីរ',
  'either': 'ណាមួយ', 'neither': 'ទាំងពីរមិន', 'another': 'ផ្សេងទៀត',
  'other': 'ផ្សេងទៀត', 'others': 'អ្នកដទៃ', 'several': 'មួយចំនួន',
  'enough': 'គ្រប់គ្រាន់', 'too': 'ផងដែរ / ពេក', 'very': 'ណាស់',
  'quite': 'ល្មម / គួរសម', 'almost': 'ស្ទើរតែ', 'only': 'តែប៉ុណ្ណោះ',

  // DEMONSTRATIVES & INDEFINITES
  'this': 'នេះ', 'that': 'នោះ', 'these': 'ទាំងនេះ', 'those': 'ទាំងនោះ',
  'something': 'អ្វីមួយ', 'anything': 'អ្វីក៏ដោយ', 'nothing': 'គ្មានអ្វី',
  'everything': 'គ្រប់យ៉ាង', 'someone': 'នរណាម្នាក់', 'somebody': 'នរណាម្នាក់',
  'anyone': 'នរណាក៏ដោយ', 'anybody': 'នរណាក៏ដោយ', 'everyone': 'មនុស្សគ្រប់គ្នា',
  'everybody': 'មនុស្សគ្រប់គ្នា', 'nobody': 'គ្មាននរណាម្នាក់', 'no one': 'គ្មាននរណា',

  // TIME & ADVERBS OF FREQUENCY
  'every day': 'រាល់ថ្ងៃ', 'everyday': 'រាល់ថ្ងៃ',
  'every week': 'រាល់សប្ដាហ៍', 'every month': 'រាល់ខែ', 'every year': 'រាល់ឆ្នាំ',
  'always': 'តែងតែ', 'usually': 'ជាធម្មតា', 'often': 'ញឹកញាប់',
  'frequently': 'ជាញឹកញាប់', 'sometimes': 'ពេលខ្លះ', 'occasionally': 'ម្ដងម្កាល',
  'rarely': 'កម្រ', 'seldom': 'កម្រ', 'never': 'មិនដែល', 'hardly': 'ស្ទើរតែមិន',
  'already': 'រួចរាល់', 'yet': 'នៅឡើយ', 'still': 'នៅតែ', 'just': 'ទើបតែ',
  'now': 'ឥឡូវនេះ', 'right now': 'ឥឡូវនេះ', 'at once': 'ភ្លាមៗ',
  'soon': 'ឆាប់ៗ', 'later': 'ពេលក្រោយ', 'early': 'ពីព្រលឹម / មុនម៉ោង',
  'late': 'យឺត', 'tonight': 'យប់នេះ', 'last night': 'យប់មិញ',
  'last week': 'សប្ដាហ៍មុន', 'last month': 'ខែមុន', 'last year': 'ឆ្នាំមុន',
  'next week': 'សប្ដាហ៍ក្រោយ', 'next month': 'ខែក្រោយ', 'next year': 'ឆ្នាំក្រោយ',

  // PREPOSITIONS & CONJUNCTIONS
  'about': 'អំពី', 'above': 'ខាងលើ', 'across': 'ឆ្លងកាត់', 'after': 'ក្រោយពេល',
  'against': 'ប្រឆាំងនឹង', 'along': 'តាមបណ្តោយ', 'among': 'ក្នុងចំណោម',
  'around': 'ជុំវិញ', 'at': 'នៅ', 'before': 'មុនពេល', 'behind': 'ខាងក្រោយ',
  'below': 'ខាងក្រោម', 'beneath': 'នៅក្រោម', 'beside': 'ក្បែរ',
  'between': 'រវាង', 'beyond': 'លើសពី', 'by': 'ដោយ / ក្បែរ',
  'during': 'កំឡុងពេល', 'except': 'លើកលែងតែ', 'for': 'សម្រាប់',
  'from': 'ពី', 'in': 'ក្នុង', 'inside': 'ខាងក្នុង', 'into': 'ចូលក្នុង',
  'near': 'ជិត', 'next to': 'ក្បែរ', 'of': 'នៃ / របស់', 'off': 'ចេញពី',
  'on': 'លើ', 'onto': 'ទៅលើ', 'out': 'ក្រៅ', 'outside': 'ខាងក្រៅ',
  'over': 'លើ / ហួស', 'through': 'ឆ្លងកាត់', 'to': 'ទៅកាន់',
  'toward': 'ឆ្ពោះទៅ', 'towards': 'ឆ្ពោះទៅ', 'under': 'ក្រោម',
  'underneath': 'នៅខាងក្រោម', 'until': 'រហូតដល់', 'up': 'ឡើង',
  'upon': 'ទៅលើ', 'with': 'ជាមួយ', 'within': 'ក្នុងរង្វង់',
  'without': 'ដោយគ្មាន', 'because': 'ពីព្រោះ', 'because of': 'ដោយសារតែ',
  'although': 'ទោះបីជា', 'even though': 'ទោះបីជា', 'though': 'ទោះជាយ៉ាងណា',
  'if': 'ប្រសិនបើ', 'unless': 'លើកលែងតែ', 'while': 'ខណៈពេល',
  'since': 'តាំងពី', 'so that': 'ដើម្បីឱ្យ',
};

// ══════════════════════════════════════════
// AUTO-ENRICH FROM VOCABULARY & IRREGULAR VERBS
// Integrates 49 categories (English Vocabulary.pdf) + 143 irregular verbs
// ══════════════════════════════════════════
try {
  const vocabData = require('./vocab_data.js');
  if (Array.isArray(vocabData)) {
    for (const cat of vocabData) {
      if (Array.isArray(cat.words)) {
        for (const item of cat.words) {
          const parts = item.split('=');
          if (parts.length >= 2) {
            const rawEn = parts[0].trim();
            const kh = parts.slice(1).join('=').trim();
            const enVariants = rawEn.split('/').map(s => s.trim().toLowerCase());
            for (const en of enVariants) {
              if (en && !EN_KH_DICT[en]) {
                EN_KH_DICT[en] = kh;
              }
            }
          }
        }
      }
    }
  }
} catch (e) {
  // Silent fallback if vocab_data is not accessible
}

try {
  const iv = require('./irregular_verbs.js');
  if (iv && typeof iv === 'object') {
    for (const group of Object.values(iv)) {
      if (Array.isArray(group)) {
        for (const item of group) {
          const kh = (item.kh || '').split(',')[0].trim();
          ['v1', 'v2', 'v3'].forEach(f => {
            const form = item[f];
            if (form) {
              form.split('/').forEach(v => {
                const clean = v.trim().toLowerCase();
                if (clean && !EN_KH_DICT[clean]) {
                  EN_KH_DICT[clean] = kh + (f === 'v2' ? ' (អតីត)' : f === 'v3' ? ' (អតីត)' : '');
                }
              });
            }
          });
        }
      }
    }
  }
} catch (e) {
  // Silent fallback if irregular_verbs is not accessible
}

module.exports = { EN_KH_DICT };