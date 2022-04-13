import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(duration)
dayjs.extend(LocalizedFormat)

const WEEKS: { [key: number]: string } = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  0: '星期日',
}

export const weekToday = () => {
  const week = dayjs().add(8, 'hour').day()
  console.log("星期"+week)
  console.log("偏移前"+dayjs())
  console.log("偏移后"+dayjs().add(8, 'hour'))
  return WEEKS[week]
}

export default dayjs
