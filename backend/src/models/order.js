module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING, // Matches Clerk's `userId`
        allowNull: false,
        references: {
          model: "Users",
          key: "clerkId", // ✅ References Clerk ID
        },
        onDelete: "CASCADE",
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        defaultValue: "pending",
      },
      paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "Orders",
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId", targetKey: "clerkId", as: "user" });
  };

  return Order;
};
