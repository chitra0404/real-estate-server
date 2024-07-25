

const jwt = require('jsonwebtoken');
const User = require('../Models/Usermodel');
module.exports. auth = async (req, res, next) => {
  try {
   
    const token = req.header('Authorization').replace('Bearer ', '');

  const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

   
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};