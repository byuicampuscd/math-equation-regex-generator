/*jslint plusplus: true, browser: true, devel: true */
/*global Handlebars, matchNumberRegex*/

function uiDataToQDbData(dataFromUI) {
   "use strict";

   function notSameLength(firstKey, thisKey) {
      alert(firstKey + " and " + thisKey + " do not have the same amount of values. Fix and try again.");
   }

   function makeAnswer(blank, blankIndex, setIndex) {
      var answer = blank.answers[setIndex];

      if (typeof answer === 'string') {
         return answer;
      } else if (blank.isRegEx && typeof answer === 'object') {
         console.log("ANSWER BOUNDS:" + answer.lower + " " + answer.upper);
         return matchNumberRegex.fromBounds(answer.lower, answer.upper, blank.numOfDigits);
      } else if (blank.isRegEx && typeof blank.tolerance !== 'undefined') {
         console.log('answer:', answer);
         console.log('blank.tolerance:', blank.tolerance);
         console.log('blank.numOfDigits:', blank.numOfDigits);
         return matchNumberRegex.fromTolerance(answer, blank.tolerance, blank.numOfDigits);
      } else {
         throw "Answer " + setIndex + " in blank " + blankIndex + " is not in correct form. Answer: " + answer;
      }
   }

   var numberOfQuestions = 0,
      allSameLength = true,
      objectOut = {},
      variableSets = [];

   //check that all the vars have the same length
   Object.keys(dataFromUI.variables).every(function (variable, count, keys) {
      if (count === 0) {
         numberOfQuestions = dataFromUI.variables[variable].length;
      } else if (dataFromUI.variables[variable].length !== numberOfQuestions) {
         allSameLength = false;
         notSameLength("Variable " + keys[0], "variable " + variable);
         return false;
      }
      return true;
   });

   //check that the answers in each of the blanks are the same length as the vars
   //check that all the vars have the same length
   dataFromUI.blanks.every(function (blank, count, blanks) {
      if (blank.answers.length !== numberOfQuestions) {
         allSameLength = false;
         notSameLength("Answers for blank " + (count + 1), "all of the variables");
         return false;
      }
      return true;
   });

   //check for error
   if (!allSameLength) {
      throw "There was an ERROR with processing the variables of the question. See: " + numberOfQuestions;
   }

   /****************************WE PASSED MAKE NEW OBJECT!*******************/
   //bankTitle
   objectOut.bankTitle = dataFromUI.bankTitle;

   //bankId
   objectOut.bankId = "BankGen_" + Date.now();

   /**************************** COMPILE QUESTION DATA *******************/
   //make variableSets
   Object.keys(dataFromUI.variables).forEach(function (variable, variableIndex, keys) {
      dataFromUI.variables[variable].forEach(function (val, valIndex) {
         //make a base object
         if (variableIndex === 0) {
            variableSets.push({});
         }
         //make key and value
         variableSets[valIndex][variable] = val;

      });
   });

   console.log("variableSets:", variableSets);

   //make blanks
   objectOut.questions = variableSets.map(function (set, setIndex) {
      return {
         blanks: dataFromUI.blanks.map(function (blank, blankIndex) {
            console.log(blank);
            return {
               text: Handlebars.compile(blank.text)(set),
               answer: makeAnswer(blank, blankIndex, setIndex),
               isRegEx: blank.isRegEx,
               percent: (100 / dataFromUI.blanks.length).toFixed(2)
            };
         })
      };

   });

   return objectOut;
}