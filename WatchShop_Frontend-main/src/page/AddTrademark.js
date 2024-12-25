import Menuleft from './Menuleft'
function AddTrademark(){
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
    const token = getCookie("token")
    const handleSubmit = (e) =>{
        e.preventDefault();
        const name = document.getElementById("th").value;
        const data = {
            name: name
        }
        fetch('http://localhost:5000/trademark/createTrademark', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
        }).then(response => response.json())
        .then(trademark =>{
            console.log(trademark)
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
                <p className="right__desc">Thêm thương hiệu</p>
                <div className="right__formWrapper">
                    <form  onSubmit={handleSubmit}>
                        <div className="right__inputWrapper">
                            <label htmlFor="title">Tên thương hiệu</label>
                            <input type="text" placeholder="tên thương hiệu" name="name" id="th"/>
                        </div>
                
                        <button className="btn" type="submit" >Thêm</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddTrademark;