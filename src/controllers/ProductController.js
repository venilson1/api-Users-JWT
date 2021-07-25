const productServices = require('../services/productServices');


class ProductController{

  async index(req, res) {
    res.send("Rota de Usuarios");
  }

  async newProduct(req, res){
    let {name, description, price} = req.body;

    if (!name) {
      res.status(400).send({err: "O nome está invalido"});
      return;
    }

    try 
    {
      const status = await productServices.create(name, description, price);
      res.status(200).send(status);
    } 

    catch (error) 
    {
      console.log(error);
    }
  }

}
module.exports = new ProductController();

