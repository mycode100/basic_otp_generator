const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = {}; // temporary memory store

// Generate OTP
app.post("/generate-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[phone] = otp;

  console.log(`OTP for ${phone}: ${otp}`);

  res.json({
    success: true,
    message: "OTP generated successfully",
  });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] == otp) {
    delete otpStore[phone];
    return res.json({ success: true, message: "OTP verified" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.listen(5000, () => {
  console.log("OTP server running on port 5000");
});
