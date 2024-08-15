let h1 = document.querySelector('h1');
let increment = document.querySelector('.increment');
let decrement = document.querySelector('.decrement');
let reset = document.querySelector('.reset');
let span = document.querySelectorAll('span');

// Initial state and reducer
let initialState = {
  count: 0,
  max: Infinity, // default max is Infinity, meaning no upper limit
  steps: 1, // default steps value is 1
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: Math.min(state.count + Number(state.steps), state.max), // Ensure count doesn't exceed max
      };

    case 'decrement':
      return {
        ...state,
        count: Math.max(state.count - Number(state.steps), 0), // Ensure count doesn't go below 0
      };

    case 'reset':
      return {
        ...state,
        max: Infinity,
        count: 0, // Reset count to 0
        steps: 1, // Reset steps to 1
      };

    case 'updateParams':
      return {
        ...state,
        max: action.payload.max || state.max, // Update max if provided
        steps: action.payload.steps || state.steps, // Update steps if provided
      };

    default:
      return state;
  }
}

// Create Redux store
let store = Redux.createStore(reducer);

// Event listeners for span elements to update max and steps
span.forEach((e) => {
  e.addEventListener('click', () => {
    let max = parseInt(e.dataset.max); // Default max to Infinity if not provided
    let steps = parseInt(e.dataset.step); // Default steps to 1 if not provided
    store.dispatch({ type: 'updateParams', payload: { max, steps } });
  });
});

// Event listeners for buttons
increment.addEventListener('click', () => {
  store.dispatch({ type: 'increment' });
});

decrement.addEventListener('click', () => {
  store.dispatch({ type: 'decrement' });
});

reset.addEventListener('click', () => {
  store.dispatch({ type: 'reset' });
});

// Subscribe to state changes to update UI
function render() {
  let state = store.getState();
  h1.innerText = state.count;
}

store.subscribe(render);
render(); // Initial render
