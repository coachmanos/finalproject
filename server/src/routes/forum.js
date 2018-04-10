import { Router } from "express";
import * as forumController from "../controllers/forumController";

const router = new Router();

router.get("/", (req, res, body) => {
    forumController.selectForums()
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(403);
    })
})

// query string to get forum info will be used here.
router.get("/:id", (req, res, body) => {

    if(req.query.getForumComments == "true"){
        // res.send("comments here");
        forumController.selectForumComments(req.params.id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(403);
        })
    } else {
        forumController.selectForumInfo(req.params.id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.sendStatus(403);
        })
    }
})

router.put("/:id", (req, res, body) => {
    forumController.updateForum(req.params.id, null, req.body.forumTitle, req.body.forumImg, req.body.forumText)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(403);
    })
})

router.get("/forum", (req, res, body) => {
    forumController.postNewForum(req.body.commentId, req.body.forumTitle, req.body.forumImg, req.body.forumText)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(403);
    })
})

router.post("/comment", (req, res, body) => {
    forumController.postNewForumComment(req.body.userId, req.body.forumId, req.body.commentText)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(403);
    })
})

router.post(`/forum`, (req, res, body) => {
    forumController.postNewForum(req.body.commentId, req.body.forumTitle, req.body.forumImg, req.body.forumText)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(403);
    })
})

export default router;