exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { text } = JSON.parse(event.body);
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENROUTER_TRANSLATOR_KEY}`,
                'HTTP-Referer': 'https://iusomnia.com', 
                'X-Title': 'Traductor Legal'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3.1:free',
                messages: [
                    {
                        role: "user",
                        content: `Traduce este texto legal a lenguaje coloquial y haz un resumen breve:\n\n${text}`
                    }
                ],
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
