import { BoxProps, Button, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { SideNavigationItem } from './SideNavigationItem';

import { SideNavigationHeader } from './SideNavigationHeader';
import { signOut } from 'next-auth/client';
import { DisplayType, INavigationItem } from './types';

interface IProps extends BoxProps {
  navItems: INavigationItem[];
}

export const DesktopSideNavigationBar = ({
  navItems,
  ...restProps
}: IProps) => {
  const router = useRouter();

  const handleOnNavigationItemPressed = (navigationItem: INavigationItem) => {
    router.push(navigationItem.route);
  };

  const handleOnLogoutButtonPressed = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  };

  const renderNavigationItem = () => {
    return navItems.map((navItem) => {
      return (
        <SideNavigationItem
          displayType={DisplayType.Desktop}
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
    <Flex
      flexDir="column"
      w={['150px', '150px', '300px']}
      h="100%"
      bg="white"
      borderRadius="20px"
      p="1em"
      {...restProps}
    >
      <SideNavigationHeader />
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
  );
};
