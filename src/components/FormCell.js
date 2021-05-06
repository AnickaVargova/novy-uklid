import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { findTheme } from "../utils.js";
import { saveWeekOrSeason } from "../reducers/weekReducer";

function FormCell(props) {
  const dispatch = useDispatch();
  const people = props.people;
  const themeObj = useSelector((state) =>
    findTheme(props.todo.who, state.theme)
  );

  const week = useSelector((state) => state.meta.week);

  const background = props.todo.completed
    ? themeObj?.completed
    : themeObj?.background;

  const inputList = people.map((person) => (
    <td className="radioContainer" key={person}>
      <input
        type="radio"
        value={person}
        name={props.todo.name}
        onChange={() => {
          dispatch({
            type: "ASSIGN",
            payload: { taskName: props.todo.name, who: person },
          });
          dispatch(saveWeekOrSeason(props.todo.name));
        }}
        disabled={props.todo.completed}
      ></input>
    </td>
  ));

  return (
    <tr style={{ background }} data-testid="formcell">
      {week ? (
        <td
          className="cancel"
          onClick={() => {
            dispatch({ type: "DELETE", payload: props.todo.name });
            dispatch(saveWeekOrSeason(props.todo.name));
          }}
          data-testid="delete"
        >
          x
        </td>
      ) : null}
      <td className="todoName">{props.todo.name}</td>
      <td className="todoTime">{props.todo.time} min</td>
      {inputList}
      <td className="todoFinished">{props.todo.completed ? "ano" : "ne"}</td>
    </tr>
  );
}

export default FormCell;
