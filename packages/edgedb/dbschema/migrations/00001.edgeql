CREATE MIGRATION m1w5xfyfprbvu2qixvg4s3ik6uxvc7k5akps5frfayd7ncwarocjua
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE SCALAR TYPE default::TabStatus EXTENDING enum<loading, complete>;
  CREATE TYPE default::Tab {
      CREATE REQUIRED PROPERTY active -> std::bool;
      CREATE REQUIRED PROPERTY last_accessed -> std::int64;
      CREATE REQUIRED PROPERTY status -> default::TabStatus;
      CREATE REQUIRED PROPERTY title -> std::str;
      CREATE REQUIRED PROPERTY url -> std::str;
  };
  CREATE TYPE default::User;
  CREATE TYPE default::Event {
      CREATE LINK tab -> default::Tab;
      CREATE REQUIRED LINK user -> default::User;
      CREATE PROPERTY enter_time -> std::datetime;
      CREATE REQUIRED PROPERTY exit_time -> std::datetime;
      CREATE PROPERTY browsing_duration := ((.exit_time - .enter_time));
  };
};
