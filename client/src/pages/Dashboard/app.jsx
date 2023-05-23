import React from "react";
const Debug = true;

export default function app() {
  return (
    <>
      <ButtonLogout />
    </>
  );
}

function ButtonLogout() {
  return (
    <>
      {Debug && (
        <button
          onClick={() => localStorage.removeItem("token")}
          className="bg-green-600 text-white text-2xl px-5 py-5 rounded-full shadow"
        >
          Logout
        </button>
      )}
    </>
  );
}
