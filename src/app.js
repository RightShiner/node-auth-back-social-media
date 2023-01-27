const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRoute = require("./routes/auth.route");

const { httpLogStream } = require("./utils/logger");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(cors());

app.use("/api/auth", authRoute);
app.get("/", function (request, response) {
  var clientIp = requestIp.getClientIp(request);
  console.log(clientIp);
});
app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API working fine",
    },
  });
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
