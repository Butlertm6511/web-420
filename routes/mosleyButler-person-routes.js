/*
 Title:person-routes.js
 Author: Professor Krasso
 Date: 15 April 2021
 Modified By:TiaNiecia Mosley Butler
 Descriptions: Person API
*/



const express = require('express');
const router = express.Router();
const Person = require('../models/person');

/* 
 * findAllPersons
 * @openapi
 * /api/persons:
 *  get:
 *      tags:
 *          -Persons
 *      description: API for returning an array  of persons documents from MongoODB.
 *      summary: returns an array of persons in JSON format
 *      responses:
 *          '200':
 *             description: array of person documents
 *          '500':
 *             description: Server Exception
 *          '501':
 *             description: MongoDB Exception
*/

router.get('/persons', async(req, res) => {
    try {
        Person.find({}, function(err, persons){
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                }) 
            }else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/*
 * createsPerson
 * api/persons:
 * post:
 *   tags:
 *       - Persons
 *   name: createPerson
 *   summary: Create a new person document
 *   requestBody:
 *       description: Person information
 *       content:
 *           application/json:
 *               schema:
 *                   required:
 *                       - firstName
 *                       - lastName
 *                       - roles
 *                       - dependents
 *                       - birthDate
 *                   properties:
 *                       firstName:
 *                           type: string
 *                       lastName: 
 *                           type: string
 *                       roles:
 *                           type: array
 *                           items: 
 *                               type: object
 *                               properties: 
 *                               role: string
 *                       dependents:
 *                           type: array
 *                           items:
 *                               type:object
 *                               properties: 
 *                                   description:
 *                                       type: string
 *                                   roles:
 *                                       type: string
 *   responses:
 *       '200':
 *         description: array of person documents
 *        '500':
 *          description: Server EXception
 *        '501':
 *          description: MongoDB Exception
                     
*/

router.post('/persons', async(req, res)=>{
    try{
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents:req.body.dependents,
            birthDate: req.body.birthDate
        }

        await Person.create(newPerson, function(err, person) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
             } else {
                console.log(person);
                res.json(person);
            }
        })
    }catch (e) {
        console.log(e);
        res.status(500).send({
            'message' : `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;
    