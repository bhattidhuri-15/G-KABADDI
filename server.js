const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Default Match Data with Ticker & Sponsors
let matchState = {
    groundName: "SHAHEED BHAGAT SINGH STADIUM",
    tournamentName: "GRAND CIRCLE KABADDI CUP 2026",
    teamA: "ROYAL LIONS",
    teamB: "SHER-E-PUNJAB",
    scoreA: 0,
    scoreB: 0,
    half: "1ST HALF",
    playersA: [
        "1. Gurpreet (R)", "2. Maninder (R)", "3. Sandeep (S)", "4. Kuldeep (S)",
        "5. Harjit (R)", "6. Sukha (S)", "7. Binder (R)", "8. Jassa (S)"
    ],
    playersB: [
        "1. Pala Jalalpur (S)", "2. Sultan (R)", "3. Khushi (S)", "4. Dulla (R)",
        "5. Faryad (S)", "6. Buriya (R)", "7. Manggi (S)", "8. Makhan (R)"
    ],
    activeView: "score", // 'none', 'ground', 'vs', 'listA', 'listB', 'score'
    showTicker: true,
    tickerBadge: "LIVE UPDATE",
    tickerText: "WELCOME TO GRAND CIRCLE KABADDI CUP 2026 • WATCH LIVE ACTION FROM SHAHEED BHAGAT SINGH STADIUM • BEST RAIDER & BEST STOPPER AWARDS BY TOURNAMENT COMMITTEE",
    showSponsors: true,
    sponsorInterval: 6, // seconds per sponsor
    sponsors: [
        { name: "KHALSA MOTORS", logo: "" },
        { name: "PUNJAB AGRO FEEDS", logo: "" },
        { name: "ROYAL SPORTS ACADEMY", logo: "" }
    ]
};

// Routes
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/overlay', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'overlay.html'));
});

app.get('/', (req, res) => {
    res.redirect('/admin');
});

// Socket.io Real-time Sync
io.on('connection', (socket) => {
    socket.emit('stateUpdate', matchState);

    socket.on('updateState', (newState) => {
        matchState = { ...matchState, ...newState };
        io.emit('stateUpdate', matchState);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
