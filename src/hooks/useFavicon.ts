import { useEffect } from "react";

function useFavicon(href: string) {
  useEffect(() => {
    if (!href) return;

    let link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = href;
  }, [href]);
}
export default useFavicon;
