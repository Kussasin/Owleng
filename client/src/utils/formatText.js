import React from "react";

export const formatText = (text, specialCharacter) => {
  if (specialCharacter === "_n") {
    return (
      <p>
        {text.split(specialCharacter).map((t, index) => (
          <span key={index}>
            {t}
            <br />
          </span>
        ))}
      </p>
    );
  } else {
    return text;
  }
};
