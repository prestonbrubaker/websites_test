import json
import csv
from collections import defaultdict

# A dictionary to hold the count of visits per site per IP
visits_per_site_per_ip = defaultdict(lambda: defaultdict(int))

# Replace 'visit_logs.jsonl' with the path to your actual .jsonl file
file_path = 'visit_logs.jsonl'

# Processing the .jsonl file and populating the visits dictionary
with open(file_path, 'r') as file:
    for line in file:
        entry = json.loads(line)
        # Check if 'hostname' key exists
        if 'hostname' in entry:
            ip = entry['ip']
            site = entry['hostname']
            # Increment the count of visits for this IP at this site
            visits_per_site_per_ip[ip][site] += 1
        else:
            print(f"Skipping entry without hostname: {entry}")

# Now we'll write the aggregated data to a CSV file
output_csv_path = 'output.csv'

# Write the output to the CSV file
with open(output_csv_path, 'w', newline='') as csvfile:
    fieldnames = ['IP Address', 'Website', 'Total Visits']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for ip, sites in visits_per_site_per_ip.items():
        for site, count in sites.items():
            writer.writerow({'IP Address': ip, 'Website': site, 'Total Visits': count})

# The script is done. The CSV file is saved at the specified path.
print(f"CSV file created at {output_csv_path}")
