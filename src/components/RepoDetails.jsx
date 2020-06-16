import React from 'react';

const RepoDetails = ({title, forksCount, starsCount, lastCommit, ownerAvaUrl, ownerUrl, ownerName, description, languagesList, contributorsList}) => {
  return (
    <>
      <div style={{display: `flex`, justifyContent: `space-between`}}>
        <section style={{display: `flex`, flexDirection: `column`}}>
          <h4 style={{marginTop: `0`}}>{title}&nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;forks:&nbsp;{forksCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{lastCommit}&nbsp;&nbsp;</h4>
        
          <div>
              <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Languages:</h4>
              <span>{(languagesList === `` || languagesList === null) ? `None specified` : languagesList}</span>
          </div>

          <div>
            <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Description:</h4>
            <span>{(description === `` || description === null) ? `None specified` : description}</span>
          </div>

          <div>
            <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Top contributors (up to 10):</h4>
            <span>{contributorsList}</span>
          </div>
        </section>
        
        <section style={{display: `flex`, flexDirection: `column`, marginLeft: `50px`}}>
          <img src={ownerAvaUrl} style={{width: `70px`, height: `70px`, objectFit: `contain`, marginTop: `10x`, marginBottom: `10px`}}></img>
          <h4 style={{marginBottom: `10px`, marginTop: `0`}}>owned by</h4>
          <a style={{marginBottom: `10px`}} href={ownerUrl} target="_blank">{ownerName}</a>
        </section>
      </div>
    </>
  )
};

export default RepoDetails;
