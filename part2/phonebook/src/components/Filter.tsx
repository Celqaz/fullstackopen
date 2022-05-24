import React from 'react';

interface FilterProps {
    filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

/**
 * 设置filter表单
 * @param filter
 * @param setFilter
 * @constructor
 */
const Filter = ({filter, setFilter}: FilterProps): JSX.Element => {

    /**
     * input 中 filter 改变时，更新filter的状态
     * @param event
     */
    const filterChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            filter shown with: <input value={filter} onChange={filterChangeHandler}/>
        </div>
    );
};

export default Filter;
