const axios = require("axios");

const OPENAI_API_KEY = "sk-ZYIKym8q0YSl4X9JIJ63Il2-83N2nGuuW075WrqBOsT3BlbkFJq11TEYaeJR8XUFwPD5DqRgS3VU4V-QtGb2tX0Y0acA";

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
