// services/aiService.js
const OpenAI = require("openai");
const { getSecret } = require("./ec2Services");

let clientInstance;

const initAI = async () => {
  const apiKey = await getSecret("/event-api/OPEN_AI_API_KEY");

  clientInstance = new OpenAI({
    apiKey,
  });

  console.log("AI initialized ✅");
};

const getAI = () => {
  if (!clientInstance) {
    throw new Error("AI not initialized");
  }
  return clientInstance;
};

module.exports = { initAI, getAI };