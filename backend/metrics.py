import json
from datetime import datetime, timedelta

class MetricsCollector:
    """Collect usage events into PostgreSQL."""

    def __init__(self):
        self.events = []

    def log_event(self, user_id: str, feature: str, timestamp: datetime = None):
        """Log a feature usage event."""
        self.events.append({
            'user_id': user_id,
            'feature': feature,
            'timestamp': timestamp or datetime.now().isoformat()
        })

    def get_adoption_by_feature(self):
        """Return feature adoption stats."""
        stats = {}
        for event in self.events:
            f = event['feature']
            if f not in stats:
                stats[f] = set()
            stats[f].add(event['user_id'])

        return {f: len(users) for f, users in stats.items()}

    def get_recommendation(self):
        """Recommend which feature to improve or retire."""
        adoption = self.get_adoption_by_feature()
        if not adoption:
            return None

        # Improve high-adoption features
        top = max(adoption, key=adoption.get)
        # Retire low-adoption features
        low = min(adoption, key=adoption.get)

        return {
            'improve': top,
            'retire': low if adoption[low] < 5 else None
        }
