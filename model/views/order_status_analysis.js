view(`order_status_analysis`, {
  cubes: [
    {
      join_path: orders,
      includes: [
        `status`,
        `count`,
        `total_amount`
      ]
    }
  ]
});
