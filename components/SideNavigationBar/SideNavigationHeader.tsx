import { Avatar, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

export const SideNavigationHeader = () => {
  const [session] = useSession();

  const user = session!.user!;

  if (!user) {
    return <Skeleton height="100px" w="full" borderRadius="20px" />;
  }

  return (
    <Link href={`https://twitter.com/${user.screen_name}`} passHref>
      <HStack
        w="full"
        bg="gray.200"
        borderRadius="20px"
        p="1em"
        align="stretch"
        cursor="pointer"
        as="a"
        target="_blank"
      >
        <Avatar src={user.image || ''} />
        <VStack
          spacing="5px"
          w="full"
          align="start"
          display={['block', 'block', 'block']}
        >
          <Text fontWeight="bold">{user.name}</Text>
          <Text>@{user.screen_name}</Text>
        </VStack>
      </HStack>
    </Link>
  );
};
