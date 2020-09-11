import { html, render } from 'lit-html';
class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ['task', 'index', 'completed'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.taskTogglerTemplate = (completed) =>
      html`
        <style>
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
            border: 2px solid #555d50;
          }

          .checkbox-label input:checked ~ .checkbox-custom {
            background-color: #e63946;
            border-radius: 5px;
            -webkit-transform: rotate(0deg) scale(1);
            -ms-transform: rotate(0deg) scale(1);
            transform: rotate(0deg) scale(1);
            opacity: 1;
            border: 2px solid #e63946;
          }

          .checkbox-label .checkbox-custom::after {
            position: absolute;
            content: '';
            left: 12px;
            top: 12px;
            height: 0px;
            width: 0px;
            border-radius: 5px;
            border: solid #009bff;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(0deg) scale(0);
            -ms-transform: rotate(0deg) scale(0);
            transform: rotate(0deg) scale(0);
            opacity: 1;
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
            opacity: 1;
            left: 8px;
            top: 3px;
            width: 6px;
            height: 12px;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            background-color: transparent;
            border-radius: 0;
          }
        </style>
        <label class="checkbox-label">
          <input
            class="toggle-task checkbox "
            ?checked=${completed}
            @click=${(e) => {
              this.dispatchToggle(e);
            }}
            type="checkbox"
          />
          <span class="checkbox-custom"></span>
        </label>
      `;

    this.taskTitleTemplate = (task) => html` <style>
        .taskTitle {
          display: inline-block;
          width: 70%;
          padding-left: 55px;
        }
      </style>
      <span class="taskTitle">${task}</span>`;

    this.deleteBtnTemplate = html`
      <style>
        button {
          background: none;
          outline: none;
          border: none;
        }
        .delete {
          font-weight: bold;
          font-size: 18px;
          color: gray;
          border-radius: 50%;
          border: 2px solid gray;
          padding: 5px 10px;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .delete:hover {
          background: #457b9d;
          color: #fff;
          border: 2px solid #fff;
        }
      </style>
      <button
        class="delete"
        @click=${(e) => {
          this.dispatchDelete(e);
        }}
      >
        X
      </button>
    `;
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, ' : ', newValue);

    if (name === 'task') {
      this.task = newValue;
    } else if (name === 'index') {
      this.index = newValue;
    } else if (name === 'completed') {
      if (newValue === 'true') {
        this.completed = true;
      } else if ((newValue = 'false')) {
        this.completed = false;
      }
    }
    this._render();
  }

  dispatchToggle(ev) {
    ev.preventDefault();
    this.dispatchEvent(new CustomEvent('toggle', { detail: this.index }));
  }

  dispatchDelete(ev) {
    ev.preventDefault();
    this.dispatchEvent(new CustomEvent('delete', { detail: this.index }));
  }

  _render() {
    render(
      html`
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');
          .todo.completed .taskTitle {
            text-decoration: line-through;
            color: gray;
          }
          .todo {
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 300;
            padding: 15px 0;
            border-bottom: 1px solid #d3d3d3;
          }
        </style>
        <li class="todo ${this.completed ? 'completed' : ''}">
          ${this.taskTogglerTemplate(this.completed)}
          ${this.taskTitleTemplate(this.task)} ${this.deleteBtnTemplate}
        </li>
      `,
      this.shadowRoot
    );
  }
}

customElements.define('todo-item', TodoItem);
