function A(){
  var count = 0;
  var countup = function B(){ //countup()だけがcountを操作できる
    count++;
    return count;
  };

  return countup; 
}

var testCountup = A();

alert(testCountup()); //1
alert(testCountup()); //2
alert(testCountup()); 