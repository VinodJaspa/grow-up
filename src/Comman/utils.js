import store from "../Redux/store";

const getUserIdFromStore = () => {
    const state = store.getState(); // Get the current state from the Redux store
    return state.auth.user?.uid;
  };
  
  export { getUserIdFromStore };