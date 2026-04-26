pet_rules = {
    "dog": {
        "normal_temp": (37.5, 39.2),
        "normal_heart": (60, 120),
    },
    "cat": {
        "normal_temp": (38.0, 39.5),
        "normal_heart": (140, 220),
    }
}


def get_health_alerts(pet_type, heart_rate, temperature, activity):
    alerts = []

    try:
        heart = float(heart_rate)
        temp = float(temperature)

        rules = pet_rules.get(pet_type.lower(), {})

        if rules:
            min_temp, max_temp = rules["normal_temp"]
            min_hr, max_hr = rules["normal_heart"]

            if temp > max_temp:
                alerts.append("High temperature (possible fever)")

            if heart > max_hr:
                alerts.append("High heart rate (stress or pain)")

            if activity.lower() == "low":
                alerts.append("Low activity (possible weakness)")

    except:
        pass

    return alerts