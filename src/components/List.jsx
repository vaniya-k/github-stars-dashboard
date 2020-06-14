import React from 'react';

const List = ({itemsToShow}) => {
  return (
    <ul>
      {itemsToShow.map(item => 
        <li key={item.id}>{item.name}&nbsp;&nbsp;/&nbsp;&nbsp;&#9733;&nbsp;{item.starsCount}&nbsp;&nbsp;/&nbsp;&nbsp;last commit:&nbsp;{item.lastCommit}&nbsp;&nbsp;<a href={item.url} target="_blank">>></a></li>
      )}
    </ul>
  );
};

export default List;