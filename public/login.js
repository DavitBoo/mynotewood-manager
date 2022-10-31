//import Cookies from "universal-cookie";
//const cookies = new Cookies();

const loginForm = document.getElementById("login-form");
const emailInput = document.querySelector('.email-input')
const passwordInput = document.querySelector('.password-input')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value
  
    try {
     await axios.post('/login', { 
        email, 
        password
       }  
    ).then(res => console.log(res.data.token))
  
       modal.style.display = "none";
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `you are now logged`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }


    
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3000)
  })


  