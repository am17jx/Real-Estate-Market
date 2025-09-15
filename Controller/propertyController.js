const { Category } = require('../model');
const Property = require('../model/propertymodel');
const catchAsync = require('../utils/catchAsync');
const Fuse = require('fuse.js');
const propertySchema = require('./propertyValidation');
const propertyseacrhvildation = require('./propertyserchvalidation');
const User= require('../model/usermodel');
const Company = require('../model/CompanyModel');
const Tags = require('../model/tagModel');
const { Op } = require('sequelize');
const property_tags=require('../model/property_tags');


 
exports.searchProperty =catchAsync(async(req,res,next)=>{
  try{
    const {type,address,status,search}=req.query;
    console.log({type,address,status,search})
    const where={};
    if(type) where.type = { [Op.eq]: type };
    if(address) where.address = { [Op.iLike]: `%${address}%` };
    if(status) where.status = { [Op.eq]: status };
    if(search) where.description = { [Op.iLike]: `%${search}%` };
    const properties = await Property.findAll({ where });
    
    if(!properties.length){
      return res.status(404).json({
        status: 'error',
        message: 'No properties found'
      });
    }

    let result = properties;
    if(search){
      const fuse = new Fuse(result, {
        keys: ['description', 'address' ],
        threshold: 0.3
      });
      result = fuse.search(search).map(r => r.item);
    }
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
})


exports.createProperty =catchAsync (async (req, res,next) => {

  try {
    
    const roleuser=req.user.role;
    if(roleuser==='user'){
      req.body.userId = req.user.id;
    }
    if(roleuser==='admin'){


if (req.body.userId&&req.body.companyid){
  return res.status(400).json({
    status: 'error',
    message: 'user id and company id cant be both'
  });
}

if(req.body.userId === req.user.id){
  return res.status(400).json({
    status: 'error',
    message: 'addmin cant own  property'
  });
}}
   
//task 1 Make in the create property api the tags ids, it will represent the tags that will be linked to the property

req.body.userId = req.user.id;

const property = await Property.create(req.body);
const property_id = property.id;

if (req.body.tags && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
  const tagsbody = req.body.tags;
  const tagsToAssociate = [];

  for (const tagId of tagsbody) {
    const tagExists = await Tags.findByPk(tagId);
    if (!tagExists) {
      return res.status(400).json({
        status: 'error',
        message: `Tag with id ${tagId} not found in DB`
      });
    }
    tagsToAssociate.push(tagId);
  }

  const propertyTagsData = tagsToAssociate.map(tagId => ({
    tag_id: tagId,
    property_id: property_id
  }));

  await property_tags.bulkCreate(propertyTagsData);
}


    const propertyWithRelations = await Property.findByPk(property.id, {
  include: [
    { model: Category, as: 'category', attributes: ['name'] },
    { model: User, as: 'owner', attributes: ['name'] },
    { model: Company, as: 'Company', attributes: ['Name'] },
    { model: Tags, as: 'tags', attributes: ['Name'], through: { attributes: [] } }
  ]
});

    res.status(201).json({
      status: 'success',
      data: propertyWithRelations
    });
  }
  catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});


//Add pagination to the properties list by add in the get request the (pageSize, and pageNumber), and the response should have the total pages and the current page numbers)
//Note: add default values to the page number and size of not provided
exports.getallProperty= catchAsync(async(req,res,next) => {
  try{
const pagenumber = parseInt(req.query.pagenumber) || 0;
const pagesize = parseInt(req.query.pagesize) || 10;
    const result = await Property.findAndCountAll({
  include: [
    { model: Category, as: 'category', attributes: ['name'] },
    { model: User, as: 'owner', attributes: ['name'] },
    { model: Company, as: 'Company', attributes: ['Name'] },
    { model: Tags, as: 'tags', attributes: ['Name'], through: { attributes: [] } }
  ],

 offset: pagesize * pagenumber,
 limit: pagesize,

  order: [['id', 'ASC']],

}
)


  
 const cleanedData = result.rows.map(p => {
      const plain = p.get({ plain: true });

      if (!plain.Company) {
        delete plain.Company;
      }

      if (!plain.companyid) {
        delete plain.companyid;
      }

      return plain;
    });

   res.json({
  pagenumber,
  pagesize,
  total: result.count,
  data: result.rows,
});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});



exports.deleteProperty = catchAsync(async (req, res, next) => {
try {  

      const propertyId = req.params.id;
    const deleted = await Property.destroy({ where: { id: propertyId } });

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Property not found"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Property deleted successfully"
    });
  


  } catch (error) {
    next(error);
  }
});



exports.updateProperty = catchAsync(async (req, res, next) => {
    const roleuser = req.user.role;
    const propertyId = req.params.id;

    if (!propertyId) {
        const error = new Error('Property ID is required in query');
        error.statusCode = 400;
        return next(error);
    }

    if (roleuser === 'user') {
        const property = await Property.findByPk(propertyId);
        if (!property || property.userId !== req.user.id) {
            const error = new Error('You are not authorized to update this property.');
            error.statusCode = 403;
            return next(error);
        }

        const forbiddenFields = ['userId', 'companyid', 'categoryid', 'Company', 'owner'];
        for (const field of forbiddenFields) {
            if (req.body[field]) {
                const error = new Error(`A user cannot update the ${field}.`);
                error.statusCode = 400;
                return next(error);
            }
        }

        req.body.userId = req.user.id;
    }

    if (roleuser === 'admin') {
        if (req.body.userId && req.body.companyid) {
            const error = new Error('A property cannot be owned by both a user and a company.');
            error.statusCode = 400;
            return next(error);
        }

        if (req.body.userId === req.user.id) {
            const error = new Error('An admin cannot set themselves as the owner of a property.');
            error.statusCode = 400;
            return next(error);
        }
    }
//Task 2 add in the update property api ( addingTagsIds and removingTagsIds) and add the logic to handle them 
    if (req.body.addnewtags) {
        const tagsbody = Array.isArray(req.body.addnewtags) ? req.body.addnewtags : [];
        const existingTags = [];
        for (const tagId of tagsbody) {
            const tag = await Tags.findByPk(tagId);
            if (!tag) {
                const error = new Error(`Tag with id ${tagId} not found.`);
                error.statusCode = 400;
                return next(error);
            }
         const check_tag = await property_tags.findOne({
  where: {
    tag_id: tagId,
    property_id: propertyId
  }
});

if (check_tag) {
  const error = new Error(`This tag ${tagId} is already linked to this property.`);
  error.statusCode = 400;
  return next(error);
}

existingTags.push(tagId);

        }
        
    

     await Property.update(req.body, { where: { id: propertyId } });
        const propertyTagsData = req.body.addnewtags.map(tag_id => ({
            tag_id,
            property_id: propertyId
        }));
            await property_tags.bulkCreate(propertyTagsData);
        
    }


    if(req.body.removetags){
      if (req.body.removetags && Array.isArray(req.body.removetags)) {
      const tagsToDelete = req.body.removetags;
      const existingTags = await property_tags.findAll({
        where: {
          property_id: propertyId,
          tag_id: tagsToDelete
        }
      });

      if (existingTags.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No matching tags found for this property"
        });
      }

   
      await property_tags.destroy({
        where: {
          property_id: propertyId,
          tag_id: tagsToDelete
        }
      });

   
    }
  




    }



    const propertyWithRelations = await Property.findByPk(propertyId, {
        include: [
            { model: Category, as: 'category', attributes: ['name'] },
            { model: User, as: 'owner', attributes: ['name'] },
            { model: Company, as: 'Company', attributes: ['Name'] },
            { model: Tags, as: 'tags', attributes: ['Name'], through: { attributes: [] } }
        ]
    });

    res.status(200).json({
        status: 'success',
        data: propertyWithRelations
    });
});



