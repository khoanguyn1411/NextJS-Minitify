import { readFileSync, statSync } from "fs";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url ?? "", `http://${req.url}`);
  const filePath = searchParams.get("file") ?? "";

  try {
    const fullPath = join(process.cwd(), filePath);
    // Check if the file exists
    statSync(fullPath);

    // Read the file as a buffer
    const fileBuffer = readFileSync(fullPath);

    // Set the headers and return the file buffer as a response
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "audio/mpeg", // Change to the MP3 MIME type
        "Content-Disposition": `inline; filename="${filePath}"`, // Optional: suggests the file name in the response
        "x-hello-from-middleware1": "hello",
      },
    });
  } catch (error) {
    // Handle error case (e.g., file not found)
    return NextResponse.json({ error: "Some error occurred" }, { status: 500 });
  }
}
