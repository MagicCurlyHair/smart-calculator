// cache is used for chaining operations correctly

class SmartCalculator {
  constructor(initialValue) {
    this.value = initialValue;
    this.cache = [];
    this.lastOperationPowOne = false;
  }

  valueOf(){
    if (this.cache.length != 0){
      this.unwrapCache();
    }
    return this.value;
  }

  add(number) {
    this.lastOperationPowOne = false;
    if (this.cache.length != 0){
      this.unwrapCache();
    }
    this.cache.push([number, 'add']);
    return this;
  }
  
  subtract(number) {
    this.lastOperationPowOne = false;
    if (this.cache.length != 0){
      this.unwrapCache();
    }
    this.cache.push([number, 'subtract']);
    return this;
  }

  multiply(number) {
    this.lastOperationPowOne = false;
    this.cache.push([number, 'multiply']);
    return this;
  }

  devide(number) {
    this.lastOperationPowOne = false;
    this.cache.push([number, 'divide']);
    return this;
  }

  pow(number) {
    if (number == 1){
      this.lastOperationPowOne = true;
    }
    else if (this.lastOperationPowOne){
      return this;
    }
    else if (this.cache.length != 0){
      const popExp = this.cache.pop();
      popExp[0] = Math.pow(popExp[0], number);
      this.cache.push(popExp);
      this.lastOperationPowOne = false;
    }
    else{
      this.value = Math.pow(this.value, number);
      this.lastOperationPowOne = false;
    }
    return this;
  }

  performOperation(a, b, operation){
    switch(operation){
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        return a / b;
    }
  }

  unwrapCache(){
    let expA = this.cache.pop();
    let numLast = expA[0];
    let operationLast = expA[1];
    while (this.cache.length > 0){
      let expB = this.cache.pop();
      let numPre = expB[0];
      let operationPre = expB[1];
      numLast = this.performOperation(numPre, numLast, operationLast);
      operationLast = operationPre;
      }
    this.value = this.performOperation(this.value, numLast, operationLast);
  }
}

module.exports = SmartCalculator;
