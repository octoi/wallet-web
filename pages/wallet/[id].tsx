import { Transaction, Wallet } from '@/lib/types/wallet.type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function walletPage() {
  const router = useRouter();

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {}, [router.query?.id]);

  return <div>{}</div>;
}
