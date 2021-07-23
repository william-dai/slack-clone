# asg8

A Slack Clone, Kinda.

Functionality Notes:

- Only implemented mobile approach
- Email only accepts email format 'email@example'
- Password is encrypted within the backend
- Authentication adds a session key inside of the browser to identify the user
  - If the session key does not exist, any paths will just redirect back to the login
- Will populate channels and DMs on the home page
- All users will current see the same channels due to incomplete implementation of permissions

Toolbar:
- Home button and DMs button only functional buttons, present throughout the web app

Channels:
- Header displays current workspace
- Dropdown arrow to swap workspaces (not implemented)
- Two sections, channels and DMs

Messages:
- Message will display the username, date and time (time if current day, otherwise will display the date posted), and content
- Typing and submiting a message will send the message into the database and display it on the screen
    - Sometimes takes awhile to load new messages when submitting a new message, presumably dependent on server speed. Although it shouldn't need a refresh, note that first messages in a thread will take awhile to load automatically, so if it won't load, refreshing would probably be quicker.Everything after first message should be displayed quickly though.
- Header will be of the current channel or DM
- Once message list becomes larger than the screen, scroll to see new messages
- Back button returns back to the channels page


Messages->Channels:
- Button on the right takes user to the reply thread of the particular message
Replies:
- Header will denote that the current page is a reply thread from the channel it originates from
- Top message is the original post, will always be present
- Replies are below the original post
- Like with messages, users can add a message to reply to the thread.
- Back button returns back to the original channel

Messages->DMs:
- Not completely implemented, everyone can see these like channels

DMs Page:
- Displays all DMs received by the user
- Cannot reply as it is not a thread

Preset Messages:
- General: 3
  - 'Bella' Replies: 1
- Nathan DM: 1
- Bella DM: 1