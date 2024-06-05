import React, { useEffect, useState } from 'react';

const CurrencyRow = ({ data }) => {
  const [countries, setCountries] = useState(data.country);
  const [inputValue, setInputValue] = useState(''); // State for the current input field

  const addCountryInput = (currentIndex) => {
    const updatedCountries = [...countries];
    updatedCountries.splice(currentIndex + 1, 0,  inputValue ); // Insert new object with current input value
    setCountries(updatedCountries);
    setInputValue(''); // Reset input value after adding
  };

  const updateCountry = (index, newCountry) => {
    const updatedCountries = [...countries];
    updatedCountries[index] = { ...updatedCountries[index],newCountry };
    setCountries(updatedCountries);
    
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handlekro = async()=>{
    await fetch(`http://localhost:4000/editCurrencyById`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: data._id,country:countries  }),
      })
    console.log(countries)
  }
  

  return (
    <tr>
      <td>{data.name} & {data.symbol}</td>
      <td className="flexer">
        {countries.map((country, index) => (
          <tr key={index}>
            {/* Other cells in your table */}
            <td>
              {<input
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => updateCountry(index, e.target.value)}
              />}
            </td>
          </tr>
        ))}
        {/* Add a separate row for the "Add Country" button */}
        <tr>
          {/* Other cells set to empty strings */}
          <td>
            <input
              type="text"
              placeholder="Enter Country"
              value={inputValue} // Use state for current input
              onChange={handleInputChange} // Separate handler for input changes
            />
          </td>
        </tr>
        <button onClick={() => addCountryInput(countries.length)}>Add Country</button>
      </td>
      <td>
        <button className="action-button" onClick={handlekro}>Update</button>
        <button className="action-button">Remove</button>
      </td>
    </tr>
  );
};

export default CurrencyRow;
