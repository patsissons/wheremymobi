import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatAge(
  timestampOrDuration: dayjs.Dayjs | duration.Duration,
  humanize = false,
) {
  const duration = dayjs.isDuration(timestampOrDuration)
    ? timestampOrDuration
    : dayjs.duration(dayjs().diff(timestampOrDuration));

  if (humanize) return duration.humanize(true);
  if (duration.days() > 0) return `${duration.as('days').toFixed(1)} days`;
  if (duration.hours() > 0) return duration.format('H:mm:ss');

  return duration.format('mm:ss');
}
