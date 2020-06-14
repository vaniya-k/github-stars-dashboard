import React, {useState} from 'react';
import SearchField from './SearchField.jsx';

const MainContainer = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const processSearchQuery = (newVal) => {
    setSearchQuery(newVal);
  };

  return (
    <SearchField processSearchQuery={processSearchQuery}/>
  )
};

export default MainContainer;