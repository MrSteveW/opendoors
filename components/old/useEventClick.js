/**
 * Extracts event data and sets sidebar mode for viewing an event.
 * @param {Object} params
 * @param {Function} params.setSidebarMode - Setter for sidebar mode
 * @param {Function} params.setSidebarEvent - Setter for sidebar event
 * @returns {Function} handleEventClick(clickInfo)
 */
export default function useEventClick({ setSidebarMode, setSidebarEvent }) {
  return function handleEventClick(clickInfo) {
    setSidebarMode("view");
    // Try to get _id from all possible locations
    const _id =
      clickInfo.event._id ||
      clickInfo.event.id ||
      clickInfo.event.extendedProps?._id ||
      clickInfo.event.extendedProps?.id;
    setSidebarEvent({
      _id,
      title: clickInfo.event.title,
      time: clickInfo.event.extendedProps?.time || clickInfo.event.time,
      topic: clickInfo.event.extendedProps?.topic || clickInfo.event.topic,
      classname:
        clickInfo.event.extendedProps?.classname || clickInfo.event.classname,
      date:
        clickInfo.event.extendedProps?.date ||
        clickInfo.event.startStr ||
        clickInfo.event.start,
    });
  };
}
