import { Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { signIn, getSession } from 'next-auth/client';

import { GetServerSideProps } from 'next';
/**
 * The Landing Page of the Web application
 * @return {any}
 */
export default function LandingPage() {
  const handleOnSignInButtonPressed = () => {
    signIn('twitter', {
      callbackUrl: `${window.location.origin}/home`,
      redirect: true,
    });
  };

  return (
    <div>
      <Head>
        <title>Tweet Stash</title>
        <meta
          name="description"
          content="A Website for storing all the user's retweets"
        />
      </Head>

      <main>
        <Grid w="full" templateColumns="1fr 0.5fr" h="100vh" bg="blue.400">
          <Flex flexDir="column" alignItems="center" p="1em" justify="center">
            <Heading textColor="white">Welcome to Tweet Stash</Heading>
            <Text fontWeight="bold" textColor="white">
              Keep track of your retweets with ease.
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            justify="center"
            bg="white"
            borderRadius="1em 0em 0em 1em"
            p="1em"
          >
            <Button
              bg="blue.400"
              borderRadius="20px"
              onClick={handleOnSignInButtonPressed}
              textColor="white"
              w="full"
            >
              Get Started
            </Button>
          </Flex>
        </Grid>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if the user is currently logged in
  const session = await getSession({
    req: context.req,
  });
  if (session) {
    return {
      redirect: {
        destination: '/home',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
