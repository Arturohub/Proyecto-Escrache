import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link,  useLocation, useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import { useState, useEffect, useContext } from 'react';
import axios from "axios"
import moment from "moment"
import { AuthContext } from '../context/authContext';
import DOMPurify from "dompurify";

axios.defaults.withCredentials = true;

export default function Single() {

    const [post, setPost] = useState({});

    const location = useLocation()
    const postId = location.pathname.split("/")[2]

    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [postId]);
    
      const handleDelete = async ()=>{
        try {
          await axios.delete(`/posts/${postId}`);
          navigate("/")
        } catch (err) {
          console.log(err);
        }
      }
    
    return (
        <div className="blogpost-container">
            <div className="content-blogpost">
                <img className="image-blogspot" src={`../upload/${post?.img}`} alt="" />
                <div className="user-blogpost">
                    {post.userImg && <img className="user-picture" src={post.userImg} alt="" />}
                    <div className="info-blogpost">
                    <span>{post.username}</span>
                    <p>Posted {moment(post.date).fromNow()}</p>
                </div>
                {currentUser && post.username && currentUser.username === post.username && (
                <div className="edit-blogpost">
                    <Link to={`/write?edit=1`} state={post}>
                        <FaEdit className="edit-button" title="edit"/>
                    </Link>
                        <FaTrash onClick={handleDelete} className="delete-button" title="delete"/>
                </div>)}

            </div>


            <h1 className="title-blogpost">{post.title}</h1>
            <p className="blogtext-blogpost" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc),  }}></p>     
            </div>

            <Menu category={post.category}/>
        </div>
    );
}