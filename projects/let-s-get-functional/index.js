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

var friendFirstLetterCount = function(array, customer, letter) {
    // use _.reduce to find the customer object from the input array whose name matches the input customer name (customer), and then reassign the input customer name to the customer object
    customer = _.reduce(array, function(accumulator, current) {
        if (current.name === customer) { // compare the input customer name to each of the current customer's names
            accumulator = current; // set accumulator to the current customer if said customer's name is equal to the inputted customer name
        }
        // return accumulator
        return accumulator;
    });

    // use firstLetterCount to get the number of customers in the customer's friends array whose name starts with the input letter by creating a counter and then incrementing said counter each time a name starting with the input letter is found
    // return the result of calling firstLetterCount
    return firstLetterCount(customer.friends, letter);
};

var friendsCount = function(array, name) {
    // use _.reduce to get the names of all of the customers in the input array whose friends array/list includes the input name by using an empty array as a seed and then pushing the name of each customer into the seeded array each time a name matching the input name is found in the current customer's friends array
    // return the array that results from calling _.reduce
    return _.reduce(array, function(accumulator, current) {
        if (_.reduce(current.friends, function(accumulator, current) { // use _.reduce to return true if the current friends array of the current customer contains the input name and false otherwise
            if (current.name === name) { // compare the input name to each of the current friend names in the current friends array
                accumulator = true; // set accumulator to true if said friend name is equal to the inputted name
            }
            // return accumulator
            return accumulator;
        }, false)) { // accumulator is set to false by default
            accumulator.push(current.name); // push the current customer's name to the accumulator if a matching name was found in its friends array
        }
        // return accumulator
        return accumulator;
    }, []);
};

var topThreeTags = function(array) {
    // use _.reduce to access the tags array of each of the customers in the input array, making sure to use an empty object as a seed
    // set the object that results from calling _.reduce to a variable
    const allTags = _.reduce(array, function(accumulator, current) {
        accumulator = _.reduce(current.tags, function(accumulator, current) { // use _.reduce to push each tag onto the accumulator object, making sure to include the outer _.reduce's accumulator as the seed and to assign the result of this _.reduce's call to the outer _.reduce's accumulator
            if (!accumulator[current]) { // check if the accumulator object does not include the current tag as a key yet
                accumulator[current] = 1; // assign the current tag as a key and set it to 1 if so
            } else (
                accumulator[current]++ // otherwise, increment the value of the current tag key/value pair in accumulator by 1
            )
            // return accumulator
            return accumulator;
        }, accumulator) // accumulator is set to the outer _.reduce's accumulator
        
        // return accumulator
        return accumulator;
    }, {});

    // create an empty array to hold the top three most common tags
    const topThreeArr = [];
    
    // loop through the allTags object
    for (let key in allTags) {
        if (topThreeArr.length < 3) { // check if the topThreeArr is still under 3 in its length
            topThreeArr.push(key); // push the current key into topThreeArr if so
        } else {
            // otherwise, loop through the topThreeArr array
            for (let i = 0; i < topThreeArr.length; i++) {
                // check if the value in the allTags object that uses the value in the current index as a key name is less than the value of the current key/value pair in the outer loop
                if (allTags[topThreeArr[i]] < allTags[key]) {
                    // set the value of the current topThreeArr index to the current key if so
                    topThreeArr[i] = key;
                    // break to prevent the same tag from showing up multiple times in the topThreeArr array
                    break;
                }
            }
        }
    }

    // return topThreeArr
    return topThreeArr;
};

var genderCount = function(array) {
    // use _.reduce to get the genders of all of the customers in the input array by using an empty object as a seed
    // return the object that results from calling _.reduce
    return _.reduce(array, function(accumulator, current) {
        if (!accumulator[current.gender]) { // check if the accumulator object does not include the current gender as a key yet
            accumulator[current.gender] = 1; // assign the current gender as a key and set it to 1 if so
        } else (
            accumulator[current.gender]++ // otherwise, increment the value of the current gender key/value pair in accumulator by 1
        )
        // return accumulator
        return accumulator;
    }, {}) // accumulator is set to an empty object at first
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
