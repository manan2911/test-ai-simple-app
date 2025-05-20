const axios = require("axios");

const OPENAI_API_KEY = "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";

async function getAIResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Response Error:", error.response?.data || error.message);
    return "Sorry, I am currently unable to respond. Please try again later.";
  }
}

module.exports = getAIResponse;
