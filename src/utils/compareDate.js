export const compareDate = (deadline) => {
    const now = new Date();
    let compare = new Date(deadline);
    
    if(now.getFullYear() === compare.getFullYear()
       && now.getMonth()=== compare.getMonth()
       && now.getDay() === compare.getDay()){
        return false
    }
    return (now > compare);
}