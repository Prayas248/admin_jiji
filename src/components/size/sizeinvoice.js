import "./sizeinvoice.css";
import { SizeCounter } from "./sizecounter";
import { SizeToggle } from "./sizetoggle";
import { useEffect,useState } from "react";

const sizeData = [
  {
    title: "Small",
    author: "John Doe",
    message: "Suitable for petite sizes"
  },
  {
    title: "Medium",
    author: "Jane Smith",
    message: "Standard medium size"
  }
];

function SizeInvoice() {
  const [apidata, setApidata] = useState(null);
  const [count,setcount] = useState(0);
  const [start,setStart] = useState(0);
  const [formdata,setFormdata] = useState({
    search:""
  });
  const changehandler = (e) =>{
    e.preventDefault();
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  var hello=0;
  const handleCountChange = (newCount) =>{
    console.log(newCount);
    setcount(newCount);
    hello = newCount*5;
    setStart(hello);
  } 
  
    const searcherji = async (formdata) =>{
      await fetch(`http://localhost:4000/searchSize/${formdata.search}`)
      .then((res) => res.json())
      .then(setStart(start))
      .then((data) => { setApidata(data) })
      
    }
  
  
  
  const getAllOrders = async () => {
    await fetch(`http://localhost:4000/getAllSizes`)
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
  
  
  useEffect(()=>{
    
    console.log(start)
  },[count])
  useEffect(() => {
    
    
    if(!formdata.search){
      getAllOrders();
    }
  }, []);
  return (
    <div className="mainInvoiceContainer">
      <div className="middleInputs">
        <h2>Size Chart</h2>
        <button className="but">Add new</button>
      </div>

      <div className="redButtonsContainer">
        <button>ALL</button>
        <button>Trash</button>
      </div>

      <div className="lastInputContainer">
        <div className="leftInputs">
        <select className="bulk">
            <option>Bulk action</option>
            <option></option>
            <option></option>
            </select>
            <button>Apply</button>
        </div>
        <div className="rightInputs">
          <input placeholder="search" value={formdata.search} onChange={changehandler} name="search" type="text" />
          <SizeCounter onCountChange={handleCountChange} setter={count}/>
        </div>
      </div>

      <div className="invoiceTable">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Size Chart Type</th>
              <th>Prduct Assigned</th>
            </tr>
          </thead>
          <tbody>
            {apidata && apidata.slice(start,start+5).map((size, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{size.title}</td>
                <td>{size.type}</td>
                <td>{size.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SizeInvoice;
