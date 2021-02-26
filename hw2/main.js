// const input = document.getElementsByTagName("input");
input = document.getElementById("todo-input");
const itemUL = document.getElementById("todo-list");
var list=[];
/*var list_complete=[];
var list_uncomplete=[];*/
var ite=0;
var allbtn = document.getElementById("all");
var completebtn = document.getElementById("complete");
var activebtn = document.getElementById("active");
var state= allbtn;
var footer= document.getElementById("todo-footer");
var root = document.getElementById("root");
state.style.border="1px solid rgba(0, 0, 0, 0.5)";
displaycount();
allbtn.addEventListener("click",function () {
	state.style.border="";
	state=this;
	state.style.border="1px solid rgba(0, 0, 0, 0.5)";
	itemUL.innerHTML="";
	list.filter(ele => ele!=="").forEach(ele=>{itemUL.appendChild(ele.node)})
});
completebtn.addEventListener("click",function(){
	state.style.border="";
	state=this;
	state.style.border="1px solid rgba(0, 0, 0, 0.5)";
	
	itemUL.innerHTML="";
	list.filter(ele => ele.isComplete && ele!="").forEach(ele=>{itemUL.appendChild(ele.node)})})
activebtn.addEventListener("click",function(){
	state.style.border="";
	state=this;
	state.style.border="1px solid rgba(0, 0, 0, 0.5)";
	
	itemUL.innerHTML="";
	list.filter(ele => !ele.isComplete &&ele!="").forEach(ele=>{itemUL.appendChild(ele.node)})})


input.addEventListener("keyup", event => {
	if (event.keyCode === 13 && event.target.value !== '') {
		list[ite]=createnewItem();
		displaycount();
	}
});

document.getElementById("clear").addEventListener("click", function () {
	list.filter(ele => ele.isComplete).forEach(
		function(ele){
			removebtn(ele.node);

			})
	;})
function createnewItem(){
	const itemNode = document.createElement("LI");
	const wrapper = document.createElement("DIV");
	const btn = document.createElement("INPUT");
	const label = document.createElement("LABEL");
	const h1 = document.createElement("H1");
	const img = document.createElement("IMG");
	itemNode.className = "todo-app__item";
	wrapper.className = "todo-app__checkbox";
	btn.type = "checkbox";
	btn.id = ite;
	label.for = ite;
	ite++;
	
	wrapper.appendChild(btn);
	wrapper.appendChild(label);
	label.setAttribute("onClick","clickbtn(this)");
	h1.className = "todo-app__item-detail";
	h1.innerHTML = input.value;
	
	input.value="";
	img.src = "./img/x.png";
	img.className = "todo-app__item-x";
	img.setAttribute("onClick","removebtn(this.parentElement)");
	itemNode.appendChild(wrapper);
	itemNode.appendChild(h1);
	itemNode.appendChild(img);
	if (state!==completebtn){
	itemUL.appendChild(itemNode);
		
	}
	newItem = {node: itemNode, isComplete:false}
	return newItem
}
	
	
function clickbtn(t){
		id=t.for;
		console.log(id);
		inp = document.getElementById(t.for);
		inp.checked=! inp.checked
		list[t.for].isComplete= !list[t.for].isComplete;
		if (list[t.for].isComplete){
			if (state==activebtn){
				itemUL.removeChild(list[id].node);		
			}
		txt=list[t.for].node.querySelector("h1");
		txt.style["textDecoration"] = "line-through";
		txt.style["opacity"] = 0.5;

		}
		else{
			txt.style["textDecoration"] = null;
			txt.style["opacity"] = null;
		}
		
		displaycount();
	};
function removebtn(t) {
	id =t.children[0].children[0].id;
	console.log(id);
	//list[id].isComplete=true;
	if (list[id].parentElement!==null){
	itemUL.removeChild(list[id].node);	
	}
	list[id]="";
	displaycount();

}
function displaycount() {
	var count_txt= document.getElementById("count");
	count=list.filter(ele => !ele.isComplete && ele!=="").length;
	count_=list.filter(ele => ele.isComplete && ele!=="").length;
	
	count_txt.innerHTML=count+" item left";
	if (itemUL.childElementCount===0 && count+count_===0){footer.style.display="none"
	state.style.border="";
	state=allbtn;
	state.style.border="1px solid rgba(0, 0, 0, 0.5)";
	}
	 else{footer.style.display=""}
}
	
