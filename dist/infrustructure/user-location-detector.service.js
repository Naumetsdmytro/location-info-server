"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactLocationByIpAddress = void 0;
const getContactLocationByIpAddress = async (ip) => {
    if (!ip)
        return undefined;
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.LOCATION_API_KEY}&ip=${ip}`);
        const data = await response.json();
        console.log(data);
        return {
            city: data.city,
            country: data.country_name,
            timezone: data.time_zone.name
        };
    }
    catch (error) {
        return undefined;
    }
};
exports.getContactLocationByIpAddress = getContactLocationByIpAddress;
//# sourceMappingURL=user-location-detector.service.js.map