// favouriteService.ts
import { prisma } from "../../../db/prisma";

// favouriteService.ts
export const addFavorite = async (userId: string, movieId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      favorites: { connect: { id: movieId } },
    },
  });
};

export const getUserFavorites = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { favorites: true },
  });
};