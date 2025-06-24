import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';
import { UserModel } from './UserModel.js';

export const TaskModel = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  },
  prioridad: {
    type: DataTypes.ENUM('alta', 'media', 'baja'),
    defaultValue: 'media'
  },
  fecha_limite: {
    type: DataTypes.DATE,
    allowNull: true
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
  tableName: 'tareas',
  timestamps: true
});

// Asociación con usuario (1:N)
UserModel.hasMany(TaskModel, { foreignKey: 'idUsuario' });
TaskModel.belongsTo(UserModel, { foreignKey: 'idUsuario' });
