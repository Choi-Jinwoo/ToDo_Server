/**
 * @description 회원 모델
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      field: 'id',
      type: DataTypes.STRING(45),
      primaryKey: true,
    },
    pw: {
      field: 'pw',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    tableName: 'user',
  });

  User.associate = (models) => {
    models.User.hasMany(models.Menu, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };

  return User;
};
