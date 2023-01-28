import { Model, DataTypes } from 'sequelize';
import { toDefaultValue } from 'sequelize/types/utils';
import { sequelize } from '../instances/pg';

export interface Todos extends Model {
    id: number;
    title: string;
    done: boolean;
}

export const Todos = sequelize.define<Todos>("todos", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'todos',
    timestamps: false,

});