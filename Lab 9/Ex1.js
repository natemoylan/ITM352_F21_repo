m=02;
d=23;
y=2000;
ys = String(y);

step1=Number(ys[2] + ys[3]);
step2=parseInt(step1/4)
step3= step2 + step1
step4=1
step6= step4 + step3;
step7= step6 + d;
step8 = step7; 
step8%7;
step9 = step8 - 2; 
step9 = parseInt(step9/7);

console.log(`My birthday is on ${step9}`)



