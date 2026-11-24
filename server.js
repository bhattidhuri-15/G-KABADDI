const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Default Match Data with Aggressive Transitions, Captain & Player Photos, Left Scoreboard, & Punjabi/Scrolling Team Names
let matchState = {
    groundName: "SHAHEED BHAGAT SINGH STADIUM",
    tournamentName: "GRAND CIRCLE KABADDI CUP 2026",
    teamA: "ROYAL LIONS",
    teamAPunjabi: "ਰਾਇਲ ਲਾਇਨਜ਼",
    teamALogo: "",
    captainA: "Harpreet Gill (C)",
    captainAPhoto: "",
    teamB: "SHER-E-PUNJAB",
    teamBPunjabi: "ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ",
    teamBLogo: "",
    captainB: "Pala Jalalpur (C)",
    captainBPhoto: "",
    scoreA: 0,
    scoreB: 0,
    half: "1ST HALF",
    playersA: [
        "1. Harpreet Gill (C/R) | ",
        "2. Maninder Bains (R) | ",
        "3. Sandeep Nangal (S) | ",
        "4. Kuldeep Dhaliwal (S) | ",
        "5. Harjit Bajwa (R) | ",
        "6. Sukha Sandhu (S) | ",
        "7. Binder Grewal (R) | ",
        "8. Jassa Virk (S) | "
    ],
    playersB: [
        "1. Pala Jalalpur (C/S) | ",
        "2. Sultan Rai (R) | ",
        "3. Khushi Duggan (S) | ",
        "4. Dulla Bagga (R) | ",
        "5. Faryad Gill (S) | ",
        "6. Buriya Lehra (R) | ",
        "7. Manggi Moga (S) | ",
        "8. Makhan Sekhon (R) | "
    ],
    activeView: "score",
    showTicker: true,
    tickerBadge: "LIVE KABADDI",
    tickerText: "GRAND CIRCLE KABADDI CUP 2026 • LIVE FROM SHAHEED BHAGAT SINGH STADIUM • ਰਾਇਲ ਲਾਇਨਜ਼ VS ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ • BEST RAIDER & BEST STOPPER AWARDS",
    showSponsors: true,
    sponsorInterval: 6,
    sponsors: [
        { name: "KHALSA MOTORS", logo: "" },
        { name: "PUNJAB AGRO FEEDS", logo: "" },
        { name: "ROYAL SPORTS ACADEMY", logo: "" }
    ]
};

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/overlay', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'overlay.html'));
});

app.get('/', (req, res) => {
    res.redirect('/admin');
});

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
