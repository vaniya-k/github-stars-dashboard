import React, {useState, useEffect} from 'react';
import SearchField from './SearchField.jsx';
import List from './List.jsx';
import Paginator from './Paginator.jsx';
import {preserveQueryInSession, getSearchRequestFromSession, getPageNumberFromSession, wipeQueryfromSession} from '../utils/sessionStorageManager.js';
import useJsonFetch from '../utils/useJsonFetch.js';
import searchResponseAdapter from '../utils/searchResponseAdapter.js';

const MainPageContainer = () => {  
  const [apiQuery, setApiQuery] = useState(``);
  const [loadingResults, apiResults, errorLoadingResults, resultsTotalCount, resetResultsTotalCount] = useJsonFetch(`https://api.github.com/search/repositories`, apiQuery);
  const [loadingTopTen, apiTopTen, errorLoadingTopTen] = useJsonFetch(`https://api.github.com/search/repositories`, `?q=stars:>=100000&sort=stars&per_page=10&page=1`);

  const [statusMessage, setStatusMessage] = useState(``);
  const [searchRequest, setSearchRequest] = useState(``);
  const [itemsToShow, setItemsToShow] = useState(null);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  const handleSearchSubmit = (newVal) => {
    if(newVal !== searchRequest && newVal !== ``) {
      resetResultsTotalCount();
      setSearchRequest(newVal);
      setPageNumber(1);
      preserveQueryInSession(newVal, `1`);
      setApiQuery(`?q=${newVal}&sort=stars&per_page=10&page=1`);
    } else if(newVal !== searchRequest && newVal === ``) {
      resetResultsTotalCount();
      wipeQueryfromSession();
      setSearchRequest(newVal);
    }
  };

  const handlePageNumberChange = (newVal) => {
    if(newVal !== pageNumber) {
      setPageNumber(newVal);
      preserveQueryInSession(searchRequest, `${newVal}`);
      setApiQuery(`?q=${searchRequest}&sort=stars&per_page=10&page=${newVal}`);
    }
  };

  useEffect(() => {
    if(sessionStorage.length !== 0) {
      setSearchRequest(getSearchRequestFromSession());
      setPageNumber(getPageNumberFromSession());
      setApiQuery(`?q=${getSearchRequestFromSession()}&sort=stars&per_page=10&page=${getPageNumberFromSession()}`);
    }
  }, []);

  useEffect(() => {    
    if((searchRequest === `` && loadingTopTen) || (searchRequest !== `` && loadingResults)) {
      setStatusMessage(`Loading...`)
    } else if ((searchRequest === `` && errorLoadingTopTen) || (searchRequest !== `` && errorLoadingResults)) {
      setStatusMessage(`Error! Check your internet access and hit F5.. Or you need to wait a bit or two due to the API's limits..`)
    } else {
      setStatusMessage(``)
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
    <div style={{width: `700px`, height: `400px`, border: `2px solid grey`, padding: `25px`}}>
      <SearchField onSearchSubmit={handleSearchSubmit}/>
      <List searchRequest={searchRequest} statusMessage={statusMessage} resultsTotalCount={resultsTotalCount} itemsToShow={itemsToShow}/>
      {(pagesCount > 0) && <Paginator pagesCount={pagesCount} pageNumber={pageNumber} onPageNumberChange={handlePageNumberChange}/>}
    </div>
  );
};

export default MainPageContainer;