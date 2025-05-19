import mineflayer from "mineflayer";

// Bot configuration
const botArgs = {
    host: 'mc.example.net',
    version: '1.20.4',
    port: 25565 // Default port
};

// Bot class
class MCBot {
    constructor(username) {
        this.username = username;
        this.bot = mineflayer.createBot({
            username: this.username,
            host: botArgs.host,
            port: botArgs.port,
            version: botArgs.version,
            auth: "offline" // Offline mode
        });

        this.initEvents();
    }

    log(message, color = '\x1b[0m') {
        console.log(`${color}[${this.username}] ${message}\x1b[0m`);
    }

    initEvents() {
        this.bot.on('login', () => {
            this.log(`Logged in successfully`, '\x1b[32m'); // Green
        });

        this.bot.on('end', (reason) => {
            this.log(`Disconnected: ${reason}`, '\x1b[31m'); // Red
        });

        this.bot.on('spawn', () => {
            this.log(`Spawned in`, '\x1b[34m'); // Blue

            setTimeout(() => {
                this.bot.chat("/register aaaaa aaaaa");
            }, 1000); // 1000 ms = 1 seconde
        });


        this.bot.on('error', (err) => {
            this.log(`Error: ${err}`);
        });
    }
}

// Generate random username
function generateRandomUsername() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return 'Bot_' + Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

// Create bots every 3 seconds
setInterval(() => {
    const username = generateRandomUsername();
    new MCBot(username);
}, 2000);
