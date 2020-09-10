const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');
    .todo.completed .taskTitle{
      text-decoration: line-through;
    }
    .todo{
      font-family: 'Roboto Condensed', sans-serif;
      font-weight: 300;
      padding: 15px 0;
      border-bottom: 1px solid #d3d3d3;
    }
    .taskTitle{
      display: inline-block;
      width: 75%;
      padding-left: 15px;
    }
  </style>
  <li class="todo">
    <input class="toggle-task" type="checkbox" />
    <label class="taskTitle"></label>
    <button class="delete">X</button>
  </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      todoItemTemplate.content.cloneNode(true)
    );
    this._index = this.index;
    this._completed = this.completed;
  }

  connectedCallback() {
    this.todo = this.shadowRoot.querySelector('.todo');
    this.taskToggler = this.shadowRoot.querySelector('.toggle-task');
    this.taskTitle = this.shadowRoot.querySelector('.taskTitle');
    this.deleteTask = this.shadowRoot.querySelector('.delete');

    this.taskToggler.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
    });

    this.deleteTask.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index }));
    });
    this.render();
  }

  static get observedAttributes() {
    return ['task'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'task') {
      this.task = newValue;
    }
  }

  get index() {
    return this._index;
  }

  set index(value) {
    this._index = value;
  }

  get completed() {
    return this.hasAttribute('checked');
  }

  set completed(value) {
    this._completed = Boolean(value);
  }

  render() {
    if (!this.todo) return;
    this.taskTitle.textContent = this.task;
    if (this._completed) {
      this.todo.classList.add('completed');
      this.taskToggler.setAttribute('checked', '');
    } else {
      this.todo.classList.remove('completed');
      this.taskToggler.removeAttribute('checked');
    }
  }
}

customElements.define('todo-item', TodoItem);
