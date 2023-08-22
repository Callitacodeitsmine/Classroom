import React, { useState } from 'react';
import './App.css';
import jsonData from './name.json';  // Adjust the path if needed

function App() {
  const [weekData] = useState(jsonData.data);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dataMatch, setDataMatch] = useState(null);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    setSelectedSlot(null); // Clear selected slot when day changes
    setDataMatch(null); // Clear data match status
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setSelectedSlot(null); // Clear selected slot when time changes
    setDataMatch(null); // Clear data match status
  };

  const handleSubmit = () => {
    const selectedDayData = weekData.find(day => day.day === selectedDay);
    if (selectedDayData) {
      const selectedSlotData = selectedDayData.slots.find(slot => slot.time === selectedTime);
      if (selectedSlotData) {
        setSelectedSlot(selectedSlotData);
        setDataMatch(true);
      } else {
        setSelectedSlot(null);
        setDataMatch(false);
      }
    } else {
      setSelectedSlot(null);
      setDataMatch(false);
    }
  };

  return (
    <div className="App">
      <h1>Week's Schedule</h1>
      <div className="selectors">
        <select value={selectedDay} onChange={handleDayChange}>
          <option value="">Select Day</option>
          {weekData.map(day => (
            <option key={day.day} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value="">Select Time</option>
          {selectedDay && weekData.find(day => day.day === selectedDay)?.slots.map(slot => (
            <option key={slot.time} value={slot.time}>
              {slot.time}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {dataMatch === true && (
        <div>
          <div className="selected-slot-details">
            <h2>Selected Slot Details</h2>
            <p>Day: {selectedDay}</p>
            <p>Time: {selectedSlot.time}</p>
            <p>Class: {selectedSlot.name}</p>
          </div>
        </div>
      )}
      {dataMatch === false && <p>Data not match</p>}
    </div>
  );
}

export default App;
