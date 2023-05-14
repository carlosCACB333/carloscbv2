import mongoose, { Model, Schema } from "mongoose";

export interface IEmploye {
  firstName: string;
  lastName: string;
  type: string;
  photo: string;
}

const employeSchema = new Schema<IEmploye>(
  {
    firstName: String,
    lastName: String,
    type: String,
    photo: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

employeSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

export const user: Model<IEmploye> =
  mongoose.models.employe || mongoose.model<IEmploye>("employe", employeSchema);
