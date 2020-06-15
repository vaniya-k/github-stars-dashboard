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
  const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount] = useFetchJson(BASE_API_URL, apiSearchString);
  const [loadingTopTen, apiTopTen, errorLoadingTopTen] = useFetchJson(BASE_API_URL, TOP_TEN_SEARCH_STRING);

  const handleSearchSubmit = (newVal) => {
    if(newVal !== searchRequest && newVal !== ``) {
      setSearchRequest(newVal);
      setApiSearchString(`?q=${newVal}&sort=stars&per_page=10&page=${pageNumber}`);
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

  const checkPaginatorNecessity = () => {
    if(searchRequest === `` || loadingResults || loadingTopTen || errorLoadingResults || errorLoadingTopTen) {
      return false
    } else if(resultsTotalCount < 10) {
      return false
    } else {
      return true
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
    if (resultsTotalCount < 91) {
      setPagesCount(Number.parseInt(resultsTotalCount / 10))
    } else {
      setPagesCount(10)
    }
  }, [resultsTotalCount]);

  return (
    <>
    <SearchField onSearchSubmit={handleSearchSubmit}/>
    <List listTitle={listTitle} itemsToShow={itemsToShow}/>
    {checkPaginatorNecessity() && <Paginator pagesCount={pagesCount} pageNumber={pageNumber} onPageNumberChange={handlePageNumberChange}/>}
    </>
  );
};

export default MainContainer;