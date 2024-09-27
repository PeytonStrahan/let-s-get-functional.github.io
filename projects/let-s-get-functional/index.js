// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('underbar');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./let-s-get-functional.github.io/projects/let-s-get-functional
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

/*
I: An array of customer objects
O: The number of male customers
*/

var maleCount = function(array) {
    // use _.filter to create an array of only the male customers from the input array, and then return its length
    return _.filter(array, function(customer) {
        return customer.gender === 'male';
    }).length;
};

var femaleCount = function(array) {
    // use _.reduce to get the number of female customers in the input array by creating a counter and then incrementing said counter each time a female customer is found
    // return the result of calling _.reduce
    return _.reduce(array, function(accumulator, current) {
        if (current.gender === 'female') {
            accumulator++;
        }
        return accumulator;
    }, 0);
};

var oldestCustomer = function(array) {
    // use _.reduce to find the customer with the highest age number/property in the input array, and then assign said customer to a variable
    let oldest = _.reduce(array, function(accumulator, current) {
        if (current.age > accumulator.age) { // compare the accumulator's age to each of the current customer's ages
            accumulator = current; // set accumulator to the current customer if said customer's age is higher
        }
        // return accumulator
        return accumulator;
    });

    // return the name of the oldest customer
    return oldest.name;
};

var youngestCustomer = function(array) {
    // use _.reduce to find the customer with the lowest age number/property in the input array, and then assign said customer to a variable
    let youngest = _.reduce(array, function(accumulator, current) {
        if (current.age < accumulator.age) { // compare the accumulator's age to each of the current customer's ages
            accumulator = current; // set accumulator to the current customer if said customer's age is lower
        }
        // return accumulator
        return accumulator;
    });

    // return the name of the youngest customer
    return youngest.name;
};

var averageBalance = function(array) {
    // use _.reduce to add the balance of each customer in the input array, and then assign the sum to a variable
    let sum = _.reduce(array, function(accumulator, current) {
        // create a variable to hold the string that results from removing "$" from the front of the current customer's balance without altering the original
        let currentBal = current.balance.slice(1);
        // use replaceAll to remove the commas from the currentBal string and parseFloat to convert currentBal into a number with a decimal point
        currentBal = parseFloat(currentBal.replaceAll(',', ''));
        // assign accumulator to itself plus currentBal
        accumulator += currentBal;
        // return accumulator
        return accumulator;
    }, 0);

    // return the result of dividing sum by the input array's length
    return sum / array.length;
};

var firstLetterCount = function(array, letter) {
    // use _.reduce to get the number of customers in the input array whose name starts with the input letter by creating a counter and then incrementing said counter each time a name starting with the input letter is found
    // return the result of calling _.reduce
    return _.reduce(array, function(accumulator, current) {
        if (current.name[0].toLowerCase() === letter.toLowerCase()) { // use .toLowerCase to make function case insensitive
            accumulator++;
        }
        return accumulator;
    }, 0);
};

var friendFirstLetterCount = function(array) {

};

var friendsCount = function(array) {

};

var topThreeTags = function(array) {

};

var genderCount = function(array) {

};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
