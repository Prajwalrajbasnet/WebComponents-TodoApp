const inputTemplate = document.createElement('template');
inputTemplate.innerHTML = `
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Syne&display=swap');
    .task-form{
      width: 100%;
    }
    .task-field{
      width: calc(100% - 24px);
      border: none;
      outline: none;
      padding: 12px;
      font-size: 18px;
      background-color: #F1FAEE;
      font-family: 'Syne', sans-serif;
    }
  </style>
  <form class="task-form">
    <input class="task-field" type="text" placeholder="Type the task you want to add and press enter"/>
  </form>
`;

class TodoInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      inputTemplate.content.cloneNode(true)
    );
  }

  connectedCallback() {
    this.form = this.shadowRoot.querySelector('.task-form');
    this.taskField = this.shadowRoot.querySelector('.task-field');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.taskField.value) return;
      this.dispatchEvent(
        new CustomEvent('onSubmit', { detail: this.taskField.value })
      );
      this.taskField.value = '';
    });
  }
}

customElements.define('todo-input', TodoInput);
