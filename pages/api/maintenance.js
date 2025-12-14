import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'maintenance-config.json');

function getConfig() {
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return { maintenanceMode: false };
    }
}

function saveConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

// Get admin password from env first, then fallback to config
function getAdminPassword() {
    return process.env.ADMIN_PASSWORD || getConfig().adminPassword || 'kbtool2024';
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        const config = getConfig();
        return res.status(200).json({ maintenanceMode: config.maintenanceMode });
    }

    if (req.method === 'POST') {
        const { password, action } = req.body;
        const adminPassword = getAdminPassword();

        // Verify admin password
        if (password !== adminPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const config = getConfig();

        // Toggle or set maintenance mode
        if (action === 'toggle') {
            config.maintenanceMode = !config.maintenanceMode;
        } else if (action === 'on') {
            config.maintenanceMode = true;
        } else if (action === 'off') {
            config.maintenanceMode = false;
        }

        saveConfig(config);
        return res.status(200).json({
            success: true,
            maintenanceMode: config.maintenanceMode
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
