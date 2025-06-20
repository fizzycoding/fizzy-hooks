import { useCallback, useState } from "react";

/**
 * useCopyToClipboard Hook
 *
 * Copies text to the clipboard and returns copy status.
 *
 * @returns copy - A function to copy text
 * @returns success - Whether the last copy was successful
 */

function useCopyToClipboard(): {
  copy: (text: string) => Promise<boolean>;
  success: boolean;
} {
  const [success, setSuccess] = useState(false);
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000); // Reset after 2 seconds
      return true;
    } catch (error) {
      console.error("Failed to copy: ", error);
      setSuccess(false);
      return false;
    }
  }, []);
  return { copy, success };
}
export default useCopyToClipboard;
