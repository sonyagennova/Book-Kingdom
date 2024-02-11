import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  roles: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Role'
  },
  points: {
    type: Number
  },
  vouchers: {
    type: [Schema.Types.Array]
  }
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);
