import edit from '../img/icon-edit.svg'
import {useEffect,useState} from 'react'
import Menuleft from './Menuleft'
import { Link } from 'react-router-dom'
function Trademark(){
    const [trademarks, setTrademarks] = useState([]);
    useEffect(() => {
        
        fetch(`http://localhost:5000/trademark/getAllTrademarks`)
        .then(response => response.json())
        .then(trademarks =>{
            setTrademarks(trademarks.data)
        })
        
    },[])
    var stt=0
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
                <p className="right__desc">Xem thương hiệu</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Sửa</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    trademarks.map(trademark =>{
                                        stt++
                                        return(
                                            <tr key={stt}>
                                                <td data-label='Mã'>{stt}</td>
                                                <td data-label='Thể loại'>{trademark.name}</td>
                                                <td data-label='Sửa' className='right__iconTable'><Link to={`/edittrademark/${trademark._id}`} ><img src={edit} /></Link></td>
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
export default Trademark;