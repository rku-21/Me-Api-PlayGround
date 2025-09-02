// Basic auth middleware for write ops
export const basicAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) return res.status(401).json({ message: 'Unauthorized' });
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user === 'admin' && pass === 'password123') return next();
  return res.status(401).json({ message: 'Unauthorized' });
};