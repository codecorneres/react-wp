import React,{ useState, useEffect } from "react";
import axios from "axios";
import close from '../images/cross.svg';
import trashBin from '../images/trash.svg';

export default function LoginForm () {

    /*====== All States ==== */

    const [login,setLogin]                      = useState({
                                                    username: "",
                                                    password: ""
                                                });
    const [showLoginForm, setShowLoginForm]     = useState(true);
    const [error, setError]                     = useState('');
    
    const [posts, setPosts]                     = useState([]);
    const [errorDel,setErrorDel]                = useState('');
    const [isToken, setIsToken]                 = useState(false);
    const [showAddPostForm,setshowAddPostForm]  = useState(false);

    /* End States */

    const userName = (e) => {
        setLogin({ ...login, username: e.target.value })
       
    }
    const uPassword = (e) => {
        setLogin({ ...login, password: e.target.value })
       
    }

    const addNewPostBtn = () => {
        //console.log("true");
        setshowAddPostForm(true);
    
    }
    const logoutFormBtn = (e) => {
        e.preventDefault();
        setShowLoginForm(true);
        setshowAddPostForm(false);
        setIsToken(false);
        setError('');
        sessionStorage.removeItem("token_access");
    
        // sessionStorage.clear();
    }
    const closeForm = () => {
        
        setshowAddPostForm(false);
    }

    const submitLoginForm = () => {
       // e.preventDefault();

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
        if(sessionStorage.getItem("token_access")){
            setIsToken(true);
        }
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
                setshowAddPostForm(false);
                
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
        {
            showLoginForm && !isToken && (<div className="login posts-wrap login-form" id="login-form-id">
                
                <div className="login-box">
                    <div className="title">
                        <h2 className="text-2xl font-bold">LOGIN</h2>
                    </div>
                    
                    <div className="post-div">
                        <div className="form-group">
                            <label htmlFor="uname">Username</label>
                            <input type="text" placeholder="Enter Username" value={login.username} name="uname" onChange={userName} required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" value={login.password} name="password" onChange={uPassword} required />
                        </div>
                            <div className="">  
                        <button type="submit" onClick={submitLoginForm} className="button theme-btn">Submit</button>
                        </div>
                        { error && <div className="error">{error}</div>}
                    </div>  
                    
                </div>
                
            </div>)
        }
        {isToken && 
        <div className="user-post-data">
            <div className="top-btn-div">
            
            
                <div className="btn-flex">
                    <button className="button theme-btn" onClick={logoutFormBtn}>Logout</button>
                    <button className="button theme-btn" onClick={addNewPostBtn}>Add New Post</button>
                </div>
        
            {/* {!showLoginForm && !isToken && (
                <button className="button theme-btn" id="login-btn-id" onClick={loginFormBtn}>Login</button>)} */}
            </div>
            <div className="posts-wrap">

                {showAddPostForm &&
                    <div className="post-form">
                        <div className="title">
                        <h2 className="text-2xl font-bold">Custom Post Form</h2>
                        </div>
                        <div className="form-close">
                            <span className="close-btn absolute top-[18px] right-[20px] w-5" onClick={closeForm}><img src={close} alt="close" /></span>
                        </div>
                        {error && 
                            <div className="error">
                            {error ? 'Post Not Created. Please Try Again!' :''}
                            </div>
                        }
                        <div className="form-group">
                            <label>Post Name:</label>
                            <input type="text" name="post-name" value={formValues.title} onChange={addName}/>
                        </div>
                        <div className="form-group">
                            <label>Post Content:</label>
                            <textarea rows="10" cols="20" name="post-content" value={formValues.content} className="post-content" onChange={addContent}></textarea>
                        </div>
                        <div className="post-button">
                            <button type="submit" className="theme-btn" onClick={submitPostFormData} >Add New Post</button>
                        </div>
                        
                    </div>
                }
                
                
                    <div className="post-data">
                        <div className="title">
                            <h2>My All Wordpress Post List :</h2>
                        </div>
                        
                        {errorDel && 
                            // <div className="error">{errorDel.message}</div>
                            <div className="error">{errorDel ? 'Please Login First Then Try Again!' :''}</div>
                            
                        }

                        <div className="post-lists">
                            
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th className="text-start py-2 border-b-[1px] border-b-[#ddd]">ID</th>
                                        <th className="text-start py-2 border-b-[1px] border-b-[#ddd]">Post Name</th>
                                        <th className="py-2 border-b-[1px] border-b-[#ddd]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {posts && posts.map((post, index) => (
                                <tr className="single-post-name odd:bg-gray-200" key={`index-${index}`}>
                                    <td className="py-2 pl-2">{index+1}</td>
                                    <td className="py-2">{post.title.rendered}</td>
                                    <td align="center" valign="middle" className="py-2"><button className="btn ml-0" post-id={post.id} onClick={() => delPost (post.id)} ><img src={trashBin} alt="delete" className="w-4" /></button></td>
                                </tr>
                                ))}
                                </tbody>
                                <tfoot></tfoot>
                            </table>
                            
                        </div> 
                    </div>

            </div>
        </div>
        }
        
        
        </>
    );
}


