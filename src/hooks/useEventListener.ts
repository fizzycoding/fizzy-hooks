import { useEffect, useRef } from "react";

type EventTarget = Window | Document | HTMLElement;
type ElementRef<T> = React.RefObject<T | null> | T | null;

/**
 * useEventListener
 *
 * Adds an event listener to a target (DOM node, window, or ref).
 *
 * @param target - A DOM element, ref, window, or document.
 * @param event - The name of the event to listen for.
 * @param handler - The callback to invoke when the event fires.
 * @param options - Optional event listener options.
 */

function useEventListener<K extends keyof WindowEventMap>(
  target: ElementRef<Window>,
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<K extends keyof DocumentEventMap>(
  target: ElementRef<Document>,
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLElement
>(
  target: ElementRef<HTMLElement>,
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<T extends EventTarget, E extends Event>(
  target: ElementRef<T>,
  eventName: string,
  handler: (event: E) => void,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef<(event: E) => void>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement =
      (target && "current" in target ? target.current : target) ?? window;

    if (!(targetElement && targetElement.addEventListener)) return;

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler?.current?.(event as E);
      }
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, target, options]);
}

export default useEventListener;
