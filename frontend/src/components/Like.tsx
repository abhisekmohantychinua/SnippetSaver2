import React, {useEffect, useState} from "react";
import api from "../api/AxiosConfig.tsx";
import {SnippetDto} from "../models/dto/snippet/SnippetDto.tsx";
import {AxiosResponse} from "axios";
import {AxiosError} from "axios";
import {ErrorDto} from "../models/ErrorDto.tsx";
import {useNavigate} from "react-router-dom";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

interface Props {
    snippetDto: SnippetDto;
}

const Like: React.FC<Props> = ({snippetDto}) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<Array<string>>(snippetDto.likes);
    const [len, setLen] = useState<number>(snippetDto.likes.length);
    const [likedUsers, setLikedUsers] = useState(snippetDto.likedUserNames)
    const navigate = useNavigate()
    const handleLiked = () => {
        setLiked(true)
        if (liked) {
            setLen(len - 1)
            const userIdFromSession = sessionStorage.getItem("userId")
            if (userIdFromSession) {
                const index = likes.indexOf(userIdFromSession)
                setLikes(likes.splice(index, 1))
                setLikedUsers(likedUsers.splice(index, 1))
            }
            setLiked(false)
        } else {
            setLen(len + 1)
            const userIdFromSession = sessionStorage.getItem("userId")
            if (userIdFromSession) {
                let temp = [...likes]
                temp.push(userIdFromSession)
                setLikes(temp)
                temp = [...likedUsers]
                temp.push("You")
                setLikedUsers(temp)
            }
            setLiked(true)
        }
        try {
            const tokenFromSession = sessionStorage.getItem("token")
            api.post(`/api/snip/${snippetDto.id}/like`
                , {}, {headers: {Authorization: "Bearer " + tokenFromSession}}
            )
                .then((response: AxiosResponse) => {
                    console.log(response)
                })
                .catch((error: AxiosError<ErrorDto>) => {
                    navigate('/error', {state: {error: error.response?.data}})
                })

        } catch (error) {
            console.log(error);
            alert("unhandled error");
        }
    };

    useEffect(() => {
        const userIdFromSession: string | null = sessionStorage.getItem("userId");
        if (userIdFromSession != null && snippetDto.likes.includes(userIdFromSession)) {
            setLiked(true);
        }
    }, []);


    return (
        <>
            <div
                className="cursor-pointer fs-4"
                id="liked"
                onClick={handleLiked}
            >
                {liked ? (
                    <ThumbUpIcon/>
                ) : (
                    <ThumbUpOutlinedIcon/>
                )}
                <span className="fs-6 mt-2 ms-1">{len}</span>
            </div>

        </>
    );
};

export default Like;
