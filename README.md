# Fizzy Hooks

**Fizzy Hooks** is a lightweight collection of production-ready, reusable React hooks written in TypeScript. Simplify your code, speed up development, and keep your components clean and efficient.

<p align="center">
  <img src="https://img.shields.io/npm/v/fizzy-hooks?style=flat-square" />
  <img src="https://img.shields.io/github/stars/fizzycoding/fizzy-hooks?style=flat-square" />
</p>

---

## Features

- Written in TypeScript
- Tiny & tree-shakable
- Plug & play hooks for real-world needs
- Actively maintained

---

## Installation

```bash
npm install fizzy-hooks
```

---

## Included Hooks

| Hook                                      | Description                                     |
| ----------------------------------------- | ----------------------------------------------- |
| [useAsync](#useasync)                     | Manage asynchronous operations and track status |
| [useBattery](#usebattery)                 | Get battery status (charging, level, etc.)      |
| [useClickOutside](#useclickoutside)       | Detect clicks outside of a specified element    |
| [useCopyToClipboard](#usecopytoclipboard) | Copy text to clipboard and track copy status    |
| [useDebounce](#usedebounce)               | Debounce a value                                |
| [useDefault](#usedefault)                 | Use a fallback value when a value is invalid    |
| [useDocumentTitle](#usedocumenttitle)     | Dynamically update the document title           |
| [useEventListener](#useeventlistener)     | Attach event listeners to any DOM element       |
| [useFavicon](#usefavicon)                 | Dynamically change the page's favicon           |
| [useFetch](#usefetch)                     | Simple fetch wrapper hook                       |
| `useGeolocation`                          | Get and track user's geolocation                |
| `useHover`                                | Detect hover state on an element                |
| `useIdle`                                 | Track if the user is idle (no activity)         |
| `useIntersectionObserver`                 | Observe if an element enters the viewport       |
| `useInterval`                             | Run a callback on an interval with pause/resume |
| `useIsOnline`                             | Track internet connectivity status              |
| `useLocalStorage`                         | Read and write from `localStorage`              |
| `useMediaQuery`                           | Track media query matches                       |
| `usePrevious`                             | Access the previous value of a state/prop       |
| `useScreenOrientation`                    | Get the current screen orientation              |
| `useSessionStorage`                       | Use `sessionStorage` like state                 |
| `useSpeechSynthesis`                      | Speak text using browser’s speech API           |
| `useThrottle`                             | Throttle a value or callback                    |
| `useTimeout`                              | Delay function execution with clearable timeout |
| `useToggle`                               | Toggle boolean state                            |
| `useUndoRedo`                             | Add undo/redo capabilities to state             |
| `useUndoRedoPersist`                      | Undo/redo state with persistence                |
| `useWindowSize`                           | Get current window dimensions                   |

---

## Contributing

Contributions, ideas, and feedback are welcome!

```
git clone https://github.com/fizzycoding/fizzy-hooks.git
cd fizzy-hooks
npm install
```

Then:

Add or improve a hook in src/hooks

Run `npm run build`

Open a PR

## License

MIT © fizzycoding

## Support

If you find this library helpful:

- Star this repo

- Share it with other developers
- Use it in your projects

---

## Usage Examples

### **useAsync**

`useAsync` helps you manage asynchronous operations in React. It tracks the loading state, result, and any errors from an async function.

**Import**

```tsx
import { useAsync } from "fizzy-hooks";
```

**Parameters**

- `asyncFn`: The async function you want to execute.
- `autoRun` (optional): If true, runs asyncFn immediately on mount. Default is false.
- `deps` (optional): Dependency array to re-run asyncFn if autoRun is enabled.

**Returns**

| Value     | Type             | Description                                           |
| --------- | ---------------- | ----------------------------------------------------- |
| `value`   | `any`            | The returned data from the async function             |
| `loading` | `boolean`        | Indicates whether the async function is still running |
| `error`   | `string \| null` | The error message if the function fails               |
| `run`     | `function`       | Function to trigger the async operation manually      |
| `reset`   | `function`       | Resets the state to the initial state                 |

**Example**

```tsx
import { useAsync } from "fizzy-hooks";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

function ExampleComponent() {
  // useAsync(asyncFn, autoRun, deps)

  const { value, loading, error, run, reset } = useAsync(fetchData, true);
  if (loading) return <p>Loading</p>;
  return (
    <div>
      <button onClick={run}>Fetch</button>
      <button onClick={reset}>Reset</button>
      {error && <p>Error: {error}</p>}
      {value && <pre>{JSON.stringify(value, null, 2)}</pre>}
    </div>
  );
}
```

**Explanation**:
You define an async function (like fetchData), then use `run()` to trigger it. While it's running, loading is true. When it finishes, the result is stored in value. If it fails, error contains the error message. You can reset everything using `reset()`.

---

### **useBattery**

`useBattery` hook provides real-time information about the user's device battery status using the [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).

**Import**

```tsx
import { useBattery } from "fizzy-hooks";
```

**Returns**
| Value | Type | Description |
| ----------------- | --------- | --------------------------------------------------- |
| `charging` | `boolean` | Whether the battery is currently charging |
| `level` | `number` | Battery level (from `0` to `1`) |
| `chargingTime` | `number` | Time in seconds until the battery is fully charged |
| `dischargingTime` | `number` | Time in seconds until the battery is empty |
| `supported` | `boolean` | Whether the browser supports the Battery Status API |
| `loading` | `boolean` | `true` while the battery status is being fetched |

**Example**

```tsx
import { useBattery } from "fizzy-hooks";

function BatteryInfo() {
  const { charging, level, chargingTime, dischargingTime, supported, loading } =
    useBattery();

  if (!supported) return <p>Battery API not supported on this device.</p>;
  if (loading) return <p>Loading battery status...</p>;

  return (
    <div>
      <p>Battery Level: {Math.round(level * 100)}%</p>
      <p>{charging ? "Charging" : "Not Charging"}</p>
      <p>Charging Time: {chargingTime} seconds</p>
      <p>Discharging Time: {dischargingTime} seconds</p>
    </div>
  );
}
```

---

### **useClickOutside**

`useClickOutside` is a React hook that detects clicks outside of a referenced element and runs a callback handler. This is especially useful for closing modals, dropdowns, tooltips, or menus when a user clicks outside of them.

**Import**

```tsx
import { useClickOutside } from "fizzy-hooks";
```

**Parameters**
| Parameter | Type | Description |
| --------- | ------------------------------------------- | ----------------------------------------- |
| `handler` | `handlerFunction` | Callback function to run on outside click |

**Returns**

| Value | Type                 | Description                                                           |
| ----- | -------------------- | --------------------------------------------------------------------- |
| `ref` | `React.RefObject<T>` | Attach this ref to the element you want to monitor for outside clicks |

**Example**

```tsx
import { useClickOutside } from "fizzy-hooks";
import { useState } from "react";

function Dropdown() {
  const [open, setOpen] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setOpen(false);
  });

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle Dropdown</button>

      {open && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            background: "green",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>This is a dropdown.</p>
        </div>
      )}
    </div>
  );
}
```

**Explanation**

- This hook returns a `ref` that you attach to the component (like a modal or dropdown).

- When a user clicks anywhere outside that element, the `handler` is triggered.

- Works with both mousedown and touchstart for cross-device support.

---

### **useCopyToClipboard**

`useCopyToClipboard` hook provides an easy way to copy text to the user's clipboard and track whether the operation succeeded.

**Import**

```tsx
import { useCopyToClipboard } from "fizzy-hooks";
```

**Returns**
| Value | Type | Description |
| --------- | ------------------------------------ | ---------------------------------------------------- |
| `copy` | `(text: string) => Promise<boolean>` | Function to copy given text to clipboard |
| `success` | `boolean` | `true` if the last copy was successful, else `false` |

```tsx
import { useCopyToClipboard } from "fizzy-hooks";
import { useState } from "react";

function CopyExample() {
  const [text, setText] = useState("Hello world!");
  const { copy, success } = useCopyToClipboard();

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to copy"
      />
      <button onClick={() => copy(text)}>Copy</button>
      {success && <p style={{ color: "green" }}>Copied to clipboard!</p>}
    </div>
  );
}
```

**Explanation**

- The `copy()` function copies any string to the clipboard using the Clipboard API.

- The `success` state is set to true for 2 seconds after a successful copy.

- You can use success to show a confirmation or status message to the user.

---

### **useDebounce**

`useDebounce` hook delays updating a value until after a specified wait time has passed without changes. This is useful for optimizing performance in input fields, search queries, or any value that changes rapidly.

**Import**

```tsx
import { useDebounce } from "fizzy-hooks";
```

**Parameters**
| Parameter | Type | Default | Description |
| --------- | -------- | ------- | ------------------------------------- |
| `value` | `T` | – | The input value to debounce |
| `delay` | `number` | `500` | Time in milliseconds to delay updates |

**Returns**
| Value | Type | Description |
| ---------------- | ---- | --------------------------------- |
| `debouncedValue` | `T` | The updated value after the delay |

**Example**

```tsx
import { useEffect, useState } from "react";
import { useDebounce } from "fizzy-hooks";

function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // Trigger API or search
    }
  }, [debouncedQuery]);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p>{debouncedQuery}</p>
    </>
  );
}
```

---

### **useDefault**

`useDefault` hook helps you provide a fallback value when the current value is null, undefined, or deemed invalid by a custom validator. This is especially useful when working with user input, optional props, or external data that may not always be available.

**Import**

```tsx
import { useDefault } from "fizzy-hooks";
```

**Parameters**

| Parameter              | Type                    | Description                                                             |
| ---------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `value`                | `T`                     | The value to check and potentially replace                              |
| `defaultValue`         | `T`                     | The fallback value to use if `value` is invalid                         |
| `isInvalid` (optional) | `(value: T) => boolean` | Optional custom validation function. Return `true` to use default value |

**Returns**
| Value | Type | Description |
| ---------------- | ---- | ------------------------------------------------- |
| `effectiveValue` | `T` | Either the original value or the fallback default |

**Example 1 – Basic Fallback**

```tsx
import { useDefault } from "fizzy-hooks";

function Username({ name }: { name?: string }) {
  const displayName = useDefault(name, "Guest");

  return <h2>Hello, {displayName}!</h2>;
}
```

If name is undefined, the hook returns "Guest" as the default.

**Example 2 – Custom Validation**

```tsx
import { useDefault } from "fizzy-hooks";

function AgeDisplay({ age }: { age: number | null }) {
  const displayAge = useDefault(age, 18, (v) => v === null || v <= 0);

  return <p>Age: {displayAge}</p>;
}
```

If age is null or less than or equal to 0, the hook returns 18.

---

### **useDocumentTitle**

`useDocumentTitle` hook allows you to dynamically set the browser tab's title from within a React component.

**Import**

```tsx
import { useDocumentTitle } from "fizzy-hooks";
```

**Parameters**
| Parameter | Type | Description |
| --------- | -------- | ---------------------------------------- |
| `title` | `string` | The title you want to display in the tab |

**Example**

```tsx
import { useDocumentTitle } from "fizzy-hooks";

function AboutPage() {
  useDocumentTitle("About Us");

  return <h1>Welcome to the About Page</h1>;
}
```

When the AboutPage component mounts, the browser tab title will be set to "About Us". If the title changes (e.g., via props or state), it updates the title accordingly.

---

### **useEventListener**

`useEventListener` is a flexible React hook that lets you add event listeners to various targets like window, document, or DOM elements (including React refs). It handles automatic cleanup and maintains a stable handler function.

**Import**

```tsx
import { useEventListener } from "fizzy-hooks";
```

**Parameters**
| Parameter | Type | Description |
| ----------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| `target` | `Window` \| `Document` \| `HTMLElement` \| `RefObject<T>` | The element or reference to attach the event listener to |
| `eventName` | `string` | The name of the event to listen for (e.g., `"click"`, `"scroll"`) |
| `handler` | `(event: Event) => void` | The callback function that will be invoked when the event is triggered |
| `options` (optional) | `boolean` \| `AddEventListenerOptions` | Optional options passed to `addEventListener` (e.g., `{ once: true }`) |

**Example 1 : Listen to window resize**

```tsx
import { useState } from "react";
import { useEventListener } from "fizzy-hooks";

function WindowResizeTracker() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener("resize", () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return (
    <p>
      Width: {size.width}, Height: {size.height}
    </p>
  );
}
```

**Example 2 : Click outside an element**

```tsx
import { useRef } from "react";
import { useEventListener } from "fizzy-hooks";

function ClickOutsideAlert() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEventListener(boxRef, "click", (e) => {
    console.log("Box clicked");
  });

  useEventListener(document, "click", (e) => {
    if (!boxRef.current?.contains(e.target as Node)) {
      alert("Clicked outside the box!");
    }
  });

  return (
    <div ref={boxRef} style={{ padding: 20, background: "#eee" }}>
      Click inside or outside
    </div>
  );
}
```

---

### **useFavicon**

`useFavicon` hook allows you to dynamically update the favicon of your web page by setting a new image URL.

**Import**

```tsx
import { useFavicon } from "fizzy-hooks";
```

**Parameter**
| Parameter | Type | Description |
| --------- | -------------- | -------------------------------------- |
| `href` | string | The URL of the image to use as favicon |

**Example**

```tsx
import { useFavicon } from "fizzy-hooks";

function FaviconExample() {
  useFavicon("https://example.com/my-icon.ico");

  return <p>The favicon should now be updated!</p>;
}
```

The hook checks if a `<link rel="icon">` exists in the `<head>`.
If it exists, it updates its href to the new favicon URL.
If it doesn’t, it creates a new `<link rel="icon">` element and appends it to the `<head>`.
The update happens reactively every time the href value changes.

---

### **useFetch**

`useFetch` hook is a simple and powerful way to fetch data from APIs in your React components. It handles loading, error, and success states, and also provides a `refetch()` method.

**Import**

```jsx
import { useFetch } from "fizzy-hooks";
```

**Parameters**

| Name           | Type          | Description                                                            |
| -------------- | ------------- | ---------------------------------------------------------------------- |
| `url`          | `string`      | The endpoint URL to fetch data from.                                   |
| `options`      | `RequestInit` | Optional fetch options (headers, method, body, etc).                   |
| `dependencies` | `any[]`       | Optional dependency array that triggers refetching when values change. |

**Returns**
| Value | Type | Description |
| ----------- | --------------------- | ------------------------------------------- |
| `data` | `T \| null` | The response data after a successful fetch. |
| `loading` | `boolean` | Indicates if the request is in progress. |
| `error` | `string \| null` | Error message if the fetch fails. |
| `refetch()` | `function` | Manually re-trigger the fetch operation. |

**Example**

```tsx
import { useState } from "react";
import { useFetch } from "fizzy-hooks";

function FetchData() {
  const [id, setId] = useState(1);
  const { data, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method: "GET",
    },
    [id]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <button onClick={() => setId((v) => v + 1)}>Next</button>
      <button
        onClick={() => {
          console.log("refetched");
          refetch();
        }}
      >
        Refetch
      </button>
      <div>
        <p>User ID: {data?.id}</p>
        <p>Name: {data?.name}</p>
        <p>Email: {data?.email}</p>
        <p>Username: {data?.username}</p>
      </div>
    </>
  );
}
```

`useFetch` automatically calls the API when the component mounts. You can pass any valid fetch options like headers or POST data.

If you want the fetch to re-run when certain values change (like query), pass them in the dependencies array.

Use `refetch()` manually to re-trigger the request

---