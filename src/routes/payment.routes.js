const router = require("express").Router();
const QRCode = require("qrcode");

router.post("/qr", async (req,res)=>{
  const { amount } = req.body;

  const upi = `upi://pay?pa=test@upi&pn=Store&am=${amount}&cu=INR`;
  const qr = await QRCode.toDataURL(upi);

  res.json({ success:true, qr });
});

module.exports = router;
