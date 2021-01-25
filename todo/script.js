
const input = document.querySelector('#input');
const output = document.querySelector('#output');

let todos = []

const validate = (id) => {
     const input = document.querySelector(id);
     const error = document.querySelector(id + '-error');
  
    if(input.value === '') {
      error.innerText = 'Pleas input data';
      return false
    } else {
        error.innerText = '';
        return true
    } 
}
  

 const  getJsonAsync  = async () => {
  let url = 'https://jsonplaceholder.typicode.com/todos';

  const responce = await fetch(url); 
 const _todos = await responce.json();

  todos = _todos;
  console.log(todos);

  listTodos(todos);
 }
   getJsonAsync ();

const listTodos = (todos) => {
  output.innerHTML = '';

  todos.forEach(todo => {

    output.innerHTML += newTodo(todo);
  })
}
const newTodo = todo => {

    let model = todo.completed ? `
    <div id="${todo.id}" class="todo completed">
      <h3 class="title">${todo.title}</h3>
      <button class="btn btn-danger">X</button>
    </div>
    `
    : `
    <div id="${todo.id}" class="todo">
      <h3 class="title">${todo.title}</h3>
      <button class="btn btn-danger">X</button>
    </div>
    `
    return model
  }
  const createTodo = async title => {
    let url = 'https://jsonplaceholder.typicode.com/todos';
  
    const _todo = {
      title,
      completed: false
    }
  
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(_todo)
    })
  
    const todo = await res.json()
  
    console.log(todo);
    todo.id = Date.now();
  
    todos.unshift(todo)
    listTodos(todos);
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validate('#input')) {
        createTodo(input.value);
          input.value = ''
    } 

    
    // if (input.value === '') {
    //     alert("Pleas input data")
    // }else {
    //     createTodo(input.value);
    //     input.value = '';
    // }
   
  })
  const toggleComplete = (id) => {
    todos.map(todo => {
        if(todo.id == id){
            todo.completed = !todo.completed
        }
        return todo
  })
   listTodos(todos)
}

const removeTodo = id => {
todos = todos.filter(todo => todo.id != id);
listTodos(todos);
}
  
  output.addEventListener('click', e => {
  
    // console.log(e.target.classList.contains('title'))
    if (e.target.classList.contains('title'))
    toggleComplete(e.target.parentNode.id)
  
    if(e.target.classList.contains('btn-danger'))
      removeTodo(e.target.parentNode.id)
      
    })

    
