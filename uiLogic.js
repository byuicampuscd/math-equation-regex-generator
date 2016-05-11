/*jslint plusplus: true, browser: true, devel: true */
/*global uiDataToQDbData, dataFromUI, Handlebars, makeZipFile, $*/

function makeZip(dataFromUI) {
   //console.log(Handlebars.templates.questiondb(questiondbData));
   "use strict";
   var converted = uiDataToQDbData(dataFromUI),
      questiondbText = Handlebars.templates.questiondb(converted),
      filename = "imsPackage";

   console.log("converted:", converted);
   console.log("questiondbText:", questiondbText);

   makeZipFile(questiondbText, filename);
}

function makeBlanks(dataArray) {
   "use strict";

   function deletePartentMaker(me) {
      return function () {
         var parent = me.parentElement,
            grandParent = parent.parentElement;
         grandParent.removeChild(parent);
      };
   }

   var html = Handlebars.templates.blanksUI(dataArray),
      deleteMes,
      i;

   //add in html
   document.getElementById('blanksWraperUI').innerHTML += html;

   //make the xes clickable
   deleteMes = document.querySelectorAll('.deleteMe');
   //add on the function
   for (i = 0; i < deleteMes.length; ++i) {
      deleteMes[i].onclick = deletePartentMaker(deleteMes[i]);
   }
}

function proccessCSVData(csvData) {
   "use strict";
   //update the title
   $('#bankTitleUI').val(csvData.bankTitle);

   //update the variables
   $('#variablesUI').val(JSON.stringify(csvData.variables, null, 3));

   //make the blanks
   makeBlanks(csvData);
}

function addBlanks() {
   "use strict";
   var numBlanksToAdd = parseInt(document.getElementById('addBlankNumberUI').value, 10),
      arrayForTemplate = {
         blanks: []
      },
      i;
   //do we have a number;
   if (isNaN(numBlanksToAdd) || numBlanksToAdd < 1) {
      alert('The value in the add blanks box is less than 1 or is not a number. Try again.');
      return;
   }

   //make object
   for (i = 0; i < numBlanksToAdd; ++i) {
      arrayForTemplate.blanks.push({
         index: i + 1,
         text: "Text above " + (i + 1) + "var a:{{a}}, var b:{{b}}",
         answers: [1, 2, 3, 4, 5],
         isRegEx: true,
         tolerance: 1,
         numOfDigits: 0
      });
   }

   //run it
   makeBlanks(arrayForTemplate);
}

function processTemplate() {
   "use strict";
   function makeTolerance(tolIn){
      if(tolIn === ''){
         return tolIn;
      }
      
      var num = parseFloat(tolIn),
          numIsNotNan = !isNaN(num);
      
      
      console.log('num:',num);
      console.log('numIsNotNan:',numIsNotNan);
      console.log('tolIn:',tolIn);
      
      if(numIsNotNan && typeof tolIn === 'string'){
         if(tolIn.charAt(tolIn.length) === '%'){
            return tolIn;
         } else if(numIsNotNan) {
            return num;
         } 
      }
      
      //TODO give better feedback
      throw 'not valid tolerance. SSEE'
   }
   
   var variables,
      numberOfBlanks = $('.blank').length,
      i,
      dataFromUI,
      startSelecter;

   //get the title
   dataFromUI = {
      bankTitle: $('#bankTitleUI').val(),
      blanks: []
   };

   //get the vars
   variables = $('#variablesUI').val();
   //try to parse it
   try {
      dataFromUI.variables = JSON.parse(variables);
   } catch (e) {
      console.log(e.message);
      alert("Variables box does is not correct JSON format.");
      return;
   }

   //get the blank data
   for (i = 1; i <= numberOfBlanks; ++i) {
      startSelecter = '.blank:nth-of-type(' + i + ') ';
      dataFromUI.blanks.push({
         text: $(startSelecter + '.text').val(),
         answers: JSON.parse($(startSelecter + '.answers').val()),
         isRegEx: $(startSelecter + '.isRegEx').val() === "on",
         tolerance: makeTolerance($(startSelecter + '.tolerance').val()),
         numOfDigits: Number($(startSelecter + '.numOfDigits').val())
      });
   }
   console.log("dataFromUI:", dataFromUI);
   makeZip(dataFromUI);

}