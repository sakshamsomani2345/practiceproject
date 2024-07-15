import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup=async (req,res,nexte)=>{
console.log(req.body);
const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    // return res.json({message:"incorrect"})
    nexte(errorHandler(400,"All required"))
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password:hashedPassword
  });
console.log(newUser);
  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    nexte(error);
  }
}
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
console.log("re",req.body);
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id ,
        isAdmin:validUser.isAdmin
      },
      process.env.JWT_SECRET
    );
// console.log(token);
    const { password: pass, ...rest } = validUser._doc;
// console.log(rest);
   return  res
      .status(200)
      // .cookie('access_token', token, {
      //   httpOnly: true,
      // })
      .json({token,user:rest});
  } 
  catch (error) {
    next(error);
  }
};