view(`order_metrics`, {
  cubes: [
    {
      join_path: orders,
      includes: [
        `count`,
        `total_amount`
      ]
    }
  ]
});
