var validSizes = ['S', 'M', 'L']
var validStatus = ['A', 'D', 'L']

function checkSize(size){
    for(i = 0; i < validSizes.length; i++){
        if(size == validSizes[i])
            return true
    }
    return false
}

function checkStatus(status){
    for(i = 0; i < validStatus.length; i++){
        if(status == validStatus[i])
            return true
    }
    return false
}