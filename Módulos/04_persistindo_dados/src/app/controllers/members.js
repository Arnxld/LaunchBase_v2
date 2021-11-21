const Member = require('../models/Member')
const { age, date } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members) {

                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }

                return res.render('members/index', {members, pagination, filter})
            }
        }

        Member.paginate(params)

    },
    create(req, res) {
        Member.instructorSelectOptions(function(options) {
            return res.render('members/create', {instructorOptions : options})
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill all fields")
            }
        }

        Member.create(req.body, function(id){
            return res.redirect(`/members/${id}`)
        })
    },
    show(req, res) {
        const { id } = req.params

        Member.find(id, function(member) {
            if(!member) return res.send("Member not found!")

            member.birth = date(member.birth).birthDay

            return res.render('members/show', {member})
        })
    },
    edit(req, res) {
        const { id } = req.params

        Member.find(id, function(member) {
            if(!member) return res.send("Member not found!")

            member.birth = date(member.birth).iso

            Member.instructorSelectOptions(function(options) {
                console.log(member)
                return res.render('members/edit', {member, instructorOptions : options})
            })
        })
    },
    put(req, res) {
        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })

        return
    }
}