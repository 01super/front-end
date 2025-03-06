import { Chunk } from './chunk';

const post = (chunks: Chunk) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('post', chunks);
      resolve(true);
    }, 1000);
  });
};

export class UploadController {
  // upload(file: File): Promise<void>;
}
