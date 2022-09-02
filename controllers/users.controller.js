const users = require('../api/users.json');

module.exports.getRandomUser = (req, res) => {
    const randomId = Math.floor(Math.random() * users.length) + 1;
    const result = users.find(user => user.id === randomId);
    if (result) {
        res.status(200).send({
            success: true,
            message: `Random user found`,
            data: result,
        });
    } else {
        res.status(500).send({
            success: false,
            error: 'Internal Server Error',
        })
    }
}

module.exports.getAllUsers = (req, res) => {
    const { limit } = req.query;    // for getting limited users please type user/all?limit=number
    const result = users.slice(0, limit);
    if (result.length > 0) {
        res.status(200).send({
            success: true,
            message: `${result.length} users found`,
            data: result,
        });
    } else {
        res.status(500).send({
            success: false,
            error: 'Internal Server Error',
        })
    }
}

module.exports.getUserDetails = (req, res) => {
    const { id } = req.params;
    const result = users.find(user => user.id === Number(id));
    if (result) {
        res.status(200).send({
            success: true,
            message: `Details of ${result.name} is found`,
            data: result,
        });
    } else {
        res.status(500).send({
            success: false,
            error: 'Internal Server Error',
        })
    }
}

module.exports.saveRandomUser = (req, res) => {
    const randomUser = req.body;
    const newId = users.reduce((maxId, user) => Math.max(user.id, maxId), 0) + 1;
    const newUser = {
        id: newId,
        ...randomUser
    }
    if ('id' in randomUser) {
        res.status(500).send({
            success: false,
            error: 'Please remove the id. id will be generated automatically.',
        })
    } else {
        if (['gender', 'name', 'contact', 'address', 'photoUrl'].every(key => Object.keys(randomUser).includes(key))) {
            users.push(newUser);
            res.status(200).send({
                success: true,
                message: `A new user added successfully!`,
                newUser,
                data: users,
            });
        } else {
            res.status(500).send({
                success: false,
                error: 'Please input all property',
            })
        }
    }
}

