"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectComponent = () => {
  const router = useRouter();

  useEffect(() => {
    // Cookies.set("userid", "1");
    router.push(`/profile/${Cookies.get("userid")}`);
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectComponent;
