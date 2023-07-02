<script lang="ts">
  import dayjs from 'dayjs';
  import { formatAge } from '$lib/utils/dayjs';

  export let date: dayjs.Dayjs;
  export let interval = 1000;
  export let humanize = false;
  export let invert = false;

  let age = calculateAge();

  $: timeout = createCounter(interval);

  function createCounter(interval: number) {
    if (timeout) clearInterval(timeout);

    return setInterval(updateAge, interval);
  }

  function calculateAge() {
    if (invert) {
      return formatAge(dayjs.duration(date.diff(dayjs())), humanize);
    }

    return formatAge(date, humanize);
  }

  function updateAge() {
    age = calculateAge();
  }
</script>

<p {...$$restProps}>
  <slot name="prefix" />
  {age}
  <slot name="suffix" />
</p>
