import { useEffect, useRef } from 'react';


function useDocumentTitle(title) {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
    return () => {
      document.title = originalTitle.current; // Reset to default title on unmount
    };

  }, [title]);
}


export default useDocumentTitle;