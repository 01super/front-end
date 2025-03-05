// 分片的相关事件
// chunks: 一部分分片产生了
// wholeHash: 整个文件的hash计算完成

import SparkMD5 from 'spark-md5';
import { EventEmitter } from './EventEmitter';
import { calcChunkHash, Chunk, createChunk } from './chunk';
import { ChunkSplitor, ChunkSplitorEvents } from './ChunkSplitor';
import { md5 } from 'hash-wasm';

export class ChunkSplit extends ChunkSplitor {
  // 计算每一个分片的hash
  // calcHash(chunks: Chunk[], emitter: EventEmitter<'chunks'>): void {
  //   const len = chunks.length;
  //   let count = 0;
  //   chunks.forEach(async (chunk) => {
  //     const arrayBuffer = await chunk.blob.arrayBuffer();
  //     const uint8Array = new Uint8Array(arrayBuffer);
  //     chunk.hash = await md5(uint8Array);
  //     console.log(chunk.hash);
  //     count++;
  //     if (count === len) {
  //       emitter.emit('chunks', [chunk]);
  //     }
  //   });
  //   console.log(1, chunks[0].hash);
  // }

  calcAll() {
    this.calcHash(this.chunks, new EventEmitter<'chunks'>());
  }

  calcHash(chunks: Chunk[], emitter: EventEmitter<'chunks'>): void {
    const spark = new SparkMD5.ArrayBuffer();
    let processed = 0;

    const processChunk = (chunk: Chunk) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        spark.append(e.target?.result as ArrayBuffer);
        processed++;

        if (processed === chunks.length) {
          this.hash = spark.end();
          console.log('hash: ', this.hash);
          this.emit('wholeHash', this.hash);
          this.emit('drain');
        }
      };
      reader.readAsArrayBuffer(chunk.blob);
    };
    chunks.forEach(processChunk);
  }

  dispose(): void {
    this.chunks = [];
    this.hash = undefined;
  }
}
