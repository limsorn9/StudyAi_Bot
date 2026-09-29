require('dotenv').config();
const axios = require('axios');

// ទាញយក API Key ពីឯកសារ .env (យក Key ទី១)
const keys = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "").split(',');
const apiKey = keys[0].trim();

if (!apiKey) {
  console.log("❌ រកមិនឃើញ GROQ_API_KEY នៅក្នុង .env ទេ!");
  process.exit(1);
}

console.log(`កំពុងឆែកមើលម៉ូដែល Groq ដោយប្រើ API Key: ${apiKey.substring(0, 8)}...`);

axios.get('https://api.groq.com/openai/v1/models', {
  headers: { Authorization: `Bearer ${apiKey}` }
})
.then(res => {
  console.log("\n✅ ម៉ូដែល Groq ដែលអាចប្រើបានមាន៖");
  res.data.data.forEach(model => console.log(`- ${model.id} (Owner: ${model.owned_by})`));
})
.catch(err => {
  console.error("❌ បរាជ័យក្នុងការទាញយកម៉ូដែល៖", err.response ? err.response.data : err.message);
});
