import React, { useEffect } from "react";
import CouponGeneral from "../coupongeneral/coupongeneral";
import CouponLimit from "../couponlimit/couponlimit";
import CouponComponent from "../couponusage/coupon";
import { useState } from "react";

function MainCoupon() {
    const [couponData, setCouponData] = useState({
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
    }, [couponData])
    const [activeSection, setActiveSection] = useState('general'); // Track active section

    const handleSectionClick = (section) => {
        setActiveSection(section); // Update active section state
    };
    const handleSubmitter = async() =>{
        await fetch(`http://localhost:4000/createCoupon`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(couponData),
        }).then(alert("Done scene"))
    }
    return (
        <><div>
            {activeSection === "general" && <CouponGeneral onSectionClick={handleSectionClick} couponData={couponData} setCouponData={setCouponData} />}
            {activeSection === "usageLimit" && <CouponLimit onSectionClick={handleSectionClick} couponData={couponData} setCouponData={setCouponData} />}
            {activeSection === "usageRestriction" && <CouponComponent onSectionClick={handleSectionClick} couponData={couponData} setCouponData={setCouponData} />}
            <button onClick={handleSubmitter}>Save</button>
            </div>
        </>
    );
}

export default MainCoupon;