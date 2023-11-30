import { items } from '@/data/items';

async function handler(req, res) {
  console.log(`[${req.method}] [List items]`);

  switch(req.method) {
  case 'GET':
    res.status(200).json(items);
    break;

  case 'POST':
    console.log(req.body);

    const item = req.body;
    item.id = (items.length + 1);

    items.push(item);

    res.status(200).json(item);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
