import produce from "immer";
import {ActionTypes} from "./actionTypes.js";

const initialState = {
  users: {}
};

// createReducer as suggested in "reducing boilerplate"
function createReducer(handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      // let's integrate immer at this level for ease!
      let test = produce(state, draft => {
        const handler = handlers[action.type];
        return handler(draft, action)
      });
      console.log(initialState, test);
      return test;
    } else {
      return state
    }
  }
}

// In the real world, your server would probably assign the ID
// For the sake of this example, we'll auto-increment a counter
let idMaker = 0;

export const userReducer = createReducer({
  [ActionTypes.AddUser]: (state, action) => {
    console.log(action)
    const email = action.userData.email.trim();
    const name = action.userData.name.trim();
    const username = action.userData.username.trim();
    const nextId = idMaker++;

    state.users[nextId] = {
      id: nextId,
      email: email,
      name: name,
      username: username
    };
    console.log(state.users);
  },
});

