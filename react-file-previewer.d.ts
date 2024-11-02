// react-file-previewer.d.ts

declare module 'react-file-previewer' {
  import * as React from 'react';

  interface File {
    url: string;
    type?: string;
    name?: string;
  }

  interface PreviewProps {
    file: File;
    onError?: (error: Error) => void;
    onLoad?: () => void;
    onProgress?: (progress: number) => void;
  }

  const Preview: React.FC<PreviewProps>;

  export default Preview;
}
