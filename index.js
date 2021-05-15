const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require('./config/config');
const redis = require('redis')
const session = require('express-session')
const cors = require('cors')
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express();
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

// Middleware
app.use(cors())
app.enable("trust proxy")
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000
    }
  })
)
app.use(express.json());

// ****************************************************
// Connect MongoDB
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("succesfully connected to DB"))
    .catch(err => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
}
connectWithRetry();


// ****************************************************
// Handle Request
app.get("/api/v1", (req, res) => {
  res.send("<h2>Hello docker, I am Arno. It's 08:06 now.</h2>");
  console.log("get a request");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);


// ****************************************************
// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on port ${port}`); })
