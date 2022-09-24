const { Servico } = require("../models");

/**
 * Lista servicos
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const all = async (req, res, next) => {
    try {
        res.send(await Servico.findAll());
    } catch (err) {
        next(err);
    }
}

/**
 * Consulta um servico
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const servicos = await Servico.findOne({
            where: {
                id: id
            }
        });

        if (!servicos)
            throw new Error("Serviço não encontrado");

        res.send(servicos);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Inserir um serviço
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const insert = async (req, res, next) => { 
    try {
        const servicos = await Servico.create(req.body);
        res.status(201).send(servicos);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Alterar uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const update = async (req, res, next) => { 
    try {
        const servicos = await Servico.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!servicos) {
            throw new Error("Servico não existe");
        }

        servicos.set(req.body);

        res.send(await servicos.save());
    }
    catch (err) {
        next(err);
    }

}

/**
 * Remove uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = async (req, res, next) => { 
    try {
        const servicos = await Servico.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!servicos) {
            throw new Error("Servico não existe");
        }

        await servicos.destroy();
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}


module.exports = { all, one, insert, update, remove };