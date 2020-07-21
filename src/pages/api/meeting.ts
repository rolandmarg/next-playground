import { NextApiRequest, NextApiResponse } from 'next';

import { findMeetings, saveMeeting } from '../../lib/repository/Meeting';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const meetings = await findMeetings();

    res.json(meetings);
  } else if (req.method === 'POST') {
    const { title, start, end } = req.body;

    const meeting = await saveMeeting({
      title,
      start: new Date(start),
      end: new Date(end),
    });

    res.json(meeting);
  }
};

export default handler;
