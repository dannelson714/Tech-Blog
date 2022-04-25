const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    var date = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '/' + dd + '/' + yyyy; 
  
    if (email && password) {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        body: JSON.stringify({ title, content, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new post.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', newPostFormHandler);
  