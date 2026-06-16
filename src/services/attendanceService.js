import {
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

import { db } from '../firebase.js';
import { getTodayDate } from '../utils/dateUtils.js';

function getAttendanceDoc() {
  return doc(db, 'attendance', getTodayDate());
}

export async function updateAttendance(userName, status) {

  if (!userName || !status) return;

  // Normalize legacy status value if present
  const normalizedStatus = status === 'LYAM' ? 'LAYAM' : status;

  const attendanceDoc = getAttendanceDoc();

  try {

    await setDoc(
      attendanceDoc,
      {
        users: {
          [userName]: {
            status: normalizedStatus,
            updatedAt: Date.now(),
          },
        },
      },
      { merge: true }
    );

  } catch (error) {

    console.error('Attendance update error:', error);

  }
}

export function subscribeAttendance(callback) {

  const attendanceDoc = getAttendanceDoc();

  return onSnapshot(
    attendanceDoc,
    (snapshot) => {

      if (snapshot.exists()) {

        const data = snapshot.data();

        callback(data.users || {});

      } else {

        callback({});

      }

    },
    (error) => {

      console.error('Realtime listener error:', error);

    }
  );
}