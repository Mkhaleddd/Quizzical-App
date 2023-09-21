import { nanoid } from "nanoid";
import React from "react";



 export default function Questions(props) {
function handleAnswer(answer) {
    if (props.question.checked) return;
  props.handleClicks(answer,props.id);
 
}    
 let answers=props.question.answers.map((answer)=>{
       let id='';
       if (props.question.checked) {          
        if (props.question.correct===answer) 
           { id='correct'; }    
    else if (props.question.selected===answer) 
        { id='incorrect';}
        else  id="not-selected";
              
    }    
    return(
       <button key={nanoid()} 
       onClick={()=>handleAnswer(answer)}  
       id={id} 
       className="answers"
       >{answer.replace(/&quot;|&#039;|&iuml;|&amp;|&deg;|&Prime;|&prime;/g,"")}</button>
    )

})

    return(     
    <div className="container" >
        <div className="col">
        <h2>{props.question.question.replace(/&quot;|&#039;/g,"").replace(/&eacute;/,'e')}</h2>
        <br></br>
                    <div>
                    {answers}
                    </div>
        </div>
    </div>
        
    )
}