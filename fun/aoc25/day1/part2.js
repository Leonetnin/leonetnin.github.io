let input = await read("input.txt");
let code = 50;
let zeros = 0;
let last=false
input=input.split("\n")
for (let i=0; i<input.length; i++){
    code+=+input[i].slice(1)*((input[i][0]=="R")*2-1)
    if (code>99){
        zeros+=Math.floor(code/100)+1
        code=Math.abs(code)%100
    }
    if (code<0 && last==false){
        zeros+=Math.floor(code/100)+1
        code=99-Math.abs(code)%100
    }
    if (code==0){
        zeros+=1
        last=true
    } else{
        last = false
    }
}
alert(zeros+","+code)