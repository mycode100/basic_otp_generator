const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// OTP Route
app.post("/generate-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  res.json({
    success: true,
    message: "OTP generated successfully",
    otp: otp
  });
});

// Loan Details Route
app.post("/loan-details", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone required" });
  }

  // Create deterministic unique values based on phone
  const seed = parseInt(phone.slice(-4));

  const loanAmount = 100000 + (seed * 37) % 900000;
  const outstanding = Math.floor(loanAmount * 0.42);
  const emi = Math.floor(outstanding / 24);
  const dueDay = (seed % 28) + 1;

  res.json({
    success: true,
    loanAmount: loanAmount,
    outstandingAmount: outstanding,
    emi: emi,
    nextDueDate: `${dueDay}-03-2026`,
    status: "Active"
  });
});

app.get("/", (req, res) => {
  res.send("OTP & Loan Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
