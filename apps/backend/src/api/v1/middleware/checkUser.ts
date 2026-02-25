// middleware/ensureUser.ts
import { prisma } from "../../../db/prisma";

export const checkUserExists = async (clerkUser: any) => {
  return prisma.user.upsert({
    where: { id: clerkUser.id },
    update: {},
    create: {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });
};