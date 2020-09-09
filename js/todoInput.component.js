const inputTemplate = document.createElement('template');
inputTemplate.innerHTML = `
  <style></style>
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
