export interface Wallet {
  id: number;
  name: string;
  balance: number;
}

export interface Transaction {
  id: number;
  walletId: number;
  createdAt: number;
  description: string;
  amount: number;
  type: 'ADD' | 'LESS';
}
