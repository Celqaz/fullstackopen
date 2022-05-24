import React from 'react';

interface SearchInputProps {
    searchField: string
    setSearchField: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput = ({searchField, setSearchField}: SearchInputProps): JSX.Element => {

    const searchFieldChangeHandler = (event:React.ChangeEvent<HTMLInputElement>):void=>{
        setSearchField(event.target.value)
    }

    return (
        <div>
            find countries:<input type={"text"} value={searchField} onChange={searchFieldChangeHandler}/>
        </div>
    );
};

export default SearchInput;
