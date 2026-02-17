export const create = async ({model,data}={})=>{
    return await model.create(data)
}


export const findone = async ({model,filter={},options={}}={})=>{
    const doc = model.findOne(filter)
    if(options.populate){
        doc.populate(options.populate)
    }
    if(options.skip){
        doc.skip(options.skip)
    }
    if(options.populate){
        doc.limit(options.limit)
    }
    return await doc
}
export const findoneandupdate = async ({ model, filter = {}, data = {}, options = {} } = {}) => {
    return await model.findOneAndUpdate(filter, data, { 
        new: true, 
        runValidators: true, 
        ...options 
    });
};
export const updateMany = async ({ model, filter = {}, data = {}, options = {} } = {}) => {
    return await model.updateMany(filter, data, { 
        new: true, 
        runValidators: true, 
        ...options 
    });
};
export const updateUser = async({model,id,data={},options={}}={})=>{
return await model.findByIdAndUpdate(id,data,{new:true,runValidators:true})
}


export const deleteUser = async({model,id,options={}}={})=>{
    return await model.findByIdAndDelete(id,options)
}
export const deletemany = async({model,id,options={}}={})=>{
    return await model.deleteMany(id,options)
}

export const getUser = async({model,id}={})=>{
    return await model.findById(id)
}

export const find = async ({model,filter={},options={}}={})=>{
    const doc = model.find(filter)
    if(options.populate){
        doc.populate(options.populate)
    }
    if(options.select){
        doc.select(options.select)
    }
    if(options.sort){
        doc.sort(options.sort)
    }
    if(options.skip){
        doc.skip(options.skip)
    }
    if(options.limit){
        doc.limit(options.limit)
    }
return await doc;
}
export const aggregate = async ({ model, pipeline = [] } = {}) => {
    return await model.aggregate(pipeline);
};