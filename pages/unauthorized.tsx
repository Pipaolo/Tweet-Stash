import { Button, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      justify="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading>You are unauthorized to view this page!</Heading>
      <Link href="/" passHref>
        <Button mt="1em" bg="blue.400" borderRadius="20px" textColor="white">
          Go Back to Landing Page
        </Button>
      </Link>
    </Flex>
  );
};

export default UnauthorizedPage;
