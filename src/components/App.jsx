import React from 'react';
import MainPageContainer from './MainPageContainer.jsx';
import RepoPageContainer from './RepoPageContainer.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact path="/"
          render={() => <MainPageContainer/>}
        />
        <Route
          exact path="/repos/:repoId"
          render={(props) => <RepoPageContainer id={props.match.params.repoId}/>}
        />
      </Switch>
    </Router>
  )
};

export default App;
