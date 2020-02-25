import React, { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Student } from "../../types";

import "./index.scss";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    width: 400,
    height: 240,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    outline: "none",
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    transform: "translate(-50%, -50%)"
  },
}));

const useStylesInput = makeStyles(theme => ({
  input: {
    marginBottom: 20
  },
}));

interface Props {
  isOpen: boolean,
  fio?: string,
  dateBirth?: string,
  progress?: string,
  close: () => void,
  ok: (data: Student) => void  
} 

function ModalCustom(props: Props) {
  const classes = useStyles();
  const classesInput = useStylesInput();

  const [fio, setFio] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [progress, setProgress] = useState("");

  useEffect(() => {
    if (
      typeof props.fio !== "undefined" && 
      typeof props.dateBirth !== "undefined" && 
      typeof props.progress !== "undefined"
    ) {
      setFio(props.fio);
      setDateBirth(props.dateBirth);
      setProgress(props.progress);
    }
  }, [props.fio, props.dateBirth, props.progress]);

  const handleChangeFio = (event: any) => setFio(event.target.value);
  const handleChangeDateBirth = (event: any) => setDateBirth(event.target.value);
  const handleChangeProgress = (event: any) => setProgress(event.target.value);

  function ok() {
    const data: Student = {
      fio: fio,
      dateBirth: dateBirth,
      progress: progress,
      isActive: false
    }

    props.ok(data);
  }

  return (
    <Modal
      open={ props.isOpen } 
      onClose={ () => props.close() }
    >
      <div className={ classes.paper }>
        <TextField
          className={ classesInput.input }
          label="ФИО"
          placeholder="Корнев Александр Дмитриевич"
          helperText=""
          value={ fio }
          onChange={ e => handleChangeFio(e) }
        />
        <TextField
          className={ classesInput.input }
          label="Дата рождения"
          placeholder="03.07.1999"
          helperText=""
          value={ dateBirth }
          onChange={ e => handleChangeDateBirth(e) }
        />
        <TextField
          className={ classesInput.input }
          label="Успеваемость"
          placeholder="Хор"
          helperText=""
          value={ progress }
          onChange={ e => handleChangeProgress(e) }
        />
        <div className="modal__actions">
          <Button
            variant="contained"
            color="primary"
            onClick={ () => ok() }
          >Подтвердить</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={ () => props.close() }
          >Отменить</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalCustom;