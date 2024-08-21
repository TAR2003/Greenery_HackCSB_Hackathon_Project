// Import necessary functions

import { getId } from "./getLoginId";
import { insertInfo } from "./signupInfo";
import { NextResponse } from "next/server";
import { getUserInfo } from "./getUserInfo";
import { searchUsersByPrefix } from "./searchUsersByPrefix";
import { getUserPosts } from "./getUserPosts";
import { getUserPlants } from "./getUserPlants";
import { getTotalNoOfPlants } from "./getUserPlants";
import { getPlantPosts } from "./getPlantPosts";
import { getHarvestByUser } from "./getUserHarvests";
import { getPlantHarvests } from "./getPlantHarvests";
import { getUserQuestions } from "./getUserQuestions";
import { getQuestionsByPlantName } from "./getQuestionsByPlantName"; // Import the new function
import { getReactionNumber } from "./getReactNumber"; // Import the new function
import { getUserReaction } from "./getUserReaction";
import { getAllCommunityPosts } from "./getAllCommunityPosts";
import { getAllHarvestPosts } from "./getAllHarvestPosts";
import {
  userInfoSchema,
  loginSchema,
  userPostsSchema,
  plantPostsSchema,
  harvestSchema,
  plantHarvestsSchema,
  userQuestionsSchema,
  plantNameSchema,
  reactionsSchema,
  userReactSchema,
  userAnswerSchema,
  searchUserByPrefixSchema,
} from "./validation";
import { sanitizeInput } from "./sanitization";
import { getUserAnswers } from "./getUserAnswers";

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
      info.userid = sanitizeInput(info.userid);
      const validationResult = userInfoSchema.validate({ userid: info.userid });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getUserInfo(info.userid);
    } else if (type === "searchusersbyprefix") {
      info.prefix = sanitizeInput(info.prefix);
      const validationResult = searchUserByPrefixSchema.validate({
        prefix: info.prefix,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await searchUsersByPrefix(info.prefix);
    } else if (type === "getuserposts") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userPostsSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getUserPosts(info.userId);
    } else if (type === "getuserplants") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userPostsSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getUserPlants(info.userId);
    } else if (type === "getAllCommunityPosts") {
      return await getAllCommunityPosts();
    } else if (type === "getAllHarvestPosts") {
      return await getAllHarvestPosts();
    } else if (type === "getplantposts") {
      info.userId = sanitizeInput(info.userId);
      console.log(info.userId);
      const validationResult = plantPostsSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getPlantPosts(info.userId);
    } else if (type === "gettotalnoofplants") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userPostsSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getTotalNoOfPlants(info.userId);
    } else if (type === "getuserharvests") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = harvestSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getHarvestByUser(info.userId);
    } else if (type === "getplantharvests") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = plantHarvestsSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getPlantHarvests(info.userId);
    } else if (type === "getuserquestions") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userQuestionsSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getUserQuestions(info.userId);
    } else if (type === "getquestionsbyplantname") {
      info.plantName = sanitizeInput(info.plantName);
      const validationResult = plantNameSchema.validate({
        plantName: info.plantName,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getQuestionsByPlantName(info.plantName);
    } else if (type === "getreactionnumber") {
      // New case for getting reaction number
      info.answerId = sanitizeInput(info.answerId);
      const validationResult = reactionsSchema.validate({
        answerId: info.answerId,
      }); // Adjust as necessary
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      return await getReactionNumber(info.answerId);
    } else if (type === "getuserreaction") {
      // New case for getting user reaction
      info.answerId = sanitizeInput(info.answerId);
      info.userId = sanitizeInput(info.userId);
      const validationResult = userReactSchema.validate({
        answerId: info.answerId,
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      const reaction = await getUserReaction(info.answerId, info.userId);
      return reaction; // Send the reaction or null
    } else if (type === "getuseranswers") {
      // New case for getting user reaction
      info.userId = sanitizeInput(info.userId);
      const validationResult = userAnswerSchema.validate({
        userId: info.userId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      const reaction = await getUserAnswers(info.userId);
      return reaction; // Send the reaction or null
    } else if (type === "login") {
      info.email = sanitizeInput(info.email);
      info.password = sanitizeInput(info.password);

      const validationResult = loginSchema.validate(info);
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      console.log("Login attempt for:", info.email);

      return await getId(info.email, info.password);
    } else if (type === "signup") {
      info.email = sanitizeInput(info.email);
      info.password = sanitizeInput(info.password);
      info.name = sanitizeInput(info.name);
      info.location = sanitizeInput(info.location);

      return await insertInfo(
        info.email,
        info.password,
        info.name,
        info.location
      );
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
