import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { action } = req.query;

        if (action === 'logout') {
            res.setHeader('Set-Cookie', serialize('auth_token', '', {
                httpOnly: true,
                path: '/',
                maxAge: -1,
            }));
            return res.status(200).json({ message: 'Logged out' });
        }

        const { email, password } = req.body;
        const validUser = process.env.BASIC_AUTH_USER;
        const validPass = process.env.BASIC_AUTH_PASSWORD;

        console.log('--- Auth Debug ---');
        console.log('Input Email:', email);
        console.log('Input Password:', password ? '********' : 'missing');
        console.log('Env User:', validUser);
        console.log('Env Pass:', validPass ? '********' : 'missing');
        console.log('Email Match:', email === validUser);
        console.log('Pass Match:', password === validPass);
        console.log('------------------');

        if (email === validUser && password === validPass) {
            // Create a specific token value (can be anything, but let's make it look like a token)
            // Since middleware just checks existence or basic validation, a simple string works.
            // For better security, sign this token, but for now matching the Basic Auth level:
            const token = Buffer.from(`${email}:${password}`).toString('base64');

            res.setHeader('Set-Cookie', serialize('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            }));

            return res.status(200).json({ message: 'Authenticated' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }

    res.status(405).json({ message: 'Method not allowed' });
}
