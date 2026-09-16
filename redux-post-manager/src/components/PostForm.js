import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function PostForm(){

    const dispatch = useDispatch();

    const platforms = useSelector(
        state=>state.platforms.platforms
    );

    const [title,setTitle]=useState("");

    const [platform,setPlatform]=useState("");

    const handleSubmit=(e)=>{

        e.preventDefault();

        dispatch(addPost({

            id:Date.now(),

            title,

            platform

        }));

        setTitle("");

        setPlatform("");

    }

    return(

        <form onSubmit={handleSubmit}>

            <input

                placeholder="Enter Post"

                value={title}

                onChange={(e)=>setTitle(e.target.value)}

            />

            <select

                value={platform}

                onChange={(e)=>setPlatform(e.target.value)}

            >

                <option>Select Platform</option>

                {

                    platforms.map(item=>

                        <option
                        key={item.id}
                        value={item.name}
                        >

                            {item.name}

                        </option>

                    )

                }

            </select>

            <button>Add Post</button>

        </form>

    );

}

export default PostForm;