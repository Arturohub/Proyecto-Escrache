import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useContext } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from '../context/authContext';


axios.defaults.withCredentials = true;

export default function Write() {

    const { currentUser } = useContext(AuthContext);
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(state?.img || null);
    const [category, setCat] = useState(state?.category || "");

    const navigate = useNavigate()

    const uploadImg = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
            const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;
            const response = await axios.post(cloudinaryUrl, formData, { withCredentials: false });
            console.log('Image uploaded successfully:', response.data.secure_url);
            return response.data.secure_url;
        } catch (error) {
            console.error('Failed to upload image to Cloudinary:', error);
            throw new Error("Failed to upload image to Cloudinary.");
        }
    };
   
    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = ""
        if (file) {
            imgUrl = await uploadImg(file)
        }

        try {
            state
                ? await axios.put(`https://proyecto-escrache.onrender.com/api/posts/${state.id}`, {
                    title,
                    desc: value,
                    category,
                    img: file ? imgUrl : ""
                })
                : await axios.post(`https://proyecto-escrache.onrender.com/api/posts/`, {
                    title,
                    desc: value,
                    category,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/blog")
        } catch (err) {
            console.log(err);
        }
    };

    if (!currentUser || ![1, 2, 3, 4].includes(currentUser.id)) {
        return <div>Sorry. You are not authorized to publish blog posts.</div>;
    }

    return (
        <div className="blogform-container">
            <div className="content-blogform">
                <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <div className="newblog-container">
                    <ReactQuill className="newblog-editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu-blogform">
                <div className="item-blogform">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{ display: "none" }} type="file" accept="image/*" name="" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    <label className="file-blogform" htmlFor='file'>Upload Image</label>
                    <div className="buttons-blogform">
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item-blogform">
                    <h1>Category</h1>
                    <div className="category">
                        <input type="radio" name="category" value="live" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor='live'>#Live</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="merchandising" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor='merchandising'>#Merchandise</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="events" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor='events'>#Upcoming events</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="personal" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor='personal'>#Band info</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="fans" onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor='fans'>#Fans</label>
                    </div>
                </div>

            </div>
        </div>
    )
}
