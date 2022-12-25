// create a random ID
import {Anecdote} from "../types";

const getId = () => (100000 * Math.random()).toFixed(0)

// sort by property
const handle = () => {
    return function(a : Anecdote,b:Anecdote){
        return b.votes - a.votes;
    }
}


export {getId, handle}
