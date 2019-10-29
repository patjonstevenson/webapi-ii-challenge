const router = require("express").Router();
const db = require("../data/db");

// POST "/"
router.post("/", (req, res) => {
    const body = req.body;
    if (!(body.title && body.contents)) {
        res.status(400).json({ errorMessage: "Please include a title and contents for the post." })
    } else {
        db
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
    const body = req.body;

});

// GET "/"
router.get("/", (req, res) => {
    db
        .find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error.", error: err });
        });
});

// GET "/:id"
router.get("/:id", (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            res.status(200).json(...post);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error" });
        });
});

// GET "/:id/comments"
router.get("/:id/comments", (req, res) => {
    const id = req.params.id;
});

// DELETE "/:id"
router.delete("/:id", (req, res) => {
    const id = req.params.id;
});

// PUT "/:id"
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
});

module.exports = router;