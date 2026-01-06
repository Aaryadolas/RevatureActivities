
const quizData = [
 {q:"HTML stands for?", o:["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark","None"], a:0},
 {q:"CSS is used for?", o:["Logic","Styling","Database","Server"], a:1},
 {q:"Which is JavaScript framework?", o:["React","Laravel","Django","Flask"], a:0},
 {q:"Which symbol is used in jQuery?", o:["#","$","@","%"], a:1},
 {q:"Bootstrap is a?", o:["Framework","Language","Database","IDE"], a:0}
];

let index=0;
let answers=Array(quizData.length).fill(null);
let qTime=10,totalTime=60;
let qTimer,totalTimer;

function loadQuestion(){
 clearInterval(qTimer);
 qTime=10;
 $("#qTime").text(qTime);

 $("#question").text(quizData[index].q);
 $("#options").empty();

 quizData[index].o.forEach((opt,i)=>{
   let checked=answers[index]==i?"checked":"";
   $("#options").append(`
     <label class="option">
       <input type="radio" name="option" value="${i}" ${checked}>
       ${opt}
     </label>
   `);
 });

 $("input[name='option']").change(function(){
   answers[index]=parseInt($(this).val());
 });

 $("#prevBtn").prop("disabled",index===0);

 if(index===quizData.length-1){
   $("#nextBtn").hide();
   $("#submitBtn").show();
 }else{
   $("#nextBtn").show();
   $("#submitBtn").hide();
 }

 $("#progressFill").css("width",((index+1)/quizData.length)*100+"%");

 qTimer=setInterval(()=>{
   qTime--;
   $("#qTime").text(qTime);
   if(qTime===0) nextQuestion();
 },1000);
}

function nextQuestion(){
 if(index<quizData.length-1){
   index++;
   loadQuestion();
 }
}

function prevQuestion(){
 if(index>0){
   index--;
   loadQuestion();
 }
}

function submitQuiz(){
 clearInterval(qTimer);
 clearInterval(totalTimer);

 let score=0;
 answers.forEach((a,i)=>{
   if(a===quizData[i].a) score++;
 });

 $(".quiz-container").html(`
   <div class="result">
     <h2>Quiz Completed 🎉</h2>
     <p>Your Score</p>
     <h1>${score}/${quizData.length}</h1>
   </div>
 `);
}

$("#nextBtn").click(nextQuestion);
$("#prevBtn").click(prevQuestion);
$("#submitBtn").click(submitQuiz);

totalTimer=setInterval(()=>{
 totalTime--;
 $("#totalTime").text(totalTime);
 if(totalTime===0) submitQuiz();
},1000);

loadQuestion();



