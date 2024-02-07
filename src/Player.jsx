import { useState } from "react";

const Player=({initialTitle,symbol, isActive, onChangeName})=>{
    const [isEditing, setIsEditing]=useState(false);
    const [name,setName]=useState(initialTitle);
    function handleChange(event){
        //console.log(event);
        setName(event.target.value)
    }
     function handleClick(){
        //{isEditing?setIsEditing(false):setIsEditing(true)}
        setIsEditing(editing=>!editing)
        //setIsEditing(!isEditing);
        if(isEditing){
        onChangeName(symbol, name)}
     }
    let playerName=<span className="player-name">{name}</span>
    let Edit="Edit"
    if (isEditing===true){
        playerName=<input type="text" defaultValue={name} onChange={handleChange}/>
        Edit="Save"
    }

    return(
        <li className={isActive?'active':undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick} >{Edit}</button>
        </li>
    );
}

export default Player;