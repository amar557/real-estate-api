import jwt from "jsonwebtoken";
import Usermodel from "../models/user.model.js";
import bcryprjs from "bcryptjs";
import handlError from "../utils/error.js";
export const createuser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = bcryprjs.hashSync(password, 10);
  const user = new Usermodel({ username, email, password: hashedPass });
  const { password: pass, ...rest } = user._doc;
  console.log(pass);
  try {
    await user.save();

    res.status(201).json({ rest });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailVerify = await Usermodel.findOne({ email });
    if (!emailVerify) return next(handlError(404, "invalid email"));
    const checkPassword = await bcryprjs.compare(
      password,
      emailVerify.password
    );
    if (!checkPassword) return next(handlError(404, "invalid password"));
    const { password: pass, ...rest } = emailVerify._doc;
    const token = jwt.sign({ id: emailVerify._id }, "secretkeyisgiven", {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ rest, token });
  } catch (error) {
    next(error);
  }
};
export const loginwithgoogle = async (req, res, next) => {
  try {
    const userexist = await Usermodel.findOne({ email: req.body.email });

    if (userexist) {
      const token = jwt.sign({ id: userexist._id }, "secretkeyisgiven");
      const { password: pass, ...rest } = userexist._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ token, rest });
    } else {
      const password = Math.random().toString(36).slice(-8);
      const hashedPass = bcryprjs.hashSync(password, 10);
      const newUser = new Usermodel({
        username:
          req.body.username.split(" ").join("") +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPass,
        avatar: req.body.avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "secretkeyisgiven");
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ rest, token });
    }
  } catch (error) {
    console.log(error);
  }
};
export const upateUser = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    if (req.body.password) {
      req.body.password = bcryprjs.hashSync(req.body.password, 10);
    }
    const upadtedUser = await Usermodel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const token = jwt.sign({ id: upadtedUser._id }, "secretkeyisgiven", {
      expiresIn: "1h",
    });
    const { password, ...rest } = upadtedUser._doc;
    res.status(200).json({ rest, token });
    console.log(upadtedUser);
    // console.log(req.cookies);
  } catch (error) {
    res.send("user not found");
  }
};

export const deleteSUser = async function (req, res, next) {
  const user = await Usermodel.findByIdAndDelete(req.params.id);
  res.json({ user, message: "user deleted successfully" });
};
export const getUser = async (req, res) => {
  const user = await Usermodel.findById(req.params.id);
  console.log(user);
  res.send(user);
};
