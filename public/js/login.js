// Handles login submission 
const loginHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If email and password are true then fetch a POST call
    if (email && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to login');
        }
    }
}
// Event listener on 
document.querySelector('#login-form').addEventListener('submit', loginHandler);