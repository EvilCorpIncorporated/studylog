CREATE MIGRATION m1mu3ygkhmse2mwisle7o6torybgds6dswj6k2xfnivteecfq2hbnq
    ONTO m1siax6zho4uwxg5tlr4gpvnv2jxkuiluurcmgrjkjpkmqznxhdhrq
{
  ALTER TYPE default::Event {
      ALTER PROPERTY enter_time {
          SET REQUIRED USING (<std::datetime>'1999-01-01');
      };
  };
};
