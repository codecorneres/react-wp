import React,{ useEffect, useState } from "react";
import useFetch from './useFetch';
import axios from "axios";

export default function PostForm () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            
            const response = await fetch('http://localhost/react-wp/wp-json/wp/v2/posts');
            if(!response.ok) {
                return;
            }
    
            const posts = await response.json();
            setPosts(posts);
            
        };
        fetchData();
    }, []);

    //const posts = useFetch('http://localhost/react-wp/wp-json/wp/v2/posts');
    //console.log({posts});

    const loginData = {
        username: "code",
        password: "admin123"
    };

    axios.post( 'http://localhost/react-wp/wp-json/jwt-auth/v1/token', loginData)
        
    .then((res) => {
    // console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_nicename', res.data.user_nicename);
        localStorage.setItem('user_email', res.data.user_email);
        localStorage.setItem('user_display_name', res.data.user_display_name);
    })
    .catch((err) => {
        console.log(err);
    });
    
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
    // const [fetchData,setFetchData] = useState("");

  


    const submitPostFormData = (e) => {

        e.preventDefault();
    
        axios.post('http://localhost/react-wp/wp-json/wp/v2/posts', formValues, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                
                }
            })
            .then((res) => {
                const updatedPosts = [...posts, res.data];
                setPosts(updatedPosts)
                
            })
            .catch((err) => {
                console.log(err)
        });

    }

    const [data, setData] = useState([]);

    const delPost = async (id) => {
        
        await axios.delete(`http://localhost/react-wp/wp-json/wp/v2/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                
                }
            })
            .then((res) => {
                //console.log(res); 
                console.log("Post deleted:", res.data.id);
                setData(data.filter((res) => res.id !== id));
               
            })
            .catch((err) => {
                console.log(err)
        });
        
    }
     // Call fetchData on component mount
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <>
        <div className="posts-wrap">
            <div className="post-form">
                <h3>Custom Post Form</h3>
               
                    <div className="post-div">
                        <label>Post Name:</label>
                        <input type="text" name="post-name" onChange={addName}/>
                    </div>
                    <div className="post-div">
                        <label>Post Content:</label>
                        <textarea rows="10" cols="20" name="post-content" className="post-content" onChange={addContent}></textarea>
                    </div>
                    <div className="post-button">
                        <button type="submit" onClick={submitPostFormData} >Add New Post</button>
                    </div>
                
            </div>
            <div className="post-data">
                <h3>My All Wordpress Post List :</h3>

                <div className="nav post-lists">
                    {posts && posts.map((post, index) => (
                    <div className="single-post-name" key={`index-${index}`}>
                        <h5>{post.title.rendered}</h5> 
                        <button post-id={post.id} onClick={() => delPost (post.id)} >Delete Post</button>
                    </div>
                    ))}
                </div> 
            </div>
        </div>
        </>
    );
}

   

