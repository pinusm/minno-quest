define(["/api/manager/questAPI.js"],function(e){var t=new e;return t.addSettings("DEBUG",{tags:"all",level:"warn"}),t.addSettings("onEnd",function(){console.log("onEnd script1")}),t.addSequence([{prevText:"123",prev:!0,progressBar:"<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>",header:"Questionnaire: example for realtime branching",questions:[{inherit:"pango",name:"myName",stem:"What is your name? (try yba!)",autoSubmit:!0},{mixer:"branch",remix:!0,conditions:[{compare:"questions.myName.response",to:"yba",DEBUG:!1}],data:[{stem:"how are you?",name:"secondary",type:"dropdown",autoSubmit:!0,dflt:"good",answers:["good","bad","ugly"],errorMsg:{correct:"That may not be correct... say good!"}}]}]},{prevText:"123",prev:!0,progressBar:"<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>",header:"<%= pagesData.pageName %>: Questionnaire page num. <%= 1 + 1 %>",decline:"Cutsom decline text",noSubmit:0,submitText:"Custom submit text",data:{pageName:"page name from data"},numbered:!0,numberStart:4,questions:[{name:"baat",type:"selectMulti",stem:"Multi question",dflt:[1,2],numericValues:!0,answers:["plateu","reverie","syndrom","polyAdept"],required:!0,correct:!0,correctValue:[2,4],errorMsg:{correct:"answer is reverie polyAdept"}},{name:"myName",stem:"What is your name? (try yba!)",autoSubmit:!0},{stem:"how are you?",type:"selectOne",autoSubmit:!0,dflt:"good",buttons:!0,answers:["good","bad","ugly"],correct:!0,correctValue:"good",errorMsg:{correct:"That may not be correct... say good!"}}]},{mixer:"branch",remix:!0,conditions:[{compare:"questions.myName.response",to:"yba",DEBUG:!1}],data:[{progressBar:"<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>",header:"Hi <%= questions.myName.response %>",questions:[{data:{myDflt:"this is a secret page..."},stem:"This question can only be reached if you type yba for the previous question",dflt:"<%= questionsData.myDflt %>"}]}]},{mixer:"repeat",times:2,data:[{prevText:"123",prev:!0,progressBar:"<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>",regenerateTemplate:!0,header:"This Royal Questionnaire of mine.",timeoutMessage:"My message",decline:!0,numbered:!0,numberStart:4,questions:[{mixer:"random",data:[{stem:"First question",required:!0},{stem:"Second question"}]}]}]},{progressBar:"<%= pagesMeta.number %> out of <%= pagesMeta.outOf%>",questions:[{stem:"how are you?",type:"selectOne",dflt:2,buttons:!0,answers:["good","bad","ugly"]},{stem:"how are you?",type:"selectOne",answers:["good","bad","ugly"]}]},{mixer:"wrapper",data:[{header:"This Royal Questionnaire of mine.",questions:[{stem:"Third question"},{stem:"Fourth question"}]}]}]),t.script});