import React, { useState, useEffect } from "react";
import "./rightbar.css";
import Follow from "../follow/Follow";
import FriendsHint from "../friendsHint/FriendsHint";
import { useParams } from "react-router";
import axios from "axios";
import ProfilInfo from "../ProfilInformations/ProfilInfo";

export default function RightbarProfil() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <ProfilInfo />
      <div className="rightbarFollowings">
        <Follow />
        <FriendsHint />
      </div>
    </>
  );
}
