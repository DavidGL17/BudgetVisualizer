"use client";
import { useState } from "react";
import MonthPicker from "./components/MonthPicker";

type Expense = {
  id: number;
  description: string;
  amount: number;
  date: Date;
};

function Home(): JSX.Element {
  // // by default selectedMonth is the current month
  // const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  // const handleMonthChange = (date: Date) => {
  //   setSelectedMonth(date);
  // };

  // const filteredExpenses = expenses.filter((expense: Expense) => {
  //   return (
  //     expense.date.getMonth() === selectedMonth.getMonth() &&
  //     expense.date.getFullYear() === selectedMonth.getFullYear()
  //   );
  // });

  // filteredExpenses.sort(
  //   (a: Expense, b: Expense) => a.date.getTime() - b.date.getTime()
  // );

  // const groupedExpenses: { [key: number]: Expense[] } = filteredExpenses.reduce(
  //   (acc: { [key: number]: Expense[] }, expense: Expense) => {
  //     const date = expense.date.getDate();
  //     if (!acc[date]) {
  //       acc[date] = [];
  //     }
  //     acc[date].push(expense);
  //     return acc;
  //   },
  //   {}
  // );

  // const expenseList = Object.keys(groupedExpenses).map((date: string) => {
  //   return (
  //     <div key={date}>
  //       <div className="expense-date">{date}</div>
  //       {groupedExpenses[date].map((expense: Expense) => (
  //         <div key={expense.id} className="expense-item">
  //           {expense.description} - {expense.amount}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {expenseList} */}
      <MonthPicker />
    </main>
  );
}

export default Home;
