const express = require("express");
const router = require("./routes/route");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/not-found");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use("/api/v1/tasks", router);
app.use(notFound);
const port = 6000;

// Connect to MongoDB Atlas Database
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    app.listen(port, () => {
      console.log(`server is runing at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
