const mineflayer = require('mineflayer')

// Récupérer les arguments (exclure les 2 premiers)
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Utilisation : node index.js [server-ip] [server port] [pseudo]");
    process.exit(1); // Quitter avec un code d'erreur
}

const ip = args[0];
let port = args[1] || 25565;
let Username = args[2] || generateRandomString();

function generateRandomString() {
    const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Longueur entre 5 et 10
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

if (!ip) {
    console.log("Veuillez fournir l'ip du serveur Minecraft !");
    process.exit(1);
}

if (!port) {
    console.log("Le serveur va être rejoint sur le port 25565");
}

if (!Username || Username === "r") {
    console.log("Le pseudo sera aléatoire");
}

console.log(`Démarrage du bot sur le serveur ${ip} et sur le port ${port}`);

const bot = mineflayer.createBot({
    host: ip, // minecraft server ip
    username: Username, // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
    //auth: 'offline' // for offline mode servers, you can set this to 'offline'
    port: port,              // set if you need a port that isn't 25565
    //version: '1.20.4',           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
    // password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
});

bot.on('login', () => console.log(`✅ Bot ${Username} connecté !`));
bot.on('spawn', () => console.log(`🚀 ${Username} a spawn sur le serveur !`));
bot.on('error', (err) => console.log(`❌ Erreur avec ${Username} :`, err));
bot.on('end', () => console.log(`🔴 ${Username} s'est déconnecté.`));
