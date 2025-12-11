let input = await read("input.txt");
let code = 50;
let zeros = 0;
let last=false
input=input.split("\n")
for (let i=0; i<input.length; i++){
    let adder=input[i].slice(1)*((input[i][0]=="R")*2-1)
    if (code+adder>99){
        zeros+=Math.floor((code+adder)/100)
    } else if (code+adder<0){
        zeros+=Math.floor(-(code+adder)/100)+1-(code==0)
    } else if (code+adder==0){
        zeros+=1
    }
    code=(code+adder+100000)%100
    console.log(code+","+input[i]+","+zeros)
}
alert(zeros+","+code)