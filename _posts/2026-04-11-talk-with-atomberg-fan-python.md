---
title: Talking with Atomberg Fan from Python
layout: post
comments: true
tags:
- python, atomberg
thumbnail: 
---

# Talking with Atomberg Fan from Python

This script is basically a practical experiment in two parts:

1. Talk to Atomberg's cloud API using an API key and refresh token.
2. Listen on the local network for UDP broadcasts from the fan and try to decode them.

It is not a polished SDK. It is more like a hands-on notebook in script form. The fun part is that it combines official API usage with a little bit of controlled reverse engineering.

## What the script is trying to do

At a high level, `atom.py` builds a local snapshot of all Atomberg smart fans on an account.

It does four main things:

- authenticates with the Atomberg developer API
- fetches the list of devices tied to the account
- fetches the current state of each device
- listens for local UDP packets to catch near-real-time updates

Then it prints a readable table and saves the merged result to `atomberg_fans.json`.

I like this design because it treats the cloud API as the reliable baseline and the local network as the bonus real-time layer. That is honestly a very practical approach for IoT experiments in Indian homes, where Wi-Fi devices can be online, half-online, moody, or just doing their own drama.

## The setup:

The script expects two credentials:

- `ATOMBERG_API_KEY`
- `ATOMBERG_REFRESH_TOKEN`

These can be set as environment variables or directly inside the config section.

There is also a base URL:

```python
BASE_URL = "https://api.developer.atomberg-iot.com"
```

And a local UDP port:

```python
UDP_PORT = 5625
```

This is not only a cloud integration. The script assumes Atomberg devices also send some local broadcast traffic on the LAN, which is exactly where things start getting interesting.

## Step 1: authentication

The authentication flow in the script is refresh-token based.

The function `get_access_token()` sends a request to:

```text
/v1/get_access_token
```

with:

- `x-api-key`
- a bearer refresh token

If the call succeeds, it extracts a short-lived access token and caches it in memory. It also keeps a local expiry timestamp and refreshes the token a little before it actually expires.

That buffer is defined here:

```python
TOKEN_REFRESH_BUFFER = 300
```

```python
_session = requests.Session()
_session.trust_env = False
```

That `trust_env = False` means the requests session will not automatically inherit proxy-related environment settings. If you have ever debugged networking on a Windows machine with strange environment config, you know this can save a lot of headache.

## Step 2: fetch the device list from the cloud

Once the script has an access token, it hits:

```text
/v1/get_list_of_devices
```

This returns all devices linked to the Atomberg account.

The script treats this response as the master list and then iterates through it one device at a time. The response fields the script cares about include things like:

- `device_id`
- `name`
- `model`
- `firmware_version`
- `mac_address`
- room information

## Step 3: fetch the current state of each fan

After getting the device list, the script calls:

```text
/v1/get_device_state?device_id=...
```

for each device.

This is where the script starts building a very usable fan model. For each fan, it stores:

- power status
- speed
- sleep mode
- timer
- LED state
- boost mode
- brightness
- color
- online status
- last seen timestamp

It also stores the original raw payloads under:

- `raw_device`
- `raw_state`

This function is doing the most important conceptual work in the script:

`fetch_all_fan_details()`

It combines static metadata and dynamic state into one dictionary keyed by `device_id`. That gives the rest of the script a single source of truth.

The script saves results to:

```text
atomberg_fans.json
```

and loads from that file on the next run if it already exists.

## Step 4: Listening for local UDP broadcasts

This is the section that makes the script more than a normal cloud API client.
The listener binds to UDP port `5625` and waits for packets on the local network.

#### 1. Beacon packets

The function `_parse_udp_beacon()` looks for short text payloads. If the decoded text length is between 12 and 15 characters, it treats:

- the first 12 characters as a device identifier or MAC-like value
- the remaining characters as a series string

This is a lightweight discovery mechanism. It lets the script map a device to a local IP address when a beacon comes in.

That data then gets saved in:

- `_device_ips`
- `last_seen_ip`
- optionally `series`

#### 2. State packets

The function `_parse_udp_packet()` tries two parsing strategies:

1. Decode the full packet directly as UTF-8 JSON.
2. If that fails, skip the first 8 bytes and try to decode the rest as JSON.

If parsing succeeds, it tries to extract:

- `device_id`
- the state payload itself

Then it updates the in-memory fan record.

That means the final state can become richer than what came from the cloud alone.

## Hybrid cloud + local 

Cloud state is for:

- authenticated access
- stable device listing
- metadata
- baseline state recovery

Local UDP is for:

- low-latency updates
- LAN presence detection
- learning how the device behaves on your network

When you combine both, you get something much more practical than either one alone.

For example:

- the cloud may know a fan exists, but the fan may be silent on LAN
- the LAN may show a fresh state update before the cloud view catches up
- a beacon may reveal the device's local IP even if the API does not expose it directly

If fetching the state for a particular device throws an HTTP error, the script does not crash completely. It logs a warning and continues.

That matters because smart-device fleets are rarely perfectly consistent. One fan may be offline, one payload may be incomplete, one endpoint may behave differently for one model. A useful script should still salvage whatever data it can.

### Best-effort packet parsing instead of rigid assumptions

The UDP parsing logic is intentionally forgiving. If one parse path fails, it tries another. If both fail, it logs the raw packet length and moves on.

That is exactly how experimental protocol work should be written.
If valid cache data exists, the script uses it instead of forcing a fresh cloud fetch immediately. Again, simple but developer-friendly.

The function `print_fan_table()` prints a proper terminal summary for each fan, including:

- identity details
- connectivity
- state flags
- timer value
- fetch timestamp

It even uses visual icons for power, LED, sleep mode, and boost mode.

Personally, I enjoy this kind of output in scripts. If I am running a device experiment from the terminal, I do not want only raw JSON dumped on my face. I want a quick visual read of what is happening.

The script still keeps the raw payloads internally, so you get both:

- nice terminal readability
- raw debugging depth when needed

That is a good balance.

## What the main flow looks like

The `main()` function is easy to follow:

1. Configure console output to avoid Unicode issues on Windows.
2. Load cached fan data if available.
3. If no cache exists, fetch fresh data from the cloud.
4. Print all discovered fan details.
5. Start a background UDP listener for a fixed duration.
6. Merge local updates into the in-memory state.
7. Print updated state if any UDP packets were useful.
8. Save everything back to JSON.

## Python Script

<script src="https://gist.github.com/envyen/0e2e754e6f098eb75ca05ff815ee685d.js"></script>
