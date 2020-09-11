import { html, LitElement } from 'lit-element';
const LOCAL_STORAGE_KEY = 'WC-Todos';

class TodoApp extends LitElement {
  constructor() {
    super();
    // array to store all the todos
    this.todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      { task: 'Learn Web Components', completed: false },
      { task: 'Finish Todo App', completed: false },
      { task: "Learn about project and it's scope", completed: true },
    ];
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(e) {
    this.todos = [...this.todos, { task: e.detail, completed: false }];
    this.saveTodos();
    this.requestUpdate('todos');
  }

  removeTodo(e) {
    this.todos = [
      ...this.todos.slice(0, e.detail),
      ...this.todos.slice(e.detail + 1, this.todos.length),
    ];
    this.saveTodos();
    this.requestUpdate('todos');
  }

  toggleCompleted(e) {
    const itemBefore = this.todos[e.detail];
    const list = [...this.todos];
    list[e.detail] = Object.assign({}, itemBefore, {
      completed: !itemBefore.completed,
    });
    this.todos = [...list];
    this.saveTodos();
    this.requestUpdate('todos');
  }

  saveTodos() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos));
  }

  //method which gets called initially and everytime the UI needs to update
  render() {
    return html` <style>
        .applet {
          background-color: #fff;
          display: inline-block;
          min-width: 450px;
          margin-bottom: 25px;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .todo-list {
          padding: 0 12px;
          margin-bottom: 20px;
        }
      </style>
      <section class="applet">
        <todo-input @submit=${this.addTodo}></todo-input>
        <ul class="todo-list">
          ${this.todos.map(
            (item, index) =>
              html`<todo-item
                .task=${item.task}
                .completed=${item.completed}
                .index=${index}
                @toggle=${this.toggleCompleted}
                @delete=${this.removeTodo}
              ></todo-item>`
          )}
        </ul>
      </section>`;
  }
}
customElements.define('todo-app', TodoApp);
