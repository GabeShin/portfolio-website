import Image from "next/image";
import * as React from "react";

export default function Profile() {
  return (
    <div className="pr-6 pl-6">
      <div className="flex items-center space-x-4 -mt-4 mb-3">
        {/* Profile Picture */}
        <div>
          <Image
            className="w-20 h-20 min-w-fit min-h-full rounded-full object-cover border-4 border-white"
            src="/profile-picture-small.jpeg"
            alt="Profile"
          />
        </div>
        {/* Profile Information */}
        <div className=" pl-4 mt-6 align-top">
          <h1 className="text-2xl font-semibold pb-1 pt-1">ImGabeShin</h1>
          <p className=" text-sm text-gray-600">r/web-developer</p>
        </div>
      </div>
    </div>
  );
}
