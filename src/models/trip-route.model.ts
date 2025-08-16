// src/models/trip-route.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import TourOperator from './tour-operator.model';

class TripRoute extends Model {
  public id!: number;
  public operatorId!: number;
  public name!: string;
  public description!: string;

  public startLocation!: { lat: number; lng: number };
  public endLocation!: { lat: number; lng: number };
  public waypoints!: Array<{ lat: number; lng: number; name?: string; type?: string }>;

  public distanceKm!: number;
  public durationMinutes!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TripRoute.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    operatorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: TourOperator,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startLocation: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    endLocation: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    waypoints: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    distanceKm: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'trip_routes',
  }
);

// Define association
TripRoute.belongsTo(TourOperator, { foreignKey: 'operatorId', as: 'operator' });

export default TripRoute;