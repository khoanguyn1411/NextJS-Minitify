export function getSrcFromApi(src: string, type: "image" | "mp3" = "image") {
  if (type === "image") {
    return `/api/images?image=${src}`;
  }
  return `/api/files?file=${src}`;
}
