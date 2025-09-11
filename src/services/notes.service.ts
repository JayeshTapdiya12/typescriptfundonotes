import Notes from '../models/notes.model';
import User from '../models/user.model';
import {
  INotes,
  INoteNotFound,
  INotesSuccess,
  INoteError
} from '../interfaces/notes.interface';
import dotenv from 'dotenv';
dotenv.config();

class NoteService {
  public getAllNotes = async (
    body
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await User.findOne({ email: body.Email });
      if (!data) {
        return {
          code: 400,
          message: 'the email does not exists',
          success: false
        };
      } else {
        const notes = await Notes.find({
          $or: [{ createdBy: body.createdBy }, { collaborators: body.Email }]
        }).sort({ createdAt: -1 });

        return {
          code: 200,
          message: 'the notes get fetched ',
          data: notes,
          success: true
        };
      }
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };

  public getnotebyid = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note doest exists',
          success: false
        };
      } else {
        return {
          code: 200,
          success: true,
          data: data,
          message: 'the note is succefully fetched by id '
        };
      }
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };

  public addNote = async (
    body
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.create(body);
      return {
        code: 200,
        success: true,
        data: data,
        message: 'the note is succefully created'
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };

  public archived = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'note did not exisit',
          success: false
        };
      } else {
        data.isArchived = !data.isArchived;
        await data.save();
        return {
          code: 200,
          message: `Note has been ${
            data.isArchived ? 'archived' : 'unarchived'
          } successfully`,
          data: data,
          success: true
        };
      }
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };
}
export default NoteService;
