const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    id: {
        type : String
    },
    name: {
        type: String
    },
    department: {
        type: String
    }
}, {
    collection: "students",
    timestamps: true
});

module.exports = mongoose.model("Students", studentSchema);
