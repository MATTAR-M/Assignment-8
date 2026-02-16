export const create = async ({model,data}={})=>{
    return await model.create(data)
}


export const findone = async ({model,filter={},options={}}={})=>{
    return await model.findOne(filter)
    if(options.populate){
        doc.populate(options.populate)
    }
    if(options.skip){
        doc.skip(options.skip)
    }
    if(options.populate){
        doc.limit(options.limit)
    }
}

export const updateUser = async({model,id,data={},options={}}={})=>{
return await model.findByIdAndUpdate(id,data,{new:true,runValidators:true})
}


export const deleteUser = async({model,id,options={}}={})=>{
    return await model.findByIdAndDelete(id,options)
}

export const getUser = async({model,id}={})=>{
    return await model.findById(id)
}
