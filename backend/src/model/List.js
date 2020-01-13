/**
 * @description 목록 모델
 */
export default (sequelize, DataTypes) => {
  const List = sequelize.define('list', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      field: 'content',
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    isChecked: {
      field: 'is_checked',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    menuIdx: {
      field: 'menu_idx',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'list',
  });

  List.associate = (models) => {
    models.List.belongsTo(models.Menu, {
      foreignKey: 'menuIdx',
      onDelete: 'cascade',
    });
  };

  return List;
};
