import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { plantName } = await req.json();

    if (!plantName) {
      return NextResponse.json(
        { error: "Plant name is required" },
        { status: 400 }
      );
    }

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&format=json&exintro=&titles=${encodeURIComponent(
      plantName
    )}&pithumbsize=500`;

    const response = await fetch(endpoint);
    const data = await response.json();

    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === "-1") {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    const page = pages[pageId];
    const image = page.thumbnail ? page.thumbnail.source : null;
    let extract = page.extract;

    // Strip out unwanted HTML tags
    extract = extract.replace(/<[^>]*>/g, ""); // Removes all HTML tags

    return NextResponse.json({
      image: image || "No image available",
      description: extract || "No description available",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching plant info" },
      { status: 500 }
    );
  }
}
