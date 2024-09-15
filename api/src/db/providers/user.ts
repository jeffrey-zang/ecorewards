import { Transaction as SequelizeTransaction, WhereOptions } from 'sequelize';
import { User, UserCreationAttributes } from '@/db/models/index.ts';

const countUsers = (where: WhereOptions<User>, memberId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return User.count({ where: { ...where, memberId }, transaction: sequelizeTransaction });
};

const findUsers = (where: WhereOptions<User>, memberId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return User.findAll({ where: { ...where, memberId }, transaction: sequelizeTransaction, raw: true });
};

const findUser = (
  where: WhereOptions<User>,
  memberId: number,
  userId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return User.findOne({
    where: { ...where, id: userId, memberId },
    transaction: sequelizeTransaction,
    raw: true
  });
};

const addUser = (
  memberId: number,
  userPayload: UserCreationAttributes,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return User.create({ ...userPayload, memberId }, { transaction: sequelizeTransaction, raw: true }).then(
    (user) => user.get({ plain: true })
  );
};

const modifyUser = (
  memberId: number,
  userId: number,
  userPayload: Partial<UserCreationAttributes>,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return User.update(userPayload, {
    where: { id: userId, memberId },
    transaction: sequelizeTransaction,
    returning: true
  }).then(([, users]) => {
    return users?.[0]?.get({ plain: true });
  });
};

const removeUser = (memberId: number, userId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return User.destroy({ where: { id: userId, memberId }, transaction: sequelizeTransaction });
};

export { countUsers, findUsers, findUser, addUser, modifyUser, removeUser };