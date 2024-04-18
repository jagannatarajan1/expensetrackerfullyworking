import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
const localModeData = localStorage.getItem("mode");
const modeData = localModeData ? JSON.parse(localModeData) : false;
// const emailSelector = useSelector((state) => state.auth.Email);

// Define the initial state
const initialState = {
  expenselist: [],
  loading: false,
  error: null,
  editelement: [],
  reload: false,
  totalExpenses: 0,
  darkmode: modeData,
  Email: localStorage.getItem("Email"),
};

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (props, thunkAPI) => {
    const state = thunkAPI.getState();
    const tryToEdit = state.expense.editelement;
    const edit = !!(Object.keys(tryToEdit).length > 0);
    console.log(edit);
    console.log(state.expense.editelement);
    console.log(state);

    try {
      const email = state.expense.Email;
      console.log(email);

      const tryToEdit = state.expense.editelement;
      const edit = Object.keys(tryToEdit).length > 0;

      if (edit) {
        console.log("Editing expense:", props);
        await fetch(
          `https://expensetracker-c084c-default-rtdb.firebaseio.com/${email}/${props.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              enterdcategory: props.enterdcategory,
              enterddescription: props.enterddescription,
              enterdmoneyspend: props.enterdmoneyspend,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        const response = await fetch(
          `https://expensetracker-c084c-default-rtdb.firebaseio.com/${email}.json`,
          {
            method: "POST",
            body: JSON.stringify({
              enterdcategory: props.enterdcategory,
              enterddescription: props.enterddescription,
              enterdmoneyspend: props.enterdmoneyspend,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add expense");
        }
        const data = await response.json();
        props = { ...props, id: data.name };
        return props;
      }
    } catch (error) {
      console.error("Error in addExpense:", error);
      throw error;
    }
  }
);
export const expenseReducers = createSlice({
  name: "expensetrackerReducers",
  initialState,
  reducers: {
    edit: (state, action) => {
      state.editelement = action.payload;
    },
    reloadaction: (state) => {
      state.reload = !state.reload;
    },
    totalExpenseadder: (state, action) => {
      state.totalExpenses = action.payload;
    },
    modeChange: (state) => {
      state.darkmode = !state.darkmode;
      localStorage.setItem("mode", JSON.stringify(state.darkmode));
    },
    emailReducer: (state, action) => {
      state.Email = action.payload.email.replace("@gmail.com", "");
      state.reload = !state.reload; // Corrected reload state update
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
      console.log(state);
    });
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.expenselist.push(action.payload);
      state.editelement = "";
      state.reload = !state.reload;
      console.log(state);
    });
    builder.addCase(addExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(state);
    });
  },
});
export const expenseAction = expenseReducers.actions;
export default expenseReducers.reducer;
