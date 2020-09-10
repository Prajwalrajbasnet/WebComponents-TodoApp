const appTemplate = document.createElement('template');
appTemplate.innerHTML = `
<style>
  .applet{
    background-color: #fff;
    display: inline-block;
    min-width: 450px;
    margin-bottom: 25px;
  }
  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .todo-list{
    padding: 0 12px;
    margin-bottom: 20px;
  }
</style>
<section class="applet">
  <todo-input></todo-input>
  <ul class="todo-list"></ul>
</section>
`;

const LOCAL_STORAGE_KEY = 'WC-Todos';

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      appTemplate.content.cloneNode(true)
    );
    // array to store all the todos
    this.todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      { task: 'Learn Web Components', completed: false },
      { task: 'Finish Todo App', completed: false },
      { task: "Learn about project and it's scope", completed: true },
    ];
  }

  connectedCallback() {
    this.todoInput = this.shadowRoot.querySelector('todo-input');
    this.todoList = this.shadowRoot.querySelector('.todo-list');
    this.todoInput.addEventListener('onSubmit', this.addTodo.bind(this));
    this.render();
    this.saveTodos();
  }

  addTodo(e) {
    this.todos = [...this.todos, { task: e.detail, completed: false }];
    this.render();
    this.saveTodos();
  }

  removeTodo(e) {
    this.todos = [
      ...this.todos.slice(0, e.detail),
      ...this.todos.slice(e.detail + 1, this.todos.length),
    ];
    this.render();
    this.saveTodos();
  }

  toggleCompleted(e) {
    const itemBefore = this.todos[e.detail];
    const list = [...this.todos];
    list[e.detail] = Object.assign({}, itemBefore, {
      completed: !itemBefore.completed,
    });
    this.todos = [...list];
    this.render();
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
  }

  //method which gets called initially and everytime the UI needs to update
  render() {
    if (!this.todoList) return;
    this.todoList.innerHTML = '';
    this.todos.forEach((item, index) => {
      const todoItem = document.createElement('todo-item');
      todoItem.setAttribute('task', item.task);
      todoItem.index = index;
      todoItem.completed = item.completed;
      todoItem.addEventListener('onToggle', this.toggleCompleted.bind(this));
      todoItem.addEventListener('onDelete', this.removeTodo.bind(this));
      this.todoList.appendChild(todoItem);
    });
  }
}
customElements.define('todo-app', TodoApp);
