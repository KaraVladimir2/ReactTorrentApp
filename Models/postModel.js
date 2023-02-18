import { Schema, model } from "mongoose";
const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    required: false,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: false,
  },
  requirements: {
    type: String,
    required: false,
  },
  shortInfo: {
    type: String,
    required: false,
  },
  installation: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  comments: [
    {
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: () => new Date(),
      },
      owner: {
        type: String,
      },
    },
  ],
  titleImage: {
    Buffer: {
      type: Buffer,
    },
    ContentType: {
      type: String,
    },
  },
  screenshots: [
    {
      Buffer: {
        type: Buffer,
      },
      ContentType: {
        type: String,
      },
    },
  ],
  torrentFile: {
    Buffer: {
      type: Buffer,
    },
    ContentType: {
      type: String,
    },
  },
});

export default model("post", schema);
