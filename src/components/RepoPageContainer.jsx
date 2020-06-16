import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import RepoDetails from './RepoDetails.jsx';
import useJsonFetch from '../utils/useJsonFetch.js';

const RepoPageContainer = ({id}) => {
  const [statusMessage, setStatusMessage] = useState(`Loading...`);
  const [languagesQuery, setLanguagesQuery] = useState(``);
  const [contributorsQuery, setContributorsQuery] = useState(``);

  const [loadingLanguages, languages, loagingLanguagesError] = useJsonFetch(`https://api.github.com/repos`, languagesQuery);
  const [loadingContributors, contributors, loadingContributorsError] = useJsonFetch(`https://api.github.com/repos`, contributorsQuery);
  const [loadingDetails, details, loadingDetailsError] = useJsonFetch(`https://api.github.com/repositories`, `/${id}`);

  const composeLanguagesList = (languages) => {
    if(languages !== null) {
      return Object.keys(languages).join(` • `)
    }
  };

  const composeTopContributorsList = (contributors) => {
    if(contributors !== null) {
      const processedList = contributors.map(contributor => contributor.login);
      return processedList.join(` • `);
    }
  };

  useEffect(() => {
    if(details !== null) {
      const base = `/${details.owner.login}/${details.name}`
      setLanguagesQuery(base + `/languages`);
      setContributorsQuery(base + `/contributors?q=contributions&order=desc&per_page=10&page=1`)
    }
  },[details]);

  useEffect(() => {
    if(loadingDetails || loadingContributors || loadingLanguages) {
      setStatusMessage(`Loading...`)
    } else if(loadingDetailsError || loadingContributorsError || loagingLanguagesError) {
      setStatusMessage(`Error! Check your internet access and hit F5.. Or you need to wait a bit or two due to the API's limits..`)
    }
  }, [loadingLanguages, loadingContributors, loadingDetails, loagingLanguagesError, loadingDetailsError, loadingContributorsError]);

  return (
    <div style={{position: `relative`, width: `700px`, height: `350px`, border: `2px solid grey`, padding: `25px`}}>
      {(details !== null && contributors !== null && languages !== null)
        ? <RepoDetails 
          languagesList={composeLanguagesList(languages)}
          contributorsList={composeTopContributorsList(contributors)}
          title={details.name}
          starsCount={details.stargazers_count}
          forksCount={details.forks_count}
          lastCommit={details.pushed_at.slice(0, 10)}
          ownerAvaUrl={details.owner.avatar_url}
          ownerUrl={details.owner.html_url}
          ownerName={details.owner.login}
          description={details.description}
        />
        : <h4 style={{marginTop: `26px`}}>{`${statusMessage}`}</h4>
      }
      <Link style={{color: `indianred`, position: `absolute`, left: `25px`, bottom: `25px`}} to="/">back</Link>
    </div>
  );
};

export default RepoPageContainer;
