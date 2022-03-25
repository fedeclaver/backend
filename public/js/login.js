


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

      fetchLoginJSON(data).then(token => {
        if (token){
          localStorage.setItem("access_token", token.access_token)
          localStorage.setItem("user", token.user)
          location.href = '/productos'  
        } else {     
            location.href = '/failLogin'
          }
      })
  
    } catch (error) {
      console.trace(error);
    }
  });

  async function fetchLoginJSON(data) {
    const response = await  fetch("/api/login", { 
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          body: JSON.stringify(data),
        })
    const token = await response.json();
    return token;
  }