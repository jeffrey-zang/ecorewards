import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'
import { sequelize } from '@/db/index.ts'
import { zodDateSchema } from '@/utils/index.ts'

extendZodWithOpenApi(z)

interface TransactionAttributes {
  id: number
  category: string
  description: string
  points: number
  partnerId: number
  transactedAt: Date
  createdAt: Date
  updatedAt: Date
}

type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'description'
>

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare id: number;
  declare category: string;
  declare description: string;
  declare points: number;
  declare partnerId: number;
  declare transactedAt: Date;
  declare createdAt: Date;
  declare updatedAt: Date;

  // associations if needed
  // static associate(models: { Partner: typeof Partner }) {
  //   Transaction.belongsTo(models.Partner, {
  //     foreignKey: 'partnerId',
  //     onDelete: 'CASCADE'
  //   });
  // }
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        isInt: true
      },
      field: 'id'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
      field: 'category'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [2, 500]
      },
      field: 'description'
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'points'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'partner_id'
    },
    transactedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'transacted_at'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'updated_at'
    }
  },
  {
    modelName: 'transaction',
    tableName: 'transactions',
    timestamps: true,
    sequelize
  }
);

const TransactionZod = z.object({
  id: z.number().int().positive(),
  category: z.string().min(2).max(50).openapi({ example: 'Purchase' }),
  description: z.string().min(2).max(500).openapi({ example: 'Description of the transaction' }),
  points: z.number().int().nonnegative().openapi({ example: 100 }),
  partnerId: z.number().int().positive().openapi({ example: 1 }),
  transactedAt: zodDateSchema,
  createdAt: zodDateSchema,
  updatedAt: zodDateSchema
});

export { Transaction, TransactionZod, type TransactionAttributes, type TransactionCreationAttributes };