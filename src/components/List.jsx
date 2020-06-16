import React from 'react';
import {Link} from 'react-router-dom';

const LiItem = ({item}) => {
  return(
  <li>
    <Link style={{color: `teal`}} to={`/repos/${item.id}`}>{item.name}</Link>
    &nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{item.starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;forks:&nbsp;{item.forksCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{item.lastCommit}&nbsp;&nbsp;
    <a href={item.url} target="_blank">&gt;&gt;</a>
  </li>
  )
}

const List = ({searchRequest, statusMessage, resultsTotalCount, itemsToShow}) => {
  const checkDimmedStyle = () => {
    if(statusMessage.startsWith(`Error`) || statusMessage.startsWith(`Loading...`)) {
      return {color: `grey`}
    }
  };

  const composeTitle = () => {
    if (searchRequest === ``) {
      return `Top 10 repos with most stars overall`
    } else if (resultsTotalCount > 100) {
      return `Showing top 100 of ${resultsTotalCount} results for searching "${searchRequest}"`
    } else {
      return `Showing ${resultsTotalCount} result(s) for searching "${searchRequest}"`
    }
  }

  return (
    <div>
      <h4>{(itemsToShow !== null && statusMessage === ``) ? composeTitle(searchRequest, resultsTotalCount) : statusMessage}</h4>
      {(itemsToShow !== null) && <ul style={checkDimmedStyle()}>{itemsToShow.map(item => <LiItem key={item.id} item={item}/>)}</ul>}
    </div>
  );
};

export default List;
