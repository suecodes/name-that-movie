/** formatDate external module 
 * 
 *  Receives a date value and formats into day month year hours:min e.g "11 Jan 2019 22:13"
 *  
 */

module.exports = function (date) {
	const cdate = new Date(date);
	const day = cdate.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[cdate.getMonth()];
	const year = cdate.getFullYear();
	const hour = cdate.getHours();
	const min = cdate.getMinutes();
	return day + " " + month + " " + year + " " + hour + ":" + min;
};