import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import theme from '../config/theme';

/**
 * Main Entry Point of the Website
 *
 * @return {any}
 */
function TweetStashApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default TweetStashApp;
