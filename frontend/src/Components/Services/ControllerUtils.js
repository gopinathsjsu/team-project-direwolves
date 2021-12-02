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
  return date_ob.toISOString().split("T")[0] + " " + (hours<10?"0"+hours:hours) + ":" + (minutes<10?"0"+minutes:minutes);
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
  let date1_ob = new Date(Date.parse(date1));
  let date2_ob = new Date(Date.parse(date2));
  let val = parseInt(date2_ob - date1_ob);
  let hours = val > 0 ? val / ((1000 * 60 * 60) % 24) : val;
  let minutes = val > 0 ? val / ((1000 * 60) % 24) : val;
  return hours.toString() + " hrs " + minutes.toString() + " mins";
}
