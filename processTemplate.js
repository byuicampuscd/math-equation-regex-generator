/*jslint browser:true, devel:true, plusplus:true */
/*globals Handlebars*/
var processTemplate = (function () {
	'use strict';

	return function questionCount() {
		var questionBank = JSON.parse(document.getElementById('variables').value),
			numberQuestions;
		console.log("questionBank",questionBank);

		numberQuestions = questionBank.a;
		return numberQuestions.length;

	};


}());
