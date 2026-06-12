export function getAbsoluteApiUrl(path: string): string {
  let origin = "";
  try {
    if (typeof window !== "undefined") {
      const href = window.location.href;
      if (href && href.startsWith("http")) {
        const urlObj = new URL(href);
        origin = urlObj.origin;
      }
    }
  } catch (e) {
    console.error("Error detecting absolute API host:", e);
  }

  if (!origin || origin === "null") {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return origin + cleanPath;
}
