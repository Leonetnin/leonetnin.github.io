let input = await read("input.txt");
let invalid=0
input=input.split(",")
for (let range in input){
    input[range]=input[range].split("-")
    for (let i=0; i<+input[range][1]-+input[range][0];i++){
        let id=""+(+input[range][0]+i)
        if (id.slice(0,id.length/2)==id.slice(id.length/2,id.length) && id.length%2==0){
            invalid+=+id
        }
    }
}
alert(invalid)