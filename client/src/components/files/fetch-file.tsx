import React, { useState } from 'react';
import axios from 'axios';

const FetchFile: React.FC = () => {
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);

  const fetchFile = async () => {
    try {
      const response = await axios.get(
        'https://items-store-little-chic.s3.eu-central-1.amazonaws.com/1527177048246.jpeg',
        {
          responseType: 'arraybuffer', // Depending on the file type, you might use different response types
        }
      );

      // If it's text data, you can convert it to a string
      const data = new TextDecoder().decode(new Uint8Array(response.data));
      setFileData(data);

      // If it's binary data (e.g., an image), you might use a Blob or create an object URL
      // const blob = new Blob([response.data], { type: 'application/octet-stream' });
      // setFileData(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Failed to fetch file:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchFile}>Fetch File</button>
      {fileData && <pre>{fileData.toString()}</pre>}
    </div>
  );
};

export default FetchFile;
