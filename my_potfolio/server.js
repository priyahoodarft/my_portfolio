const path = require("path");
const fs = require("fs");
const express = require("express");
const nodemailer = require("nodemailer");

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, "utf8").split("\n").forEach(function (line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  });
}
loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER = process.env.RECEIVER || EMAIL_USER;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error(
    "ERROR: Set EMAIL_USER and EMAIL_PASS (Gmail App Password) environment variables before starting."
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }
  const mailOptions = {
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    replyTo: email,
    to: RECEIVER,
    subject: `Portfolio Contact - ${name}`,
    text:
      `You received a new message from your portfolio contact form.\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n` +
      `Message:\n${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ ok: false, error: "Failed to send message." });
  }
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
