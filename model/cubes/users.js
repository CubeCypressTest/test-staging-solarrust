cube(`users`, {
  sql_table: `users`,
  public: false,

  measures: {
    count: {
      type: `count`,
      title: `User Count`
    },

    average_age: {
      sql: `age`,
      type: `avg`,
      title: `Average Age`
    },

    total_users: {
      sql: `${CUBE}.id`,
      type: `count_distinct`,
      title: `Total Unique Users`
    }
  },

  dimensions: {
    id: {
      sql: `${CUBE}.id`,
      type: `number`,
      primaryKey: true,
      shown: false
    },

    first_name: {
      sql: `first_name`,
      type: `string`,
      title: `First Name`
    },

    last_name: {
      sql: `last_name`,
      type: `string`,
      title: `Last Name`
    },

    full_name: {
      sql: `CONCAT(${CUBE}.first_name, ' ', ${CUBE}.last_name)`,
      type: `string`,
      title: `Full Name`
    },

    company: {
      sql: `company`,
      type: `string`,
      title: `Company`
    },

    gender: {
      sql: `gender`,
      type: `string`,
      title: `Gender`
    },

    age: {
      sql: `age`,
      type: `number`,
      title: `Age`
    },

    age_group: {
      sql: `CASE 
        WHEN ${CUBE}.age < 25 THEN 'Under 25'
        WHEN ${CUBE}.age < 35 THEN '25-34'
        WHEN ${CUBE}.age < 45 THEN '35-44'
        WHEN ${CUBE}.age < 55 THEN '45-54'
        WHEN ${CUBE}.age < 65 THEN '55-64'
        ELSE '65+'
      END`,
      type: `string`,
      title: `Age Group`
    },

    city: {
      sql: `city`,
      type: `string`,
      title: `City`
    },

    state: {
      sql: `state`,
      type: `string`,
      title: `State`
    },

    country: {
      sql: `CASE 
        WHEN ${CUBE}.state LIKE 'us-%' THEN 'United States'
        WHEN ${CUBE}.state LIKE 'ca-%' THEN 'Canada'
        WHEN ${CUBE}.state LIKE 'uk-%' THEN 'United Kingdom'
        ELSE 'Other'
      END`,
      type: `string`,
      title: `Country`
    },

    region: {
      sql: `CASE 
        WHEN ${CUBE}.state IN ('us-ca', 'us-or', 'us-wa') THEN 'West Coast'
        WHEN ${CUBE}.state IN ('us-ny', 'us-nj', 'us-ct', 'us-ma') THEN 'Northeast'
        WHEN ${CUBE}.state IN ('us-tx', 'us-az', 'us-nm') THEN 'Southwest'
        WHEN ${CUBE}.state IN ('us-fl', 'us-ga', 'us-sc', 'us-nc') THEN 'Southeast'
        WHEN ${CUBE}.state LIKE 'us-%' THEN 'Other US'
        ELSE 'International'
      END`,
      type: `string`,
      title: `Region`
    },

    created_at: {
      sql: `created_at`,
      type: `time`,
      title: `User Created At`
    },

    created_year: {
      sql: `DATE_TRUNC('year', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Year`
    },

    created_quarter: {
      sql: `DATE_TRUNC('quarter', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Quarter`
    },

    created_month: {
      sql: `DATE_TRUNC('month', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Month`
    },

    created_week: {
      sql: `DATE_TRUNC('week', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Week`
    },

    created_day: {
      sql: `DATE_TRUNC('day', ${CUBE}.created_at)`,
      type: `time`,
      title: `Created Day`
    }
  },

  hierarchies: {
    geography: {
      title: `Geographic Hierarchy`,
      levels: [
        `country`,
        `region`,
        `state`,
        `city`
      ]
    },

    demographics: {
      title: `Demographic Breakdown`,
      levels: [
        `gender`,
        `age_group`
      ]
    },

    temporal: {
      title: `User Registration Timeline`,
      levels: [
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`
      ]
    },

    business_profile: {
      title: `Business Profile Hierarchy`,
      levels: [
        `company`,
        `gender`,
        `age_group`
      ]
    },

    customer_lifecycle: {
      title: `Customer Lifecycle`,
      levels: [
        `created_year`,
        `country`,
        `region`,
        `company`,
        `gender`,
        `age_group`
      ]
    }
  }
});
