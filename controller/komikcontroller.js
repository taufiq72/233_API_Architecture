const { Komik } = require('../models');

// GET all komik
async function getAllKomik(req, res) {
    try {
        const komik = await Komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// GET komik by ID
async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik by ID:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// CREATE new komik
async function createKomik(req, res) {
    const { title, description, author } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newKomik = await Komik.create({ title, description, author });
        res.status(201).json(newKomik);
    } catch (err) {
        console.error('Error creating komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// UPDATE komik
async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;

    try {
        const komik = await Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }

        await komik.update({
            title: title ?? komik.title,
            description: description ?? komik.description,
            author: author ?? komik.author
        });

        res.status(200).json(komik);
    } catch (err) {
        console.error('Error updating komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// DELETE komik
async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }

        await komik.destroy();
        res.status(200).json({ message: 'Komik deleted successfully' });
    } catch (err) {
        console.error('Error deleting komik:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};