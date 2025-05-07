import User from "../models/User";
import { Request, Response } from "express";

export const fetchAllUsers = async (req: Request, res: Response) =>{
    
    try {
        res.json(await User.find())
    } catch (error:unknown) {
        const message = error instanceof Error ? error.message: 'unknown error'
        res.status(500).json({error:message})
    }
    
}

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