import { DateTime } from "luxon";

export namespace DateUtils {
  export function toReadable(date: Date) {
    return DateTime.fromJSDate(date).toFormat("MM/dd/yyyy");
  }
}
