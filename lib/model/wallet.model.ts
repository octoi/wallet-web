import { prismaClient } from './prisma';

export const addWallet = (data: { title: string; balance: number }) => {
  return prismaClient.wallet.create({ data });
};

export const getWallets = () => {
  return prismaClient.wallet.findMany();
};

export const getWallet = (walletId: number) => {
  return prismaClient.wallet.findUnique({
    where: { id: walletId },
    include: { transactions: true },
  });
};

export const deleteWallet = (id: number) => {
  return prismaClient.wallet.delete({ where: { id } });
};

export const updateWallet = (data: {
  id: number;
  title?: string;
  balance?: number;
}) => {
  return prismaClient.wallet.update({ where: { id: data.id }, data });
};
