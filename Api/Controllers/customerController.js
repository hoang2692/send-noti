const Customer = require('../../modals/customer')
const bcrypt = require('bcryptjs')

try {
    const CustomerControler = {
        getAll: async (req,res) =>{
            const customers = await Customer.find()
            res.json({customers})
        },
        create: async (req, res) => {
            const customer = new Customer(req.body)
            await customer.save()
            const token = await customer.generateAuthToken()
            res.status(201).send({customer, token})
        },
        login: async (req, res) => {
            try{
                const {email,password} = req.body
                const customer = await Customer.findByCredentials(email,password)
                if(!customer)
                {
                    return res.send({error: "Login faild! Check authentication"})
                }
                const token = await customer.generateAuthToken()
                res.send({customer,token})
            }
            catch(erro){
                return res.status(401).send({error: "Login faild! Check authentication"});
            }
        },
        logout: async (req, res) => {
            try {
                req.customer.tokens = req.customer.tokens.filter((token) => {
                    return token.token != req.token;
                })
                await req.customer.save();
                res.send();
            } catch (error) {
                res.status(500).send(error);
            }
        },
        logoutall: async (req, res) => {
            try {
                req.customer.tokens.splice(0, req.customer.tokens.length)
                await req.customer.save()
                res.status(200).send({Messenger: "Log out Success!!"});
            } catch (error) {
                res.status(500).send(error);
            }
        },
        getOne: async (req, res) => {
            const customer = await Customer.findById({_id: req.params.id})
            res.send(customer)
        },
        deleteOne: async(req,res) =>{
            const data = await Customer.findByIdAndDelete({_id: req.params.id})
            res.status(200).send({data})
        },
        deleteMany: async(req,res) =>{
            const listCustomer = req.body.list
            const customerDeleted = []
            for (var i = 0; i < listCustomer.length; i++)
            {
                const data = await Customer.findByIdAndDelete({_id: listCustomer[i]})
                customerDeleted.push(data)
            }
            res.status(200).send(customerDeleted)
        },
        update: async(req,res) => {
            const {password, firstname, lastName, position, status,sex,birthday,address, phone, email} = req.body;
            var passwordChange = bcrypt.hashSync(password, 8);
            const customer = await Customer.findById({_id: req.params.id})
            customer.lastName = lastName;
            customer.firstname = firstname;
            customer.status = status;
            customer.sex = sex;
            customer.birthday = birthday;
            customer.address = address;
            customer.phone = phone;
            customer.password = passwordChange;
            await customer.save();
            res.json(customer)
        }
    }
    module.exports = CustomerControler;
} catch (error) {
    res.status(400).send(error)
}
