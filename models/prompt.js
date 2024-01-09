import { connectToDB } from '@utils/database';
import mongoose, { Schema, model, models } from 'mongoose';

await connectToDB();
console.log('Prompt Model is Ready!')

mongoose.models = {}

const PromptSchema = new Schema ({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  }
});

const Prompt = models.Prompt || model('prompt', PromptSchema);

export default Prompt;
