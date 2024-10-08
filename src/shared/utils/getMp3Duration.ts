// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import mp3Duration from "mp3-duration";

export async function getMp3Duration(filePath: string): Promise<number> {
  return new Promise((resolve) => {
    mp3Duration(filePath.substring(1), (err: unknown, duration: number) => {
      if (err) return resolve(0);
      resolve(duration);
    });
  });
}
