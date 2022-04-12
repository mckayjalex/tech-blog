
const signupRequest = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password}),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.ok) {
            document.location.replace('/login')
        } else {
            alert('Failed to signup');
        }
    }
}
document.getElementById('signup-form').addEventListener('submit', signupRequest);