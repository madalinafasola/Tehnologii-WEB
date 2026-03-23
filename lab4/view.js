const View = {
  displayElement: null,
  expressionElement: null,

  init() {
    this.displayElement = document.getElementById('display');
    this.expressionElement = document.getElementById('expression');
  },

  updateDisplay(value) {
    this.displayElement.textContent = value;
  },

  updateExpression(text) {
    this.expressionElement.textContent = text;
  },

  showError(message) {
    this.displayElement.textContent = message;
    this.displayElement.classList.add('error');
  },

  clearError() {
    this.displayElement.classList.remove('error');
  },

  getButtons() {
    return document.querySelectorAll('button[data-value]');
  }
};