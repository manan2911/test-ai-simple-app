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
