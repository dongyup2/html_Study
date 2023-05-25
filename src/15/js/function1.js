function add(x, y){
    return x + y;
}

let result = add(10, 20);

console.log(result);

/////////////////////////////////////////////

let result2 = function(x, y){
    return x + y;
}

console.log(result2(10, 20));

//////////////////////////////////////////////

console.log(function (x, y){
    return x + y;
}(10, 20))

//////////////////////////////////////////////

let result3 = (x, y) => {
    return x + y;
}
console.log(result3(20, 30));