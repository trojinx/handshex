import { User } from "../schema/user.schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
async function signIn(req, res) {
  try {
    const { email, enteredPassword } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(400).send("Username does not exist, please signUp first!");
    } else {
      const hashedPassword = existingUser.password;
      const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
      if (isMatch) {
        //issue a JWT
        const token = jwt.sign(
          {
            id: existingUser._id.toString(),
            username: existingUser.username,
            email: existingUser.email,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          message: "Login successfull",
          token: token,
        });
      } else {
        res.status(404).send("Invalid Credentials");
      }
    }
  } catch (error) {
    console.log(`Error occoured: ${error}`);
    res.status(500).send("Internal server error");
  }
}

export default signIn;
