/**
 * @description 메뉴 모델
 */
export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    tableName: 'menu',
  });

  Menu.associate = (models) => {
    models.Menu.hasMany(models.List, {
      foreignKey: 'menuIdx',
      onDelete: 'cascade',
    });

    models.Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };

  return Menu;
};
