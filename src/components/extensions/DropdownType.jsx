import React, { useState, useRef, useEffect } from "react";
import "./dropdown.css";

const DropdownType = ({ label, value, onChange, options }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSelect = (option) => {
        onChange(option.value);
        setIsDropdownVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        if (isDropdownVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownVisible]);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-select" onClick={toggleDropdown}>
                {value || label}
            </div>
            {isDropdownVisible && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="dropdown-item"
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownType;