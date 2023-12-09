import json
import csv
from collections import defaultdict
from datetime import datetime

def read_jsonl_and_process(file_path):
    site_visits = defaultdict(int)
    ip_site_visits = defaultdict(lambda: defaultdict(int))
    site_visits_over_time = defaultdict(lambda: defaultdict(int))

    with open(file_path, 'r') as file:
        for line in file:
            data = json.loads(line)

            # Check if 'hostname' key exists
            if 'hostname' in data:
                hostname = data['hostname']
                ip = data['ip']
                timestamp = data['timestamp']

                # Convert timestamp to epoch time using dateutil.parser or replacing 'Z' as previously discussed
                epoch_time = int(parser.parse(timestamp).timestamp())

                site_visits[hostname] += 1
                ip_site_visits[ip][hostname] += 1
                site_visits_over_time[hostname][epoch_time] += 1
            else:
                print(f"Missing 'hostname' in data: {data}")

    return site_visits, ip_site_visits, site_visits_over_time



def write_to_csv(site_visits, ip_site_visits, site_visits_over_time, output_file):
    with open(output_file, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Site', 'Total Visits to Site', 'IP Address', 'Total Visits from IP', 'Epoch Time', 'Visits at Epoch Time'])

        for site, total_visits in site_visits.items():
            for ip, visits in ip_site_visits.items():
                for epoch_time, count in site_visits_over_time[site].items():
                    writer.writerow([
                        site, 
                        total_visits, 
                        ip, 
                        visits[site] if site in visits else 0, 
                        epoch_time, 
                        count
                    ])

site_visits, ip_site_visits, site_visits_over_time = read_jsonl_and_process('visit_logs.jsonl')

write_to_csv(site_visits, ip_site_visits, site_visits_over_time, 'output.csv')
