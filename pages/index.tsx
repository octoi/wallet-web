import { AddWallet } from '@/components/addWallet';
import { EditWallet } from '@/components/editWallet';
import { Layout } from '@/components/layout';
import { useWalletStore } from '@/lib/store/wallet.store';
import { Flex, IconButton } from '@chakra-ui/react';
import { Wallet2 } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const { loading, error, wallets, fetchWallets } = useWalletStore();

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <Layout title='Wallet'>
      <Flex alignItems='center' justifyContent='space-between'>
        <h2 className='text-2xl font-semibold'>My Wallets</h2>
        <AddWallet />
      </Flex>
      <div className='mt-10'>
        {loading && (
          <p className='text-lg font-medium text-app-text'>Loading ...</p>
        )}
        {error && <p className='text-lg text-red-400 font-medium'>{error}</p>}
        {!loading && wallets && (
          <div>
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className='mb-5 rounded-lg bg-app-dark3 p-5 cursor-pointer transition-all duration-200 hover:bg-app-dark4'
              >
                <Flex alignItems='center'>
                  <Wallet2 className='mr-2' />
                  <h2 className='text-xl font-semibold'>{wallet.name}</h2>
                </Flex>
                <p
                  className={`mt-2 text-lg font-medium ${
                    wallet.balance > 0 ? 'text-green-200' : 'text-red-300'
                  }`}
                >
                  {wallet.balance}
                </p>
                <Flex mt={2} alignItems='center'>
                  <EditWallet wallet={wallet} />
                </Flex>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
