module default {
  type Event {
    link tab -> Tab;
    required property enter_time -> datetime;
    required property exit_time -> datetime;
    required link user -> User;
    property browsing_duration := .exit_time - .enter_time;
  }

  type User {
    required property user_id -> str;
  }

  type Tab {
    required property active -> bool; # Whether the tab is active in its window.
    required property last_accessed -> int64; # The last time the tab was accessed as the number of milliseconds since epoch.
    required property url -> str; # The URL the tab is displaying.
    required property title -> str; # The title of the tab.
    required property status -> TabStatus; # Either "loading" or "complete".
  }

  # <TabStatus>'loading' = TabStatus.loading
  scalar type TabStatus extending enum<loading, complete>;
}