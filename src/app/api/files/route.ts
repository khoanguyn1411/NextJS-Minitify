import { readFileSync, statSync } from "fs";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url ?? "", `http://${req.url}`);
  const filePath = searchParams.get("file") ?? "";

  try {
    const fullPath = join(process.cwd(), filePath);
    const fileStats = statSync(fullPath); // Get file stats to determine size
    const fileSize = fileStats.size; // File size in bytes

    const range = req.headers.get("range"); // Get range from request headers
    let fileBuffer;

    // Need Accept-Ranges and Content-Range for setting audio current time.
    // Ref: https://stackoverflow.com/a/63059735/19428722

    // Default response headers
    const headers: Record<string, string> = {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `inline; filename="${filePath}"`,
      "Accept-Ranges": "bytes",
    };

    // Check if the Range header is present for partial content
    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(startStr, 10); // Start byte
      const end = endStr ? parseInt(endStr, 10) : fileSize - 1; // End byte, default to the file size
      const chunkSize = end - start + 1; // Size of the chunk to be sent

      // Read the part of the file
      fileBuffer = readFileSync(fullPath).slice(start, end + 1);

      // Add partial content headers
      headers["Content-Range"] = `bytes ${start}-${end}/${fileSize}`;
      headers["Content-Length"] = `${chunkSize}`;

      return new NextResponse(fileBuffer, {
        status: 206, // Partial content
        headers,
      });
    } else {
      // Full file response if no range is requested
      fileBuffer = readFileSync(fullPath);

      headers["Content-Length"] = `${fileSize}`;

      return new NextResponse(fileBuffer, {
        status: 200, // OK
        headers,
      });
    }
  } catch (error) {
    // Handle error case (e.g., file not found)
    return NextResponse.json({ error: "Some error occurred" }, { status: 500 });
  }
}
