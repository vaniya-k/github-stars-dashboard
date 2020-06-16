const preserveQueryInSession = (searchRequest, pageNumber) => {
  sessionStorage.clear();
  sessionStorage.setItem(`searchRequest`, searchRequest);
  sessionStorage.setItem(`pageNumber`, pageNumber);
}

const getSearchRequestFromSession = () => {
  if(sessionStorage.length !== 0) {
    return sessionStorage.getItem(`searchRequest`)
  }
}

const getPageNumberFromSession = () => {
  if(sessionStorage.length !== 0) {
    return Number.parseInt(sessionStorage.getItem(`pageNumber`))
  }
}

const wipeQueryfromSession = () => {
  sessionStorage.clear();
}

export {preserveQueryInSession, getSearchRequestFromSession, getPageNumberFromSession, wipeQueryfromSession};