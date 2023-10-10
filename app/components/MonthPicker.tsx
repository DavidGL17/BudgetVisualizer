import React, { useState, ChangeEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MonthPicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: any, event: any) => {
    const date = Array.isArray(value) ? value[0] : value;
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <Calendar
      onClickMonth={handleDateChange}
      value={selectedDate}
      view="year"
    />
  );
}

export default MonthPicker;
