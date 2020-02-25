import React, { useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { Student, Students } from "../../types";
import { actionType, STUDENT_EDIT, STUDENT_DEL } from "../../store/actionTypes";
import { State } from "../../store/reducers";
import { studentEdit, studentDelete } from "../../store/actions";

import ModalCustom from "../ModalCustom";


interface Props {
  student: Student,
  index: number,
  students: Students
  [STUDENT_EDIT]: (student: Student, index: number) => actionType,
  [STUDENT_DEL]: (index: number) => actionType,
}

function StudentItem(props: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const editStudent = (student: Student, index: number) => {
    props.STUDENT_EDIT(student, index);
    setIsEdit(false);
  };

  const removeStudent = (index: number) => {
    props.STUDENT_DEL(index);
  };

  return (
    <TableRow key={ props.index }>
      <ModalCustom
        isOpen={ isEdit }
        ok={ student => editStudent(student, props.index) }
        close={ () => setIsEdit(false) }
        fio={ props.student.fio }
        dateBirth={ props.student.dateBirth }
        progress={ props.student.progress }
      />
      <TableCell>
       <IconButton onClick={ () => setIsEdit(true) }>
         <Edit></Edit>
       </IconButton>
       <IconButton onClick={ () => removeStudent(props.index) }>
         <Delete></Delete>
       </IconButton>
      </TableCell>
      <TableCell>{ props.student.fio }</TableCell>
      <TableCell>{ props.student.dateBirth }</TableCell>
      <TableCell>{ props.student.progress }</TableCell>
    </TableRow>
  )
}

const mapStateToProps = (state: State) => ({
  students: state.students
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  [STUDENT_EDIT]: (student: Student, index: number) => 
    dispatch(studentEdit(student, index)),
  [STUDENT_DEL]: (index: number) => 
    dispatch(studentDelete(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentItem);