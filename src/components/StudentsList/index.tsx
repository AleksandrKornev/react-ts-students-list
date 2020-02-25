import React from "react";
import { TableBody } from "@material-ui/core";

import { Students } from "../../types";

import StudentItem from "../StudentItem";

interface Props {
  students: Students
}

function StudentsList(props: Props) {
  return (
    <TableBody>
      {
        props.students.map((student, index) =>
          <StudentItem
            student={ student }
            index={ index }
            key={ index }
          />
        )
      }
    </TableBody>
  )
}

export default StudentsList;