
const ipAddress = "http://213.199.61.44:9090"

const authorizeBase = ipAddress + "/authorization-server";


// Exotic Global Holidays API's
const reservationServiceBase =  ipAddress + "/reservation-service/api/v1";
const fleetServiceBase =  ipAddress + "/fleet-mgt-service/api/v1";


export const API_URL = {
    Login: authorizeBase + "/authnticate",
    RESET_PASSWORD: authorizeBase + "/change-password",
    RESET_REQUEST: authorizeBase + "/reset-password",
    CHECK_USER_VALIDITY: authorizeBase + "/auth-status",
 
   
    // Exotic Global Holidays 
    guide : {
        CREATE_NEW_GUIDE: reservationServiceBase + "/guide",
        GET_ALL_GUIDES: reservationServiceBase + "/guide/all", 
        UPDATE_GUIDE: reservationServiceBase + "/guide",   
        DELETE_GUIDE: reservationServiceBase + "/guide/delete/{guideId}",

        CREATE_NEW_LOCATION: reservationServiceBase + "/location",
        GET_ALL_LOCATIONS: reservationServiceBase + "/location/all",
        DELETE_LOCATION_BY_ID: reservationServiceBase + "/location/delete/{locationId}",
        UPDATE_LOCATION: reservationServiceBase + "/location/update",
        
        CREATE_VEHICLE_SUPPLIER: fleetServiceBase + "/vehicle-supplier",
        GET_ALL_VEHICLE_SUPPLIER: fleetServiceBase + "/vehicle-supplier/all",
        UPDATE_VEHICLE_SUPPLIER: fleetServiceBase + "/vehicle-supplier/update",
        DELETE_VEHICLE_SUPPLIER: fleetServiceBase + "/vehicle-supplier/delete/{id}",
        GET_ONE_VEHICLE_SUPPLIER_DETAILS: fleetServiceBase + "/vehicle-supplier/{id}",

        GET_ALL_PROVINCE: reservationServiceBase + "/location/province",
        GET_ALL_DISTRICT: reservationServiceBase + "/location/district?province_id={province_id}",
        GET_ALL_LANGUAGES: reservationServiceBase + "/language/all",

        CREATE_NEW_ACTIVITY: reservationServiceBase + "/activity",
        UPDATE_ACTIVITY: reservationServiceBase + "/activity/update",
        GET_ALL_ACTIVITIES: reservationServiceBase + "/activity/all",
        GET_ACTIVITY_BY_ID: reservationServiceBase +  "/activity/{activityId}",
        DELETE_ACTIVITY: reservationServiceBase + "/activity/delete/{activityId}"
    }
};
