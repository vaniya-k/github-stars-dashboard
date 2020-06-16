import React from 'react';
import {Link} from 'react-router-dom';

const LiItem = ({item}) => {
  return(
  <li><Link style={{color: `crimson`}} to={`/repos/${item.id}`}>{item.name}</Link>&nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{item.starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;forks:&nbsp;{item.forksCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{item.lastCommit}&nbsp;&nbsp;<a href={item.url} target="_blank">&gt;&gt;</a></li>
  )
}

const List = ({listTitle, itemsToShow}) => {
  const checkDimmedStyle = () => {
    if(listTitle.startsWith(`Error`) || listTitle.startsWith(`Loading...`)) {
      return {color: `grey`}
    }
  };

  return (
    <div>
      <h4>{listTitle}</h4>
      {(itemsToShow !== null) && <ul style={checkDimmedStyle()}>{itemsToShow.map(item => <LiItem key={item.id} item={item}/>)}</ul>}
    </div>
  );
};

export default List;
