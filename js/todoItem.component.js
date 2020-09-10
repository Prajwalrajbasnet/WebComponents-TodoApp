const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');
    .todo.completed .taskTitle{
      text-decoration: line-through;
      color: gray;
    }
    .todo{
      font-family: 'Roboto Condensed', sans-serif;
      font-weight: 300;
      padding: 15px 0;
      border-bottom: 1px solid #d3d3d3;
    }
    .taskTitle{
      display: inline-block;
      width: 70%;
      padding-left: 55px;
    }

    .checkbox-label {
      display: block;
      position: relative;
      cursor: pointer;
      font-size: 22px;
      line-height: 24px;
      width: 24px;
      clear: both;
    }

    .checkbox-label input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .checkbox-label .checkbox-custom {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 24px;
      width: 24px;
      background-color: transparent;
      border-radius: 5px;
      transition: all 0.3s ease-out;
      -webkit-transition: all 0.3s ease-out;
      -moz-transition: all 0.3s ease-out;
      -ms-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      border: 2px solid #555D50;
    }


    .checkbox-label input:checked ~ .checkbox-custom {
        background-color: #E63946;
        border-radius: 5px;
        -webkit-transform: rotate(0deg) scale(1);
        -ms-transform: rotate(0deg) scale(1);
        transform: rotate(0deg) scale(1);
        opacity:1;
        border: 2px solid #E63946;
    }


    .checkbox-label .checkbox-custom::after {
        position: absolute;
        content: "";
        left: 12px;
        top: 12px;
        height: 0px;
        width: 0px;
        border-radius: 5px;
        border: solid #009BFF;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(0deg) scale(0);
        -ms-transform: rotate(0deg) scale(0);
        transform: rotate(0deg) scale(0);
        opacity:1;
        transition: all 0.3s ease-out;
        -webkit-transition: all 0.3s ease-out;
        -moz-transition: all 0.3s ease-out;
        -ms-transition: all 0.3s ease-out;
        -o-transition: all 0.3s ease-out;
    }


    .checkbox-label input:checked ~ .checkbox-custom::after {
      -webkit-transform: rotate(45deg) scale(1);
      -ms-transform: rotate(45deg) scale(1);
      transform: rotate(45deg) scale(1);
      opacity:1;
      left: 8px;
      top: 3px;
      width: 6px;
      height: 12px;
      border: solid #FFF;
      border-width: 0 2px 2px 0;
      background-color: transparent;
      border-radius: 0;
    }
    button{
      background: none;
      outline: none;
      border: none;
    }
    .delete{
      font-weight: bold;
      font-size: 18px;
      color: gray;
      border-radius: 50%;
      border: 2px solid gray;
      padding: 5px 10px;
      cursor: pointer;
      transition: 0.3s ease;
    }
    .delete:hover{
      background: #457B9D;
      color: #FFF;
      border: 2px solid #FFF;
    }
  </style>
  <li class="todo">
    <label class="checkbox-label">
      <input class="toggle-task checkbox" type="checkbox" />
      <span class="checkbox-custom"></span>
    </label>
    <span class="taskTitle"></span>
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
