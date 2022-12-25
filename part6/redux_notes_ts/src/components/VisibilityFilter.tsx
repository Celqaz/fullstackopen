import React from 'react';
import {change} from "../reducers/importanceSlice";
import {ImportanceEnum} from "../types";
import {useAppDispatch} from "../hooks";

export default function VisibilityFilter() {
    const dispatch = useAppDispatch();

    return (
        <div>
            all <input type="radio" name="filter"
                       onChange={() => dispatch(change(ImportanceEnum.ALL))}/>
            important <input type="radio" name="filter"
                             onChange={() => dispatch(change(ImportanceEnum.IMPORTANT))}/>
            nonimportant <input type="radio" name="filter"
                                onChange={() => dispatch(change(ImportanceEnum.NONIMPORTANT))}/>
        </div>
    )
}
