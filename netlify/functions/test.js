exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ 
            message: 'Function works!',
            method: event.httpMethod,
            envKeys: {
                assistant: !!process.env.OPENROUTER_API_KEY,
                translator: !!process.env.OPENROUTER_TRANSLATOR_KEY
            }
        })
    };
};
