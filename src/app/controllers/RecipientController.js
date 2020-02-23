import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { name, street, number, complement, city, state, zip } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name, street, number, complement, state, city, zip },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists!' });
    }

    const { id } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });
  }

  async update(req, res) {
    const { name, street, number, complement, city, state, zip } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name, street, number, complement, state, city, zip },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists!' });
    }

    const { id } = req.params;

    await Recipient.update(req.body, {
      where: { id },
    });

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });
  }
}

export default new RecipientController();
