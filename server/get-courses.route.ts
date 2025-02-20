import {Request, Response} from 'express';
import {COURSES} from "./db-data";

export function getAllCourses(req: Request, res: Response) {
    res.status(200).json({payload: Object.values(COURSES).sort((a: any, b: any) => a.seqNo - b.seqNo)})
}