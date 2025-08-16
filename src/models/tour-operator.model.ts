// src/models/tour-operator.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TourOperator extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TourOperator.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tour_operators',
  }
);

export default TourOperator;