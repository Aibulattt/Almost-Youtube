const {Router} = require('express');
const config = require('config');
const FavQuery = require('../models/FavQuery');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const router = Router();

router.post('/request', auth, async (req, res) => {
    try {
        const {query, order, maxResults} = req.body;

        const favQuery = new FavQuery({query: query, order:order, maxResults:maxResults, owner: req.user.userId})
        await favQuery.save()

        res.status(201).json({favQuery})
        
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const queryParams = await FavQuery.find({owner: req.user.userId})
        res.json(queryParams)
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/remove', auth, async (req, res) => {
    try {
        const favQuery = await FavQuery.deleteOne({'_id': req.body.id})
        res.json(favQuery)
        
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;