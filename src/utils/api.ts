// const BASE_URL = "https://localhost:44331/api"; // Change to match your API URL

// export async function fetchClasses() {
//   const res = await fetch(`${BASE_URL}/Classes`);
//   return res.json();
// }

// export async function addClass(className: string) {
//   const res = await fetch(`${BASE_URL}/Classes`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ className }),
//   });
//   return res.json();
// }

// src/utils/api.ts
export const addClass = async (classData: any) => {
  try {
      const response = await fetch("https://localhost:44331/api/Classes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(classData),
      });

      if (response.ok) {
          return await response.json();
      } else {
          throw new Error("Failed to add class");
      }
  } catch (error) {
      console.error("Error in addClass:", error);
  }
};
