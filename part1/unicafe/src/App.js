import {useState} from "react";
import Statistics from "./components/Statistics";
import FeedbackButton from "./components/FeedbackButton";

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const buttonHandler = (buttonName) => {
        switch (buttonName) {
            case 'good':
                setGood(good + 1)
                break;
            case 'neutral':
                setNeutral(neutral + 1)
                break;
            case 'bad':
                setBad(bad + 1)
                break;
            default:
                break;
        }
    }


    return (
        <div>
           <FeedbackButton clickHandler={buttonHandler}/>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App;
