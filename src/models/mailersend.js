import axios from 'axios';

const BASE_URL = 'https://api.mailersend.com/v1';

export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/email`,
            {
                from: 'your_email@example.com', // Replace with a valid sender email
                to: [to],
                subject,
                text,   // Plain text content
                html,   // HTML content (optional)
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('MailerSend API Error:', error.response.data || error.message);
        throw error;
    }
};
