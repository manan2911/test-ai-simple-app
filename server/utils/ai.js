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
