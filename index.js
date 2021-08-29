let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}




let createTimeInEvent = function(dateStamp){
    let [date,hour] = dateStamp.split(' ')

    this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
})
    return this
}


let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}


let hoursWorkedOnDate = function(targetDate){
    let inEvent = this.timeInEvents.find(function(record){
        return record.date === targetDate
    })
    let outEvent = this.timeOutEvents.find(function(record){
        return record.date === targetDate
    })
    return (outEvent.hour - inEvent.hour)/100
}




let wagesEarnedOnDate = function(targetDate){
    let rawWage = hoursWorkedOnDate.call(this, targetDate)
    * this.payPerHour
    return parseFloat(rawWage.toString())
}



 let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function findEmployeeByFirstName(employeeRecords, name){
    return employeeRecords.find(function(employee){
        return employee.firstName === name
    })
}


let calculatePayroll = function(EmployeeRecords){
    return EmployeeRecords.reduce(function(totalWorked, empRecord){
        return totalWorked + allWagesFor.call(empRecord)
    }, 0)
}









