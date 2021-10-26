const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');


const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const pinRoute = require("./routes/pins");
const categoriesRoute = require('./routes/category');
const questionRoute = require("./routes/questions");
const uploadRoute = require('./routes/upload');
const { checkUser, requireAuth} = require("./middleware/auth.middleware")

dotenv.config();

// cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(
  cors((corsOptions))
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//JWT
// * = verify with every request
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})


// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/pins", pinRoute);
app.use("/api/questions", questionRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/upload", upload.single('file'), uploadRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

app.listen(5000, () => {
    console.log('Listening on port 5000');
})