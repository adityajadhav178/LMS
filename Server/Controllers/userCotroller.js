import User from "../Models/User.js";
import Course from "../Models/Course.js"
import Purchase from "../Models/Purchase.js";
import Stripe from "stripe";


export const getUserData = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const user = await User.findById(userId);

        if(!user) return res.json({success: false, message: "User not found"})
        res.json({success: true, user});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//User enrollled courses
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const userdata = await User.findById(userId).populate('enrolledCourses');

        res.json({success: true, enrolledCourse: userdata.enrolledCourses});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const purchaseCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        const userId = req.auth().userId;
        const { origin } = req.headers;
        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId);

        if(!userData || !courseData) return res.json({success: false, message: "User or course not found"})
        
        const purchaseData = {
            userId,
            courseId: courseData._id,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }
        const newPurchase = await Purchase.create(purchaseData);

        //Stripe gateway initialise
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency  = process.env.CURRENCY.toLowerCase();

        //creating line items to for stripe
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1,
        }];

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}`,
            line_items: line_items,
            mode: "payment",
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })

        res.json({success: true, session_url: session.url});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}