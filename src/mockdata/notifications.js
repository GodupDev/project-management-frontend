import { users } from "./users";
import { tasks } from "./tasks";
import { worklogs } from "./worklogs";

const notifications = [
  {
    id: 1,
    type: "worklog_added",
    title: "New Work Log",
    message: `${users[0].fullName} logged ${worklogs[0].hours} hours on "${tasks[0].name}"`,
    status: "unread",
    time: worklogs[0].createdAt,
    link: `/tasks/${worklogs[0].taskId}`,
    user: users[0],
    worklog: worklogs[0],
  },
  {
    id: 2,
    type: "worklog_updated",
    title: "Work Log Updated",
    message: `${users[1].fullName} updated work log for "${tasks[1].name}"`,
    status: "unread",
    time: worklogs[1].createdAt,
    link: `/tasks/${worklogs[1].taskId}`,
    user: users[1],
    worklog: worklogs[1],
  },
  {
    id: 3,
    type: "worklog_added",
    title: "New Work Log",
    message: `${users[2].fullName} logged ${worklogs[2].hours} hours on "${tasks[0].name}"`,
    status: "read",
    time: worklogs[2].createdAt,
    link: `/tasks/${worklogs[2].taskId}`,
    user: users[2],
    worklog: worklogs[2],
  },
  {
    id: 4,
    type: "worklog_added",
    title: "New Work Log",
    message: `${users[1].fullName} logged ${worklogs[3].hours} hours on "${tasks[1].name}"`,
    status: "read",
    time: worklogs[3].createdAt,
    link: `/tasks/${worklogs[3].taskId}`,
    user: users[1],
    worklog: worklogs[3],
  },
  {
    id: 5,
    type: "worklog_added",
    title: "New Work Log",
    message: `${users[2].fullName} logged ${worklogs[4].hours} hours on "${tasks[2].name}"`,
    status: "unread",
    time: worklogs[4].createdAt,
    link: `/tasks/${worklogs[4].taskId}`,
    user: users[2],
    worklog: worklogs[4],
  },
];

export { notifications };
