import yaml

with open("config.yml", "r") as f:
    config = yaml.safe_load(f)

logging_level = config["logging_level"]
log_file = config["log_file"]
