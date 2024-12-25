import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Menuleft from './Menuleft'
import {getCookie} from '../main1.js'
function EditStaff(){
    const {idstaff} = useParams();
    const token = getCookie('token');
    const [staff, setStaff] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/user/getStaffById/${idstaff}`,{
            headers: {
                'Authorization': 'Bearer ' + token  
            },})
        .then(res => res.json())
        .then(staff =>{
            console.log(staff)
            setStaff(staff.data)
        })


    },[])
    
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
                <p className="right__desc">Sửa nhân viên</p>
                <div className="right__formWrapper">
                    <form action="" method="post"  enctype="multipart/form-data" >
                        
                                    {/* <div className="right__inputWrapper">
                                        <label htmlFor="title">Tên nhân viên</label>
                                        <input type='text' placeholder='tên khách hàng' defaultValue={staff.name} id='namenv'  />
                                    </div>
                                    <div className="right__inputWrapper">
                                        <label htmlFor="title">Địa chỉ</label>
                                        <input type='text' placeholder='Địa chỉ' defaultValue={staff.address} id='address'  />
                                    </div>
                                    <div className="right__inputWrapper">
                                        <label htmlFor="title">Email</label>
                                        <input type='text' placeholder='Email' defaultValue={staff.email} id='email'  />
                                    </div> */}
                                    
                        
                        <button className="btn" type="submit" name="submit" >Sửa</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default EditStaff;