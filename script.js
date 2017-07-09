var todoList = {
  todos: [],
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      // Case1: If everything's true, make everything false
      if (completedTodos == totalTodos) {
        todo.completed = false;
        // Case2: Otherwise, make everything true
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    if (addTodoTextInput.value === "") { //runs when no todo is added
      var alert = document.getElementById('taskIsEmpty');
      alert.innerHTML = "Can't add an empty task";
    } else {
      var clearAlert = document.getElementById('taskIsEmpty').innerHTML = "";
      todoList.addTodos(addTodoTextInput.value);
      addTodoTextInput.value = "";
      view.displayTodos();
    }
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    //get checkbox
    //toggle checkbox on click
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  deleteAll: function() {
    var todosUl = document.querySelector("ul");
    var result = confirm("Delete for sure?");
    if (result) {
      todosUl.innerHTML = "";
    }
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = "";

    todoList.todos.forEach(function(todo, position) { //forEach wykonuje funkcję jednokrotnie
      var todoLi = document.createElement('li'); // dla każdego elementu tablicy
      var todoTextWithCompletion = ""; // funkcja wykonywana = callback
      // forEach = funkcja wyższego rzędu
      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
        //stworz checkbox z wartoscia .checked = true;
        // + document.getElementsByClassName("checkbox").checked = true;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
        //stworz checkbox z wartoscia .checked = false;
        // + document.getElementsByClassName("checkbox").checked=false;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createCheckbox());
      todosUl.appendChild(todoLi);
    }, this); //funkcja kończy się tu
    // 'this' is passed to forEach to ensure the context from the view object is passed to the
    // callback function. The callback function is not a method on the view object
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createCheckbox: function() {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    return checkbox;
  },
  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      //console.log(event.target.parentNode.id);
      //get the element that was clicked on

      var elementClicked = event.target;

      // check if elementClicked is a delete button
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
}

view.setupEventListeners();

//using 'enter' to trigger addTodoTextInput button
//returns false only if there's nothing in the input
document.getElementById("addTodoTextInput")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      if (document.getElementById("addTodoTextInput").value === "") {
        var alert = document.getElementById('taskIsEmpty').innerHTML = "Can't add an empty task";
      } else {
        document.getElementById("addTodoButton").click();
      }
    }
  });

//using 'enter' to trigger changeTodoTextInput button
document.getElementById("changeTodoTextInput")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      if (document.getElementById("changeTodoTextInput").value === "") {
        return false;
      } else {
        document.getElementById("changeTodoButton").click();
      }
    }
  });
