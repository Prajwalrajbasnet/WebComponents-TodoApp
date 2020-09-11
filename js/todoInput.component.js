import { html, render } from 'lit-html';

class TodoInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  handleSubmit(ev) {
    this.taskField = this.shadowRoot.querySelector('.task-field');
    ev.preventDefault();
    if (!this.taskField.value) return;
    this.dispatchEvent(
      new CustomEvent('submit', { detail: this.taskField.value })
    );
    this.taskField.value = '';
  }

  _render() {
    render(
      html` <style>
          @import url('https://fonts.googleapis.com/css2?family=Syne&display=swap');
          .task-form {
            width: 100%;
          }
          .task-field {
            width: calc(100% - 24px);
            border: none;
            outline: none;
            padding: 12px;
            font-size: 18px;
            background-color: #f1faee;
            font-family: 'Syne', sans-serif;
          }
        </style>
        <form
          class="task-form"
          @submit=${(ev) => {
            this.handleSubmit(ev);
          }}
        >
          <input
            class="task-field"
            type="text"
            placeholder="Type the task you want to add and press enter"
          />
        </form>`,
      this.shadowRoot
    );
  }
}

customElements.define('todo-input', TodoInput);
