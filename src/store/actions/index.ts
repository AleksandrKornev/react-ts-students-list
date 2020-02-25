import { 
  STUDENT_ADD, 
  STUDENT_EDIT, 
  STUDENT_DEL, 
  INIT
} from "../actionTypes";
import { Student, Students } from "../../types";
import store from "../index";

import { recordStorage, readStorage } from "../../services";
 
export function studentAdd(student: Student) {
  const students: Students = [ ...store.getState().students ];

  students.push(student);
  recordStorage("students", students);

  return {
    type: STUDENT_ADD,
    data: { 
      student
    }
  }
}

export function studentEdit(student: Student, index: number) {
  const students: Students = [ ...store.getState().students ];

  students[index] = student;
  recordStorage("students", students);

  return {
    type: STUDENT_EDIT,
    data: { 
      student,
      index
    }
  }
}

export function studentDelete(index: number) {
  const students = [ ...store.getState().students ];

  students.splice(index, 1);
  recordStorage("students", students);

  return {
    type: STUDENT_DEL,
    data: { 
      index
    }
  }
}

export function init() {
  let students = readStorage("students");
  
  if (!students || !Array.isArray(students)) {
    students = [];
    recordStorage("students", students);
  }

  return {
    type: INIT,
    data: {
      students
    }
  }
}