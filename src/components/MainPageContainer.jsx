import React, {useState, useEffect} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import Paginator from './Paginator.jsx';
import {preserveQueryInSession, getSearchRequestFromSession, getPageNumberFromSession} from '../utils/sessionStorageManager.js';
import useJsonFetch from '../utils/useJsonFetch.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

const MainPageContainer = () => {  
  const [apiSearchString, setApiSearchString] = useState(``);
  const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount, resetResultsTotalCount] = useJsonFetch(`https://api.github.com/search/repositories`, apiSearchString);
  const [loadingTopTen, apiTopTen, errorLoadingTopTen] = useJsonFetch(`https://api.github.com/search/repositories`, `?q=stars:>=100000&sort=stars&per_page=10&page=1`);

  const [searchRequest, setSearchRequest] = useState(``);

  const [listTitle, setListTitle] = useState(``);
  const [itemsToShow, setItemsToShow] = useState(null);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  const handleSearchSubmit = (newVal) => {
    if(newVal !== searchRequest && newVal !== ``) {
      resetResultsTotalCount();
      setSearchRequest(newVal);
      setPageNumber(1);
      preserveQueryInSession(newVal, `1`);
      setApiSearchString(`?q=${newVal}&sort=stars&per_page=10&page=1`);
    } else if(newVal !== searchRequest && newVal === ``) {
      resetResultsTotalCount();
      setSearchRequest(newVal);
    }
  };

  const handlePageNumberChange = (newVal) => {
    if(newVal !== pageNumber) {
      setPageNumber(newVal);
      preserveQueryInSession(searchRequest, `${newVal}`);
      setApiSearchString(`?q=${searchRequest}&sort=stars&per_page=10&page=${newVal}`);
    }
  };

  useEffect(() => {
    if(sessionStorage.length !== 0) {
      setSearchRequest(getSearchRequestFromSession());
      setPageNumber(getPageNumberFromSession());
      setApiSearchString(`?q=${sessionStorage.getItem(`searchRequest`)}&sort=stars&per_page=10&page=${sessionStorage.getItem(`pageNumber`)}`);
    }
  }, []);

  useEffect(() => {    
    if((searchRequest === `` && loadingTopTen) || (searchRequest !== `` && loadingResults)) {
      setListTitle(`Loading...`)
    } else if ((searchRequest === `` && errorLoadingTopTen) || (searchRequest !== `` && errorLoadingResults)) {
      setListTitle(`Error! Check your internet access and hit F5.. Or you need to wait a bit or two due to the API's limits..`)
    } else if (searchRequest === ``) {
      setListTitle(`Top 10 repos with most stars overall`)
    } else if (resultsTotalCount > 100) {
      setListTitle(`Showing top 100 of ${resultsTotalCount} results for searching "${searchRequest}"`)
    } else {
      setListTitle(`Showing ${resultsTotalCount} result(s) for searching "${searchRequest}"`)
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
    <div style={{width: `700px`, height: `350px`, border: `2px solid grey`, padding: `25px`}}>
      <SearchField onSearchSubmit={handleSearchSubmit}/>
      <List listTitle={listTitle} itemsToShow={itemsToShow}/>
      {(pagesCount > 0) && <Paginator pagesCount={pagesCount} pageNumber={pageNumber} onPageNumberChange={handlePageNumberChange}/>}
    </div>
  );
};

export default MainPageContainer;