import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    index: Number,
    description: String,
    explanation: String,
    alternatives: mongoose.Schema.Types.Mixed,
    answer: [String]
});

const questionSetSchema = new Schema({
    setname: String,
    _id: String,
    questions: [questionSchema]
});

// export models
const Question = mongoose.model('question', questionSchema);
const QuestionSet = mongoose.model('questions', questionSetSchema);

export {Question, QuestionSet};