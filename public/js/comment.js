const postForm = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#id').value.trim();
    const text = document.querySelector('#comment-content').value.trim();

    if (text) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text, id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert('Failed to submit post.');
        }
    }

};

document.querySelector('.comment-form').addEventListener('submit', postForm);