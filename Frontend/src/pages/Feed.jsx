import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://apnachat-mn3v.onrender.com/posts')
        .then(response => {
            console.log(response.data);
            setPosts(response.data.posts);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://apnachat-mn3v.onrender.com/posts/${deleteId}`);
            setPosts(posts.filter(post => post._id !== deleteId));
        } catch (err) {
            console.error('Failed to delete post:', err);
        }
        setDeleteId(null);
    };


  return (
    <>
    <button className='create-post-btn' onClick={() => navigate('/create-post')}>+</button>
    <section className='feed-section'>

        {loading ? (
            <div className="spinner-overlay">
                <div className="spinner"></div>
                <p>Loading posts...</p>
            </div>
        ) : posts.length > 0 ? (

            posts.map(post => (
                <div key={post._id} className='post-card'>
                    <img src={post.image} alt={`Post ${post._id}`} />    
                    <p>{post.caption}</p>
                    <button className='delete-btn' onClick={() => setDeleteId(post._id)}>Delete</button>
                </div>
            ))
        ) : (
            <h1>No posts available</h1>
        )}
    </section>

    {deleteId && (
        <div className='modal-overlay' onClick={() => setDeleteId(null)}>
            <div className='modal-box' onClick={(e) => e.stopPropagation()}>
                <p>Are you sure you want to delete this post?</p>
                <div className='modal-actions'>
                    <button className='modal-btn yes' onClick={confirmDelete}>Yes</button>
                    <button className='modal-btn no' onClick={() => setDeleteId(null)}>No</button>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default Feed;
