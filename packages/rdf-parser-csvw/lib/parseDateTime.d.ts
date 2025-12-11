import { DateTime } from 'luxon';
export default function parseDateTime(original: string, format: string, zone: string | undefined): DateTime<true> | null;
