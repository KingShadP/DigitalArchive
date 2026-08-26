declare module 'mp4box' {
  export interface MP4MediaTrack {
    id: number;
    created: Date;
    modified: Date;
    volume: number;
    track_width: number;
    track_height: number;
    timescale: number;
    duration: number;
    bitrate: number;
    codec: string;
    language: string;
    nb_samples: number;
    video?: {
      width: number;
      height: number;
    };
  }

  export interface MP4Info {
    duration: number;
    timescale: number;
    isFragmented: boolean;
    isProgressive: boolean;
    hasIOD: boolean;
    brands: string[];
    created: Date;
    modified: Date;
    tracks: MP4MediaTrack[];
    videoTracks: MP4MediaTrack[];
    audioTracks: MP4MediaTrack[];
  }

  export interface MP4Sample {
    track_id: number;
    number: number;
    data: ArrayBuffer;
    size: number;
    alreadyRead: number;
    dts: number;
    pts: number;
    duration: number;
    cts: number;
    offset: number;
    timescale?: number;
    is_sync: boolean;
    is_leading: number;
    depends_on: number;
    is_depended_on: number;
    has_redundancy: number;
    degradation_priority: number;
    description: {
      avcC?: {
        buffer: ArrayBuffer;
      };
      hvcC?: {
        buffer: ArrayBuffer;
      };
      vpcC?: {
        buffer: ArrayBuffer;
      };
      av1C?: {
        buffer: ArrayBuffer;
      };
      [key: string]: unknown;
    };
  }

  export interface MP4BoxFile {
    onReady: (info: MP4Info) => void;
    onError: (e: string | Error) => void;
    onSamples: (id: number, user: unknown, samples: MP4Sample[]) => void;
    appendBuffer: (data: ArrayBuffer & { fileStart?: number }) => number;
    start: () => void;
    stop: () => void;
    flush: () => void;
    setExtractionOptions: (id: number, user?: unknown, options?: { nbSamples?: number }) => void;
  }

  export class DataStream {
    static BIG_ENDIAN: boolean;
    static LITTLE_ENDIAN: boolean;
    buffer: ArrayBuffer;
    position: number;
    constructor(arrayBuffer?: ArrayBuffer, byteOffset?: number, endianness?: boolean);
    writeUint8(value: number): void;
    writeUint16(value: number): void;
    writeUint32(value: number): void;
    writeUint8Array(array: Uint8Array): void;
  }

  export function createFile(): MP4BoxFile;
}
