import {Request, Response} from 'express';
import {LESSONS} from "./db-data";

export function searchLessons(req: Request, res: Response) {

    const queryParams = req.query;
    const courseId = queryParams['courseId'],
        filter = queryParams['filter'] as string || '',
        sortOrder = queryParams['sortOrder'] as string,
        pageNumber = parseInt(queryParams['pageNumber'] as string) || 0,
        pageSize = parseInt(queryParams['pageSize'] as string),
        sortColumn = queryParams['sortColumn'] as string ?? "seqNo";

    let lessons = Object.values(LESSONS)
        .filter((lesson)=> lesson.courseId.toString() == courseId)
        .sort((l1, l2) => {
            if (l1[sortColumn as keyof typeof l1] > l2[sortColumn as keyof typeof l1]) {
                return 1;
            }
            if (l1[sortColumn as keyof typeof l1] < l2[sortColumn as keyof typeof l2]) {
                return -1;
            }
            return 0;
        });

        if (filter) {
            lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
        }

        if (sortOrder == "desc") {
            lessons = lessons.reverse();
        }

        const initialPos = pageNumber * pageSize;

        const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

        setTimeout(() => {
            res.status(200).json({payload: lessonsPage});
        },1000);
}