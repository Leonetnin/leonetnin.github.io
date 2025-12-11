let input = await read("input.txt");
input=input.split("\n")
for (let bank in input){
    const one=input[bank].indexOf(Math.max(...input[bank].split("")))
    let two=input[bank].indexOf(Math.max(...input[bank].split("")))
    alert(input[bank][one]+input[bank][two])
}