const SignUpform = document.getElementById("SignUpform");
SignUpform.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    username: SignUpform[0].value,
    password: SignUpform[1].value,
    nombre: SignUpform[2].value,
    direccion: SignUpform[3].value,
    edad: SignUpform[4].value,
    telefono: SignUpform[5].value
  }

  const respuesta = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const content = await respuesta.json();

  const { access_token } = content;

  if (access_token) {
    localStorage.setItem("access_token", access_token);
    location.href = '/'
  } else {
    location.href = '/failSignUp'
  }
})
