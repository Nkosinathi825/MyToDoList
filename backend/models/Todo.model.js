import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true,
    },
    completed: { 
        type: Boolean, 
        default: false,
    },
    completedAt: { 
        type: Date,
    },
    order: { 
        type: Number, 
        default: 0 
    } 
}, { timestamps: true }); 

// Pre-save hook to set completedAt when the todo is completed
todoSchema.pre('save', function (next) {
    if (this.isModified('completed')) {
        if (this.completed) {
            // Set completedAt to the current date if the todo is completed
            this.completedAt = new Date();
        } else {
            // Clear completedAt if the todo is not completed
            this.completedAt = null;
        }
    }
    next();
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
