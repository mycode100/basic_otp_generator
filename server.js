const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory OTP storage (for demo only)
let otpStore = {};

// Generate OTP
app.post("/generate-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;

  console.log(`OTP for ${phone}: ${otp}`);

  res.json({
    success: true,
    message: "OTP generated successfully",
    otp: otp // remove in real production
  });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] === otp) {
    delete otpStore[phone];
    return res.json({ success: true, message: "OTP verified" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.get("/", (req, res) => {
  res.send("OTP Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
