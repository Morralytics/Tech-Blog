const id = document.querySelector('#id').value.trim();

const editForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    window.location.replace('/dashboard')
};

const removePost = async (event) => {
    await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    window.location.replace('/dashboard')
};


document.querySelector('.edit-form').addEventListener('submit', editForm);
document.querySelector('#remove-btn').addEventListener('click', removePost);