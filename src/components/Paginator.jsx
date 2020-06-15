import React from 'react';

const buttonNames = [`1..10`, `11..20`, `21..30`, `31..40`, `41..50`, `51..60`, `61..70`, `71..80`, `81..90`, `91..100`]

const Paginator = ({pagesCount, pageNumber, onPageNumberChange}) => {
  const buildButtonsArray = (pagesCount, pageNumber) => {
    const buttons = [];

    for(let i = 0; i < pagesCount; i++) {
      buttons.push(
        <li key={i} style={{display: `inline-block`, margin: `10px`}}>
          <div 
            onClick={() => onPageNumberChange(i + 1)}
            style={
              (pageNumber === (i + 1))
              ? {backgroundColor: `grey`, padding: `2px 4px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`}
              : {padding: `2px 4px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`}
            }
          >
            {buttonNames[i]}
          </div>
        </li>
      )
    };

    return buttons;
  };

  return (
    <div style={{width: `100%`, display: `flex`, justifyContent: `center`}}>
      <ul style={{listStyleType: `none`, padding: `0`}}>
      {buildButtonsArray(pagesCount, pageNumber)}
      </ul>
    </div> 
  );
};

export default Paginator;