import React, { useEffect, useState } from 'react';
import './order.css';
import { useParams } from 'react-router-dom';
function Order() {
  const [apidata,setApidata] = useState(null);
  const params = useParams();
  const orderId =params.id;
  const [selectedBulkAction, setSelectedBulkAction] = useState("");
  const [maininput,setMaininput] = useState({
    date:'',
    time:'',
  })
  const changehandler = (e) => {
    e.preventDefault();
    setMaininput({ ...maininput, [e.target.name]: e.target.value })
  }
  const handleBulkActionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBulkAction(selectedValue);
  };

  const getinfo = async(orderId) =>{
    await fetch(`http://localhost:4000/getOrdersbyID/${orderId}`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })
  }
  const update = async()=>{
    console.log(maininput.date+"T"+maininput.time+":00")
    if(maininput){
    await fetch(`http://localhost:4000/updateOrder/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ date : maininput.date+"T"+maininput.time+":00" , status:selectedBulkAction}),
        })
      }
      getinfo(orderId)
  }
  useEffect(()=>{
    getinfo(orderId);
  },[orderId]);

  

  return (<>
    {apidata && (<div className="order-details">
      <h2>Order #{apidata.order_no} details</h2>
      <p>
        Payment via Credit Card/Debit Card/NetBanking (pay_OBPcMHD24wAsbe). Paid on {apidata.date.slice(0,10)} @ {apidata.date.slice(11,16)}<br />
        Customer IP: {apidata.user_ip}
      </p>
      <div className="order-sections">
        <div className="order-section">
          <h3>General</h3>
          <label>Date created:</label>
          <input type="date" name="date" onChange={changehandler} defaultValue={`${apidata.date.slice(0,10)}`} />
          <input type="time" name="time" onChange={changehandler}defaultValue={`${apidata.date.slice(11,16)}`} />
          <label>Status:</label>
          <select value={selectedBulkAction} onChange={handleBulkActionChange} defaultValue={apidata.status}>
            <option>Processing</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
          <label>Customer:</label>
          <select>
            <option>Guest</option>
            <option>Registered</option>
          </select>
        </div>
        <div className="order-section">
          <h3>Billing</h3>
          <p>Rashmi Roy</p>
          <p>DT-23, Armapur Estate</p>
          <p>Opposite Kendriya Vidyalaya No-1</p>
          <p>Kanpur 208009</p>
          <p>Uttar Pradesh</p>
          <p>Email address: <a href="mailto:rashmi.sengupta@gmail.com">{apidata.email}</a></p>
          <p>Phone: <a href="tel:7989600388">{apidata.phone}</a></p>
        </div>
        <div className="order-section">
          <h3>Shipping</h3>
          <p>Rashmi Roy</p>
          <p>DT-23, Armapur Estate</p>
          <p>Opposite Kendriya Vidyalaya No-1</p>
          <p>Kanpur 208009</p>
          <p>Uttar Pradesh</p>
        </div>
      </div>
      <button className="generate-invoice-btn" onClick={update}>Generate Invoice</button>
    </div>)}
    </>
  );
}

export default Order;
