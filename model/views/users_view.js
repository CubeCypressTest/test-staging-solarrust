view(`users_view`, {
  description: `User demographics view with geographic and demographic hierarchies for customer analysis.`,

  cubes: [
    {
      join_path: users,
      includes: [
        // Measures
        `count`,
        `average_age`,
        `total_users`,
        // Dimensions
        `first_name`,
        `last_name`,
        `full_name`,
        `company`,
        `gender`,
        `age`,
        `age_group`,
        `city`,
        `state`,
        `country`,
        `region`,
        `created_at`,
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`,
        // Hierarchies
        `geography`,
        `demographics`,
        `temporal`,
        `business_profile`,
        `customer_lifecycle`
      ]
    }
  ],

  folders: [
    {
      name: `User Metrics`,
      includes: [
        `count`,
        `average_age`,
        `total_users`
      ]
    },
    {
      name: `Personal Details`,
      includes: [
        `first_name`,
        `last_name`,
        `full_name`,
        `gender`,
        `age`,
        `age_group`,
        `demographics`
      ]
    },
    {
      name: `Business Profile`,
      includes: [
        `company`,
        `business_profile`
      ]
    },
    {
      name: `Geographic Details`,
      includes: [
        `city`,
        `state`,
        `country`,
        `region`,
        `geography`
      ]
    },
    {
      name: `Registration Timeline`,
      includes: [
        `created_at`,
        `created_year`,
        `created_quarter`,
        `created_month`,
        `created_week`,
        `created_day`,
        `temporal`
      ]
    },
    {
      name: `Customer Lifecycle`,
      includes: [
        `customer_lifecycle`
      ]
    }
  ]
});
