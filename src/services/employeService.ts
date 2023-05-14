import { IEmploye, user } from "@/models/employe";
import dbConnection from "@/utils/db";
export class EmployeService {
  private static model = user;

  public static async save(data: IEmploye) {
    try {
      await dbConnection();
      return await this.model.create(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static async getAll() {
    try {
      await dbConnection();
      return await this.model.find();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
