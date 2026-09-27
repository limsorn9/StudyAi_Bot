const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.TEST_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello!");
    console.log(result.response.text());
  } catch (e) {
    console.error("Error with gemini-1.5-flash:", e.message);
  }
}
run();
