const { Report, ReportType } = require('../models');

const index = async (req, res) => {
    ReportType.findAll().then((reportTypes) => {
        res.status(201).json({
            reportTypes,
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

const create = async (req, res) => {
    ReportType.create({
        name: req.body.name,
    }).then((reportType) => {
        res.status(201).json({
            reportType,
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

const show = async (req, res) => {
    ReportType.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: Report
            }
        ]
    }).then((reportType) => {
        res.status(201).json({
            reportType,
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

const update = async (req, res) => {
    ReportType.findByPk(req.params.id).then((reportType) => {
        ReportType.update(
            {
                name: req.body.name,
            }, 
            {
                where: { id: req.params.id }
            }
        ).then((result) => {
            res.status(201).json({
                message: "report type was updated"
            })
        }).catch(err => res.status(400).json({err}))
    }).catch((error) => {
        res.status(403).json({error});
    })
}

const destroy = async (req, res) => {
    ReportType.destroy({
        where: { id: req.params.id }
    }).then((result) => {
        res.status(201).json({
            message: "report type was deleted"
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
}