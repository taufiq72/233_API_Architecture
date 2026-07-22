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

async function updatekomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'komik not found' });
        }
        await komik.update({ title, description, author });
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error updating komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deletekomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'komik not found' });
        }
        await komik.destroy();
        res.status(204).send();
    }
    catch (err) {
        console.error('Error deleting komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllkomik,
    getkomikById,
    createkomik,
    updatekomik,
    deletekomik
};