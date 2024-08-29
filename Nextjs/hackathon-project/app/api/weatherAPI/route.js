import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const info = await req.json();

    const lat = info.lat;
    const lon = info.lon;

    const response = await fetch(`${process.env.WEATHER_BASE_URL}/${lat},${lon}/next15days?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&include=days`);

    const data = await response.json();

    return NextResponse.json(data);

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
