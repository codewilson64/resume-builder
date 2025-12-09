import { prisma } from "@/lib/prisma";



async function main() {
  // Create a simple user
  const user = await prisma.user.create({
    data: {
      email: "test5@example.com",
      name: "Second User",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
