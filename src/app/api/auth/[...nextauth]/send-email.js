import { sendEmail } from '../../utils/mailersend';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { to, subject, text, html } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await sendEmail({ to, subject, text, html });
        res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
