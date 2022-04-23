const PiwikClient = require("piwik-client");
const pAll = require("p-all");
const addDays = require("date-fns/addDays");

const MATOMO_URL = process.env.MATOMO_URL;
const MATOMO_TOKEN = process.env.MATOMO_TOKEN;

const piwikApi = ({ client, params }) =>
  new Promise((resolve, reject) => {
    client.api(params, (err, responseObject = []) => {
      if (err) {
        console.error("err", err);
        reject(err);
      }
      resolve(responseObject || []);
    });
  });

const fetchSiteStats = async ({ client, site }) => {
  const callApi = (params) =>
    piwikApi({
      client,
      params: {
        idSite: site.idsite,
        ...params,
      },
    });

  const getDailyVisits = ({ days = 15 } = {}) =>
    pAll(
      Array.from({ length: days }).map((_, i) => async () => {
        const newDate = addDays(new Date(), -i).toISOString().substring(0, 10);
        const summary = await getVisitsSummary({
          period: "day",
          date: newDate,
        });
        return { date: newDate, summary };
      }),
      { concurrency: 1 }
    );

  const callApiMethod = (method) => (params) =>
    callApi({
      method,
      ...params,
    });

  const getVisitsSummary = callApiMethod("VisitsSummary.get");
  const getReferrers = callApiMethod("Referrers.get");
  const getPageUrls = callApiMethod("Actions.getPageUrls");
  const getDeviceType = callApiMethod("DevicesDetection.getType");
  const getBrowsers = callApiMethod("DevicesDetection.getBrowsers");

  const live = await callApi({
    method: "Live.getCounters",
    idSite: site.idsite,
    lastMinutes: "60",
  });

  const visits = await getDailyVisits();

  const countries = await callApi({
    method: "UserCountry.getCountry",
    idSite: site.idsite,
    period: "week",
    date: new Date().toISOString(),
  });

  const summaryDay = await getVisitsSummary({
    period: "day",
    date: new Date().toISOString(),
  });
  const summaryWeek = await getVisitsSummary({
    period: "week",
    date: new Date().toISOString(),
  });
  const summaryMonth = await getVisitsSummary({
    period: "month",
    date: new Date().toISOString(),
  });

  const referrersDay = await getReferrers({
    period: "day",
    date: new Date().toISOString(),
  });
  const referrersWeek = await getReferrers({
    period: "week",
    date: new Date().toISOString(),
  });
  const referrersMonth = await getReferrers({
    period: "month",
    date: new Date().toISOString(),
  });

  const pagesDay = await getPageUrls({
    period: "day",
    date: new Date().toISOString(),
  });
  const pagesWeek = await getPageUrls({
    period: "week",
    date: new Date().toISOString(),
  });
  const pagesMonth = await getPageUrls({
    period: "month",
    date: new Date().toISOString(),
  });

  const devicesDay = await getDeviceType({
    period: "day",
    date: new Date().toISOString(),
  });
  const devicesWeek = await getDeviceType({
    period: "week",
    date: new Date().toISOString(),
  });
  const devicesMonth = await getDeviceType({
    period: "month",
    date: new Date().toISOString(),
  });

  const browsersDay = await getBrowsers({
    period: "day",
    date: new Date().toISOString(),
  });
  const browsersWeek = await getBrowsers({
    period: "week",
    date: new Date().toISOString(),
  });
  const browsersMonth = await getBrowsers({
    period: "month",
    date: new Date().toISOString(),
  });

  const stats = {
    live,
    visits,
    countries,
    summary: {
      day: summaryDay,
      week: summaryWeek,
      month: summaryMonth,
    },
    referrers: {
      day: referrersDay,
      week: referrersWeek,
      month: referrersMonth,
    },
    pages: {
      day: pagesDay,
      week: pagesWeek,
      month: pagesMonth,
    },
    devices: {
      day: devicesDay,
      week: devicesWeek,
      month: devicesMonth,
    },
    browsers: {
      day: browsersDay,
      week: browsersWeek,
      month: browsersMonth,
    },
  };
  return stats;
};

const fetchAllStats = async () => {
  const client = new PiwikClient(MATOMO_URL, MATOMO_TOKEN);
  const sites = await piwikApi({
    client,
    params: { method: "SitesManager.getAllSites" },
  });
  const results = await pAll(
    sites.map((site) => async () => {
      const siteData = {
        site,
        stats: await fetchSiteStats({ client, site }),
      };
      return siteData;
    }),
    { concurrency: 1 }
  );
  return {
    date: new Date().toISOString(),
    url: process.env.MATOMO_URL,
    data: results,
  };
};

module.exports = { fetchAllStats };

if (require.main === module) {
  fetchAllStats()
    .then((res) => console.log(JSON.stringify(res, null, 2)))
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
