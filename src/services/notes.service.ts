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

  public trash = async (
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
        data.isTrashed = !data.isTrashed;
        await data.save();
        return {
          code: 200,
          message: `Note has been ${
            data.isTrashed ? 'Trashe' : 'trashed'
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

  public updateNote = async (
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
        await data.update({ ...body });
        await data.save();
        return {
          code: 200,
          message: `Note has been updated successfully`,
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

  public color = async (
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
        await data.update({ color: body.color });
        await data.save();
        return {
          code: 200,
          message: `Note color has been updated successfully`,
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

  public deleteNote = async (
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
        if (data.isArchived === true) {
          return {
            code: 200,
            success: false,
            message: 'the note is archived which can not be deleted'
          };
        }
        await data.deleteOne();

        return {
          code: 200,
          message: `Note  has been delete successfully`,
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

  public getlabel = async (
    body
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.distinct('label', { createdBy: body.createdBy });
      if (!data || data.length === 0) {
        return {
          code: 400,
          message: 'no label for the notes/user',
          success: false
        };
      } else {
        return {
          code: 200,
          message: 'Labels fetched successfully',
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
  public addlabel = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        let labels = data.label || [];
        let newLabel = Array.isArray(body.label) ? body.label : [body.label];
        labels = [...new Set([...labels, ...newLabel])];
        await data.update({ label: labels });

        return {
          code: 200,
          message: 'Labels updatead successfully',
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
