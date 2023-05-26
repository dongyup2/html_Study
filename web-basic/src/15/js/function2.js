let add2 = function(x, y) {
    return x + y;
}


main();

function add(x, y){
    return x + y;
}

let test = 10;

function main(){
    let num1 = 10;
    let num2 = 20;
    
   let result = add(num1, num2);
    console.log("결과: " +  result);
    
    result = add2(num1, num2);
    console.log("결과2: " + result);

    result = function(x, y) {return x + y}(num1, num2);
    console.log("결과3: " + result);
}

