const Manager = require('../../modals/manager')
const bcrypt = require('bcryptjs')
try{
    const ManagerControler = {
        getAll: async (req,res) =>{
            const manager = await Manager.find()
            res.json({manager})
        },
        create: async (req,res) =>{
            const manager = new Manager(req.body)
            await manager.save()
            const token = await manager.generateAuthToken()
            res.status(201).send({manager, token})
        },
        login: async (req,res) =>{
            try{
                const {email,password} = req.body
                const manager = await Manager.findByCredentials(email,password)
                if(!manager)
                {
                    return res.status(401).send({error: "Login faild! Check authentication"})
                }
                const token = await manager.generateAuthToken()
                res.send({manager,token})
            }
            catch{
                return res.status(401).send({error: "Login faild! Check authentication"})
            }
        },
        logout: async (req,res) =>{
            try
            {
                
            req.manager.tokens = req.manager.tokens.filter((token) =>{
                return token.token != req.token;
            })
            await req.manager.save();
            res.send("LogOut Success!!!");
            }
            catch (error)
            {
                res.status(500).send(error);
            }
        },
        logoutall: async (req,res) =>{
            try
            {
                req.manager.tokens.splice(0,req.manager.tokens.length)
                await req.manager.save()
                res.status(200).send({Messenger: "Log out Success!!"});
            }
            catch (error)
            {
                res.status(500).send(error);
            }
        },
        getOne: async(req,res) =>{
            const manager =  await Manager.findById({_id: req.params.id})
            res.send({manager})
        },
        deleteOne: async(req,res) =>{
            const data = await Manager.findByIdAndDelete({_id: req.params.id})
            res.status(200).send({data})
        },
        deleteMany: async(req,res) =>{
            const listManager = req.body.list
            const managerDeleted = []
            for (var i = 0; i < listManager.length; i++)
            {
                const data = await Manager.findByIdAndDelete({_id: listManager[i]})
                managerDeleted.push(data)
            }
            res.status(200).send(managerDeleted)
        },
        update: async(req,res) => {
            const {password, firstname, lastName, position, status,sex,birthday,address, phone, email} = req.body;
            var passwordChange = bcrypt.hashSync(password, 8);
            const manager = await Manager.findById({_id: req.params.id})
            manager.lastName = lastName;
            manager.firstname = firstname;
            manager.status = status;
            manager.sex = sex;
            manager.birthday = birthday;
            manager.address = address;
            manager.phone = phone;
            manager.password = passwordChange;
            await manager.save();
            res.json(manager)
        }
    }
    module.exports = ManagerControler;
}
catch (error){
    res.status(400).send(error)
}