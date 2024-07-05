import React,{ useEffect, useState } from "react";
import axios from "axios";

export default function PostForm () {

    const [posts, setPosts] = useState([]);
    const [error,setError] = useState('');
    const [errorDel,setErrorDel] = useState('');

    const [isToken, setIsToken] = useState(false);

    //sessionStorage.removeItem('token')

    const fetchData = async () => {
            
        const response = await fetch('http://localhost/react-wp/wp-json/wp/v2/posts');
        if(!response.ok) {
            return;
        }

        const posts = await response.json();
        setPosts(posts);
        
    };

    useEffect(() => {
        fetchData();
        // checkToken();
    }, []);

    
    
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        status: 'publish'
      });

    const addName = (e) => {
        setFormValues({ ...formValues, title: e.target.value })
       
    }
    const addContent = (e) => {
        setFormValues({ ...formValues, content: e.target.value })
       
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token_access');
        token ? setIsToken(true) : setIsToken(false);
        
    }, []);

    console.log(isToken, 'isToken');

    const submitPostFormData = (e) => {

        e.preventDefault();
    
        axios.post('http://localhost/react-wp/wp-json/wp/v2/posts', formValues, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${localStorage.getItem('token')}`
                'Authorization': `Bearer  ${sessionStorage.getItem("token_access")}`
                
                }
            })
            .then((res) => {
                const updatedPosts = [...posts, res.data];
                setPosts(updatedPosts);
                if(updatedPosts){
                    setFormValues({ ...formValues, title: '',content:'' })
                }
                
            })
            .catch((err) => {
                console.log(err)
                setError(err);
        });

    }

   

    const delPost =  (id) => {
        
            axios.delete(`http://localhost/react-wp/wp-json/wp/v2/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${localStorage.getItem('token')}`
                'Authorization': `Bearer  ${sessionStorage.getItem("token_access")}`
                
                }
            })
            .then((res) => {
                //console.log(res); 
                console.log("Post deleted:", res.data.id);
                
                fetchData();
               
            })
            .catch((err) => {
                console.log(err)
                setErrorDel(err);
        });
        
    }

    return (
        <>
      
        <div className="posts-wrap divider">
            {isToken && 
            
                <div className="post-form">
                <h3>Custom Post Form</h3>
                    {error && 
                        <div className="error">
                        {error ? 'Post Not Created. Please Try Again!' :''}
                        </div>
                    }
                    <div className="post-div">
                        <label>Post Name:</label>
                        <input type="text" name="post-name" value={formValues.title} onChange={addName}/>
                    </div>
                    <div className="post-div">
                        <label>Post Content:</label>
                        <textarea rows="10" cols="20" name="post-content" value={formValues.content} className="post-content" onChange={addContent}></textarea>
                    </div>
                    <div className="post-button">
                        <button type="submit" className="theme-btn" onClick={submitPostFormData} >Add New Post</button>
                    </div>
                
            </div>
}
            
            <div className="post-data">
                <h3>My All Wordpress Post List :</h3>
                {errorDel && 
                    <div className="error">{errorDel.message}</div>
                }
                <div className="nav post-lists">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Post Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {posts && posts.map((post, index) => (
                        <tr className="single-post-name" key={`index-${index}`}>
                            <td>{index+1}</td>
                            <td>{post.title.rendered}</td>
                            <td><button className="theme-btn" post-id={post.id} onClick={() => delPost (post.id)} >Delete Post</button></td>
                        </tr>
                        ))}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                    {/* {posts && posts.map((post, index) => (
                    <div className="single-post-name" key={`index-${index}`}>
                        <h5>{post.title.rendered}</h5> 
                        <button className="theme-btn" post-id={post.id} onClick={() => delPost (post.id)} >Delete Post</button>
                    </div>
                    ))} */}
                </div> 
            </div>
        </div>
        </>
    );
}

   

