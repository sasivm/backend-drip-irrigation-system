const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const searchReq = req.body;
    if (searchReq) {
        const reqKeys = Object.keys(searchReq);
        let isAnyKeyValid = false;
        for (const key of reqKeys) {
            if (searchReq[key]) {
                isAnyKeyValid = true;
                break;
            }
        }

        if (isAnyKeyValid) {
            return res.json('Req is valid...');
        } else {
            return res.json('Req doesnt have any valid query');
        }
    } else {
        return res.json('Req is not valid object...');
    }
});

module.exports = router;