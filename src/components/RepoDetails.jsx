import React from 'react';

const RepoDetails = ({title, forksCount, starsCount, lastCommit, ownerAvaUrl, ownerUrl, ownerName, description, languagesList, contributorsList}) => {
  const checkContentToShow = (content) => {
    const returnString = (content === `` || content === null) ? `None specified`: content;
    return returnString;
  };
  
  return (
    <>
      <div style={{display: `flex`, justifyContent: `space-between`}}>
        <section style={{display: `flex`, flexDirection: `column`}}>
          <h4 style={{marginTop: `0`, marginBottom: `10px`}}>{title}</h4>
          <h4 style={{marginTop: `0`, marginBottom: `10px`}}>&#9733;&nbsp;{starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;forks:&nbsp;{forksCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{lastCommit}&nbsp;&nbsp;</h4>
        
          <div>
            <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Languages:</h4>
            <span>{checkContentToShow(languagesList)}</span>
          </div>

          <div>
            <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Description:</h4>
            <span>{checkContentToShow(description)}</span>
          </div>

          <div>
            <h4 style={{marginBottom: `10px`, marginTop: `25px`}}>Top contributors (up to 10):</h4>
            <span>{checkContentToShow(contributorsList)}</span>
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
