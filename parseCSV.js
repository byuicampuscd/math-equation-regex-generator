/*jslint plusplus: true, browser: true, devel: true */
/*global d3*/

var parseCSV = (function () {
   "use strict";

   var enums = {
      row: {
         IS_ARR: true,
         NOT_ARR: false
      }
   };

   function toNum(stringIn) {
      var listOut = [],
         isNumber = /^-?\d*\.?\d*$/,
         tempNum = Number(stringIn);
      if (isNumber.test(stringIn) && !isNaN(tempNum)) {
         return tempNum;
      }
      return stringIn;
   }

   function noFirstOrNullString(item, count) {
      return count > 0 && item !== '';
   }

   function valFromRow(csv, searchString, isArray) {
      var i;
      for (i = 0; i < csv.length; ++i) {
         if (csv[i][0].toLowerCase() === searchString) {
            if (!isArray) {
               return csv[i][1];
            } else {
               return csv[i].filter(noFirstOrNullString);
            }
         }
      }
   }

   function parseBankTitle(csv) {
      var bankTitle = valFromRow(csv, 'bank title', enums.row.NOT_ARR);

      //check not blank 
      //TODO check for invalid name chars
      if (bankTitle === '' || typeof bankTitle === 'undefined') {
         throw "bankTitle missing from CSV";
      }

      //add property to obj
      return bankTitle;
   }

   function parseVariables(csv) {

      var i, startingRow,
         variables = {};

      //find the starting right row
      for (i = 0; i < csv.length; ++i) {
         if (csv[i][0].toLowerCase() === 'variables') {
            startingRow = i + 1;
            i = csv.length;
         }
      }

      //loop to get all the vars
      for (i = startingRow; csv[i][0] !== 'blanks' && i < csv.length; ++i) {
         if (csv[i][0] !== '') {
            //remove first and remove empty
            variables[csv[i][0]] = csv[i].filter(noFirstOrNullString);
         }
      }
      return variables;
   }

   function parseOneBlank(rawBlank) {
      function makeAnswers(rawBlank) {
         var answers = valFromRow(rawBlank, 'answers', enums.row.IS_ARR),
            answersUpper = valFromRow(rawBlank, 'answers upper', enums.row.IS_ARR),
            answersLower = valFromRow(rawBlank, 'answers lower', enums.row.IS_ARR);

         if (typeof answers !== 'undefined') {
            return answers.map(function (item) {
               return toNum(item);
            });
         } else if (typeof answersUpper !== 'undefined' && typeof answersLower !== 'undefined') {
            return answersUpper.map(function (upperIn, count) {
               return {
                  upper: toNum(upperIn),
                  lower: toNum(answersLower[count])
               };
            });
         }

         return undefined;
      }

      var tempBlank;

      //PARSE TO OBJ
      tempBlank = {
         text: valFromRow(rawBlank, 'text', enums.row.NOT_ARR),
         answers: makeAnswers(rawBlank),
         isRegEx: valFromRow(rawBlank, 'isregex', enums.row.NOT_ARR).toLowerCase() === 'true',
         tolerance: toNum(valFromRow(rawBlank, 'tolerance', enums.row.NOT_ARR)),
         numOfDigits: toNum(valFromRow(rawBlank, 'numofdigits', enums.row.NOT_ARR))
      };

      //ERROR CHECK AND MAKE FINAL BLANK OBJ
      //TODO
      /*required for a blank 
            either text, answers or both
            
            if isRegEx is true
            Number Of Digits is required
            and either answers (upper and answers lower) or tolerance 
   
            if isRegEx is missing it is assumed false*/
      return tempBlank;
   }

   function parseBlanks(csv) {
      var i, startingRow,
         rawBlanks = [],
         lastCut = 0,
         blanksOut;

      //find the starting right row
      for (i = 0; i < csv.length; ++i) {
         if (csv[i][0].toLowerCase() === 'blanks') {
            startingRow = i + 1;
            i = csv.length;
         }
      }

      //chop up in to raw blanks
      lastCut = startingRow;
      for (i = startingRow; i < csv.length; ++i) {
         //at cut line or at end
         if (csv[i][0] === '') {
            rawBlanks.push(csv.slice(lastCut, i));
            lastCut = i + 1;
         } else if (i === csv.length - 1) {
            rawBlanks.push(csv.slice(lastCut));
         }
      }

      blanksOut = rawBlanks.map(parseOneBlank);
      console.log("rawBlanks:", rawBlanks);
      console.log("blanksOut:", blanksOut);
      return blanksOut;
   }

   return function (csvTextIn) {
      var csvArray = d3.csv.parseRows(csvTextIn),
         csvObj = {
            bankTitle: parseBankTitle(csvArray),
            variables: parseVariables(csvArray),
            blanks: parseBlanks(csvArray)
         };

      console.log(csvArray);
      console.log(csvObj);

   };
}());