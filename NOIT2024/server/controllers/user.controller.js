import User from "../models/User.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        return next(CreateSuccess(200, "All Users", users))
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
}

export const editUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const newData = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true } // To return the updated document
        );
        return next(CreateSuccess(200, "User Updated", newData));
      } else {
        return next(CreateError(400, "Потребителят не е намерен!"));
      }
    } catch (error) {
      console.error('Error in editUserImage:', error);
      return next(CreateError(500, "Internal Server Error"));
    }
  };

export const getUserById = async(req, res, next) => {
    try {
        const user = await User.findById({_id: req.params.id})
        if(!user){
            return next(CreateError(404, "User Not Found"));
        } else {
            return next(CreateSuccess(200, "Single User", user))
        }
    } catch (error) {
        return next(CreateError(500, "Something went wrong"));
    }
}

export const deleteUser = async(req, res, next) => {
  try {
      const userID = req.params.id;
      const user = await User.findById({_id: userID});
      if(user){
          await User.findByIdAndDelete(userID)
          return next(CreateSuccess(200, "Book Deleted"))
      } else {
          return next(CreateSuccess(400, "Потребителят не е намерен"))
      }
  } catch (error) {
      return next(CreateError(500, "Internal Server Error"));
  }
}