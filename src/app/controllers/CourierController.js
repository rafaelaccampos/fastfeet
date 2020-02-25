import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    const empty = 0;

    if (couriers.length === empty) {
      return res.status(400).json({ error: 'Sorry, there are no couriers!' });
    }

    return res.json({
      couriers,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const courier = await Courier.findOne({ where: { id } });

    if (!courier) {
      return res.status(400).json({ error: "Courier doesen't exists!" });
    }

    return res.json(courier);
  }

  async store(req, res) {
    const { email } = req.body;

    const courier = await Courier.findOne({ where: { email } });

    if (courier) {
      return res.status(400).json({ error: 'Courier already exists!' });
    }

    const { id, name, avatar_id } = await Courier.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, email, avatar_id } = req.body;

    const courier = await Courier.findByPk(id);

    if (email && email !== courier.email) {
      const courierExists = await Courier.findOne({ where: { email } });

      if (courierExists) {
        return res.status(400).json({ error: 'Courier already exists!' });
      }
    }

    await Courier.update(req.body, {
      where: { id },
    });

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Courier.destroy({ where: { id } });

    return res.send();
  }
}
export default new CourierController();
