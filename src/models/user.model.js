const db = require("../config/db.config");
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
    cb(null, {
      name: newUser.name,
      email: newUser.email,
      password: newUser.passoword,
      role: newUser.role,
    });
  }

  static async findByEmail(email, cb) {
    const user = await prisma.users.findFirst({
      where: { email: email },
    });
    if (user) {
      cb(null, user);
      return;
    } else {
      cb("not_found", null);
      return;
    }
  }
}

module.exports = User;
