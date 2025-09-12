import express, { IRouter } from 'express';
import notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';

import dotenv from 'dotenv';
dotenv.config();

class NoteRoutes {
  private NoteController = new notesController();
  private router = express.Router();
  private jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.jwt_sceret_key || '';
    this.routes();
  }
  private routes = () => {
    //    get all the notes
    this.router.get(
      '/getallnotes',
      userAuth(this.jwtSecret),
      this.NoteController.getAllNotes
    );

    // get note by id
    this.router.get(
      '/:_id/getnote',
      userAuth(this.jwtSecret),
      this.NoteController.getnotebyid
    );

    //   creating the note
    this.router.post(
      '/addnote',
      userAuth(this.jwtSecret),
      this.NoteController.addNote
    );

    //   is archived note
    this.router.post(
      '/:_id/isarchived',
      userAuth(this.jwtSecret),
      this.NoteController.archived
    );

    //   is trash note
    this.router.post(
      '/:_id/istrash',
      userAuth(this.jwtSecret),
      this.NoteController.trash
    );

    // update the note
    this.router.put(
      '/:_id',
      userAuth(this.jwtSecret),
      this.NoteController.updateNote
    );

    //   color the note
    this.router.patch(
      '/:_id/color',
      userAuth(this.jwtSecret),
      this.NoteController.color
    );

    //   delete the note
    this.router.delete(
      '/:_id',
      userAuth(this.jwtSecret),
      this.NoteController.deleteNote
    );

    //   label of the notes start from here
    //   get the labels
    this.router.get(
      '/label',
      userAuth(this.jwtSecret),
      this.NoteController.getlabel
    );

    // add labels
    this.router.get(
      '/:_id/addlabel',
      userAuth(this.jwtSecret),
      this.NoteController.addlabel
    );

    // update  label
    this.router.put(
      '/updatelabel',
      userAuth(this.jwtSecret),
      this.NoteController.updateLabel
    );

    this.router.delete(
      '/:_id/deletelabel',
      userAuth(this.jwtSecret),
      this.NoteController.deletelabel
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;
