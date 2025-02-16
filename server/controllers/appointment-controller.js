const mongoose = require('mongoose');
const AvailableSlot = require('../db/models/slot-schema');
const Appointment = require('../db/models/appointment-schema');
const Prescription = require('../db/models/prescription-schema');

module.exports.bookSlot = async (req, res) => {
    try {
        let { slotId, userId } = req.body;

        if (!slotId || !userId) {
            return res.status(400).json({ message: "Missing required parameters", error: true });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(slotId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid ID format", error: true });
        }

        slotId = new mongoose.Types.ObjectId(slotId);
        userId = new mongoose.Types.ObjectId(userId);

        // Fetch slot with doctor, hospital, and department details
        const slot = await AvailableSlot.findById(slotId)
            .populate({
                path: 'doctor',
                populate: [
                    { path: 'department', model: 'departments' },
                    { path: 'hospital', model: 'hospitals' }
                ]
            });

        if (!slot) {
            return res.status(404).json({ message: "Slot not found", error: true });
        }

        if (slot.booked) {
            return res.status(400).json({ message: "Slot already booked", error: true });
        }

        // Mark slot as booked
        slot.booked = true;
        await slot.save();

        // Create appointment
        const appointment = new Appointment({
            date: slot.date,
            timeslot: `${slot.startTime} - ${slot.endTime}`,
            doctor: slot.doctor._id,
            user: userId,
            hospital: slot.doctor.hospital?._id,
            department: slot.doctor.department?._id,
        });

        await appointment.save();

        res.status(200).json({ success: true, message: "Slot booked successfully!", appointment });
    } catch (e) {
        console.error("Error booking slot:", e);
        res.status(500).json({ message: e.message, error: true });
    }
};


// module.exports.getUserAppointments = async (req, res) => {
//     try {
//         const { id: userId } = req.params;  // Extract userId from URL params

//         if (!userId) {
//             return res.status(400).json({ message: "User ID is required", error: true });
//         }

//         // Fetch appointments for the given user
//         const appointments = await Appointment.find({ user: userId })
//             .populate("doctor", "firstname lastname")
//             .populate("hospital", "name")
//             .populate("department", "name")
//             .sort({ date: 1 });

//         res.status(200).json({ success: true, appointments });
//     } catch (error) {
//         console.error("Error fetching user appointments:", error);
//         res.status(500).json({ message: error.message, error: true });
//     }
// };



module.exports.getUserAppointments = async (req, res) => {
    try {
        const { id: userId } = req.params; // Extract userId from URL params

        if (!userId) {
            return res.status(400).json({ message: "User ID is required", error: true });
        }

        // Fetch appointments for the given user
        const appointments = await Appointment.find({ user: userId })
            .populate("doctor", "firstname lastname")
            .populate("hospital", "name")
            .populate("department", "name")
            .sort({ date: 1 });

        // Fetch prescriptions for the user's appointments
        const prescriptions = await Prescription.find({ appointment: { $in: appointments.map(appt => appt._id) } });

        // Attach prescription to the corresponding appointment
        const appointmentsWithPrescriptions = appointments.map(appt => {
            const prescription = prescriptions.find(p => p.appointment.toString() === appt._id.toString());
            return {
                ...appt.toObject(), // Convert Mongoose document to a plain object
                prescription: prescription ? prescription.prescription : null // Add prescription if available
            };
        });

        res.status(200).json({ success: true, appointments: appointmentsWithPrescriptions });
    } catch (error) {
        console.error("Error fetching user appointments:", error);
        res.status(500).json({ message: error.message, error: true });
    }
};


module.exports.addPrescription = async (req, res) => {
    try {
        const { appointmentId, prescription } = req.body;

        if (!appointmentId || !prescription || prescription.length === 0) {
            return res.status(400).json({ message: "Appointment ID and prescription text are required", error: true });
        }

        // Fetch the appointment details
        const appointment = await Appointment.findById(appointmentId)
            .populate("hospital", "name")
            .populate("department", "name")
            .populate("user", "firstname")
            .populate("doctor", "_id");

        
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found", error: true });
        }

        // Ensure required fields are available
        const doctorId = appointment?.doctor?._id;
        const userId = appointment?.user?._id;
        const hospitalId = appointment?.hospital?._id;
        const departmentId = appointment?.department?._id;

        // if (!doctorId || !userId || !hospitalId || !departmentId) {
        //     return res.status(400).json({ message: "Invalid appointment data. Missing references.", error: true });
        // }

        // Check if a prescription already exists for this appointment
        let existingPrescription = await Prescription.findOne({ appointment: appointmentId });

        if (existingPrescription) {
            // Update existing prescription by adding the new prescription text
            existingPrescription.prescription.push(prescription);
            await existingPrescription.save();
            return res.status(200).json({
                message: "Prescription updated successfully!",
                success: true,
                prescription: existingPrescription
            });
        } else {
            // Create a new prescription record
            const newPrescription = new Prescription({
                doctor: doctorId,
                user: userId,
                hospital: hospitalId,
                department: departmentId,
                appointment: appointmentId,
                prescription: [prescription]
            });

            await newPrescription.save();

            return res.status(201).json({
                message: "Prescription added successfully!",
                success: true,
                prescription: newPrescription
            });
        }
    } catch (error) {
        console.error("Error adding prescription:", error);
        res.status(500).json({ message: error.message, error: true });
    }
};