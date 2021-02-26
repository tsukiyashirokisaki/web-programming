import React, { Component } from "react";
// import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";

class TodoApp extends Component {
    constructor(props){
        super();
        this.state={
            value:"",
            items:[],
            count:0,
            allclick:true,
            activeclick:false,
            completeclick:false
        }
        this.handleChange = (e) => {
            this.setState({value: e.target.value});
          }
        console.log(this.state.items)
            
    }
    handleKeyDown = (event) => {
              if (event.key === 'Enter') {
                let item = this.state.items;
                item[this.state.count]={text:this.state.value,id:this.state.count,isComplete:false};
                this.setState(state=>({items:item}))
                this.setState(state=>({value:""}))
                this.setState(state =>({count:state.count+1}));
                console.log(this.state.items)
              }}
    complete = (id)=>{
        let item=this.state.items;
        item.filter(e=>e.id===id)[0].isComplete=!item.filter(e=>e.id===id)[0].isComplete;
        this.setState(state=> ({items:item}));}
        
    del = (id)=>{
        this.setState(state=>({
            items: state.items.filter(e=>e.id!==id)
        }));
        console.log(this.state.items);}
    clear = ()=>{
        this.setState(state=>({items:state.items.filter(e=>!e.isComplete)}));
        console.log(this.state.items)}

       
    
    render() {
        const state= {border:"1px solid rgba(0, 0, 0, 0.5)"};
        const nonstate= {border:""};
        const visible={display:""};
        const invisible={display:"none"};
        
        var display;
        if (this.state.allclick){
            display=this.state.items.map( e=><Item text={e.text} id={e.id} 
                iscomplete={e.isComplete}
                complete={ ()=>this.complete(e.id)} 
                del={()=>this.del(e.id)} />)
        }
        else if(this.state.activeclick){
            display=this.state.items.filter(e=>!e.isComplete).map( e=><Item text={e.text} id={e.id} 
                iscomplete={e.isComplete}
                complete={ ()=>this.complete(e.id)} 
                del={()=>this.del(e.id)} />)
        }
        else if(this.state.completeclick){
            display=this.state.items.filter(e=>e.isComplete).map( e=><Item text={e.text} id={e.id} 
                iscomplete={e.isComplete}
                complete={ ()=>this.complete(e.id)} 
                del={()=>this.del(e.id)} />)
        }
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                <input id="todo-input" className="todo-app__input" placeholder="What needs to be done?"
                 value={this.state.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange}/>
                <ul id="todo-list" className="todo-app__list">
                    {display}
                </ul>
                
            </section>
            <footer className="todo-app__footer" id="todo-footer" style={this.state.items.length===0?invisible:visible} >
                <div className="todo-app__total" id="count" display="none"></div>
                <ul className="todo-app__view-buttons">
                    <button id="all"  style={this.state.allclick?state:nonstate} onClick={()=>this.setState(state=>({allclick:true,activeclick:false,completeclick:false}))}>All</button>
                    <button id="active"style={this.state.activeclick?state:nonstate} onClick={()=>this.setState(state=>({allclick:false,activeclick:true,completeclick:false}))}>Active</button>
                    <button id="complete" style={this.state.completeclick?state:nonstate}onClick={()=>this.setState(state=>({allclick:false,activeclick:false,completeclick:true}))}>Completed</button>
                </ul>
                <div className="todo-app__clean" ><button onClick={this.clear}>Clear completed</button></div>
            </footer>

                
            </>
        );
    }
}

export default TodoApp;
