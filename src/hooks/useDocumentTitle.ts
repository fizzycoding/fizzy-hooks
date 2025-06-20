import { useEffect } from "react";
/**
 * useDocumentTitle Hook
 *
 * Set the document title.
 *
 * @param title - The title to set in the browser tab.
 */
const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
