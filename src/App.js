import logo from './logo.svg';
import './App.css';
import Order from './components/order/order';
import Invoice from './components/gifttable/invoice';
import CouponInvoice from './components/coupontable/couponinvoice';
import BlogInvoice from './components/blog/bloginvoice';
import PageInvoice from './components/pages/pageinvoice';
import CommentInvoice from './components/comments/commentinvoice';
import SizeInvoice from './components/size/sizeinvoice';
import Coupon from './components/coupon/coupon';
import UserInvoice from './components/user/userinvoice';
import OrderInvoice from './components/ordertable/orderinvoice';
import Email from './components/email/email';
import Sidebar from './components/slidebar/sidebar';
import ImageGallery from './components/mediagallery/mediagallery';
import Media from './components/media/media';
import GiftCardSettings from './components/gift/gift';
import LocationSettings from './components/multi/multi';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Currency from './components/multigeneral/multigeneral';
import Library from './components/media/media';
import CouponGeneral from './components/coupongeneral/coupongeneral';
import CouponLimit from './components/couponlimit/couponlimit';
import CouponComponent from './components/couponusage/coupon';
import MainCoupon from './components/coupon/maincoupon';
import MainGift from './components/giftcard/maingift';
import OrderDetails from './components/orderdetails/orderdetails';
import MainCurrency from './components/multigeneral/maincurrency';

function App() {
  return (
    <div className="App">
      <Router>
      <Sidebar/> 
      <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/Currency' element={<MainCurrency />} />
      <Route path='/blog' element={<BlogInvoice />} />
      <Route path='/Library' element={<Library />} />
      <Route path='/Pages' element={<PageInvoice />} />
      <Route path='/Comments' element={<CommentInvoice />} />
      <Route path='/SizeChart' element={<SizeInvoice />} />
      <Route path='/giftcard' element={<Invoice />} />
      <Route path='/coupon' element={<CouponInvoice />} />
      <Route path='/Users' element={<UserInvoice />} />
      <Route path='/Orders' element={<OrderInvoice />} /> 
      <Route path='/coupongeneral' element={<MainCoupon />} /> 
      <Route path='/couponlimit' element={<CouponLimit />} /> 
      <Route path='/couponrestriction' element={<CouponComponent />} />
      <Route path='/maingift' element={<MainGift />} />
      <Route path='/orderdetails/:id' element={<Order />} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
