import React, {useState, useEffect} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import Paginator from './Paginator.jsx';
import useFetchJson from '../utils/useFetchJson.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

const BASE_API_URL = `https://api.github.com/search/repositories`;
const TOP_TEN_SEARCH_STRING = `?q=stars:>=100000&sort=stars&per_page=10&page=1`;

const MainContainer = () => {
  const [searchRequest, setSearchRequest] = useState(``);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [listTitle, setListTitle] = useState(``);
  const [itemsToShow, setItemsToShow] = useState(null);
  const [apiSearchString, setApiSearchString] = useState(``);
  const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount, resetResultsTotalCount] = useFetchJson(BASE_API_URL, apiSearchString);
  const [loadingTopTen, apiTopTen, errorLoadingTopTen] = useFetchJson(BASE_API_URL, TOP_TEN_SEARCH_STRING);

  const handleSearchSubmit = (newVal) => {
    if(newVal !== searchRequest && newVal !== ``) {
      resetResultsTotalCount();
      setSearchRequest(newVal);
      setPageNumber(1);
      setApiSearchString(`?q=${newVal}&sort=stars&per_page=10&page=1`);
    } else if(newVal !== searchRequest && newVal === ``) {
      setSearchRequest(newVal);
    }
  };

  const handlePageNumberChange = (newVal) => {
    if(newVal !== pageNumber) {
      setPageNumber(newVal);
      setApiSearchString(`?q=${searchRequest}&sort=stars&per_page=10&page=${newVal}`);
    }
  };

  useEffect(() => {    
    if((searchRequest === `` && loadingTopTen) || (searchRequest !== `` && loadingResults)) {
      setListTitle(`Loading...`)
    } else if ((searchRequest === `` && errorLoadingTopTen) || (searchRequest !== `` && errorLoadingResults)) {
      setListTitle(`Error! Check your internet connection and try reloading the page`)
    } else if (searchRequest === ``) {
      setListTitle(`Top 10 repos with most stars overall`)
    } else if (resultsTotalCount > 100) {
      setListTitle(`Showing top 100 of ${resultsTotalCount} results for searching "${searchRequest}"`)
    } else {
      setListTitle(`Showing ${resultsTotalCount} results for searching "${searchRequest}"`)
    }
  }, [searchRequest, loadingTopTen, errorLoadingTopTen, loadingResults, errorLoadingResults]);

  useEffect(() => {
    if(searchRequest === `` && apiTopTen !== null) {
      setItemsToShow(searchResponseAdapter(apiTopTen))
    } else if(searchRequest !== `` && apiResults !== null) {
      setItemsToShow(searchResponseAdapter(apiResults))
    }
  }, [searchRequest, apiResults, apiTopTen]);

  useEffect(() => {
    if (resultsTotalCount < 11) {
      setPagesCount(0);
    } else if (resultsTotalCount < 91) {
      setPagesCount(Number.parseInt(resultsTotalCount / 10))
    } else {
      setPagesCount(10);
    }
  }, [resultsTotalCount]);

  return (
    <>
    <SearchField onSearchSubmit={handleSearchSubmit}/>
    <List listTitle={listTitle} itemsToShow={itemsToShow}/>
    {(pagesCount > 0) && <Paginator pagesCount={pagesCount} pageNumber={pageNumber} onPageNumberChange={handlePageNumberChange}/>}
    </>
  );
};

export default MainContainer;