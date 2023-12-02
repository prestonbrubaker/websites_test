import json
from datetime import datetime

def process_visit_logs(file_path):
    try:
        # Read the JSON file
        with open(file_path, 'r') as file:
            visit_data = json.load(file)

        # Initialize lists for epoch times and set for unique IPs
        epoch_times = []
        unique_ips = set()

        for entry in visit_data:
            # Convert timestamp to epoch time in seconds
            timestamp = entry["timestamp"]
            dt_obj = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S.%fZ")
            epoch_time = int(dt_obj.timestamp())
            epoch_times.append(epoch_time)

            # Add IP address to the set of unique IPs
            unique_ips.add(entry["ip"])

        # Writing the epoch times to a text file
        with open('access_times.txt', 'w') as file:
            file.write(','.join(map(str, epoch_times)))

        # Writing the unique IP addresses to a text file
        with open('ip_addresses.txt', 'w') as file:
            file.write(','.join(unique_ips))

        return "Files written successfully."
    except Exception as e:
        return f"An error occurred: {e}"

process_visit_logs("visit_logs.json")
