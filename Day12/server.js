const express = require('express'); 
const server = express();
const port = 3000;

const item = [
    { ID: 1, NAME: 'PRADEEP' },
    { ID: 2, NAME: 'BOOZER' },
    { ID: 3, NAME: 'DEACON' },
    { ID: 4, NAME: 'SARVN' }
];


server.use(express.json());


server.get('/', (req, res) => {
    res.end("You're user");
});

server.get('/user', (req, res) => {
    res.end("You're User");
});


server.get('/PRO', (req, res) => {
    res.json(item);
});


server.post('/PRO', (req, res) => {
    const newitem = { ID: item.length + 1, NAME: req.body.NAME }; 
    item.push(newitem); 
    res.status(201).json(newitem);
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
