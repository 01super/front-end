import { useEffect, useState } from 'react';
import './App.css';
import { ChunkSplit } from './utils/ChunkSplit';

const CHUNK_SIZE = 1024 * 1024 * 5;

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    console.log('Hello, Rsbuild!');
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const f = e.target.files[0];
    console.log(f);
    setFile(f);
  }

  function handleUpload() {
    if (!file) {
      alert('请选择文件');
      return;
    }
    console.log('upload');
    const splitor = new ChunkSplit(file!, CHUNK_SIZE);
    splitor.calcAll();
    console.log('splitor: ', splitor);
  }

  return (
    <div className="content">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>上传</button>
    </div>
  );
};

export default App;
