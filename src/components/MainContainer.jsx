import React, {useState, useEffect} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import Paginator from './Paginator.jsx';
import useFetchJson from '../utils/useFetchJson.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

const BASE_API_URL = `https://api.github.com/search/repositories`;
const TOP_TEN_QUERY_STRING = `?q=stars:>=100000&sort=stars&per_page=10&page=1`;

const MainContainer = () => {
  const [searchQuery, setSearchQuery] = useState(``);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [listTitle, setListTitle] = useState(``);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount] = useFetchJson(BASE_API_URL, `?q=tetris&sort=stars&per_page=10&page=2`);
  const [loadingTopTen, apiTopTen, errorLoadingTopTen] = useFetchJson(BASE_API_URL, TOP_TEN_QUERY_STRING);

  const processSearchQuery = (newVal) => {
    setSearchQuery(newVal);
  };

  const checkPaginatorNecessity = (resultsTotalCount, searchQuery) => {
    if (resultsTotalCount !== null && resultsTotalCount > 10 && searchQuery !== ``) {
      return true
    } else {
      return false
    }
  };

  useEffect(() => {    
    if((searchQuery === `` && loadingTopTen) || (searchQuery !== `` && loadingResults)) {
      setListTitle(`Loading...`)
    } else if ((searchQuery === `` && errorLoadingTopTen) || (searchQuery !== `` && errorLoadingResults)) {
      setListTitle(`Error! Check your internet connection and try reloading the page`)
    } else if (searchQuery === ``) {
      setListTitle(`Top 10 repos with most stars overall`)
    } else if (resultsTotalCount > 100) {
      setListTitle(`Showing top 100 of ${resultsTotalCount} results for searching "${searchQuery}"`)
    } else {
      setListTitle(`Showing ${resultsTotalCount} results for searching "${searchQuery}"`)
    }
  }, [searchQuery, loadingTopTen, errorLoadingTopTen, loadingResults, errorLoadingResults]);

  useEffect(() => {
    if(searchQuery === `` && apiTopTen !== null) {
      setItemsToShow(searchResponseAdapter(apiTopTen))
    } else if(searchQuery !== `` && apiResults !== null) {
      setItemsToShow(searchResponseAdapter(apiResults))
    }
  }, [searchQuery, apiResults, apiTopTen]);

  useEffect(() => {
    if (resultsTotalCount < 91) {
      setPagesCount(Number.parseInt(resultsTotalCount / 10))
    } else {
      setPagesCount(10)
    }
  }, [resultsTotalCount]);

  return (
    <>
    <SearchField processSearchQuery={processSearchQuery}/>
    <List listTitle={listTitle} itemsToShow={itemsToShow}/>
    {checkPaginatorNecessity(resultsTotalCount, searchQuery) && <Paginator pagesCount={pagesCount} pageNumber={pageNumber} onPageNumberChange={setPageNumber}/>}
    </>
  );
};

export default MainContainer;