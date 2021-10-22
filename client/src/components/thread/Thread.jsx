import React, {useState, useEffect} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './thread.css';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import { isEmpty } from '../../Utils';


export default function Thread({username}) {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch])

    return (
        <div className='thread'>
            <div className="threadWrapper" >
                {/* if in user profile, the share component will be visible. If not user profile not visible */}
                <Share />
                {!isEmpty(posts[0]) && (
                    posts.map((post) => (
                        <Post key={post._id} post={post}  />
                    ))
                ) }
            </div>
        </div>
    )
}
