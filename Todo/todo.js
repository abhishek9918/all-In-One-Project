const form = document.querySelector("#addTodoForm");
const addTodo = document.getElementById("todoAdd");
let todoArray = [];

let isEditing = false;
let currentEditIndex = null;

addTodo.addEventListener("click", function (event) {
  event.preventDefault();
  const todoVal = document.getElementById("todoText").value;

  if (isEditing) {
    // Update the existing ToDo
    todoArray[currentEditIndex] = todoVal;
    isEditing = false;
    currentEditIndex = null;
    addTodo.value = "+";
  } else {
    // Add a new ToDo
    if (!todoArray.includes(todoVal) && todoVal !== "") {
      todoArray.push(todoVal);
    }
  }

  document.getElementById("todoText").value = "";
  todoList();
});

function todoList() {
  const todoId = document.getElementById("todoUl");
  todoId.innerHTML = "";
  //   let btnEl = document.getElementById("btn");
  todoArray.forEach((e, index) => {
    let createEl = document.createElement("li");
    createEl.innerText = e;
    let divEl = document.createElement("div");
    //  edit btn
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", function (event) {
      editTodo(index);
    });

    divEl.appendChild(editBtn);
    divEl.classList.add("btns");
    // deleteBtn
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "X";
    delBtn.classList.add("del-botton");
    divEl.appendChild(delBtn);
    divEl.addEventListener("click", function (event) {
      deleteTodo(index);
    });

    // createEl.appendChild(delBtn);
    createEl.appendChild(divEl);
    todoId.appendChild(createEl);
  });
}

function editTodo(editIndex) {
  const todoVal = todoArray[editIndex];
  document.getElementById("todoText").value = todoVal; // Populate input with the existing ToDo
  isEditing = true;
  currentEditIndex = editIndex;
  addTodo.value = "Update";
  addTodo.style.fontSize = "12px";
}

function deleteTodo(delIndex) {
  console.log(delIndex, "dee");
  let deleteIndex = todoArray.indexOf(delIndex);
  todoArray.splice(delIndex, 1);
  console.log(todoArray, "delIndeex");
  todoList();
}
