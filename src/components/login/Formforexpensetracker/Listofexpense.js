import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { expenseAction } from "../../store/redux/expenseReducers";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

const Listofexpense = () => {
  const dispatch = useDispatch();
  const [renderdata, setrenderdata] = useState([]);
  const [dataWithoutKey, setdataWithoutKey] = useState([]);
  const reloading = useSelector((state) => state.expense.reload);
  const emailSelector = useSelector((state) => state.expense.Email);

  const editbuttonhandler = (expense) => {
    dispatch(expenseAction.edit(expense));
  };

  const handleDownloadCSV = () => {
    const csvData = dataWithoutKey
      .map(
        (expense) =>
          `${expense.enterdcategory},${expense.enterddescription},${expense.enterdmoneyspend}`
      )
      .join("\n");
    const downloadExpenses = document.getElementById("downloadexpense");
    const downloadBlob = new Blob([csvData]);
    downloadExpenses.href = URL.createObjectURL(downloadBlob);
  };

  const deletebuttonhandler = async (expense) => {
    try {
      const response = await fetch(
        `https://expensetracker-c084c-default-rtdb.firebaseio.com/${emailSelector}/${expense.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      dispatch(expenseAction.reloadaction());
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const useeffectfunction = async () => {
      try {
        const response = await fetch(
          `https://expensetracker-c084c-default-rtdb.firebaseio.com/${emailSelector}.json`
        );
        const data = await response.json();

        const downloadcv = [];
        for (const element in data) {
          downloadcv.push(data[element]);
        }
        setdataWithoutKey(downloadcv);

        const fetchedData = [];
        for (const key in data) {
          fetchedData.push({
            id: key,
            ...data[key],
          });
        }
        setrenderdata(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };
    useeffectfunction();
  }, [reloading, emailSelector]);

  useEffect(() => {
    let totalExpense = 0;
    handleDownloadCSV();

    renderdata.forEach((expense) => {
      totalExpense += Number(expense.enterdmoneyspend);
    });
    console.log(totalExpense);
    dispatch(expenseAction.totalExpenseadder(totalExpense));
    // eslint-disable-next-line
  }, [reloading, renderdata]);

  return (
    <React.Fragment>
      <Container className="w-50 mt-4 ">
        <Table hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Category</th>
              <th>Description</th>
              <th>Money Spend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderdata.map((expense, index) => (
              <tr key={expense.id}>
                <td>{index}</td>
                <td>{expense.enterdcategory}</td>
                <td>{expense.enterddescription}</td>
                <td>{expense.enterdmoneyspend}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => editbuttonhandler(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deletebuttonhandler(expense)}
                  >
                    Delete
                  </Button>
                  {expense.enterdmoneyspend >= 10000 && (
                    <Button>activate Premium Button</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
};

export default Listofexpense;
