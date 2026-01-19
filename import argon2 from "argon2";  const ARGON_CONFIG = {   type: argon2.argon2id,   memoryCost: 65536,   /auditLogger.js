export function logAuthEvent(eventType, username, metadata = {}) {
  console.log({
    timestamp: new Date().toISOString(),
    eventType,
    username,
    metadata
  });
}
