const axios = require("axios");

async function getAIResponse(prompt) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer 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`,
                },
            }
        );

        const aiMessage = response.data.choices[0].message.content.trim();
        return aiMessage;
    } catch (error) {

        console.log("AI Response Error:", error);
        return "Sorry, I am currently unable to respond. Please try again later.";
    }
}

// Export as default, not named export
module.exports = getAIResponse;
