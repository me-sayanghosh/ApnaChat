import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);


    const formData = new FormData(e.target);
    axios.post('http://localhost:3000/creat-posts', formData)
    .then(res => {
        setLoading(false);
        navigate("/");
    })
    .catch(err => {
        setLoading(false);
        console.error(err);
        alert("Error creating post");
        
    })

}







  return (
    <section className='create-post-section'>
        <button className='back-home-btn' onClick={() => navigate('/')}>↩ Back to Home</button>
        <h1>Create Post</h1>

        {loading ? (
            <div className="spinner-overlay">
                <div className="spinner"></div>
                <p>Uploading your post...</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" />
                <input type="text" name="caption" placeholder="Enter caption here" />
                <button type="submit">Post</button>
            </form>
        )}

    </section>
  )
}


export default CreatePost