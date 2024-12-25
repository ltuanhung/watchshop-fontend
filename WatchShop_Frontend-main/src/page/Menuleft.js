import { Link } from 'react-router-dom'
import profile from '../img/profile.jpg'
import dashboard from '../img/icon-dashboard.svg'
import tag from '../img/icon-tag.svg'
import arrowdown from '../img/arrow-down.svg'
import edit from '../img/icon-edit.svg'
import users from '../img/icon-users.svg'
import book from '../img/icon-book.svg'
import logout from '../img/icon-logout.svg'
import '../main1.js'


function Menu() {
    return(
        <div className="left__content">
            <div className="left__logo">LOGO</div>
            <div className="left__profile">
                <div className="left__image"><img src={profile} alt=""/></div>
                <p className="left__name"></p>
            </div>
            <ul className="left__menu">
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/home"}><img src={dashboard} alt="" />Dashboard</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/product"}><img src={tag}alt=""/>Sản Phẩm</Link>
                </li>
                
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/addproduct"}><img src={dashboard} alt="" />Thêm Sản Phẩm</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/category"}><img src={edit} alt=""/>Thể Loại</Link>
                </li>
                
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/customer"}><img src={users} alt=""/>Khách Hàng</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/regency"}><img src={edit} alt="" />Chức vụ</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/trademark"}><img src={users} alt=""/>Xem Thương Hiệu</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/addtrademark"}><img src={users} alt=""/>Thêm Thương Hiệu</Link>
                </li>
                
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/bill"}><img src={book} />Hóa đơn</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title" to={"/staff"}><img src={users} alt=""/>Nhân viên</Link>
                </li>
                <li className="left__menuItem">
                    <Link  className="left__title"><img src={logout} alt=""/>Đăng Xuất</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu