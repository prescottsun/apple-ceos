const express = require('express'),
    router = express.Router(),
    ExecutiveModel = require('../models/ceoModel');

router.get('/', async function(req, res, next) {
    const executiveData = await ExecutiveModel.getAll();
    // console.log('executive data', executiveData);
    res.render('template', {
        locals: {
            title: "Apple CEOs page",
            data: executiveData
        },
        partials: {
            partial: "partial-ceos"
        }
    });
});

router.post('/add', async (req, res) => {
    const { ceo_name, ceo_year } = req.body;
// shorthand equivalent to
    // const ceo_name = req.body.ceo_name;
    // const ceo_year = req.body.ceo_year;

    const executiveInstance = new ExecutiveModel(ceo_name, ceo_year);
    const executive = await executiveInstance.addNewCeo();

    if (executive.rowCount !== 1) {
        res.sendStatus(500);
    } else {
        res.redirect('/ceos');
    }
    console.log('executive: ', executive);
    res.redirect('/');

})

module.exports = router;
