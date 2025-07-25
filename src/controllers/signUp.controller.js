import bcrypt from "bcrypt";
import { User } from "../schema/user.schema.js";
import jwt from "jsonwebtoken";
async function signUp(req, res) {
  try {
    const { username, email, enteredPassword } = req.body;
    const existingUserEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ username: username });

    if (existingUserEmail) {
      res.status(400).send("This email is already linked to another account");
    } else if (existingUsername) {
      res.status(400).send("Username is already taken, try another");
    } else {
      const password = await bcrypt.hash(enteredPassword, 10);
      const newUser = new User({ username, email, password });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id.toString(),
          username: newUser.username,
          email: newUser.email,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        token,
        message:
          "Welcome to handshex! Your account has been created successfully...",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default signUp;
