/*jslint plusplus: true, node:true */
/*global */
"use strict";

module.exports = (function () {
   function round(number, numOfDigits, makeTextOn) {
      var textOut;

      //round to text

      textOut = number.toFixed(numOfDigits);

      //return as number or text
      if (makeTextOn) {
         return textOut;
      } else {
         return Number(textOut);
      }
   }

   function makeBounds(lower, upper, numOfDigits) {
      return {
         lower: round(lower, numOfDigits, false),
         upper: round(upper, numOfDigits, false)
      };
   }

   function makeBoundsFromTol(answer, tolerance, numOfDigits) {
      var lower, upper, tol;
      if (typeof tolerance === 'string' && tolerance.trim().charAt(tolerance.length - 1) === '%') {
         //if it is a percent
         tol = parseFloat(tolerance) / 100 * answer;
      } else {
         //if is just a number
         tol = tolerance;
      }

      //get base Bounds
      return makeBounds(answer - tol, answer + tol, numOfDigits);
   }

   function makeStep(numOfDigits) {
      return 1 / Math.pow(10, numOfDigits);
   }

   function makeList(bounds, numOfDigits) {
      function itemIndexFromEnd(possibleNumbers, item) {
         var index = possibleNumbers.length,
            i;
         for (i = possibleNumbers.length - 1; i > -1; i -= 1) {
            if (possibleNumbers[i].text === item.text && i < index) {
               index = i;
            }
         }

         return index;
      }

      var step, i,
         possibleNumbers = [],
         numToAdd = bounds.lower;
      step = makeStep(numOfDigits);

      //make the list
      for (i = 0; numToAdd <= bounds.upper; i += 1) {
         possibleNumbers.push(numToAdd);
         //this is for floating point math, to fix the 0 not being 0 problem
         numToAdd = bounds.lower + (i * step);
      }

      //make text counter parts
      possibleNumbers = possibleNumbers.map(function (item) {
         var itemText = round(item, numOfDigits, true);
         return {
            num: item,
            text: itemText,
            decPointIndex: itemText.indexOf('.')
         };
      });

      //make sure only has unique numbers
      possibleNumbers = possibleNumbers.filter(function (item, count) {
         return itemIndexFromEnd(possibleNumbers, item) === count;
      });

      return possibleNumbers;
   }

   function simpleCuts(possibleNumbers, listOfLists) {
      function cutNow(item, nextItem) {

         //at end of array
         if (typeof nextItem === 'undefined') {
            return true;
         }

         //Length changes
         if (item.text.length !== nextItem.text.length) {
            return true;
         }

         //cut at decimal moves
         if (item.decPointIndex !== nextItem.decPointIndex) {
            return true;
         }

         //cut at from negitives to non negitive -- im pretty sure length above handles this
         if (item.num < 0 && nextItem.num >= 0) {
            return true;
         }

         return false;
      }
      var lastCut = 0,
         i;
      for (i = 0; i < possibleNumbers.length; ++i) {
         if (cutNow(possibleNumbers[i], possibleNumbers[i + 1])) {
            listOfLists.push(possibleNumbers.slice(lastCut, i + 1));
            lastCut = i + 1;
         }
      }
   }

   function trieFromList(list) {
      var Trie = require('trie-hard'),
         trie = new Trie();

      //put them in
      list.forEach(function (item, count) {
         trie.add(item.text);
      });
      return trie;
   }

   function debugData(data) {
      //print possibleNumbers
      console.log('************ DEBUG ************');
      console.log(data.possibleNumbers.map(function (item) {
         return item.text;
      }));
      console.log('************ END DEBUG ************');
   }

   function addEnd(text) {
      var reg = '';
      if (text.indexOf('.') !== -1) {
         reg = text + '\\d*\\s*';
      } else {
         reg = text + '(?:\\.\\d*)?\\s*';
      }
      return reg;

   }

   function fromTolerance(answer, tolerance, numOfDigits) {
      var bounds = makeBoundsFromTol(answer, tolerance, numOfDigits);
      return process(bounds, numOfDigits);
   }

   function fromBounds(lower, upper, numOfDigits) {
      var bounds,
         tempBound;

      //make sure they are in the correct order
      if (lower > upper) {
         tempBound = lower;
         lower = upper;
         upper = tempBound;
      }

      bounds = makeBounds(lower, upper, numOfDigits);
      return process(bounds, numOfDigits);
   }

   function process(bounds, numOfDigits) {
      var possibleNumbers,
         listOfLists = [],
         listOfRegEx = [],
         listOfTries = [],
         trieToRegEx = require('./trieToRegEx.js'),
         data,
         regExOut;
      possibleNumbers = makeList(bounds, numOfDigits);

      //cut it up
      simpleCuts(possibleNumbers, listOfLists);

      //regexs from lists
      listOfLists.forEach(function (list) {
         var trie = trieFromList(list).toObject();
         listOfTries.push(trie);
         listOfRegEx.push(trieToRegEx(trie));
         //FIX when you don't need check your lists any more
         //listOfRegEx.push(trieToRegEx(trieFromList(list).toObject()));
      });

      //FIX when you don't need check your lists any more
      data = {
         possibleNumbers: possibleNumbers,
         listOfLists: listOfLists,
         listOfTries: listOfTries,
         listOfRegEx: listOfRegEx
      };
      //debugData(data);
      regExOut = '(?:' + listOfRegEx.join('|') + ')';
      regExOut = addEnd(regExOut);
      return '^\\s*' + regExOut + '$';
   }

   return {
      fromTolerance: fromTolerance,
      fromBounds: fromBounds
   };

}());