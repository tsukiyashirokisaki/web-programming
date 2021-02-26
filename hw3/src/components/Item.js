import React from "react";
export default ({ text,id,iscomplete,complete,del}) => {
    //    const {text} = props // expected to be { text: "" }
    const com= {textDecoration: "line-through",opacity:0.5};
    const notcom= {textDecoration: null,opacity:null};
    
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox" onClick={complete}>
                <input type="checkbox" id={id} checked={iscomplete?true:false}></input>
                <label ></label>
            </div>
            {iscomplete?
            <h1 className="todo-app__item-detail" style={com}>{text}</h1>:
            <h1 className="todo-app__item-detail" style={notcom}>{text}</h1>    
            }
            
        <img src={require('./x.png')} className="todo-app__item-x" alt="" onClick={del}></img>
        </li>
        
    );
};
