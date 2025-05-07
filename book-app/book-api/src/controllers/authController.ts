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
        sameSite: 'none',
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

// export const loginUser = async( req: Request, res: Response) => {
//     const username = 'admin';
//     const password = 'hej';
//     const accessToken = jwt.sign({username, password}, 'secret', {expiresIn:'3d'})
//     res.json (accessToken);
// }

// export const loginUser = async (req: Request, res: Response) => {
//     const { username, password } = req.body;
  
//     // 1. Kontrollera att båda fält finns
//     if (!username || !password) {
//       return res.status(400).json({ message: 'Username and password are required' });
//     }
  
//     try {
//       // 2. Hämta användaren från databasen
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }
  
//       // 3. Jämför lösenordet med bcrypt
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }
  
//       // 4. Skapa en JWT-token
//       const accessToken = jwt.sign(
//         { id: user._id, username: user.username, is_admin: user.is_admin },
//         process.env.JWT_SECRET || '',
//         { expiresIn: '3d' }
//       );
  
//       // 5. Skicka tillbaka token
//       res.json({ accessToken });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error during login' });
//     }
//   };


// export const loginUser = async (req: Request, res: Response) => {
//     const {username, password} = req.body;

//     if ( !username || !password) {
//         return res.status(400).json({message: 'Username and password are required'});
//     }

//     try {
//         const user = await User.findOne({username});

//         if (!user) {
//             return res.status(400).json({message: 'Invalid username or password'});
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({message: 'Invalid username or password'});
//         }

//         const token = jwt.sign(
//             {id: user._id, username: user.username}, process.env.JWT_SECRET || '', {expiresIn: '3d'}
//         );

//         res.cookie('accessToken', token, {
//             httpOnly: true,
//             secure: false,
//             samSite: 'lax',
//             maxAge: 1000 * 60 * 60 * 24 * 3
//         });

//         res.json ({
//             message: 'Login succesful',
//             user: {
//                 username: user.username,
//                 is_admin: user.is_admin
//             }
//         });
//     } catch (error: unknown) {
//         const message = error instanceof Error ? error.message: 'Unknown error'; 
//         res.status(500).json ({error: message});
//     }
// };

// export const loginUser = async (req: Request, res: Response) => {
//     const { username, password } = req.body;
  
//     if (!username || !password) {
//       return res.status(400).json({ message: 'Username and password are required' });
//     }
  
//     try {
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
  
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }
  
//       // 👇 Här skickas ingen token
//       res.json({
//         message: 'Login successful',
//         user: {
//           username: user.username,
//           is_admin: user.is_admin
//         }
//       });
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : 'Unknown error';
//       res.status(500).json({ error: message });
//     }
//   };