import Book from "../models/Book.js"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const CreateCollectionItem = async(req, res, next) => {
    if(req.body.imageUrl == ""){
        req.body.imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.P-nIodv7WzkQ4wYYPsXWaQAAAA%26pid%3DApi&f=1&ipt=5f877b9f0be93f5eaeb93b2edeca8109f41b702002a3c45bf481c76a7c7e5c68&ipo=images"
    }

    res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        year_published: req.body.year_published,
        imageUrl: req.body.imageUrl,
        publisher: req.body.publisher,
        category: req.body.category,
        like: req.body.like,
        countLikes: req.body.countLikes,
        ownersOfLike: req.body.ownersOfLike,
        ownerId: req.body.ownerId
    })

    await newBook.save();
    return next(CreateSuccess(200, "Book Created Successfully!"))
}

export const GetAllItems = async(req, res, next) => {
    try {
        const books = await Book.find({});
        res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return next(CreateSuccess(200, "All Books", books))
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
}

export const GetOneItem = async(req, res, next) => {
    try {
        const book = await Book.find({_id: req.params.id});
        res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(!book){
            return next(CreateError(400, "Книгата не е намерена"));
        } else {
            return next(CreateSuccess(200, "All Books", book))
        }
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
}

export const UpdateOneItem = async(req, res, next) => {
    try {
        const book = await Book.findById({_id: req.params.id})
        res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'UPDATE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(book){
            const newData = await Book.findByIdAndUpdate(
                req.params.id,
                {$set: req.body}
            );
            return next(CreateSuccess(200, "Book Updated", newData))
        } else {
            
            return next(CreateError(400, "Книгата не е намерена"));
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}

export const PartiallyUpdateOneItem = async (req, res, next) => {
    try {
        const book = await Book.findById({ _id: req.params.id });
        res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (book) {
            const updatedFields = Object.keys(req.body).reduce((accumulator, key) => {
                const value = req.body[key];
                accumulator[key] = value;
                return accumulator;
            }, {});

            const newData = await Book.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updatedFields },
                { new: true }
            );

            return next(CreateSuccess(200, "Book Updated", newData));
        } else {
            return next(CreateError(400, "Книгата не е намерена"));
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
};

export const deleteOneItem = async(req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById({_id: bookId});
        res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(book){
            await Book.findByIdAndDelete(bookId)
            return next(CreateSuccess(200, "Book Deleted"))
        } else {
            return next(CreateSuccess(400, "Книгата не е намерена"))
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}