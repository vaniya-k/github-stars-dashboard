import React, {useState, useEffect} from 'react';

const Paginator = ({resultsTotalCount, pageNumber, onPageNumberChange}) => {
  const [pagesCount, setPagesCount] = useState(null)

  useEffect(() => {
    if (resultsTotalCount < 91) {
      setPagesCount(Number.parseInt(resultsTotalCount / 10))
    } else {
      setPagesCount(10)
    }
  }, [resultsTotalCount])

  const buildButtonsArray = (pagesCount, pageNumber) => {
    const buttons = [];

    for(let i = 0; i < pagesCount; i++) {
      buttons.push(
        <li key={i} style={{display: `inline-block`, margin: `10px`}}>
          <div 
            onClick={() => onPageNumberChange(i + 1)}
            style={
              (pageNumber === (i + 1))
              ? {backgroundColor: `grey`, padding: `3px 6px`, outline: `2px solid grey`, cursor: `pointer`}
              : {padding: `3px 6px`, outline: `2px solid grey`, cursor: `pointer`}
            }
          >
            {`${(i + 1)}`}
          </div>
        </li>
      )
    };

    return buttons;
  }

  return (
    <ul style={{listStyleType: `none`}}>
      {buildButtonsArray(pagesCount, pageNumber)}
    </ul>
  );
};

export default Paginator;