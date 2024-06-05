import React, { useEffect } from "react";
import GiftCard from "./giftcard";
import GiftCardSettings from "../gift/gift";
import { useState } from "react";
import "./maingift.css"
function MainGift() {
   {/* const [couponData, setCouponData] = useState({
        // Define initial state object with all coupon data fields
        discount_type: '',
        coupon_amount: '',
        free_shipping: false,
        expiry_date: '',
        usage_limit_coupon: '',
        usage_limit_user: '',
        minimum_spend: '',
        maximum_spend: '',
        individual_use: false,
        exclude_sale: false,
        products: '',
        excludeCategory: '',
        productsCategory: '',
        allowedEmails: '' // From CouponGeneral
        // ... other fields from other components
    });
    useEffect(() => {
        console.log(couponData)
    }, [couponData])*/
}
    const [activeSection, setActiveSection] = useState('Setting'); // Track active section

    const handleSectionClick = (section) => {
        if(section !== "Select")
        setActiveSection(section); // Update active section state
    };
   {/* const handleSubmitter = async() =>{
        await fetch(`http://localhost:4000/createCoupon`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(couponData),
        }).then(alert("Done scene"))
    }*/}
    return (
        <><div className="maingift">
            {activeSection === "Setting" && <GiftCard onSectionChange={handleSectionClick}  />}
            {activeSection === "Email" && <GiftCardSettings onSectionChange={handleSectionClick} />}
            
            <button >Save</button>
            </div>
        </> 
    );
}

export default MainGift;