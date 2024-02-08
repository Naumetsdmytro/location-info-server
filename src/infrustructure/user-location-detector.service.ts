interface LocationData {
    city: string;
    latitude: string;
    longitude: string;
}

export const getContactLocationByIpAddress = async (ip: string): Promise<LocationData | undefined> => {
    if (!ip) return undefined;

    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.LOCATION_API_KEY}&ip=8.8.8.8`);
        const { city, latitude, longitude } = await response.json();

        return {
          city,
          latitude,
          longitude
        }
        
    } catch(error) {
        return undefined;
    }
};