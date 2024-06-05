import React from 'react';
import './multigeneral.css';
import { useEffect, useState } from 'react';

const Currency = ({onSectionClick}) => {
  const handleClick = (section) => {
    onSectionClick(section); // Call parent's function with clicked section
  };
  
  const [apidata, setApidata] = useState(null);
  const [count, setcount] = useState(0);
  const [start, setStart] = useState(0);
  const [selectedBulkAction, setSelectedBulkAction] = useState("");
  const [formdata, setFormdata] = useState({
    input_rate: 0,
    input_fee: 0
  });
  const handleChange = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }
  var hello = 0;
  const handleCountChange = (newCount) => {
    console.log(newCount);
    setcount(newCount);
    hello = newCount * 5;
    setStart(hello);
  }

  const searcherji = async (formdata) => {
    await fetch(`http://localhost:4000/searchGift/${formdata.search}`)
      .then((res) => res.json())
      .then(setStart(start))
      .then((data) => { setApidata(data) })

  }
  const updateCurrency = async (orderId, selectedBulkAction, formdata) => {
    console.log("HIIII",selectedBulkAction)
    console.log("Okkkk",formdata)
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
        body: JSON.stringify({ _id: orderId, exchangeRateAndFee}),
      })
    }
  }
  const handleDeletion = async(orderId) =>{
    await fetch(`http://localhost:4000/deleteCurrency`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: orderId}),
      })

      getAllOrders();
  }

  const handleBulkActionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBulkAction(selectedValue);
  };

  const handleBulkActionApply = async (orderId) => {
    if (!selectedBulkAction && !formdata) {
      return; // Do nothing if no bulk action or orders selected
    }

    await updateCurrency(orderId, selectedBulkAction, formdata);
    setFormdata(0)

    getAllOrders(); // Clear selected orders after applying
  };


  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllCurrency`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })

  }
  useEffect(() => {
    if (formdata.search) {
      searcherji(formdata)
    }
    else {
      getAllOrders();
    }

  }, [formdata]);


  useEffect(() => {

    console.log(start)
  }, [count])
  useEffect(() => {


    if (!formdata.search) {
      getAllOrders();
    }
  }, []);


  return (
    <div className='toptop'>
      <div className="setting-header">
        <div className="tab" onClick={() => handleClick('General')}>General</div>
        <div className="tab" onClick={() => handleClick('Location')}>Location</div>
        <div className="tab" onClick={() => handleClick('Check out')}>Check out</div>
      </div>
      <div className="currency-settings">
        <div className="toggle-container">
          <div className="toggle-option">
            <label>Enable Multi Currency</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="toggle-option">
            <label>Use Exchange Rate</label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
        <div className="currency-options">
          <label>Currency Option :</label>
          <table>
            <thead>
              <tr>
                <th>Default</th>
                <th>Hidden</th>
                <th>Currency</th>
                <th>Display Position</th>
                <th>Exchange rate + Fee</th>
                <th>Thousand separator</th>
                <th>Decimal separator</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apidata && apidata.map((row, index) => (
                <tr key={index}>
                  <td><input type="checkbox" defaultChecked={row.defaultChecked} /></td>
                  <td>{row.ishidden}</td>
                  <td>{row.name}</td>
                  <td>
                    <select className="down" onChange={handleBulkActionChange} defaultValue={row.displayPosition}>
                      <option>Left</option>
                      <option>Right</option>
                      <option>Top</option>
                      <option>Bottom</option>
                    </select>
                  </td>
                  <td>
                    <div className="exchange-rate">
                      <input type="number" placeholder="Input Rate" name="input_rate" onChange={handleChange} />
                      +
                      <input type="number" placeholder="Input Fee" name="input_fee" onChange={handleChange} />
                    </div>
                  </td>
                  <td>{row.thousandSeperator}</td>
                  <td>{row.decimalSeperator}</td>
                  <td>
                    <div className="sidebutton">
                      <button onClick={() => { handleBulkActionApply(row._id) }}>Update</button>
                      <button onClick={() => { handleDeletion(row._id) }}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Currency;
