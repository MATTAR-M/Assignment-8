import { Router } from "express";
import { authentication } from "../../common/middleware/authentication.js";
import * as NS from "./note.service.js";

const noteRouter = Router();

noteRouter.post("/", authentication, NS.createNote);
noteRouter.patch("/all", authentication, NS.updateManyNotes);
noteRouter.patch("/:noteId", authentication, NS.updateNote);
noteRouter.put("/replace/:noteId", authentication, NS.updateNote);
noteRouter.get('/note-with-user',authentication,NS.noteListWithUserInfo)
noteRouter.get('/aggregate', authentication, NS.getNoteWithAggregation);
noteRouter.get('/content',authentication,NS.getNoteByContent)
noteRouter.get('/paginate-sort',authentication,NS.noteList)
noteRouter.get('/:noteId',authentication,NS.getNote)
noteRouter.delete("/delete-all", authentication, NS.deleteAllNotes);
noteRouter.delete("/:noteId", authentication, NS.deleteNotes);
export default noteRouter;
