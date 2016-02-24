/*jslint browser:true, devel:true, plusplus:true */
/*globals Handlebars*/
var numberBlanks = (function () {
	'use strict';

	function blankGenerator(textCount) {

		var i = 0,
			context = {
				things: []
			},
			templateText,
			template,
			out;

		for (i = 0; i < textCount; ++i) {
			context.things.push(i + 1);
		}

		templateText = '{{#each things}}';
templateText += '<div class="answer">';
templateText += '<h2>Text {{this}}</h2>';
templateText += '<textarea id="text{{this}}" name="questions" cols="100"></textarea>';
templateText += '<h2>Blank {{this}} </h2>';
templateText += '<textarea id="answers1" align: left></textarea>';
templateText += '<textarea id="tolerance1" align: middle></textarea>';
templateText += '<select id="numofdigits" align: right>';
		templateText += '<option value="0">0 Decimal</option>';
		templateText += '<option value="0.1">0.1</option>';
		templateText += '<option value="0.01">0.01</option>';
		templateText += '<option value="0.001">0.001</option>';
		templateText += '<option value="0.0001">0.0001</option>';
		templateText += '<option value="0.00001">0.00001</option>';
		templateText += '<option value="0.000001">0.000001</option>';
		templateText += '<option value="0.0000001">0.0000001</option>';
		templateText += '</select>';
		templateText += '</div>';

		templateText += '{{/each}}';

		template = Handlebars.compile(templateText);
		out = template(context);
		console.log(out);
		return out;
	}

	
	//get the number of answers wanted
	function getNumber() {
		var num,
			numb;

		// get input
		num = document.getElementById('numBlank').value;
		numb = parseInt(num, 10);
		return numb;
	}





	// calculate the percent needed for each anser in the question
	function calculatePercent() {
		var numberOfAnswers,
			percent;

		// get input
		numberOfAnswers = getNumber();

		// Calculate percent
		percent = 100 / numberOfAnswers;
		console.log("percent:", percent.toPrecision(4));
		return percent.toPrecision(4);
	}

	// prompts user for how many questions the user wants
	return function addBlanks() {
		var numberOfBlanks = getNumber();
		//error check
		if (isNaN(numberOfBlanks) === true || numberOfBlanks <= 0) {
			window.alert("Please enter a integer greater than one");
			return false;
		}
		//do it
		document.getElementById('blank').innerHTML = blankGenerator(numberOfBlanks);
		document.getElementById("blankButton").disabled = 'true';
	};
}());
