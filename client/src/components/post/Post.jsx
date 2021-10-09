import React, {useState} from 'react';
import { Users } from "../../dummyData";
import './post.css';
import { FavoriteOutlined, MoreVert } from '@material-ui/icons';

function Post({post}) {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        // if already like vs if not liked before
        setLike(isLiked ? like-1 : like+1) 
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImg' src={Users.filter( u => u.id === post?.userId)[0].profilePicture} alt="" />
                        <span className="postUserName">{Users.filter( u => u.id === post?.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.message}
                    </span>
                    <img className='postImg' src={post.image} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        < FavoriteOutlined className="likeIcon" onClick={likeHandler}/>
                        <span className="postLikeCounter">{like} Au pairs ont aimé</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} commentaires</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
