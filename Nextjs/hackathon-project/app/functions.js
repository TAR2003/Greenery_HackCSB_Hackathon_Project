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
  console.log("find uid " + uid);
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getuserinfo",
        userid: uid,
      }),
    });
    const newData = await response.json();
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
  console.log("find uid " + uid);
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
  console.log("find uid " + uid);
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
    console.log(newData);
    //console.log("We are done in the funcrion js   === ");
    return newData;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}
