const { User } = require('../../models/');

const statusSuccess = "SUCCESS";
const statusFailed = "FAILED";
const messageSuccessSingle = (id, type) => { return `User with id: ${id} succesfully ${type} ` }
const messageFailedSingle = (id) => { return `User with id: ${id} does not exist` };
const errorResponse = (err, res) => {
    console.log(err);
    res.status(500).send({ error: { message: "Server Error" } })
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
            }
        });

        if(users.length === 0) {
            return res.status(400).send({
                status: statusSuccess,
                message: "Data empty",
                data: {
                    users: []
                }
            })
        }

        res.send({
            status: statusSuccess,
            data: {
                users
            }
        })
    } catch (err) {
        errorResponse(err,res);
    }
}

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
            }
        });

        if(!user) {
            return res.status(400).send({
                status: statusFailed,
                message: messageFailedSingle(id),
                data: {
                    user: []
                }
            })
        }

        res.send({
            status: statusSuccess,
            data: {
                user
            }
        })
    } catch (err) {
        errorResponse(err,res);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const { body: userData } = req;

        const isUserExist = await User.findOne({
            where: {
                id
            }
        });
        if (!isUserExist) {
            return res.status(400).send({
                status: statusFailed,
                message: messageFailedSingle(id),
                data: {
                    user: []
                }
            })
        }

        await User.update(userData, {
            where: {
                id
            }
        });

        const newUser = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
            }
        });

        res.send({
            status: statusSuccess,
            message: messageSuccessSingle(id, "updated"),
            data: {
                user: newUser
            }
        })
    } catch (err) {
        return errorResponse(err, res);
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
                status: statusFailed,
                message: messageFailedSingle(id),
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
            status: statusSuccess,
            message: messageSuccessSingle(id, "deleted"),
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
            status: statusSuccess,
            message: messageSuccessSingle(id, "restored"),
            data: {
                user
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}