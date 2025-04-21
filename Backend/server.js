import express from "express";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

const app = express();
const port = 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST",
    credentials: true,
  })
);
app.use(bodyParser.json());

const uri =
  "mongodb+srv://michaelangamarca558:iYtWA3NHuq3B1usp@maincluster.n8gqi.mongodb.net/";
const client = new MongoClient(uri);

const JWT_SECRET = "your-jwt-secret";

client
  .connect()
  .then(() => {
    console.log("Connected TO Mongo");
  })
  .catch((err) => {
    console.error("Failed To Connect To Mongo", err);
  });

app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  console.log(`Recieved signup Attempt: Username - ${username}`);
  try {
    const db = client.db("UserInformation");
    const collection = db.collection("UserSignupInformation");
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      username,
      password: hashedPassword,
    };

    await collection.insertOne(newUser);

    res.status(201).json({ message: "Internal Server Error" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error (SignUp)" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(`Recieved login attempt: ${username}`);

  try {
    const db = client.db("UserInformation");
    const collection = db.collection("UserSignupInformation");
    const existingUser = await collection.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        message:
          "there is no account correlated to this username, Try Again Or Signup.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid password, PLease Try Again." });
    }

    const token = jwt.sign(
      { username: existingUser.username, userID: existingUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
