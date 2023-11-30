import { users } from '@/data/users';

function findIndexById(id) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.id == id) {
      return i;
    }
  }

  return -1;
}

async function handler(req, res) {
  const { id } = req.query;
  console.log(`[${req.method}] [Users]`);

  switch(req.method) {
  case 'GET':
    var index = findIndexById(id);

    var user = users[index];

    res.status(200).json(user);
    break;

  case 'PUT':
    console.log(req.body);

    var index = findIndexById(id);

    var user = req.body;
    user.id = id;

    users[index] = user;

    res.status(200).json(user);
    break;

  case 'DELETE':
    var index = findIndexById(id);

    users.splice(index, 1);

    res.status(200).json({ msg: 'Deleted successfully' });
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
