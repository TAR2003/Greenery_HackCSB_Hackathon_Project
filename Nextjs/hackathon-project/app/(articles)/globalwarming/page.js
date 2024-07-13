import { getname } from "@/app/functions";
import React from "react";

async function f() {
    return await getname();
}

const globalwarming = () => {

    return (
        <>
            <div className="bg-red-600">
                <p className="font-extrabold bg-red-500 ">globalwarming ans {getname()}</p>
            </div>
        </>
    );
};

export default globalwarming;
