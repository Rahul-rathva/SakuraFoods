const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  diet: String,
  dislikes: [String],
  weeklyPlan: Array
});

const User = mongoose.model('User', userSchema);