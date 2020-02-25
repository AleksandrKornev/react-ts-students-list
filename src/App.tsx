import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { 
  Container,
  TableContainer, 
  Paper, 
  Table, 
  TableHead,
  TableRow, 
  TableCell,
  Button
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { init, studentAdd } from "./store/actions";
import { INIT, actionType, STUDENT_ADD } from "./store/actionTypes";
import { State } from "./store/reducers";
import { Students, Student } from "./types";

import StudentList from "./components/StudentsList";
import ModalCustom from "./components/ModalCustom";

import "./App.scss";

interface Props {
  students: Students,
  [INIT]: () => actionType,
  [STUDENT_ADD]: (student: Student) => actionType
}

function App(props: Props) {
  const headItems = ["ФИО", "Дата рождения", "Успеваемость"];
  const [isAdd, setIsAdd] = useState(false);

  const init = () => props.INIT();

  useEffect(() => {
    init();
  }, [props.INIT]);

  const createStudent = (data: Student) => {
    setIsAdd(false);
    props.STUDENT_ADD(data);
  }

  return (
    <div className="App">
      <Container className="btns">
        <Button
          variant="contained"
          color="primary"
          startIcon={ <Add/> }
          onClick={ () => setIsAdd(true) }
        >Добавить студента</Button>
      </Container>

      <TableContainer 
        className="table"
        component={ Paper }
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
              {
                headItems.map((item, index) => 
                  <TableCell key={ index }>{ item }</TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <StudentList students={ props.students }/>
        </Table>
      </TableContainer>

      <ModalCustom
        isOpen={ isAdd }
        close={ () => setIsAdd(false) }
        ok={ data => createStudent(data) }
      />
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  students: state.students
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  [INIT]: () => 
    dispatch(init()),
  [STUDENT_ADD]: (student: Student) => 
    dispatch(studentAdd(student))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
