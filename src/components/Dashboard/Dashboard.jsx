import React, { useState, useEffect } from "react";
import WalletExpensesComponent from "../WalletExpenses/WalletExpenses";
import ExpensesTable from "../ExpenseTable/ExpenseTable";
import LineBarChart from "../LineBarChart/LineBarChart";
import "./Dashboard.css";

function Dashboard() {
  const [walletBalance, setWalletBalance] = useState(
    JSON.parse(localStorage.getItem("walletBalance")) || 5000
  );

  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("walletBalance", JSON.stringify(walletBalance));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const handleExpenseListUpdate = (newExpenses) => {
    setExpenses(newExpenses);
    const totalExpenses = newExpenses.reduce((total, expense) => total + parseInt(expense.price, 10), 0);
    setWalletBalance((prevBalance) => JSON.parse(localStorage.getItem("totalBalance")) - totalExpenses);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseInt(expense.price, 10), 0);
  };

  const categories = ["Food", "Entertainment", "Travel", "Shopping", "Grocery", "Others"];

  return (
    <div className="dashboard-container">
      <h1>Expense Tracker</h1>
      <WalletExpensesComponent
        handleExpenseListUpdate={handleExpenseListUpdate}
        categories={categories}
        expenses={expenses}
        setExpenses={setExpenses}
        getTotalExpenses={getTotalExpenses}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />
      {expenses.length > 0 && (
        <div className="dashboard-info-container">
          <ExpensesTable
            expenseData={expenses}
            handleExpenseListUpdate={handleExpenseListUpdate}
            categories={categories}
          />
          <LineBarChart data={expenses} categories={categories} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
