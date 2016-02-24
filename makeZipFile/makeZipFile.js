/*jslint plusplus: true, browser: true, devel: true */
/*global JSZip, saveAs, html_beautify*/

var makeZipFile = (function () {
   "use strict";
   var files = [{
      name: 'imsmanifest.xml',
      content: '<?xml version="1.0" encoding="UTF-8"?><manifest identifier="D2L_53767" xmlns:d2l_2p0="http://desire2learn.com/xsd/d2lcp_v2p0" xmlns:scorm_1p2="http://www.adlnet.org/xsd/adlcp_rootv1p2" xmlns="http://www.imsglobal.org/xsd/imscp_v1p1">    <resources>        <resource identifier="res_question_library" type="webcontent" d2l_2p0:material_type="d2lquestionlibrary" d2l_2p0:link_target="" href="questiondb.xml" title="Question Library" />   </resources></manifest>'
   }, {
      name: 'questiondb.xml',
      content: ''
   }];

   return function (questiondbText, fileName) {
      var zipFile = new JSZip(),
         blob;
      //line it up
      files[1].content = questiondbText;

      //make it all pretty and add to zip
      files.forEach(function (file) {
         zipFile.file(file.name, html_beautify(file.content));
      });

      //the blob monster
      blob = zipFile.generate({
         type: 'blob'
      });

      //give it to them
      saveAs(blob, fileName + ".zip");
   };
}());