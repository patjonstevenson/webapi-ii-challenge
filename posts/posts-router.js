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
    console.log("Running post to /:id/comments");
    if (!body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {

        db
            .findById(body.id)
            .then(found => {
                db
                    .insertComment(body)
                    .then(commentId => {
                        res.status(201).json(commentId);
                    })
                    // .catch(err => {
                    //     res.status(500).json({ error: "There was an error while saving the comment to the database" });
                    // });
                    //})
                    .catch(err => {
                        res.status(404).json({ message: "The post with the specified ID does not exist." });
                    });
                //}
            });
    }
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
    db
        .findPostComments(id)
        .then(comments => {
            if (!comments) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(comments);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
});

// DELETE "/:id"
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                db
                    .remove(id)
                    .then(num => {
                        if (num === 0) {
                            res.status(404).json({ message: "The post with the specified ID does not exist." });
                        } else {
                            res.status(200).json(post);
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post could not be removed" });
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});

// PUT "/:id"
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (!(body.title && body.contents)) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db
            .findById(id)
            .then(post => {
                if (!post) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                } else {
                    db
                        .update(id, body)
                        .then(num => {
                            if (num === 0) {
                                res.status(404).json({ message: "The post with the specified ID does not exist." });
                            } else {
                                db
                                    .findById(id)
                                    .then(newPost => {
                                        res.status(200).json(newPost);
                                    })
                                    .catch(err => {
                                        res.status(500).json({ error: "The post information could not be modified." });
                                    })

                            }
                        })
                        .catch(err => {
                            res.status(500).json({ error: "The post information could not be modified." });
                        });
                }
            })
            .catch();
    }
});

module.exports = router;