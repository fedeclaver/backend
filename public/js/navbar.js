(async () => {
    const response = await fetch('/auth/getUser');
    const data = await response.json();
    if (Object.keys(data)[0] != 'error') {
        document.getElementById('user').innerHTML = `
                <span>${data.nombre} - </span>
                <span>${data.usuario} - </span>
                <img src="  img/${data.foto}" width="45px" />
            `
        document.getElementById('btnLogout').innerHTML = `
                <a  href="/auth/logout">Logout</a>
            `
    } else {
        document.getElementById('user').innerHTML = `
            
                <a  href="signup.html">Signup</a>
                <a  href="login.html">Login</a>
         
            `
    }
  })();
  