const Controller = {
    init(){
        View.init();

        Controller.updateView('');

        View.getButtons().forEach(button =>{
            button.addEventListener('click', function(){
                const value = this.getAttribute('data-value');
                Controller.handleInput(value);
            });
        });
    },

    handleInput(value){
        View.clearError();

        if(value === 'C'){
            Model.reset();
        }else if(value === '='){
            Model.calculate();
        } else if(['+', '-', '*', '/'].includes(value)) {
      View.updateExpression(Model.displayValue + ' ' + value);
      Model.setOperator(value);

    } else {
      Model.appendDigit(value);
    }

    Controller.updateView(value);
  },
    
  updateView(value) {
    if (Model.displayValue === 'Error') {
      View.showError('Error');
    } else {
      View.updateDisplay(Model.displayValue);
    }

    if (value === '=' || value === 'C') {
      View.updateExpression('');
    }
  }
};