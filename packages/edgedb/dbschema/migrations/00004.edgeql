CREATE MIGRATION m1lsj5iive53v6w6oukvcpfqszfqqlznboyv3ldqyqxbkgtyc2nyta
    ONTO m1mu3ygkhmse2mwisle7o6torybgds6dswj6k2xfnivteecfq2hbnq
{
  ALTER TYPE default::Event {
      DROP PROPERTY browsing_duration;
      DROP PROPERTY exit_time;
  };
  ALTER TYPE default::Tab {
      DROP PROPERTY last_accessed;
      DROP PROPERTY status;
  };
  DROP SCALAR TYPE default::TabStatus;
};
