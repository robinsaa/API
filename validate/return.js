var returnArray = [];
var returnCacheArray = [];

function checkDuplicate(cup_id){
    if(returnArray.length != 0){
        // Get current date time
        date = new Date();
        // To get time 10 minutes ago
        date.setMinutes(date.getMinutes() - 10);

        // Delete all cup ids saved more than 10 minutes ago
        for(var index = 0; index < returnArray.length; index++){
            if(returnArray[index][1] <= date){
                returnArray.splice(index, 1)
            }
            else{
                // All further entries will be after 'date' variable time, thus break
                break
            }
        }

        // Check if cup id already saved
        var flag = false
        for(index = 0; index < returnArray.length; index++){
            if(returnArray[index].includes(cup_id) == true){
                flag = true
                break
            }
        }
        if(flag == false){
            returnArray.push([cup_id, new Date()])
        }
        return flag
    }
    else{
        returnArray.push([cup_id, new Date()])
        return false
    }
}

function checkCacheDuplicate(cup_id, dateTime){
    if(returnCacheArray.length != 0){
        // Get current date time
        date = new Date(dateTime);
        // To get time 10 minutes ago
        date.setMinutes(date.getMinutes() - 10);

        // Delete all cup ids saved more than 10 minutes ago
        for(var index = 0; index < returnCacheArray.length; index++){
            if(returnCacheArray[index][1] <= date){
                returnCacheArray.splice(index, 1)
            }
            else{
                // All further entries will be after 'date' variable time, thus break
                break
            }
        }

        // Check if cup id already saved
        var flag = false
        for(index = 0; index < returnCacheArray.length; index++){
            if(returnCacheArray[index].includes(cup_id) == true){
                flag = true
                break
            }
        }
        if(flag == false){
            returnCacheArray.push([cup_id, new Date(dateTime)])
        }
        return flag
    }
    else{
        returnCacheArray.push([cup_id, new Date(dateTime)])
        return false
    }
}

module.exports = {checkDuplicate, checkCacheDuplicate};