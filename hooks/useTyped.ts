import { useState, useEffect, useRef } from 'react';

const useTyped = (
  strings: string[],
  typeSpeed = 50,
  deleteSpeed = 25,
  delay = 1500
) => {
  const [text, setText] = useState('');
  const stringIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeoutId: number;
    const currentString = strings[stringIndex.current];

    // Typing logic
    if (!isDeleting.current && text.length < currentString.length) {
      timeoutId = window.setTimeout(() => {
        setText(currentString.slice(0, text.length + 1));
      }, typeSpeed);
    }
    // Pause after typing is complete, then start deleting
    else if (!isDeleting.current && text.length === currentString.length) {
      timeoutId = window.setTimeout(() => {
        isDeleting.current = true;
        // Trigger deletion by updating state
        setText(currentString.slice(0, text.length - 1));
      }, delay);
    }
    // Deleting logic
    else if (isDeleting.current && text.length > 0) {
      timeoutId = window.setTimeout(() => {
        setText(currentString.slice(0, text.length - 1));
      }, deleteSpeed);
    }
    // Finished deleting, move to the next string
    else if (isDeleting.current && text.length === 0) {
      isDeleting.current = false;
      stringIndex.current = (stringIndex.current + 1) % strings.length;
      // Trigger typing of the new string
      timeoutId = window.setTimeout(() => {
          setText(strings[stringIndex.current].slice(0, 1));
      }, typeSpeed);
    }

    return () => window.clearTimeout(timeoutId);

  }, [text, strings, typeSpeed, deleteSpeed, delay]);

  return text;
};

export default useTyped;
