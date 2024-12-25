import {useEffect, useState} from 'react'
import Menuleft from './Menuleft'
import {getCookie} from '../main1.js'
import iconedit from '../img/icon-edit.svg'
import { Link } from 'react-router-dom'
function Regency(){
    const token = getCookie('token');
    const [position, setPosition] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/position/getAllPositions`,{
            headers: {
                'Authorization': 'Bearer ' + token
            },})
        .then(res => res.json())
        .then(position =>{
            setPosition(position.data)
        })


    },[])
    
    let stt =0;
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
                <p className="right__desc">Xem chức vụ</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Chức vụ</th>
                                    <th>Chi tiết</th>

                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    position.map(index =>{
                                        stt++;
                                        return(
                                            <tr>
                                                <td data-label='STT'>{stt}</td>
                                                <td data-label='Tên chức vụ'>{index.name}</td>
                                                <td data-label='Chi tiết' className='right__iconTable'><Link to={`/editregency/${index._id}`} ><img src={iconedit} /></Link></td>
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
export default Regency;