document.addEventListener('DOMContentLoaded', function () {
    const blogForm = document.getElementById('blogForm');
    const blogPostsContainer = document.getElementById('blogPosts');

    // Load existing blog posts from JSON file
    let blogPosts = [];
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            blogPosts = data;
            displayBlogPosts();
        })
        .catch(error => console.error('Error loading blog posts:', error));

    // Handle form submission
    blogForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const newPost = {
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleString()
        };

        blogPosts.push(newPost);
        displayBlogPosts();
        saveBlogPosts();

        // Clear the form
        blogForm.reset();
    });

    // Display blog posts
    function displayBlogPosts() {
        blogPostsContainer.innerHTML = '';
        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>Posted on: ${post.date}</small>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    // Save blog posts to JSON file
    function saveBlogPosts() {
        const data = JSON.stringify(blogPosts);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();

        URL.revokeObjectURL(url);
    }
});
