const postDeleteBtn = document.getElementById('delete-post');
const commentDeleteBtn = document.getElementById('delete-comment');

const deletePost = async (event) => {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert('Failed to delete post');
    } else {
        document.location.replace('/dashboard');
    } 
}
const deleteComment = async (event) => {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert('Failed to delete comment');
    } else {
        document.location.replace('/dashboard');
    } 
}
postDeleteBtn.addEventListener('click', deletePost);
commentDeleteBtn.addEventListener('click', deleteComment);