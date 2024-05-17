import React,{ Component } from "react";
import axios from "axios";

export class Posts extends Component {
    state = {
        posts:[],
        isLoaded:false
    }
    
    componentDidMount (){
        
        axios.get('http://localhost/react-wp/wp-json/wp/v2/posts/')
        .then(res => this.setState({
            posts: res.data,
            isLoaded: true
        }))
    
        .catch(err => console.log(err))
    }
    render(){
        //console.log(this.props);
        const {posts, isLoaded} = this.state;
        //console.log(this.state);
        return (
            <>
                {posts.map(post =>
                    <div>
                    <h4>{post.title.rendered}</h4>
                    <p>{post.content.rendered}</p>
                    </div>
                    
                )}
            </>
        );
    }
}
export default Posts