import { prismaClient } from './prisma';

export const createTransaction = (data: {
  walletId: number;
  description: string;
  amount: number;
  type: 'ADD' | 'LESS';
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.transaction
      .create({ data, include: { wallet: true } })
      .then((transactionData) => {
        prismaClient.wallet
          .update({
            where: { id: data.walletId },
            data: {
              balance: transactionData.wallet.balance + transactionData.amount,
            },
          })
          .then(() => resolve(transactionData))
          .catch(reject);
      })
      .catch(reject);
  });
};

export const deleteTransaction = (transactionId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.transaction
      .delete({ where: { id: transactionId }, include: { wallet: true } })
      .then((transactionData) => {
        prismaClient.wallet
          .update({
            where: { id: transactionData.walletId },
            data: {
              balance: transactionData.wallet.balance - transactionData.amount,
            },
          })
          .then(() => resolve(transactionData))
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getTransactions = (walletId: number) => {
  return prismaClient.transaction.findMany({ where: { walletId } });
};
