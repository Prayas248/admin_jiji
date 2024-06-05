import "./productinvoice.css";
import { ProductCounter } from "./productcounter";
import { ProductToggle } from "./producttoggle";

const invoiceData = [
  {
    image: "9JSX-3F8K-WaRy",
    Name: "19990",
    Sku: "0.00",
    Stock: "In Order: #19990",
    Price: "23-05-2014",
    Category: "digital marketing@ ogi vetechnology.com",
    Date: "....." 
  },
  {
    image: "P7Q9-B6T2-Y1M4",
    Name: "",
    Sku: "101",
    Stock: "",
    Price: "Unlimited",
    Category: "",
    Date: ""
  }
];

function ProductInvoice() {
  return (
    <div className="top">
      <div className="topButtons">
        <button className="coupons">Products</button>
      </div>
      <div className="mainInvoiceContainer">
        <div className="middleInputs">
          <button className="but">Add new</button>
          <button className="but">import/export</button>
        </div>

        <div className="redButtonsContainer">
          <button>ALL</button>
          <button>Published</button>
          <button>Draft</button>
          <button>Trash</button>
        </div>

        <div className="lastInputContainer">
        <div className="leftInputs">  
            <select className="bulk">
            <option>Bulk action</option>
            </select>
            <button>Apply</button>
            <select className="bulk">
            <option>Filter By Category</option>
            </select>
            <select className="bulk">
            <option>Filter By product type</option>
            </select>
            <select className="bulk">
            <option>Filter By stock status</option>
            </select>
          </div>
          <div className="rightInputs">
            <input placeholder="search" type="text" />
            <ProductCounter />
          </div>
        </div>

        <div className="invoiceTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>image</th>
                <th>Name</th>
                <th>Sku</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{invoice.image}</td>
                  <td>{invoice.Name}</td>
                  <td>{invoice.Sku}</td>
                  <td>{invoice.Stock}</td>
                  <td>{invoice.Price}</td>
                  <td>{invoice.Category}</td>
                  <td>{invoice.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductInvoice;
