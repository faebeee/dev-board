export const getSentry = (org: string, project: string) => {
  const getEvents = async () => {
    const response = await fetch(`https://sentry.io/api/0/projects/${org}/${project}/events/`, {
      headers: {
        Authorization: `Bearer ${process.env.SENTRY_TOKEN}`
      }
    });
    return response.json();
  };

  const getIssues = async () => {
    const response = await fetch(`https://sentry.io/api/0/projects/${org}/${project}/issues/`, {
      headers: {
        Authorization: `Bearer ${process.env.SENTRY_TOKEN}`
      }
    });
    return response.json();
  };

  return {
    getEvents,
    getIssues
  };
};