import { Buffer } from "buffer";

const createFileUrl = async (data, setState) => {
  let buffers = [];
  if (data instanceof Array) {
    buffers = data.map((buf) => {
      return Buffer.from(buf.Buffer);
    });
  } else {
    buffers = [data].map((buf) => {
      return Buffer.from(buf.Buffer);
    });
  }
  const objectURL = [];
  buffers.map((buffer) => {
    const blob = new Blob([buffer], { type: data.ContentType });
    return objectURL.push(URL.createObjectURL(blob));
  });
  if (objectURL.length === 1) setState(objectURL[0]);
  else setState(objectURL);
};

export default createFileUrl;
