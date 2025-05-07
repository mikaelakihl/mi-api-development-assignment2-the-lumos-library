import { Request, Response } from 'express';
import Book from '../models/Book';
import Review from '../models/Review';

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

		res.status(200).json(books);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		res.status(500).json({ error: message });
	}
};

export const getBookById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const book = await Book.findById(id).populate('reviews');

		if (!book) {
			res.status(404).json({ message: 'Book not found' });
			return;
		}

		res.status(200).json(book);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		res.status(500).json({ error: message });
	}
};

export const createBook = async (req: Request, res: Response) => {
	try {
		const { title, description, author, genres, image, published_year } = req.body;
		if (
			title === undefined ||
			description === undefined ||
			author === undefined ||
			genres === undefined ||
			image === undefined ||
			published_year === undefined
		) {
			res.status(400).json({ error: 'All fields must be provided' });
			return;
		}

		const book = new Book({
			content: title,
			description: description,
			author: author,
			genres: genres,
			image: image,
			published_year: published_year,
		});

		const savedBook = await book.save();
		res.status(201).json({ message: 'Book created', data: savedBook });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		res.status(500).json({ error: message });
	}
};

export const updateBook = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { title, description, author, genres, image, published_year } = req.body;

		if (
			title === undefined ||
			description === undefined ||
			author === undefined ||
			genres === undefined ||
			image === undefined ||
			published_year === undefined
		) {
			res.status(400).json({ error: 'All fields must be provided' });
			return;
		}

		const updatedBook = await Book.updateOne(
			{ _id: id },
			{
				$set: {
					content: title,
					description: description,
					author: author,
					genres: genres,
					image: image,
					published_year: published_year,
				},
			}
		);

		if (updatedBook.matchedCount === 0) {
			res.status(404).json({ error: 'Book not found. Could not update.' });
			return;
		}

		res.status(200).json({ message: 'Book is now updated.', id: parseInt(id) });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		res.status(500).json({ error: message });
	}
};

export const deleteBook = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const book = await Book.findById(id);

		if (!book) {
			res.status(404).json({ message: 'Book not found. Nothing was deleted' });
			return;
		}

        // Delete the reviews that can be found in book (book.reviews)
        const deletedReviews = await Review.deleteMany({_id: {$in: book.reviews}});

        const deletedBook = await Book.deleteOne({_id: id});

		res.status(200).json({ message: 'Book is now deleted', data: {deletedBook, deletedReviews} });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		res.status(500).json({ error: message });
	}
};
