const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      email: "ty@mail.com",
      name: "asdf",
      password: "$2y10$rwH1Wul/1yyp133t3VzHVe4a2LeAszOzZVrghVSZfSboUyqbhnS5C",
      role_id: 1,
      phone_no: "123456",
      profile_pic: "1674847646809.png",
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