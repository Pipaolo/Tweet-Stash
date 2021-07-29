import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/client'

export default function LandingPage() {
  const [session] = useSession()
  const handleOnSignInButtonPressed = () => {
    signIn('twitter')
  }
  console.log(session)
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
            bg="black"
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
  )
}
