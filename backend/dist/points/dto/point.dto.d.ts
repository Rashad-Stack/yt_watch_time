import { Point } from "../schema/points.schema";
export declare enum Status {
    Declean = "Declean",
    Approved = "Approved",
    Approve = "Approve"
}
export declare class PaginatePoints {
    points: Point[];
    total: number;
    pages: number;
}
export declare class NewPoints {
    point: Point;
    message: string;
}
export declare class UpdatedPoints extends NewPoints {
}
