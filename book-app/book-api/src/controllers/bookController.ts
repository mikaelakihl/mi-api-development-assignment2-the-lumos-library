import { Request, Response } from "express";
import Book from '../models/Book'

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const search = req.query.search;
		const sort = req.query.sort;

		let searchQuery: any = {};
		let sortQuery = {};

		if (search) {
			searchQuery.content = { $regex: search, $options: 'i' };
		}

		let query = Book.find(searchQuery);

		if (sort) {
			const orderBy = sort === 'desc' ? -1 : 1;
			sortQuery = { content: +orderBy };
			query = Book.find(searchQuery).sort(sortQuery);
		}

		const books = await query;

		res.json(books);
    } catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		res.status(500).json({ error: message });
	}
}

