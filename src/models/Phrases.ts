import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface Phrases extends Model {
    id: number;
    autor: string;
    text: string;
}

export const Phrases = sequelize.define<Phrases>("User", {
    autor: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'phrases',
    timestamps: false,

});