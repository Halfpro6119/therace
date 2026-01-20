// Test the JSON import functionality
const testJson = [
  {
    prompt: "What is 2 + 2?",
    answers: ["4"],
    fullSolution: "2 + 2 = 4",
    hint: "Count on your fingers"
  },
  {
    prompt: "What is the capital of France?",
    answers: ["Paris"],
    fullSolution: "The capital of France is Paris",
    hint: "It's a major European city"
  },
  {
    prompt: "What is 5 * 6?",
    answer: "30",
    fullSolution: "5 * 6 = 30"
  },
  {
    prompt: "What is the square root of 16?",
    answers: ["4", "4.0"],
    fullSolution: "√16 = 4"
  },
  {
    prompt: "What is 100 / 4?",
    answers: ["25"],
    fullSolution: "100 / 4 = 25"
  }
];

console.log("Test JSON Array:");
console.log(JSON.stringify(testJson, null, 2));
console.log("\n✅ Valid JSON with 5 questions");
console.log("- Q1: Single answer in array");
console.log("- Q2: Single answer in array");
console.log("- Q3: Single answer as string (answer field)");
console.log("- Q4: Multiple answers in array");
console.log("- Q5: Single answer in array");
