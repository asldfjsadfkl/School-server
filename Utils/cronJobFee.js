const cron = require("node-cron");
const FEE = require('../Models/Fee');
const STUDENT = require('../Models/Student');

const generateMonthlyFees = () => {
    cron.schedule("0 0 1 * *", async () => {
        try {
            const students = await STUDENT.find({});
            const now = new Date();
            const month = now.toLocaleString("en-US", { month: "long" });
            const year = now.getFullYear();

            for (const student of students) {
                const alreadyExists = await FEE.findOne({
                    admissionNumber: student.admissionNumber,
                    month,
                    year,
                });
                if (alreadyExists) continue;
                await FEE.create({
                    studentId: student._id,
                    name: student.name,
                    newClass: student.newClass,
                    section: student.section,
                    admissionNumber: student.admissionNumber,
                    paidAmount: 0,
                    description: "Auto generated monthly fee",
                    paidDate: null,
                    month: month,
                    year: year,
                });
            }
            console.log(`✅ Fee challans generated for ${month} ${year}`);
        } catch (error) {
            console.error("❌ Error generating monthly fee:", error.message);
        }
    });
};

module.exports = generateMonthlyFees;
