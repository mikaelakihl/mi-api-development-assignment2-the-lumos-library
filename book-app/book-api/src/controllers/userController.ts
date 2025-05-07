import User from "../models/User";
import { Request, Response } from "express";

 export const fetchAllUsers = async (req: Request, res: Response) =>{
    res.json(await User.find())
}