export const INIT = "INIT";
export const ERR = "ERR";
export const LOAD_STORAGE = "LOAD_STORAGE";

export const STUDENT_ADD = "STUDENT_ADD";
export const STUDENT_EDIT = "STUDENT_EDIT";
export const STUDENT_DEL = "STUDENT_DEL";

interface defaultActionType {
  type: string,
  data: any
}

export type actionType = defaultActionType;