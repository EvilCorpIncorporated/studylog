module default {
  type Event {
    link tab -> Tab;
    required property enter_time -> datetime;
    required link user -> User;
  }

  type User {
    required property user_id -> str {
      constraint exclusive
    }
  }

  type Tab {
    required property active -> bool; # Whether the tab is active in its window.
    required property url -> str; # The URL the tab is displaying.
    required property title -> str; # The title of the tab.
  }

}