const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      email: "z@mail.com",
      name: "asdf",
      password: "$2a$10$8GnGDlOBZf7S88ZptLIT3ODbUdNDSNDA6WQx1YHsHiQqm4A5QrX9S",
      role_id: 1,
      phone_no: "123456",
      profile_pic: "1674865038682.png",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
