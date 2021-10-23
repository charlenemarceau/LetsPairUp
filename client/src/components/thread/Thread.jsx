import React, {useState, useEffect} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './thread.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import { isEmpty } from '../../Utils';


export default function Thread({username}) {
    const [loadPost, setLoadPost] = useState(true);
    const [countThread, setCountThread] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () =>  { // infinite scroll
        if (window.innerHeight + document.documentElement.scrollTop + 1 >
             document.scrollingElement.scrollHeight) { // at this point on scroll Y
                 setLoadPost(true); // trigger function
             }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(countThread));
            setLoadPost(false);
            setCountThread(countThread + 5);
        }
        window.addEventListener('scroll', loadMore); // to add an infinite scroll
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, countThread])

    return (
        <div className='thread'>
            <div className="threadWrapper" >
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
