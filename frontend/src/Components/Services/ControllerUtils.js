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

export function getTimeFromStr(dates) {
  let date_ob = new Date(Date.parse(dates));
  // let date = ("0" + date_ob.getDate()).slice(-2);
  // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  // return year + "-" + months[month] + "-" + date + " " + hours + ":" + minutes;
  return date_ob.toISOString().split("T")[0] + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

export function formatAMPM(date) {
  let date_ob = new Date(Date.parse(date));
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

export function getDateFromStr(dates) {
  let date_ob = new Date(Date.parse(dates));
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
}

export function getTimeDifference(date1, date2) {
  let date1_ob = new Date(Date.parse(date1)).getTime();
  let date2_ob = new Date(Date.parse(date2)).getTime();
  let val = date1_ob - date2_ob;
  let hours = Math.floor((val / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((val / (1000 * 60)) % 60)
  return hours.toString() + " hrs " + minutes.toString() + " mins";
}

export function getToday() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}