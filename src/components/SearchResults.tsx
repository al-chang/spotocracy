import React from "react";

import {
  Input,
  Heading,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

interface SearchResults {
  results: string[];
}

const SearchResults: React.FC<SearchResults> = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((song) => (
        <Button></Button>
      ))}
    </div>
  );
};

export default SearchResults;
