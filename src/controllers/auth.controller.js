const User = require("../models/user.model");

const {
  hash: hashPassword,
  compare: comparePassword,
} = require("../utils/password");
const { generate: generateToken } = require("../utils/token");

exports.signup = (req, res) => {
  if (req.body.name && !req.file) {
    res.send({
      status: 0,
      message: "The profile image field is required.",
    });
    return;
  }

  const { name, email, password, role, phone_no } = req.body;
  const hashedPassword = hashPassword(password.trim());
  const profile_image = req.file.filename;

  const user = new User(
    name.trim(),
    email.trim(),
    hashedPassword,
    role,
    phone_no,
    profile_image
  );
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      const token = generateToken(data.id);
      res.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: "success",
          data: {
            token,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
          },
        });
        return;
      }
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err == "not_found") {
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        data.access_token = token;

        data.profile_pic = process.env.BASE_URL + "uploads/" + data.profile_pic;
        res.status(200).send({
          status: "success",
          data,
        });
        return;
      }
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
};

exports.logout = (req, res) => {
  try {
    req.session = null;
    return res.send({
      status: 1,
      message: "Logout Successfully.",
      data: "",
    });
  } catch (err) {
    this.next(err);
  }
};
