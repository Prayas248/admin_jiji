import "./invoice.css";
import { InvoiceCounter } from "./invoicecounter";
import { Toggle } from "./toggle";
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const invoiceData = [
  {
    code: "9JSX-3F8K-WaRy",
    order: "19990",
    balance: "0.00",
    redeem: "In Order: #19990",
    expiry: "23-05-2014",
    recipient: "digital marketing@ ogi vetechnology.com"
  },
  {
    code: "P7Q9-B6T2-Y1M4",
    order: "",
    balance: "101",
    redeem: "",
    expiry: "Unlimited",
    recipient: ""
  }
];

function Invoice() {
  const [apidata, setApidata] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]); // State to store selected order IDs
  const [selectedBulkAction, setSelectedBulkAction] = useState("");
  const [count, setcount] = useState(0);
  const [start, setStart] = useState(0);
  const [formdata, setFormdata] = useState({
    search: ""
  });
  const changehandler = (e) => {
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

  const navigate = useNavigate();

  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllGiftCard`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })

  }
  const handleCheckboxChange = (event, orderId) => {
    const isChecked = event.target.checked;
    const newSelectedOrders = [...selectedOrders]; // Create a copy of the state

    if (isChecked) {
      newSelectedOrders.push(orderId); // Add ID to selected list if checked
    } else {
      const index = newSelectedOrders.indexOf(orderId); // Find the index of the ID
      if (index > -1) {
        newSelectedOrders.splice(index, 1); // Remove ID if unchecked
      }
    }

    setSelectedOrders(newSelectedOrders); // Update the state with the modified array
  };
  
  const updateOrder = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/deleteGiftCard`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ _id: orderId }),
        })
  }
  const updateKrdo = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/editGiftCardById`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ enable : newStatus , _id:orderId}),
        })
  }
  const updateGift = async (orderId,newStatus) =>{
    console.log("hh")
    await fetch(`http://localhost:4000/editGiftCardById`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ enable : newStatus , _id:orderId}),
        })
        console.log("done")
        getAllOrders();
  }
  const handleBulkActionChange = (event) => {
    const selectedValue = event.target.value;
  setSelectedBulkAction(selectedValue);
  };

  const handleBulkActionApply = async () => {
    if (!selectedBulkAction || !selectedOrders.length) {
      return; // Do nothing if no bulk action or orders selected
    }

    for (const orderId of selectedOrders) {
      
      if(selectedBulkAction === "Delete"){
      await updateOrder(orderId, selectedBulkAction); 
      }// Update each order status
      else if(selectedBulkAction === "Enable"){
        await updateKrdo(orderId, "true"); 
      }
    }

    setSelectedOrders([]);
    getAllOrders(); // Clear selected orders after applying
  };
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
    <div className="hiii">
      <div className="topButtons">
        <Link to="/coupon"><button className="coupons"> Coupons</button></Link>
        <Link to="/giftcard"><button className="giftCards">Gift card</button></Link>
      </div>
      <div className="mainInvoiceContainer">
        <div className="middleInputs">
          <button className="but" onClick={()=>{navigate('/maingift')}}>Add new</button>
          <button className="but">import/export</button>
        </div>

        <div className="redButtonsContainer">
          <button>ALL</button>
          <button>Redeemed</button>
          <button>Not Redeemed</button>
        </div>

        <div className="lastInputContainer">
          <div className="leftInputs">
          <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Bulk action</option>
            <option>Delete</option>
            <option>Enable</option>
            </select>
            <button onClick={handleBulkActionApply}>Apply</button>
            <select className="bulk">
            <option>Dashboard</option>
            </select>
          </div>
          <div className="rightInputs">
            <input placeholder="search" type="text" value={formdata.search} onChange={changehandler} name="search" />
            <InvoiceCounter onCountChange={handleCountChange} setter={count}/>
          </div>
        </div>

        <div className="invoiceTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Order</th>
                <th>Balance</th>
                <th>Redeem</th>
                <th>Expiry on</th>
                <th>Recipient</th>
                <th>Enable</th>
              </tr>
            </thead>
            <tbody>
              {apidata && apidata.slice(start, start + 5).map((invoice, index) => (
                <tr key={index}>
                  <td><input type="checkbox" 
                  checked={selectedOrders.includes(invoice._id)} // Check if order ID is in selected list
                  onChange={(event) => handleCheckboxChange(event, invoice._id)} /></td>
                  <td>{invoice.code}</td>
                  <td>{invoice.order}</td>
                  <td>{invoice.balance}</td>
                  <td>{invoice.redeem}</td>
                  <td>{invoice.expiryOn.slice(0,10)}</td>
                  <td>{invoice.recepient}</td>
                  <td><span onClick={()=>updateGift(invoice._id,!invoice.enable)}><Toggle  ontoggle={invoice.enable} /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
