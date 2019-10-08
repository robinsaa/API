var saleArray = [];
var saleCacheArray = [];

function checkDuplicate(cup_id){
    if(saleArray.length != 0){
        // Get current date time
        date = new Date();
        // To get time 10 minutes ago
        date.setMinutes(date.getMinutes() - 10);

        // Delete all cup ids saved more than 10 minutes ago
        for(var index = 0; index < saleArray.length; index++){
            if(saleArray[index][1] <= date){
                saleArray.splice(index, 1)
            }
            else{
                // All further entries will be after 'date' variable time, thus break
                break
            }
        }

        // Check if cup id already saved
        var flag = false
        for(index = 0; index < saleArray.length; index++){
            if(saleArray[index].includes(cup_id) == true){
                flag = true
                break
            }
        }
        if(flag == false){
            saleArray.push([cup_id, new Date()])
        }
        return flag
    }
    else{
        saleArray.push([cup_id, new Date()])
        return false
    }
}

function checkCacheDuplicate(cup_id, dateTime){
    if(saleCacheArray.length != 0){
        // Get current date time
        date = new Date(dateTime);
        // To get time 10 minutes ago
        date.setMinutes(date.getMinutes() - 10);

        // Delete all cup ids saved more than 10 minutes ago
        for(var index = 0; index < saleCacheArray.length; index++){
            if(saleCacheArray[index][1] <= date){
                saleCacheArray.splice(index, 1)
            }
            else{
                // All further entries will be after 'date' variable time, thus break
                break
            }
        }

        // Check if cup id already saved
        var flag = false
        for(index = 0; index < saleCacheArray.length; index++){
            if(saleCacheArray[index].includes(cup_id) == true){
                flag = true
                break
            }
        }
        if(flag == false){
            saleCacheArray.push([cup_id, new Date(dateTime)])
        }
        return flag
    }
    else{
        saleCacheArray.push([cup_id, new Date(dateTime)])
        return false
    }
}

function checkCount(count){
    if(!isNaN(count)){
        if(count > 0 && count < 100000){
            return true
        }
    }
    return false
}

module.exports = {checkDuplicate, checkCacheDuplicate, checkCount};