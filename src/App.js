window.addEventListener('keydown',evt =>  {
    if (evt.keyCode == 73 && evt.ctrlKey && evt.shiftKey || evt.ctrlKey && evt.keyCode == 189 || evt.ctrlKey && evt.shiftKey && evt.keyCode == 187) evt.preventDefault(); 
    //Disabling Dev Tools Shortcuts
})

//document.querySelector(".quit-btn").addEventListener('click', e => {
//    window.close();
//}) Not Commented on the release version, this function is responsible to close the program when the exit/quit button visible on desktop apps is clicked.

//Todo List Logic begins below

let _items = [],_itemIsStriked = [];

let item_text = document.querySelector(".item-text");
let add_btn = document.querySelector(".add-btn");

let items_container = document.querySelector(".items-container");

window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("2DO-local-store-items") && localStorage.getItem("2DO-local-store-itemIsStriked")){
        _items = JSON.parse(localStorage.getItem("2DO-local-store-items"));
        _itemIsStriked = JSON.parse(localStorage.getItem("2DO-local-store-itemIsStriked"));
        update_items_container();    
    }
});//Checking and Displaying Todo Items in case the user had used the app and killed the lifecycle


let update_localStorage = () => {
    localStorage.setItem("2DO-local-store-items", JSON.stringify(_items));
    localStorage.setItem("2DO-local-store-itemIsStriked", JSON.stringify(_itemIsStriked));
}

let addItem = () => {
    let item = item_text.value.trim();
    if(item !== "" && !_items.includes(item)){
        _items.push(item);
        _itemIsStriked.push(false);
        update_items_container();
        update_localStorage();
    }
    item_text.value = "";
}

let strikeItem = (elem, index) => {
    if(!_itemIsStriked[index]) {
        elem.path[1].style.textDecoration = "line-through";
        _itemIsStriked[index] = true;
    }
    else{
        elem.path[1].style.textDecoration = "none";
        _itemIsStriked[index] = false;
    }
    update_localStorage();
}

let changeItem = (elem, index) => {
    _items[index] = (elem.target.innerHTML);
    update_localStorage();
}

let removeItem = (index) => {
    _items.splice(index, 1);
    update_items_container();
    update_localStorage();
}

let update_items_container = () => {
    items_container.innerHTML = "";

    _items.map((item, index) => {
        let itemDOM = document.createElement("div");
        let tickIMG = document.createElement("img");
        let editItem = document.createElement("div");
        let deleteItem = document.createElement("img");

        itemDOM.className = "item";
        tickIMG.className = "tick-btn";
        editItem.className = "edit-item";
        deleteItem.className = "delete-item";

        tickIMG.src = "./button-icons/Tick.svg";
        editItem.contentEditable = true;
        editItem.innerHTML = item;
        deleteItem.src = "./button-icons/Delete.svg";

        tickIMG.onclick = (e) => {
            strikeItem(e, index);
        }
        editItem.onkeyup = (e) => {
            changeItem(e, index);
        }
        editItem.spellcheck = false;
        deleteItem.onclick = (e) => {
            removeItem(index);
        }

        if(_itemIsStriked[index]) itemDOM.style.textDecoration = "line-through";

        items_container.appendChild(itemDOM);
        itemDOM.appendChild(tickIMG);
        itemDOM.appendChild(editItem);
        itemDOM.appendChild(deleteItem);
    })
}

add_btn.addEventListener('click', addItem);
item_text.addEventListener('keypress', e => {
    if(e.keyCode === 13)
        addItem();
})
