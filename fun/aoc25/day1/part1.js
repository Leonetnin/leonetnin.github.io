let input = await read("input.txt");
let code = 50;
let zeros = 0;
let code2= 50;
input=input.split("\n")
for (let i=0; i<input.length; i++){
    code+=+input[i].slice(1)*((input[i][0]=="R")*2-1)
    code2+=+input[i].slice(1)*((input[i][0]=="R")*2-1)
    if (Math.abs(code)%100==0) {
        zeros+=1
    }
    code2=Math.abs(code2)%100
}
alert(zeros+","+Math.abs(code)%100+","+code2)