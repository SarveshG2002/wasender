const venom = require('venom-bot');

const sessions = {};

const startSession = async (sessionId, res) => {
    try {
        const client = await venom.create(
            sessionId,
            (base64Qr, asciiQR) => {
                // Send base64 QR to frontend
                if (res && !res.headersSent) {
                    res.json({
                        success: true,
                        qr: base64Qr
                    });
                }
            },
            undefined,
            { headless: true }
        );

        sessions[sessionId] = client;

        client.onMessage(message => {
            console.log('Received message:', message.body);
            // You can save message or handle reply
        });

        return client;
    } catch (err) {
        console.error('Failed to start session', err);
        if (res && !res.headersSent) {
            res.json({ success: false, message: "Error creating session" });
        }
    }
};

const getSession = (sessionId) => sessions[sessionId];

module.exports = { startSession, getSession };
