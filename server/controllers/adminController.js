const User = require("../models/User");
const WebsiteFeedback = require("../models/websiteFeedbackForm");
const { sendEmail } = require("../mailer");



const buildNewsletterHTML = ({ title, updates, insights }) => `
  <div style="width:100%; background:#f4f6f8; padding:10px;">
    <div style="max-width:600px; width:100%; margin:auto; background:#fff; border-radius:8px; overflow:hidden;">
      
      <div style="background:#4f46e5; color:#fff; padding:18px; text-align:center;">
        <h2 style="margin:0;">${title}</h2>
      </div>

      <div style="padding:18px; color:#333; font-size:14px; line-height:1.6;">
        <p>Hello,</p>

        <p>Here’s what’s new:</p>
        <ul style="padding-left:18px;">
          ${updates.map(u => `<li>${u}</li>`).join("")}
        </ul>

        ${
          insights?.length
            ? `
        <p style="margin-top:16px;"><strong>Based on your feedback:</strong></p>
        <ul style="padding-left:18px;">
          ${insights.map(i => `<li>${i}</li>`).join("")}
        </ul>
        `
            : ""
        }

        <!-- CTA (email-safe button) -->
        <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:18px;">
          <tr>
            <td bgcolor="#111827" style="border-radius:6px;">
              <a href="https://event.vamsimarripudi.tech"
                 style="display:inline-block; padding:10px 16px; color:#ffffff; text-decoration:none; font-size:14px;">
                 Try the updates
              </a>
            </td>
          </tr>
        </table>

        <p style="margin-top:16px;">
          We’d love your feedback.
        </p>

        <!-- Feedback link fallback -->
        <p style="font-size:13px;">
          Submit feedback: 
          <a href="https://event.vamsimarripudi.tech">Open app → Feedback</a>
        </p>

        <p style="font-size:12px; color:#9ca3af; margin-top:20px; text-align:center;">
          🤖 This is an AI-assisted update email.
        </p>
      </div>

      <div style="text-align:center; padding:10px; font-size:12px; color:#888;">
        © Event Management
        @ Developed by Vamsi Marripudi
      </div>
    </div>
  </div>
`;

const getInsights = async () => {
  // last 20 feedbacks → extract issues
  const recent = await WebsiteFeedback.find().sort({ createdAt: -1 }).limit(20).lean();
  const issues = recent.flatMap(f => f.issues || []);
  // simple frequency map
  const freq = {};
  issues.forEach(i => (freq[i] = (freq[i] || 0) + 1));
  // top 3 issues → convert to “we improved …”
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([issue]) => `Improved ${issue.toLowerCase()}`);
};

const sendNewsletter = async (req, res) => {
  try {
    const { title, updates, includeInsights = true } = req.body;

    if (!title || !updates?.length) {
      return res.status(400).json({ error: "title and updates[] required" });
    }

    const insights = includeInsights ? await getInsights() : [];
    const html = buildNewsletterHTML({ title, updates, insights });

    const users = await User.find({}, "email").lean();

    // simple batching (avoid rate limits)
    const batchSize = 20;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      await Promise.all(
        batch.map(u =>
          sendEmail({
            to: u.email,
            subject: title,
            html
          })
        )
      );

      // small delay between batches
      await new Promise(r => setTimeout(r, 800));
    }

    res.json({
      message: "Newsletter sent",
      recipients: users.length,
      insights
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendNewsletter };