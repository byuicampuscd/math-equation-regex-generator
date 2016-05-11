(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['blanksUI'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"blank\">\r\n   <div class=\"deleteMe\">Delete</div>\r\n   <h3>Question Text</h3>\r\n   <textarea class=\"text\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</textarea>\r\n\r\n   <h3>List of answers for blank</h3>\r\n   <textarea class=\"answers\">"
    + alias4((helpers.jsonString || (depth0 && depth0.jsonString) || alias2).call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"jsonString","hash":{},"data":data}))
    + "</textarea>\r\n   <lable>\r\n      <input type=\"checkbox\" class=\"isRegEx\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isRegEx : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> Convert number answers to regular expressions\r\n   </lable>\r\n\r\n   <h3>Tolerance</h3>\r\n   <input type=\"text\" class=\"tolerance\" value=\""
    + alias4(((helper = (helper = helpers.tolerance || (depth0 != null ? depth0.tolerance : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tolerance","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n   <h3>Place value behind the decimal to round to</h3>\r\n   <select class=\"numOfDigits\">\r\n      <option value=\"0\" selected>0 Decimal</option>\r\n      <option value=\"1\">1</option>\r\n      <option value=\"2\">10</option>\r\n      <option value=\"3\">100</option>\r\n      <option value=\"4\">1000</option>\r\n      <option value=\"5\">10000</option>\r\n      <option value=\"6\">100000</option>\r\n      <option value=\"7\">1000000</option>\r\n   </select>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.blanks : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['questiondb'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "            <item d2l_2p0:id=\""
    + alias3((helpers.plusTwo || (depth0 && depth0.plusTwo) || alias2).call(alias1,(data && data.index),{"name":"plusTwo","hash":{},"data":data}))
    + "\" ident=\""
    + alias3(alias4((depths[1] != null ? depths[1].bankId : depths[1]), depth0))
    + "_Q_"
    + alias3((helpers.plusOne || (depth0 && depth0.plusOne) || alias2).call(alias1,(data && data.index),{"name":"plusOne","hash":{},"data":data}))
    + "_Id\" label=\""
    + alias3(alias4((depths[1] != null ? depths[1].bankId : depths[1]), depth0))
    + "_Q_"
    + alias3((helpers.plusOne || (depth0 && depth0.plusOne) || alias2).call(alias1,(data && data.index),{"name":"plusOne","hash":{},"data":data}))
    + "_Label\" d2l_2p0:page=\"1\" title=\""
    + alias3(alias4((depths[1] != null ? depths[1].bankTitle : depths[1]), depth0))
    + " "
    + alias3((helpers.plusOne || (depth0 && depth0.plusOne) || alias2).call(alias1,(data && data.index),{"name":"plusOne","hash":{},"data":data}))
    + "\">\r\n               <itemmetadata>\r\n                  <qtimetadata>\r\n                     <qti_metadatafield>\r\n                        <fieldlabel>qmd_computerscored</fieldlabel>\r\n                        <fieldentry>yes</fieldentry>\r\n                     </qti_metadatafield>\r\n                     <qti_metadatafield>\r\n                        <fieldlabel>qmd_questiontype</fieldlabel>\r\n                        <fieldentry>Fill in the Blanks</fieldentry>\r\n                     </qti_metadatafield>\r\n                     <qti_metadatafield>\r\n                        <fieldlabel>qmd_weighting</fieldlabel>\r\n                        <fieldentry>1.000000000</fieldentry>\r\n                     </qti_metadatafield>\r\n                     <qti_metadatafield>\r\n                        <fieldlabel>qmd_globalid</fieldlabel>\r\n                        <fieldentry>25fb18ef-2013-4926-80e3-af09764958c3</fieldentry>\r\n                     </qti_metadatafield>\r\n                     <qti_metadatafield>\r\n                        <fieldlabel>qmd_displayid</fieldlabel>\r\n                     </qti_metadatafield>\r\n                  </qtimetadata>\r\n               </itemmetadata>\r\n               <itemproc_extension>\r\n                  <d2l_2p0:difficulty>1</d2l_2p0:difficulty>\r\n                  <d2l_2p0:isbonus>no</d2l_2p0:isbonus>\r\n                  <d2l_2p0:ismandatory>no</d2l_2p0:ismandatory>\r\n               </itemproc_extension>\r\n               <presentation>\r\n                  <flow>\r\n                     "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.blanks : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n                  </flow>\r\n               </presentation>\r\n               <resprocessing>\r\n                  <outcomes>\r\n                     "
    + alias3((helpers.outcomes || (depth0 && depth0.outcomes) || alias2).call(alias1,(depth0 != null ? depth0.blanks : depth0),{"name":"outcomes","hash":{},"data":data}))
    + "\r\n                  </outcomes>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.blanks : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "               </resprocessing>\r\n            </item>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.text : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.answer : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\r\n                     <material>\r\n                        <mattext texttype=\"text/html\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper)))
    + "</mattext>\r\n                     </material>\r\n                     ";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "\r\n                     <response_str ident=\""
    + alias2(alias1((depths[2] != null ? depths[2].bankId : depths[2]), depth0))
    + "_Q_"
    + alias2((helpers.plusOne || (depth0 && depth0.plusOne) || alias4).call(alias3,(container.data(data, 1) && container.data(data, 1).index),{"name":"plusOne","hash":{},"data":data}))
    + "_Blank_"
    + alias2((helpers.plusOne || (depth0 && depth0.plusOne) || alias4).call(alias3,(data && data.index),{"name":"plusOne","hash":{},"data":data}))
    + "_STR\" rcardinality=\"Single\">\r\n                        <render_fib rows=\"1\" columns=\"10\" prompt=\"Box\" fibtype=\"String\">\r\n                           <response_label ident=\""
    + alias2(alias1((depths[2] != null ? depths[2].bankId : depths[2]), depth0))
    + "_Q_"
    + alias2((helpers.plusOne || (depth0 && depth0.plusOne) || alias4).call(alias3,(container.data(data, 1) && container.data(data, 1).index),{"name":"plusOne","hash":{},"data":data}))
    + "_Blank_"
    + alias2((helpers.plusOne || (depth0 && depth0.plusOne) || alias4).call(alias3,(data && data.index),{"name":"plusOne","hash":{},"data":data}))
    + "_ANS\" />\r\n                        </render_fib>\r\n                     </response_str>\r\n                     ";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : {}, alias3=helpers.helperMissing, alias4="function";

  return "                  <respcondition>\r\n                     <conditionvar>\r\n                        <varequal respident=\""
    + alias1(container.lambda((depths[2] != null ? depths[2].bankId : depths[2]), depth0))
    + "_Q_"
    + alias1((helpers.plusOne || (depth0 && depth0.plusOne) || alias3).call(alias2,(container.data(data, 1) && container.data(data, 1).index),{"name":"plusOne","hash":{},"data":data}))
    + "_Blank_"
    + alias1((helpers.plusOne || (depth0 && depth0.plusOne) || alias3).call(alias2,(data && data.index),{"name":"plusOne","hash":{},"data":data}))
    + "_ANS\" case=\"no\">"
    + alias1(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"answer","hash":{},"data":data}) : helper)))
    + "</varequal>\r\n"
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isRegEx : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                     </conditionvar>\r\n                     <setvar action=\"Set\">"
    + alias1(((helper = (helper = helpers.percent || (depth0 != null ? depth0.percent : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"percent","hash":{},"data":data}) : helper)))
    + "0000000</setvar>\r\n                  </respcondition>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                        <var_extension>\r\n                           <d2l_2p0:answer_is_regexp>yes</d2l_2p0:answer_is_regexp>\r\n                        </var_extension>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n   <questestinterop>\r\n      <objectbank ident=\"QLIB_53767\" xmlns:d2l_2p0=\"http://desire2learn.com/xsd/d2lcp_v2p0\">\r\n         <section d2l_2p0:id=\"1\" ident=\"SECT_1858833\" title=\""
    + container.escapeExpression(((helper = (helper = helpers.bankTitle || (depth0 != null ? depth0.bankTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"bankTitle","hash":{},"data":data}) : helper)))
    + "\">\r\n            <sectionproc_extension>\r\n               <d2l_2p0:display_section_name>no</d2l_2p0:display_section_name>\r\n               <d2l_2p0:display_section_line>no</d2l_2p0:display_section_line>\r\n               <d2l_2p0:type_display_section>0</d2l_2p0:type_display_section>\r\n            </sectionproc_extension>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "         </section>\r\n      </objectbank>\r\n   </questestinterop>\r\n";
},"useData":true,"useDepths":true});
})();