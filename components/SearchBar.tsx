import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { debounce } from 'ts-debounce';
import { useStore } from '../stores/useStore';

export const SearchBar = () => {
  const { isLoading, searchRetweets } = useStore();

  const onSearchTermChanged = (searchTerm: string) => {
    searchRetweets(searchTerm);
  };

  const debouncedSearchTermChanged = debounce(onSearchTermChanged, 1000);

  // We don't need to search in mobile
  return (
    <Box display={['none', 'block']} bg="blue.500" w="full" borderRadius="20px">
      <InputGroup>
        <InputLeftElement>
          {isLoading ? <Spinner /> : <FaSearch />}
        </InputLeftElement>
        <Input
          onChange={(e) => debouncedSearchTermChanged(e.target.value)}
          placeholder="Search Retweets"
          variant="filled"
          borderRadius="20px"
          p="1em"
          pl="2em"
          textColor="white"
        />
      </InputGroup>
    </Box>
  );
};
