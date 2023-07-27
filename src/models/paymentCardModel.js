import mongoose from "mongoose";

const paymentCardModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    number: {
        type: Number,
        required: [true, "Please provide a Number"],
        unique: true,
    },
    expiry: {
        type: Date, // Change the data type to Date
        required: [true, "Please provide an expiry date"],
    },
    cvv: {
        type: String,
        default: false,
    },
});

const paymentCardModel = mongoose.models.paymentCardModel || mongoose.model("paymentCardModel", paymentCardModelSchema);

export default paymentCardModel;