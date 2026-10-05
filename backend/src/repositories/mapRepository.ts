import db from "../config/dbConn.ts";

const findParentCompaniesLocations = () => {
    try {
        const rows = db.prepare<{}, {
            parentCompanyId: number,
            parentCompanyName: string,
            locationId: number,
            locationName: string,
            latitude: number,
            longitude: number
        }>("SELECT * FROM ParentCompaniesLocations").all({});

        return rows;
    } catch (err) {
        throw err;
    }
};

export { findParentCompaniesLocations };