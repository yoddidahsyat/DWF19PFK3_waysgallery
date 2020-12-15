const { Post, PostPhoto, User } = require('../../models/');

const statusSuccess = "SUCCESS";
const statusFailed = "FAILED";
const messageSuccess = (type) => { return `Post succesfully ${type} ` }
const messageSuccessSingle = (id, type) => { return `Post with id: ${id} succesfully ${type} ` }
const messageFailedSingle = (id) => { return `Post with id: ${id} does not exist` };
const errorResponse = (err, res) => {
    console.log(err);
    res.status(500).send({ error: { message: "Server Error" } })
}

exports.getPosts = async (req, res) => {

    try {
        const posts = await Post.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "UserId", "userId"],
            },
            include: {
                model: PostPhoto,
                attributes: {
                    exclude: ["postId", "PostId", "createdAt", "updatedAt"],
                }
            }
        });

        if(posts.length === 0) {
            return res.status(400).send({
                status: statusSuccess,
                message: "Data empty",
                data: {
                    posts: []
                }
            })
        }

        res.send({
            status: statusSuccess,
            data: {
                posts
            }
        })
    } catch (err) {
        errorResponse(err,res);
    }
}

exports.getPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "userId", "UserId"],
            },
            include: {
                model: PostPhoto,
                attributes: {
                    exclude: ["postId", "PostId", "createdAt", "updatedAt"],
                }
            }
        });

        if(!post) {
            return res.status(400).send({
                status: statusFailed,
                message: messageFailedSingle(id),
                data: {
                    post: []
                }
            })
        }

        // const user = await User.findOne({
        //     where: {
        //         User.id: post.userId
        //     }
        // })
        // console.log(user);

        res.send({
            status: statusSuccess,
            data: {
                post,
                // createdBy: user
            }
        })
    } catch (err) {
        errorResponse(err,res);
    }
}

exports.addPost = async (req, res) => {
    try {
        const id = req.params;
        const { body } = req;
        const postData = {
            ...body,
            userId: id
        };
        console.log(postData);
        // const post = await Post.create(postData);
        // res.send({
        //     status: statusSuccess,
        //     message: messageSuccess("created"),
        //     data: {
        //         post
        //     }
        // })
    } catch (err) {
        return errorResponse(err, res);
    }
}


exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: postData } = req;

        const isPostExist = await Post.findOne({
            where: {
                id
            }
        });
        if (!isPostExist) {
            return res.status(400).send({
                status: statusFailed,
                message: messageFailedSingle(id),
                data: {
                    post: []
                }
            })
        }

        await Post.update(postData, {
            where: {
                id
            }
        });

        const newPost = await Post.findOne({
            where: {
                id
            }
        });

        res.send({
            status: statusSuccess,
            message: messageSuccessSingle(id, "updated"),
            data: {
                post: newPost
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}


exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params;

        const isPostExist = await Post.findOne({
            where: {
                id
            }
        });
        if (!isPostExist) {
            return res.status(400).send({
                status: statusSuccess,
                message: messageFailedSingle(id),
                data: {
                    post: []
                }
            })
        }

        await Post.destroy({
            where: {
                id
            }
        });
        res.send({
            status: statusSuccess,
            message: messageSuccessSingle(id, "deleted"),
            data: {
                post: null
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}
