const baseUrl = 'https://the-books-kingdom-server.onrender.com/data/books'; //http://localhost:5500
const token = localStorage.getItem("accessToken");

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result.data;
};

export const getByCategory = async (category) => {
    const response = await fetch(`${baseUrl}`)
    const result = await response.json();
    Array.from(result).forEach(book => {
        if(book.category.toString().toLowerCase() == category){
            return book;
        }
    })
}

export const getOne = async (bookId) => {
    const response = await fetch(`${baseUrl}/${bookId}`);
    const result = await response.json();
    return result.data[0];
};

export const deleteBook = async(bookId, accessToken) => {
    const response = await fetch(`${baseUrl}/${bookId}`, {
        method: "DELETE",
        headers: {
            'X-Authorization': accessToken
        },
    })

    return response
}

export const setLike = async(bookId, data, count) => {
    const body = {
        like: data.like,
        ownersOfLike: data.ownersOfLike,
        countLikes: count
    }

    const response = await fetch(`${baseUrl}/${bookId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem("accessToken")
        },
        body: JSON.stringify(body)
    })

    const result = response.json()
    return result
}

export const editBook = async (data, bookId, accessToken) => {
    const body = {
        title: data.title,
        author: data.author,
        year_published: data.publication_year,
        description: data.description,
        publisher: data.publisher,
        category: data.category,
        imageUrl: data.imageUrl
    };

    const response = await fetch(`${baseUrl}/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(body),
    })

    const result = await response.json();
    //console.log(result);

    return result;
}

export const create = async (data, accessToken) => {
    const body = {
        title: data.title,
        author: data.author,
        description: data.description,
        year_published: data.publication_year,
        imageUrl: data.imageUrl,
        publisher: data.publisher,
        category: data.category,
        like: false,
        ownersOfLike: [],
        countLikes: 0,
        ownerId: accessToken,
        comments: []
    };

    const response = await fetch(baseUrl+'/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(body),
    })

    const result = await response.json();
   
    return result;
};