const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserPrisma {
  static async create(data, cb) {
    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: 1,
        phone_no: data.phone_no,
        profile_pic: data.profile_image,
      },
    });
    return user;
  }
}

module.exports = UserPrisma;
