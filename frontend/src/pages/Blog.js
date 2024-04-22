import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://proyecto-escrache.onrender.com/api/posts");
                setPosts(res.data);
            } catch (error) { 
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        let text = doc.body.textContent;
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }

    return (
        <div className="blog-container">
            <div className="blog">
                {error ? ( 
                    <div>Error: {error}</div>
                ) : (
                    posts.map((post) => (
                        <div className="blogs-blog" key={post.id}>
                            <div className="img-blog">
                            <Link to={`/post/${post.id}`}><img src={post.image} alt="" /></Link>
                            </div>
                            <div className="content-blog">
                            <h1>{post.title}</h1>
                            <p>{getText(DOMPurify.sanitize(post.desc))}</p>
                                <Link className="link-blog" to={`/post/${post.id}`}>
                                    <button>Read More</button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
