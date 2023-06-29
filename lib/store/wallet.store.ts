import axios from 'axios';
import { create } from 'zustand';
import { Wallet } from '../types/wallet.type';
import { getUrl } from '../url';

interface WalletStore {
  wallets: Wallet[];
  loading: boolean;
  error: string;
  fetchWallets: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: [],
  loading: false,
  error: '',
  fetchWallets() {
    set({ loading: true });

    axios
      .get(getUrl('/wallet'))
      .then(({ data }) => set({ wallets: data, error: '' }))
      .catch((err) => set({ error: err?.message }))
      .finally(() => set({ loading: false }));
  },
}));
