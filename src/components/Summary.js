import React, { useState } from "react";
import { useSelector } from "react-redux";
import KdoKolik from "./KdoKolik";
import OsobaCas from "./OsobaCas";
import styled from "styled-components";
import { countHours, timeCount } from "../utils";

const MalyNadpis = styled.h3`
  text-decoration: underline;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${(props) => props.theme.color};
`;

function Summary() {
  console.log("rendering");
  const week = useSelector((state) => state.meta.week);
  const todos = useSelector((state) => (week ? state.week : state.season));

  const [percentTime, setPercentTime] = useState({
    mama: { name: "Máma", percent: 25, time: (timeCount(todos) / 100) * 25 },
    tata: { name: "Táta", percent: 25, time: (timeCount(todos) / 100) * 25 },
    kuba: { name: "Kuba", percent: 25, time: (timeCount(todos) / 100) * 25 },
    matej: { name: "Matěj", percent: 25, time: (timeCount(todos) / 100) * 25 },
  });

  let sumPercent =
    percentTime.mama.percent +
    percentTime.tata.percent +
    percentTime.kuba.percent +
    percentTime.matej.percent;

  function ukazOznameni(sumPercent) {
    if (sumPercent < 100) {
      return <p className="oznameni">Celkový čas nedosahuje 100%.</p>;
    } else if (sumPercent > 100) {
      return <p className="oznameni">Celkový čas přesahuje 100%.</p>;
    }
  }

  let timeTable = Object.entries(percentTime).map((person) => (
    <KdoKolik
      key={person[1].name}
      person={person[1]}
      changeTimePerson={(e) => {
        changeTimePerson(person[1], e);
      }}
    />
  ));

  let minTable = Object.entries(percentTime).map((person) => (
    <OsobaCas
      key={person[1].name}
      person={person[1]}
      countTime={timeCount(todos)}
    />
  ));

  function changeTimePerson(person, e) {
    for (let property in percentTime) {
      if (percentTime[property].name === person.name) {
        setPercentTime({
          ...percentTime,
          [property]: {
            ...percentTime[property],
            percent: Number(e.target.value),
            time: (timeCount(todos) / 100) * Number(e.target.value),
          },
        });
      }
    }
  }

  return (
    <div>
      <MalyNadpis>
        Čas {week ? "týdenního" : "jarního"} úklidu celkem:{" "}
        {countHours(timeCount(todos))}
      </MalyNadpis>
      <MalyNadpis>Jakou část kdo udělá:</MalyNadpis>
      <table className="kdoKolik">
        <tbody>{timeTable}</tbody>
      </table>
      <div>{ukazOznameni(sumPercent)}</div>

      <div>
        <MalyNadpis>Čas na osobu:</MalyNadpis>
        <table className="kdoKolik">
          <tbody>{minTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;
