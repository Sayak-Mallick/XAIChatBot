


export const createTimeStamp = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;
    return timeString;
}


export const findQuestionFromSampleData = (array, substring) => {

    const str = substring.toLowerCase()
    if(str === "hi" || str === "hii" || str === "hello" || str === "hey"){
        return ([{response: "Hello, how may I help you?"}]);
    }
    return array.filter(obj => obj.question.toLowerCase().includes(substring.toLowerCase()));
}


export const saveChatToLocal = currentChat => {
    
    const newConvo = {id: `convo-${new Date()/1}`, conversation: currentChat}
    let allConvo = [ newConvo ];
        
    const pastConvo = JSON.parse(window.localStorage.getItem("pastConversations"));
    if(pastConvo){  
        allConvo = [newConvo, ...pastConvo];
    }

    window.localStorage.setItem("pastConversations", JSON.stringify(allConvo));
}



export const updateByLikeDislike = (chatCardId, reaction, currentChat, iconsData) => {
    const {likeOutlinedIcon, dislikeOutlinedIcon, likeFilledIcon, dislikeFilledIcon} = iconsData;
    let index;
    for(let i = 0; i < currentChat.length; i++){
      if(currentChat[i].id === chatCardId){
        index = i;
        break;
      }
    }
    //"src/assets/like-outline-black.svg"
    //"/src/assets/dislike-outline-black.svg"
    if(index){
      let updatedChat = [...currentChat];
      if(reaction === "like"){
        // updatedChat[index].like = "/src/assets/like-filled-black.svg";
        // updatedChat[index].dislike = "/src/assets/dislike-outline-black.svg";
        updatedChat[index].like = likeFilledIcon;
        updatedChat[index].dislike = dislikeOutlinedIcon;
      }else{
        {
          // updatedChat[index].like = "/src/assets/like-outline-black.svg";
          // updatedChat[index].dislike = "/src/assets/dislike-filled-black.svg";
          updatedChat[index].like = likeOutlinedIcon;
          updatedChat[index].dislike = dislikeFilledIcon;
        }
      }

      return updatedChat;
    }
    return currentChat;
}