CREATE MIGRATION m1siax6zho4uwxg5tlr4gpvnv2jxkuiluurcmgrjkjpkmqznxhdhrq
    ONTO m1w5xfyfprbvu2qixvg4s3ik6uxvc7k5akps5frfayd7ncwarocjua
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY user_id -> std::str {
          SET REQUIRED USING ('');
      };
  };
};
