import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menuleft from './Menuleft'
import { getCookie } from '../main1.js'
import $ from 'jquery'
function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [trademarks, setTrademarks] = useState([])
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState()
    const [images, setImages] = useState({})
    const [productIdSubCategories, setProductIdSubCategories] = useState([])
    const [url, setUrl] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/product/getProductById/${id}`)
            .then(res => res.json())
            .then(product => {
                setProduct(product.data)
                setImage(product.data.image)
                setProductIdSubCategories(product.data.idSubCategories)

            })

        fetch(`http://localhost:5000/trademark/getAllTrademarks`)
            .then(response => response.json())
            .then(trademarks => {
                setTrademarks(trademarks.data)
            })

        fetch(`http://localhost:5000/category/getAllCategories`)
            .then(res => res.json())
            .then(categories => {

                setCategories(categories.data);
            })

    }, [])
    const token = getCookie("token")
    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImage(file.preview)
    }

    var stt = 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        let arrCate = []
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const amount = document.getElementById("amount").value;
        const trademark = document.getElementById("trademark").value;
        const fileUpload = document.getElementById("image").files[0];
        categories.map(category => {

            let cate = document.getElementById(category._id).value;
            cate = { id: cate }
            arrCate.push(cate)
        })


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
                setUrl(jsonParser.data)
                console.log(document.cookie)
            },
            error: function (data) {
                return data;
            }
        });
        
        var edProduct = {
            id: product._id,
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
            edProduct.image =  urlImage;
        }
            
        console.log(edProduct);
        fetch(`http://localhost:5000/product/editProduct`,
            {
                method: 'Put',
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
                    alert('Sửa sản phẩm thành công')
                    window.location.href = "/home"
                } else 
                alert('Sửa sản phẩm thất bại')
            })
    }
    return (
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
                    <p className="right__desc">Sửa sản phẩm</p>
                    <div className="right__formWrapper">
                        <form action="" method="post" onSubmit={handleSubmit} enctype="multipart/form-data">

                            <div className="right__inputWrapper">
                                <label htmlFor="title">Tên sản phẩm</label>
                                <input type='text' placeholder='tên sản phẩm' defaultValue={product.name} id='name' />
                            </div>
                            <div className="right__inputWrapper">
                                <label htmlFor="trademark">Thương hiệu</label>
                                <select name="nametrademark" id='trademark'>
                                    {
                                        trademarks.map(trademark => {
                                            if (product.idTrademark == trademark._id) {
                                                return (
                                                    <option value={product.idTrademark} selected key={trademark._id}>{trademark.name}</option>
                                                )
                                            } else {
                                                return (
                                                    <option value={trademark._id} key={trademark._id}>{trademark.name}</option>
                                                )
                                            }
                                        })

                                    }
                                </select>
                            </div>
                            {

                                categories.map(category => {
                                    stt++;
                                    return (
                                        <div className="right__inputWrapper" key={category._id}>
                                            <label htmlFor="category">Thể loại {category.name}</label>
                                            <select name="loaisp" id={category._id}>
                                                {
                                                    category.subCategory.map(subCate => {
                                                        var flag = 0;
                                                        productIdSubCategories.map(index => {
                                                            if (index.id == subCate._id) {
                                                                flag = subCate._id
                                                                return (1)
                                                            }
                                                        })

                                                        if (subCate._id != flag) {
                                                            return (
                                                                <option value={subCate._id} key={subCate._id}>{subCate.name}</option>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <option value={subCate._id} selected key={subCate._id}>{subCate.name}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                    )
                                })
                            }

                            <div className='right__inputWrapper'>
                                <label htmlFor='image'>Hình ảnh</label>
                                <input type='file' accept=".jpg, .png," onChange={handlePreviewImage} id="image" />
                                <img id='img' src={image} />
                            </div>
                            <div className='right__inputWrapper'>
                                <label htmlFor='title'>Số lượng</label>
                                <input type='text' defaultValue={product.amount} id='amount' placeholder='Số lượng sản phẩm' />
                            </div>
                            <div className='right__inputWrapper'>
                                <label htmlFor='title'>Giá sản phẩm</label>
                                <input type='text' defaultValue={product.price} id='price' placeholder='Giá sản phẩm' />
                            </div>


                            <button className="btn" type="submit" name="submit" >Sửa</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}





export default EditProduct;