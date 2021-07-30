import { HStack, Image, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useStore } from '../stores/useStore';

export const Appbar = () => {
  const { hideDrawer, showDrawer, isDrawerOpen } = useStore();
  const [session] = useSession();
  const router = useRouter();

  const user = session?.user;
  const currentPath = router.pathname.replace('/', '').toUpperCase();

  const handleOnAvatarPressed = () => {
    if (isDrawerOpen) {
      hideDrawer();
    } else {
      showDrawer();
    }
  };

  return (
    <HStack
      display={['flex', 'flex', 'none']}
      align="center"
      bg="white"
      boxShadow="lg"
      w="full"
      position="fixed"
      top="0"
      h={['50px', '80px']}
      p={['5px', '10px']}
      zIndex="modal"
    >
      <Image
        boxSize={['35px', '50px']}
        alt="User Profile Image"
        borderRadius="100%"
        src={user?.image || ''}
        onClick={handleOnAvatarPressed}
      />
      <Text fontSize={['1rem', '1.2rem']} fontWeight="bold">
        {currentPath}
      </Text>
    </HStack>
  );
};
