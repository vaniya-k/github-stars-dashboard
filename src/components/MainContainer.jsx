import React, {useState} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import apiReturnTetris10 from '../mocks/apiReturnTetris10.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

const MainContainer = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const processSearchQuery = (newVal) => {
    setSearchQuery(newVal);
  };

  return (
    <>
    <SearchField processSearchQuery={processSearchQuery}/>
    <List itemsToShow={searchResponseAdapter(apiReturnTetris10)}/>
    </>
  );
};

export default MainContainer;