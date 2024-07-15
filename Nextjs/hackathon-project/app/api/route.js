// Import necessary functions
import { NextResponse } from 'next/server';
import { getUserInfo } from './getUserInfo';
import { getUserPosts } from './getUserPosts';
import { getUserPlants } from './getUserPlants';
import { getPlantPosts } from './getPlantPosts';
import { getHarvestByUser } from './getUserHarvests'; // Import the new function
import { getPlantHarvests } from './getPlantHarvests';
import { userInfoSchema, userNameSchema, loginSchema, userPostsSchema, plantPostsSchema, harvestSchema, plantHarvestsSchema } from './validation';
import { sanitizeInput } from './sanitization';

// Define the POST function
export async function POST(request) {
  try {
    const info = await request.json();
    const type = info.type;

    if (!type) {
      return NextResponse.json({ message: 'Type is required' }, { status: 400 });
    }

    if (type === 'getuserinfo') {
      info.userid = sanitizeInput(info.userid);
      const validationResult = userInfoSchema.validate({ userid: info.userid });
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      return await getUserInfo(info.userid);
    } else if (type === 'getuserposts') {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userPostsSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      return await getUserPosts(info.userId);
    } else if (type === 'getuserplants') {
      info.userId = sanitizeInput(info.userId);
      const validationResult = userPostsSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      return await getUserPlants(info.userId);
    } else if (type === 'getplantposts') {
      info.userId = sanitizeInput(info.userId);
      const validationResult = plantPostsSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      return await getPlantPosts(info.userId);
    } else if (type === 'getuserharvests') { // New case for getting harvests by user ID
      info.userId = sanitizeInput(info.userId);
      const validationResult = harvestSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      return await getHarvestByUser(info.userId);
    }  else if (type === 'getplantharvests') {
      info.userId = sanitizeInput(info.userId);
      const validationResult = plantHarvestsSchema.validate({ userId: info.userId });
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      return await getPlantHarvests(info.userId);
    }else if (type === 'login') {
      info.email = sanitizeInput(info.email);
      info.password = sanitizeInput(info.password);

      const validationResult = loginSchema.validate(info);
      if (validationResult.error) {
        return NextResponse.json({ message: validationResult.error.details[0].message }, { status: 400 });
      }
      console.log('Login attempt for:', info.email);

      return await getId(info.email, info.password);

    } else {
      return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
