const appTemplate = document.createElement('template');
appTemplate.innerHTML = `
<style></style>
<section>
  <todo-input></todo-input>
  <ul class="todo-list"></ul>
</section>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      appTemplate.content.cloneNode(true)
    );
    // array to store all the todos
    this.todos = [
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
  }

  addTodo(e) {
    this.todos.push({ task: e.detail, completed: false });
    this.render();
  }

  removeTodo(e) {
    this.todos.splice(e.detail, 1);
    this.render();
  }

  toggleCompleted(e) {
    const itemBefore = this.todos[e.detail];
    this.todos[e.detail] = Object.assign({}, itemBefore, {
      completed: !itemBefore.completed,
    });
    this.render();
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
