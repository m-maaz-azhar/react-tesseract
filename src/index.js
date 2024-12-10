import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

export const useTesseract = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const recognize = useCallback(async (image, options = {}) => {
    setError(null);
    setResult('');
    setIsRecognizing(true);

    const {
      language = 'eng',
      errorHandler,
    } = options;
    let worker;
    
    try {
      worker = await createWorker(language);
            
      const { data } = await worker.recognize(image, {
        ...options,
      });
      
      setResult(data.text);
      return data;
    } catch (err) {
      setError(err.message);
      if (errorHandler) errorHandler(err);
      throw err;
    } finally {
      await worker.terminate();
      setIsRecognizing(false);
    }
  }, []);

  return {
    recognize,
    error,
    result,
    isRecognizing
  };
};