declare module "react-github-fork-ribbon";

interface MatomoData {
  date: string;
  url: string;
  data: MatomoSitesDate;
}

type MatomoSitesDate = MatomoSiteData[];

interface MatomoSiteData {
  site: Site;
  stats: Stats;
}

interface Site {
  idsite: string;
  name: string;
  main_url: string;
  ts_created: string;
  ecommerce: string;
  sitesearch: string;
  sitesearch_keyword_parameters: string;
  sitesearch_category_parameters: string;
  timezone: string;
  currency: string;
  exclude_unknown_urls: string;
  excluded_ips: string;
  excluded_parameters: string;
  excluded_user_agents: string;
  group: string;
  type: string;
  keep_url_fragment: string;
  creator_login: any;
  timezone_name: string;
  currency_name: string;
}

interface Stats {
  live: Live[];
  visits: Visit[];
  countries: Country[];
  summary: Summary2;
  referrers: Referrers;
  pages: Pages;
  devices: Devices;
  browsers: Browsers;
}

interface Live {
  visits: string;
  actions: number;
  visitors: number;
  visitsConverted: number;
}

interface Visit {
  date: string;
  summary: Summary;
}

interface Summary {
  nb_uniq_visitors: number;
  nb_users: number;
  nb_visits: number;
  nb_actions: number;
  nb_visits_converted: number;
  bounce_count: number;
  sum_visit_length: number;
  max_actions: number;
  bounce_rate: string;
  nb_actions_per_visit: number;
  avg_time_on_site: number;
}

interface Country {
  label: string;
  nb_visits: number;
  nb_actions: number;
  max_actions: number;
  sum_visit_length: number;
  bounce_count: number;
  nb_visits_converted: number;
  sum_daily_nb_uniq_visitors: number;
  sum_daily_nb_users: number;
  code: string;
  logo: string;
  segment: string;
  logoHeight: number;
}

interface Summary2 {
  day: Day;
  week: Week;
  month: Month;
}

interface Day {
  nb_uniq_visitors: number;
  nb_users: number;
  nb_visits: number;
  nb_actions: number;
  nb_visits_converted: number;
  bounce_count: number;
  sum_visit_length: number;
  max_actions: number;
  bounce_rate: string;
  nb_actions_per_visit: number;
  avg_time_on_site: number;
}

interface Week {
  nb_uniq_visitors: number;
  nb_users: number;
  nb_visits: number;
  nb_actions: number;
  nb_visits_converted: number;
  bounce_count: number;
  sum_visit_length: number;
  max_actions: number;
  bounce_rate: string;
  nb_actions_per_visit: number;
  avg_time_on_site: number;
}

interface Month {
  nb_uniq_visitors: number;
  nb_users: number;
  nb_visits: number;
  nb_actions: number;
  nb_visits_converted: number;
  bounce_count: number;
  sum_visit_length: number;
  max_actions: number;
  bounce_rate: string;
  nb_actions_per_visit: number;
  avg_time_on_site: number;
}

interface Referrers {
  day: Day2;
  week: Week2;
  month: Month2;
}

interface Day2 {
  Referrers_visitorsFromSearchEngines: number;
  Referrers_visitorsFromSocialNetworks: number;
  Referrers_visitorsFromDirectEntry: number;
  Referrers_visitorsFromWebsites: number;
  Referrers_visitorsFromCampaigns: number;
  Referrers_distinctSearchEngines: number;
  Referrers_distinctSocialNetworks: number;
  Referrers_distinctKeywords: number;
  Referrers_distinctWebsites: number;
  Referrers_distinctWebsitesUrls: number;
  Referrers_distinctCampaigns: number;
  Referrers_visitorsFromDirectEntry_percent: string;
  Referrers_visitorsFromSearchEngines_percent: string;
  Referrers_visitorsFromCampaigns_percent: string;
  Referrers_visitorsFromSocialNetworks_percent: string;
  Referrers_visitorsFromWebsites_percent: string;
}

interface Week2 {
  Referrers_visitorsFromSearchEngines: number;
  Referrers_visitorsFromSocialNetworks: number;
  Referrers_visitorsFromDirectEntry: number;
  Referrers_visitorsFromWebsites: number;
  Referrers_visitorsFromCampaigns: number;
  Referrers_distinctSearchEngines: number;
  Referrers_distinctSocialNetworks: number;
  Referrers_distinctKeywords: number;
  Referrers_distinctWebsites: number;
  Referrers_distinctWebsitesUrls: number;
  Referrers_distinctCampaigns: number;
  Referrers_visitorsFromDirectEntry_percent: string;
  Referrers_visitorsFromSearchEngines_percent: string;
  Referrers_visitorsFromCampaigns_percent: string;
  Referrers_visitorsFromSocialNetworks_percent: string;
  Referrers_visitorsFromWebsites_percent: string;
}

interface Month2 {
  Referrers_visitorsFromSearchEngines: number;
  Referrers_visitorsFromSocialNetworks: number;
  Referrers_visitorsFromDirectEntry: number;
  Referrers_visitorsFromWebsites: number;
  Referrers_visitorsFromCampaigns: number;
  Referrers_distinctSearchEngines: number;
  Referrers_distinctSocialNetworks: number;
  Referrers_distinctKeywords: number;
  Referrers_distinctWebsites: number;
  Referrers_distinctWebsitesUrls: number;
  Referrers_distinctCampaigns: number;
  Referrers_visitorsFromDirectEntry_percent: string;
  Referrers_visitorsFromSearchEngines_percent: string;
  Referrers_visitorsFromCampaigns_percent: string;
  Referrers_visitorsFromSocialNetworks_percent: string;
  Referrers_visitorsFromWebsites_percent: string;
}

interface Pages {
  day: Day3[];
  week: Week3[];
  month: Month3[];
}

interface Day3 {
  label: string;
  nb_visits: number;
  nb_uniq_visitors?: number;
  nb_hits: number;
  sum_time_spent: number;
  nb_hits_with_time_network: any;
  min_time_network: any;
  max_time_network: any;
  nb_hits_with_time_server: any;
  min_time_server: any;
  max_time_server: any;
  nb_hits_with_time_transfer: any;
  min_time_transfer: any;
  max_time_transfer: any;
  nb_hits_with_time_dom_processing: any;
  min_time_dom_processing: any;
  max_time_dom_processing: any;
  nb_hits_with_time_dom_completion: any;
  min_time_dom_completion?: number;
  max_time_dom_completion?: number;
  entry_nb_uniq_visitors?: string;
  entry_nb_visits: any;
  entry_nb_actions: any;
  entry_sum_visit_length: any;
  entry_bounce_count: any;
  exit_nb_uniq_visitors?: string;
  exit_nb_visits: any;
  avg_time_network: number;
  avg_time_server: number;
  avg_time_transfer: number;
  avg_time_dom_processing: number;
  avg_time_dom_completion: number;
  avg_page_load_time: number;
  avg_time_on_page: number;
  bounce_rate: string;
  exit_rate: string;
  url?: string;
  segment: string;
  idsubdatatable?: number;
}

interface Week3 {
  label: string;
  nb_visits: number;
  nb_hits: number;
  sum_time_spent: number;
  nb_hits_with_time_network: any;
  min_time_network: any;
  max_time_network: any;
  nb_hits_with_time_server: any;
  min_time_server: any;
  max_time_server: any;
  nb_hits_with_time_transfer: any;
  min_time_transfer: any;
  max_time_transfer: any;
  nb_hits_with_time_dom_processing: any;
  min_time_dom_processing: any;
  max_time_dom_processing: any;
  nb_hits_with_time_dom_completion: any;
  min_time_dom_completion?: number;
  max_time_dom_completion?: number;
  nb_hits_with_time_on_load: any;
  min_time_on_load?: number;
  max_time_on_load?: number;
  entry_nb_visits?: number;
  entry_nb_actions?: number;
  entry_sum_visit_length?: number;
  entry_bounce_count?: number;
  exit_nb_visits: any;
  avg_time_network: number;
  avg_time_server: number;
  avg_time_transfer: number;
  avg_time_dom_processing: number;
  avg_time_dom_completion: number;
  avg_time_on_load: number;
  avg_page_load_time: number;
  avg_time_on_page: number;
  bounce_rate: string;
  exit_rate: string;
  segment: string;
  idsubdatatable?: number;
  sum_daily_nb_uniq_visitors?: number;
  sum_daily_entry_nb_uniq_visitors?: number;
  sum_daily_exit_nb_uniq_visitors: any;
  url?: string;
}

interface Month3 {
  label: string;
  nb_visits: number;
  nb_hits: number;
  sum_time_spent: number;
  nb_hits_with_time_network: any;
  min_time_network: any;
  max_time_network: any;
  nb_hits_with_time_server: any;
  min_time_server: any;
  max_time_server: any;
  nb_hits_with_time_transfer: any;
  min_time_transfer: any;
  max_time_transfer: any;
  nb_hits_with_time_dom_processing: any;
  min_time_dom_processing: any;
  max_time_dom_processing: any;
  nb_hits_with_time_dom_completion: any;
  min_time_dom_completion?: number;
  max_time_dom_completion?: number;
  nb_hits_with_time_on_load: any;
  min_time_on_load?: number;
  max_time_on_load?: number;
  entry_nb_visits: any;
  entry_nb_actions: any;
  entry_sum_visit_length: any;
  entry_bounce_count: any;
  exit_nb_visits?: number;
  sum_daily_nb_uniq_visitors?: number;
  sum_daily_entry_nb_uniq_visitors: any;
  sum_daily_exit_nb_uniq_visitors?: number;
  avg_time_network: number;
  avg_time_server: number;
  avg_time_transfer: number;
  avg_time_dom_processing: number;
  avg_time_dom_completion: number;
  avg_time_on_load: number;
  avg_page_load_time: number;
  avg_time_on_page: number;
  bounce_rate: string;
  exit_rate: string;
  url?: string;
  segment: string;
  idsubdatatable?: number;
}

interface Devices {
  day: Day4[];
  week: Week4[];
  month: Month4[];
}

interface Day4 {
  label: string;
  nb_uniq_visitors?: number;
  nb_visits: number;
  nb_actions?: number;
  nb_users?: number;
  max_actions?: number;
  sum_visit_length?: number;
  bounce_count?: number;
  nb_visits_converted?: number;
  segment: string;
  logo: string;
}

interface Week4 {
  label: string;
  nb_visits: number;
  nb_actions?: number;
  max_actions?: number;
  sum_visit_length?: number;
  bounce_count?: number;
  nb_visits_converted?: number;
  sum_daily_nb_uniq_visitors?: number;
  sum_daily_nb_users?: number;
  segment: string;
  logo: string;
}

interface Month4 {
  label: string;
  nb_visits: number;
  nb_actions?: number;
  max_actions?: number;
  sum_visit_length?: number;
  bounce_count?: number;
  nb_visits_converted?: number;
  sum_daily_nb_uniq_visitors?: number;
  sum_daily_nb_users?: number;
  segment: string;
  logo: string;
}

interface Browsers {
  day: Day5[];
  week: Week5[];
  month: Month5[];
}

interface Day5 {
  label: string;
  nb_uniq_visitors: number;
  nb_visits: number;
  nb_actions: number;
  nb_users: number;
  max_actions: number;
  sum_visit_length: number;
  bounce_count: number;
  nb_visits_converted: number;
  logo: string;
  segment?: string;
}

interface Week5 {
  label: string;
  nb_visits: number;
  nb_actions: number;
  max_actions: number;
  sum_visit_length: number;
  bounce_count: number;
  nb_visits_converted: number;
  sum_daily_nb_uniq_visitors: number;
  sum_daily_nb_users: number;
  logo: string;
  segment?: string;
}

interface Month5 {
  label: string;
  nb_visits: number;
  nb_actions: number;
  max_actions: number;
  sum_visit_length: number;
  bounce_count: number;
  nb_visits_converted: number;
  sum_daily_nb_uniq_visitors: number;
  sum_daily_nb_users: number;
  logo: string;
  segment?: string;
}
