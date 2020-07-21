import useSWR from 'swr'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import NavBar from '../components/Navbar'
import { Meeting, findMeetings } from '../lib/repository/Meeting'

const localizer = momentLocalizer(moment)

interface CalendarSlotInfo {
  start: string | Date
  end: string | Date
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export async function getServerSideProps() {
  const data = await findMeetings()

  return {
    props: {
      meetings: JSON.stringify(data),
    },
  }
}

export default function Meetings(props: { meetings: string }) {
  const { data, mutate } = useSWR('/api/meeting', fetcher, {
    initialData: JSON.parse(props.meetings),
  })

  const handleSelect = async ({ start, end }: CalendarSlotInfo) => {
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

  const parseData = (data: Meeting[]) => {
    return data.map((event) => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
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
