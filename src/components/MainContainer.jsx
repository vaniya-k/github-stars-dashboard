import React, {useState, useEffect} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import Paginator from './Paginator.jsx';
import useFetchJson from '../utils/useFetchJson.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

// https://api.github.com/search/repositories?q=stars:>=100000&sort=stars&per_page=10&page=1

const MainContainer = () => {
  const [searchQuery, setSearchQuery] = useState(``);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [listTitle, setListTitle] = useState(``);
  const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount] = useFetchJson(`https://api.github.com/search/repositories`, `?q=tetris&sort=stars&per_page=10&page=2`);
  const [loadingTopTen, apiTopTen, errorLoadingTopTen] = useFetchJson(`https://api.github.com/search/repositories`, `?q=stars:>=100000&sort=stars&per_page=10&page=1`);

  const processSearchQuery = (newVal) => {
    setSearchQuery(newVal);
  };

  useEffect(() => {
    if(searchQuery === `` && loadingTopTen === false) {
      setListTitle(`10 repos with most stars overall`);
      setItemsToShow(searchResponseAdapter(apiTopTen));
    } else if(searchQuery !== `` && loadingResults === false) {
      setListTitle(
        (resultsTotalCount > 100)
        ? `Showing top 100 of ${resultsTotalCount} results for searching "${searchQuery}"`
        : `Showing ${resultsTotalCount} results for searching "${searchQuery}"`
      );
      setItemsToShow(searchResponseAdapter(apiResults));
    } else {
      setListTitle(`Loading...`);
      setItemsToShow([]);
    }
  }, [apiResults, searchQuery, apiTopTen, loadingResults, loadingTopTen])

  return (
    <>
    <SearchField processSearchQuery={processSearchQuery}/>
    <List listTitle={listTitle} itemsToShow={itemsToShow}/>
    {(resultsTotalCount !== null && resultsTotalCount > 10 && searchQuery !== ``) && <Paginator resultsTotalCount={resultsTotalCount} pageNumber={pageNumber} onPageNumberChange={setPageNumber}/>}
    </>
  );

  // return (
  //   <>
  //   <SearchField processSearchQuery={processSearchQuery}/>
  //   <Paginator resultsTotalCount={`94`} pageNumber={pageNumber} onPageNumberChange={setPageNumber}/>
  //   </>
  // );
};

export default MainContainer;