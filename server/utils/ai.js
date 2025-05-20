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
