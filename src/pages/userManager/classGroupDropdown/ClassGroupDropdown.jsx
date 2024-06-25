import { useState } from "react";
import "./ClassGroupDropdown.css"
import useToggle from './../../../hooks/useToggle';

const ClassGroupDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useToggle()


  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen()}>
        {selectedOption || "Select class group"}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassGroupDropdown