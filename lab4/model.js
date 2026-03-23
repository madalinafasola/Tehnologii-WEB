const Model = {
  operand1: null,
  operand2: null,
  operator: null,
  displayValue: '0',
  calculationDone: false,

  appendDigit(digit) {
    if (this.calculationDone) {
      this.reset();
      this.calculationDone = false;
    }
    if (this.displayValue === '0') {
      this.displayValue = digit;
    } else {
      this.displayValue += digit;
    }
  },

  setOperator(op) {
    this.calculationDone = false;
    this.operand1 = parseFloat(this.displayValue);
    this.operator = op;
    this.displayValue = '0';
  },

  calculate() {
    this.operand2 = parseFloat(this.displayValue);

    if (this.operator === '/' && this.operand2 === 0) {
      this.displayValue = 'Error';
      return;
    }

    let result;
    if (this.operator === '+') result = this.operand1 + this.operand2;
    if (this.operator === '-') result = this.operand1 - this.operand2;
    if (this.operator === '*') result = this.operand1 * this.operand2;
    if (this.operator === '/') result = this.operand1 / this.operand2;

    this.displayValue = String(result);
    this.calculationDone = true;
  },

  reset() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = null;
    this.displayValue = '0';
    this.calculationDone = false;
  }
};