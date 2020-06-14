import React from 'react';

const Items = ({itemsToShow}) => {
  return (
    <ul>
      {itemsToShow.map(item => 
        <li key={item.id}>{item.name}&nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{item.starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{item.lastCommit}&nbsp;&nbsp;<a href={item.url} target="_blank">&gt;&gt;</a></li>
      )}
    </ul>
  )
};

const List = ({listTitle, itemsToShow}) => {
  return (
    <>
      <h4>{listTitle}</h4>
      {(itemsToShow.length !== 0) && <List itemsToShow={itemsToShow}/>}
    </>
  );
};

export default List;