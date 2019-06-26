const REMOVE_ITEM = "REMOVE_ITEM";
const SELECT_ITEM = "SELECT_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";

const initialState = {
  clothers: [
    "Apron",
    "Belt",
    "Cardigan",
    "Dress",
    "Earrings",
    "Fur coat",
    "Gloves",
    "Hat"
  ],
  selectedItem: null,
  inputValue: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.index,
        inputValue: action.inputValue
      };
    case UPDATE_ITEM:
      return {
        ...state,
        clothers: state.clothers.map((item, index) =>
          state.selectedItem === index ? (item = action.value) : item
        ),
        selectedItem: null
      };
    case REMOVE_ITEM:
      return {
        ...state,
        clothers: state.clothers.filter(
          (item, index) => index !== action.index
        ),
        selectedItem: null
      };
    default:
      return state;
  }
}

function render() {
  const { clothers, selectedItem, inputValue } = store.getState();
  const list = document.getElementById("cupboard");
  list.innerHTML = "";
  for (let i = 0; i < clothers.length - 1; i++) {
    if (selectedItem !== i) {
      const newLi = document.createElement("li");
      const editBtn = document.createElement("button");
      newLi.innerHTML = clothers[i];
      editBtn.innerHTML = "Edit";
      editBtn.addEventListener("click", () => {
        store.dispatch({
          type: SELECT_ITEM,
          index: i,
          inputValue: clothers[i]
        });
      });
      newLi.append(editBtn);
      list.append(newLi);
    } else {
      const input = document.createElement("input");
      input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
          if (event.target.value.trim() === "") {
            store.dispatch({
              type: REMOVE_ITEM,
              index: i
            });
          }
          store.dispatch({
            type: UPDATE_ITEM,
            value: event.target.value
          });
        }
      });
      input.value = inputValue;
      list.append(input);
    }
  }
}

const store = Redux.createStore(reducer);

store.subscribe(() => render());
render();
