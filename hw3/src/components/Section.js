import React from "react";
import Item from "./Item.js";
export default ({ text }) => {
    //    const {text} = props // expected to be { text: "" }
    return (
        <section className="todo-app__main">
            <input id="todo-input" className="todo-app__input" placeholder={text} value={this.state.value}/>
                <ul id="todo-list" className="todo-app__list">
                    <Item text="todos" id="0"/>
                
                </ul>
                
        </section>
        // <input className="todo-app__header">
        //     <h1 className="todo-app__title">{text}</h1>
        // </input>
    );
};
