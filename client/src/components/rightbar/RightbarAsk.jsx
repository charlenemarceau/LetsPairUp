import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './rightbar.css'

function RightbarAsk() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/categories');
            setCats(res.data)
        };
        getCats();
    }, [])
    return (
        <div className="CategoryContainer">
            <ul className="sidebarListCat">
            <h3>Categories</h3>
            <div className="CategoryWrapper">
                {cats.map(cat => (
                    <li className="sidebarListItemCat" key={cat._id}>
                        {cat.name}
                    </li>
                ))}
            </div>
            </ul>
        </div>
    )
}

export default RightbarAsk
