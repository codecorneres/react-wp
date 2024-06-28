import React,{ useEffect, useState } from "react";
import useFetch from './useFetch';
import axios from "axios";

// function useAddPost(url) {
//     const [data, setData] = useState("");
//     useEffect(() => {
//         async function loadData() {
//             const response = await fetch(url);
//             if(!response.ok) {
//                 // oups! something went wrong
//                 return;
//             }
    
//             const posts = await response.json();
//             setData(posts);
//         }
    
//         loadData();
//     }, [url]);
//     return data;
// }

export default function PostForm () {

    const loginData = {
        username: "code",
        password: "admin123"
    };
axios.post('http://localhost/react-wp/wp-json/v1/token', {
    username: "code",
    password: "admin123"
})
.then((res) => {
    console.log(res.data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user_nicename', res.data.user_nicename);
    localStorage.setItem('user_email', res.data.user_email);
    localStorage.setItem('user_display_name', res.data.user_display_name);
})
.catch((err) => {
    console.log(err);
});

    const addPost = useAddPost('http://localhost/react-wp/wp-json/wp/v2/posts');
   
    const posts = useFetch('http://localhost/react-wp/wp-json/wp/v2/posts');
    
    const [formValues, setFormValues] = useState({
        title: "",
        content: ""
      });

    const [records, setRecords] = useState("");

    const addName = (e) => {
        setFormValues({ ...formValues, title: e.target.value })
    }
    const addContent = (e) => {
        setFormValues({ ...formValues, content: e.target.value })
    }

    const submitPostFormData = (e) => {
        
        e.preventDefault();
       // setRecords([...records, formValues]);
        console.log("form cliked.");
        //console.log({records});
        //setRecords([...addPost, formValues]);
        //console.log({addPost});

        // const formdata = {
        //     title: "",
        //     content: "",
        //     status: 'publish'
        // };
        
        // axios.post('http://localhost/react-wp/wp-json/wp/v2/posts', formdata, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         //'Authorization': Bearer ${localStorage.getItem('token')}
    
        //         'Authorization': "Basic " + window.btoa("code:admin123")
        //                 }
        //     })
        //     .then((res) => {
        //         console.log(res);           
        //     })
        //     .catch((err) => {
        //         console.log(err)
        // });

        setRecords([...addPost, formdata]);
        console.log({addPost});
    }

    return (
        <>
        <div className="posts-wrap">
            <div className="post-form">
                <h3>Custom Post Form</h3>
                {/* <form method="post" action="/react-wp/save-wp-post.php"> */}
                    <div className="post-div">
                        <label>Post Name:</label>
                        <input type="text" name="post-name" value={formValues.title} onChange={addName}/>
                    </div>
                    <div className="post-div">
                        <label>Post Content:</label>
                        <textarea rows="10" cols="20" name="post-content" className="post-content" value={formValues.content} onChange={addContent}></textarea>
                    </div>
                    <div className="post-button">
                        <button type="submit" onClick={submitPostFormData} >Add New Post</button>
                    </div>
                {/* </form> */}
            </div>
            <div className="post-data">
                <h3>My All Wordpress Post List :</h3>

                <div className="nav" aria-label="main mailbox folders">
                    {posts && posts.map((post, index) => (
                    <div className={`index-${index}`}>
                        <p>{post.title.rendered}</p>
                    </div>
                    ))}
                </div> 
            </div>
        </div>
        </>
    );
}

   

