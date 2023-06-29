import React, { useState } from 'react';
import { Wallet } from '@/lib/types/wallet.type';
import axios from 'axios';
import { Edit, Plus } from 'lucide-react';
import { getUrl } from '@/lib/url';
import { useWalletStore } from '@/lib/store/wallet.store';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  wallet: Wallet;
}

export const EditWallet: React.FC<Props> = ({ wallet }) => {
  const { fetchWallets } = useWalletStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [walletName, setWalletName] = useState(wallet.name);
  const [balance, setBalance] = useState(wallet.balance);
  const [loading, setLoading] = useState(false);

  const handleAddWallet = () => {
    setLoading(true);

    axios
      .put(getUrl(`/wallet/${wallet.id}`), {
        name: walletName,
        balance: balance || 0.0,
      })
      .then(() => fetchWallets())
      .catch((err) => alert(err?.message))
      .finally(() => {
        setLoading(false);
        setWalletName(wallet.name);
        setBalance(wallet.balance);
        onClose();
      });
  };

  return (
    <>
      <IconButton
        aria-label='Edit'
        icon={<Edit size={16} />}
        size='sm'
        colorScheme='blue'
        variant='outline'
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>Edit Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel fontSize='lg'>Wallet Name</FormLabel>
              <Input
                size='lg'
                type='text'
                variant='filled'
                placeholder='My Wallet'
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                disabled={loading}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel fontSize='lg'>Balance</FormLabel>
              <Input
                size='lg'
                type='number'
                variant='filled'
                placeholder='0.0'
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value))}
                disabled={loading}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button size='lg' mr={2} onClick={onClose} isDisabled={loading}>
              Cancel
            </Button>
            <Button
              rightIcon={<Edit size={18} />}
              size='lg'
              className='bg-app-accent text-app-text hover:opacity-60'
              isDisabled={walletName.trim().length === 0}
              isLoading={loading}
              onClick={handleAddWallet}
            >
              Edit Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
