import iconedit from '../img/icon-edit.svg'
import {useEffect, useState} from 'react'
import Menuleft from './Menuleft'
import { Link } from 'react-router-dom'
import {getCookie} from '../main1.js'
function Customer(){
    const [customers, setCustomers] = useState([]);
    const token = getCookie("token")
    useEffect(() => {
        
        fetch(`http://localhost:5000/user/getAllCustomers`,{
            headers: {
                'Authorization': 'Bearer ' + token
            },})
        .then(response => response.json())
        .then(customers =>{
            setCustomers(customers.data.users)
            
        })
        
    },[])
    
    
    let stt=0
    return(
        <>
        <div className="left">
            <span className="left__icon">
                <span></span>
                <span></span>
                <span></span>
            </span>
            <Menuleft />
        </div>
        <div className="right">
            <div className="right__content">
                <div className="right__title">Bảng điều khiển</div>
                <p className="right__desc">Xem khách hàng</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Email</th>
                                    
                                  
                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    customers.map(customer =>{
                                        stt++;
                                        
                                        return(
                                            <tr>
                                                <td data-label='STT'>{stt}</td>
                                                <td data-label='Tên'>{customer.name}</td>
                                                <td data-label='Địa chỉ'>{customer.address}</td>
                                                <td data-label='Email'>{customer.email}</td>
                                                
                                               
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Customer;