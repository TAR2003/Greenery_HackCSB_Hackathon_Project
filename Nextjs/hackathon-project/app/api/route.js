// Import necessary functions
import { NextResponse } from "next/server";
import { getUserInfo } from "./getUserInfo";
import { getUserPosts } from "./getUserPosts";
import { getUserPlants } from "./getUserPlants";
import { getPlantPosts } from "./getPlantPosts"; // Import the new function
import { userInfoSchema, loginSchema, userPostsSchema } from "./validation";
import { sanitizeInput } from "./sanitization";

// Define the POST function
export async function POST(request) {
  try {
    const info = await request.json();
    const type = info.type;

    if (!type) {
      return NextResponse.json(
        { message: "Type is required" },
        { status: 400 }
      );
    }

    if (type === "getuserinfo") {
      // info.userid = sanitizeInput(info.userid);
      // const validationResult = userInfoSchema.validate({ userid: info.userid });
      // if (validationResult.error) {
      //   return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      // }
      return await getUserInfo(info.userid);
    } else if (type === "getuserposts") {
      // info.userId = sanitizeInput(info.userId);
      // const validationResult = userPostsSchema.validate({ userId: info.userId });
      // if (validationResult.error) {
      //   return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      // }
      return await getUserPosts(info.userId);
    } else if (type === "getuserplants") {
      // info.userId = sanitizeInput(info.userId);
      // const validationResult = userPostsSchema.validate({ userId: info.userId });
      // if (validationResult.error) {
      //   return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      // }
      return await getUserPlants(info.userId);
    } else if (type === "getplantposts") {
      // New case for getting posts by plant ID
      // info.plantId = sanitizeInput(info.plantId);
      // const validationResult = userPostsSchema.validate({ userId: info.plantId }); // Use a specific schema if available
      // if (validationResult.error) {
      //   return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      // }
      return await getPlantPosts(info.plantId);
    } else if (type === "login") {
      // info.email = sanitizeInput(info.email);
      // const validationResult = loginSchema.validate(info);
      // if (validationResult.error) {
      //   return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      // }
      console.log("Login attempt for:", info.email);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: "Invalid request type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
