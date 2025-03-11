module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    clerkId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://res.cloudinary.com/demo/image/upload/v1710000000/default-profile.png'
    }
  }, {
    timestamps: true
  });

  return User;
};
