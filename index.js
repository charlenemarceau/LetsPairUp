const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require ('path');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const pinRoute = require("./routes/pins");
const questionRoute = require("./routes/questions");
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

// multer 
// instauring destination path
//The folder to which the file has been saved
//	The name of the file within the destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
  
const upload = multer({ storage });
// upload our file automatically
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// path
app.use('/images', express.static(path.join(__dirname, "public/images")));

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/pins", pinRoute);
app.use("/api/questions", questionRoute);  

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

app.listen(5000, () => {
    console.log('Listening on port 5000');
})