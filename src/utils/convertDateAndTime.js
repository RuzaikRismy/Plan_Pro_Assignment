import moment from "moment";

export const dateFormat = (date, currentFormat) => {
    return date ? moment(date, currentFormat).format("DD/MM/YYYY") : null;
};

export const time24Format = (time, currentFormat) => {
    return time ? moment(time, currentFormat).format("HH:mm") : null;
};

export const dateAndTimeFormat = (dateAndTime, currentFormat) => {
    return dateAndTime ? moment(dateAndTime, currentFormat).format("DD/MM/YYYY") + " at " + moment(dateAndTime, currentFormat).format("HH:mm") : null;
};

export const dateAndTimeFormatWithSeparator = (dateAndTime, currentFormat, separator = " ") => {
    return dateAndTime ? moment(dateAndTime, currentFormat).format("DD/MM/YYYY") + separator + moment(dateAndTime, currentFormat).format("HH:mm") : null;
};





