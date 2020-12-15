const { User } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const statusSuccess = "SUCCESS";
const statusFailed = "FAILED";
const errorResponse = (err, res) => {
    console.log(err);
    res.status(500).send({ error: { message: "Server Error" } })
}

// ------------------------------  REGISTER ----------------------------------- //

exports.register = async (req, res) => {
    const { body } = req;
    const { email, password } = body;
    try {
        const schema = Joi.object({
            fullName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        const { error } = schema.validate({ ...body }, {
            abortEarly: false
        });

        if (error) {
            return res.status(400).json({
                status: statusFailed,
                message: error.details[0].message,
                errors: error.details.map((detail) => detail.message),
            });
        }

        const checkEmail = await User.findOne({
            where: {
                email,
            },
        });

        if (checkEmail) {
            return res.status(400).json({
                status: "FAILED",
                message: "This email has already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...body,
            password: hashedPassword,
        });

        const payload = {
            id: user.id,
        };
        const privateKey = process.env.JWT_PRIVATE_KEY;

        const token = jwt.sign(payload, privateKey);

        res.send({
            status: statusSuccess,
            message: "You succesfully registered",
            data: {
                name: user.name,
                email: user.email,
                token,
            },
        });
    } catch (err) {
        errorResponse(err, res);
    }
};
