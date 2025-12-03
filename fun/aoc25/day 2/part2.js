let input = await read("input.txt");
let invalid=0
input=input.split(",")
for (let range in input){
    input[range]=input[range].split("-")
    for (let i=0; i<+input[range][1]-+input[range][0];i++){
        let id=""+(+input[range][0]+i)
        idsearch:
            for (let j=2; j<id.length+1;j++) {
                if ((id.length/j)%1==0){
                    for (let k=1;k<j;k++){
                        if (id.slice(0,id.length/j)!=id.slice(id.length/j*k,id.length/j*(k+1))){
                            break
                        }
                        if (k==j-1){
                            invalid+=+id
                            break idsearch;
                        }
                    }
                }
            }
    }
}
alert(invalid)