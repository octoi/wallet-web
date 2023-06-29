import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import axios from 'axios';
import { getUrl } from '@/lib/url';
import { useWalletStore } from '@/lib/store/wallet.store';

export const DeleteWallet: React.FC<{ id: number }> = ({ id }) => {
  const { fetchWallets } = useWalletStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const [loading, setLoading] = useState(false);

  const deleteWallet = () => {
    axios
      .delete(getUrl(`/wallet/${id}`))
      .then(() => fetchWallets())
      .catch((err) => alert(err?.message))
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <>
      <IconButton
        aria-label='Delete'
        icon={<Trash size={16} />}
        size='sm'
        colorScheme='red'
        variant='outline'
        ml={2}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent className='bg-app-dark3'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Wallet
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={deleteWallet}
                ml={3}
                isLoading={loading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
