// src/models/advertisement.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import TripRoute from './trip-route.model';

class Advertisement extends Model {
  public id!: number;
  public routeId!: number;
  public title!: string;
  public description!: string;
  public businessName!: string;
  public location!: { lat: number; lng: number };
  public category!: 'restaurant' | 'rest_stop' | 'park' | 'gift_shop' | 'museum';
  public imageUrl!: string | null;
  public website!: string | null;
  public sponsored!: boolean;
  public radiusMeters!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Advertisement.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    routeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: TripRoute,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        'restaurant',
        'rest_stop',
        'park',
        'gift_shop',
        'museum'
      ),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sponsored: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    radiusMeters: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
    },
  },
  {
    sequelize,
    tableName: 'advertisements',
  }
);

Advertisement.belongsTo(TripRoute, { foreignKey: 'routeId', as: 'route' });

export default Advertisement;