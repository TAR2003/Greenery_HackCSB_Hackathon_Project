//mport fetch from 'node-fetch';

export async function getname() {
  console.log("We are done in the funcrion js mmm");
  return "Miraj";
}

export async function getinfo() {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuserinfo",
        userid: 1,
      }),
    });
    const newData = await response.json();
    console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getUserInfo(uid) {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuserinfo",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //  console.log("the new data  for " + uid + " is " + JSON.stringify(newData));
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}
export async function getUserPlants(uid) {
  console.log("find uid " + uid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuserplants",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getUserPosts(uid) {
  //console.log("find uid " + uid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuserposts",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getUserHarvests(uid) {
  // console.log("find uid " + uid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuserharvests",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function searchUserByPrefix(prefix) {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "searchusersbyprefix",
        prefix: prefix,
      }),
    });
    const newData = await response.json();
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getUserAnswers(uid) {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuseranswers",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //  console.log(newData);
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getAllCommunityPosts() {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getAllCommunityPosts",
      }),
    });
    const newData = await response.json();
    //  console.log(newData);
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getAllHarvestPosts() {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getAllHarvestPosts",
      }),
    });
    const newData = await response.json();
    //  console.log(newData);
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getPostComments(pId) {
  // console.log("int the fintion " + pId);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getPostComments",
        postId: pId,
      }),
    });
    const newData = await response.json();
    //console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getHarvestComments(pId) {
  // console.log("int the fintion " + pId);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getHarvestComments",
        postId: pId,
      }),
    });
    const newData = await response.json();
    //console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function insertNewCommentinPost(uid, pid, txt, img) {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "newcommentinpost",
        postId: pid,
        userId: uid,
        text: txt,
        image: img,
      }),
    });
    const newData = await response.json();
    //console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function insertNewCommentinHarvest(uid, pid, txt, img) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "newcommentinharvest",
        harvestId: pid,
        userId: uid,
        text: txt,
        image: img,
      }),
    });
    const newData = await response.json();
    //console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getReactStatePost(uid, pid, kindof) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getReactStatePost",
        postId: pid,
        userId: uid,
        kindof: kindof,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getLikeNumberPost(pid, kindof) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getLikeNumberPost",
        postId: pid,
        kindof: kindof,
      }),
    });
    const newData = await response.json();
    //console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getDislikeNumberPost(pid, kindof) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getDislikeNumberPost",
        postId: pid,
        kindof: kindof,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function addReactPost(uid, pid, react, kindof) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "addReactPost",
        postId: pid,
        userId: uid,
        react: react,
        kindof: kindof,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function removeReactPost(uid, pid, kindof) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "removeReactPost",
        postId: pid,
        userId: uid,
        kindof: kindof,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getPlantInfo(plantName) {
  try {
    const response = await fetch("/api/plantinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plantName }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error posting data " + err);
  }
}

export async function getPlantPosts(uid) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getplantposts",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getPlantHarvests(uid) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getplantharvests",
        userId: uid,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function insertPlant(name) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "insertPlant",
        name: name,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getTotalNoOfPlants(uId) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "gettotalnoofplants",
        userId: uId,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getAllPlantNames() {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getAllPlantNames",
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getPlantNamesStartingWith(name) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getPlantNamesStartingWith",
        plantName: name,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function findPlant(name) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "findPlant",
        plantName: name,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function getPlantName(pid) {
  //console.log(uid, pid, text, image);
  // console.log("in harvest functin " + pid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getPlantName",
        plantId: pid,
      }),
    });
    const newData = await response.json();
    //  console.log(JSON.stringify(newData) + "got back");
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}


export function timeAgo(timestamp) {
  // Convert the timestamp to a Date object
  const originalDate = new Date(timestamp);

  // Adjust for Bangladesh Time (UTC+6)
  const bangladeshOffset = 6 * 60; // 6 hours in minutes
  const localTime = new Date(
    originalDate.getTime() + bangladeshOffset * 60 * 1000
  );

  // Calculate the difference between now and the adjusted timestamp
  const now = new Date();
  const diff = Math.floor((now - localTime) / 1000); // difference in seconds

  const units = [
    { label: "year", seconds: 31536000 }, // 60 * 60 * 24 * 365
    { label: "month", seconds: 2592000 }, // 60 * 60 * 24 * 30
    { label: "week", seconds: 604800 }, // 60 * 60 * 24 * 7
    { label: "day", seconds: 86400 }, // 60 * 60 * 24
    { label: "hour", seconds: 3600 }, // 60 * 60
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let unit of units) {
    const interval = Math.floor(diff / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now"; // in case the difference is less than a second
}
