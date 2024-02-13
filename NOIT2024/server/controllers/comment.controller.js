import Comment from "../models/Comment.js"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const CreateCollectionItem = async(req, res, next) => {
    const newComment = new Comment({
        comment: req.body.comment,
        bookId: req.body.bookId,
        name: req.body.name,
        userImage: req.body.userImage,
        ownerId: req.body.ownerId
    })

    await newComment.save();
    return next(CreateSuccess(200, "Comment Created Successfully!"))
}

export const GetAllItems = async(req, res, next) => {
    try {
        const comments = await Comment.find({});
        return next(CreateSuccess(200, "All Comments", comments))
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
}

export const GetOneItem = async(req, res, next) => {
    try {
        const comment = await Comment.find({_id: req.params.id});
        if(!comment){
            return next(CreateError(400, "Comment not found"));
        } else {
            return next(CreateSuccess(200, "All Comments", comment))
        }
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
}

export const UpdateOneItem = async(req, res, next) => {
    try {
        const book = await Comment.findById({_id: req.params.id})
        if(book){
            const newData = await Comment.findByIdAndUpdate(
                req.params.id,
                {$set: req.body}
            );
            return next(CreateSuccess(200, "Comment Updated", newData))
        } else {
            
            return next(CreateError(400, "Comment not found"));
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}

export const PartiallyUpdateOneItem = async (req, res, next) => {
    try {
      const comment = await Comment.findById({ _id: req.params.id });
      const key = Object.keys(req.body)[0];
      const value = req.body[key];
  
      if (comment) {
        const newData = await Comment.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { [key]: value } },
          { new: true }
        );
  
        return next(CreateSuccess(200, "Comment Updated", newData));
      } else {
        return next(CreateError(400, "Comment not found"));
      }
    } catch (error) {
      return next(CreateError(500, "Internal Server Error"));
    }
  };

export const deleteOneItem = async(req, res, next) => {
    try {
        const commentID = req.params.id;
        const comment = await Comment.findById({_id: commentID});
        if(comment){
            await Comment.findByIdAndDelete(commentID)
            return next(CreateSuccess(200, "Book Deleted"))
        } else {
            return next(CreateSuccess(200, "Book not found"))
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}