const db = require("../config/db.config");
const {
  createNewUser: createNewUserQuery,
  findUserByEmail: findUserByEmailQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class User {
  constructor(name, email, password, role, phone_no, profile_image) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone_no = phone_no;
    this.profile_image = profile_image;
  }

  static create(newUser, cb) {
    db.query(
      //   createNewUserQuery,
      `INSERT INTO USERS (name, email, password, role_id, phone_no, profile_pic) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.password}', ${newUser.role},'${newUser.phone_no}','${newUser.profile_image}')`,
      //   [(newUser.name, newUser.email, newUser.password, newUser.role)],
      //   "SELECT * from users",
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          id: res.insertId,
          name: newUser.name,
          email: newUser.email,
          password: newUser.passoword,
          role: newUser.role,
        });
      }
    );
  }

  static findByEmail(email, cb) {
    db.query(findUserByEmailQuery, email, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res[0]);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }
}

module.exports = User;
