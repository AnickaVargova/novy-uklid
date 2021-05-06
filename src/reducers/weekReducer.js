export const getWeek = () => (dispatch) => {
  fetch(`http://localhost:8081/tyden`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "GET_WEEK", payload: data});
    })
    .catch((error) => console.log(error));
};

export const getCurrentWeek = () => (dispatch) => {
  fetch(`http://localhost:8081/aktualni`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "GET_WEEK", payload: data.filter(item=>!item.deleted) });
    })
    .catch((error) => console.log(error));
};

export const saveWeekOrSeason = (name) => (dispatch, getState) => {
  fetch(`http://localhost:8081/aktualni`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getState().week.find(todo=>todo.name === name)),
  })
    .then((response) => response.json)
    .catch((error) => console.log(error));

  fetch(`http://localhost:8081/pololetiAktualni`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getState().season.find(todo=>todo.name === name)),
  })
    .then((response) => response.json)
    .catch((error) => console.log(error));
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_WEEK":
      return action.payload;
    case "DELETE":
      return state.map((todo) => {
        if (todo.name === action.payload) {
          todo.deleted = true;
        }
        return todo;
      })
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.name === action.payload) {
          todo.completed = true;
        }
        return todo;
      });
    case "ASSIGN":
      return state.map((todo) => {
        if (todo.name === action.payload.taskName) {
          todo.who = action.payload.who;
        }
        return todo;
      });
    default:
      return state;
  }
};

export default reducer;
