import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

export default function Menu({ category }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://proyecto-escrache.onrender.com/api/posts/?category=${category}`);

                const filteredPosts = res.data.filter(post => post.category === category);
                setPosts(filteredPosts);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="menu-container">
            <h1>Other posts you may like: </h1>
            {posts.map((post) => (
                <div className="posts-menu" key={post.id}>
                    <Link to={`/post/${post.id}`}>
                        <img src={post?.image} />
                    </Link>
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.id}`}>
                        <button>Read More!</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
