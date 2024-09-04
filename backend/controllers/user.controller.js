import { user_model } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// registeration controller
const create_user = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const data = await user_model.create({ name, email, password, role });

    res.status(200).json({ message: "user created succesfully", resp: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in registeration api", Error: error.message });
  }
};

//Login functionality
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const curr_user = await user_model.findOne({ email });
    if (!curr_user) {
      return res
        .status(404)
        .json({ message: "Email not found  please sign up " });
    }

    if (password == curr_user.password) {
      //set json web token in cookies

      const { name, role } = await curr_user;
      const access_token = await jwt.sign({ name, role }, "adi", {
        expiresIn: "1h",
      });

      res.cookie("access_token", access_token, {
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ message: "user login succesfully ", resp: access_token });
    }

    return res.status(404).json({ message: "Password Inccorrect" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in Login api", Error: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
  });

  return res
    .status(200)
    .json({ message: "user logout succesfully ", resp: "" });
};

const get_users = async (req, res) => {
  try {
    const users = await user_model.find();
    res.status(200).json({ message: "users get successfully", resp: users });
  } catch (error) {
    res.status(500).json({
      message: "there is an erro in get users api",
      resp: error.messagee,
    });
  }
};
const get_profile = async (req, res) => {
  try {
    const { name } = req.user;

    // Use await to ensure you are getting the actual result from findOne
    const users = await user_model.findOne({ name });

    if (!users) {
      // Check if no user found and send a 404 status
      return res.status(404).json({ message: "User not found", resp: "" });
    }

    // Return the user profile with a success message
    return res
      .status(200)
      .json({ message: "Profile retrieved successfully", resp: users });
  } catch (error) {
    // Corrected the typo in error.message
    res.status(500).json({
      message: "There was an error in the get profile API",
      resp: error.message,
    });
  }
};

export { create_user, login, logout, get_users, get_profile };
