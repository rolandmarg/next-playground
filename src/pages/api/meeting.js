import db from '../../db';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const queryRes = await db.query('SELECT * FROM meetings');

    const meetings = queryRes.rows;

    res.json(meetings);
  } else if (req.method === 'POST') {
    const { title, start, end } = req.body;

    const queryRes = await db.query(
      'INSERT INTO meetings(title, starts_at, ends_at) VALUES($1, $2, $3) RETURNING *',
      [title, start, end]
    );

    const meeting = queryRes.rows[0];

    res.json(meeting);
  }
};

export default handler;
