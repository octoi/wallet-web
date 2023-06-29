import { AddWallet } from '@/components/addWallet';
import { Layout } from '@/components/layout';
import { Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <Layout title='Wallet'>
      <Flex alignItems='center' justifyContent='space-between'>
        <h2 className='text-2xl font-semibold'>My Wallets</h2>
        <AddWallet />
      </Flex>
    </Layout>
  );
}
