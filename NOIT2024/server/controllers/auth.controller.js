import Role from "../models/Role.js"
import User from "../models/User.js"
import bcryptjs from "bcryptjs";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import uniqid from 'uniqid'

export const register = async (req, res, next) => {
  try {
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
      return next(CreateError(400, "Невалиден имейл формат"));
    }

    // res.setHeader('Access-Control-Allow-Origin', 'https://the-books-kingdom.onrender.com');
    // res.setHeader('Access-Control-Allow-Methods', 'POST');
    // res.setHeader('Access-Control-Allow-Headers', '*');

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return next(CreateError(400, "Потребител с този имейл вече съществува."));
    }

    // Validate password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      return next(CreateError(400, "Паролата трябва да бъде поне 8 символа и да съдържа поне една главна буква, една малка буква и една цифра."));
    }

    const role = await Role.findOne({ role: "User" });

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      userImage: req.body.userImage,
      password: hashPassword,
      roles: [role],
    });

    await newUser.save();

    return next(CreateSuccess(200, "User Registered", newUser, uniqid()));
  } catch (error) {
    return next(CreateError(500, error));
  }
};

export const registerAdmin = async(req, res, next) => {
    const role = await Role.find({});
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.userImage,
        password: hashPassword,
        isAdmin: true,
        roles: role
    });

    // res.setHeader('Access-Control-Allow-Origin', 'https://the-books-kingdom.onrender.com');
    // res.setHeader('Access-Control-Allow-Methods', 'POST');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    await newUser.save();
    return next(CreateSuccess(200, "User Registered", [], uniqid()));
}

export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role")

        const { roles } = user;

        if(!user){
            alert("User Not Found")
            return next(CreateError(404, "Потребителят не е намерен"));
        }

        // res.setHeader('Access-Control-Allow-Origin', "https://the-books-kingdom.onrender.com");
        // res.setHeader('Access-Control-Allow-Methods', 'POST');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            alert("Password is incorrect")
            return next(CreateError(400, "Грешна парола"));
        }
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                roles: roles
            },
            process.env.JWT_SECRET
        )

        res.cookie("auth", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Success",
            data: user,
            accessToken: uniqid()
        })

    } catch (error) {
        return next(CreateError(500, "Потребителят не е намерен"));
    }
}

export const logout = async (req, res, next) => {
    try {
      // Clear the authentication cookie
      res.clearCookie("auth");
  
      return next(CreateSuccess(200, "Logout Success"));
    } catch (error) {
      return next(CreateError(500, "Възникна проблем"));
    }
  };