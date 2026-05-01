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


const generateEmailHTML = async(eventName,date)=>{
  const client = getAI()

  const prompt = `Generate a clean HTML email(no quotes, no markdown).
  Event:${eventName}
  Date:${date}

  Include:
  -Greeting
  -Event details
  -Friendly closing
  `;

  const res = await client.chat.completions.create({
    model:"gpt-4.1-mini",
    messages:[{role:"user",content: prompt}],
    max_tokens: 250
  })

  let html = res.choices[0].message.content|| "";
  html=html.replace(/"|"$/g,"");
  return html;
}

const analyzeFeedback = async(text) => {
  const client = getAI() 

  const promt = `
  Analyze this user feedback and return STRICK JSON (no extra text):
  Feedback:"${text}"

  Return:
  {
  "sentiment":"positive | neutral | negative",
  "summary":"...",
  "issues":["..."],
  "suggestions":["..."]
  }
  `;

  const res = await client.chat.completions.create({
    model:"gpt-4.1-mini",
    messages:[{
      role:"user",
      content:prompt
    }],
    max_tokens: 250
  })

  let content = res.choices[0].message.content || "";

  content = content.replace(/```json|```/g, "").trim();

  try{
    return JSON.parse(content);
  }catch{
    return{
      sentiment:"unknown",
      summary:text.slice(0,80),
      issues:[],
      suggestions:[]
    }
  }
}

const buildAdminReport = ({feedback,saved}) => {
  return `
      <h2>New Feedback Received</h2>

      <p><strong>Feedback:</strong></p>
      <p>${feedback}</p>

      <hr/>

      <p><strong>Sentiment:</strong>${saved.sentiment}</p>

      <p><strong>Summmary:</strong></p>
      <p>${saved.summary}</p>

      <p><strong>Issues:</strong></p>
      <ul>
      ${saved.issues.map(i => `<li>${i}</li>`).join("")}
      </ul>

      <p><strong>Suggestions:</strong></p>
      <ul>
      ${saved.suggestions.map(s => `<li>${s}</li>`).join("")}
      </ul>
  `
}


module.exports = { initAI, getAI, generateEmailHTML, analyzeFeedback, buildAdminReport};