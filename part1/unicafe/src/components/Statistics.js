import React from 'react';
import StatisticLine from "./StatisticLine";

export default function Statistics({good, neutral, bad}) {
    const sumRating = good + neutral + bad
    const averageRating = ((good - bad) / sumRating) * 100
    const positiveRating = (good / sumRating) * 100

    if (sumRating === 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <div>no feedback given</div>
            </div>
        )
    }
    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                <StatisticLine text={'good'} value={good}/>
                <StatisticLine text={'neutral'} value={neutral}/>
                <StatisticLine text={'bad'} value={bad}/>
                <StatisticLine text={'all'} value={sumRating}/>
                <StatisticLine text={'average'} value={averageRating}/>
                <StatisticLine text={'positive'} value={positiveRating}/>
                </tbody>
            </table>
        </div>
    )
}
