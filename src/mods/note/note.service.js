import * as DBS from "../../DB/DB.service.js";
import noteModel from "../../DB/models/notes.model.js";
import { successRespones } from "../../common/utils/res.succ.js";
import mongoose from "mongoose";
export const createNote = async (req, res, next) => {
  const { id } = req.user;
  const { title, content } = req.body;
  const note = await DBS.create({
    model: noteModel,
    data: {
      title,
      content,
      userId: id,
    },
  });
  successRespones({ res, message: "note created", data: note });
};

export const updateNote = async (req, res, next) => {
  const { id } = req.user;
  const { noteId } = req.params;
  const { title, content } = req.body;
  const note = await DBS.findone({
    model: noteModel,
    filter: { _id: noteId },
  });
  if (!note) {
    throw new Error("note not found", { cause: 404 });
  }
  if (note.userId.toString() !== id) {
    throw new Error("you are not the owner", { cause: 407 });
  }
  const newNote = await DBS.findoneandupdate({
    model: noteModel,
    filter: {
      _id: noteId,
      userId: id,
    },
    data: {
      title,
      content,
    },
  });
  successRespones({ res, message: "note updated successfully", data: newNote });
};

export const replaceNote = async (req, res, next) => {
  const { id } = req.user;
  const { noteId } = req.params;
  const { title, content } = req.body;
  const note = await DBS.findone({
    model: noteModel,
    filter: { _id: noteId },
  });
  if (!note) {
    throw new Error("note not found", { cause: 404 });
  }
  if (note.userId.toString() !== id) {
    throw new Error("you are not the owner", { cause: 407 });
  }
  const newNote = await DBS.findoneandupdate({
    model: noteModel,
    filter: {
      _id: noteId,
      userId: id,
    },
    data: {
      title,
      content,
    },
  });
  successRespones({
    res,
    message: "note replaced successfully",
    data: newNote,
  });
};

export const updateManyNotes = async (req, res, next) => {
  const { id } = req.user;
  const { title } = req.body;
  const allNotes = await DBS.updateMany({
    model: noteModel,
    filter: { userId: id },
    data: { title: title },
  });
  if (allNotes.matchedCount === 0) {
    throw new Error("No notes found", { cause: 404 });
  }
  successRespones({ res, message: "all notes title updated", data: allNotes });
};

export const deleteNotes = async (req, res, next) => {
  const { noteId } = req.params;
  const deletedNote = await DBS.deleteUser({
    model: noteModel,
    id: noteId,
  });
  successRespones({
    res,
    message: "note deleted successfully",
    data: deletedNote,
  });
};

export const noteList = async(req,res,next)=>{
    const {id} = req.user
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    const notes = await DBS.find({
        model:noteModel,
        filter:{userId:id},
            limit:limit,
            skip:skip,
            sort:{createdAt:-1}
    })
    if(!notes.length){
        return successRespones({ res, message: "No notes found" });
    }
    return successRespones({ res, message: "Notes retrived",data:notes});
}

export const getNote = async (req, res, next) => {
    const { id } = req.user;
    const { noteId } = req.params;
    const note = await DBS.findone({
      model: noteModel,
      filter: { _id: noteId },
    });
    if (!note) {
      throw new Error("note not found", { cause: 404 });
    }
    if (note.userId.toString() !== id) {
      throw new Error("you are not the owner", { cause: 407 });
    }
    successRespones({ res,data: note });
};

export const getNoteByContent = async (req, res, next) => {
    const { id } = req.user;
    const {content} = req.query
    const note = await DBS.findone({
      model: noteModel,
      filter: {content :content,userId:id},
    });
    if (!note) {
      throw new Error("note not found", { cause: 404 });
    }
    successRespones({ res,data: note });
};


export const noteListWithUserInfo = async (req, res, next) => {
    const { id } = req.user;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    const notes = await DBS.find({
        model: noteModel,
        filter: { userId: id },
        options: {
            select: "title userId createdAt",      
            populate: [
                { path: "userId", select: "email" }
            ],
            sort: { createdAt: -1 },
            skip: skip,
            limit: limit
        }
    });

    if (!notes.length) {
        return successRespones({ res, message: "No notes found", data: [] });
    }

    successRespones({ res, message: "Notes retrieved", data: notes });
};

export const getNoteWithAggregation = async (req, res, next) => {
    const { id } = req.user;
    const { title } = req.query; 

    const matchFilter = { 
        userId: new mongoose.Types.ObjectId(id) 
    };

    if (title) {
        matchFilter.title = title;
    }

    const pipeline = [
        { 
            $match: matchFilter 
        },
        {
            $lookup: {
                from: "users",       
                localField: "userId", 
                foreignField: "_id",  
                as: "user"            
            }
        },
        { 
            $unwind: "$user" 
        },
        {
            $project: {
                _id: 0,             
                title: 1,
                userId: 1,
                createdAt: 1,
                "user.name": 1,      
                "user.email": 1      
            }
        }
    ];

    const notes = await DBS.aggregate({ 
        model: noteModel, 
        pipeline: pipeline 
    });

    return successRespones({ res, message: "Done", data: notes });
};

export const deleteAllNotes = async(req,res,next)=>{
    const {id}=req.user
    const deleteNotes = await DBS.deletemany({
        model:noteModel,
        filter:{userId:id}
    })
    if (deleteNotes.deletedCount === 0) {
        return successRespones({ res, message: "No notes found to delete" });
    }
    successRespones({res,message:"all notes deleted",data:deleteNotes})
}