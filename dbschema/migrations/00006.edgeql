CREATE MIGRATION m1z3zsuqfyo5dysc4fckk4wf66slwqpn7dcrzd4x5pyh7w64ajtp3a
    ONTO m1jkb6dup6ag6mq6czffiweifpdbgpgx2jqaz45ludvbchhwztbtga
{
  ALTER TYPE default::Event {
      ALTER LINK tab {
          SET REQUIRED USING (std::assert_exists(.tab));
      };
  };
};
