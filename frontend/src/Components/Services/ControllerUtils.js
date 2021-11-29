const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  
  export function getUserProfile() {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data != null) return data;
  }
  
  
  export function getMonthFromUtils(date) {
    let localDate = new Date(
      new Date(date).setHours(new Date(date).getHours() - 7)
    );
    return months[localDate.getMonth()];
  }
  
  export function getDateFromUtils(date) {
    let localDate = new Date(
      new Date(date).setHours(new Date(date).getHours() - 7)
    );
    return localDate.getDate();
  }
  
  export function getTimeFromStr(dates){
    let date_ob = new Date(Date.parse(dates));
    // let date = ("0" + date_ob.getDate()).slice(-2);
    // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    // return year + "-" + months[month] + "-" + date + " " + hours + ":" + minutes;
    return date_ob.toISOString().split('T')[0]+ " "+ hours + ":" + minutes;
  }
  

  export function getDateFromStr(dates){
    let date_ob = new Date(Date.parse(dates));
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
  }