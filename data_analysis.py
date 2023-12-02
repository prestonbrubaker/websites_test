import json
from datetime import datetime

def process_visit_logs(file_path):
    try:
        # Initialize lists for epoch times and set for unique IPs
        epoch_times = []
        unique_ips = set()

        # Read the JSONL file line by line
        with open(file_path, 'r') as file:
            for line in file:
                entry = json.loads(line)  # Parse each line as JSON

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

# Call the function with the path to your visit_logs.jsonl file
process_visit_logs("visit_logs.jsonl")
