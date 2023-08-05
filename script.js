const apiKey = 'AIzaSyBrwkOiDqp6G6io6wqagbZ2_7V7rS5KBRo';
let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=programming&key=${apiKey}`;

const booksList = document.getElementById('booksList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchForm = document.getElementById('searchForm');
const errorMessage = document.getElementById('error-message');

let startIndex = 0;
let currentQuery = 'programming';

loadMoreBtn.addEventListener('click', fetchBooks);
searchForm.addEventListener('submit', handleSearch);

function fetchBooks() {
    fetch(`${apiUrl}&startIndex=${startIndex}`)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
            startIndex += data.items.length;
        })
        .catch(error => {
            errorMessage.textContent = 'Error fetching data. Please try again later.';
        });
}

function displayBooks(books) {
    errorMessage.textContent = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const coverUrl = book.volumeInfo.imageLinks?.thumbnail || 'no-cover.jpg';

        bookCard.innerHTML = `
        <img class="book-cover" src="${coverUrl}" alt="${title} Cover">
        <h2>${title}</h2>
        <p>${authors}</p>`;

        booksList.appendChild(bookCard);
    });
}

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    if (searchQuery !== '') {
        currentQuery = searchQuery;
        startIndex = 0;
        apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${currentQuery}&key=${apiKey}`;
        booksList.innerHTML = '';
        fetchBooks();
    }
}

fetchBooks();