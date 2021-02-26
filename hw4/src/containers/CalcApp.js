import React, { useState } from 'react';

import CalcButton from '../components/CalcButton';

function CalcApp () {
    const [prevnum,setprevnum] = useState(0);
    const [number,setnumber] = useState(null);
    const [display,setdisplay] = useState(0);
    const [first,setfirst] = useState(true);
    
    const [oper,setoper] = useState(null);
    const resetState = ()=> {
      setnumber(0);setdisplay(0);setoper(null);setprevnum(0);
      console.log(number,prevnum);
    }
    const updatenum = (n)=>{
      setfirst(true);
      if (n===null){
        setnumber(n);
        setdisplay(n);
        }
      else{
        setnumber(number*10+n);
        setdisplay(number*10+n);
        
      }
      console.log(first,number,prevnum);
      
    }
    
    const updateoper = (o)=>{
      console.log(first,number,prevnum);
      if (first){
        if (oper!==null){
          // result();
          // setdisplay(prevnum);
          equal();
          setnumber(null);
        
          
        }
        else if (number!==null){
          setprevnum(number); 
          setnumber(null);
        
        
        }
        
        
      
      }
      setoper(o);
      console.log(first,number,prevnum);
      setfirst(false);
     
      
        
      
      
      
        
      
    }
    const equal = ()=>{
      console.log(number,prevnum);
      let cal;
      if (oper==="+"){
        cal=number+prevnum;
      }
      else if (oper==="-"){
        cal=prevnum-number;
      }
      else if (oper==="×"){
        cal=number*prevnum;
      }
      else if (oper==="÷"){
        cal=prevnum/number;
      }
      setoper(null);
      setprevnum(cal);
      setnumber(cal);
      setdisplay(cal);
    }
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
    <div className="calc-display">{display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={resetState}>AC</CalcButton>
            <CalcButton >+/-</CalcButton>
            <CalcButton onClick={()=>setoper("%")}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={()=>updateoper("÷")}>÷</CalcButton>
          </div>
          <div className="calc-row">
            {[7,8,9].map(ele=>
              <CalcButton className="calc-number" onClick={()=>{updatenum(ele)}}>{ele}</CalcButton>)}
              <CalcButton className="calc-operator" onClick={()=>updateoper("×")}>×</CalcButton>
            </div>
            <div className="calc-row">
            {[4,5,6].map(ele=>
                <CalcButton className="calc-number" onClick={()=>{updatenum(ele)}}>{ele}</CalcButton>)}
              <CalcButton className="calc-operator" onClick={()=>{updateoper("-")}}>-</CalcButton>
            </div>
            <div className="calc-row">
            {[1,2,3].map(ele=>
                <CalcButton className="calc-number" onClick={()=>{updatenum(ele)}}>{ele}</CalcButton>)}
              
              <CalcButton className="calc-operator"  onClick={()=>{updateoper("+")}}>+</CalcButton>
            </div>
            <div className="calc-row">
              <CalcButton className="calc-number bigger-btn" onClick={()=>{updatenum(0)}}>0</CalcButton>
              <CalcButton className="calc-number">.</CalcButton>
              
              <CalcButton className="calc-operator"  onClick={()=>{equal()}}>=</CalcButton>
            </div>
        </div>
      </div>
    );
  
}


export default CalcApp;
