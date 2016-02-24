/*jslint plusplus: true, browser: true, devel: true */
/*global Handlebars*/
(function () {
   "use strict";
   var helpers = {
      outcomes: function (blanks) {
         //need this because it looks like D2L varname counts starting at one and some blanks might not have a answer
         var textOut = '',
            usedBlanks = 0;

         //loop the blanks check if has answer and make a devar
         blanks.forEach(function (blank) {
            if (blank.answer !== "") {
               usedBlanks += 1;
               textOut += '<decvar vartype="Integer" minvalue="0" maxvalue="100" varname="Blank_' + usedBlanks + '" />\n';
            }
         });

         //return
         return new Handlebars.SafeString(textOut);
      },

      plusOne: function (indexIn) {
         return parseInt(indexIn, 10) + 1;
      },

      plusTwo: function (indexIn) {
         return parseInt(indexIn, 10) + 2;
      }
   };

   //register all the helpers
   Object.keys(helpers).forEach(function (key) {
      Handlebars.registerHelper(key, helpers[key]);
   });

}());