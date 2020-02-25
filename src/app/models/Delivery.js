import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        courier_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Signature, { foreignKey: 'signature_id' });
  }
}

export default Delivery;
