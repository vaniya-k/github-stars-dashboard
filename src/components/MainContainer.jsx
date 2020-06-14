import React, {useState, useEffect} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import Paginator from './Paginator.jsx';
import useFetchJson from '../utils/useFetchJson.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

const MainContainer = () => {
  const [searchQuery, setSearchQuery] = useState(``);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  // const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount] = useFetchJson(`https://api.github.com/search/repositories`, `?q=tetris&sort=stars&per_page=10&page=2`);

  const processSearchQuery = (newVal) => {
    setSearchQuery(newVal);
  };

  // useEffect(() => {
  //   if(apiResults !== null) {
  //     setItemsToShow(searchResponseAdapter(apiResults));
  //   }
  // }, [apiResults])

  // return (
  //   <>
  //   <SearchField processSearchQuery={processSearchQuery}/>
  //   {itemsToShow.length !== 0 && <List itemsToShow={itemsToShow}/>}
  //   {(resultsTotalCount !== null && resultsTotalCount > 10) && <Paginator resultsTotalCount={resultsTotalCount} pageNumber={pageNumber} onPageNumberChange={setPageNumber}/>}
  //   </>
  // );

  return (
    <>
    <SearchField processSearchQuery={processSearchQuery}/>
    <Paginator resultsTotalCount={`94`} pageNumber={pageNumber} onPageNumberChange={setPageNumber}/>
    </>
  );
};

export default MainContainer;