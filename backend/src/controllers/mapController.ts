import { Request, Response, NextFunction } from "express";
import { findParentCompaniesLocations } from "../repositories/mapRepository";
import Location from "../models/Location";

const getParentCompaniesWithLocations = (req_: Request, res: Response, next: NextFunction) => {
    try {
        const rows = findParentCompaniesLocations();
        
        const parentCompanyIds = new Set<number>();
        const data : { 
            parentCompanyId : number,
            parentCompanyName : string,
            parentCompanyLocations : Location[]
        }[] = [];
        
        rows.forEach(r => {
            const parentCompanyId : number = r.parentCompanyId;
            const parentCompanyName : string = r.parentCompanyName;

            if (!parentCompanyIds.has(parentCompanyId)) {
                parentCompanyIds.add(parentCompanyId);

                data.push({
                    parentCompanyId: parentCompanyId,
                    parentCompanyName: parentCompanyName,
                    parentCompanyLocations: []
                });
            }

            const location : Location = {
                id: r.locationId,
                name: r.locationName,
                latitude: r.latitude,
                longitude: r.longitude
            };

            data.find(pc => pc.parentCompanyId === parentCompanyId)
                ?.parentCompanyLocations.push(location);
        });

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

export { getParentCompaniesWithLocations };