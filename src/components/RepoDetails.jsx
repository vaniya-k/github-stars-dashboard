import React from 'react';

const RepoDetails = ({title, starsCount, lastCommit, ownerAvaUrl, ownerUrl, ownerName, description, languagesList, contributorsList}) => {
  return (
    <>
      <div style={{display: `flex`, justifyContent: `space-between`}}>
        <h4 style={{marginTop: `26px`}}>{title}&nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{lastCommit}&nbsp;&nbsp;</h4>
        <div style={{display: `flex`}}>
          <img src={ownerAvaUrl} style={{width: `70px`, height: `70px`, objectFit: `contain`}}></img>
          <span style={{marginTop: `26px`}}>&nbsp;&nbsp;Owned by&nbsp;</span>
          <a style={{marginTop: `26px`}} href={ownerUrl} target="_blank">{ownerName}</a>
        </div>
      </div>

      <div>
        <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Languages:</h4>
        <span>{languagesList.length === 0 ? `None specified` : languagesList}</span>
      </div>

      <div>
        <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Description:</h4>
        <span>{description.length === 0 ? `None specified` : description}</span>
      </div>

      <div>
        <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Top contributors (up to 10):</h4>
        <span>{contributorsList}</span>
      </div>
    </>
  )
};

export default RepoDetails;
