const { Report, ReportType, User } = require('../models');

const index = async (req, res) => {
    Report.findAll().then((reports) => {
        res.status(201).json({
            reports,
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

const create = async (req, res) => {
    Report.create({
        user_id: req.userId,
        report_type_id: req.body.report_type_id,
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        evidence: req.file.filename,
        follow_up_suggestions: req.body.follow_up_suggestions,
        status: 'pending'
    }).then((report) => {
        res.status(201).json({
            report,
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

const show = async (req, res) => {
    Report.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: ReportType,
                attributes:['id', 'name']
            },
            {
                model: User,
                attributes:['id', 'name']
            }
        ]
    }).then((report) => {
        res.status(201).json({
            report,
        })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

// const update = async (req, res) => {
//     Report.findByPk(req.params.id).then((report) => {
//         Report.update(
//             {
//                 name: req.body.name,
//             }, 
//             {
//                 where: { id: req.params.id }
//             }
//         ).then((result) => {
//             res.status(201).json({
//                 message: "report type was updated"
//             })
//         }).catch(err => res.status(400).json({err}))
//     }).catch((error) => {
//         res.status(403).json({error});
//     })
// }

// const destroy = async (req, res) => {
//     Report.destroy({
//         where: { id: req.params.id }
//     }).then((result) => {
//         res.status(201).json({
//             message: "report type was deleted"
//         })
//     }).catch((error) => {
//         res.status(500).json({ error: error.message })
//     })
// }

const approve = async (req, res) => {
    Report.findByPk(req.params.id).then((report) => {
        if (report.status != 'pending') {
            res.status(422).json({
                message: "reports have been approved or rejected"
            })
        }
        Report.update(
            {
                status: 'approved'
            }, 
            {
                where: { id: req.params.id }
            }
        ).then((result) => {
            res.status(201).json({
                message: "report type was approved"
            })
        }).catch(err => res.status(400).json({err}))
    }).catch((error) => {
        res.status(403).json({error});
    })
}

const reject = async (req, res) => {
    Report.findByPk(req.params.id).then((report) => {
        if (report.status != 'pending') {
            res.status(422).json({
                message: "reports have been approved or rejected"
            })
        }
        Report.update(
            {
                status: 'rejected'
            }, 
            {
                where: { id: req.params.id }
            }
        ).then((result) => {
            res.status(201).json({
                message: "report type was rejected"
            })
        }).catch(err => res.status(400).json({err}))
    }).catch((error) => {
        res.status(403).json({error});
    })
}

module.exports = {
    index,
    create,
    show,
    // update,
    // destroy,
    approve,
    reject
}