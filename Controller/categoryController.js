const catchAsync = require('../utils/catchAsync')
const category = require('../model/categories');
const Property =require('../model/propertymodel');
const categorySchema = require('./categoryValidation')


exports.createCategoryInProperty = catchAsync(async (req, res, next) => {
    try {
      req.body.userId = req.user.id;
      const propertyId = req.params.id;
      const categoryid = req.body.id;
      await categorySchema.validate(req.body, { abortEarly: false });

      const checkcatecoryid=await category.findOne({where:categoryid})
      if(!checkcatecoryid){
        return res.status(404).json({ message: 'category not found please try agein' });
       
}   console.log(categoryid);
      const updatedRowsCount = await Property.update(
        { categoryid: categoryid }, 
        { where: { id: propertyId } }
      );
  
      if (!updatedRowsCount) {
        return res.status(404).json({ message: 'Property not found or update failed' });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'Category assigned to property successfully',
      });
  
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
});

exports.getcategory = catchAsync(async(req,res,next)=>{
    try{
        const getProperty = await category.findAll(); 
    
        res.status(200).json({
            status: 'success',
            data: getProperty
          });
        }      
      catch(error){
          console.error(error);
          return res.status(500).json({ error: error.message });
      }
});

exports.createcategory= catchAsync(async(req,res,next)=>{


try {
    req.body.userId = req.user.id;
    await categorySchema.validate(req.body, { abortEarly: false });


    const categores = await category.create(req.body);

    res.status(201).json({
      status: 'success',
      data: categores
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }



})

exports.updatecategory=catchAsync(async(req,res,next)=>{

    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
              status: 'error',
              message: 'category ID is required in query'
            });
          }

      req.body.userId = req.user.id;
  
      const [categoryes] = await category.update(req.body , { where: { id } });
      if (categoryes === 0) {
        return res.status(404).json({ message: 'category not found' });
      }
  
      res.status(201).json({
        status: 'success',
        data: categoryes
      });
  
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }





})

exports.deletecategory=catchAsync(async(req,res,next)=>{

    try{
        const id = req.params.id
        const deleted = await category.destroy({
            where: { id: id }
          });

          if (deleted === 0) {
            return res.status(404).json({ message: 'category not found' });
          }

          res.status(200).json({
            status: 'success',
            data: null
          });
    
      
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: error.message });
    }


    
})
