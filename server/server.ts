import * as express from 'express';
import { Application } from "express";
import { getAllCourses, getCourseById } from "./get-courses.route";
import { searchLessons } from './search-lessons.route';
import * as path from 'path';

const app: Application = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist/course-registration/browser')));

app.route('/api/courses').get(getAllCourses);
app.route('/api/courses/:id').get(getCourseById);
app.route('/api/lessons').get(searchLessons);

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});