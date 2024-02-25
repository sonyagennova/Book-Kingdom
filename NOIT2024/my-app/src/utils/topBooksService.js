const baseUrl = 'https://the-books-kingdom-server.onrender.com/data/books';

export const top = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    const sortedBooks = result.data
    // .sort((a, b) => b.publication_year - a.publication_year);

    const lastThreeBooks = sortedBooks.slice(-3);

    return lastThreeBooks;
}