const { User } = require('../../models/');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if(users.length === 0) {
            return res.status(400).send({
                status: "USERS DATA EMPTY",
                data: {
                    users: []
                }
            })
        }

        res.send({
            status: "GET USERS SUCCESS",
            data: {
                users
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                message: "Server Error"
            }
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id
            }
        });

        if(!user) {
            return res.status(400).send({
                status: `USER WITH ID:${id} DOES NOT EXIST`,
                data: {
                    user: []
                }
            })
        }

        res.send({
            status: "GET USER SUCCESS",
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: {
                message: "Server Error"
            }
        })
    }
}
// softdelete
exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        const isUserExist = await User.findOne({
            where: {
                id
            }
        });
        if (!isUserExist) {
            return res.status(400).send({
                status: `USER WITH ID:${id} DOES NOT EXIST`,
                data: {
                    user: []
                }
            })
        }

        await User.destroy({
            where: {
                id
            }
        });
        res.send({
            status: `DELETE USER WITH ID:${id} SUCCESS`,
            data: {
                user: null
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}

// restore
exports.restoreUser = async (req, res) => {
    try {
        const {id} = req.params;

        await User.restore({
            where: {
                id
            }
        });

        user = await User.findOne({
            where: {
                id
            }
        })

        res.send({
            status: `RESTORE USER WITH ID:${id} SUCCESS`,
            data: {
                user
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}