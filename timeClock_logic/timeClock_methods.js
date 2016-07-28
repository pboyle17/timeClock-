function isValidDateRange(start, end) {
  if (typeof start === 'object' && typeof end  === 'object'){
    if(start<end){
      return true;
    } else {
      return false;
    }
  }else{
    return false;
  }
}

function getDatesWithinRange(start,end,arr){
  arr = arr.filter(function(x){
    return start < x && x < end
  });
  return arr;
};

function convertMillisecondsToHours(milliseconds){
  return milliseconds/(60*60*1000);
}

function roundHours(hours){
  if(hours - Math.floor(hours) > .5 && hours-Math.floor(hours)<=.75){
    return Math.floor(hours)+.5;
  }else if(hours-Math.floor(hours)>.75) {
    return Math.floor(hours)+1;
  } else if(hours-Math.floor(hours)>.25 && hours-Math.floor(hours)<=.5){
    return Math.floor(hours)+.5;
  } else {
    return Math.floor(hours);
  }
}

function getDateStringForHTML(date){
  date = date.toLocaleDateString();
  date = date.split('/');
  return date[2]+'/'+date[0]+'/'+date[1];
}
module.exports.isValidDateRange = isValidDateRange;
module.exports.getDatesWithinRange = getDatesWithinRange;
module.exports.convertMillisecondsToHours = convertMillisecondsToHours;
module.exports.roundHours = roundHours;
