import React,{ useState, useEffect } from "react";
import axios from "axios";

export default function LoginForm () {

    /*====== All States ==== */

    const [login,setLogin]                  = useState({
                                                username: "",
                                                password: ""
                                            });
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [error, setError]                 = useState('');
    // const [token,setToken]                  = useState(false);
    const [posts, setPosts]                 = useState([]);
    const [errorDel,setErrorDel]            = useState('');
    const [isToken, setIsToken]             = useState(false);

    /* End States */

    const userName = (e) => {
        setLogin({ ...login, username: e.target.value })
       
    }
    const uPassword = (e) => {
        setLogin({ ...login, password: e.target.value })
       
    }

    const loginFormBtn = (e) => {
        e.preventDefault();
        setShowLoginForm(true);
    
    }
    const logoutFormBtn = (e) => {
        e.preventDefault();
        setShowLoginForm(false);
        setIsToken(false);
        sessionStorage.removeItem("token");
    
        // sessionStorage.clear();
    }

    const submitLoginForm = (e) => {
        e.preventDefault();

        {login && (
            axios.post('http://localhost/react-wp/wp-json/jwt-auth/v1/token', login)

                .then((res) => {
                    //console.log(res);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_nicename', res.data.user_nicename);
                    localStorage.setItem('user_email', res.data.user_email);
                    localStorage.setItem('user_display_name', res.data.user_display_name);
                    
                    setLogin({ ...login, username: '',password:'' });

                    sessionStorage.setItem('token_access',res.data.token);
                    
                    setIsToken(true);
                    
                })
                .catch((err) => {
                    
                    setError("Incorrect User Name or password!");
                    setIsToken(false);
                    sessionStorage.removeItem('token_access');
                    console.log(err)
                    
            })
        )}
        
    }

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

    /* ======= Post Form Submit Function ======*/

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

    /* ======= Delete Function ====== */

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

        <div className="post-div">
        
        {isToken && (
            <div className="btn-flex">
                <button className="button theme-btn" onClick={logoutFormBtn}>Logout</button>
            </div>
        ) }
         {!showLoginForm && !isToken && (
            <button className="button theme-btn" id="login-btn-id" onClick={loginFormBtn}>Login</button>)}
        </div>
        
        {
            showLoginForm && !isToken && (<div className="login posts-wrap" id="login-form-id">
            
                <div className="container">
                    { error && <div className="error">{error}</div>}
                   
                   
                   <div className="row post-div">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" value={login.username} name="uname" onChange={userName} required />
                    
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" value={login.password} name="password" onChange={uPassword} required />
                            <div className="">  
                        <button type="submit" onClick={submitLoginForm} className="button theme-btn">Submit</button>
                        </div>
                    </div>  
                    
                </div>
                
            </div>)
        }
        
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
                    
                </div> 
            </div>
        </div>
        
       
        
        </>
    );
}


