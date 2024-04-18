import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../store/redux/expenseReducers";
import { expenseAction } from "../../store/redux/expenseReducers";
const Formforexpensetracker = () => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.expense.editelement);
  const totalExpensefromstore = useSelector(
    (state) => state.expense.totalExpenses
  );
  console.log(totalExpensefromstore);
  const modeHandler = () => {
    dispatch(expenseAction.modeChange());
  };

  const allstate = useSelector((state) => state);
  console.log(allstate);
  console.log(edit);

  const tryToEdit = !!(Object.keys(edit).length > 0);
  console.log(tryToEdit);
  const [updatemoney, setupdatemoney] = useState("");
  const [updatecategory, setupdatecategory] = useState("Food");
  const [updatedescription, setupdatedescription] = useState("");
  const [updateid, setupdateid] = useState("");
  useEffect(() => {
    if (tryToEdit) {
      console.log("useeffect in edit");
      setupdatemoney(edit.enterdmoneyspend);
      setupdatecategory(edit.enterdcategory);
      setupdatedescription(edit.enterddescription);
      setupdateid(edit.id);
    }
  }, [edit, tryToEdit]);
  const moneyhandler = (event) => {
    setupdatemoney(event.target.value);
  };
  const categoryhandler = (event) => {
    setupdatecategory(event.target.value);
  };
  const descriptionhandler = (event) => {
    setupdatedescription(event.target.value);
  };
  console.log(updatemoney, updatecategory, updatedescription);
  const expensetrackerhandler = (event) => {
    event.preventDefault();
    const enterdmoneyspend = updatemoney;
    const enterddescription = updatedescription;
    const enterdcategory = updatecategory;
    const id = updateid;
    const enterdexpese = {
      enterdmoneyspend,
      enterddescription,
      enterdcategory,
      id,
    };
    dispatch(addExpense(enterdexpese));
    console.log("kakak");
    setupdatemoney("");
    setupdatecategory("Food");
    setupdatedescription("");
  };
  return (
    <Container className="w-50">
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter the money you spend</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the money"
            value={updatemoney}
            onChange={moneyhandler}
          />
        </Form.Group>
        <Form.Group controlId="formGridcategory">
          <Form.Label>Category</Form.Label>
          <Form.Select value={updatecategory} onChange={categoryhandler}>
            <option>Food</option>
            <option>Petrol</option>
            <option>Salary</option>
            <option>Rent</option>
            <option>Gym membership</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Enter the description of the expense</Form.Label>
          <Form.Control
            type="text"
            placeholder="Describe the expense"
            value={updatedescription}
            onChange={descriptionhandler}
          />
        </Form.Group>
        <Button className="mt-3" onClick={expensetrackerhandler}>
          {tryToEdit ? "Update Expense" : "Add Expense"}
        </Button>
        {totalExpensefromstore >= 10000 && (
          <Button className="ms-5 mt-3" variant="dark" onClick={modeHandler}>
            Activate Premium Button
          </Button>
        )}
        <a
          id="downloadexpense"
          className="mt-5 ms-5"
          href=" "
          download="expense.csv"
        >
          Download expenses
        </a>
      </Form>
    </Container>
  );
};
export default Formforexpensetracker;
