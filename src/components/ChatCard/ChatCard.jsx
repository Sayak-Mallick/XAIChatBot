import React, { useContext, useState } from 'react';
//styles
import "./ChatCard.css";
//assets
import likeOutlined from "../../assets/like-outline-black.svg";
import likeFilled from "../../assets/like-filled-black.svg";
import dislikeOutlined from "../../assets/dislike-outline-black.svg";
import dislikeFilled from "../../assets/dislike-filled-black.svg";
//contexts
import { ThemeContext } from '../../AllContexts';
//MUI
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';



function RatingSize() {
  return (
    <Stack spacing={1}>
      <Rating name="size-small" defaultValue={2} size="small" />
      <Rating name="size-medium" defaultValue={2} />
      <Rating name="size-large" defaultValue={2} size="large" />
    </Stack>
  );
}
const Thumbs = ({likeDislikeReply, id, like, dislike}) => {
    return (
        <span className='thumbsWraper'>
            <img src={like} alt='like button' onClick={()=>likeDislikeReply(id,"like")}/>
            <img src={dislike} alt='dislike button' onClick={()=>likeDislikeReply(id,"dislike")}/>
        </span>
    )
}

const ChatCard = props => {
    //props
    const { name, message, time, icon, customClass, likeDislikeReply, id, like, dislike } = props;
    //states
    const [rate, setRate] = useState({});
    // ..contexts
    const [theme, setTheme] = useContext(ThemeContext);
    return (
        <div className={`ChatCard ChatCardTheme-${theme} ${customClass}`}>
            <span className='chatCardImage-wrapper'>
                <img src={icon} alt={`${name} icon`} className='chatCardImage'/>
            </span>
            <span className='chatCardTexts'>
                <span className='chatCardName'>{name}</span>
                <span className='chatCardMessage'>
                    {/* <span className='typing'>typing...</span> */}
                    <span className='messageAppear'>{message}</span>
                </span>
                <span className='chatCardTime'>
                    <span> {time} </span>
                    {name==="bot ai" ? <Thumbs like={like} dislike={dislike} likeDislikeReply={likeDislikeReply} id={id}/> : null}
                </span>
            </span>
        </div>
    );
};

export default ChatCard;