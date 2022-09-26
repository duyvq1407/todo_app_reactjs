export const compareDate = (deadline) => {
    const now = new Date('YYYY-MM-DD');
    let compare = new Date(deadline, 'YYYY-MM-DD');
    
    if(now.getFullYear() === compare.getFullYear()
       && now.getMonth()=== compare.getMonth()
       && now.getDay() === compare.getDay()){
        return true
    }
    return now > deadline;
    
}