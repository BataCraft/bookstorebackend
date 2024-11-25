/* This code snippet is defining an Express router that handles various CRUD operations for a bookstore
application. Here's a breakdown of what each part of the code does: */
const mongoose = require('mongoose');
const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Import the Book model (replace 'Book' with your actual model name)
const Book = require('../model/book'); // Adjust the path as per your project structure

// POST route to add a new book
router.post(
    '/bookstore',
    [
        // Validation rules
        body('title', 'Invalid title, must be at least 3 characters long').isLength({ min: 3 }),
        body('author', 'Invalid author, must be at least 3 characters long').isLength({ min: 3 }),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Create a new book using the Book model
            const newBook = await Book.create({
                title: req.body.title,
                author: req.body.author,
                publishDate: req.body.publishDate, // Ensure field names match your schema
            });

            // Return the created book
            return res.status(201).json(newBook);
        } catch (error) {
            // Handle server errors
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);


router.get('/books', async(req, res)=>{
    try {
        const Allbooks = await Book.find({});
        return res.status(200).json({success: true, count: Allbooks.length,
            book: Allbooks
        });
       
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
        
    }
});



/* This code snippet defines a GET route in the Express router to fetch a specific book by its ID.
Here's a breakdown of what the code does: */
router.get('/books/:id', async(req, res)=>{
    try {

        const {id} = req.params;

        const book = await Book.findById(id);

        if(!book){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });

        };

        return res.status(200).json({
            success: true,
            book : book
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
})


// !Updating book


// PUT route to update a book by ID
router.put(
    '/books/:id',
    [
        // Validation rules
        body('title', 'Invalid title, must be at least 3 characters long').isLength({ min: 3 }),
        body('author', 'Invalid author, must be at least 3 characters long').isLength({ min: 3 }),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return an array of error messages
        }

        try {
            // Extract the ID from the request parameters
            const { id } = req.params;

            // Find the book by ID and update it
            const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
                new: true, // Return the updated document
                runValidators: true, // Ensure schema validation on updates
            });

            // Check if the book exists
            if (!updatedBook) {
                return res.status(404).json({ success: false, message: 'Book not found' });
            }

            // Return the updated book
            return res.status(200).json({ success: true, book: updatedBook });

        } catch (error) {
            // Handle errors (e.g., invalid ID format)
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
);


// !Delete Book
router.delete('/books/:id', async(req, res)=>{
    const {id} = req.params;
    
    const Deletebook = await Book.findByIdAndDelete(id);

    if(!Deletebook) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });
})


module.exports = router;
