import "./commentinvoice.css";
import { CommentCounter } from "./commentcounter";
import { CommentToggle } from "./commenttoggle";
import { useState,useEffect } from "react";

const commentData = [
  {
    title: "Great Post!",
    author: "John Doe",
    message: "I really enjoyed reading this article.",
    date: "12-01-2023"
  },
  {
    title: "Helpful Tips",
    author: "Jane Smith",
    message: "Thanks for sharing these tips.",
    date: "23-02-2023"
  }
];

function CommentInvoice() {
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
    await fetch(`http://localhost:4000/searchComment/${formdata.search}`)
      .then((res) => res.json())
      .then(setStart(start))
      .then((data) => { setApidata(data) })

  }



  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getCommentBlogReview`)
      .then((res) => res.json())
      .then((data) => { setApidata(data) })

  }
  const handleCheckboxChange = (event, orderId,blogId) => {
    const isChecked = event.target.checked;
    const newSelectedOrders = [...selectedOrders]; // Create a copy of the state

    if (isChecked) {
      if (blogId) {
        // Push an object containing orderId and blogId if blogId is provided
        newSelectedOrders.push({ orderId, blogId });
      } else {
        // Push only orderId if blogId is not available
        newSelectedOrders.push({orderId});
      } // Add ID to selected list if checked
    } else {
      const index = newSelectedOrders.findIndex(item => item.orderId === orderId);
      console.log(index) // Find the index of the ID
      if (index > -1) {
        newSelectedOrders.splice(index, 1); // Remove ID if unchecked
      }
    }
    console.log(newSelectedOrders)

    setSelectedOrders(newSelectedOrders); // Update the state with the modified array
  };
  
  const updateOrder = async (orderId,newStatus,blogId) =>{
    if(blogId){
    await fetch(`http://localhost:4000/deleteAllComment`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({ _id: orderId,blogId:blogId }),
        })
      }
      else{
        await fetch(`http://localhost:4000/deleteAllComment`,{
          method:'POST',
          headers:{
              Accept:'application/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify({ _id: orderId }),
      })
      }
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

    for (const selectedOrder of selectedOrders) {
      
      const { orderId, blogId } = selectedOrder;

      if(selectedBulkAction === "Move to trash"){
      await updateOrder(orderId, selectedBulkAction,blogId); 
      }// Update each order status
      {/*else if(selectedBulkAction === "Enable"){
        await updateKrdo(orderId, "true"); 
      }*/}
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
    <div className="mainInvoiceContainer">
      <div className="middleInputs">
        <h2>Comments</h2>
      </div>

      <div className="redButtonsContainer">
        <button>ALL</button>
        <button>Pending</button>
        <button>Approved</button>
        <button>Spam</button>
        <button>Trash</button>
      </div>

      <div className="lastInputContainer">
        <div className="leftInputs">
        <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Bulk action</option>
            <option>Approve</option>
            <option>Unapprove</option>
            <option>Mark as spam</option>
            <option>Move to trash</option>
            </select>
            <button onClick={handleBulkActionApply}>Apply</button>
        </div>
        <div className="rightInputs">
          <input placeholder="search" value={formdata.search} onChange={changehandler} name="search" type="text" />
          <CommentCounter onCountChange={handleCountChange} setter={count}/>
        </div>
      </div>

      <div className="invoiceTable">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Author</th>
              <th>Comment</th>
              <th>In Response To</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {apidata && apidata.slice(start,start+5).map((comment, index) => (
              <tr key={index}>
                <td><input type="checkbox" 
                checked={selectedOrders.findIndex(item => item.orderId === comment._id) > -1} // Check if order ID is in selected list
                onChange={(event) => handleCheckboxChange(event, comment._id,comment.blogId)} /></td>
                <td>{comment.user_name? comment.user_name:comment.name}  <br />{comment.user_ip}</td>
                <td>{comment.body}</td>
                <td>{comment.blog ? `Blog:  ${comment.blog_name}`:`Product:  ${comment.product_name}`}</td>
                <td>{comment.date.slice(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentInvoice;
