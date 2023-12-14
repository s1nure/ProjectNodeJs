const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		group: {
			type: String,
			required: true
		},
		photo: {
			type: String,
		},
		mark: {
			type: Number,
		},
		isDonePr: {
			type: Boolean,
		},
	},
)

module.exports = mongoose.model('Students', StudentSchema)
