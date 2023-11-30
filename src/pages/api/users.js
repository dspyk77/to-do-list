import { users } from '@/data/users';

async function handler(req, res) {
  console.log(`[${req.method}] [Users]`);

  switch(req.method) {
  case 'GET':
    res.status(200).json(users);
    break;

  case 'POST':
    console.log(req.body);

    const user = req.body;
    user.id = (users.length + 1);

    users.push(user);

    res.status(200).json(user);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
