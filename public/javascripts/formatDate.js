/** formatDate external module 
 * 
 *  Receives a date value and formats into day month year hours:min e.g "11 Jan 2019 22:13"
 *  
 */

module.exports = function (date) {
	var cdate = new Date(date);
	var day = cdate.getDate();
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var month = monthNames[cdate.getMonth()];
	var year = cdate.getFullYear();
	var hour = cdate.getHours();
	var min = cdate.getMinutes();
	return day + " " + month + " " + year + " " + hour + ":" + min;
};