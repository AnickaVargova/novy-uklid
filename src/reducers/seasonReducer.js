export const getSeason = () => (dispatch) => {
  fetch(`http://localhost:8081/pololeti`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "GET_SEASON", payload: data });
    })
    .catch((error) => console.log(error));
};

export const getCurrentSeason = () => (dispatch) => {
  fetch(`http://localhost:8081/pololetiAktualni`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "GET_SEASON", payload: data });
    })
    .catch((error) => console.log(error));
};

export const saveSeason = (name) => (dispatch, getState) => {
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
    case "GET_SEASON": {
      console.log("fetching");
      return action.payload;
    }
    case "DO_TODAY":
      return state.map((todo) => {
        if (todo.name === action.payload) {
          todo.tyden = true;
          todo.doToday = true;
        }
        return todo;
      });
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
