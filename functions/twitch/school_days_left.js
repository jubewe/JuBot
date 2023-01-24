function school_days_left(){
    let last_day = new Date("2023-07-30T12:00:00.000Z");
    let now = new Date();
    let diff = (last_day.getTime() - now.getTime());
    return (diff < 0 ? 0 : diff);
}; 

module.exports = school_days_left;