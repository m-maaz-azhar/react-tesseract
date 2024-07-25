import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

const useTesseract = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const recognize = useCallback(async (image, language = 'eng') => {
    setProgress(0);
    setError(null);
    setResult('');
    setIsRecognizing(true);

    const worker = await createWorker({
      logger: m => {
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    });

    try {
      await worker.loadLanguage(language);
      await worker.initialize(language);
      const { data: { text } } = await worker.recognize(image);
      setResult(text);
      return text;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      await worker.terminate();
      setIsRecognizing(false);
    }
  }, []);

  return {
    recognize,
    progress,
    error,
    result,
    isRecognizing
  };
};

export default useTesseract;