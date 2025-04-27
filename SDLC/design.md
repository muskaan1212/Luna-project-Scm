# Design - Luna Period Tracker

## System Architecture
- Frontend communicates with Backend API (if backend used).
- Backend interacts with the Database to store user data.
- Authentication handled via token-based sessions.

## UI/UX Design
- Home Screen: Calendar view showing past and predicted periods.
- Add Entry Screen: Log symptoms, moods, flow intensity.
- Settings Screen: Manage user preferences and privacy settings.

## Database Design
Tables:
- Users (id, name, email, password_hash)
- PeriodLogs (id, user_id, start_date, end_date)
- SymptomLogs (id, user_id, date, symptom, intensity)

## User Flow
1. User logs in or signs up.
2. User adds new period entry.
3. Luna predicts the next cycle.
4. User logs symptoms daily if needed.
5. User can view trends over time.
