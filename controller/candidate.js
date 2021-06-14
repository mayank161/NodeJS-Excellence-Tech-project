const Sequelize = require('sequelize');
const candidate= require('../models/candidate')

const test = require('../models/test');

// check for the existing email or create new user
exports.addCandidate = async(req,res,next) => {
    try {
        const user = await candidate.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        });
        
        return res.status(202).json({id: user.Id});
    } catch (error) {
        console.log(error);
        res.status(409).send('Email already exist');
    }
}

// adding/updating test scores new/old user respectively
exports.setTest = async(req,res,next) => {
    try {
         const user = await test.findOne({
             where: {candidateId: req.params.candidate}
         })
         if(user) {
             user.update({
                test1: req.body.test1,
                test2: req.body.test2,
                test3: req.body.test3,
                totalMarks: req.body.total
             });
         }
         else {
            await test.create({
                test1: req.body.test1,
                test2: req.body.test2,
                test3: req.body.test3,
                totalMarks: req.body.total,
                candidateId: req.params.candidate
            })
         }

    } catch (error) {
        res.status(500).send('something went wrong');
    }
}

// find max score
exports.findMax = async(req,res,next) => {
    try {
        const max = await test.findAll({
            attributes: [Sequelize.fn('max',Sequelize.col('totalMarks'))],
            raw:true
        });
    
        console.log(max);
        res.json({max})
    } catch (error) {
        console.log(error);
    }
}

// find average test scores individually
exports.findAvg = async(req,res,next) => {
    try {
        const t1 = await test.findAll({
            attributes: [Sequelize.fn('AVG',Sequelize.col('test1'))],
            raw:true
        });
        const t2 = await test.findAll({
            attributes: [Sequelize.fn('AVG',Sequelize.col('test2'))],
            raw:true
        });
        const t3 = await test.findAll({
            attributes: [Sequelize.fn('AVG',Sequelize.col('test3'))],
            raw:true
        });
    
        console.log(t1,t2,t3);
        res.json({t1,t2,t3})
    } catch (error) {
        console.log(error); 
    }
}