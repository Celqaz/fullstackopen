import {ActionType, ReviewType} from "./types";

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action:ActionType) => {
  console.log(action)
  switch (action.type) {
    case ReviewType.GOOD:
      return state
    case ReviewType.OK:
      return state
    case ReviewType.BAD:
      return state
    case ReviewType.ZERO:
      return state
    default: return state
  }

}

export default counterReducer
