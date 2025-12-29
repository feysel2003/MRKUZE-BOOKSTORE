const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
 },
 description: {
    type: String,
    required: true,
 },
 category: {
    type: String,
    required: true,
 },
 trending: {
    type: Boolean,
    required: true,
 },
 coverImage: {
    type: String,
    required: true,
 },
 newPrice:{
   type: Number,
   required: true,
 },
 oldPrice:{
   type: Number,
   required: true,
 },

 // --- NEW: REVIEWS ARRAY ---
 reviews: [
   {
      userId: { type: String, required: true }, // To track who posted
      userName: { type: String, required: true }, // To display name without looking up Auth DB
      comment: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      createdAt: { type: Date, default: Date.now }
   }
 ],
 // --------------------------

 createAt: {
    type:Date,
    default: Date.now,
 },
},
{
    timestamps: true,
}
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;