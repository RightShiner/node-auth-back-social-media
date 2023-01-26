const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRoute = require("./routes/auth.route");

const { httpLogStream } = require("./utils/logger");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(cors());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API working fine",
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});
// app.post("/api/auth/login", upload.none(), function (req, res) {
//   //   res.render("the_template", { email: req.body.email });
//   console.log(req.body);
//   res.status(200).send({
//     status: "success",
//     data: {
//       message: "API working fine",
//       email: req.body.email,
//     },
//   });
// });

module.exports = app;
