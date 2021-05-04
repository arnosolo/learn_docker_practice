const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } = require('./config/config');
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express();

// Middleware
app.use(express.json());

// ****************************************************
// Connect MongoDB
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("succesfully connected to DB"))
.catch(err => console.log(err));


// ****************************************************
// Handle Request
app.get("/", (req, res) => {
  res.send("<h2>Hello docker, I am Arno. I have </h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);


// ****************************************************
// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on port ${port}`); })
