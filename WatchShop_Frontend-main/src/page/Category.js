import edit from '../img/icon-edit.svg'
import {useEffect,useState} from 'react'
import Menuleft from './Menuleft'
function Category(){
    const [categories,setCategories] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/category/getAllCategories`)
        .then(res => res.json())
        .then(categories =>{
            setCategories(categories.data);
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
                <p className="right__desc">Xem thể loại</p>
                <div className="right__table">
                    <div className="right__tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã thể loại</th>
                                    <th>Thể loại</th>
                                    <th>Thể loại nhỏ</th>
                                    <th>Sửa</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {
                                    categories.map(Category =>{
                                        stt++
                                        return(
                                            <tr key={stt}>
                                                <td data-label='Mã'>{stt}</td>
                                                <td data-label='Thể loại'>{Category.name}</td>
                                                <td>
                                                {
                                                    Category.subCategory.map(subcate =>{
                                                        return(
                                                        <div key={subcate.id}>{subcate.name}</div>)
                                                    })
                                                }
                                                </td>
                                                <td data-label='Sửa' className='right__iconTable'><div><img src={edit}/> </div></td>
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

export default Category;