import { items } from '@/data/items';

function findIndexById(id) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.id == id) {
      return i;
    }
  }

  return -1;
}

async function handler(req, res) {
  const { id } = req.query;
  console.log(`[${req.method}] [List Items]`);

  switch(req.method) {
  case 'GET':
    var index = findIndexById(id);

    var item = items[index];

    res.status(200).json(item);
    break;

  case 'PUT':
    console.log(req.body);

    var index = findIndexById(id);

    var item = req.body;
    item.id = id;

    items[index] = item;

    res.status(200).json(item);
    break;

  case 'DELETE':
    var index = findIndexById(id);

    items.splice(index, 1);

    res.status(200).json({ msg: 'Deleted successfully' });
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
