const db = require('../models');

async function getAllkomik(req, res) {
    try {
        const komik = await db.komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getkomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik by ID:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createkomik(req, res) {
    const { title, description, author } = req.body;
    try {
        const newkomik = await db.komik.create({ title, description, author });
        res.status(201).json(newkomik);
    } catch (err) {
        console.error('Error creating komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
