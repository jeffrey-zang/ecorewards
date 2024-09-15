'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: true
        },
        field: 'id'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s]+$/gi,
          len: [2, 50]
        },
        field: 'category'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        },
        field: 'description'
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true
        },
        field: 'points'
      },
      partnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partners',
          key: 'id'
        },
        onDelete: 'CASCADE',
        validate: {
          isInt: true
        },
        field: 'partner_id'
      },
      transactedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'transacted_at'
      },
      type: {
        type: Sequelize.ENUM('PAYMENT', 'REFUND', 'INTERNAL'),
        allowNull: false,
        defaultValue: 'PAYMENT',
        values: ['PAYMENT', 'REFUND', 'INTERNAL'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'type'
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true
        },
        field: 'amount'
      },
      note: {
        type: Sequelize.TEXT,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        },
        field: 'note'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'updated_at'
      },
      reference: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        validate: {
          isUUID: 4
        },
        field: 'reference'
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'members',
          key: 'id'
        },
        onDelete: 'CASCADE',
        validate: {
          isInt: true
        },
        field: 'member_id'
      },
      partnerRefId: {
        type: Sequelize.TEXT,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        },
        field: 'partner_ref_id'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'VOIDED'),
        allowNull: false,
        defaultValue: 'PENDING',
        values: ['PENDING', 'COMPLETED', 'VOIDED'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'status'
      },
    })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @returns {Promise<void>}
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions')
  }
}
