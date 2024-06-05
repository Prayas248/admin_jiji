import "./email.css";
import { EmailCounter } from "./emailcounter";
import React, { useState } from 'react';


function Email() {
    const [giftCardDelivery, setGiftCardDelivery] = useState(false);
  const [deliveredGiftCardNotification, setDeliveredGiftCardNotification] = useState(false);
  const [usedGiftCard, setUsedGiftCard] = useState(false);
    return (
      <div>
        <div className="topButtons">
          <button className="coupons"> Coupons</button>
          <button className="giftCards">Gift card</button>
        </div>
        <div className="mainInvoiceContainer">
          <div className="middleInputs">
            <button className="but">Add new</button>
            <button className="but">import/export</button>
          </div>
  
          <div className="redButtonsContainer">
            <button>ALL</button>
            <button>Redeemed</button>
            <button>Not Redeemed</button>
          </div>
  
          <div className="lastInputContainer">
            <div className="leftInputs">
              <input placeholder="Bulk Actions" />
              <button>Apply</button>
              <input placeholder="Dashboard" />
            </div>
            <div className="rightInputs">
              <input placeholder="search" type="text" />
              <EmailCounter />
            </div>
            <div className="email-settings">
      <h2>Email</h2>
      <p>Manage and customize the emails sent to users about gift cards.</p>

      <div className="setting">
        <label htmlFor="gift-card-delivery">Gift Card Delivery</label>
        <input
          type="checkbox"
          id="gift-card-delivery"
          checked={giftCardDelivery}
          onChange={() => setGiftCardDelivery(!giftCardDelivery)}
        />
      </div>

      <div className="setting">
        <label htmlFor="delivered-gift-card-notification">Delivered Gift Card Notification</label>
        <input
          type="checkbox"
          id="delivered-gift-card-notification"
          checked={deliveredGiftCardNotification}
          onChange={() => setDeliveredGiftCardNotification(!deliveredGiftCardNotification)}
        />
      </div>

      <div className="setting">
        <label htmlFor="used-gift-card">Used Gift Card</label>
        <input
          type="checkbox"
          id="used-gift-card"
          checked={usedGiftCard}
          onChange={() => setUsedGiftCard(!usedGiftCard)}
        />
      </div>
    </div>
          </div>
          </div>
          </div>
);
}
            export default Email;