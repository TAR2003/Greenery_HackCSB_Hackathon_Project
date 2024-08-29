// Import necessary functions
import axios from "axios";
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
import { sanitizeInput } from "./sanitization";
import { getUserAnswers } from "./getUserAnswers";
import { insertHarvest } from "./insertNewHarvest";
import { insertNewPost } from "./insertNewPost";
import { insertCommentInPost } from "./insertCommentInPost";
import { insertCommentInHarvest } from "./insertCommentInHarvest";
import { getPostComments } from "./getPostComments";
import { getChatParticipants } from "./getChatParticipants";
import { getUserChats } from "./getUserChats";
import { getReactStatePost } from "./getReactStatePost";
import { getUserLocation } from "./getUserLocation";
import { recommendPlants } from "./recommendPlants";
import { fetchAllPlantScientificNames } from "./fetchPlantData";
import { fetchPlantScientificNamesByPage } from "./fetchPlantData";
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
  newHarvestSchema,
  newPostSchema,
  newCommentInPostSchema,
  newCommentInHarvestSchema,
  getUserChatsSchema,
} from "./validation";
import { getHarvestComments } from "./getHarvestComments";
import { getReactState } from "./getReactStatePost";
import { getLikeNumberPost } from "./getLikeNumberPost";
import { getDislikeNumberPost } from "./getDislikeNumberPost";
import { addReactPost } from "./addReactPost";
import { removeReactPost } from "./removeReactPost";
import { submitQuestion } from "./addForumQuestion";
import { getForumInfo } from "./forumInfo";
import { submitAnswer } from "./addForumAnswer";
import { getAnswers } from "./getAnswer";
import { getDistrict } from "./getDistrict";

//added image handling functionality
import cloudinary from "cloudinary";
import message from "../(after-sign-in)/message/page";
import { insertPlant } from "./insertPlant";
import { insertUserXPlant, insertUserXPlant2 } from "./insertUserXPlant";
import {
  getAllPlantNames,
  getPlantName,
  getPlantNamesStartingWith,
} from "./getPlantNames";
import { findPlant } from "./findPlant";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// ended image handling functionality

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChangeProfile } from "./ChangeProfile";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Define the POST function
export async function POST(request) {
  try {
    const info = await request.json();
    const type = info.type;

    // console.log("Received type:", type);

    if (!type) {
      return NextResponse.json(
        { message: "Type is required" },
        { status: 400 }
      );
    }

    if (type === "getuserinfo") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userInfoSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }

      return await getUserInfo(info.userId);
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
    } else if (type === "getAllPlantNames") {
      return await getAllPlantNames();
    } else if (type === "getPlantNamesStartingWith") {
      info.plantName = sanitizeInput(info.plantName);
      return await getPlantNamesStartingWith(info.plantName);
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
    } else if (type === "getPlantName") {
      info.plantId = sanitizeInput(info.plantId);
      return await getPlantName(info.plantId);
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
      const answers = await getUserAnswers(info.userId);
      return answers; // Send the reaction or null
    } else if (type === "newharvest") {
      info.userId = sanitizeInput(info.userId);
      info.plantId = sanitizeInput(info.plantId);
      info.text = sanitizeInput(info.text);
      insertUserXPlant2(info.userId, info.plantId);
      const image = info.image;
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "default" }, // Specify the folder or use 'default'
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return resolve(
                NextResponse.json(
                  { error: "Error uploading to Cloudinary" },
                  { status: 500 }
                )
              );
            }
            const validationResult = newHarvestSchema.validate({
              userId: info.userId,
              plantId: info.plantId,
              image: result.secure_url,
              text: info.text,
            });
            if (validationResult.error) {
              return resolve(
                NextResponse.json(
                  { message: validationResult.error.details[0].message },
                  { status: 400 }
                )
              );
            }
            insertHarvest(
              info.userId,
              info.plantId,
              result.secure_url,
              info.text
            );
            return resolve(
              NextResponse.json(
                { message: "Post inserted successfully" },
                { status: 200 }
              )
            );
          }
        );

        // Convert base64 to buffer and upload
        const buffer = Buffer.from(image, "base64");
        uploadStream.end(buffer);
      });
    } else if (type === "newpost") {
      info.userId = sanitizeInput(info.userId);
      info.plantId = sanitizeInput(info.plantId);
      info.text = sanitizeInput(info.text);
      //console.log("input text " + info.text);
      //info.image = sanitizeInput(info.image);
      info.advice_or_plantation = sanitizeInput(info.advice_or_plantation);
      if (info.advice_or_plantation === "plantation") {
        // console.log("in the conditional of post");
        insertUserXPlant(info.userId, info.plantId);
      }
      console.log("after use x lant happened");
      const image = info.image; // Parse the JSON request body
      if (!image) {
        return NextResponse.json(
          { error: "No image data provided" },
          { status: 400 }
        );
      }

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "default" }, // Specify the folder or use 'default'
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return resolve(
                NextResponse.json(
                  { error: "Error uploading to Cloudinary" },
                  { status: 500 }
                )
              );
            }
            const validationResult = newPostSchema.validate({
              userId: info.userId,
              plantId: info.plantId,
              text: info.text,
              image: result.secure_url,
              advice_or_plantation: info.advice_or_plantation,
            });
            if (validationResult.error) {
              return resolve(
                NextResponse.json(
                  { message: validationResult.error.details[0].message },
                  { status: 400 }
                )
              );
            }
            insertNewPost(
              info.userId,
              info.plantId,
              info.text,
              result.secure_url,
              info.advice_or_plantation
            );
            return resolve(
              NextResponse.json(
                { message: "Post inserted successfully" },
                { status: 200 }
              )
            );
          }
        );

        // Convert base64 to buffer and upload
        const buffer = Buffer.from(image, "base64");
        uploadStream.end(buffer);
      });
    } else if (type === "newcommentinpost") {
      info.userId = sanitizeInput(info.userId);
      info.postId = sanitizeInput(info.postId);
      // console.log(info.text + " comment---");
      info.text = sanitizeInput(info.text);
      info.image = sanitizeInput(info.image);
      //console.log(info.text + " comment---");
      const validationResult = newCommentInPostSchema.validate({
        userId: info.userId,
        postId: info.postId,
        text: info.text,
        image: info.image,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      await insertCommentInPost(
        info.userId,
        info.postId,
        info.text,
        info.image
      );
      return NextResponse.json(
        { message: "Comment inserted successfully" },
        { status: 200 }
      );
    } else if (type === "newcommentinharvest") {
      info.userId = sanitizeInput(info.userId);
      info.harvestId = sanitizeInput(info.harvestId);
      info.text = sanitizeInput(info.text);
      info.image = sanitizeInput(info.image);
      const validationResult = newCommentInHarvestSchema.validate({
        userId: info.userId,
        harvestId: info.harvestId,
        text: info.text,
        image: info.image,
      });
      //console.log(JSON.stringify(info) + " is the info");
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      await insertCommentInHarvest(
        info.harvestId,
        info.userId,
        info.text,
        info.image
      );
      return NextResponse.json(
        { message: "Comment inserted successfully" },
        { status: 200 }
      );
    } else if (type === "getchatparticipants") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userInfoSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }

      return await getChatParticipants(info.userId);
    } else if (type === "getuserchats") {
      info.userId = sanitizeInput(info.userId);
      info.otherUserId = sanitizeInput(info.otherUserId);
      const validationResult = getUserChatsSchema.validate({
        userId: info.userId,
        otherUserId: info.otherUserId,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }

      return await getUserChats(info.userId, info.otherUserId);
    } else if (type === "ChangeProfile") {
      info.userId = sanitizeInput(info.userId);

      const image = info.image; // Parse the JSON request body
      if (!image) {
        return NextResponse.json(
          { error: "No image data provided" },
          { status: 400 }
        );
      }

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "default" }, // Specify the folder or use 'default'
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return resolve(
                NextResponse.json(
                  { error: "Error uploading to Cloudinary" },
                  { status: 500 }
                )
              );
            }
            //console.log("Successgful " + result.secure_url);
            ChangeProfile(info.userId, result.secure_url);
            return resolve(
              NextResponse.json(
                { message: "Image changed successfully" },
                { status: 200 }
              )
            );
          }
        );

        // Convert base64 to buffer and upload
        const buffer = Buffer.from(image, "base64");
        uploadStream.end(buffer);
      });
    } else if (type === "recommendplants") {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userInfoSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }

      // Fetch user location and then recommend plants
      const location = await getUserLocation(info.userId);
      if (!location) {
        return NextResponse.json(
          { message: "Unable to determine user location" },
          { status: 404 }
        );
      }
      const recommendations = await recommendPlants(location);
      return NextResponse.json(recommendations, { status: 200 });
    } else if (type === "getPlant") {
      const trefleToken = process.env.TREFLE_API_KEY;
      const zoneCode = "BAN"; // WGSRPD code for Bangladesh

      console.log("Fetching species data for Bangladesh...");

      try {
        // Ensure the token is available
        if (!trefleToken) {
          throw new Error("Trefle API token is not set");
        }

        const response = await axios.get(
          `https://trefle.io/api/v1/distributions/${zoneCode}/plants`,
          {
            headers: {
              Authorization: `Bearer ${trefleToken}`,
            },
          }
        );

        // Return the response data to the client
        console.log(response.data);
        return NextResponse.json(response.data, { status: 200 });
      } catch (error) {
        console.error("Error fetching species:", error.message);

        // Return the error to the client
        return NextResponse.json(
          { error: "Failed to fetch species data", message: error.message },
          { status: 500 }
        );
      }
    } else if (type === "getallplants") {
      const page = info.page || 1; // Default to page 1 if no page is provided
      const {
        scientificNames,
        plantDetailsFromWikipedia,
        currentPage,
        totalPages,
      } = await fetchPlantScientificNamesByPage(page);

      console.log(`Fetched page ${currentPage} of plant scientific names`);
      //console.log(scientificNames);
      //console.log(`Total pages: ${totalPages}`);

      return NextResponse.json(
        {
          scientificNames,
          plantDetailsFromWikipedia,
          currentPage,
          totalPages,
        },
        { status: 200 }
      );
    } else if (type === "chat-ai") {
      const { prompt } = info;

      if (!prompt) {
        return NextResponse.json(
          { message: "Prompt is required" },
          { status: 400 }
        );
      }

      // Generate content using the Gemini API
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        return NextResponse.json({ text });
      } catch (error) {
        return NextResponse.json(
          { message: "Error generating content" },
          { status: 500 }
        );
      }
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
    } else if (type === "insertPlant") {
      info.name = sanitizeInput(info.name);
      return await insertPlant(info.name);
    } else if (type === "findPlant") {
      info.plantName = sanitizeInput(info.plantName);
      return await findPlant(info.plantName);
    } else if (type === "getPostComments") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);

      return await getPostComments(info.postId);
    } else if (type === "getHarvestComments") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);

      return await getHarvestComments(info.postId);
    } else if (type === "getReactStatePost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.userId = sanitizeInput(info.userId);
      info.kindof = sanitizeInput(info.kindof);

      return await getReactStatePost(info.userId, info.postId, info.kindof);
    } else if (type === "getLikeNumberPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.kindof = sanitizeInput(info.kindof);

      return await getLikeNumberPost(info.postId, info.kindof);
    } else if (type === "getDislikeNumberPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.kindof = sanitizeInput(info.kindof);

      return await getDislikeNumberPost(info.postId, info.kindof);
    } else if (type === "addReactPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.userId = sanitizeInput(info.userId);
      info.react = sanitizeInput(info.react);
      info.kindof = sanitizeInput(info.kindof);

      return await addReactPost(
        info.userId,
        info.postId,
        info.react,
        info.kindof
      );
    } else if (type === "removeReactPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.userId = sanitizeInput(info.userId);
      info.kindof = sanitizeInput(info.kindof);

      return await removeReactPost(info.userId, info.postId, info.kindof);
    } else if (type === "addQuestion") {
      info.userid = sanitizeInput(info.userid);
      info.question = sanitizeInput(info.question);

      return await submitQuestion(info.userid, info.question);
    } else if (type === "getForumInfo") {
      info.searchedText = sanitizeInput(info.searchedText);
      info.order = sanitizeInput(info.order);
      info.ownPosts = sanitizeInput(info.ownPosts);
      info.userid = sanitizeInput(info.userid);

      return await getForumInfo(
        info.userid,
        info.searchedText,
        info.order,
        info.ownPosts
      );
    } else if (type === "submitAnswer") {
      info.userid = sanitizeInput(info.userid);
      info.answer = sanitizeInput(info.answer);
      info.qid = sanitizeInput(info.qid);

      return await submitAnswer(info.userid, info.answer, info.qid);
    } else if (type === "getAnswers") {
      info.qid = sanitizeInput(info.qid);

      return await getAnswers(info.qid);
    } else if (type === "getDistrict") {
      info.userid = sanitizeInput(info.userid);

      return await getDistrict(info.userid);
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
