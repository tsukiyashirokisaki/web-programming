import React from "react";
export default () => {
    return (
        <footer className="todo-app__footer" id="todo-footer"  >
                <div className="todo-app__total" id="count" display="none"></div>
                <ul className="todo-app__view-buttons">
                    <button id="all">All</button>
                    <button id="active">Active</button>
                    <button id="complete">Completed</button>
                </ul>
                <div className="todo-app__clean" onClick={console.log(123)}><button id="clear" onClick={console.log(123)}>Clear completed</button></div>
            </footer>

        
    );
};
