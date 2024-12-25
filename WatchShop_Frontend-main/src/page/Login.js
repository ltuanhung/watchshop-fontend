
function Login(){
    let te = 0
    const handleSubmit = (e) =>{
        e.preventDefault();
        const email = document.getElementById("emailtk").value;
        const password = document.getElementById("passwordtk").value;
        const data = {
            email : email,
            password: password
        }
        
        fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }).then(response => response.json())
        .then(user =>{
            console.log(user);
            if( user.message == "Login success"){
                document.cookie = `token=${user.data.token}`;
                if (user.data.user.position == "6381a423132db2a91184be1e")
                    window.location.href = "/shipper"
                else window.location.href = "/home";
                
            }
        })
    }
    return(
        <div className="modal" id="mymodal">
            <div style={{marginTop: 100}}></div>
            <div className="modal-content">
                <form className="form" id="form-2"  method="post" onSubmit={handleSubmit}>
                    <h3 className="heading test">Đăng nhập</h3>
                    <div className="spacer"></div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="emailtk" name="email" type="text" placeholder="VD: email@gmail.com" className="form-control" />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input id="passwordtk" name="password" type="password" placeholder="Nhập mật khẩu" className="form-control" />
                        <span className="form-message"></span>
                    </div>

                    <input type="submit"  value="Đăng nhập" className="form-submit" />
                </form>
            </div>
        </div>
    )
}

export default Login;