import express from "express";

const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: '쇼핑하우 by kakaocommerce - Search UI' });
});

export default router;
