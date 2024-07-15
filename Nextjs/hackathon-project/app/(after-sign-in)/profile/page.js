"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectComponent = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.set("userid", "masnoon");
    router.push(`/profile/1`);
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectComponent;
