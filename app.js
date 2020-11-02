const form = document.querySelector("form");
const list = document.querySelector(".todoList");
const input = document.querySelector("input");

let items;



loadItems();
eventListeners();


function eventListeners(){

    form.addEventListener("submit",addNewItem);
    list.addEventListener("click",deleteItems);

}


function loadItems(){

    items = getFromLS();


    items.forEach(function(item){
        createItem(item)
    })
}

function createItem(text){
    const div = document.createElement("div");
    div.className = "todo";

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));


    const button = document.createElement("button");
    button.className = "trash";
    button.innerHTML = "<i class='fas fa-trash'></i>";

    div.appendChild(li);
    div.appendChild(button);
    list.appendChild(div);
}

function addNewItem(e){

    if(input.value === ""){
        alert("Lütfen bir veri giriniz...");
    }
    else{
        createItem(input.value);
    
        setFromLS(input.value);
    
        input.value ="";
    }

   

    e.preventDefault();
}

function deleteItems(e){


    if(e.target.className === "fas fa-trash"){
        e.target.parentElement.parentElement.remove();
    }


    deleteFromLS(e.target.parentElement.parentElement.textContent);

    e.preventDefault();
}

function getFromLS(){
    if(localStorage.getItem("items") === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}


function setFromLS(text){
    items = getFromLS();
    items.push(text);
    localStorage.setItem("items",JSON.stringify(items));
}

function deleteFromLS(text){
    items = getFromLS();
    items.forEach(function(item,index){

        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem("items",JSON.stringify(items));
}