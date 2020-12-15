const { Project, ProjectPhoto, User } = require('../../models/');

const statusSuccess = "SUCCESS";
const statusFailed = "FAILED";
const messageSuccess = (type) => { return `Project succesfully ${type} ` }
const messageSuccessSingle = (id, type) => { return `Project with id: ${id} succesfully ${type} ` }
const messageFailedSingle = (id) => { return `Project with id: ${id} does not exist` };
const errorResponse = (err, res) => {
    console.log(err);
    res.status(500).send({ error: { message: "Server Error" } })
}

exports.getProjects = async (req, res) => {

    try {
        const projects = await Project.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "transactionId", "TransactionId"],
            },
            include: {
                model: ProjectPhoto,
                as: "photos",
                attributes: {
                    exclude: ["projectId", "ProjectId", "createdAt", "updatedAt"],
                }
            }
        });

        if(projects.length === 0) {
            return res.status(400).send({
                status: statusSuccess,
                message: "Data empty",
                data: {
                    projects: []
                }
            })
        }

        res.send({
            status: statusSuccess,
            data: {
                projects
            }
        })
    } catch (err) {
        errorResponse(err,res);
    }
}

exports.getProject = async (req, res) => {
    try {
        const {id} = req.params;
        const project = await Project.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "transactionId", "TransactionId"],
            },
            include: {
                model: ProjectPhoto,
                as: "photos",
                attributes: {
                    exclude: ["projectId", "ProjectId", "createdAt", "updatedAt"],
                }
            }
        });

        if(!project) {
            return res.status(400).send({
                status: statusFailed,
                message: messageFailedSingle(id),
                data: {
                    project: []
                }
            })
        }

        res.send({
            status: statusSuccess,
            data: {
                project
            }
        })
    } catch (err) {
        errorResponse(err,res);
    }
}


exports.addProject = async (req, res) => {
    try {
        const { body: projectData } = req;
        const project = await Project.create(projectData);
        res.send({
            status: statusSuccess,
            message: messageSuccess("created"),
            data: {
                project
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}


exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: projectData } = req;

        const isProjectExist = await Project.findOne({
            where: {
                id
            }
        });
        if (!isProjectExist) {
            return res.status(400).send({
                status: statusFailed,
                message: messageFailedSingle(id),
                data: {
                    project: []
                }
            })
        }

        await Project.update(projectData, {
            where: {
                id
            }
        });

        const newProject = await Project.findOne({
            where: {
                id
            }
        });

        res.send({
            status: statusSuccess,
            message: messageSuccessSingle(id, "updated"),
            data: {
                project: newProject
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}


exports.deleteProject = async (req, res) => {
    try {
        const {id} = req.params;

        const isProjectExist = await Project.findOne({
            where: {
                id
            }
        });
        if (!isProjectExist) {
            return res.status(400).send({
                status: statusSuccess,
                message: messageFailedSingle(id),
                data: {
                    project: []
                }
            })
        }

        await Project.destroy({
            where: {
                id
            }
        });
        res.send({
            status: statusSuccess,
            message: messageSuccessSingle(id, "deleted"),
            data: {
                project: null
            }
        })
    } catch (err) {
        return errorResponse(err, res);
    }
}
