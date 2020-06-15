import React, {useRef} from 'react';

const SearchField = ({onSearchSubmit}) => {
  const inputRef = useRef();

  const handleEnterPress = (evt) => {
    if(evt.keyCode === 13) {
      evt.preventDefault();

      onSearchSubmit(inputRef.current.value);

      inputRef.current.value = ``;
    }
  }

  return (
    <form>
      <label htmlFor="search">Type your search request here:&nbsp;&nbsp;</label>
      <input type="text" id="search" placeholder="hit Enter to submit" ref={inputRef} onKeyDown={handleEnterPress}></input>
    </form>
  );
};

export default SearchField;