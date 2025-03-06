import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ChunkSplit } from './utils/ChunkSplit';
import { useDrage } from './hooks/useDrage';
const CHUNK_SIZE = 1024 * 1024 * 5;

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('Hello, Rsbuild!');
  }, []);

  useDrage(dragAreaRef as React.RefObject<HTMLDivElement>);

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
    // 文件分片
    const splitor = new ChunkSplit(file!, CHUNK_SIZE);
    // 文件计算hash和上传
  }

  return (
    <div className="content">
      <div className="drag-area" ref={dragAreaRef}></div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>上传</button>
    </div>
  );
};

export default App;
