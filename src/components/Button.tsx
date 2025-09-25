"use client";

const Button = () => {
    
  return (
    <button
      onClick={() => {
        throw new Error("Some error");
      }}>
      Click me
    </button>
  );
};

export default Button;
