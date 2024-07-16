import React, { useState } from "react";

const Dropdown = ({options, onSelect}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelect(value);
    };


    return (
        <div>
            <select value={selectedValue} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );

};


export default Dropdown;