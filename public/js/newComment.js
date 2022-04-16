const commentForm = document.getElementById('comment-form');
const showForm = document.getElementById('show-form');
const addComment = document.getElementById('add-comment');
const cancelComment = document.getElementById('stop-comment');

const commentFormHandler = async (event) => {
   event.preventDefault();
    const title = document.getElementById('comment-title').value.trim();
    const description = document.getElementById('comment-desc').value.trim();
    const postId = window.location.href.split('/')[4];
    const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ title, description, postId}),
        headers: { "Content-Type": "application/json"}
    });
    if(response.ok) {
        document.location.reload();
    } else {
        alert('Failed to comment');
    }
};

const deleteComment = async (event) => {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert('Failed to delete comment');
    } else {
        document.location.reload();
    } 
};

const showCommentForm = () => {
    showForm.classList.remove('hidden');
    cancelComment.classList.remove('hidden');
    addComment.classList.add('hidden');
};
const hideCommentForm = () => {
    showForm.classList.add('hidden');
    addComment.classList.remove('hidden');
    cancelComment.classList.add('hidden');
}

commentForm.addEventListener('submit', commentFormHandler);
addComment.addEventListener('click', showCommentForm);
cancelComment.addEventListener('click', hideCommentForm);

document.querySelectorAll('.comment').forEach((btn) => {
    btn.addEventListener('click', deleteComment);
});

