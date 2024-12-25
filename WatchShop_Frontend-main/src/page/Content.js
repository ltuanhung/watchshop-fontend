import { Routes, Route, } from 'react-router-dom';
import EditProduct from './EditProduct.js';
import Home from './Home.js'
import Product from './Product.js'
import AddProduct from './AddProduct.js'
import Category from './Category.js';
import Trademark from './Trademark.js'
import Login from './Login.js';
import Customer from './Customer.js'
import Bill from './Bill.js'
import AddTrademark from './AddTrademark.js';
import EditTrademark from './EditTrademark.js';
import DetailBill from './DetailBill.js';
import Staff from './Staff.js';
import EditStaff from './EditStaff.js';
import Regency from './Regency.js'
import EditRegency from './EditRegency.js';
import Shipper from './shipper.js';
function Content(){
    return(
        <Routes>
            <Route path='/' exact element={<Login />} />
            <Route path='/product' element={<Product />} />
            <Route path='/bill' element={<Bill />} />
            <Route path='/home' element={<Home />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/category' element={<Category />} />
            <Route path='/customer' element={<Customer />} />
            <Route path='/trademark' element={<Trademark />} />
            <Route path='/editproduct/:id'  element={<EditProduct />}  />
            <Route path='/editstaff/:idstaff'  element={<EditStaff />}  />
            <Route path='/editregency/:idregen'  element={<EditRegency />}  />
            <Route path='/edittrademark/:idtm'  element={<EditTrademark />}  />
            <Route path='/addproudct'  element={<AddProduct />}  />
            <Route path='/addtrademark'  element={<AddTrademark />}  />
            <Route path='/detailbill/:idbill'  element={<DetailBill />}  />
            <Route path='/staff' element={<Staff />} /> 
            <Route path='/regency' element={<Regency />} />
            <Route path='/shipper' element={<Shipper />} />
        </Routes>
    )
}

export default Content;