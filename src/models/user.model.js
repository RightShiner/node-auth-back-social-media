const db = require("../config/db.config");
const {
  createNewUser: createNewUserQuery,
  findUserByEmail: findUserByEmailQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");
// const prisma = require("../database/prisma");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class User {
  constructor(name, email, password, role, phone_no, profile_image) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone_no = phone_no;
    this.profile_image = profile_image;
  }

  static async create(newUser, cb) {
    const user = await prisma.users.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role_id: 1,
        phone_no: newUser.phone_no,
        profile_pic: newUser.profile_image,
      },
    });
    console.log("this is model create");
    cb(null, {
      name: newUser.name,
      email: newUser.email,
      password: newUser.passoword,
      role: newUser.role,
    });
    // prisma.create(newUser),
    //   (err, res) => {
    //     if (err) {
    //       logger.error(err.message);
    //       cb(err, null);
    //       return;
    //     }
    //     console.log("this is model create");
    //     cb(null, {
    //       id: res.insertId,
    //       name: newUser.name,
    //       email: newUser.email,
    //       password: newUser.passoword,
    //       role: newUser.role,
    //     });
    //   };

    // db.query(
    //   //   createNewUserQuery,
    //   `INSERT INTO USERS (name, email, password, role_id, phone_no, profile_pic) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.password}', ${newUser.role},'${newUser.phone_no}','${newUser.profile_image}')`,
    //   //   [(newUser.name, newUser.email, newUser.password, newUser.role)],
    //   //   "SELECT * from users",
    //   (err, res) => {
    //     if (err) {
    //       logger.error(err.message);
    //       cb(err, null);
    //       return;
    //     }
    //     cb(null, {
    //       id: res.insertId,
    //       name: newUser.name,
    //       email: newUser.email,
    //       password: newUser.passoword,
    //       role: newUser.role,
    //     });
    //   }
    // );
  }

  static async findByEmail(email, cb) {
    const user = await prisma.users.findFirst({
      where: { email: email },
    });
    console.log(user);
    if (user) {
      cb(null, user);
      return;
    } else {
      cb("not_found", null);
      return;
    }
    // db.query(findUserByEmailQuery, email, (err, res) => {
    //   if (err) {
    //     logger.error(err.message);
    //     cb(err, null);
    //     return;
    //   }
    //   if (res.length) {
    //     cb(null, res[0]);
    //     return;
    //   }
    //   cb({ kind: "not_found" }, null);
    // });
  }
}

module.exports = User;
