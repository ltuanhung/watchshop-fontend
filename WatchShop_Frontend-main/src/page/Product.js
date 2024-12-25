import iconedit from '../img/icon-edit.svg'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Menuleft from './Menuleft'

function Product() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState('1');
    const [totalPage, setTotalPage] = useState('');
    const [trademarks, setTrademarks] = useState([])
    let stt =0;
    useEffect(() => {
        fetch(`http://localhost:5000/product/getAllProducts?page=${page}&numberProductsOfPage=10`)
        .then(res => res.json())
        .then(products =>{
            setProducts(products.data.products);
            setTotalPage(products.data.paging.totalPage);
        })
        fetch(`http://localhost:5000/trademark/getAllTrademarks`)
        .then(response => response.json())
        .then(trademarks =>{
            setTrademarks(trademarks.data)
        })
        
    },[page])
    let arr =[]
    for (let index = 1; index <= totalPage; index++) {
        arr.push(index);
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
                <p className="right__desc">Xem sản phẩm</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thương hiệu</th>
                                    <th>Số lượng</th>
                                    <th>Hình ảnh</th>
                                    <th>Giá SP</th>
                                    <th>Sửa</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        products.map(index => {
                                            stt++ 
                                            return(
                                            <tr key={stt}>
                                                <td data-label='STT'>{stt}</td>
                                                <td data-label='Tên sản phẩm'>{index.name }</td>
                                                {
                                                    trademarks.map(trademark => {
                                                        if(index.idTrademark == trademark._id){
                                                            return(
                                                                <td key={stt}>{trademark.name}</td>
                                                            )
                                                        }
                                                    })
                                                }
                                                <td data-label='Số lượng'>{index.amount}</td>
                                                <td data-label='Hình ảnh'><img src={index.image} style={{width: '100px'}} /></td>
                                                <td data-label='Giá SP'>{index.price}₫</td>
                                                <td data-label='Sửa' className='right__iconTable'><Link to={`/editproduct/${index._id}`} ><img src={iconedit} /></Link></td>
                                                <td data-label='Trạng thái'><label className='switch'><input type='checkbox' /><span className='slider round'></span></label></td>
                                            </tr>)
                                        })
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='phantrang'>
                    {
                        arr.map(index =>{
                            return(
                            <button className='btnpage' key={index}
                                style={page === index ?{
                                    color: '#fff',
                                    backgroundColor: '#333',
                                } : {}}
                                onClick={() => setPage(index)}>
                                {index}
                            </button>)
                        })
                    }
                </div>                    
            </div>
        </div>
        </>
    )
}

export default Product;