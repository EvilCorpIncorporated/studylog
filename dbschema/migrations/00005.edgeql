CREATE MIGRATION m1jkb6dup6ag6mq6czffiweifpdbgpgx2jqaz45ludvbchhwztbtga
    ONTO m1lsj5iive53v6w6oukvcpfqszfqqlznboyv3ldqyqxbkgtyc2nyta
{
  ALTER TYPE default::User {
      ALTER PROPERTY user_id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
