// My analisys of the problem
// 1. User might enter any string or negative number here, so we need to check if the input is a positive integer.
// 2. The output is the sum of all positive integers from 1 to n 
// 3. There are three ways to solve this problem
//    a. Use loop to calculate sum of 1 to n        
//    b. Use mathematical formula to calculate sum of 1 to n
//    c. Use recursion to calculate sum of 1 to n

// Implementation 1 : Use loop to calculate sum of 1 to n
var sum_to_n_a = function(n) {
    // your code here
    if(!Number.isInteger(n) || n < 0) {
        return "Please enter a positive integer";
    }
    var sum = 0;
    for (var i = 1; i <= n; i++) { // Loop from 1 to n
        sum += i;
    }
    return sum;
};

// Implementation 2 : Use mathematical formula to calculate sum of 1 to n
var sum_to_n_b = function(n) {
    // your code here
    if(!Number.isInteger(n) || n < 0) {
        return "Please enter a positive integer";
    }
    return n * (n + 1) / 2;
}

// Implementation 3 : Use recursion to calculate sum of 1 to n
var sum_to_n_c = function(n) {
    // your code here
    if(!Number.isInteger(n) || n < 0) {
        return "Please enter a positive integer";
    }
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}