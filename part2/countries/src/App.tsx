import React, {useState} from 'react';
import SearchInput from "./components/SearchInput";
import CountriesInfo from "./components/CountriesInfo";

function App() {
    const [searchField, setSearchField] = useState<string>('')

    return (
        <div>
            <SearchInput searchField={searchField} setSearchField={setSearchField}/>
            <CountriesInfo searchField={searchField}/>
        </div>
    );
}

export default App;
