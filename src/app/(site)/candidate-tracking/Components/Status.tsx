import React from 'react';

const Status = ({ candidateStatus }: { candidateStatus: string }) => {
  let content;

  switch (candidateStatus) {
    case 'yet_to_share':
      content =
        <td className="table-row-data yet-to-share">
          Yet To Share
        </td>
      break;
    case 'joined':
      content =
        <td className="table-row-data joined">
          Joined
        </td>
      break;
    case 'negotiation':
      content =
        <td className="table-row-data negotiation">
          Negotiation
        </td>
      break;
    case 'in_process':
      content =
        <td className="table-row-data in-process">
          In Process
        </td>
      break;
    case 'on_hold':
      content =
        <td className="table-row-data on-hold">
          On Hold
        </td>
      break;
    case 'feedback_pending':
      content =
        <td className="table-row-data feedback-pending">
          Feedback Pending
        </td>
      break;
    case 'dropped_out':
      content =
        <td className="table-row-data dropped-out">
          Dropped Out
        </td>
      break;
    case 'rejected':
      content =
        <td className="table-row-data rejected">
          Rejected
        </td>
      break;
    default:
      content = <td className="table-row-data "></td>
  }

  return <>{content}</>
}

export default Status