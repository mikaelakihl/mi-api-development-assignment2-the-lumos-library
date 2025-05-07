import User from "../models/User";
import { Request, Response } from "express";
import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const fetchAllUsers = async (req: Request, res: Response) =>{
    
    try {
        res.json(await User.find())
    } catch (error:unknown) {
        const message = error instanceof Error ? error.message: 'unknown error'
        res.status(500).json({error:message})
    }
    
};

export const fetchOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const {username, password, is_admin} = req.body;

    try {
        const updatedUser = await User.updateOne(
            {_id : req.params.id},
            {$set: {
                username: username,
                password: password,
                is_admin: is_admin,
            }
           }
        );

        if (updatedUser.matchedCount === 0) {
            res.status(404).json({success: false, message: 'User not found'});
            return
        }
        res.json({message: 'User updated', data: await User.findById(req.params.id)});

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message: 'Unknown error'
      res.status(500).json({error:message})
    }

};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.deleteOne({_id: req.params.id});

        if (deletedUser.deletedCount === 0) {
            res.status(404).json({success: false, message: 'User not found'});
            return
        }
        res.json({message: 'User deleted'});
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message: 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if ( !username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).json({message: 'Invalid username or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign(
            {id: user._id, username: user.username, is_admin: user.is_admin}, process.env.JWT_SECRET || '', {expiresIn: '3d'}
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: false,
            samSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 3
        });

        res.json ({
            message: 'Login succesful',
            user: {
                username: user.username,
                is_admin: user.is_admin
            }
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message: 'Unknown error'; 
        res.status(500).json ({error: message});
    }
};