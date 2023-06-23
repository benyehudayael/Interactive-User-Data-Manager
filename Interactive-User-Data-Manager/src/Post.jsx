import React from 'react';
import { useEffect, useState } from 'react';

const Post = ({ title, body }) => {
    const [postStyle, setPostStyle] = useState({
        borderTop: '1px solid #cfcfcf',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        padding: '10px',
        margin: '10px',
    });

    return (
        <div className='post' style={postStyle}>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
};
export default Post;