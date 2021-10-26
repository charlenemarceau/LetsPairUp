import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrend } from "../../actions/post.actions";
import { isEmpty } from "../../Utils";
import { Link } from "react-router-dom";
import './trend.css'

function Trend() {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendingList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      // in order to sort the posts, need an array
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArr = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArr.length = 3;
      dispatch(getTrend(sortedArr));
    }
  }, [posts, dispatch]);

  return (
    <div className="trendingContainer">
      <h3>Tendance</h3>
        <ul>
          {trendingList.length &&
            trendingList.map((post) => {
              return (
                <li key={post._id} className="trendingPost">
                  
                  <div >
                    {post.picture && <img src={post.picture} alt="post-pic" />}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img src={usersData[0] && usersData.map((user) => {
                        if (user._id === post.posterId) {
                          return user.avatar;
                        } else return null;
                      })
                      .join("")
                    } alt="profil-pic"/>
                    )}
                  </div>
                  <div className="trendingPostName">
                  <Link to={`/profil${!isEmpty(usersData[0]) && usersData
                    .map((user) => {
                      if (user._id === post.posterId) return user.username;
                      else return null;
                  }).join("") }`}
                 style={{textDecoration:"none"}}>
                    {usersData[0] && usersData.map((user) => {
                      if (user._id === post.posterId) {
                        return user.username;
                      } else { return null;}
                    })}</Link>
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                  </div>
                </li>
              );
            })}
        </ul>
    </div>
  );
};


export default Trend;
