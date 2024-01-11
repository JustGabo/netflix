import React from "react";

const page = () => {
  return (
    <div>
      <h2>Confirm your signup</h2>

      <p>Follow this link to confirm your user:</p>
      <p>
        <a href="{{ .ConfirmationURL }}">Confirm your mail</a>
      </p>
    </div>
  );
};

export default page;
