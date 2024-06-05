import "./couponinvoice.css";
import { CouponCounter } from "./couponcounter";
import { CouponToggle } from "./coupontoggle";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";


const couponData = [
  {
    code: "CODE123",
    amount: "10%",
    description: "10% off on all items",
    productId: "12345",
    usageLimit: "5/10",
    expiry: "31-12-2024"
  },
  {
    code: "CODE456",
    amount: "20%",
    description: "20% off on selected items",
    productId: "67890",
    usageLimit: "3/5",
    expiry: "30-11-2024"
  }
];

function CouponInvoice() {
  const [apidata, setApidata] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]); // State to store selected order IDs
  const [selectedBulkAction, setSelectedBulkAction] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [count, setcount] = useState(0);
  const [start, setStart] = useState(0);
  const [formdata, setFormdata] = useState({
    search: ""
  });
  const navigate = useNavigate();
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
    await fetch(`http://localhost:4000/searchCoupon/${formdata.search}`)
      .then((res) => res.json())
      .then(setStart(start))
      .then((data) => { setApidata(data) })

  }



  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllCoupon`)
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
    await fetch(`http://localhost:4000/deleteCoupon`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ _id: orderId }),
        })
  }
  const updateType = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/updateCoupon/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ discount_type: newStatus }),
        })
  }
  const updateKrdo = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/updateCoupon/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ enable : newStatus }),
        })
  }
  const updateGift = async (orderId,newStatus) =>{
    console.log("hh")
    await fetch(`http://localhost:4000/updateCoupon/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ enable : newStatus}),
        })
        console.log("done")
        getAllOrders();
  }
  const handleBulkActionChange = (event) => {
    const selectedValue = event.target.value;
  setSelectedBulkAction(selectedValue);
  };
  const handleType = (event) => {
    const selectedValue = event.target.value;
  setSelectedType(selectedValue);
  };

  const handleBulkActionApply = async () => {
    if (!selectedBulkAction || !selectedOrders.length) {
      return; // Do nothing if no bulk action or orders selected
    }

    for (const orderId of selectedOrders) {
      
      if(selectedBulkAction === "Move to trash"){
      await updateOrder(orderId, selectedBulkAction); 
      }// Update each order status
      else if(selectedBulkAction === "Enable"){
        await updateKrdo(orderId, "true"); 
      }
    }

    setSelectedOrders([]);
    getAllOrders(); // Clear selected orders after applying
  };
  const handleTypeApply = async () => {
    if (!selectedType || !selectedOrders.length) {
      return; // Do nothing if no bulk action or orders selected
    }

    for (const orderId of selectedOrders) {
      
      await updateType(orderId, selectedType); 
      
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
          <button onClick={()=>{navigate("/coupongeneral")}}>Add New</button>
        </div>

        <div className="redButtonsContainer">
          <button>ALL</button>
          <button>Trash</button>
        </div>

        <div className="lastInputContainer">
          <div className="leftInputs">
          <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Bulk action</option>
            <option>Edit</option>
            <option>Move to trash</option>
            </select>
            <button onClick={handleBulkActionApply}>Apply</button>
            <select className="bulk" value={selectedType} onChange={handleType}>
            <option>fixed cart discount</option>
            <option>percentage discount</option>
            <option>fixed product discount</option>
            </select>
            <button onClick={handleTypeApply}>Apply</button>
            </div>
          <div className="rightInputs">
            <input placeholder="search" value={formdata.search} onChange={changehandler} name="search" type="text" />
            <CouponCounter onCountChange={handleCountChange} setter={count}/>
          </div>
        </div>

        <div className="invoiceTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Coupon Amount</th>
                <th>Description</th>
                <th>Product ID</th>
                <th>Usage/Limit</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apidata && apidata.slice(start, start + 5).map((coupon, index) => (
                <tr key={index}>
                  <td><input type="checkbox" 
                  checked={selectedOrders.includes(coupon._id)} // Check if order ID is in selected list
                  onChange={(event) => handleCheckboxChange(event, coupon._id)}/></td>
                  <td>{coupon.code}<br />Edit</td>
                  <td>{coupon.coupon_amount}</td>
                  <td>{coupon.discount_type}</td>
                  <td>{coupon.productId}</td>
                  <td>{coupon.usage_limit_coupon}</td>
                  <td>{coupon.expiry_date}</td>
                  <td><span onClick={()=>updateGift(coupon._id,!coupon.enable)}><CouponToggle ontoggle={coupon.enable} /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CouponInvoice;
