var CSVtemplate = 'bank Title,BankTitle,,,\n\
,,,,\n\
variables,,,,\n\
a,1,2,3,4\n\
b,1,2,3,4\n\
,,,,\n\
blanks,,,,\n\
text,"<h1>hi</h1>var a: {{a}}, var b: {{b}}, Text Above Blank 1",,,\n\
answers,1,2,3,4\n\
isRegEx,TRUE,,,\n\
tolerance,5,,,\n\
numOfDigits,0,,,\n\
,,,,\n\
text,"<h1>hi</h1>var a: {{a}}, var b: {{b}}, Text Above Blank 2",,,\n\
answers,1,2,3,4\n\
isRegEx,TRUE,,,\n\
tolerance,5%,,,\n\
numOfDigits,0,,,\n\
,,,,\n\
text,var a: {{a}} Text Above Blank 3,,,\n\
answers upper,1.5,2.5,3.5,4.5\n\
answers lower,0.5,1.5,2.5,3.5\n\
isRegEx,TRUE,,,\n\
numOfDigits,0,,,\n\
,,,,\n\
text,"var b: {{b}}, Text Above Blank 4",,,\n\
answers,hi1,hi2,hi3,hi4\n\
isRegEx,FALSE,,,';

$('#csvIn').val(CSVtemplate);
parseCSV($('#csvIn').val())