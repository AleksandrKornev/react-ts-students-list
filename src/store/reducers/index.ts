import { 
  actionType, 
  INIT, 
  LOAD_STORAGE, 
  STUDENT_ADD,
  STUDENT_EDIT, 
  STUDENT_DEL  
} from "../actionTypes";
import { Students } from "../../types";

export interface State { 
  students: Students 
}

const initState: State = {
  students: []
}

function MainReducer(state = initState, action: actionType) {
  let students: Students, 
  index: number;

  switch(action.type) {
    case STUDENT_ADD:
      return {
        ...state, 
        students: [...state.students, action.data.student]
      };

    case STUDENT_EDIT:
      index = action.data.index;
      students = [...state.students];
      students[index] = action.data.student;

      return {
        ...state, 
        students
      };

    case STUDENT_DEL:
      index = action.data.index;
      students = [...state.students];
      students.splice(index, 1);
      return {
        ...state, 
        students
      };

    case INIT:
      return {
        ...state, 
        students: action.data.students
      };

    case LOAD_STORAGE:
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

export default MainReducer;