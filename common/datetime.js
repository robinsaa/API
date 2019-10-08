function melbourneTimeToUTC(localDateTime){
    try {
        if(localDateTime == null){
            return null;
        }
        // localDateTime should be in format 'yyyy-mm-ddTHH:MM:SS.sss+UTC_offset' like '2019-10-06T18:22:00.000+1100'
        return new Date(localDateTime).toISOString();
    } catch (error) {
        throw error;
    }
    
}

function utcToMelbourneTime(utcDateTime){
    if(utcDateTime == null){
        return null;
    }
    var dateTimeObject = {
        "date": null,
        "time": null
    }
    localDateTimeArray = new Date(utcDateTime).toLocaleString("en-AU", {timeZone: "Australia/Melbourne"}).toUpperCase().split(',');
    dateTimeObject.date = localDateTimeArray[0].trim();
    dateTimeObject.time = localDateTimeArray[1].trim();
    return dateTimeObject;
}

function sortByDateTime(recordsArray){
    recordsArray.sort(function compare(a, b) {
        if ( a.scanned_at < b.scanned_at ){
          return -1;
        }
        if ( a.scanned_at > b.scanned_at ){
          return 1;
        }
        return 0;
      });
    return recordsArray;
}
module.exports = {melbourneTimeToUTC, utcToMelbourneTime, sortByDateTime};