import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../main1.js'
import edit from '../img/icon-edit.svg'
import $ from "jquery";
function Shipper() {
    const [bills, setBills] = useState([]);
    const [states, Dongu] = useState('Đã giao');
    const [states1, Dongu1] = useState('Huỷ');
    const token = getCookie("token")
    useEffect(() => {
        fetch(`http://localhost:5000/bill/getAllBills`, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then(bills => {
                setBills(bills.data)
                console.log(bills)
            }).catch(
                (err) => {
                    console.log(err)
                }
            )

    }, [])
    let stt = 0;
    const changeStatus = (e) => {
        console.log('hello');
        Dongu('Đã giao');
        console.log($(this))
        fetch(`http://localhost:5000/bill/confirmBill`, {
            method: 'POST',
            body: {
                id: $(this).attr('data-id'),
            },
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(bills => {
                console.log(bills)
            })
    }
    const changeStatus1 = (e) => {
        Dongu1('Đã Huỷ');
        console.log($(this))
        fetch(`http://localhost:5000/bill/confirmBill`, {
            method: 'POST',
            body: {
                id: $(this).attr('data-id'),
            },
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(bills => {
                console.log(bills)
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

            </div>
            <div className="right">
                <div className="right__content">
                    <div className="right__title">Bảng điều khiển</div>
                    <p className="right__desc">Xem hóa đơn</p>
                    <div className="right__table">
                        <div className="right__tableWrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Điện thoại</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày đặt</th>
                                        <th>Chi tiết</th>
                                        <th>Action</th>
                                        <th>Huỷ</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        bills.map(bill => {
                                            stt++;
                                            var date = new Date(bill['createdAt'])
                                            var year = date.getFullYear().toString();
                                            var month = (date.getMonth() + 101).toString().substring(1);
                                            var day = (date.getDate() + 100).toString().substring(1);
                                            date = day + '/' + month + '/' + year;
                                            var cancel = "enable"


                                            if (cancel === "disable")
                                                return (
                                                    <tr>
                                                        <td data-label='STT'>{stt}</td>
                                                        <td data-label='Tên'>{bill.name}</td>
                                                        <td data-label='Địa chỉ'>{bill.address}</td>
                                                        <td data-label='Điện thoại'>{bill.phone}</td>
                                                        <td data-label='Tổng tiền'>{bill.total}</td>
                                                        <td data-label='Ngày đặt'>{date}</td>
                                                        <td data-label='Chi tiết' className='right__iconTable'><Link to={`/detailbill/${bill._id}`} ><img src={edit} /></Link></td>

                                                        <td><button className="btn" onClick={changeStatus} data-id={bill._id}>{states}</button>

                                                        </td>
                                                        <td><button onClick={changeStatus1} className="btn btn-success" >{states1}</button>
                                                        </td>
                                                    </tr>
                                                )
                                            else return (
                                                <tr>
                                                    <td data-label='STT'>{stt}</td>
                                                    <td data-label='Tên'>{bill.name}</td>
                                                    <td data-label='Địa chỉ'>{bill.address}</td>
                                                    <td data-label='Điện thoại'>{bill.phone}</td>
                                                    <td data-label='Tổng tiền'>{bill.total}</td>
                                                    <td data-label='Ngày đặt'>{date}</td>
                                                    <td data-label='Chi tiết' className='right__iconTable'><Link to={`/detailbill/${bill._id}`} ><img src={edit} /></Link></td>

                                                    <td><button className="btn btn-accept" onClick={changeStatus} data-id={bill._id}>{states}</button>

                                                    </td>
                                                    <td><button onClick={changeStatus1} className="btn btn-cancel" >{states1}</button>
                                                    </td>
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

export default Shipper;