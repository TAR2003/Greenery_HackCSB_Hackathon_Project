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
import { sanitizeInput } from "./sanitization";
import { getUserAnswers } from "./getUserAnswers";
import { insertHarvest } from "./insertNewHarvest";
import { insertNewPost } from "./insertNewPost";
import { insertCommentInPost } from "./insertCommentInPost";
import { insertCommentInHarvest } from "./insertCommentInHarvest";
import { getPostComments } from "./getPostComments";
import { getReactStatePost } from "./getReactStatePost";
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
} from "./validation";
<<<<<<< Updated upstream
import { getHarvestComments } from "./getHarvestComments";
import { getReactState } from "./getReactStatePost";
import { getLikeNumberPost } from "./getLikeNumberPost";
import { getDislikeNumberPost } from "./getDislikeNumberPost";
import { addReactPost } from "./addReactPost";
import { removeReactPost } from "./removeReactPost";
=======
import { sanitizeInput } from "./sanitization";
import { getUserAnswers } from "./getUserAnswers";
import { submitQuestion } from "./addForumQuestion";
import { getForumInfo } from "./forumInfo";
import { submitAnswer } from "./addForumAnswer";
>>>>>>> Stashed changes

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
    } else if (type === "newharvest") {
      info.userId = sanitizeInput(info.userId);
      info.plantId = sanitizeInput(info.plantId);
      info.image = sanitizeInput(info.image);
      info.text = sanitizeInput(info.text);
      const validationResult = newHarvestSchema.validate({
        userId: info.userId,
        plantId: info.plantId,
        image: info.image,
        text: info.text,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      await insertHarvest(info.userId, info.plantId, info.image, info.text);
      return NextResponse.json(
        { message: "Harvest inserted successfully" },
        { status: 200 }
      );
    } else if (type === "newpost") {
      info.userId = sanitizeInput(info.userId);
      info.plantId = sanitizeInput(info.plantId);
      info.text = sanitizeInput(info.text);
      info.image = sanitizeInput(info.image);
      const validationResult = newPostSchema.validate({
        userId: info.userId,
        plantId: info.plantId,
        text: info.text,
        image: info.image,
        advice_or_plantation: info.advice_or_plantation,
      });
      if (validationResult.error) {
        return NextResponse.json(
          { message: validationResult.error.details[0].message },
          { status: 400 }
        );
      }
      await insertNewPost(
        info.userId,
        info.plantId,
        info.text,
        info.image,
        info.advice_or_plantation
      );
      return NextResponse.json(
        { message: "Post inserted successfully" },
        { status: 200 }
      );
    } else if (type === "newcommentinpost") {
      info.userId = sanitizeInput(info.userId);
      info.postId = sanitizeInput(info.postId);
      info.text = sanitizeInput(info.text);
      info.image = sanitizeInput(info.image);
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

      return await getReactStatePost(info.userId, info.postId);
    } else if (type === "getLikeNumberPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);

      return await getLikeNumberPost(info.postId);
    } else if (type === "getDislikeNumberPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);

      return await getDislikeNumberPost(info.postId);
    } else if (type === "addReactPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.userId = sanitizeInput(info.userId);
      info.react = sanitizeInput(info.react);

      return await addReactPost(info.userId, info.postId, info.react);
    } else if (type === "removeReactPost") {
      //console.log("in the meantime " + info.postId);
      info.postId = sanitizeInput(info.postId);
      info.userId = sanitizeInput(info.userId);

      return await removeReactPost(info.userId, info.postId);
    } else if (type === "addQuestion") {
      info.userid = sanitizeInput(info.userid);
      info.question = sanitizeInput(info.question);

      return await submitQuestion(info.userid, info.question);

    } else if (type === "getForumInfo") {
      info.searchedText = sanitizeInput(info.searchedText);

      return await getForumInfo(info.searchedText);

    } else if (type === "submitAnswer") {

      info.userid = sanitizeInput(info.userid);
      info.answer = sanitizeInput(info.answer);
      info.qid = sanitizeInput(info.qid);

      return await submitAnswer(info.userid, info.answer, info.qid);

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
