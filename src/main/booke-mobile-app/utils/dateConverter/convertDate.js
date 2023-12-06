const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
];

export default function convertDate(date) {
    const convertedDate = new Date(date);
    const monthIndex = convertedDate.getMonth();
    const year = convertedDate.getFullYear();
    const month = months[monthIndex];
    const day = convertedDate.getDate();

    return day + " " + month + " " + year;
}