import React from 'react';

const LiItem = ({item}) => {
  return(
    <li>{item.name}&nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{item.starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{item.lastCommit}&nbsp;&nbsp;<a href={item.url} target="_blank">&gt;&gt;</a></li>
  )
}

const List = ({listTitle, itemsToShow}) => {
  return (
    <>
      <h4>{listTitle}</h4>
      {(itemsToShow !== null) && <ul>{itemsToShow.map(item => <LiItem key={item.id} item={item}/>)}</ul>}
    </>
  );
};

export default List;
