import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    },
    lectureCompleted: []
}, {minimized: false});

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);