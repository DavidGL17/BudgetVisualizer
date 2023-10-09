import { useState } from "react";
import MonthPicker from "./MonthPicker";

type Expense = {
  id: number;
  description: string;
  amount: number;
  date: Date;
};

const expenses: Expense[] = [
  {
    id: 1,
    description: "Groceries",
    amount: 50.0,
    date: new Date("2022-01-01"),
  },
  {
    id: 2,
    description: "Gas",
    amount: 30.0,
    date: new Date("2022-01-02"),
  },
  {
    id: 3,
    description: "Dinner",
    amount: 25.0,
    date: new Date("2022-01-03"),
  },
  {
    id: 4,
    description: "Movie",
    amount: 15.0,
    date: new Date("2022-01-03"),
  },
  {
    id: 5,
    description: "Coffee",
    amount: 5.0,
    date: new Date("2022-01-04"),
  },
];

function Home(): JSX.Element {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
  };

  const filteredExpenses = expenses.filter((expense: Expense) => {
    return (
      expense.date.getMonth() === selectedMonth.getMonth() &&
      expense.date.getFullYear() === selectedMonth.getFullYear()
    );
  });

  filteredExpenses.sort(
    (a: Expense, b: Expense) => a.date.getTime() - b.date.getTime()
  );

  const groupedExpenses: { [key: number]: Expense[] } = filteredExpenses.reduce(
    (acc: { [key: number]: Expense[] }, expense: Expense) => {
      const date = expense.date.getDate();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    },
    {}
  );

  const expenseList = Object.keys(groupedExpenses).map((date: string) => {
    return (
      <div key={date}>
        <div className="expense-date">{date}</div>
        {groupedExpenses[date].map((expense: Expense) => (
          <div key={expense.id} className="expense-item">
            {expense.description} - {expense.amount}
          </div>
        ))}
      </div>
    );
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MonthPicker value={selectedMonth} onChange={handleMonthChange} />
      {expenseList}
    </main>
  );
}

export default Home;
