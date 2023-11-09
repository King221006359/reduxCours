import redux, { applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger'; // Correct import statement for redux-logger
import pkg from 'redux-logger';
const { createLogger } = pkg;
// Extract the 'createStore', 'combineReducers', and 'bindActionCreators' functions from the 'redux' object
const { createStore, combineReducers, bindActionCreators } = redux;
const logger = createLogger(); // Create the logger instance
// Define action types as constants
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// Action creator functions that return action objects
function orderCake() {
  return {
    type: CAKE_ORDERED,
    qty: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    qty: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    qty: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    qty: qty,
  };
}

// Reducer functions
const cakeReducer = (state = { numOfCakes: 10 }, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.qty,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.qty,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = { numOfIcecream: 20 }, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecream: state.numOfIcecream - action.qty,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecream: state.numOfIcecream + action.qty,
      };
    default:
      return state;
  }
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});

// Create a Redux store by passing the rootReducer function and initial state to createStore
const store = createStore(rootReducer, applyMiddleware(logger));

// Log the initial state of the store to the console
console.log('Initial state:', store.getState());

// Subscribe to the store to listen for state changes and log updated state to the console
const unsubscribe = store.subscribe(() => {});

// Dispatch actions to update the state
const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream();
actions.restockIcecream(2);

// Unsubscribe from the store to stop listening for further state changes
unsubscribe();