var expect = require('chai').expect;

describe('getStartDate', function () {
  var isValidDateRange = require('../timeClock_logic/timeClock_methods').isValidDateRange;

  it('should return false for non objects', function () {
    var startDate = '2016-07-25';
    var endDate = '2016-07-26';

    expect(isValidDateRange(startDate,endDate)).to.equal(false);
  });

  it('should return true if the startDate is earlier than the end Date',function(){
    var startDate = new Date('07-25-2016');
    var endDate = new Date('07-26-2016');

    expect(isValidDateRange(startDate,endDate)).to.equal(true);
  });

  it('should return false if the startDate is later than the end Date',function(){
    var startDate = new Date('08-25-2016');
    var endDate = new Date('07-26-2016');

    expect(isValidDateRange(startDate,endDate)).to.equal(false);
  });

  it('should return false if the startDate and endDate are equal',function(){
    var startDate = new Date('08-25-2016');
    var endDate = new Date('08-25-2016');

    expect(isValidDateRange(startDate,endDate)).to.equal(false);
  });


});

describe('getDatesWithinRange',function(){

  var getDatesWithinRange = require('../timeClock_logic/timeClock_methods').getDatesWithinRange;

  it('should return 3 filtered dates from set of dates, representing the dates within the given range',function(){
    var startDate = new Date('07-25-2016');
    var endDate = new Date('08-1-2016');

    dates=[];
    dates.push(new Date('07-06-2016'));
    dates.push(new Date('07-22-2016'));
    dates.push(new Date('07-25-2016'));
    dates.push(new Date('07-30-2016'));
    dates.push(new Date('07-28-2016'));
    dates.push(new Date('07-26-2016'));
    dates.push(new Date('07-14-2016'));
    dates.push(new Date('07-13-2016'));

    var filtered = getDatesWithinRange(startDate,endDate,dates);

    expect(filtered.length).to.equal(3);
  });

  it('should return 1 filtered dates from set of dates, representing the dates within the given range',function(){
    var startDate = new Date('07-25-2016');
    var endDate = new Date('07-25-2016');

    dates=[];
    dates.push(new Date('07-06-2016'));
    dates.push(new Date('07-22-2016'));
    dates.push(new Date('07-25-2016'));
    dates.push(new Date('07-30-2016'));
    dates.push(new Date('07-28-2016'));
    dates.push(new Date('07-26-2016'));
    dates.push(new Date('07-14-2016'));
    dates.push(new Date('07-13-2016'));

    var filtered = getDatesWithinRange(startDate,endDate,dates);

    expect(filtered.length).to.equal(0);
  });

  it('should return an array',function(){
    var startDate = new Date('07-25-2016');
    var endDate = new Date('07-25-2016');

    dates=[];
    dates.push(new Date('07-06-2016'));
    dates.push(new Date('07-22-2016'));
    dates.push(new Date('07-25-2016'));
    dates.push(new Date('07-30-2016'));
    dates.push(new Date('07-28-2016'));
    dates.push(new Date('07-26-2016'));
    dates.push(new Date('07-14-2016'));
    dates.push(new Date('07-13-2016'));

    var filtered = getDatesWithinRange(startDate,endDate,dates);

    expect(Array.isArray(filtered)).to.equal(true);
  });
});

describe('convertMillisecondsToHours',function(){
  var convertMillisecondsToHours = require('../timeClock_logic/timeClock_methods').convertMillisecondsToHours;


  it('should return 0 for 0 input',function(){
    var result = convertMillisecondsToHours(0);
    expect(result).to.equal(0);
  });

  it('should return 1 for 3600000 input',function(){
    var result = convertMillisecondsToHours(3600000);
    expect(result).to.equal(1);
  });

  it('should return 344.78923694444444 for 1241241253',function(){
    var result = convertMillisecondsToHours(1241241253);
    expect(result).to.equal(344.78923694444444);
  });
});

describe('roundHours',function(){
  var roundHours = require('../timeClock_logic/timeClock_methods').roundHours;

  it('should round down on the quarter hour to the hour',function(){
    var result = roundHours(1.25);
    expect(result).to.equal(1);
  });

  it('should round up to the halfhour on anything above the quarter hour',function(){
    var result = roundHours(1.26);
    expect(result).to.equal(1.5);
  });

  it('should stay at the halfhour if it is on the half hour',function(){
    var result = roundHours(1.5);
    expect(result).to.equal(1.5);
  });

  it('should round down to the halfhour on anything three quarters of an hour to half an hour',function(){
    var result = roundHours(1.75);
    expect(result).to.equal(1.5);
  });

  it('should round up to the hour on anything above the three quarters hour',function(){
    var result = roundHours(1.76);
    expect(result).to.equal(2);
  });
});
