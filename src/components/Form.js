import React from "react";
import FormCell from "./FormCell";
import { useSelector } from "react-redux";

function Form() {
  const people = ["Máma", "Táta", "Kuba", "Matěj", "zatím nikdo"];
  const week = useSelector((state) => state.meta.week);
  const todos = useSelector((state) => (week ? state.week : state.season).filter(todo=>!todo.deleted));

  const peopleList = people.map((person) => (
    <th className="radioContainer" key={person}>
      {person}
    </th>
  ));

  let activityList = todos.map((todo) => (
    <FormCell key={todo.name} todo={todo} people={people} />
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            {week ? <th className="cancel" rowSpan="2"></th> : null}
            <th className="todoName" rowSpan="2">
              Činnost
            </th>
            <th className="todoTime" rowSpan="2">
              Čas
            </th>
            <th className="todoWho" colSpan="5">
              Kdo to udělá
            </th>
            <th className="todoFinished" rowSpan="2">
              Splněno
            </th>
          </tr>
          <tr>{peopleList}</tr>
        </thead>
        <tbody>{activityList}</tbody>
      </table>
      <div id="tableBottom"></div>
    </div>
  );
}

export default Form;
