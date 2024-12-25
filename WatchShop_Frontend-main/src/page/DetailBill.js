import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Menuleft from './Menuleft'
import {getCookie} from '../main1.js'

function DetailBill(){
    const {idbill} = useParams();
    const [detailBills, setDetailBills] = useState([]);
    const token = getCookie("token")
    console.log(token)
    useEffect(() => {
      

        fetch(`http://localhost:5000/bill/getDetailBill/${idbill}`,{

            headers: {

                'Authorization': 'Bearer ' + token
            },
        })
        .then(res => res.json())
        .then(detailbills =>{
            console.log(detailbills)
            setDetailBills(detailbills.data.detailBill)
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
                <p className="right__desc">Xem chi tiết hóa đơn</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Hình ảnh</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    detailBills.map(detailBill =>{
                                        stt++;
                                        
                                        return(
                                            <tr>
                                                <td data-label='STT'>{stt}</td>
                                                <td data-label='Tên sản phẩm'>{detailBill.idProduct.name}</td>
                                                <td data-label='Số lượng'>{detailBill.amount}</td>
                                                <td data-label='Hình ảnh'><img src={detailBill.idProduct.image} style={{width: '100px'}} /></td>
                                                <td data-label='Thành tiền'>{detailBill.idProduct.price}</td>
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
export default DetailBill;