import {Request, Response} from 'express';
import {COURSES} from "./db-data";
import {setTimeout} from 'timers';

export function saveCourse(req: Request, res: Response) {
    /*
        console.log("ERROR saving course!");
        res.sendStatus(500);
        return;
    */
   const courseId = req.params['id'];
   const changes = req.body;
   console.log(changes);
   console.log("Saving course changes", courseId, JSON.stringify(changes));

   const newCourse = {
    ...COURSES[courseId],
    ...changes
   };
   COURSES[courseId] = newCourse;
   console.log("new course version", newCourse);

   setTimeout(() => {
    res.status(200).json(COURSES[courseId])
   }, 1500)
}