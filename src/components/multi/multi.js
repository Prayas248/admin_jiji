import React from 'react';
import './multi.css';
import CurrencyRow from './multibox';
import { useState,useEffect } from 'react';
import './multibox.css';

const LocationSettings = ({ onSectionClick }) => {
  const handleClick = (section) => {
    onSectionClick(section); // Call parent's function with clicked section
  };
  const [apidata, setApidata] = useState(null);
  const [selectedBulkAction, setSelectedBulkAction] = useState("");
  const [formdata, setFormdata] = useState({
    input_rate: 0,
    input_fee: 0
  });
  const handleChange = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const updateCurrency = async (orderId, selectedBulkAction, formdata) => {
    console.log("HIIII", selectedBulkAction)
    console.log("Okkkk", formdata)
    if (selectedBulkAction && formdata.input_fee && formdata.input_rate) {
      const exchangeRateAndFee = parseFloat(formdata.input_fee) + parseFloat(formdata.input_rate);
      await fetch(`http://localhost:4000/editCurrencyById`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: orderId, displayPosition: selectedBulkAction, exchangeRateAndFee }),
      })
    }
    else if (!selectedBulkAction && formdata) {
      const exchangeRateAndFee = parseFloat(formdata.input_fee) + parseFloat(formdata.input_rate);
      await fetch(`http://localhost:4000/editCurrencyById`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: orderId, exchangeRateAndFee }),
      })
    }
  }
  const handleDeletion = async (orderId) => {
    await fetch(`http://localhost:4000/deleteCurrency`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: orderId }),
    })

    getAllOrders();
  }




  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllCurrency`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })

  }


  useEffect(() => {


    
      getAllOrders();
    
  }, []);


  return (
    <>
      <div className="multitopButtons">

        <div className="tab" onClick={() => handleClick('General')}>General</div>
        <div className="tab" onClick={() => handleClick('Location')}>Location</div>
        <div className="tab" onClick={() => handleClick('Check out')}>Check out</div>

      </div>
      <div className="location-settings">
        <div className="switches">
          <label className="get">
            <p>Auto Detect Currency</p>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="get">
            <p>Currency by Country</p>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
        <table className="currency-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Thousand separator</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='tablehji'>
          {apidata && apidata.map((rowData, index) => (
            <CurrencyRow key={index} data={rowData} /> // Pass each row data as props
          ))}
          </tbody>
        </table>
        <button className="get-country-button">Get Country By Currency</button>
        <button className="save-button">Save</button>
      </div>
    </>
  );
};

export default LocationSettings;
