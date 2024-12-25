import {useEffect, useState} from 'react'
import Menuleft from './Menuleft'
import {getCookie} from '../main1.js'
import {useParams} from 'react-router-dom'
function EditRegency(){
    const token = getCookie('token');
    const {idregen} = useParams();
    const [position, setPosition] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/position/getPositionById/${idregen}`,{
            headers: {
                'Authorization': 'Bearer ' + token
            },})
        .then(res => res.json())
        .then(position =>{
    
            setPosition(position.data.permission)
        })


    },[])
    
    const permission = [
       'Quản lý sản phẩm',
        'Quản lý thể loại',
        'Quản lý thương hiệu',
        'Quản lý nhân viên',
        'Quản lý khách hàng',
        'Quản lý hoá đơn',
         'Quản lý quyền và chức vụ',
         'Quản lý thống kê và báo cáo'
    ];
    let stt =0;
    let arr = position.map(index=> index.name)
    
    const checkcv = (e) =>{
        let arrcv =[]
        arr.map(index =>{
            if(document.getElementById({index}.checked)){
                arrcv.push(index);
            }
        })
        console.log(arrcv)
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
                <p className="right__desc">Sửa  quyền</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên quyền</th>
                                    <th>Check</th>

                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    permission.map(per =>{
                                        if(arr.includes(per) === true){
                                            stt++;
                                            return(
                                                <tr>
                                                    <td data-label='STT'>{stt}</td>
                                                    <td data-label='Tên quyền'>{per}</td>
                                                    <td data-label='Check'><input type='Checkbox' id={per} checked/></td>
                                                </tr>
                                            )
                                        }
                                        else{
                                            stt++;
                                            return(
                                                <tr>
                                                    <td data-label='STT'>{stt}</td>
                                                    <td data-label='Tên quyền'>{per}</td>
                                                    <td data-label='Check'><input type='Checkbox' id={per}/></td>
                                                </tr>
                                            )
                                        }
                                        
                                                
                                           
                                    })
                                }
                            </tbody>
                        </table>
                        <button className="btn"  name="submit" onClick={checkcv} >Sửa</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default EditRegency;