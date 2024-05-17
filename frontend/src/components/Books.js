import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        axios.get('http://localhost/react-wp/wp-json/wp/v2/books/')
        .then(res => {
            setBooks(res.data);
            setIsLoaded(false);
        })
        .catch(err => console.log(err))
    }, [])
   
    return (
        <>
            {books.map(book =>
            <h4>{book.title.rendered}</h4>
            )}
        </>
    );
}

export {Books}