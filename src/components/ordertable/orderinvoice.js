import "./orderinvoice.css";
import { OrderCounter } from "./ordercounter";
import { OrderToggle } from "./ordertoggle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const orderData = [
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


function OrderInvoice() {

  const navigate = useNavigate();
  const [apidata, setApidata] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]); // State to store selected order IDs
  const [selectedBulkAction, setSelectedBulkAction] = useState(""); // State for the selected bulk action
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

  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllOrders`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })
  } 
  const updateOrder = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/updateOrder/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ status: newStatus }),
        })
  }
  const deleteOrder = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/deleteOrder/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
        })
  }
  const handleBulkActionChange = (event) => {
    const selectedValue = event.target.value;
  const newStatus = selectedValue.split(' ').slice(2).join(' '); // Extract status after "Change to"

  setSelectedBulkAction(newStatus);
  };

  const handleBulkActionApply = async () => {
    if (!selectedBulkAction || !selectedOrders.length) {
      return; // Do nothing if no bulk action or orders selected
    }

    for (const orderId of selectedOrders) {
      if(selectedBulkAction === "Trash"){
        await deleteOrder(orderId, selectedBulkAction); 
        }
        else{
      await updateOrder(orderId, selectedBulkAction); 
        }// Update each order status
    }

    setSelectedOrders([]);
    getAllOrders(); // Clear selected orders after applying
  };
  useEffect(() => {
   
      getAllOrders();
    

  }, [formdata]);


  useEffect(() => {

    console.log(start)
  }, [count])
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="hiii">
      <div className="ordertopButtons">
        <button className="ordercoupons">Orders</button>
      </div>
      <div className="mainInvoiceContainer">
        <div className="middleInputs">
          <button className="orderbut">Add order</button>
        </div>

        <div className="orderredButtonsContainer">
          <button>ALL</button>
          <button>Mine</button>
          <button>Processing</button>
          <button>on hold</button>
          <button>Comleted</button>
          <button>Cancelled</button>
          <button>Refunded</button>
        </div>

        <div className="lastInputContainer">
          <div className="leftInputs">
          <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Bulk action</option>
            <option>Change to Processing</option>
            <option>Change to On hold</option>
            <option>Change to completed</option>
            <option>Change to cancelled</option>
            <option>Ship to Delivery Partner</option>
            <option>Move to Trash</option>
            </select>
            <button onClick={handleBulkActionApply}>Apply</button>
            <select className="bulk">
            <option>Register coustomer</option>
            </select>
            <button>Fliter</button>
            <select>
              <option>Date</option>
            </select>
          </div>
          <div className="orderrightInputs">
            <input placeholder="search" type="text" />
            <OrderCounter onCountChange={handleCountChange} setter={count}/>
          </div>
        </div>

        <div className="orderinvoiceTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>View/Edit</th>
              </tr>
            </thead>
            <tbody>
              {apidata && apidata.slice(start, start + 4).map((order, index) => (
                <tr key={index}>
                  <td><input type="checkbox" 
                  checked={selectedOrders.includes(order._id)} // Check if order ID is in selected list
                  onChange={(event) => handleCheckboxChange(event, order._id)}/></td>
                  <td>{order._id}</td>
                  <td>{order.date.slice(0,10)}</td>
                  <td>{order.status}</td>
                  <td>{order.amount}</td>
                  <td><div class="circle" onClick={()=>{navigate(`/orderdetails/${order._id}`)}}></div></td>
                </tr> 
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default OrderInvoice;
