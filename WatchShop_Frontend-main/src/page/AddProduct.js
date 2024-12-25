import {useEffect,useState} from 'react'
import Menuleft from './Menuleft';
import { getCookie } from '../main1.js'
import $ from "jquery";
function AddProduct(){
    const [trademarks, setTrademarks] = useState([])
    const [categories,setCategories] = useState([])
    const [image,setImage] = useState()
    const [images,setImages] = useState({})
    useEffect(() => {
       

        fetch(`http://localhost:5000/trademark/getAllTrademarks`)
        .then(response => response.json())
        .then(trademarks =>{
            setTrademarks(trademarks.data)
        })
        
        fetch(`http://localhost:5000/category/getAllCategories`)
        .then(res => res.json())
        .then(categories =>{
            
            setCategories(categories.data);
        })

    },[])
     const handlePreviewImage = (e) =>{
        const file = e.target.files[0];
        setImages(file)
        file.preview = URL.createObjectURL(file)
        setImage(file.preview)
    }
    let stt =0;
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = getCookie("token");
        let arrCate = []
        const name = document.getElementById("tensp").value;
        const price = document.getElementById("gia").value;
        const amount = document.getElementById("soluong").value;
        const trademark = document.getElementById("trademark").value;
        categories.map(category =>{
            let cate = document.getElementById(category._id).value;
            cate = { id: cate }

            arrCate.push(cate)
        })
        console.log(4)
        var formData = new FormData();
        formData.append('image', $('#image')[0].files[0]);
       
        $.ajax({
            url: `http://localhost:5000/product/uploadfile`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            mimeType: "multipart/form-data",
            credentials: "include",
            crossDomain: true,
            xhrFields: { withCredentials: true },
            processData: false,
            contentType: false,
            data: formData,
            async: false,
            success: function (response) {
                const jsonParser = JSON.parse(response);
                document.cookie = `url=${jsonParser.data.url}`
                console.log(document.cookie)
            },
            error: function (data) {
                console.log(data.responseText)
            }
        });

        var edProduct = {
            name: name,
            price: price,
            amount: amount,
            idTrademark: trademark,
            idSubCategories: arrCate,
        }
        const urlImage = getCookie("url")
        console.log(urlImage)
        if (urlImage) {
            console.log(1)
            edProduct.image = urlImage;
        }

        console.log(edProduct);
        fetch(`http://localhost:5000/product/createProduct`,
            {
                method: 'Post',
                body: JSON.stringify(edProduct),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.success) {
                    alert('Thêm sản phẩm thành công')
                    window.location.href = "/home"
                } else
                    alert('Thêm sản phẩm thất bại')
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
                <p className="right__desc">Thêm sản phẩm</p>
                <div className="right__formWrapper">
                        <form action="" method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
                        <div className="right__inputWrapper">
                            <label htmlFor="title">Tên sản phẩm</label>
                            <input type="text" placeholder="tên sản phẩm" name="tensp" id="tensp"/>
                        </div>
                        <div className="right__inputWrapper">
                                        <label htmlFor="trademark" >Thương hiệu</label>
                                        <select name="nametrademark" id='trademark'>
                                            {
                                                trademarks.map(trademark => {
                                                    
                                                        return(
                                                            <option value ={trademark._id} key={trademark._id}>{trademark.name}</option>
                                                        )
                                                    
                                                })
                                                
                                            }
                                        </select>
                                    </div>
                                    {
                                        
                                        categories.map(category =>{
                                            
                                            return(
                                                <div className="right__inputWrapper" key={category._id}>
                                                    <label htmlFor="category">Thể loại {category.name}</label>
                                                    <select name="loaisp" id={category._id}>
                                                        {
                                                            category.subCategory.map(subCate =>{
                                                                
                                                                    return(
                                                                        <option value ={subCate._id} key={subCate._id}>{subCate.name}</option>
                                                                    )
                                                                     
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            )
                                        })
                                    }
                        <div className='right__inputWrapper'>
                                        <label htmlFor='image'>Hình ảnh</label>
                                        <input type='file' id='image' name='image'  accept=".jpg, .png," onChange={handlePreviewImage}/>
                                        <img id='img' src={image} />
                                    </div>
                        <div className="right__inputWrapper">
                            <label htmlFor="title">Số lượng sản phẩm</label>
                            <input type="text" placeholder="Số lượng sản phẩm" name="soluong" id="soluong"/>
                        </div>
                        <div className="right__inputWrapper">
                            <label htmlFor="title">Giá sản phẩm</label>
                            <input type="text" placeholder="Giá sản phẩm" name="gia" id="gia"/>
                        </div>
                        <button className="btn" type="submit" >Thêm</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddProduct;