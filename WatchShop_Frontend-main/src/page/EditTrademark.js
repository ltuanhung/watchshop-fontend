import Menuleft from './Menuleft'
import { useEffect, useState } from 'react';
import {getCookie} from '../main1.js'
import {useParams} from 'react-router-dom'
import '../main1.js'
function EditTrademark(){
    const {idtm} = useParams();
    const token = getCookie("token")
    const [trademarks, setTrademarks] = useState([]);
    useEffect(() => {
        
        fetch(`http://localhost:5000/trademark/getAllTrademarks`)
        .then(response => response.json())
        .then(trademarks =>{
            setTrademarks(trademarks.data)
        })
        
    },[])
    const handleSubmit = (e) =>{
        e.preventDefault();
        const name = document.getElementById("edth").value;
        const data = {
            id : idtm,
            name: name
        }
        console.log(data)
        fetch('http://localhost:5000/trademark/editTrademark', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
        }).then(response => response.json())
        .then(trademark =>{
            console.log(trademark)
            if(trademark.message == 'Edit trademark successfully')
                window.location.href='http://localhost:3000/trademark'
        })
    }
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
                <p className="right__desc">Thêm thương hiệu</p>
                <div className="right__formWrapper">
                    <form  onSubmit={handleSubmit} enctype="multipart/form-data">
                        <div className="right__inputWrapper">
                            <label htmlFor="title">Tên thương hiệu</label>
                            {
                                trademarks.map(trademark =>{
                                    if(trademark._id == idtm)
                                    {
                                        return(
                                            <input type="text" placeholder="tên thương hiệu" name="name" id="edth" defaultValue={trademark.name}/>
                                        )
                                    }
                                })
                            }
                            
                        </div>
                
                        <button className="btn" type="submit" >Thêm</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default EditTrademark;