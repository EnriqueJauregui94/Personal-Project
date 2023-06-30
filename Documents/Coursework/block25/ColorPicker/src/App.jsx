
import React, { useState } from 'react';

const Picker = () => {
  const [selectedColor, setSelectedColor] = useState("")


  return (
    <div id="container">
      <div id="navbar">
        <div>Currently selected: </div>
        <div className={selectedColor}>{selectedColor}</div>
      </div>
      <div id="colors-list">
        <Color color="green" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
        <Color color="red" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
        <Color color="black" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />

      </div>
    </div >
  );
};

const Color = ({ color, setSelectedColor, selectedColor }) => {
  const handleClick = () => {
    setSelectedColor((prevColor) => (prevColor === color ? "" : color));
  };


  return (
    <div
      className={`color-circle ${color} ${selectedColor === color ? "selected" : ""}`}
      onClick={handleClick}
    ></div>
  );
};

const App = () => {
  return <Picker />;
};


export default App;
