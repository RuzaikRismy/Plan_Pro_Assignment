import moment from "moment";
import { parse, add, isWithinInterval, sub } from "date-fns";

import { API_URL } from "../shared/API_URLS";
import { http_Request } from "./HTTP_Request";


/**
|--------------------------------------------------
| Is Arrival marking within the Backend configured time period for the clinic
|--------------------------------------------------
*/
export const getIsArrivalMarkValid = (appointmentDetail) => new Promise((resolve, reject) => {
  let arrivalConfigurationURL = API_URL.dashboard.frontOfficerDashBoard.GET_ARRIVAL_CONFIGURATION_BY_CLINIC_ID.replace(
    "{clinicId}", appointmentDetail?.clinicId
  );
  let requestBody = {
    url: arrivalConfigurationURL,
    method: "GET"
  }
  const successCallback = (response) => {
    if ((response.status === 200 || response.status === 201) && response?.data) {
      let arrivalConfigurationForClinic = response.data;
      let arrivalMarkingLatestTime = arrivalConfigurationForClinic?.arrivalMarkingLatestTime;
      let arrivalMarkingLatestTimeUnits = arrivalConfigurationForClinic?.arrivalMarkingLatestTimeUnits;
      // let clinic = arrivalConfigurationForClinic?.clinic;
      let isDayArrivalMarking = arrivalConfigurationForClinic?.isDayArrivalMarking
      let appointmentDetailData = appointmentDetail;

      let appointmentDateTimeString = appointmentDetailData?.appointmentDate + " " + appointmentDetailData?.appointmentTime;
      let isArrivalMarkValid = false;
      if (appointmentDateTimeString) {
        let appointmentDateTime = moment(appointmentDateTimeString, "YYYY-MM-DD HH:mm");
        let expectedEarliestArrivalMarkTime = appointmentDetailData?.appointmentDate && moment(appointmentDetailData?.appointmentDate, "YYYY-MM-DD");
        let durationUnitOfTimeData = [
          {
            durationVariable: "Day",
            duration: "days"
          },
          {
            durationVariable: "Hr",
            duration: "hours"
          },
          {
            durationVariable: "Min",
            duration: "minutes"
          },
        ];
        let expectedLatestArrivalMarkTime = moment(appointmentDetailData?.appointmentDate, "YYYY-MM-DD")?.add && moment(appointmentDetailData?.appointmentDate, "YYYY-MM-DD").add(1, "days");

        if (arrivalMarkingLatestTime && arrivalMarkingLatestTimeUnits) {
          let durationTimeUnitUnitOfTime = durationUnitOfTimeData.find(singleTimeUnitDetail => singleTimeUnitDetail?.durationVariable === arrivalMarkingLatestTimeUnits)?.duration || arrivalMarkingLatestTimeUnits;
          let tempAppointmentExtendedDateTime = appointmentDateTime.clone().subtract(arrivalMarkingLatestTime, durationTimeUnitUnitOfTime);
          //if day arrival then checks the calculated extended latest date is on a later time rather than the current date
          expectedEarliestArrivalMarkTime = tempAppointmentExtendedDateTime.isBefore(expectedEarliestArrivalMarkTime) ? tempAppointmentExtendedDateTime : expectedEarliestArrivalMarkTime;
        }
        if (moment().isSameOrBefore(expectedLatestArrivalMarkTime) && moment().isSameOrAfter(expectedEarliestArrivalMarkTime)) {
          isArrivalMarkValid = true;
        }
      }
      if (isArrivalMarkValid) {
        resolve({ isArrivalMarkValid })
      } else {
        resolve({ isArrivalMarkValid, error: "ARRIVAL_MARK_TIME_PASSED" })
      }
    }
  };
  const errorCallback = (error) => {
    resolve({ isArrivalMarkValid: true, error: "CONFIGURATION_NOT_FOUND" })
  };

  http_Request(requestBody, successCallback, errorCallback)
})

/**
|--------------------------------------------------
| @enum {object} PolicyMinTimeUnit  minTimeUnit
| SECONDS,
| MINUTES,
| HOURS,
| DAYS,
| WEEKS;
|--------------------------------------------------
*/
const PolicyMinTimeUnit = {
    seconds: "SECONDS",
    minutes: "MINUTES",
    hours: "HOURS",
    days: "DAYS",
    weeks: "WEEKS",
};

//depending on hospital requirement one of following validation function should be used

/**
  |--------------------------------------------------
  | Validates whether appointment is cancellable (From Appointment Created Time to the Valid duration) - 
  | Cancels within Appointment Created Time to (Created At time + Configuration)
  | @param {object} appointment related appointment detail
  | @param {object} cancellationDetails {minTimeUnit, minTimeValue}
  | @param {string} createdDateTime appointment created date(formatted)
  |--------------------------------------------------
  */
export const handleValidateAppCancelPolicy = (appointment, cancellationDetails = null, createdDateTime = null) => {
    let isCancelValid = false;
    if (cancellationDetails && cancellationDetails.minTimeUnit && cancellationDetails.minTimeValue) {
        let currentDate = new Date();
        let appointmentCreateDate = createdDateTime && createdDateTime.length>=19
            ? parse(createdDateTime.slice(0,18), "yyyy-MM-dd HH:mm:ss", new Date())
            : parse("".concat(appointment.createdDate, " ", appointment.createdTime), "yyyy-MM-dd HH:mm", new Date());

        let differenceUnit = cancellationDetails && cancellationDetails.minTimeUnit;
        let differenceValue = cancellationDetails && cancellationDetails.minTimeValue;
        if (differenceUnit && differenceValue)
            switch (differenceUnit) {
                case PolicyMinTimeUnit.seconds:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: appointmentCreateDate,
                        end: add(appointmentCreateDate, {
                            seconds: differenceValue,
                        }),
                    });

                    break;
                case PolicyMinTimeUnit.minutes:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: appointmentCreateDate,
                        end: add(appointmentCreateDate, {
                            minutes: differenceValue,
                        }),
                    });
                    break;
                case PolicyMinTimeUnit.hours:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: appointmentCreateDate,
                        end: add(appointmentCreateDate, { hours: differenceValue }),
                    });
                    break;
                case PolicyMinTimeUnit.days:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: appointmentCreateDate,
                        end: add(appointmentCreateDate, { days: differenceValue }),
                    });
                    break;
                case PolicyMinTimeUnit.weeks:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: appointmentCreateDate,
                        end: add(appointmentCreateDate, { weeks: differenceValue }),
                    });
                    break;

                default:
                    break;
            }
    }
    return isCancelValid;
};


/**
|--------------------------------------------------
| Validates whether appointment is cancellable (From Prior Appointment Time for the configured duration)
| Cancels within Appointment (Schedule Time - Configuration) to Schedule Time
| @param {object} appointment related appointment detail
| @param {object} cancellationDetails {minTimeUnit, minTimeValue}
| @param {string} appointmentTime appointment scheduled date(formatted)
|--------------------------------------------------
*/
export const handleValidateAppointmentCancelBySchedule = (appointment, cancellationDetails = null, appointmentTime = null) => {
    let isCancelValid = false;
    if (cancellationDetails && cancellationDetails.minTimeUnit && cancellationDetails.minTimeValue) {
        let currentDate = new Date();
        let appointmentDateTime = appointmentTime && appointmentTime.length>=19
            ? parse(appointmentTime.slice(0,18), "yyyy-MM-dd HH:mm:ss", new Date())
            : (appointment?.appointmentDate && appointment?.appointmentTime) && parse("".concat(appointment.appointmentDate, " ", appointment.appointmentTime), "yyyy-MM-dd HH:mm", new Date());

        let differenceUnit = cancellationDetails && cancellationDetails.minTimeUnit;
        let differenceValue = cancellationDetails && cancellationDetails.minTimeValue;
        if (differenceUnit && differenceValue && appointmentDateTime)
            switch (differenceUnit) {
                case PolicyMinTimeUnit.seconds:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: sub(appointmentDateTime, {
                            seconds: differenceValue,
                        }),
                        end: appointmentDateTime,
                    });

                    break;
                case PolicyMinTimeUnit.minutes:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: sub(appointmentDateTime, {
                            minutes: differenceValue,
                        }),
                        end: appointmentDateTime,
                    });
                    break;
                case PolicyMinTimeUnit.hours:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: sub(appointmentDateTime, { hours: differenceValue }),
                        end: appointmentDateTime,
                    });
                    break;
                case PolicyMinTimeUnit.days:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: sub(appointmentDateTime, { days: differenceValue }),
                        end: appointmentDateTime,
                    });
                    break;
                case PolicyMinTimeUnit.weeks:
                    isCancelValid = isWithinInterval(currentDate, {
                        start: sub(appointmentDateTime, { weeks: differenceValue }),
                        end: appointmentDateTime,
                    });
                    break;

                default:
                    break;
            }
    }
    return isCancelValid;
};
