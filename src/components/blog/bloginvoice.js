import "./bloginvoice.css";
import { BlogCounter } from "./blogcounter";
import { BlogToggle } from "./blogtoggle";
import { useState, useEffect } from "react";

const blogData = [
  {
    title: "How to Use React",
    author: "John Doe",
    categories: "Development",
    tags: "React, JavaScript",
    comments: 5,
    date: "23-05-2023"
  },
  {
    title: "Understanding JavaScript",
    author: "Jane Smith",
    categories: "Programming",
    tags: "JavaScript, ES6",
    comments: 10,
    date: "15-06-2023"
  }
];

function BlogInvoice() {
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
    await fetch(`http://localhost:4000/searchBlog/${formdata.search}`)
      .then((res) => res.json())
      .then(setStart(start))
      .then((data) => { setApidata(data) })

  }



  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllBlog`)
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

  const updateOrder = async (orderId, newStatus) => {
    await fetch(`http://localhost:4000/deleteBlog/${orderId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }
  const Duplicate = async (orderId, newStatus) => {
    await fetch(`http://localhost:4000/duplicateBlog/${orderId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }
  const updateKrdo = async (orderId, newStatus) => {
    await fetch(`http://localhost:4000/editGiftCardById`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enable: newStatus, _id: orderId }),
    })
  }
  const updateGift = async (orderId, newStatus) => {
    console.log("hh")
    await fetch(`http://localhost:4000/editGiftCardById`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enable: newStatus, _id: orderId }),
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

      if (selectedBulkAction === "Trash") {
        await updateOrder(orderId, selectedBulkAction);
      }// Update each order status
      else if(selectedBulkAction === "Duplicate"){
        await Duplicate(orderId, selectedBulkAction);
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
    <div className="mainInvoiceContainer">
      <div className="middleInputs">
        <button>Add new</button>
      </div>
      <div className="redButtonsContainer">
        <button>ALL</button>
        <button>Published</button>
        <button>Draft</button>
      </div>

      <div className="lastInputContainer">
        <div className="leftInputs">
          <select className="bulk" value={selectedBulkAction} onChange={handleBulkActionChange}>
            <option>Bulk action</option>
            <option>Edit</option>
            <option>Trash</option>
            <option>Duplicate</option>
          </select>
          <button onClick={handleBulkActionApply}>Apply</button>
          <select className="bulk">
            <option>All Dates</option>
          </select>
          <select className="bulk">
            <option>All Categories</option>
          </select>
          <button>Filter</button>
        </div>
        <div className="rightInputs">
          <input placeholder="search" type="text" value={formdata.search} onChange={changehandler} name="search" />
          <BlogCounter onCountChange={handleCountChange} setter={count} />
        </div>
      </div>

      <div className="invoiceTable">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author Name</th>
              <th>Categories</th>
              <th>Tags</th>
              <th>Comments</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {apidata && apidata.slice(start, start + 5).map((blog, index) => (
              <tr key={index}>
                <td><input type="checkbox"
                  checked={selectedOrders.includes(blog._id)} // Check if order ID is in selected list
                  onChange={(event) => handleCheckboxChange(event, blog._id)} /></td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.category}</td>
                <td>{blog.tags && blog.tags.map((tag, index) => (
                  <span key={index}>
                    {tag}
                    {index !== blog.tags.length - 1 && ', '}  {/* Add space except for the last element */}
                  </span>
                ))}</td>
                <td>{blog.comment?.slice(1).slice(-1)[0]?.by?.body || ""}</td>
                <td>{blog.date.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlogInvoice;
