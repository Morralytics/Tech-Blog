const postForm = async (event) => {
    event.preventDefault();
    const text = document.querySelector('#comment-content').value.trim();

    if (text) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to submit post.');
        }
    }

};

document.querySelector('.comment-form').addEventListener('submit', postForm);