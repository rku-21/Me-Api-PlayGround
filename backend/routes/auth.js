import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  const { passkey } = req.body;
  const VALID_PASSKEY = process.env.PASSKEY || 'playground';
  if (passkey === VALID_PASSKEY) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid passkey' });
});

export default router;
