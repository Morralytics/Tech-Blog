const postForm = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#text-confirm').value.trim();
    const username = document.querySelector('#username-confirm').value.trim();

    if (text && username) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ text, username }),
            header: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to submit post.');
        }
    }
};