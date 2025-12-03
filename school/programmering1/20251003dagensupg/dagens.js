function visaRepeterat(input, times){
    let result=""
    for (let i=0; i<times; i++) {
        result+=input
    }
    return result
}
function visaUppdelat(input, splitter){
    let result = []
    for (let i=0; i<input.length; i++){
        if (input.charAt(i)==splitter) {
            result[result.length]=""
        } else {
            result[result.length-1]+=input[i]
        }
    }
    return result
}