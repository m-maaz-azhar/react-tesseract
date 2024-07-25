# react-tesseract

A lightweight React Library for seamless integration of Tesseract.js OCR capabilities in your React applications.

## Features

- 🚀 Easy-to-use React hook
- 🛠 Built-in error handling
- 🎛 Flexible configuration options
- 🌍 Multi-language support

## Installation

Install the package using npm:

```bash
npm install react-tesseract
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import { useTesseract } from 'react-tesseract';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const { recognize, error, result, isRecognizing } = useTesseract();

  const handleRecognize = async () => {
    if (imageUrl) {
      await recognize(imageUrl, {
        language: 'eng+ara',  // Use English and Arabic
        errorHandler: (err) => console.error(err),  // Custom error handler
        tessedit_ocr_engine_mode: 1,  // Use neural net LSTM engine only
        tessedit_pageseg_mode: 1,  // Assume a single uniform block of text
        // ... any other Tesseract.js options
      });
    }
  };

  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleRecognize} disabled={!imageUrl || isRecognizing}>
        Recognize Text
      </button>
      {error && <p>Error: {error}</p>}
      {result && <pre>{result}</pre>}
    </div>
  );
};

export default App;
```

## API
```jsx
useTesseract()
```

#### `recognize(image: string | File, options?: Object): Promise<string>`

Initiates the OCR process on the provided image. 

- **image**: URL of the image or a File object.
- **options**: (Optional) An object containing configuration options for Tesseract.js.

| Property | Type | Description |
| --- | --- | --- |
| error | string | The error message if the OCR process fails |
| result | string | The OCR result as a string |
| isRecognizing | boolean | A boolean value indicating whether the OCR process is in progress |

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License

