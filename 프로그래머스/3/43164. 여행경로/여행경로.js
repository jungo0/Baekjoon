var answer = [];
function solution(tickets) {
    let ticketsSort = tickets.sort();

    return dfsPlan("ICN", ticketsSort, ["ICN"]);

}
function dfsPlan(ticket, ticketsSort, planArr){
    if(ticketsSort.length == 0) {
    	
        answer = planArr;
        return answer; 
    }
    for(let i=0; i<ticketsSort.length; i++){
        if(ticketsSort[i][0] == ticket && answer.length == 0) {
            let reTickets = [...ticketsSort.slice(0, i), ...ticketsSort.slice(i+1)];
            if( i == ticketsSort.length-1) return dfsPlan(ticketsSort[i][1], reTickets, [...planArr, ticketsSort[i][1]]);
            else dfsPlan(ticketsSort[i][1], reTickets, [...planArr, ticketsSort[i][1]]);
        }
    }
    return answer;
}