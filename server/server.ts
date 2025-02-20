import * as express from 'express';
import { Application } from "express";
import { getAllCourses } from "./get-courses.route";

const app: Application = express();

app.route('/api/courses').get(getAllCourses);

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});