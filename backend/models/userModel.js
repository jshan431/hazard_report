import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  image: {
    type: String,
    default: 'https://i.imgur.com/fECNtqD.jpg'
  },
  hazards: [
    { 
      type: mongoose.Types.ObjectId, 
      required: true, 
      ref: 'Hazard' 
    }
  ]
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// Before we "save" perform this middleware to encrypt the password. 'Create' works as it is syntatical sugar
userSchema.pre('save', async function (next){

  // if the password was not modified 'I.e by updating profile without updating password. Just move on
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;