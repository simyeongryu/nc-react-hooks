import { v4 as uuidv4 } from "uuid";
import { ADD, DELETE, DELETE_COMPLETED, COMPLETE, UNCOMPLETE } from "./actions";

export const initialState = {
  toDos: [],
  completed: []
};

// action의 이름은 아무거나 해도 된다.
function reducer(state, action) {
  // return 하는 object는 state를 대체할 object
  // state가 변경되는 게 아니라 대체된다.
  switch (action.type) {
    case ADD:
      // state를 변화시키는 게 아니라 대체. 버그를 줄인다.
      // anti mutation
      return {
        ...state,
        toDos: [...state.toDos, { text: action.payload, id: uuidv4() }]
      };
    case DELETE:
      return {
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== action.payload)
      };
    case DELETE_COMPLETED:
      return {
        ...state,
        completed: state.completed.filter(toDo => toDo.id !== action.payload)
      };
    case COMPLETE:
      const target = state.toDos.find(toDo => toDo.id === action.payload);
      return {
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== action.payload),
        completed: [...state.completed, { ...target }]
      };
    case UNCOMPLETE:
      const aTarget = state.completed.find(toDo => toDo.id === action.payload);
      return {
        ...state,
        completed: state.completed.filter(toDo => toDo.id !== action.payload),
        toDos: [...state.toDos, { ...aTarget }]
      };
    default:
      throw new Error();
  }
}

export default reducer;
