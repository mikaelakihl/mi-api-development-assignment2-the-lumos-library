import User from "../models/User";
import jwt  from "jsonwebtoken";
import { Request, Response} from "express";
import bcrypt from 'bcrypt'

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        res.status(401).json({ message: 'Username is incorrect' });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPlainMatch = password === user.password;
 
        if (!isPasswordValid && !isPlainMatch) {
            res.status(401).json({ message: 'Password is incorrect' });
            return;
        }
    
      const accessToken = jwt.sign(
        { username },
        process.env.JWT_SECRET || "",
        { expiresIn: "7d" }
      );
  
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      });
  
      res.status(200).json({
        message: 'You are logged in',
        is_admin: user.is_admin,
        username: user.username
      });
  
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  };

  export const registerUser = async (req: Request, res: Response) => {
    const {username, password, is_admin} = req.body;
 
    if (!username || !password) {
        res.status(400).json({error: 'Username and password are required'});
        return;
    }
 
    try {
        const existingUser = await User.findOne({ username });
 
        if(existingUser) {
            res.status(409).json({error: 'Username already exists'});
            return;
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            password: hashedPassword,
            is_admin: is_admin || false,
        });
 
        await newUser.save();
 
        res.status(201).json({message: 'User registered'})
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unkown error'
        res.status(500).json({error: message})
    }
};

