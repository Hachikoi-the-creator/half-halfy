import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchAll = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
};

const createOne = async () => {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log(user);
};

async function main() {
  console.log("nothing to do OwO");
}

// prisma.$disconnect()
// good practice in scripts that only run once
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
