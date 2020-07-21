import { getRepository } from 'typeorm';

import { ensureConnection } from '../../lib/db';

import { Meeting } from '../../lib/entity/Meeting';

export async function findMeetings() {
  await ensureConnection();

  const meetingRepository = getRepository(Meeting);

  const meetings = await meetingRepository.find({});

  return meetings;
}

interface SaveMeetingInput {
  title: string;
  start: Date;
  end: Date;
}

export async function saveMeeting({ start, end, title }: SaveMeetingInput) {
  await ensureConnection();

  const meetingRepository = getRepository(Meeting);

  const meeting = await meetingRepository.save({ title, start, end });

  return meeting;
}

export { Meeting };
