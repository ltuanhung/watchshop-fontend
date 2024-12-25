import arrowright from '../img/arrow-right.svg'
import { Link } from 'react-router-dom'
import Menuleft from './Menuleft'
function Home(){
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
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
                <p className="right__desc">Bảng điều khiển</p>
                <div className="right__cards">
                    <Link className="right__card" to='/product'>
                        <div className="right__cardTitle">Sản Phẩm</div>
                        <div className='right__cardNumber'>100</div>
                        <div className="right__cardDesc">Xem Chi Tiết <img src={arrowright} alt=""/></div>
                    </Link>
                    <Link className="right__card">
                        <div className="right__cardTitle">Khách Hàng</div>
                        <div className='right__cardNumber'>100</div>
                        <div className="right__cardDesc">Xem Chi Tiết <img src={arrowright} alt=""/></div>
                    </Link>
                    <Link className="right__card">
                        <div className="right__cardTitle">Thể Loại</div>
                        <div className='right__cardNumber'>100</div>
                        <div className="right__cardDesc">Xem Chi Tiết <img src={arrowright} alt=""/></div>
                    </Link>
                    <Link className="right__card">
                        <div className="right__cardTitle">Đơn Hàng</div>
                        <div className='right__cardNumber'>100</div>
                        <div className="right__cardDesc">Xem Chi Tiết <img src={arrowright} alt=""/></div>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;