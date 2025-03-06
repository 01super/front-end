import { useEffect, useState, useCallback } from 'react';

export function useDrage(dragAreaRef: React.RefObject<HTMLDivElement>) {
  const [draggingFile, setDraggingFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: DragEvent) => {
    console.log('drag', e);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    console.log(e.dataTransfer?.files[0]);
    e.preventDefault();
    e.stopPropagation();
    setDraggingFile(e.dataTransfer?.files[0] || null);
  }, []);

  useEffect(() => {
    if (!dragAreaRef.current) return;
    dragAreaRef.current.addEventListener('dragenter', handleDrag);
    dragAreaRef.current.addEventListener('dragover', handleDrag);
    dragAreaRef.current.addEventListener('drop', handleDrop);
    dragAreaRef.current.addEventListener('dragleave', handleDrag);
    return () => {
      dragAreaRef.current?.removeEventListener('dragenter', handleDrag);
      dragAreaRef.current?.removeEventListener('dragover', handleDrag);
      dragAreaRef.current?.removeEventListener('drop', handleDrop);
      dragAreaRef.current?.removeEventListener('dragleave', handleDrag);
    };
  }, [dragAreaRef, handleDrag, handleDrop]);

  return draggingFile;
}
