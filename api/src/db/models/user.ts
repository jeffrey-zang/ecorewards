import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

// import { MEMBER_STATUS, addressRegex, nameRegex, phoneRegex } from '@/constants/index.ts'
import { sequelize } from '@/db/index.ts'
import { Member } from '@/db/models/index.ts'
import { zodIdSchema } from '@/utils/index.ts'

extendZodWithOpenApi(z)

export enum AnimalType {
    Turtle,
    Squirrel,
    Bird,
    Wolf,
    Eagle,
}

interface UserAttributes {
  id: number
  memberId: number
  email: string
  password: string
  animal: AnimalType
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'memberId' | 'email' | 'password'>

class User extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number
    declare memberId: number
    declare email: string
    declare password: string
    declare animal: AnimalType

    static associate(models: { Member: typeof Member }) {
        User.hasOne(models.Member, {
            foreignKey: 'memberId',
            onDelete: 'CASCADE'
        })

    }
}

User.init(
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
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Members',
          key: 'id'
        },
        onDelete: 'CASCADE',
        validate: {
          isInt: true
        },
        field: 'member_id'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        field: 'email'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      animal: {
        type: DataTypes.ENUM(...Object.keys(AnimalType)),
        allowNull: false,
        validate: {
          isIn: [Object.keys(AnimalType)]
        },
        field: 'animal'
      }
    },
    {
      modelName: 'user',
      tableName: 'users',
      timestamps: true,
      sequelize
    }
);

const UserZod = z.object({
    id: zodIdSchema,
    memberId: zodIdSchema,
    email: z.string().email().openapi({ example: 'user@example.com' }),
    password: z.string().min(8).openapi({ example: 'password123' }),
    animal: z.nativeEnum(AnimalType)
      .openapi({ example: AnimalType.Turtle }),
});

export { User, UserZod, type UserAttributes, type UserCreationAttributes }
