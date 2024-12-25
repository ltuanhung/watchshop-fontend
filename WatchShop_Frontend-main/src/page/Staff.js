import iconedit from '../img/icon-edit.svg'
import {useEffect, useState} from 'react'
import Menuleft from './Menuleft'
import {getCookie} from '../main1.js'
import { Link } from 'react-router-dom'
function Staff(){
    const [staffs, setStaffs] = useState([]);
    const token = getCookie("token")
    useEffect(() => {
        
        fetch(`http://localhost:5000/user/getAllStaffs`,{
            headers: {
                'Authorization': 'Bearer ' + token
            },})
        .then(response => response.json())
        .then(staff =>{
            console.log(staff)
            setStaffs(staff.data.users)
        })
        
    },[])
    let stt =0 ;
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
                                    <th>Chức vụ</th>
                                    <th>Sửa</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    staffs.map(staff =>{
                                        stt++;
                                        
                                        return(
                                            <tr>
                                                <td data-label='STT'>{stt}</td>
                                                <td data-label='Tên'>{staff.name}</td>
                                                <td data-label='Địa chỉ'>{staff.address}</td>
                                                <td data-label='Email'>{staff.email}</td>
                                                <td data-label='Chức vụ'>{staff.position.name}</td>
                                                <td data-label='Sửa' className='right__iconTable'><Link to={`/editstaff/${staff._id}`} ><img src={iconedit} /></Link></td>
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
export default Staff;