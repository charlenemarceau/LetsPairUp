import React, {useState, useEffect} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from "axios";


export default function Feed({username}) {
    const [posts, setPosts] = useState(['']);

    useEffect (() => {
        const fetchPosts = async () => {
            const res = username
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("posts/timeline/" );
            setPosts(
                // sorting of posts to arrange them by the newest post first
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [username])

    return (
        <div className='questionFeed'>
            <div className="questionFeedWrapper" >
                {/* if in user profile, the share component will be visible. If not user profile not visible */}
                {/* {(!username || username === user.username) && <Share />} */}
                {posts.map((p, i) => (
                    <Post key={i} post={p}  />
                ))}
            </div>
        </div>
    )
}
