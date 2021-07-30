import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { SideNavigationItem } from './SideNavigationItem';

import { SideNavigationHeader } from './SideNavigationHeader';
import { signOut } from 'next-auth/client';
import { DisplayType, INavigationItem } from './types';
import { useStore } from '../../stores/useStore';

interface IProps {
  navItems: INavigationItem[];
}

export const MobileSideNavigationBar = (props: IProps) => {
  const { isDrawerOpen, hideDrawer } = useStore();
  const router = useRouter();

  const handleOnNavigationItemPressed = (navigationItem: INavigationItem) => {
    hideDrawer();
    router.push(navigationItem.route);
  };

  const handleOnLogoutButtonPressed = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  };

  const renderNavigationItem = () => {
    return props.navItems.map((navItem) => {
      return (
        <SideNavigationItem
          displayType={DisplayType.Mobile}
          icon={navItem.icon}
          key={navItem.name}
          onClick={() => {
            handleOnNavigationItemPressed(navItem);
          }}
          isActive={router.pathname.includes(navItem.route)}
        >
          <Text>{navItem.name}</Text>
        </SideNavigationItem>
      );
    });
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => hideDrawer()}
      size="xs"
      placement="left"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Flex
            flexDir="column"
            h="100%"
            bg="white"
            borderRadius="20px"
            p="1em"
          >
            <SideNavigationHeader />
            <DrawerCloseButton />
            <VStack mt="1em" w="full">
              {renderNavigationItem()}
            </VStack>
            <Spacer />
            <Button
              onClick={handleOnLogoutButtonPressed}
              bg="red.400"
              textColor="white"
              borderRadius="20px"
            >
              Logout
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
