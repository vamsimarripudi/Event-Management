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

  const prompt = `
      Generate a COMPLETE event registration confirmation email in HTML format.

      Rules:
      - Do NOT leave sentences incomplete
      - Do NOT include words like "unfortunately"
      - Return FULL email only (no explanation)

      Details:
      Event Name: ${eventName}
      Date: ${date}

      Include:
      - Greeting
      - Confirmation message
      - Event details
      - Friendly closing

      Output must be clean HTML.
      `;

  const res = await client.chat.completions.create({
    model:"gpt-4.1-mini",
    messages:[{role:"user",content: prompt}],
    max_tokens: 250
  })

  let html = res.choices[0].message.content|| "";
  html = html.replace(/"|"$/g,"");
  html = html.replace(/```html|```/g, "").trim();
  return html;
}

const buildStyledEmail = ({ event, user}) => `
  <div style="font-family:Arial, Helvetica, sans-serif; background:#f6f6f6; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background:#111; color:#fff; padding:20px; text-align:center;">
              <h2 style="margin:0;">Event Registration Confirmed</h2>
            </div>

            <!-- Body -->
            <div style="padding:25px;">
              <p style="font-size:16px;">Hi ${user.name || "there"},</p>

              <p style="font-size:15px; color:#333;">
                You have successfully registered for the following event:
              </p>

              <div style="background:#f9f9f9; padding:15px; border-radius:6px; margin:20px 0;">
                <p style="margin:5px 0;"><b>Event:</b> ${event.name}</p>
                <p style="margin:5px 0;"><b>Date:</b> ${new Date(event.dateTime.start).toLocaleString()}</p>
                <p style="margin:5px 0;"><b>Organizer:</b> ${event.organizer || "Event Team"}</p>
              </div>

              <p style="font-size:14px; color:#555;">
                We’re excited to have you with us. Make sure to check your dashboard for updates and event details.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center; margin:25px 0;">
                <a href="https://event.vamsimarripudi.tech/dashboard"
                  style="background:#111; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-size:14px;">
                  View Dashboard
                </a>
              </div>

              <p style="font-size:14px; color:#555;">
                If you have any questions, feel free to reach out.
              </p>

              <p style="margin-top:25px;">
                Regards,<br/>
                <b>Event Management Team</b>
              </p>
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.name}">
                Add to Calendar
              </a>
            </div>

            <!-- Footer -->
            <div style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Event Management. All rights reserved.
            </div>

          </div>
        </div>
`;

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
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

      <!-- Header -->
      <div style="background:#111827; color:white; padding:20px;">
        <h2 style="margin:0;">📊 New Feedback Report</h2>
        <p style="margin:5px 0 0; font-size:13px; color:#9ca3af;">
          User insight generated automatically
        </p>
      </div>

      <!-- Body -->
      <div style="padding:20px; color:#333;">

        <!-- Raw Feedback -->
        <h3 style="margin-bottom:5px;">📝 User Feedback</h3>
        <div style="background:#f9fafb; padding:12px; border-radius:6px; font-size:14px;">
          ${feedback}
        </div>

        <!-- Sentiment -->
        <h3 style="margin-top:20px;">📈 Sentiment</h3>
        <p style="font-weight:bold; color:${
          saved.sentiment === "negative" ? "#dc2626" :
          saved.sentiment === "positive" ? "#16a34a" : "#ca8a04"
        };">
          ${saved.sentiment?.toUpperCase()}
        </p>

        <!-- Summary -->
        <h3 style="margin-top:20px;">📌 Summary</h3>
        <p>${saved.summary}</p>

        <!-- Issues -->
        <h3 style="margin-top:20px;">⚠️ Key Issues</h3>
        <ul>
          ${(saved.issues || []).map(i => `<li>${i}</li>`).join("") || "<li>No major issues</li>"}
        </ul>

        <!-- Suggestions -->
        <h3 style="margin-top:20px;">💡 Suggestions</h3>
        <ul>
          ${(saved.suggestions || []).map(s => `<li>${s}</li>`).join("") || "<li>No suggestions</li>"}
        </ul>

      </div>

      <!-- Footer -->
      <div style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
        Event Management • AI Feedback System
      </div>

    </div>
  </div>
  `;
}


module.exports = { 
  initAI, 
  getAI, 
  generateEmailHTML, 
  analyzeFeedback, 
  buildAdminReport,
  buildStyledEmail
};