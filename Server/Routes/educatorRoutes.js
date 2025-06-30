import express from 'express';
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../Controllers/educatorController.js';
import upload from '../Configs/multer.js';
import { protectEducator } from '../Middlewares/authMiddleware.js';

const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleToEducator);

educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);

educatorRouter.get('/courses', protectEducator, getEducatorCourses);

educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);

educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

export default educatorRouter;