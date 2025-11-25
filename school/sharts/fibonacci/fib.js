console.time("execution")
fib(100000)
console.timeEnd("execution")
function fib(n){
    let fibs = [BigInt(0),BigInt(1)]
    console.log("1")
    for (let i=0; i<n-1; i++) {
        fibs.push(fibs[i+1]+fibs[i])
    }
    console.log(fibs[fibs.length-1])
}