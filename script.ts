import { prisma } from "@/app/lib/prisma";


async function main() {
  // Create a simple user
  const user = await prisma.user.create({
    data: {
      email: "test2@example.com",
      name: "Second User"
    },
  });

  console.log("Created user:", user);

  // Fetch all users
  const users = await prisma.user.findMany();
  console.log("All users:", users);
}

// Run and handle errors
main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
