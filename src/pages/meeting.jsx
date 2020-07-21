import useSWR from 'swr'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import NavBar from '../components/Navbar'
import db from '../db'

const localizer = momentLocalizer(moment)

const fetcher = (url) => fetch(url).then((res) => res.json())

export async function getServerSideProps() {
  const res = await db.query('SELECT * FROM meetings')

  const meetings = res.rows.map((meeting) => ({
    ...meeting,
    starts_at: meeting.starts_at.toISOString(),
    ends_at: meeting.ends_at.toISOString(),
  }))

  return {
    props: {
      meetings,
    },
  }
}

export default function Meetings(props) {
  const { data, mutate } = useSWR('/api/meeting', fetcher, {
    initialData: props.meetings,
  })

  const handleSelect = async ({ start, end }) => {
    // eslint-disable-next-line no-alert, no-undef
    const title = window.prompt('please enter a name')
    if (!title || !start || !end) {
      return
    }

    await fetch('/api/meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end }),
    })

    mutate()
  }

  const parseData = (data) => {
    return data.map((event) => ({
      title: event.title,
      start: new Date(event.starts_at),
      end: new Date(event.ends_at),
    }))
  }

  return (
    <>
      <NavBar />
      <Calendar
        selectable
        defaultDate={moment().toDate()}
        defaultView="week"
        events={parseData(data)}
        localizer={localizer}
        // style={{ height: '100vh' }}
        dayLayoutAlgorithm="no-overlap"
        onSelectSlot={handleSelect}
      />
    </>
  )
}
