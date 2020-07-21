const data = {
	currentTodo: null,
	completed: 0,
	todos: [
		{
			name: 'breakfast', 
			complete: false
		  },
		{
			name: 'Watch TV', 
			complete: false
	  	},
	  	{
			name: 'Eat Lunch', 
			complete: false
	  	},
	  	{
			name: 'Take Shower', 
			complete: false
	  	},
	  	{
			name: 'Push 1 Commit', 
			complete: false
	  	}
	]
};
  
const appControler = {
	init() {
	  view.init();
	},
  
	getTodos() {
	  return data.todos;
	},
  
	getTotalTodos() {
	  return data.todos.length;
	},
  
	getCompletedTodos () {
	  return data.completed;
	},
  
	addTodo(todo) {
	  data.todos.push(todo);
	},
  
	deleteTodo(todo) {
	  const index = data.todos.findIndex(t => t.name === todo.name);
	  data.todos.splice(index, 1);
	},
  
	setCurrentTodo(todo) {
	  return currentTodo = todo;
	},
  
	completeTodo() {
	  currentTodo.complete = true;
	  data.completed++;
	},
  
	unCompleteTodo() {
	  currentTodo.complete = false;
	  data.completed--;
	}
};
  
const view = {
	init() {
		this.todoContainer = document.querySelector('.todos');
		this.todoArr = appControler.getTodos();
		this.loadTodos();
		this.updateTotal();
	},
	
	loadTodos() {
	  	this.todoContainer.innerHTML = '';
		for (const todo of this.todoArr) {
			let div = document.createElement('div');
			div.classList.add('todo');
			let p = document.createElement('p');
			p.textContent = todo.name;
			let btn = document.createElement('button');
			btn.classList.add('delete');
			btn.textContent = 'x';
			div.appendChild(p);
			div.appendChild(btn);
			this.todoContainer.appendChild(div);
	
			p.addEventListener('click', () => {
				appControler.setCurrentTodo(todo);
				p.classList.toggle('completed');
				if (p.classList.contains('completed')) {
					appControler.completeTodo();
					this.updateComplete();
				} else {
					appControler.unCompleteTodo();
					this.updateComplete();
				}
			});
	
			btn.addEventListener('click', () => {
				appControler.deleteTodo(todo);
				btn.parentNode.remove();
				this.updateTotal();
			});
		}
	},
  
	updateTotal() {
		let todoCount = document.querySelector('#count');
		let todoTotal = appControler.getTotalTodos();
		todoCount.innerHTML = `Todos: <span>${todoTotal}</span>`;
	},
	
	addNewTodo() {
	  	let todoText = document.querySelector('#input');
	  	let newTodo = {
			name: todoText.value,
			complete: false
		};
		appControler.addTodo(newTodo);
		let div = document.createElement('div');
		div.classList.add('todo');
		let p = document.createElement('p');
		p.textContent = newTodo.name;
		let btn = document.createElement('button');
		btn.classList.add('delete');
		btn.textContent = 'x';
		div.appendChild(p);
		div.appendChild(btn);
		this.todoContainer.appendChild(div);
	
		p.addEventListener('click', () => {
			appControler.setCurrentTodo(newTodo);
			p.classList.toggle('completed');
			if (p.classList.contains('completed')) {
				appControler.completeTodo();
				this.updateComplete();
			} else {
				appControler.unCompleteTodo();
				this.updateComplete();
			}
		});
	  
		btn.addEventListener('click', () => {
			appControler.deleteTodo(newTodo);
			btn.parentNode.remove();
			this.updateTotal();
		});  
			
		this.updateTotal();
		todoText.value = '';
	},
	
	updateComplete() {
		let todosCompleted = document.querySelector('#completed');
		let todoCompleted = appControler.getCompletedTodos();
		todosCompleted.innerHTML = `Completed: <span>${todoCompleted}</span>`;
	}
  };
  
appControler.init();
let btnAdd = document.querySelector('.add-todo');
btnAdd.addEventListener('click', () => {
	let todoText = document.querySelector('#input');
	if(todoText.value === '') {
		alert('You must write something!');
    } else {
		view.addNewTodo();
		todoText.value = '';
	}
});
  