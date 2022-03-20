


const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", async (event) => {

  let username = document.getElementById("username");
  let password = document.getElementById("password");
  event.preventDefault();
  try {
    const data = {
      username: username.value,
      password: password.value,
    };
  fetch("/auth/login", { 
    method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(data),
      }).then((res) => {
        const getCookie = document.cookie;
        console.log(getCookie);
        if (!res) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error de Usuario o Contraseña!'
          })
      
        }
        if (res.redirected) {
          window.location.href = res.url;
        }
      });
    } catch (error) {
      console.trace(error);
    }
  });
