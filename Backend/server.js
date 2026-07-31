require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const UserProfile = require("./models/UserProfile");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});


// CREATE

app.post("/register", async (req, res) => {
  try {
    const user = new UserProfile(req.body);

    await user.save();

    res.json({
      message: "Stored Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// READ

app.get("/register", async (req, res) => {
  try {
    const data = await UserProfile.find();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// UPDATE

app.put("/register/:id", async (req, res) => {
  try {

    const updatedUser = await UserProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Updated Successfully",
      updatedUser,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});


// DELETE

app.delete("/register/:id", async (req, res) => {
  try {

    await UserProfile.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});