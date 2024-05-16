import React,{ Component } from "react";
import axios from "axios";

export class Books extends Component {
    state = {
        books:[],
        isLoaded:false
    }
    componentDidMount (){
        axios.get('http://localhost/react-wp/wp-json/wp/v2/books/')
        .then(res => this.setState({
            books: res.data,
            isLoaded: true
        }))
    
        .catch(err => console.log(err))
    }
    // render() {
    //     const {books, isLoaded} = this.state;
    //     return (
    //         <div>
    //             {books.map(book =>
    //             <h4>{book.title.rendered}</h4>
    //             )}
    //         </div>
    //     );
    // }
    render() {
        const {books, isLoaded} = this.state;
        console.log(this.state);
        return (
            <div>
                {books.map(book =>
                <BookItems key={book.id} book={book}/>
                )}
            </div>
        );
    }
}
export default Books