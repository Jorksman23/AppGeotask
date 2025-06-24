import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';
import { UserModel } from './UserModel.js';

export const LocationModel = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id'
    }
  }
}, {
  tableName: 'ubicaciones',
  timestamps: true
});

// Asociación con usuarios (1:N)
UserModel.hasMany(LocationModel, { foreignKey: 'idUsuario' });
LocationModel.belongsTo(UserModel, { foreignKey: 'idUsuario' });
