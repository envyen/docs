---
title: Talking with Atomberg Fan from Python
layout: post
comments: true
tags:
- python
- atomberg
- iot
thumbnail: 
---

This script Discovers and retrieves full details from all Atomberg smart fans linked to your cloud account, then listens for local UDP broadcasts to capture real-time state updates. 

---

There are two parts:

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

```
#!/usr/bin/env python3
"""
atomberg_fan_scanner.py
=======================
Discovers and retrieves full details from all Atomberg smart fans
linked to your account, then listens for local UDP broadcasts to
capture real-time state updates.

Requirements:
    pip install requests

Setup:
    1. Open the Atomberg Home App -> Settings -> Developer Options
    2. Generate your API Key and Refresh Token
    3. Set them in the CONFIG section below (or via env variables)

Atomberg API base: https://api.developer.atomberg-iot.com
UDP broadcast port: 5625  (local state updates)
"""

import json
import os
import socket
import struct
import sys
import threading
import time
from datetime import datetime, timezone

import requests

_session = requests.Session()
_session.trust_env = False

# --------------------------------------------
# CONFIG - fill these in or set as env vars
# --------------------------------------------
API_KEY       = os.getenv("ATOMBERG_API_KEY",       "YOUR_API_KEY_HERE")
REFRESH_TOKEN = os.getenv("ATOMBERG_REFRESH_TOKEN", "YOUR_LONG_REFRESH_TOKEN_HERE")

BASE_URL      = "https://api.developer.atomberg-iot.com"
UDP_PORT      = 5625          # local broadcast port used by Atomberg devices
UDP_TIMEOUT   = 10            # seconds to listen for UDP packets
TOKEN_REFRESH_BUFFER = 300    # refresh access token 5 min before expiry
CACHE_FILE    = "atomberg_fans.json"

# GLOBALS
_access_token: str | None = None
_token_expiry: float = 0.0
_fans: dict[str, dict] = {}   # device_id -> fan info + live state
_device_ips: dict[str, str] = {}


# 1. AUTH
def configure_console_output() -> None:
    """Prefer UTF-8 console output so Unicode status lines do not crash on Windows."""
    for stream_name in ("stdout", "stderr"):
        stream = getattr(sys, stream_name, None)
        if stream and hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def get_access_token() -> str:
    """Exchange API key + refresh token for a short-lived access token."""
    global _access_token, _token_expiry

    now = time.time()
    if _access_token and now < _token_expiry - TOKEN_REFRESH_BUFFER:
        return _access_token

    print("[AUTH] Refreshing access token...")
    resp = _session.get(
        f"{BASE_URL}/v1/get_access_token",
        headers={
            "accept": "application/json",
            "x-api-key": API_KEY,
            "Authorization": f"Bearer {REFRESH_TOKEN}",
        },
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()

    message = data.get("message", {})
    if isinstance(message, dict):
        _access_token = message.get("access_token")
    else:
        _access_token = None

    if not _access_token:
        raise ValueError(f"Access token missing from response: {data}")

    # Official docs say the token is valid for 24 hours.
    expires_in = 24 * 60 * 60
    _token_expiry = now + expires_in

    print(f"[AUTH] Token valid for {expires_in}s")
    return _access_token


def auth_headers() -> dict:
    return {
        "accept": "application/json",
        "x-api-key": API_KEY,
        "Authorization": f"Bearer {get_access_token()}",
    }


# 2. CLOUD API -- device list & state
def fetch_device_list() -> list[dict]:
    """Return all fans registered on the account."""
    print("[CLOUD] Fetching device list ...")
    resp = _session.get(
        f"{BASE_URL}/v1/get_list_of_devices",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    payload = resp.json()
    devices = payload.get("message", {}).get("devices_list", [])
    print(f"[CLOUD] Found {len(devices)} device(s)")
    return devices


def fetch_device_state(device_id: str) -> dict:
    """Return current state (speed, power, sleep, timer, LED ...) for one fan."""
    resp = _session.get(
        f"{BASE_URL}/v1/get_device_state?device_id={device_id}",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    payload = resp.json()
    states = payload.get("message", {}).get("device_state", [])

    if isinstance(states, list):
        for state in states:
            if state.get("device_id") == device_id:
                return state
        if len(states) == 1:
            return states[0]

    return {}


def fetch_all_fan_details() -> dict[str, dict]:
    """Combine device list + per-device state into a single dict keyed by device_id."""
    devices = fetch_device_list()
    result: dict[str, dict] = {}

    for dev in devices:
        device_id = dev.get("device_id") or dev.get("id")
        if not device_id:
            continue

        print(f"[CLOUD] Fetching state for device '{dev.get('name', device_id)}'...")
        try:
            state = fetch_device_state(device_id)
        except requests.HTTPError as exc:
            print(f"[WARN]  Could not fetch state for {device_id}: {exc}")
            state = {}

        result[device_id] = {
            # -- Identity --------------------------------
            "device_id":   device_id,
            "name":        dev.get("name", "Unknown"),
            "model":       dev.get("model", "Unknown"),
            "firmware":    dev.get("firmware_version", "N/A"),
            "mac_address": dev.get("mac_address", "N/A"),
            "room":        dev.get("room") or dev.get("room_name", "N/A"),
            "online":      state.get("is_online", dev.get("online", False)),
            "last_seen":   state.get("ts_epoch_seconds", dev.get("last_seen", "N/A")),

            # -- State ----------------------------------
            "power":       state.get("power", False),      # True / False
            "speed":       state.get("last_recorded_speed", state.get("speed", 0)),
            "sleep_mode":  state.get("sleep_mode", False),
            "timer":       state.get("timer_hours", state.get("timer", 0)),
            "led":         state.get("led", False),
            "boost":       state.get("boost_mode", False),
            "brightness":  state.get("last_recorded_brightness"),
            "color":       state.get("last_recorded_color"),

            # -- Meta -----------------------------------
            "raw_device": dev,
            "raw_state":  state,
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        }

    return result


# 3. LOCAL UDP LISTENER
# Atomberg fans broadcast state changes on the LAN via UDP port 5625.
# Packet format (best-effort reverse engineering from HA integration):
#   Bytes 0-3:   magic / protocol version
#   Bytes 4-7:   device_id (little-endian uint32 or ASCII)
#   Remaining:   JSON payload { "power": ..., "speed": ..., ... }
#
# NOTE: The exact wire format is not officially documented.
# This listener attempts a JSON parse of each packet as a pragmatic fallback.

def _parse_udp_packet(data: bytes) -> tuple[str | None, dict | None]:
    """
    Best-effort parse of an Atomberg UDP broadcast packet.
    Returns (device_id, state_dict) or (None, None) on failure.
    """
    try:
        text = data.decode("utf-8", errors="ignore").strip()
        # Try raw JSON first (newer firmware)
        payload = json.loads(text)
        device_id = payload.get("device_id") or payload.get("id")
        return device_id, payload
    except (json.JSONDecodeError, UnicodeDecodeError):
        pass

    try:
        # Try stripping a possible binary header (first 8 bytes) then JSON
        text = data[8:].decode("utf-8", errors="ignore").strip()
        payload = json.loads(text)
        device_id = payload.get("device_id") or payload.get("id")
        return device_id, payload
    except Exception:
        pass

    return None, None


def _parse_udp_beacon(data: bytes) -> tuple[str | None, str | None]:
    """
    Parse the short UDP beacon documented by Atomberg.
    Returns (device_id/mac, series) or (None, None) when it is not a beacon.
    """
    text = data.decode("utf-8", errors="ignore").strip()
    if len(text) <= 15 and len(text) >= 12:
        return text[:12], text[12:] or None
    return None, None


def listen_for_local_updates(duration: int = UDP_TIMEOUT) -> None:
    """
    Listen on UDP 5625 for local state broadcasts from fans on the LAN.
    Updates the global _fans dict in place.
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    try:
        sock.bind(("", UDP_PORT))
        sock.settimeout(duration)
    except OSError as exc:
        print(f"[UDP] Cannot bind to port {UDP_PORT}: {exc}")
        sock.close()
        return

    print(f"[UDP] Listening for local broadcasts on :{UDP_PORT} for {duration}s...")
    deadline = time.time() + duration

    while time.time() < deadline:
        try:
            data, addr = sock.recvfrom(4096)
            beacon_device_id, beacon_series = _parse_udp_beacon(data)
            if beacon_device_id:
                _device_ips[beacon_device_id] = addr[0]
                if beacon_device_id in _fans:
                    _fans[beacon_device_id]["last_seen_ip"] = addr[0]
                    if beacon_series:
                        _fans[beacon_device_id]["series"] = beacon_series
                print(f"[UDP] Beacon from {addr[0]} (device {beacon_device_id}{f', series {beacon_series}' if beacon_series else ''})")
                continue

            device_id, state = _parse_udp_packet(data)
            if device_id and state:
                ts = datetime.now(timezone.utc).isoformat()
                print(f"[UDP] [{ts}] Update from {addr[0]} (device {device_id}): {state}")
                if device_id in _fans:
                    _fans[device_id].update({k: v for k, v in state.items()
                                              if k not in ("device_id", "raw_device", "raw_state")})
                    _fans[device_id]["last_udp_update"] = ts
            else:
                print(f"[UDP] Raw packet from {addr[0]} ({len(data)} bytes) -- could not parse")
        except socket.timeout:
            break
        except Exception as exc:
            print(f"[UDP] Error: {exc}")

    sock.close()
    print("[UDP] Listener stopped")


# 4. DISPLAY HELPERS
def print_fan_table(fans: dict[str, dict]) -> None:
    SPEED_LABEL = {0: "Off", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6"}
    sep = "-" * 80

    print(f"\n{'='*80}")
    print(f"  ATOMBERG FANS  ({len(fans)} device(s) found)")
    print(f"{'='*80}")

    for fan in fans.values():
        power_icon = "ON " if fan.get("power") else "OFF"
        speed      = SPEED_LABEL.get(fan.get("speed", 0), "?")
        led_icon   = "LED" if fan.get("led")   else "Off"
        sleep_icon = "Sleep" if fan.get("sleep_mode") else "Off"
        boost_icon = "Boost" if fan.get("boost")  else "Off"

        print(f"\n  {fan['name']}  [{fan['device_id']}]")
        print(f"  {sep}")
        print(f"  Model        : {fan['model']}")
        print(f"  Firmware     : {fan['firmware']}")
        print(f"  MAC Address  : {fan['mac_address']}")
        print(f"  Room         : {fan['room']}")
        print(f"  Online       : {'Yes' if fan['online'] else 'No'}")
        print(f"  Last seen    : {fan['last_seen']}")
        print(f"  -- State --------------------------")
        print(f"  Power        : {power_icon}")
        print(f"  Speed        : {speed}/6")
        print(f"  LED          : {led_icon}  {'On' if fan.get('led') else 'Off'}")
        print(f"  Sleep Mode   : {sleep_icon}  {'On' if fan.get('sleep_mode') else 'Off'}")
        print(f"  Boost Mode   : {boost_icon}  {'On' if fan.get('boost') else 'Off'}")
        print(f"  Timer        : {fan.get('timer', 0)} min remaining")
        print(f"  Fetched at   : {fan['fetched_at']}")

    print(f"\n{'='*80}\n")


def save_json(fans: dict, filename: str = "atomberg_fans.json") -> None:
    # Remove non-serialisable keys before saving
    clean = {k: {ck: cv for ck, cv in v.items()
                 if ck not in ("raw_device", "raw_state")}
             for k, v in fans.items()}
    with open(filename, "w") as f:
        json.dump(clean, f, indent=2, default=str)
    print(f"[INFO] Details saved to '{filename}'")


def load_json(filename: str = CACHE_FILE) -> dict[str, dict]:
    """Load cached fan details from disk if available."""
    if not os.path.exists(filename):
        return {}

    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, dict):
        raise ValueError(f"Invalid cache format in '{filename}'")

    print(f"[INFO] Loaded cached details from '{filename}'")
    return data


# ==============================================
# 5. MAIN
# ==============================================

def main():
    global _fans
    configure_console_output()
    _fans = load_json(CACHE_FILE)

    if not _fans and API_KEY == "YOUR_API_KEY_HERE":
        print("[ERROR] Please set ATOMBERG_API_KEY and ATOMBERG_REFRESH_TOKEN "
              "as environment variables or edit the CONFIG section of this script.")
        return

    # -- Step 1: Cloud fetch ------------------
    if not _fans:
        print(f"[INFO] Cache '{CACHE_FILE}' not found. Fetching from cloud...")
        _fans = fetch_all_fan_details()
        save_json(_fans, CACHE_FILE)
    else:
        print("[INFO] Using cached fan details. Skipping cloud fetch.")

    if not _fans:
        print("[INFO] No fans found on your account.")
        return

    print_fan_table(_fans)

    # -- Step 2: Local UDP listen (in background) -
    udp_thread = threading.Thread(
        target=listen_for_local_updates,
        kwargs={"duration": UDP_TIMEOUT},
        daemon=True,
    )
    udp_thread.start()
    udp_thread.join()

    # -- Step 3: Print final merged state ----
    if any("last_udp_update" in f for f in _fans.values()):
        print("\n[INFO] State updated from local broadcasts:")
        print_fan_table(_fans)

    # -- Step 4: Save ------------------------
    save_json(_fans, CACHE_FILE)

if __name__ == "__main__":
    main()
```
