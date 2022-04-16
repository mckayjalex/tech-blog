const postDeleteBtn = document.getElementById('delete-post');

const editPost = document.getElementById('edit-post');
const stopEdit = document.getElementById('stop-edit');
const sEditForm = document.getElementById('show-edit-form');

const deletePost = async (event) => {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert('Failed to delete post');
    } else {
        document.location.replace('/profile');
    } 
}
postDeleteBtn.addEventListener('click', deletePost);

const showEditForm = () => {
    if(editPost.classList.contains('hidden')) {
        editPost.classList.remove('hidden');
        stopEdit.classList.add('hidden');
       sEditForm.classList.add('hidden');
    }
    else {
        stopEdit.classList.remove('hidden');
        editPost.classList.add('hidden');
        sEditForm.classList.remove('hidden');
    }
}

const editForm = document.getElementById('edit-form');

const editFormHandler = async () => {
    const title = document.getElementById('edit-title').value.trim();
    const description = document.getElementById('edit-desc').value.trim();
    const id = window.location.href.split('/')[4];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title, description}),
        
    });
    if(response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to edit post');
    }
}

editForm.addEventListener('submit', editFormHandler)

editPost.addEventListener('click', showEditForm);
stopEdit.addEventListener('click', showEditForm);