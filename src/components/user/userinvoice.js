import "./userinvoice.css";
import { UserCounter } from "./usercounter";
import { UserToggle } from "./usertoggle";
import { useEffect,useState } from "react";

const userData = [
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

function UserInvoice() {
  const [formdata,setFormdata] = useState({
    search:""
  });
  const [selectedOrders, setSelectedOrders] = useState([]); // State to store selected order IDs
  const [selectedBulkAction, setSelectedBulkAction] = useState(""); // State for the selected bulk action
  const [count, setcount] = useState(0);
  const [start, setStart] = useState(0);
 
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

  const updateOrder = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/updateUser/${orderId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ role: newStatus }),
        })
  }
  const deleteUser = async (orderId,newStatus) =>{
    await fetch(`http://localhost:4000/deleteUser`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ _id: orderId }),
        })
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
      await updateOrder(orderId, selectedBulkAction); // Update each order status
    }

    setSelectedOrders([]);
    getAllOrders(); // Clear selected orders after applying
  };
  const handleDelete = async () => {
    if (!selectedBulkAction || !selectedOrders.length) {
      return; // Do nothing if no bulk action or orders selected
    }

    for (const orderId of selectedOrders) {
      if(selectedBulkAction === "Delete")
      await deleteUser(orderId, selectedBulkAction); // Update each order status
    }

    setSelectedOrders([]);
    getAllOrders(); // Clear selected orders after applying
  };
  const changehandler = (e) =>{
    e.preventDefault();
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  
    const searcherji = async (formdata) =>{
      await fetch(`http://localhost:4000/searchUser/${formdata.search}`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })
    }
  
  
  const [apidata, setApidata] = useState(null);
  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllUser`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })
  } 
  useEffect(() => {
    if(formdata.search){
      searcherji(formdata)
    }
    else{
      getAllOrders();
    }
    
  }, [formdata]);
  useEffect(() => {
    if(!formdata.search){
      getAllOrders();
    }
  }, []);

  return (
    <div className="hiii">
      <div className="usertopButtons">
        <button className="usercoupons">User</button>
      </div>
      <div className="usermainInvoiceContainer">
        <div className="usermiddleInputs">
          <button className="userbut">Add new</button>
        </div>

        <div className="userredButtonsContainer">
          <button>ALL</button>
          <button>Administrator</button>
          <button>Editor</button>
          <button>Author</button>
          <button>Subscriber</button>
          <button>Customer</button>
        </div>

        <div className="lastInputContainer">
          <div className="leftInputs">
          <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Bulk action</option>
            <option>Delete</option>
            <option>Send Password Reset</option>
            </select>
            <button onClick={handleDelete}>Apply</button>
            <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Change role to</option>
            <option>Shop Manager</option>
            <option>Customer</option>
            <option>Customer</option>
            <option>Subscriber</option>
            <option>contributor</option>
            <option>Author</option>
            <option>Editor</option>
            </select>
            <button onClick={handleBulkActionApply}>Change</button>
          </div>
          <div className="userrightInputs">
            <input placeholder="search" value={formdata.search} onChange={changehandler} name="search" type="text" />
            <UserCounter onCountChange={handleCountChange} setter={count}/>
          </div>
        </div>

        <div className="userinvoiceTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Post/Order</th>
              </tr>
            </thead>
            <tbody>
              {apidata && apidata.slice(start, start + 4).map((user, index) => (
                <tr key={index}>
                  <td><input type="checkbox"
                  checked={selectedOrders.includes(user._id)} // Check if order ID is in selected list
                  onChange={(event) => handleCheckboxChange(event, user._id)} /></td>
                  <td>{user.name}</td>
                  <td>{user.display_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.latest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default UserInvoice;
