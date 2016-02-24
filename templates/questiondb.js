/*jslint plusplus: true, browser: true, devel: true */
/*global */

var questiondbData = {
   "bankTitle": "BankTitle",
   "bankId": "thisIsTheId",
   "questions": [{
      "blanks": [{
         "text": "Text Above Blank 1.1",
         "answer": "answer 1.1",
         "isRegEx": true,
         "percent": 50
      }, {
         "text": "Text Above Blank 1.2",
         "answer": "answer 1.2",
         "isRegEx": false,
         "percent": 50
      }]
   }, {
      "blanks": [{
         "text": "Text Above Blank 2.1",
         "answer": "answer 2.1",
         "isRegEx": true,
         "percent": 50
      }, {
         "text": "Text Above Blank 2.2",
         "answer": "answer 2.2",
         "isRegEx": false,
         "percent": 50
      }]
   }]
};

var dataFromUI = {
   "bankTitle": "BankTitle",
   "variables": {
      "a": [1, 2, 3, 4],
      "b": [1, 2, 3, 4]
   },
   "blanks": [{
      "text": "<h1>hi</h1>var a: {{a}}, var b: {{b}}, Text Above Blank 1",
      "answers": [1, 2, 3, 4],
      "isRegEx": true,
      "tolerance": 5,
      "numOfDigits": 0
	}, {
      "text": "var a: {{a}} Text Above Blank 2",
      "answers": [{
         upper: 1.5,
         lower: 0.5
      }, {
         upper: 2.5,
         lower: 1.5
      }, {
         upper: 3.5,
         lower: 2.5
      }, {
         upper: 4.5,
         lower: 3.5
      }],
      "isRegEx": true,
      "numOfDigits": 1
	}, {
      "text": "var b: {{b}}, Text Above Blank 3",
      "answers": ["1", "2", "3", "4"],
      "isRegEx": false
	}]
};