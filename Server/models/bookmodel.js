const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = Schema({
	url: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
}, { timestamps: true });

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;