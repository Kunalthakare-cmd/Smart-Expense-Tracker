// // utils/getFinancialAdvice.js
// import OpenAI from "openai";

// // Initialize the OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// // Function to fetch user-specific data (mocked for this example)

// // Function to generate personalized financial advice
// const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
//   console.log(totalBudget, totalIncome, totalSpend);
//   try {
//     const userPrompt = `
//       Based on the following financial data:
//       - Total Budget: ${totalBudget} USD 
//       - Expenses: ${totalSpend} USD 
//       - Incomes: ${totalIncome} USD
//       Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
//     `;

//     // Send the prompt to the OpenAI API
//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: userPrompt }],
//     });

//     // Process and return the response
//     const advice = chatCompletion.choices[0].message.content;

//     console.log(advice);
//     return advice;
//   } catch (error) {
//     console.error("Error fetching financial advice:", error);
//     return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
//   }
// };

// export default getFinancialAdvice;

// utils/getFinancialAdvice.js
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);
  try {
    const userPrompt = `
      Analyze the user's financial health based on the data below:
      - Total Budget: ${totalBudget} INR
      - Total Income: ${totalIncome} INR
      - Total Expenses: ${totalSpend} INR

      Provide a financial summary and advice in 3-5 bullet points that:
      1. Highlights savings potential (income - expenses),
      2. Suggests ways to optimize budget allocation or reduce unnecessary expenses,
      3. Recommends investment or emergency fund tips,
      4. Reflects mindful spending based on categories like travel, food, decor, etc.
      Return only the bullet points as a JSON array of strings.
    `;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userPrompt }],
    });

    // Parse OpenAI response as JSON array (ensure model returns JSON)
    const advice = JSON.parse(chatCompletion.choices[0].message.content.trim());
    console.log(advice);
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);

    // Fallback: Return point-wise dummy advice as array
    return [
      `Your income exceeds your expenses by ₹${totalIncome - totalSpend}, which gives you good saving potential.`,
      "Consider saving at least 20% of your monthly income into an emergency or medical fund.",
      "Reduce discretionary spending on fast food and non-essential home decor.",
      "Reallocate part of your 'World Tour' budget to more immediate needs if it's not urgent.",
      "Invest surplus funds in short-term FDs or low-risk mutual funds to grow your savings steadily."
    ];
  }
};

export default getFinancialAdvice;
