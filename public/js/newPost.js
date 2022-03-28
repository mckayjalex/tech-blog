const postForm = document.getElementById('post-form');

const postFormHandler = async () => {
    const title = document.getElementById('post-title').value.trim();
    const description = document.getElementById('post-desc').value.trim();

    const response = await fetch('api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json"}
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to post');
    }
}

postForm.addEventListener('submit', postFormHandler)