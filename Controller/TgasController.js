const catchAsync = require('../utils/catchAsync')
const Tags = require('../model/tagModel');
const Property =require('../model/propertymodel')
const Property_tags = require('../model/property_tags');

exports.getallTag = catchAsync(async (req, res, next) => {
    try {
        const tags = await Tags.findAll();
        res.status(200).json({
            status: 'success',
            data: tags
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

exports.createTag = catchAsync(async (req, res, next) => {
    try {
        const userrole=req.user.role;

        if(userrole==='user'){
            return res.status(400).json({
                status: 'error',
                message: 'user cant create tag !'
              });
        }

        const tag = await Tags.create(req.body);
        res.status(201).json({
            status: 'success',
            data: tag
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});



exports.deleteTag = catchAsync(async (req, res, next) => {
    try {
        const userrole=req.user.role;

        if(userrole==='user'){
            return res.status(400).json({
                status: 'error',
                message: 'user cant delete tag !'
              });
        }
        const tag = await Tags.destroy({
            where: {
              tag_id: tag_id,
              property_id: propertyid
            }
          });
          
        res.status(200).json({
            status: 'success',
            data: tag
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});



exports.addtagtoproperty=catchAsync(async (req, res, next) => {
    try{
        const propertyid=req.params.id;
        const tag_id=req.body.tag_id;
        console.log({propertyid,tag_id})
        const property=await Property.findByPk(propertyid);
        if(!property){
            return res.status(404).json({
                status: 'error',
                message: 'Property not found'
              });
        }
        const tag=await Tags.findByPk(tag_id);
        if(!tag){
            return res.status(404).json({
                status: 'error',
                message: 'Tag not found'
              });
        }


        const updatedProperty=await Property_tags.create({
            tag_id: tag_id,
            property_id: propertyid
          });
        res.status(200).json({
            status: 'success',
            data: updatedProperty
        });


    }catch(error){
        console.error(error);
        return res.status(500).json({ error: error.message });
    }




})


exports.deletetagfromproperty = catchAsync(async(req,res,next)=>{

    try{
        const propertyid=req.params.id;
        const tag_id=req.body.tag_id;
        const property=await Property.findByPk(propertyid);
        if(!property){
            return res.status(404).json({
                status: 'error',
                message: 'Property not found'
              });
        }
        const tag=await Tags.findByPk(tag_id);
        if(!tag){
            return res.status(404).json({
                status: 'error',
                message: 'Tag not found'
              });
        }


        const deletetageProperty=await Property_tags.destroy({
            where: {
              tag_id: tag_id,
              property_id: propertyid
            }
          });
          
        res.status(200).json({
            status: 'success',
            data: null
        });


    }catch(error){
        console.error(error);
        return res.status(500).json({ error: error.message });
    }







}) 