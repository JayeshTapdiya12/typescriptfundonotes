import NoteService from '../services/notes.service';

import { Request, Response, NextFunction } from 'express';

import {
  INotes,
  INoteNotFound,
  INotesSuccess,
  INoteError
} from '../interfaces/notes.interface';

class NoteController {
  public noteService = new NoteService();

  public getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.getAllNotes(req.body);
      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during getting the all notes  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public getnotebyid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.getnotebyid(req.body, req.params._id);
      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during getting   notes  of the user by id ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public addNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.addNote(req.body);
      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during creating  notes  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public archived = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.archived(req.body, req.params._id);
      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during archiving   notes  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public trash = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.trash(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during archiving   notes  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.updateNote(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during updaeting the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public color = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.color(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during color the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public deleteNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.deleteNote(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during deleting the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // labels starts from here

  public getlabel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.getlabel(req.body);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during getting the label of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
  public addlabel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.addlabel(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during adding the label of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public updateLabel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.updateLabel(req.body);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during updating  the label of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
  public deletelabel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.deletelabel(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during deleting  the label of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // reminder starts from here

  public getreminder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.getreminder(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during getting   the reminder of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
  public addreminder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.addreminder(req.body, req.params._id);

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during adding   the reminder of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public updateReminder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.updateReminder(
        req.body,
        req.params._id
      );

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during updating   the reminder of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public deleteReminder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.deleteReminder(
        req.body,
        req.params._id
      );

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during deleting the reminder of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // collaborators starts here
  public getCollaborators = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.getCollaborators(
        req.body,
        req.params._id
      );

      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred during getting the collaborators of  the note  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}

export default NoteController;
