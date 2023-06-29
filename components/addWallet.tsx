import React, { useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { getUrl } from '@/lib/url';
import { useWalletStore } from '@/lib/store/wallet.store';
import {
  Button,
  FormControl,
  FormLabel,
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

export const AddWallet: React.FC = () => {
  const { fetchWallets } = useWalletStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [walletName, setWalletName] = useState('');
  const [balance, setBalance] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleAddWallet = () => {
    setLoading(true);

    axios
      .post(getUrl('/wallet'), {
        name: walletName,
        balance: balance || 0.0,
      })
      .then(() => fetchWallets())
      .catch((err) => alert(err?.message))
      .finally(() => {
        setLoading(false);
        setWalletName('');
        setBalance(0.0);
        onClose();
      });
  };

  return (
    <>
      <Button
        className='bg-app-accent text-app-text hover:opacity-60'
        size='lg'
        rightIcon={<Plus size={18} />}
        onClick={onOpen}
      >
        Add Wallet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>Add Wallet</ModalHeader>
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
              rightIcon={<Plus size={18} />}
              size='lg'
              className='bg-app-accent text-app-text hover:opacity-60'
              isDisabled={walletName.trim().length === 0}
              isLoading={loading}
              onClick={handleAddWallet}
            >
              Add Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
