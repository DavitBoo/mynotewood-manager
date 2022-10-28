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
       })
       modal.style.display = "none";
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3000)
  })