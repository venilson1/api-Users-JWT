const clientServices = require("../services/clientServices");
const bcrypt = require("bcrypt");

class ClientController {

  async findAll(req, res) {
    try{
      const data = await clientServices.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: error});
    }    
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await clientServices.findById(id);

      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { name, address, complement, reference, email, password, telephone } = req.body;

    if (!name) return res.status(400).send({ err: "name is invalid" });
    if (!address) return res.status(400).send({ err: "adress is invalid" });
    if (!complement) return res.status(400).send({ err: "complement place is invalid" });
    if (!reference) return res.status(400).send({ err: "reference place is invalid" });
    if (!email) return res.status(400).send({ err: "email is invalid" });
    if (!password) return res.status(400).send({ err: "password is invalid" });
    if (!telephone) return res.status(400).send({ err: "telephone is invalid" });

    let emailExists = await clientServices.findEmail(email);
    if (emailExists) return res.status(406).json({ error: "e-mail already registered" });

    try {
      let hash = await bcrypt.hash(password, 10);
      const data = await clientServices.insert(
        name,
        address,
        complement,
        reference,
        email,
        (password = hash),
        telephone
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name, address, complement, reference, email, telephone } = req.body;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await clientServices.update(
        id,
        name,
        address,
        complement,
        reference,
        email,
        telephone
      );

      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(404).json({error});
    }

  }

  async delete(req, res) {
    let id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await clientServices.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }
}

module.exports = new ClientController();
