const router = require("express").Router();
const posts = require("../data/db");

// POST "/"
router.post("/", (req, res) => {
    const body = req.body;
    if (!(body.title && body.contents)) {
        res.status(400).json({ errorMessage: "Please include a title and contents for the post." })
    } else {
        posts
            .insert(body)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Internal server error", error: err });
            });
    }
});

// POST "/:id/comments"
router.post("/:id/comments", (req, res) => {

});

// GET "/"
router.get("/", (req, res) => {

});

// GET "/:id"
router.get("/:id", (req, res) => {

});

// GET "/:id/comments"
router.get("/:id/comments", (req, res) => {

});

// DELETE "/:id"
router.delete("/:id", (req, res) => {

});

// PUT "/:id"
router.put("/:id", (req, res) => {

});

module.exports = router;