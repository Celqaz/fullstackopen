import React from 'react';

export default function FeedbackButton ({clickHandler}){
    return(
        <div>
            <h2>give feedback</h2>
            <button onClick={() => clickHandler('good')}>good</button>
            <button onClick={() => clickHandler('neutral')}>neutral</button>
            <button onClick={() => clickHandler('bad')}>bad</button>
        </div>
    )
}
