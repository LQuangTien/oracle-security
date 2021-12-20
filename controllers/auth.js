const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { dbConfig, createConnection, openPluggableDB } = require("../DAL/db");
const { ServerError, Response, BadRequest } = require("../ulti/response");

const ONE_SECCOND = 1000;
const ONE_MiNUTE = ONE_SECCOND * 60;
const ONE_HOUR = ONE_MiNUTE * 60;

exports.signin = (req, res) => {
    try {
        await openPluggableDB();

        const hash_password = await bcrypt.hash(req.body.password, 10);
        const config = dbConfig(req.body.username, hash_password, req.body.isAdmin);

        const connection = await createConnection(config);

        const token = jwt.sign(
            {
                username: req.body.username,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
                exp: Math.floor(Date.now()) + ONE_HOUR,
            },
            process.env.JWT_SECRET
        );

        return Response(res, {
            token,
            //Này return chơi đó tại connection nó trả về cái gì ko à, m cần gì thì thay
            user: { connection },
        });
    } catch (error) {
        return ServerError(res, error.message);
    }
};

exports.signout = (req, res) => {
    return Response(res, { message: "Signout successfully ...!" });
};
